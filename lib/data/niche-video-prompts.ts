/**
 * Niche-specific HERO VIDEO prompts.
 *
 * Each niche optionally gets a 5-second cinematic loop generated with
 * Seedance 2 (image-to-video) starting from the same hero image we already
 * generated. The video plays as a muted autoplay loop in the hero section,
 * with the existing still image as the `poster` fallback for slow connections,
 * data-saver mode, and prefers-reduced-motion users.
 *
 * Prompt-writing principles:
 *   - DESCRIBE THE MOTION, not the scene. The source image establishes the
 *     scene; you're telling the model what to make move.
 *   - Subtle is better than dramatic — heavy motion fights the text overlay
 *     and feels gimmicky. Aim for "luxury-real-estate ad slow push-in" not
 *     "TikTok zoom whip".
 *   - 5 seconds is plenty. Most reference site visitors won't watch a full
 *     loop; the first 2 seconds set the tone.
 *   - Loops want a start frame ≈ end frame so the seam is invisible. Steady
 *     camera + ambient motion (water ripples, wind, light shifts) loops well.
 *     Hard pans / push-ins do NOT loop seamlessly — only use them on niches
 *     where the loop seam is hidden.
 */

import type { FalVideoModelId } from "@/lib/fal/client";

export interface VideoPrompt {
  /** Always "hero" for now — service-tile loops are a future phase */
  slot: "hero";
  /** Motion description (NOT scene description) */
  prompt: string;
  /** fal model id */
  model: FalVideoModelId;
  /** 5 or 10 seconds — 5 is plenty for showcase loops */
  duration: 5 | 10;
  /** Aspect ratio — match the still image's ratio so motion fills the same crop */
  aspectRatio: "16:9" | "9:16" | "1:1" | "4:3" | "3:4";
  /** Optional reduced resolution to save credits during pilots */
  resolution?: "720p" | "1080p";
}

/**
 * Pilot set — 2 niches first to confirm the approach before rolling to all 15.
 * pool-builders is the cleanest aesthetic test (drone shot of a luxury pool).
 * medical-spas tests the visual-pinterest archetype + a more architectural
 * interior shot.
 */
export const NICHE_VIDEO_PROMPTS: Record<string, VideoPrompt> = {
  // pool-builders hero is a drone aerial of an infinity-edge pool at twilight.
  // Motion: subtle water ripples, slow camera push-in, pool lights gently
  // pulsing brighter as twilight deepens. Loops because final frame is barely
  // different from first frame.
  "pool-builders": {
    slot: "hero",
    prompt:
      "Extremely slow cinematic drone push-in over the pool, gentle water surface ripples catching reflected light, twilight ambient light slowly deepening from gold to blue, pool lights from below subtly pulsing brighter, palm fronds barely swaying in a gentle breeze, magazine real-estate ad cinematography, smooth and luxurious motion, no abrupt cuts.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "16:9",
    resolution: "720p",
  },

  // medical-spas hero is an empty modern treatment room interior.
  // Motion: very slow forward dolly, sheer curtains gently breathing,
  // soft golden hour light shifting across the wood paneling, dust motes
  // floating in the light shaft. Spa-luxury vibe.
  "medical-spas": {
    slot: "hero",
    prompt:
      "Extremely slow cinematic dolly forward into the treatment room, sheer curtains gently breathing in a soft breeze, golden hour light very slowly shifting across the warm walnut wall paneling, fine dust motes floating in the light beam, the fiddle leaf fig leaves barely moving, ultra-luxurious spa cinematography, smooth and meditative, no abrupt motion.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "3:4",
    resolution: "720p",
  },
};

export function getNicheVideoPrompt(slug: string): VideoPrompt | null {
  return NICHE_VIDEO_PROMPTS[slug] ?? null;
}

export function listNicheVideoSlugs(): string[] {
  return Object.keys(NICHE_VIDEO_PROMPTS);
}
