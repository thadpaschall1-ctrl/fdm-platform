/**
 * ASO Engine — Main Entry Point
 * Runs all 6 pillar checks and assembles a full audit report.
 *
 * Usage:
 *   import { runFullAudit } from "@/lib/aso-engine";
 *   const report = await runFullAudit({ businessName, niche, cityState, websiteUrl });
 *
 * Data sources:
 *   - Firecrawl (scrape + map) for website data
 *   - Google Places API for GBP/reputation data
 *
 * This engine is niche-agnostic — pass any industry and it adapts automatically.
 */

import { getNicheConfig } from "./niche-configs";
import {
  scoreToGrade,
  generateSummary,
  getTopPriorities,
  type FullAuditReport,
  type PillarResult,
} from "./scoring";
import { checkEntityClarity } from "./checks/entity-clarity";
import { checkStructuredData } from "./checks/structured-data";
import { checkContentArchitecture } from "./checks/content-architecture";
import { checkEEAT } from "./checks/eeat";
import { checkCitationPlatforms } from "./checks/citation-platforms";
import { checkFreshness } from "./checks/freshness";

// ── Firecrawl helpers ───────────────────────────────────────────────────────

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const FIRECRAWL_BASE = "https://api.firecrawl.dev/v1";

async function firecrawlScrape(url: string): Promise<{ markdown: string; metadata: Record<string, string>; html: string }> {
  if (!FIRECRAWL_API_KEY) {
    console.log("[ASO] Firecrawl not configured — falling back to basic fetch");
    return fallbackFetch(url);
  }

  try {
    const res = await fetch(`${FIRECRAWL_BASE}/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${FIRECRAWL_API_KEY}` },
      body: JSON.stringify({ url, formats: ["markdown", "html"], onlyMainContent: false, waitFor: 3000 }),
    });

    if (!res.ok) {
      console.error(`[ASO] Firecrawl scrape failed: ${res.status}`);
      return fallbackFetch(url);
    }

    const data = await res.json();
    return {
      markdown: data.data?.markdown || "",
      metadata: data.data?.metadata || {},
      html: data.data?.html || "",
    };
  } catch (err) {
    console.error("[ASO] Firecrawl error:", err);
    return fallbackFetch(url);
  }
}

async function firecrawlMap(url: string): Promise<string[]> {
  if (!FIRECRAWL_API_KEY) return [];

  try {
    const res = await fetch(`${FIRECRAWL_BASE}/map`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${FIRECRAWL_API_KEY}` },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.links || [];
  } catch {
    return [];
  }
}

async function fallbackFetch(url: string): Promise<{ markdown: string; metadata: Record<string, string>; html: string }> {
  try {
    const normalized = url.startsWith("http") ? url : `https://${url}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(normalized, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; FDMAuditBot/1.0)" },
    });
    clearTimeout(timeout);
    const html = await res.text();
    return { markdown: html, metadata: {}, html };
  } catch {
    return { markdown: "", metadata: {}, html: "" };
  }
}

// ── Raw HTML fetch (for script tags that Firecrawl strips) ──────────────────

async function fetchRawHtml(url: string): Promise<string> {
  try {
    // Add cache-buster to bypass edge caches
    const bustUrl = url + (url.includes("?") ? "&" : "?") + "_cb=" + Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(bustUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FDMAuditBot/1.0)",
        "Cache-Control": "no-cache, no-store",
        "Pragma": "no-cache",
      },
    });
    clearTimeout(timeout);
    return await res.text();
  } catch {
    return "";
  }
}

// ── Google Places helper ────────────────────────────────────────────────────

async function fetchGooglePlaces(businessName: string, cityState: string) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return { found: false };

  try {
    const query = encodeURIComponent(`${businessName} ${cityState}`);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
    const res = await fetch(url);
    const json = await res.json();
    const place = json.results?.[0];

    if (!place) return { found: false };

    return {
      found: true,
      rating: place.rating ?? 0,
      reviewCount: place.user_ratings_total ?? 0,
      photoCount: place.photos?.length ?? 0,
      hasHours: !!place.opening_hours,
      hasWebsite: !!(place.formatted_address || place.website),
      placeId: place.place_id,
    };
  } catch {
    return { found: false };
  }
}

// ── Main audit function ─────────────────────────────────────────────────────

export interface AuditInput {
  businessName: string;
  niche: string;
  scope?: string;
  cityState: string;
  websiteUrl: string;
}

export async function runFullAudit(input: AuditInput): Promise<FullAuditReport> {
  const config = getNicheConfig(input.niche, input.scope);
  const normalizedUrl = input.websiteUrl.startsWith("http") ? input.websiteUrl : `https://${input.websiteUrl}`;

  console.log(`[ASO] Starting full audit for "${input.businessName}" (${config.slug}) in ${input.cityState}`);

  // Fetch all data in parallel — Firecrawl for content + raw fetch for HTML (script tags)
  const [scrapeResult, pageUrls, googleData, rawHtmlResult] = await Promise.all([
    firecrawlScrape(normalizedUrl),
    firecrawlMap(normalizedUrl),
    fetchGooglePlaces(input.businessName, input.cityState),
    fetchRawHtml(normalizedUrl),
  ]);

  // Use raw HTML for schema/structured data checks (Firecrawl strips <script> tags)
  // Use Firecrawl markdown for content analysis (better parsing)
  const { markdown, metadata } = scrapeResult;
  const html = rawHtmlResult || scrapeResult.html;

  console.log(`[ASO] Data collected — HTML: ${html.length} bytes, Pages: ${pageUrls.length}, Google: ${googleData.found ? "found" : "not found"}`);

  // Run all 6 pillar checks
  const pillars: PillarResult[] = [
    checkEntityClarity(html, markdown, metadata, config),
    checkStructuredData(html, metadata, config),
    checkContentArchitecture(html, markdown, config, input.cityState),
    checkEEAT(html, markdown, metadata, config, pageUrls),
    checkCitationPlatforms(html, config, googleData),
    checkFreshness(html, markdown, metadata, pageUrls, normalizedUrl),
  ];

  // Calculate overall score (weighted average — all pillars equal for now)
  const overallScore = Math.round(pillars.reduce((sum, p) => sum + p.score, 0) / pillars.length);
  const overallGrade = scoreToGrade(overallScore);

  console.log(`[ASO] Audit complete — Overall: ${overallGrade} (${overallScore}/100)`);

  return {
    businessName: input.businessName,
    niche: input.niche,
    nicheLabel: config.entityLabel,
    cityState: input.cityState,
    websiteUrl: normalizedUrl,
    overallGrade,
    overallScore,
    pillars,
    summary: generateSummary(overallScore, input.businessName, config.entityLabel),
    topPriorities: getTopPriorities(pillars),
    generatedAt: new Date().toISOString(),
  };
}

// Re-export types for consumers
export type { FullAuditReport, PillarResult, Finding } from "./scoring";
export type { NicheConfig } from "./niche-configs";
export { getNicheConfig } from "./niche-configs";
