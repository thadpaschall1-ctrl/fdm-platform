/**
 * Pillar 3 — Content Architecture for LLM Citation
 * AI models parse headers, bullets, tables, and direct answers.
 * Checks: H1 quality, content depth, FAQ presence, direct answers, cite-worthy data, geographic anchoring.
 */

import type { NicheConfig } from "../niche-configs";
import type { Finding, PillarResult } from "../scoring";
import { calculatePillarScore, scoreToGrade } from "../scoring";

export function checkContentArchitecture(
  html: string,
  markdown: string,
  config: NicheConfig,
  cityState: string
): PillarResult {
  const findings: Finding[] = [];
  const lower = markdown.toLowerCase();
  const city = cityState.split(",")[0]?.trim().toLowerCase() || "";

  // 1. H1 includes relevant signals (city for local, service type for all)
  const h1Match = markdown.match(/^#\s+(.+)$/m);
  const h1Text = (h1Match?.[1] || "").toLowerCase();
  const h1HasCity = city ? h1Text.includes(city) : false;
  const nicheTerms = config.entityLabel.toLowerCase().split(/[\s\/]+/).filter((t: string) => t.length > 3);
  const h1HasNiche = nicheTerms.some((t: string) => h1Text.includes(t));

  if (config.scope === "national") {
    // National businesses: H1 should have service type/brand, city not required
    if (h1HasNiche || h1Text.includes("marketing") || h1Text.includes("agency") || h1Text.includes("consulting")) {
      findings.push({ status: "pass", message: "H1 includes service type/brand — strong identity signal", weight: 15 });
    } else if (h1Match) {
      findings.push({ status: "warn", message: "H1 exists but doesn't clearly state what the business does", weight: 15 });
    } else {
      findings.push({ status: "fail", message: "No H1 tag found — critical for SEO and AI citation", weight: 15 });
    }
  } else if (config.scope === "regional") {
    // Regional: H1 should have region + service type
    if (h1HasNiche) {
      findings.push({ status: "pass", message: "H1 includes service type — good regional signal", weight: 15 });
    } else if (h1Match) {
      findings.push({ status: "warn", message: "H1 exists but missing service type", weight: 15 });
    } else {
      findings.push({ status: "fail", message: "No H1 tag found", weight: 15 });
    }
  } else {
    // Local: H1 should have city + service type
    if (h1HasCity && h1HasNiche) {
      findings.push({ status: "pass", message: "H1 includes city and service type — strong local + niche signal", weight: 15 });
    } else if (h1HasCity || h1HasNiche) {
      findings.push({ status: "warn", message: `H1 has ${h1HasCity ? "city" : "service type"} but missing ${h1HasCity ? "service type" : "city"}`, weight: 15 });
    } else if (h1Match) {
      findings.push({ status: "fail", message: "H1 exists but doesn't include city or service type", weight: 15 });
    } else {
      findings.push({ status: "fail", message: "No H1 tag found — critical for both SEO and AI citation", weight: 15 });
    }
  }

  // 2. Content depth (word count)
  const words = markdown.split(/\s+/).filter((w) => w.length > 0).length;
  if (words >= 1500) {
    findings.push({ status: "pass", message: `Comprehensive content (${words.toLocaleString()} words)`, weight: 12 });
  } else if (words >= 600) {
    findings.push({ status: "warn", message: `Moderate content depth (${words.toLocaleString()} words) — aim for 1,500+`, weight: 12 });
  } else {
    findings.push({ status: "fail", message: `Thin content (${words.toLocaleString()} words) — AI deprioritizes pages under 600 words`, weight: 12 });
  }

  // 3. FAQ section present (content, not just schema)
  const hasFaqSection = /faq|frequently asked|common questions/i.test(html);
  if (hasFaqSection) {
    findings.push({ status: "pass", message: "FAQ section detected — high citation value for AI", weight: 15 });
  } else {
    findings.push({ status: "fail", message: "No FAQ section — AI search engines strongly prefer Q&A content", weight: 15 });
  }

  // 4. Direct answer in first 300 words (expanded to account for nav/header text in raw HTML)
  const first300Words = markdown.split(/\s+/).slice(0, 300).join(" ").toLowerCase();
  const hasDirectAnswer = first300Words.includes("is a") || first300Words.includes("is an") ||
    first300Words.includes("is tampa") || first300Words.includes("is the") ||
    first300Words.includes("provides") || first300Words.includes("offers") ||
    first300Words.includes("serving") || first300Words.includes("specializ") ||
    first300Words.includes("helps") || first300Words.includes("helping") ||
    first300Words.includes("directory") || first300Words.includes("ranking") ||
    first300Words.includes("agency") || first300Words.includes("we help");

  if (hasDirectAnswer) {
    findings.push({ status: "pass", message: "Opening content provides direct answer — LLMs prioritize this", weight: 12 });
  } else {
    findings.push({ status: "fail", message: "First paragraph doesn't answer what this business does — AI may skip it", weight: 12 });
  }

  // 5. Numeric specificity (cite-worthy data)
  const numericPatterns = /\d+\s*(years?|%|stars?|reviews?|locations?|clients?|customers?|minutes?|hours?|days?|\$)/gi;
  const numericMatches = markdown.match(numericPatterns) || [];
  if (numericMatches.length >= 5) {
    findings.push({ status: "pass", message: `${numericMatches.length} numeric data points found — strong cite-worthy content`, weight: 10 });
  } else if (numericMatches.length >= 2) {
    findings.push({ status: "warn", message: `Only ${numericMatches.length} numeric data points — add more specific numbers`, weight: 10 });
  } else {
    findings.push({ status: "fail", message: "No numeric specificity — vague content is never cited by AI", weight: 10 });
  }

  // 6. Geographic anchoring (adjusted for scope)
  if (config.scope === "national") {
    // National businesses: check for service area language instead of city mentions
    const hasServiceArea = /nationwide|united states|across the country|any industry|all industries|businesses everywhere/i.test(markdown);
    if (hasServiceArea) {
      findings.push({ status: "pass", message: "National service area clearly stated", weight: 12 });
    } else {
      findings.push({ status: "warn", message: "No clear national service area language — mention you serve businesses nationwide", weight: 12 });
    }
  } else {
    const cityMentions = city ? (lower.match(new RegExp(city, "gi")) || []).length : 0;
    if (cityMentions >= 3) {
      findings.push({ status: "pass", message: `City mentioned ${cityMentions} times — strong geographic anchor`, weight: 12 });
    } else if (cityMentions >= 1) {
      findings.push({ status: "warn", message: `City only mentioned ${cityMentions} time(s) — add more local context`, weight: 12 });
    } else {
      findings.push({ status: "fail", message: "No city/location mentions — invisible for local AI queries", weight: 12 });
    }
  }

  // 7. Marketing superlatives (negative signal)
  const superlatives = /best\s*in\s*class|world\s*class|amazing|incredible|fantastic|top\s*notch|second\s*to\s*none/gi;
  const superlativeCount = (markdown.match(superlatives) || []).length;
  if (superlativeCount === 0) {
    findings.push({ status: "pass", message: "No marketing superlatives — factual tone that AI trusts", weight: 10 });
  } else {
    findings.push({ status: "warn", message: `${superlativeCount} marketing superlatives found — AI models distrust hype language`, weight: 10 });
  }

  // 8. Heading structure (H2s for topic coverage)
  const h2Count = (markdown.match(/^##\s+/gm) || []).length;
  if (h2Count >= 4) {
    findings.push({ status: "pass", message: `${h2Count} H2 sections — good topic coverage for AI parsing`, weight: 14 });
  } else if (h2Count >= 2) {
    findings.push({ status: "warn", message: `Only ${h2Count} H2 sections — aim for 4+ for comprehensive topic coverage`, weight: 14 });
  } else {
    findings.push({ status: "fail", message: `${h2Count} H2 section(s) — flat content structure hurts AI parsing`, weight: 14 });
  }

  const score = calculatePillarScore(findings);

  return {
    pillar: "contentArchitecture",
    pillarLabel: "Content Architecture",
    grade: scoreToGrade(score),
    score,
    findings,
    recommendations: findings.filter((f) => f.status === "fail").map((f) => f.message),
    serviceName: "Local SEO & AI Search",
    serviceLink: "/services/local-seo-ai",
  };
}
