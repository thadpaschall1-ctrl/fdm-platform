/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * QA Video Generation — generates cinematic 5-second hero loops via Seedance 2
 * (Bytedance image-to-video) using existing hero stills as the source frames.
 *
 * Writes the resulting video URLs into data/niche-images.json under the
 * niche's `heroVideo` field. Layouts read this and render a `<video>` element
 * with the still hero as the poster fallback.
 *
 * USAGE:
 *   npm run qa-videos                              # generate for all niches in NICHE_VIDEO_PROMPTS
 *   npm run qa-videos pool-builders medical-spas   # generate only those (pilot mode)
 *
 * Costs: ~$0.40–0.80 per 5-sec clip at 720p. Pilot run for 2 niches ~ $1–2.
 * Times: ~3–6 minutes per clip on Seedance 2.
 *
 * Behavior:
 *   - Always preserves existing heroVideo on failure (defensive — same logic as
 *     qa-generate-images.ts hardening).
 *   - Skips niches that already have a heroVideo unless explicitly named in args.
 *   - Requires the niche to already have a "hero" still image generated; uses
 *     that image's URL as the source frame for the image-to-video.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { generateVideo, type FalVideoModelId } from "../lib/fal/client";
import { NICHE_VIDEO_PROMPTS } from "../lib/data/niche-video-prompts";

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
  model: string;
  generated_at: string;
}

interface GeneratedVideo {
  slot: "hero";
  url: string;
  durationSec: number;
  aspectRatio?: string;
  prompt: string;
  model: FalVideoModelId;
  generated_at: string;
}

interface NicheImageEntry {
  slug: string;
  generated_at: string;
  images: GeneratedImage[];
  heroVideo?: GeneratedVideo;
}

interface NicheImagesFile {
  version: number;
  updated_at: string;
  niches: Record<string, NicheImageEntry>;
}

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

async function main() {
  const requestedSlugs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const allWithVideo = Object.keys(NICHE_VIDEO_PROMPTS);
  const targets =
    requestedSlugs.length > 0
      ? requestedSlugs.filter((s) => allWithVideo.includes(s))
      : allWithVideo;

  if (targets.length === 0) {
    console.error("❌ No valid niches. Niches with video prompts defined:");
    console.error("  " + (allWithVideo.join("\n  ") || "(none)"));
    process.exit(1);
  }

  console.log("─".repeat(72));
  console.log(`FDM AI Site Generator — Hero Video Generation (Seedance 2)`);
  console.log(`Niches: ${targets.length} (${targets.join(", ")})`);
  console.log("─".repeat(72));

  const data = loadExistingFile();
  const startTime = Date.now();
  let newCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

  for (const slug of targets) {
    const videoPrompt = NICHE_VIDEO_PROMPTS[slug];
    if (!videoPrompt) continue;

    const niche = data.niches[slug];
    if (!niche) {
      console.log(`\n▸ ${slug} — no niche entry yet, skipping (run npm run qa-images first)`);
      skippedCount++;
      continue;
    }

    const heroImage = niche.images.find((i) => i.slot === "hero");
    if (!heroImage?.url) {
      console.log(`\n▸ ${slug} — no hero still image found, skipping (need hero image first)`);
      skippedCount++;
      continue;
    }

    console.log(`\n▸ ${slug} — generating ${videoPrompt.duration}s loop from hero still`);
    process.stdout.write(`  • hero (${videoPrompt.model})… `);

    try {
      const t0 = Date.now();
      const result = await generateVideo({
        model: videoPrompt.model,
        imageUrl: heroImage.url,
        prompt: videoPrompt.prompt,
        duration: videoPrompt.duration,
        aspectRatio: videoPrompt.aspectRatio,
        resolution: videoPrompt.resolution,
      });
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`✓ ${elapsed}s — ${result.url.substring(0, 80)}…`);

      // Replace heroVideo on success only — preserves existing on failure
      niche.heroVideo = {
        slot: "hero",
        url: result.url,
        durationSec: result.durationSec,
        aspectRatio: result.aspectRatio,
        prompt: videoPrompt.prompt,
        model: videoPrompt.model,
        generated_at: new Date().toISOString(),
      };
      newCount++;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(
        `✗ FAILED: ${message}` + (niche.heroVideo ? " (keeping previous video)" : "")
      );
      failedCount++;
    }

    data.niches[slug] = niche;
    data.updated_at = new Date().toISOString();
    saveFile(data); // Save after each niche so partial runs aren't lost
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n" + "═".repeat(72));
  console.log(`✅ Done in ${elapsed}s`);
  console.log(`   Newly generated: ${newCount} video${newCount === 1 ? "" : "s"}`);
  if (failedCount > 0) {
    console.log(`   Failed:          ${failedCount} (previous videos preserved)`);
  }
  if (skippedCount > 0) {
    console.log(`   Skipped:         ${skippedCount} (missing hero still or niche entry)`);
  }
  console.log(`   Saved to:        data/niche-images.json`);
  console.log("═".repeat(72));

  console.log("\nPer-niche summary:");
  for (const slug of targets) {
    const niche = data.niches[slug];
    const indicator = niche?.heroVideo ? "✅" : "❌";
    const status = niche?.heroVideo ? "video ready" : "no video";
    console.log(`  ${indicator} ${slug.padEnd(28)} ${status}`);
  }
  console.log();
}

main().catch((err) => {
  console.error("\n❌ Script failed:", err);
  process.exit(1);
});
