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
 *   npm run qa-images                              # fill missing/failed slots across all niches (preserves existing successful generations)
 *   npm run qa-images foundation-repair plumbers   # FORCE-regenerate every slot for these niches (use this after editing prompts)
 *   npm run qa-images --fill plumbers              # fill missing/failed slots for plumbers only (preserves existing)
 *
 * Behavior:
 *   - No args: fills missing slots only — never wastes $$ regenerating successful images
 *   - With slug args: assumes you edited the prompts and want a fresh generation —
 *     OVERWRITES every slot for those niches
 *   - With --fill flag: forces preserve-existing behavior even when slugs are passed
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
  existing: NicheImageEntry | undefined,
  forceRegenerate: boolean
): Promise<{ entry: NicheImageEntry; newCount: number }> {
  // In force mode (slug passed explicitly without --fill), regenerate ALL slots
  // and discard existing images for this niche. Otherwise preserve successful
  // generations and only fill missing or failed slots.
  const images: GeneratedImage[] = forceRegenerate
    ? []
    : existing?.images.slice() ?? [];
  const existingSlots = new Set(images.map((i) => i.slot));

  const todo = prompts.filter((p) => !existingSlots.has(p.slot));
  const skipped = prompts.length - todo.length;

  console.log(
    `\n▸ ${slug} — ${prompts.length} prompts, ${todo.length} to generate${
      forceRegenerate ? " (force-regenerate: discarding existing)" : skipped > 0 ? ` (${skipped} already done)` : ""
    }`
  );

  let newCount = 0;
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
      newCount++;
    } catch (err) {
      console.log(`✗ FAILED: ${err instanceof Error ? err.message : String(err)}`);
      // Skip this image, keep going for the rest
    }
  }

  return {
    entry: {
      slug,
      generated_at: new Date().toISOString(),
      images,
    },
    newCount,
  };
}

// ─── Main ──────────────────────────────────────────────────────

async function main() {
  // Parse args. --fill flag forces preserve-existing even when slugs are passed.
  const rawArgs = process.argv.slice(2);
  const fillFlag = rawArgs.includes("--fill");
  const requestedNiches = rawArgs.filter((a) => !a.startsWith("--"));
  const allNicheSlugs = Object.keys(NICHE_IMAGE_PROMPTS);
  const explicitSlugsPassed = requestedNiches.length > 0;
  const targets = explicitSlugsPassed
    ? requestedNiches.filter((s) => allNicheSlugs.includes(s))
    : allNicheSlugs;

  // Force mode: when user passes specific niches WITHOUT --fill, they edited
  // prompts and want a fresh regeneration. No-args runs are always fill-mode.
  const forceRegenerate = explicitSlugsPassed && !fillFlag;

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
  console.log(`Mode:   ${forceRegenerate ? "FORCE REGENERATE (overwrites existing)" : "FILL (preserves existing successes)"}`);
  console.log("─".repeat(72));

  const data = loadExistingFile();
  const startTime = Date.now();
  let totalNewlyGenerated = 0;

  for (const slug of targets) {
    const prompts = NICHE_IMAGE_PROMPTS[slug];
    if (!prompts) continue;
    const existing = data.niches[slug];
    const { entry, newCount } = await generateForNiche(
      slug,
      prompts,
      existing,
      forceRegenerate
    );
    data.niches[slug] = entry;
    data.updated_at = new Date().toISOString();
    totalNewlyGenerated += newCount;
    // Save after each niche so partial runs aren't lost on crash
    saveFile(data);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const successCount = targets.reduce(
    (sum, slug) => sum + (data.niches[slug]?.images.length ?? 0),
    0
  );

  console.log("\n" + "═".repeat(72));
  console.log(`✅ Done in ${elapsed}s`);
  console.log(`   Newly generated: ${totalNewlyGenerated} image${totalNewlyGenerated === 1 ? "" : "s"}`);
  console.log(`   Total in file:   ${successCount}/${totalImages}`);
  console.log(`   Saved to:        data/niche-images.json`);
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
