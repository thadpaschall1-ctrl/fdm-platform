/**
 * Preview data loader.
 *
 * Reads `data/qa-batch.json` (the output of `npm run qa-pull`) and resolves
 * preview IDs like "foundation-repair-0" to the underlying business record.
 *
 * The preview ID format is `{niche_slug}-{index}` where index is 0-based
 * within that niche's businesses (typically 0-2). Stable across runs as long
 * as qa-batch.json isn't regenerated.
 */

import { readFileSync } from "node:fs";
import path from "node:path";

export interface QaBusiness {
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

interface QaBatchFile {
  generated_at: string;
  total: number;
  businesses: QaBusiness[];
}

let cache: QaBatchFile | null = null;

function loadBatch(): QaBatchFile {
  if (cache) return cache;
  const file = path.join(process.cwd(), "data", "qa-batch.json");
  const raw = readFileSync(file, "utf-8");
  cache = JSON.parse(raw) as QaBatchFile;
  return cache;
}

export interface ResolvedBusiness {
  business: QaBusiness;
  /** Preview ID assigned to this business (slug-index) */
  previewId: string;
  /** Index within the niche (0/1/2) */
  indexInNiche: number;
}

/**
 * Resolve a preview ID like "foundation-repair-0" to a business.
 * Returns null if the ID doesn't match anything.
 */
export function resolvePreviewId(previewId: string): ResolvedBusiness | null {
  const match = previewId.match(/^([a-z0-9-]+)-(\d+)$/);
  if (!match) return null;
  const [, slug, idxStr] = match;
  const idx = parseInt(idxStr, 10);

  const batch = loadBatch();
  const inNiche = batch.businesses.filter((b) => b.niche_slug === slug);
  if (idx < 0 || idx >= inNiche.length) return null;

  return {
    business: inNiche[idx],
    previewId,
    indexInNiche: idx,
  };
}

/**
 * Return the full list of (previewId, business) pairs — used by the index
 * page to render the gallery of all previews.
 */
export function listAllPreviews(): ResolvedBusiness[] {
  const batch = loadBatch();
  const byNiche = new Map<string, QaBusiness[]>();
  for (const b of batch.businesses) {
    const arr = byNiche.get(b.niche_slug) ?? [];
    arr.push(b);
    byNiche.set(b.niche_slug, arr);
  }

  const all: ResolvedBusiness[] = [];
  for (const [slug, businesses] of byNiche) {
    businesses.forEach((b, i) => {
      all.push({
        business: b,
        previewId: `${slug}-${i}`,
        indexInNiche: i,
      });
    });
  }
  return all;
}

/**
 * Return all unique niche slugs present in the batch.
 */
export function listBatchNiches(): { slug: string; name: string; count: number }[] {
  const batch = loadBatch();
  const map = new Map<string, { name: string; count: number }>();
  for (const b of batch.businesses) {
    const cur = map.get(b.niche_slug) ?? { name: b.niche_name, count: 0 };
    cur.count++;
    map.set(b.niche_slug, cur);
  }
  return Array.from(map.entries()).map(([slug, v]) => ({
    slug,
    name: v.name,
    count: v.count,
  }));
}
