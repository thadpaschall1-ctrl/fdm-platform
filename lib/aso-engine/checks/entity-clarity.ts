/**
 * Pillar 1 — Entity Clarity
 * LLMs must know exactly WHO and WHAT the business is.
 * Checks: JSON-LD business schema, NAP consistency, credentials, About page signals.
 */

import type { NicheConfig } from "../niche-configs";
import type { Finding, PillarResult } from "../scoring";
import { calculatePillarScore, scoreToGrade } from "../scoring";

export function checkEntityClarity(
  html: string,
  markdown: string,
  metadata: Record<string, string>,
  config: NicheConfig
): PillarResult {
  const findings: Finding[] = [];
  const lower = html.toLowerCase();
  const combined = lower + " " + JSON.stringify(metadata).toLowerCase();

  // 1. JSON-LD with correct business_type
  const hasJsonLd = combined.includes("application/ld+json");
  const hasCorrectType = combined.includes(config.businessType.toLowerCase()) || combined.includes("localbusiness");
  if (hasJsonLd && hasCorrectType) {
    findings.push({ status: "pass", message: `${config.businessType} JSON-LD schema detected`, weight: 20 });
  } else if (hasJsonLd) {
    findings.push({ status: "warn", message: `JSON-LD present but missing ${config.businessType} type`, weight: 20 });
  } else {
    findings.push({ status: "fail", message: `No JSON-LD schema — LLMs cannot identify your business type`, weight: 20 });
  }

  // 2. Business name in title
  const hasTitle = !!(metadata.title || metadata.ogTitle);
  if (hasTitle) {
    findings.push({ status: "pass", message: "Business name in page title", weight: 10 });
  } else {
    findings.push({ status: "fail", message: "Missing page title — critical entity signal", weight: 10 });
  }

  // 3. NAP (Name, Address, Phone) visible
  const hasPhone = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|tel:/i.test(html);
  const hasAddress = /\d+\s+\w+\s+(st|street|ave|avenue|blvd|boulevard|dr|drive|rd|road|ln|lane|way|ct|court)/i.test(html);

  if (hasPhone && hasAddress) {
    findings.push({ status: "pass", message: "Phone and address visible on page (NAP present)", weight: 15 });
  } else if (hasPhone) {
    findings.push({ status: "warn", message: "Phone visible but no street address detected", weight: 15 });
  } else {
    findings.push({ status: "fail", message: "No phone or address visible — missing NAP signals", weight: 15 });
  }

  // 4. Credential field visible
  const credLower = config.credentialField.toLowerCase();
  const credTerms = credLower.split(",").map((t) => t.trim().split(" ")[0]);
  const hasCredential = credTerms.some((term) => combined.includes(term));

  if (hasCredential) {
    findings.push({ status: "pass", message: `Industry credentials detected (${config.credentialField})`, weight: 15 });
  } else {
    findings.push({ status: "fail", message: `No ${config.credentialField} visible — weakens authority`, weight: 15 });
  }

  // 5. About page / entity description
  const hasAbout = /about\s*(us|the|our)|who\s*we\s*are|our\s*story|our\s*team/i.test(html);
  if (hasAbout) {
    findings.push({ status: "pass", message: "About section detected — entity context for LLMs", weight: 10 });
  } else {
    findings.push({ status: "fail", message: "No About section — LLMs lack entity context", weight: 10 });
  }

  // 6. sameAs / external profile links
  const hasSameAs = combined.includes("sameas") || /yelp\.com|bbb\.org|facebook\.com.*\/[a-z]/i.test(html);
  if (hasSameAs) {
    findings.push({ status: "pass", message: "External profile links detected (sameAs signals)", weight: 10 });
  } else {
    findings.push({ status: "fail", message: "No links to external profiles (Yelp, BBB, Facebook) — weakens entity graph", weight: 10 });
  }

  // 7. Consistent entity description in first 200 words
  const firstWords = markdown.slice(0, 1500).toLowerCase();
  const hasEntityDesc = firstWords.includes(config.entityLabel.split("/")[0].trim().toLowerCase());
  if (hasEntityDesc) {
    findings.push({ status: "pass", message: `Entity type "${config.entityLabel}" mentioned early in content`, weight: 10 });
  } else {
    findings.push({ status: "warn", message: `Content doesn't clearly identify the business as a ${config.entityLabel}`, weight: 10 });
  }

  // 8. @id anchor in JSON-LD
  const hasIdAnchor = combined.includes('"@id"');
  if (hasIdAnchor) {
    findings.push({ status: "pass", message: "JSON-LD @id anchor present — strong entity signal", weight: 10 });
  } else {
    findings.push({ status: "fail", message: "No @id anchor in JSON-LD — LLMs can't uniquely identify this entity", weight: 10 });
  }

  const score = calculatePillarScore(findings);

  return {
    pillar: "entityClarity",
    pillarLabel: "Entity Clarity",
    grade: scoreToGrade(score),
    score,
    findings,
    recommendations: findings
      .filter((f) => f.status === "fail")
      .map((f) => f.message),
    serviceName: "Smart Website",
    serviceLink: "/services/smart-website",
  };
}
