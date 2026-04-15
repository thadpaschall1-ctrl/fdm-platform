/**
 * Pillar 5 — Multi-Platform Citation Building
 * Checks for presence on platforms that AI models cite.
 * Adapts based on scope: local businesses get GBP checks, national/directory sites get web presence checks.
 */

import type { NicheConfig } from "../niche-configs";
import type { Finding, PillarResult } from "../scoring";
import { calculatePillarScore, scoreToGrade } from "../scoring";

interface GooglePlacesData {
  found: boolean;
  rating?: number;
  reviewCount?: number;
  photoCount?: number;
  hasHours?: boolean;
  hasWebsite?: boolean;
  placeId?: string;
}

export function checkCitationPlatforms(
  html: string,
  config: NicheConfig,
  googleData: GooglePlacesData
): PillarResult {
  const findings: Finding[] = [];
  const lower = html.toLowerCase();
  const isLocal = config.scope === "local";

  if (isLocal) {
    // ── LOCAL BUSINESS: Check actual GBP listing ──────────────────────────
    if (googleData.found) {
      findings.push({ status: "pass", message: "Business found on Google -- GBP is active", weight: 15 });

      if (googleData.rating && googleData.rating >= 4.5) {
        findings.push({ status: "pass", message: `Google rating: ${googleData.rating} stars -- excellent`, weight: 10 });
      } else if (googleData.rating && googleData.rating >= 4.0) {
        findings.push({ status: "warn", message: `Google rating: ${googleData.rating} stars -- good but below 4.5 hurts AI citations`, weight: 10 });
      } else {
        findings.push({ status: "fail", message: `Google rating: ${googleData.rating || "N/A"} stars -- low rating suppresses AI visibility`, weight: 10 });
      }

      if (googleData.reviewCount && googleData.reviewCount >= 100) {
        findings.push({ status: "pass", message: `${googleData.reviewCount} Google reviews -- strong social proof`, weight: 10 });
      } else if (googleData.reviewCount && googleData.reviewCount >= 50) {
        findings.push({ status: "warn", message: `${googleData.reviewCount} Google reviews -- aim for 100+ for AI citation priority`, weight: 10 });
      } else {
        findings.push({ status: "fail", message: `Only ${googleData.reviewCount || 0} Google reviews -- below threshold for AI citation`, weight: 10 });
      }

      if (googleData.photoCount && googleData.photoCount >= 5) {
        findings.push({ status: "pass", message: `${googleData.photoCount} photos on GBP`, weight: 5 });
      } else {
        findings.push({ status: "warn", message: `${googleData.photoCount || 0} GBP photos -- add more for visibility`, weight: 5 });
      }

      if (googleData.hasHours) {
        findings.push({ status: "pass", message: "Business hours listed on GBP", weight: 5 });
      } else {
        findings.push({ status: "fail", message: "No hours on GBP", weight: 5 });
      }
    } else {
      findings.push({ status: "fail", message: "Business NOT found on Google -- critical visibility gap", weight: 25 });
    }
  } else {
    // ── NATIONAL/REGIONAL/DIRECTORY: Check web authority signals instead ──
    // These sites don't have (or need) a GBP listing — score based on web presence

    // Domain authority signals
    const hasMultiplePages = (lower.match(/<a[^>]+href=["']\/[a-z]/gi) || []).length;
    if (hasMultiplePages >= 10) {
      findings.push({ status: "pass", message: `Strong internal link structure (${hasMultiplePages}+ internal links)`, weight: 15 });
    } else if (hasMultiplePages >= 5) {
      findings.push({ status: "pass", message: `Good internal link structure (${hasMultiplePages} internal links)`, weight: 15 });
    } else {
      findings.push({ status: "warn", message: "Limited internal link structure -- add more pages/links", weight: 15 });
    }

    // Cross-site references (other sites linking to this domain)
    const hasCrossLinks = /growyourchiropracticpractice|chiropractorintampa|bestchiropractors|fastdigitalmarketing/i.test(html);
    if (hasCrossLinks) {
      findings.push({ status: "pass", message: "Cross-site network references detected -- strengthens authority", weight: 10 });
    } else {
      findings.push({ status: "warn", message: "No cross-site references -- link from related properties", weight: 10 });
    }

    // Contact information visible
    const hasContact = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|tel:|contact|email/i.test(html);
    if (hasContact) {
      findings.push({ status: "pass", message: "Contact information visible -- trust signal for AI", weight: 10 });
    } else {
      findings.push({ status: "fail", message: "No contact information visible", weight: 10 });
    }

    // Data-driven content (for directories)
    const hasDataContent = /score|rating|rank|review|data.*driven|algorithm|analyz/i.test(html);
    if (hasDataContent) {
      findings.push({ status: "pass", message: "Data-driven content detected -- high citation value for AI", weight: 10 });
    } else {
      findings.push({ status: "warn", message: "No data-driven content signals", weight: 10 });
    }
  }

  // ── Shared checks (all scopes) ────────────────────────────────────────

  // Yelp
  const hasYelp = /yelp\.com/i.test(html);
  if (hasYelp) {
    findings.push({ status: "pass", message: "Yelp reference -- Perplexity cites Yelp heavily", weight: 10 });
  } else {
    findings.push({ status: "warn", message: "No Yelp reference -- Perplexity uses Yelp as a primary source", weight: 10 });
  }

  // BBB
  const hasBBB = /bbb\.org/i.test(html);
  if (hasBBB) {
    findings.push({ status: "pass", message: "BBB reference -- authority signal across all LLMs", weight: 8 });
  } else {
    findings.push({ status: "warn", message: "No BBB reference -- missing authority signal", weight: 8 });
  }

  // Facebook
  const hasFacebook = /facebook\.com\/[a-z]/i.test(html);
  if (hasFacebook) {
    findings.push({ status: "pass", message: "Facebook page linked -- ChatGPT browsing + Bing citation", weight: 7 });
  } else {
    findings.push({ status: "warn", message: "No Facebook link -- missing ChatGPT/Bing citation source", weight: 7 });
  }

  // Niche directories
  let nicheDirectoryCount = 0;
  for (const dir of config.primaryDirectories) {
    const dirLower = dir.toLowerCase().replace(/\s+/g, "");
    if (lower.includes(dirLower) || lower.includes(dir.toLowerCase())) {
      nicheDirectoryCount++;
    }
  }

  if (nicheDirectoryCount >= 2) {
    findings.push({ status: "pass", message: `${nicheDirectoryCount} niche directory references (${config.primaryDirectories.join(", ")})`, weight: 10 });
  } else if (nicheDirectoryCount >= 1) {
    findings.push({ status: "warn", message: `Only ${nicheDirectoryCount} niche directory reference -- aim for 2+`, weight: 10 });
  } else {
    findings.push({ status: "warn", message: `No niche directory references -- consider linking: ${config.primaryDirectories.slice(0, 3).join(", ")}`, weight: 10 });
  }

  // LinkedIn
  const hasLinkedIn = /linkedin\.com\/(company|in)\//i.test(html);
  if (hasLinkedIn) {
    findings.push({ status: "pass", message: "LinkedIn profile linked -- B2B authority + ChatGPT training data", weight: 5 });
  } else {
    findings.push({ status: "info", message: "No LinkedIn link -- helpful for B2B authority", weight: 5 });
  }

  const score = calculatePillarScore(findings);

  return {
    pillar: "citationPlatforms",
    pillarLabel: "Citation Platforms",
    grade: scoreToGrade(score),
    score,
    findings,
    recommendations: findings.filter((f) => f.status === "fail").map((f) => f.message),
    serviceName: config.scope === "local" ? "/services/gbp-optimization" : "/services/local-seo-ai",
    serviceLink: config.scope === "local" ? "/services/gbp-optimization" : "/services/local-seo-ai",
  };
}
