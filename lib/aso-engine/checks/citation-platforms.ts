/**
 * Pillar 5 — Multi-Platform Citation Building
 * Checks for presence on platforms that AI models cite.
 * Uses Google Places API for GBP data + HTML scraping for profile links.
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

  // 1. Google Business Profile (the #1 source for Google AI Overviews)
  if (googleData.found) {
    findings.push({ status: "pass", message: "Business found on Google — GBP is active", weight: 15 });

    // Rating quality
    if (googleData.rating && googleData.rating >= 4.5) {
      findings.push({ status: "pass", message: `Google rating: ${googleData.rating} stars — excellent`, weight: 10 });
    } else if (googleData.rating && googleData.rating >= 4.0) {
      findings.push({ status: "warn", message: `Google rating: ${googleData.rating} stars — good but below 4.5 hurts AI citations`, weight: 10 });
    } else {
      findings.push({ status: "fail", message: `Google rating: ${googleData.rating || "N/A"} stars — low rating suppresses AI visibility`, weight: 10 });
    }

    // Review count
    if (googleData.reviewCount && googleData.reviewCount >= 100) {
      findings.push({ status: "pass", message: `${googleData.reviewCount} Google reviews — strong social proof`, weight: 10 });
    } else if (googleData.reviewCount && googleData.reviewCount >= 50) {
      findings.push({ status: "warn", message: `${googleData.reviewCount} Google reviews — aim for 100+ for AI citation priority`, weight: 10 });
    } else {
      findings.push({ status: "fail", message: `Only ${googleData.reviewCount || 0} Google reviews — below threshold for AI citation`, weight: 10 });
    }

    // Photos
    if (googleData.photoCount && googleData.photoCount >= 5) {
      findings.push({ status: "pass", message: `${googleData.photoCount} photos on GBP — profiles with photos get 42% more requests`, weight: 5 });
    } else {
      findings.push({ status: "warn", message: `${googleData.photoCount || 0} GBP photos — add more for visibility`, weight: 5 });
    }

    // Hours
    if (googleData.hasHours) {
      findings.push({ status: "pass", message: "Business hours listed on GBP", weight: 5 });
    } else {
      findings.push({ status: "fail", message: "No hours on GBP — customers don't know when you're open", weight: 5 });
    }
  } else {
    findings.push({ status: "fail", message: "Business NOT found on Google — critical visibility gap", weight: 25 });
  }

  // 2. Yelp (Perplexity cites Yelp heavily)
  const hasYelp = /yelp\.com/i.test(html);
  if (hasYelp) {
    findings.push({ status: "pass", message: "Yelp profile linked — Perplexity cites Yelp heavily", weight: 10 });
  } else {
    findings.push({ status: "fail", message: "No Yelp link — Perplexity uses Yelp as a primary source", weight: 10 });
  }

  // 3. BBB
  const hasBBB = /bbb\.org/i.test(html);
  if (hasBBB) {
    findings.push({ status: "pass", message: "BBB profile linked — authority signal across all LLMs", weight: 8 });
  } else {
    findings.push({ status: "warn", message: "No BBB link — missing authority signal", weight: 8 });
  }

  // 4. Facebook
  const hasFacebook = /facebook\.com\/[a-z]/i.test(html);
  if (hasFacebook) {
    findings.push({ status: "pass", message: "Facebook Business Page linked — ChatGPT browsing + Bing citation", weight: 7 });
  } else {
    findings.push({ status: "warn", message: "No Facebook link — missing ChatGPT/Bing citation source", weight: 7 });
  }

  // 5. Niche-specific directories
  let nicheDirectoryCount = 0;
  for (const dir of config.primaryDirectories) {
    const dirLower = dir.toLowerCase().replace(/\s+/g, "");
    if (lower.includes(dirLower) || lower.includes(dir.toLowerCase())) {
      nicheDirectoryCount++;
    }
  }

  if (nicheDirectoryCount >= 2) {
    findings.push({ status: "pass", message: `${nicheDirectoryCount} niche directories linked (${config.primaryDirectories.join(", ")})`, weight: 10 });
  } else if (nicheDirectoryCount >= 1) {
    findings.push({ status: "warn", message: `Only ${nicheDirectoryCount} niche directory linked — aim for 2+ from: ${config.primaryDirectories.join(", ")}`, weight: 10 });
  } else {
    findings.push({ status: "fail", message: `No niche directory links — missing: ${config.primaryDirectories.join(", ")}`, weight: 10 });
  }

  // 6. LinkedIn (especially for B2B)
  const hasLinkedIn = /linkedin\.com\/(company|in)\//i.test(html);
  if (hasLinkedIn) {
    findings.push({ status: "pass", message: "LinkedIn profile linked — B2B authority + ChatGPT training data", weight: 5 });
  } else {
    findings.push({ status: "info", message: "No LinkedIn link — helpful for B2B authority", weight: 5 });
  }

  const score = calculatePillarScore(findings);

  return {
    pillar: "citationPlatforms",
    pillarLabel: "Citation Platforms",
    grade: scoreToGrade(score),
    score,
    findings,
    recommendations: findings.filter((f) => f.status === "fail").map((f) => f.message),
    serviceName: "GBP Optimization",
    serviceLink: "/services/gbp-optimization",
  };
}
