/**
 * Load pre-generated niche images from data/niche-images.json.
 *
 * Used by PreviewSite to find the right image URL for each (niche, slot) tuple.
 * If an image hasn't been generated yet for a niche, returns null and the
 * component falls back to the gradient placeholder.
 */

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

interface GeneratedImage {
  slot: string;
  url: string;
  width: number;
  height: number;
  prompt: string;
  model: string;
  generated_at: string;
}

interface NicheImageEntry {
  slug: string;
  generated_at: string;
  images: GeneratedImage[];
}

interface NicheImagesFile {
  version: number;
  updated_at: string;
  niches: Record<string, NicheImageEntry>;
}

let cache: NicheImagesFile | null = null;

function loadFile(): NicheImagesFile | null {
  if (cache) return cache;
  const file = path.join(process.cwd(), "data", "niche-images.json");
  if (!existsSync(file)) return null;
  try {
    cache = JSON.parse(readFileSync(file, "utf-8")) as NicheImagesFile;
    return cache;
  } catch {
    return null;
  }
}

/**
 * Get the URL of a specific generated image for a niche + slot.
 * Returns null if not generated yet.
 */
export function getNicheImage(
  nicheSlug: string,
  slot: "hero" | "service1" | "service2" | "service3" | "service4" | "service5" | "service6"
): { url: string; width: number; height: number } | null {
  const data = loadFile();
  if (!data) return null;
  const niche = data.niches[nicheSlug];
  if (!niche) return null;
  const img = niche.images.find((i) => i.slot === slot);
  if (!img) return null;
  return { url: img.url, width: img.width, height: img.height };
}

/**
 * Return all generated images for a niche in slot order.
 */
export function getNicheImages(nicheSlug: string): GeneratedImage[] {
  const data = loadFile();
  if (!data) return [];
  return data.niches[nicheSlug]?.images ?? [];
}
