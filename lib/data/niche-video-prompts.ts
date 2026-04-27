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
 * Full set — every niche gets a 5-second cinematic loop.
 *
 * Anti-uncanny rule: Seedance 2 produces eerie results when forced to animate
 * human faces, hand movements, or animal anatomy. So every prompt below
 * emphasizes ENVIRONMENTAL motion (light shifts, dappled shadows, leaves
 * rustling, dust motes, subtle camera movement) and explicitly instructs
 * the model to keep human/animal subjects motionless. The world moves
 * around them; they stay still.
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

  // ─── Premium Outdoor archetype ─────────────────────────────────
  "solar-installers": {
    slot: "hero",
    prompt:
      "Extremely subtle cinematic camera pull-back, solar panels gleaming with shifting golden hour light reflections, subtle lens flare moving slowly across the frame, distant clouds barely drifting, blue sky deepening, no abrupt motion, ultra-premium real-estate ad cinematography.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "16:9",
    resolution: "720p",
  },
  "decorative-concrete": {
    slot: "hero",
    prompt:
      "Subtle dappled tree shadow shifting slowly across the stamped concrete patio surface, gentle breeze in surrounding leaves, golden hour light gradient slowly deepening from amber to warm copper, ultra-luxurious outdoor lifestyle cinematography, no abrupt motion, no people.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "3:4",
    resolution: "720p",
  },
  "polished-concrete": {
    slot: "hero",
    prompt:
      "Slow cinematic camera glide forward through the vast polished concrete warehouse floor, fine dust motes drifting in shafts of overhead industrial light, subtle reflections shifting on the polished surface, no people, atmospheric and meditative industrial cinematography.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "16:9",
    resolution: "720p",
  },

  // ─── Visual Pinterest archetype ────────────────────────────────
  "hair-salons": {
    slot: "hero",
    prompt:
      "Very slow cinematic dolly forward into the empty salon interior, sheer window curtains gently breathing in a soft breeze, soft natural light slowly shifting across the terrazzo floor and brass fixtures, plant leaves barely moving, magazine editorial cinematography, no people, smooth and meditative.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "3:4",
    resolution: "720p",
  },
  "mobile-pet-grooming": {
    slot: "hero",
    prompt:
      "Subtle dappled tree shadow shifting slowly across the white van and pavement, gentle leaves rustling in a soft breeze on the surrounding trees, golden afternoon light slowly deepening, ultra-luxurious lifestyle cinematography, vehicle remains still and stationary, no people, no animals, no abrupt motion.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "16:9",
    resolution: "720p",
  },

  // ─── Base archetype — urgent trade ─────────────────────────────
  "foundation-repair": {
    slot: "hero",
    prompt:
      "Subtle warm afternoon light slowly shifting across the construction scene with the steel pier, fine dust motes floating in the light shafts, atmospheric documentary photography, no large body movement, no facial expression changes, photorealistic, smooth meditative motion.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "3:4",
    resolution: "720p",
  },
  plumbers: {
    slot: "hero",
    prompt:
      "Subtle warm golden hour light slowly shifting across the front porch and the plumber's uniform, gentle leaves on nearby plants barely swaying in a soft breeze, person remains completely still with no facial expression changes and no body motion, lifestyle photojournalism cinematography, smooth and meditative.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "3:4",
    resolution: "720p",
  },
  hvac: {
    slot: "hero",
    prompt:
      "Subtle warm afternoon light slowly shifting across the outdoor condenser unit and surrounding landscaping, gentle leaves swaying in a soft breeze, technician remains completely still with no facial expression changes or body motion, documentary cinematography, smooth and atmospheric.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "3:4",
    resolution: "720p",
  },
  roofers: {
    slot: "hero",
    prompt:
      "Very subtle aerial drone camera pull-back, slow cloud movement in the post-storm sky, golden afternoon light slowly deepening across the roof, crew members remain completely still with no body motion, magazine aerial cinematography, smooth and meditative.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "16:9",
    resolution: "720p",
  },

  // ─── Auto Body archetype ───────────────────────────────────────
  "auto-body": {
    slot: "hero",
    prompt:
      "Subtle bright shop lighting slowly shifting across the polished car fender, fine reflective highlights moving along the paint surface, technician remains completely still with no facial expression changes or large body motion, documentary photojournalism cinematography, smooth and atmospheric.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "3:4",
    resolution: "720p",
  },

  // ─── Fitness archetype ────────────────────────────────────────
  fitness: {
    slot: "hero",
    prompt:
      "Subtle dramatic side lighting slowly shifting across the dark boutique gym, fine chalk dust drifting and floating in the air, members remain completely still in their training pose with no large body motion, gritty atmospheric photojournalism cinematography, smooth and intense.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "16:9",
    resolution: "720p",
  },

  // ─── Stair Lift archetype ─────────────────────────────────────
  "stair-lift": {
    slot: "hero",
    prompt:
      "Subtle warm sunlight slowly shifting through the window across the home staircase, gentle dust motes floating in the light beams, senior person remains completely still with no facial expression changes or movement, dignified lifestyle cinematography, smooth and warm.",
    model: "fal-ai/bytedance/seedance/v1/lite/image-to-video",
    duration: 5,
    aspectRatio: "3:4",
    resolution: "720p",
  },

  // ─── Real Estate archetype ────────────────────────────────────
  "real-estate": {
    slot: "hero",
    prompt:
      "Subtle warm golden hour light slowly shifting across the suburban background and softly blurred trees behind the agent, gentle breeze in the trees, agent remains completely still with no facial expression changes, no eye movement, and no body motion, magazine editorial portrait cinematography, smooth and refined.",
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
