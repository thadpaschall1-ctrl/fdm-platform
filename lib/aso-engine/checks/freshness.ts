/**
 * Pillar 6 — Perplexity Freshness & Technical Performance
 * Perplexity browses in near-real-time. Stale content loses citations within days.
 * Also checks performance signals that affect AI retrieval.
 */

import type { Finding, PillarResult } from "../scoring";
import { calculatePillarScore, scoreToGrade } from "../scoring";

export function checkFreshness(
  html: string,
  markdown: string,
  metadata: Record<string, string>,
  pageUrls: string[],
  websiteUrl: string
): PillarResult {
  const findings: Finding[] = [];
  const combined = (html + " " + JSON.stringify(metadata)).toLowerCase();

  // 1. dateModified / datePublished signals
  const hasDateModified = combined.includes("datemodified") || combined.includes("date_modified");
  const hasDatePublished = combined.includes("datepublished") || combined.includes("date_published");
  const hasVisibleDate = /updated|modified|published\s*(on|:)?\s*\w+\s*\d{1,2},?\s*\d{4}/i.test(html);

  if (hasDateModified) {
    findings.push({ status: "pass", message: "dateModified signal present — Perplexity checks this", weight: 15 });
  } else if (hasDatePublished || hasVisibleDate) {
    findings.push({ status: "warn", message: "Date published visible but no dateModified — add it for freshness signal", weight: 15 });
  } else {
    findings.push({ status: "fail", message: "No date signals — Perplexity may consider content stale", weight: 15 });
  }

  // 2. Direct answer in first visible paragraph (Perplexity 60-word rule)
  const firstParagraph = markdown.split("\n\n").find((p) => p.trim().length > 50);
  const firstWords = (firstParagraph || "").split(/\s+/).length;

  if (firstParagraph && firstWords <= 80 && firstWords >= 20) {
    findings.push({ status: "pass", message: `Opening paragraph is ${firstWords} words — ideal for Perplexity citation`, weight: 15 });
  } else if (firstParagraph && firstWords > 80) {
    findings.push({ status: "warn", message: `Opening paragraph is ${firstWords} words — trim to 60-80 for Perplexity`, weight: 15 });
  } else {
    findings.push({ status: "fail", message: "No clear opening paragraph — Perplexity needs a direct answer up front", weight: 15 });
  }

  // 3. Clean URLs (no query params, IDs, etc.)
  const url = websiteUrl.toLowerCase();
  const hasCleanUrl = !url.includes("?id=") && !url.includes("page=") && !url.includes("&");
  if (hasCleanUrl) {
    findings.push({ status: "pass", message: "Clean URL structure — AI-friendly", weight: 8 });
  } else {
    findings.push({ status: "fail", message: "URL has query parameters — messy URLs hurt AI retrieval", weight: 8 });
  }

  // 4. Page size (proxy for load speed)
  const pageSizeKb = Math.round(html.length / 1024);
  if (pageSizeKb < 200) {
    findings.push({ status: "pass", message: `Page size: ${pageSizeKb}KB — fast loading`, weight: 10 });
  } else if (pageSizeKb < 500) {
    findings.push({ status: "warn", message: `Page size: ${pageSizeKb}KB — could be leaner for faster AI retrieval`, weight: 10 });
  } else {
    findings.push({ status: "fail", message: `Page size: ${pageSizeKb}KB — heavy page hurts load speed and AI scraping`, weight: 10 });
  }

  // 5. llms.txt file
  const hasLlmsTxt = pageUrls.some((u) => u.includes("llms.txt")) || combined.includes("llms.txt");
  if (hasLlmsTxt) {
    findings.push({ status: "pass", message: "llms.txt detected — explicitly instructs AI how to cite you", weight: 12 });
  } else {
    findings.push({ status: "fail", message: "No llms.txt — missing direct instruction file for AI search engines", weight: 12 });
  }

  // 6. Sitemap reference
  const hasSitemap = combined.includes("sitemap") || pageUrls.some((u) => u.includes("sitemap"));
  if (hasSitemap) {
    findings.push({ status: "pass", message: "Sitemap detected — helps AI crawlers discover all pages", weight: 8 });
  } else {
    findings.push({ status: "warn", message: "No sitemap reference — AI crawlers may miss important pages", weight: 8 });
  }

  // 7. Blog / fresh content section
  const hasBlog = pageUrls.some((u) => /blog|news|articles|updates/i.test(u)) ||
    /blog|latest\s*(news|posts|articles)|recent\s*posts/i.test(html);
  if (hasBlog) {
    findings.push({ status: "pass", message: "Blog or news section detected — regular content updates boost freshness", weight: 12 });
  } else {
    findings.push({ status: "fail", message: "No blog or content updates — stale sites lose AI citations quickly", weight: 12 });
  }

  // 8. Mobile viewport
  const hasViewport = combined.includes("viewport");
  if (hasViewport) {
    findings.push({ status: "pass", message: "Mobile viewport configured", weight: 8 });
  } else {
    findings.push({ status: "fail", message: "No mobile viewport — 60%+ of traffic is mobile", weight: 8 });
  }

  // 9. Robots.txt / meta robots (not blocking AI)
  const blocksAI = /disallow.*gptbot|disallow.*chatgpt|disallow.*anthropic|disallow.*perplexity/i.test(html);
  if (blocksAI) {
    findings.push({ status: "fail", message: "robots.txt or meta blocks AI crawlers — you're opting OUT of AI search", weight: 12 });
  } else {
    findings.push({ status: "pass", message: "No AI crawler blocks detected — you're visible to AI search", weight: 12 });
  }

  const score = calculatePillarScore(findings);

  return {
    pillar: "freshness",
    pillarLabel: "Freshness & Performance",
    grade: scoreToGrade(score),
    score,
    findings,
    recommendations: findings.filter((f) => f.status === "fail").map((f) => f.message),
    serviceName: "Local SEO & AI Search",
    serviceLink: "/services/local-seo-ai",
  };
}
