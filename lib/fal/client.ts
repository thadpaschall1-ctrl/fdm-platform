/**
 * fal.ai client wrapper.
 *
 * Generates images via the fal.ai queue API. Thin wrapper around fetch with
 * polling for queued jobs, retries, and consistent error handling.
 *
 * Models we use:
 *   - "fal-ai/flux/schnell"        — fast bulk generation, $0.003/img, ~2 sec
 *   - "fal-ai/flux-pro/v1.1-ultra" — top photorealism, $0.06/img, ~6 sec
 *   - "fal-ai/recraft-v3"          — best for premium niches (med spas, salons), $0.04/img
 *   - "fal-ai/ideogram/v2"         — best for text-in-images, $0.02/img
 *
 * Auth: FAL_KEY env var in `key_id:key_secret` format.
 * Docs: https://fal.ai/docs
 */

const FAL_QUEUE_BASE = "https://queue.fal.run";
const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS = 90_000;

export type FalModelId =
  | "fal-ai/flux/schnell"
  | "fal-ai/flux-pro/v1.1"
  | "fal-ai/flux-pro/v1.1-ultra"
  | "fal-ai/recraft-v3"
  | "fal-ai/ideogram/v2"
  | "fal-ai/gpt-image-2"
  | "fal-ai/gpt-image-1";

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
    if (req.model === "fal-ai/flux-pro/v1.1-ultra") {
      // ultra uses "aspect_ratio" with values like "16:9", "1:1", "4:3"
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

/**
 * Generate one image via the fal queue API.
 * Returns a public URL of the generated image.
 */
export async function generateImage(req: FalImageRequest): Promise<FalImageResult> {
  // Submit to queue
  const submitUrl = `${FAL_QUEUE_BASE}/${req.model}`;
  const submitRes = await fetch(submitUrl, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(buildBody(req)),
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

  // Poll until completion
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
      // Fetch the actual response
      const respRes = await fetch(response_url, { headers: authHeaders() });
      if (!respRes.ok) {
        const text = await respRes.text().catch(() => "");
        throw new FalClientError(
          `fal response fetch failed: ${respRes.status} — ${text}`,
          respRes.status
        );
      }
      const data = (await respRes.json()) as FluxLikeResponse;
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

    if (status.status === "FAILED") {
      throw new FalClientError(
        `fal generation failed: ${JSON.stringify(status.logs ?? [])}`,
        500,
        status
      );
    }
    // else IN_QUEUE / IN_PROGRESS — keep polling
  }

  throw new FalClientError("fal generation timed out after 90s");
}

export { FalClientError };
