/**
 * fal.ai client wrapper.
 *
 * Generates images and videos via the fal.ai queue API. Thin wrapper around
 * fetch with polling for queued jobs, retries, and consistent error handling.
 *
 * Image models we use:
 *   - "fal-ai/flux/schnell"        — fast bulk generation, $0.003/img, ~2 sec
 *   - "fal-ai/flux-pro/v1.1-ultra" — top photorealism, $0.06/img, ~6 sec
 *   - "fal-ai/recraft-v3"          — best for premium niches (med spas, salons)
 *   - "fal-ai/ideogram/v2"         — best for text-in-images
 *   - "fal-ai/gpt-image-2"         — best instruction adherence, slow + strict moderation
 *   - "fal-ai/nano-banana"         — Google Gemini Flash 2 image, looser moderation than GPT
 *
 * Video models we use:
 *   - "fal-ai/bytedance/seedance/v1/lite/image-to-video" — 5–10 sec cinematic loops
 *
 * Auth: FAL_KEY env var in `key_id:key_secret` format.
 * Docs: https://fal.ai/docs
 */

const FAL_QUEUE_BASE = "https://queue.fal.run";
const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS = 600_000; // 10 minutes — Seedance 2 video can take 4–6 min

export type FalModelId =
  | "fal-ai/flux/schnell"
  | "fal-ai/flux-pro/v1.1"
  | "fal-ai/flux-pro/v1.1-ultra"
  | "fal-ai/recraft-v3"
  | "fal-ai/ideogram/v2"
  | "fal-ai/gpt-image-2"
  | "fal-ai/gpt-image-1"
  | "fal-ai/nano-banana";

export type FalVideoModelId = "fal-ai/bytedance/seedance/v1/lite/image-to-video";

export interface FalImageRequest {
  model: FalModelId;
  prompt: string;
  /**
   * Image aspect ratio / dimensions. Each model has its own set of supported
   * options — we accept a flexible string and pass it through to the right
   * field per model.
   */
  imageSize?:
    | "square_hd"
    | "square"
    | "portrait_4_3"
    | "portrait_16_9"
    | "landscape_4_3"
    | "landscape_16_9";
  /** Optional negative prompt (Recraft / FLUX both support) */
  negativePrompt?: string;
  /** Number of inference steps — higher = better quality but slower */
  numInferenceSteps?: number;
  /** Style preset for Recraft (e.g., "realistic_image", "digital_illustration") */
  style?: string;
  /** Random seed for reproducibility */
  seed?: number;
}

export interface FalImageResult {
  /** Public CDN URL of the generated image (hosted by fal indefinitely) */
  url: string;
  /** Image dimensions */
  width: number;
  height: number;
  /** Inference time in ms */
  inferenceTimeMs?: number;
  /** Echoed prompt for debugging */
  prompt: string;
  /** Model used */
  model: FalModelId;
}

export interface FalVideoRequest {
  model: FalVideoModelId;
  /** Source still image to animate from */
  imageUrl: string;
  /** Motion description, e.g. "slow cinematic drone push-in, water rippling" */
  prompt: string;
  /** Clip length in seconds. Seedance accepts 5 or 10. Default 5. */
  duration?: 5 | 10;
  /**
   * Aspect ratio of the resulting video. We pass it but Seedance generally
   * inherits from the source image.
   */
  aspectRatio?: "16:9" | "9:16" | "1:1" | "4:3" | "3:4";
  /** Random seed for reproducibility */
  seed?: number;
  /** Resolution. "720p" is standard, "1080p" costs more. */
  resolution?: "720p" | "1080p";
}

export interface FalVideoResult {
  /** Public CDN URL of the generated video (hosted by fal) */
  url: string;
  /** Duration in seconds (echoed from request) */
  durationSec: number;
  /** Aspect ratio the video was rendered in */
  aspectRatio?: string;
  /** Model used */
  model: FalVideoModelId;
  /** Echoed prompt for debugging */
  prompt: string;
}

class FalClientError extends Error {
  constructor(message: string, public statusCode?: number, public body?: unknown) {
    super(message);
    this.name = "FalClientError";
  }
}

function getKey(): string {
  const key = process.env.FAL_KEY;
  if (!key) {
    throw new FalClientError("FAL_KEY env var not set");
  }
  return key;
}

function authHeaders(): Record<string, string> {
  return {
    Authorization: `Key ${getKey()}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Build the model-specific request body. Each fal model takes slightly different
 * input fields, so we normalize from our high-level FalImageRequest interface.
 */
function buildBody(req: FalImageRequest): Record<string, unknown> {
  const base: Record<string, unknown> = { prompt: req.prompt };

  // Handle image size mapping per model
  if (req.imageSize) {
    const usesAspectRatio =
      req.model === "fal-ai/flux-pro/v1.1-ultra" ||
      req.model === "fal-ai/gpt-image-2" ||
      req.model === "fal-ai/gpt-image-1" ||
      req.model === "fal-ai/nano-banana";

    if (usesAspectRatio) {
      // These models use "aspect_ratio" with values like "16:9", "1:1", "4:3"
      const ratioMap: Record<string, string> = {
        square_hd: "1:1",
        square: "1:1",
        portrait_4_3: "3:4",
        portrait_16_9: "9:16",
        landscape_4_3: "4:3",
        landscape_16_9: "16:9",
      };
      base.aspect_ratio = ratioMap[req.imageSize];
    } else {
      base.image_size = req.imageSize;
    }
  }

  if (req.negativePrompt) base.negative_prompt = req.negativePrompt;
  if (req.numInferenceSteps) base.num_inference_steps = req.numInferenceSteps;
  if (req.seed) base.seed = req.seed;

  // Recraft-specific style hint
  if (req.model === "fal-ai/recraft-v3" && req.style) {
    base.style = req.style;
  }

  return base;
}

interface QueueSubmitResponse {
  request_id: string;
  status_url: string;
  response_url: string;
  cancel_url: string;
}

interface QueueStatusResponse {
  status: "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  request_id?: string;
  queue_position?: number;
  logs?: { message: string }[];
}

interface FluxLikeResponse {
  images?: Array<{ url: string; width?: number; height?: number; content_type?: string }>;
  timings?: { inference?: number };
  prompt?: string;
  seed?: number;
}

interface SeedanceLikeResponse {
  video?: { url: string; content_type?: string };
  seed?: number;
}

/**
 * Internal: submit a job to the fal queue and poll until completion.
 * Returns the parsed response body.
 */
async function submitAndAwait<T>(
  modelId: string,
  body: Record<string, unknown>
): Promise<T> {
  const submitUrl = `${FAL_QUEUE_BASE}/${modelId}`;
  const submitRes = await fetch(submitUrl, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });

  if (!submitRes.ok) {
    const text = await submitRes.text().catch(() => "");
    throw new FalClientError(
      `fal submit failed: ${submitRes.status} ${submitRes.statusText} — ${text}`,
      submitRes.status
    );
  }

  const submitData = (await submitRes.json()) as QueueSubmitResponse;
  const { status_url, response_url } = submitData;

  const startTime = Date.now();
  while (Date.now() - startTime < POLL_TIMEOUT_MS) {
    await sleep(POLL_INTERVAL_MS);

    const statusRes = await fetch(status_url, { headers: authHeaders() });
    if (!statusRes.ok) {
      const text = await statusRes.text().catch(() => "");
      throw new FalClientError(
        `fal status poll failed: ${statusRes.status} — ${text}`,
        statusRes.status
      );
    }
    const status = (await statusRes.json()) as QueueStatusResponse;

    if (status.status === "COMPLETED") {
      const respRes = await fetch(response_url, { headers: authHeaders() });
      if (!respRes.ok) {
        const text = await respRes.text().catch(() => "");
        throw new FalClientError(
          `fal response fetch failed: ${respRes.status} — ${text}`,
          respRes.status
        );
      }
      return (await respRes.json()) as T;
    }

    if (status.status === "FAILED") {
      throw new FalClientError(
        `fal generation failed: ${JSON.stringify(status.logs ?? [])}`,
        500,
        status
      );
    }
    // else IN_QUEUE / IN_PROGRESS — keep polling
  }

  throw new FalClientError(`fal generation timed out after ${POLL_TIMEOUT_MS}ms`);
}

/**
 * Generate one image via the fal queue API.
 * Returns a public URL of the generated image.
 */
export async function generateImage(req: FalImageRequest): Promise<FalImageResult> {
  const data = await submitAndAwait<FluxLikeResponse>(req.model, buildBody(req));
  const firstImage = data.images?.[0];
  if (!firstImage?.url) {
    throw new FalClientError("fal completed but no image URL in response", 200, data);
  }
  return {
    url: firstImage.url,
    width: firstImage.width ?? 0,
    height: firstImage.height ?? 0,
    inferenceTimeMs: data.timings?.inference,
    prompt: req.prompt,
    model: req.model,
  };
}

/**
 * Generate one video clip from a still image via the fal queue API.
 * Uses Seedance 2 (Bytedance) image-to-video — produces cinematic 5–10 sec
 * loops at $0.40–0.80 per clip.
 *
 * The motion `prompt` should describe the motion, not redescribe the scene
 * (the source image already establishes the scene). Examples:
 *   - "slow cinematic drone push-in, subtle water ripples, golden-hour light shifting"
 *   - "gentle camera dolly forward, sheer curtains breathing in the breeze"
 */
export async function generateVideo(req: FalVideoRequest): Promise<FalVideoResult> {
  const body: Record<string, unknown> = {
    prompt: req.prompt,
    image_url: req.imageUrl,
    duration: String(req.duration ?? 5),
  };
  if (req.aspectRatio) body.aspect_ratio = req.aspectRatio;
  if (req.resolution) body.resolution = req.resolution;
  if (req.seed) body.seed = req.seed;

  const data = await submitAndAwait<SeedanceLikeResponse>(req.model, body);
  const videoUrl = data.video?.url;
  if (!videoUrl) {
    throw new FalClientError("fal completed but no video URL in response", 200, data);
  }
  return {
    url: videoUrl,
    durationSec: req.duration ?? 5,
    aspectRatio: req.aspectRatio,
    model: req.model,
    prompt: req.prompt,
  };
}

export { FalClientError };
