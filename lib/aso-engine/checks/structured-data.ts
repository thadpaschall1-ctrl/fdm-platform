/**
 * Pillar 2 — Structured Data Depth
 * Stack multiple schema types per page using niche config's schemaTypes.
 * Checks: FAQPage, AggregateRating, Service, BreadcrumbList, HowTo, and niche-specific types.
 */

import type { NicheConfig } from "../niche-configs";
import type { Finding, PillarResult } from "../scoring";
import { calculatePillarScore, scoreToGrade } from "../scoring";

export function checkStructuredData(
  html: string,
  metadata: Record<string, string>,
  config: NicheConfig
): PillarResult {
  const findings: Finding[] = [];
  const combined = (html + " " + JSON.stringify(metadata)).toLowerCase();

  // 1. Any JSON-LD present at all
  const hasJsonLd = combined.includes("application/ld+json");
  if (hasJsonLd) {
    findings.push({ status: "pass", message: "JSON-LD structured data present", weight: 10 });
  } else {
    findings.push({ status: "fail", message: "No JSON-LD structured data found on this page", weight: 10 });
  }

  // 2. FAQPage schema (critical for AI citations)
  const hasFaq = combined.includes("faqpage");
  if (hasFaq) {
    findings.push({ status: "pass", message: "FAQPage schema detected — eligible for AI Overview citations", weight: 20 });
  } else {
    findings.push({ status: "fail", message: "No FAQPage schema — missing the #1 driver of AI citations", weight: 20 });
  }

  // 3. AggregateRating schema
  const hasRating = combined.includes("aggregaterating");
  if (hasRating) {
    findings.push({ status: "pass", message: "AggregateRating schema present — social proof signal for AI", weight: 15 });
  } else {
    findings.push({ status: "fail", message: "No AggregateRating schema — AI can't see your review score", weight: 15 });
  }

  // 4. Service schema
  const hasService = combined.includes('"service"') || combined.includes("@type.*service");
  if (hasService) {
    findings.push({ status: "pass", message: "Service schema detected", weight: 10 });
  } else {
    findings.push({ status: "warn", message: "No Service schema — AI can't match you to service-specific queries", weight: 10 });
  }

  // 5. BreadcrumbList
  const hasBreadcrumb = combined.includes("breadcrumblist");
  if (hasBreadcrumb) {
    findings.push({ status: "pass", message: "BreadcrumbList schema present — site structure clarity", weight: 5 });
  } else {
    findings.push({ status: "warn", message: "No BreadcrumbList — minor signal but helps AI understand site structure", weight: 5 });
  }

  // 6. Niche-specific schema types
  const nicheSchemaFound: string[] = [];
  const nicheSchemasMissing: string[] = [];

  for (const schemaType of config.schemaTypes) {
    const typeLower = schemaType.toLowerCase();
    // Skip generic ones we already checked
    if (typeLower === "faqpage" || typeLower === "localbusiness") continue;

    if (combined.includes(typeLower)) {
      nicheSchemaFound.push(schemaType);
    } else {
      nicheSchemasMissing.push(schemaType);
    }
  }

  if (nicheSchemaFound.length > 0) {
    findings.push({
      status: "pass",
      message: `Niche-specific schema detected: ${nicheSchemaFound.join(", ")}`,
      weight: 15,
    });
  } else if (nicheSchemasMissing.length > 0) {
    findings.push({
      status: "fail",
      message: `Missing niche schema: ${nicheSchemasMissing.join(", ")} — needed for ${config.entityLabel} sites`,
      weight: 15,
    });
  }

  // 7. OpenGraph tags
  const hasOg = !!(metadata.ogTitle || metadata.ogDescription || metadata.ogImage);
  if (hasOg) {
    findings.push({ status: "pass", message: "OpenGraph tags present — better social/AI sharing", weight: 10 });
  } else {
    findings.push({ status: "fail", message: "No OpenGraph tags — social shares and AI previews will look broken", weight: 10 });
  }

  // 8. Multiple schema types stacked (the power move)
  const schemaCount = [
    hasFaq, hasRating, hasService, hasBreadcrumb,
    nicheSchemaFound.length > 0, hasJsonLd,
  ].filter(Boolean).length;

  if (schemaCount >= 4) {
    findings.push({ status: "pass", message: `${schemaCount} schema types stacked — strong structured data depth`, weight: 15 });
  } else if (schemaCount >= 2) {
    findings.push({ status: "warn", message: `Only ${schemaCount} schema types — aim for 4+ per page`, weight: 15 });
  } else {
    findings.push({ status: "fail", message: `Only ${schemaCount} schema type(s) — pages need 4+ stacked schemas to compete`, weight: 15 });
  }

  const score = calculatePillarScore(findings);

  return {
    pillar: "structuredData",
    pillarLabel: "Structured Data Depth",
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
