/**
 * Pillar 4 — E-E-A-T Signals
 * Experience, Expertise, Authoritativeness, Trustworthiness.
 * YMYL niches require E-E-A-T; non-YMYL strongly benefit.
 */

import type { NicheConfig } from "../niche-configs";
import type { Finding, PillarResult } from "../scoring";
import { calculatePillarScore, scoreToGrade } from "../scoring";

export function checkEEAT(
  html: string,
  markdown: string,
  metadata: Record<string, string>,
  config: NicheConfig,
  pageUrls: string[]
): PillarResult {
  const findings: Finding[] = [];
  const lower = html.toLowerCase();
  const mdLower = markdown.toLowerCase();
  const combined = lower + " " + JSON.stringify(metadata).toLowerCase();

  // Weight multiplier for YMYL niches (E-E-A-T is harder requirement)
  const w = config.ymyl ? 1.2 : 1.0;

  // 1. Credentials visible (from niche config)
  const credTerms = config.credentialField.toLowerCase().split(",").map((t) => t.trim().split(" ")[0]);
  const hasCredentials = credTerms.some((term) => combined.includes(term));

  if (hasCredentials) {
    findings.push({ status: "pass", message: `Industry credentials visible (${config.credentialField})`, weight: Math.round(15 * w) });
  } else {
    findings.push({
      status: "fail",
      message: `No ${config.credentialField} visible — ${config.ymyl ? "CRITICAL for YMYL niche" : "weakens authority signal"}`,
      weight: Math.round(15 * w),
    });
  }

  // 2. About / Team page
  const hasAboutPage = pageUrls.some((u) => /about|team|our-staff|our-doctors|our-team/i.test(u));
  const hasAboutContent = /about\s*(us|the|our)|our\s*team|meet\s*(the|our)/i.test(html);

  if (hasAboutPage || hasAboutContent) {
    findings.push({ status: "pass", message: "About/Team page detected — establishes human expertise", weight: Math.round(12 * w) });
  } else {
    findings.push({ status: "fail", message: "No About or Team page — LLMs can't verify expertise", weight: Math.round(12 * w) });
  }

  // 3. HTTPS
  if (combined.includes("https")) {
    findings.push({ status: "pass", message: "HTTPS active — trust signal", weight: 10 });
  } else {
    findings.push({ status: "fail", message: "No HTTPS — critical trust issue for both users and AI", weight: 10 });
  }

  // 4. Privacy policy / Terms of service
  const hasLegal = pageUrls.some((u) => /privacy|terms|legal|disclaimer/i.test(u)) ||
    /privacy\s*policy|terms\s*(of\s*)?service/i.test(html);

  if (hasLegal) {
    findings.push({ status: "pass", message: "Privacy policy / Terms of service detected", weight: 8 });
  } else {
    findings.push({ status: "fail", message: "No privacy policy or terms of service found", weight: 8 });
  }

  // 5. Testimonials / Reviews displayed
  const hasTestimonials = /testimonial|review|rating|stars?\s*\d|what\s*(our|my)\s*(clients?|patients?|customers?)\s*say/i.test(html);
  if (hasTestimonials) {
    findings.push({ status: "pass", message: "Testimonials or reviews displayed on site — social proof", weight: 12 });
  } else {
    findings.push({ status: "fail", message: "No testimonials or reviews shown — missing social proof signal", weight: 12 });
  }

  // 6. Years in business / established date
  const hasYears = /since\s*\d{4}|established\s*\d{4}|\d+\s*years?\s*(of\s*)?(experience|serving|in\s*business)/i.test(html);
  if (hasYears) {
    findings.push({ status: "pass", message: "Years of experience or establishment date mentioned", weight: 10 });
  } else {
    findings.push({ status: "warn", message: "No mention of years in business — experience signal missing", weight: 10 });
  }

  // 7. External authority citations
  const authorityDomains = [
    "nih.gov", "cdc.gov", "mayo", "webmd", "wikipedia",
    "bbb.org", "angi.com", "yelp.com", "nolo.com",
    ...config.primaryDirectories.map((d) => d.toLowerCase()),
  ];
  const hasCitations = authorityDomains.some((d) => combined.includes(d));

  if (hasCitations) {
    findings.push({ status: "pass", message: "External authority citations found — strengthens E-E-A-T", weight: 10 });
  } else {
    findings.push({ status: "warn", message: "No external authority citations — linking to industry bodies improves trust", weight: 10 });
  }

  // 8. Author / professional bio
  const hasAuthorBio = /dr\.\s*\w|author|written\s*by|our\s*(founder|owner|director|doctor|attorney)/i.test(html);
  if (hasAuthorBio) {
    findings.push({ status: "pass", message: "Professional bio or author attribution detected", weight: Math.round(13 * w) });
  } else {
    findings.push({
      status: config.ymyl ? "fail" : "warn",
      message: `No professional bio — ${config.ymyl ? "required for YMYL niche" : "adds authority signal"}`,
      weight: Math.round(13 * w),
    });
  }

  // 9. dateModified signal
  const hasDateModified = combined.includes("datemodified") || combined.includes("date_modified") ||
    /updated|modified|published/i.test(html);
  if (hasDateModified) {
    findings.push({ status: "pass", message: "Content freshness signal (dateModified) detected", weight: 10 });
  } else {
    findings.push({ status: "warn", message: "No dateModified signal — AI may consider content stale", weight: 10 });
  }

  const score = calculatePillarScore(findings);

  return {
    pillar: "eeat",
    pillarLabel: "E-E-A-T (Trust & Authority)",
    grade: scoreToGrade(score),
    score,
    findings,
    recommendations: findings.filter((f) => f.status === "fail").map((f) => f.message),
    serviceName: config.ymyl ? "Smart Website" : "Local SEO & AI Search",
    serviceLink: config.ymyl ? "/services/smart-website" : "/services/local-seo-ai",
  };
}
