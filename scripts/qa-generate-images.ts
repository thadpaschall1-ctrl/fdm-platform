/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * QA Image Generation — pre-generates niche-template images via fal.ai.
 *
 * For each niche in lib/data/niche-image-prompts.ts, generates the hero +
 * service-tile images and saves their CDN URLs to data/niche-images.json.
 * The PreviewSite component reads from that file at render time, giving us
 * instant page loads with no per-pageview generation cost.
 *
 * USAGE:
 *   npm run qa-images               # generates all niches
 *   npm run qa-images foundation-repair plumbers  # generates only those
 *
 * Idempotent — re-running for a niche overwrites those entries. Niches not
 * passed as args are left untouched.
 *
 * Cost estimate: ~$3–10 for the full batch depending on which premium model
 * tier each hero uses.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { generateImage, type FalModelId } from "../lib/fal/client";
import { NICHE_IMAGE_PROMPTS, type ImagePrompt } from "../lib/data/niche-image-prompts";

// Load .env.local
try {
  process.loadEnvFile(".env.local");
} catch {
  /* fall back */
}

if (!process.env.FAL_KEY) {
  console.error("❌ FAL_KEY not set in .env.local");
  process.exit(1);
}

interface GeneratedImage {
  slot: string;
  url: string;
  width: number;
  height: number;
  prompt: string;
  model: FalModelId;
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

// ─── Helpers ────────────────────────────────────────────────────

function loadExistingFile(): NicheImagesFile {
  const file = path.join(process.cwd(), "data", "niche-images.json");
  if (existsSync(file)) {
    try {
      return JSON.parse(readFileSync(file, "utf-8")) as NicheImagesFile;
    } catch {
      // Corrupted — start fresh
    }
  }
  return { version: 1, updated_at: new Date().toISOString(), niches: {} };
}

function saveFile(data: NicheImagesFile): void {
  const dir = path.join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "niche-images.json");
  writeFileSync(file, JSON.stringify(data, null, 2));
}

async function generateForNiche(
  slug: string,
  prompts: ImagePrompt[],
  existing: NicheImageEntry | undefined
): Promise<NicheImageEntry> {
  // Start from any existing successful generations — don't waste $$ regenerating
  // slots that already worked. Re-run only fills in missing or failed slots.
  const images: GeneratedImage[] = existing?.images.slice() ?? [];
  const existingSlots = new Set(images.map((i) => i.slot));

  const todo = prompts.filter((p) => !existingSlots.has(p.slot));
  const skipped = prompts.length - todo.length;

  console.log(
    `\n▸ ${slug} — ${prompts.length} prompts, ${todo.length} to generate${
      skipped > 0 ? ` (${skipped} already done)` : ""
    }`
  );

  for (const p of todo) {
    process.stdout.write(`  • ${p.slot.padEnd(10)} (${p.model})… `);
    try {
      const t0 = Date.now();
      const result = await generateImage({
        model: p.model,
        prompt: p.prompt,
        negativePrompt: p.negativePrompt,
        imageSize: p.imageSize,
        style: p.style,
      });
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`✓ ${elapsed}s — ${result.url.substring(0, 80)}…`);
      images.push({
        slot: p.slot,
        url: result.url,
        width: result.width,
        height: result.height,
        prompt: p.prompt,
        model: p.model,
        generated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.log(`✗ FAILED: ${err instanceof Error ? err.message : String(err)}`);
      // Skip this image, keep going for the rest
    }
  }

  return {
    slug,
    generated_at: new Date().toISOString(),
    images,
  };
}

// ─── Main ──────────────────────────────────────────────────────

async function main() {
  const requestedNiches = process.argv.slice(2);
  const allNicheSlugs = Object.keys(NICHE_IMAGE_PROMPTS);
  const targets =
    requestedNiches.length > 0
      ? requestedNiches.filter((s) => allNicheSlugs.includes(s))
      : allNicheSlugs;

  if (targets.length === 0) {
    console.error("❌ No valid niche slugs. Available:");
    console.error("  " + allNicheSlugs.join("\n  "));
    process.exit(1);
  }

  const totalImages = targets.reduce(
    (sum, slug) => sum + (NICHE_IMAGE_PROMPTS[slug]?.length ?? 0),
    0
  );

  console.log("─".repeat(72));
  console.log(`FDM AI Site Generator — Image Generation`);
  console.log(`Niches: ${targets.length} (${targets.join(", ")})`);
  console.log(`Images: ${totalImages} total`);
  console.log("─".repeat(72));

  const data = loadExistingFile();
  const startTime = Date.now();

  for (const slug of targets) {
    const prompts = NICHE_IMAGE_PROMPTS[slug];
    if (!prompts) continue;
    const existing = data.niches[slug];
    const entry = await generateForNiche(slug, prompts, existing);
    data.niches[slug] = entry;
    data.updated_at = new Date().toISOString();
    // Save after each niche so partial runs aren't lost on crash
    saveFile(data);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const successCount = targets.reduce(
    (sum, slug) => sum + (data.niches[slug]?.images.length ?? 0),
    0
  );

  console.log("\n" + "═".repeat(72));
  console.log(`✅ Done — ${successCount}/${totalImages} images generated in ${elapsed}s`);
  console.log(`   Saved to: data/niche-images.json`);
  console.log("═".repeat(72));

  // Per-niche summary
  console.log("\nPer-niche summary:");
  for (const slug of targets) {
    const entry = data.niches[slug];
    const expected = NICHE_IMAGE_PROMPTS[slug]?.length ?? 0;
    const got = entry?.images.length ?? 0;
    const indicator = got === expected ? "✅" : got > 0 ? "⚠️ " : "❌";
    console.log(`  ${indicator} ${slug.padEnd(28)} ${got}/${expected}`);
  }
  console.log();
}

main().catch((err) => {
  console.error("\n❌ Script failed:", err);
  process.exit(1);
});
