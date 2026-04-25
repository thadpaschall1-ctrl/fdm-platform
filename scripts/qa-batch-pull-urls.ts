/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * QA Batch — pulls 3 real businesses per niche from Google Places API
 * for the AI site generator's QA test batch.
 *
 * For each niche we run a Google Places Text Search with niche-appropriate
 * keywords + a city (rotated across major US metros for variety), then filter
 * to businesses with FEWER than 50 Google reviews — those are the underdogs
 * FDM is actually targeting. Heavyweights with 500+ reviews already dominate
 * search and don't need us.
 *
 * Output: data/qa-batch.json — a structured list of 45 (niche, business) tuples
 * ready to feed into the site generator (when it's built in a later session).
 *
 * USAGE (from fdm-platform root):
 *   npm run qa-pull
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

// Load .env.local explicitly (script runs outside Next.js)
try {
  process.loadEnvFile(".env.local");
} catch {
  /* fall back to existing env */
}

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
if (!apiKey) {
  console.error("❌ GOOGLE_PLACES_API_KEY is not set in .env.local");
  process.exit(1);
}

// ── Config ──────────────────────────────────────────────────────────

interface NicheConfig {
  /** Matches a slug in lib/data/industries.ts */
  slug: string;
  /** Pretty name */
  name: string;
  /** Google Places Text Search query — what someone would type */
  searchQuery: string;
  /** Cities to rotate across — gives geographic variety */
  cities: string[];
}

const CITIES_PRIMARY = [
  "Tampa, FL",
  "Phoenix, AZ",
  "Charlotte, NC",
  "Austin, TX",
  "Denver, CO",
  "Atlanta, GA",
  "Nashville, TN",
  "Las Vegas, NV",
];

const NICHES: NicheConfig[] = [
  { slug: "foundation-repair",  name: "Foundation Repair",  searchQuery: "foundation repair contractor", cities: CITIES_PRIMARY },
  { slug: "solar-installers",   name: "Solar Installers",   searchQuery: "solar panel installer",        cities: CITIES_PRIMARY },
  { slug: "hvac",               name: "HVAC",               searchQuery: "hvac contractor",              cities: CITIES_PRIMARY },
  { slug: "roofers",            name: "Roofers",            searchQuery: "roofing contractor",           cities: CITIES_PRIMARY },
  { slug: "hair-salons",        name: "Hair Salons",        searchQuery: "hair salon",                   cities: CITIES_PRIMARY },
  { slug: "plumbers",           name: "Plumbers",           searchQuery: "plumber",                      cities: CITIES_PRIMARY },
  { slug: "polished-concrete",  name: "Polished Concrete",  searchQuery: "polished concrete contractor", cities: CITIES_PRIMARY },
  { slug: "decorative-concrete",name: "Decorative Concrete",searchQuery: "stamped concrete patio",       cities: CITIES_PRIMARY },
  { slug: "pool-builders",      name: "Pool Builders",      searchQuery: "pool builder inground",        cities: CITIES_PRIMARY },
  { slug: "medical-spas",       name: "Med Spas",           searchQuery: "medical spa botox",            cities: CITIES_PRIMARY },
  { slug: "auto-body",          name: "Auto Body",          searchQuery: "auto body collision repair",   cities: CITIES_PRIMARY },
  { slug: "mobile-pet-grooming",name: "Mobile Pet Grooming",searchQuery: "mobile dog grooming",          cities: CITIES_PRIMARY },
  { slug: "fitness",            name: "Fitness Studios",    searchQuery: "boutique fitness studio",      cities: CITIES_PRIMARY },
  { slug: "stair-lift",         name: "Stair Lift",         searchQuery: "stair lift dealer",            cities: CITIES_PRIMARY },
  { slug: "real-estate",        name: "Real Estate Agents", searchQuery: "real estate agent broker",     cities: CITIES_PRIMARY },
];

const REVIEWS_MAX = 50;          // Filter: businesses with fewer than this many reviews
const PER_NICHE = 3;             // Target: 3 businesses per niche
const MAX_CITIES_TO_TRY = 8;     // Stop searching after this many cities even if we don't have 3 yet

// ── Helpers ────────────────────────────────────────────────────────

interface PlaceResult {
  name?: string;
  formatted_address?: string;
  user_ratings_total?: number;
  rating?: number;
  place_id: string;
  business_status?: string;
}

interface PlaceDetails {
  name?: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  url?: string;
  formatted_address?: string;
  user_ratings_total?: number;
  rating?: number;
  business_status?: string;
}

interface QaBusiness {
  niche_slug: string;
  niche_name: string;
  business_name: string;
  city: string;
  phone?: string;
  website?: string;
  google_url?: string;
  formatted_address?: string;
  review_count: number;
  rating?: number;
  place_id: string;
  pulled_at: string;
}

async function searchPlaces(query: string, city: string): Promise<PlaceResult[]> {
  const fullQuery = `${query} in ${city}`;
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(fullQuery)}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`    ⚠ Places search failed for "${fullQuery}": ${res.status}`);
    return [];
  }
  const data: any = await res.json();
  if (data.status === "ZERO_RESULTS") return [];
  if (data.status !== "OK") {
    console.warn(`    ⚠ Places status: ${data.status} for "${fullQuery}"`);
    return [];
  }
  return data.results as PlaceResult[];
}

async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  const fields = [
    "name",
    "formatted_phone_number",
    "international_phone_number",
    "website",
    "url",
    "formatted_address",
    "user_ratings_total",
    "rating",
    "business_status",
  ].join(",");
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data: any = await res.json();
  if (data.status !== "OK") return null;
  return data.result as PlaceDetails;
}

async function pullForNiche(niche: NicheConfig): Promise<QaBusiness[]> {
  const collected: QaBusiness[] = [];
  const seenPlaceIds = new Set<string>();

  for (const city of niche.cities.slice(0, MAX_CITIES_TO_TRY)) {
    if (collected.length >= PER_NICHE) break;
    console.log(`  🔎 ${niche.name} in ${city}...`);

    const candidates = await searchPlaces(niche.searchQuery, city);
    // Filter to under-50-review underdogs that are operational
    const filtered = candidates
      .filter((c) => c.business_status === "OPERATIONAL" || !c.business_status)
      .filter((c) => (c.user_ratings_total ?? 0) < REVIEWS_MAX)
      .filter((c) => !seenPlaceIds.has(c.place_id));

    for (const cand of filtered) {
      if (collected.length >= PER_NICHE) break;
      seenPlaceIds.add(cand.place_id);

      const details = await getPlaceDetails(cand.place_id);
      // Only keep businesses that have a website — without a URL we can't run the
      // generator's URL-gate scraping flow.
      if (!details?.website) {
        console.log(`    ↳ skip (no website): ${cand.name}`);
        continue;
      }

      const biz: QaBusiness = {
        niche_slug: niche.slug,
        niche_name: niche.name,
        business_name: details.name || cand.name || "Unknown",
        city,
        phone: details.formatted_phone_number || details.international_phone_number,
        website: details.website,
        google_url: details.url,
        formatted_address: details.formatted_address,
        review_count: details.user_ratings_total ?? cand.user_ratings_total ?? 0,
        rating: details.rating ?? cand.rating,
        place_id: cand.place_id,
        pulled_at: new Date().toISOString(),
      };
      collected.push(biz);
      console.log(`    ✓ ${biz.business_name} (${biz.review_count} reviews) — ${biz.website}`);
    }
  }

  if (collected.length < PER_NICHE) {
    console.warn(
      `  ⚠ Only found ${collected.length}/${PER_NICHE} for ${niche.name} — try expanding cities or reviewing the search query.`
    );
  }
  return collected;
}

// ── Main ──────────────────────────────────────────────────────────

async function main() {
  console.log("─".repeat(72));
  console.log("FDM QA Batch — Pulling Real Businesses from Google Places");
  console.log(`Target: ${PER_NICHE} businesses × ${NICHES.length} niches = ${PER_NICHE * NICHES.length} total`);
  console.log(`Filter: reviews < ${REVIEWS_MAX}, has website, status OPERATIONAL`);
  console.log("─".repeat(72));

  const all: QaBusiness[] = [];
  for (const niche of NICHES) {
    console.log(`\n▸ ${niche.name} (${niche.slug})`);
    const found = await pullForNiche(niche);
    all.push(...found);
  }

  // Output
  const outDir = path.join(process.cwd(), "data");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "qa-batch.json");

  const output = {
    generated_at: new Date().toISOString(),
    total: all.length,
    target: PER_NICHE * NICHES.length,
    filter: { reviews_max: REVIEWS_MAX, requires_website: true },
    niches: NICHES.map((n) => ({
      slug: n.slug,
      name: n.name,
      pulled: all.filter((b) => b.niche_slug === n.slug).length,
    })),
    businesses: all,
  };

  writeFileSync(outFile, JSON.stringify(output, null, 2));

  console.log("\n" + "═".repeat(72));
  console.log(`✅ DONE — pulled ${all.length}/${PER_NICHE * NICHES.length} businesses`);
  console.log(`   Saved to: ${path.relative(process.cwd(), outFile)}`);
  console.log("═".repeat(72));

  // Summary table
  console.log("\nPer-niche summary:");
  for (const n of NICHES) {
    const count = all.filter((b) => b.niche_slug === n.slug).length;
    const indicator = count === PER_NICHE ? "✅" : count > 0 ? "⚠️ " : "❌";
    console.log(`  ${indicator} ${n.name.padEnd(28)} ${count}/${PER_NICHE}`);
  }
  console.log();
}

main().catch((err) => {
  console.error("\n❌ Script failed:", err);
  process.exit(1);
});
