/**
 * Niche-specific image generation prompts.
 *
 * For each niche, we define a hero prompt + service-tile prompts. The hero gets
 * a premium model (Recraft v3 or FLUX 1.1 Pro Ultra). Service tiles use the
 * cheaper FLUX schnell since they're smaller and shown as supporting imagery.
 *
 * Prompt-writing principles applied here:
 *   - Specific over generic ("polished concrete warehouse floor at industrial scale"
 *     not "concrete floor")
 *   - Lighting + mood baked in ("golden hour", "dramatic studio lighting")
 *   - Camera + composition cues ("low angle shot", "wide establishing shot")
 *   - Quality boosters ("photorealistic", "magazine quality", "sharp focus")
 *   - Negative prompts to avoid common AI failures ("no text, no watermark,
 *     no cartoon, no illustration")
 *   - Match the archetype's visual feel (urgent-trade is gritty/real,
 *     premium-outdoor is aspirational/clean, visual-pinterest is editorial)
 */

import type { FalModelId } from "@/lib/fal/client";

export interface ImagePrompt {
  /** Caption used to identify this image in the data file */
  slot: "hero" | "service1" | "service2" | "service3" | "service4" | "service5" | "service6";
  /** The actual prompt text */
  prompt: string;
  /** Negative prompt — things to avoid */
  negativePrompt?: string;
  /** Which fal.ai model to use */
  model: FalModelId;
  /** Aspect ratio */
  imageSize:
    | "square_hd"
    | "square"
    | "portrait_4_3"
    | "portrait_16_9"
    | "landscape_4_3"
    | "landscape_16_9";
  /** Recraft style preset (only applies if model is recraft-v3) */
  style?: string;
}

const COMMON_NEGATIVE = "text, watermark, logo, cartoon, illustration, anime, drawing, sketch, painting, low quality, blurry, distorted faces, extra fingers, deformed";

// ─────────────────────────────────────────────────────────────────────
// Urgent Trade group — gritty real-world, dramatic lighting
// ─────────────────────────────────────────────────────────────────────

const FOUNDATION_REPAIR: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Photorealistic close-up of a structural foundation crack with a steel push pier installation in progress, professional construction site, dramatic warm afternoon lighting, dusty atmosphere, hands working with tools visible, suburban basement setting, magazine photography quality, shallow depth of field",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  {
    slot: "service1",
    prompt:
      "Industrial steel helical pier being installed by gloved worker hands, tight overhead closeup, dramatic side lighting, sharp focus on threading detail, construction documentary photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Polyurethane injection gun applying epoxy resin into a vertical concrete foundation crack, professional contractor closeup, focused work, clean lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "Carbon fiber wall reinforcement strap being applied to a basement wall by professional contractor, clean modern basement, bright lighting, technical precision shot",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Sump pump installation with PVC pipes in a clean dry basement, professional plumbing work, technical photography, bright lighting, organized worksite",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

const PLUMBERS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Professional plumber arriving at suburban front door at golden hour with toolkit, friendly approachable expression, clean uniform with company logo placeholder, photojournalism style, warm natural lighting, photorealistic, magazine quality",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux-pro/v1.1-ultra",
    imageSize: "portrait_4_3",
  },
  {
    slot: "service1",
    prompt:
      "Skilled hands soldering a copper pipe joint with propane torch, focused work, dramatic warm flame light, professional plumbing closeup, sharp focus",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Drain cleaning auger snake feeding into a residential drain, professional plumber working, modern bathroom setting, clean editorial lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "Modern tankless water heater unit mounted on a clean utility room wall, professional installation, technical product photography, bright lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Plumber with leak detection equipment scanning a kitchen wall, modern home setting, professional technology in use, soft natural lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

const HVAC: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "HVAC technician in branded uniform installing a sleek modern outdoor condenser unit beside a suburban home, late afternoon golden light, calm focused expression, professional documentary photography, clean composition, sharp focus",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux-pro/v1.1-ultra",
    imageSize: "portrait_4_3",
  },
  {
    slot: "service1",
    prompt:
      "Modern smart thermostat on a clean white wall with hand adjusting it, soft warm interior lighting, residential setting, lifestyle photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Heat pump outdoor unit on a concrete pad next to landscaping, golden hour lighting, suburban home setting, clean professional photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "HEPA air filter being installed in residential HVAC return, technician hands, clean utility room, technical detail photography, bright lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Modern ductwork installation in an attic, fresh sealed insulated ducts, technical photography, professional craftsmanship, bright work lights",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

const ROOFERS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Drone shot of professional roofing crew installing dark architectural shingles on a suburban home, dramatic sky after a recent storm clearing, golden afternoon light breaking through clouds, photorealistic aerial photography, magazine quality",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux-pro/v1.1-ultra",
    imageSize: "landscape_16_9",
  },
  {
    slot: "service1",
    prompt:
      "Closeup of architectural asphalt shingles being nailed in place by professional roofer hands with nail gun, sharp focus on shingle texture, golden afternoon light",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Professional roof inspection with tablet documenting storm damage, suburban home, dramatic sky, contractor in branded uniform, photojournalism style",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "Seamless gutter installation on a residential home eave, professional contractor work, clean composition, bright daylight, technical photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Skylight being sealed and flashed on a residential roof, professional waterproofing work, sunny day, technical detail photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Premium Outdoor Living group — drone, magazine, aspirational
// ─────────────────────────────────────────────────────────────────────

const POOL_BUILDERS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Drone aerial photograph of a stunning custom infinity-edge pool with vanishing edge cascading into landscape, vibrant turquoise water, custom waterfall feature, luxury Mediterranean home in background, twilight ambient lighting with pool lights illuminating water from below, lush tropical landscaping with palm trees, photorealistic architectural photography, Architectural Digest magazine quality, ultra-sharp details, 8k resolution, dramatic composition",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_16_9",
  },
  {
    slot: "service1",
    prompt:
      "Closeup of pristine pool tile mosaic in iridescent blues and teals, water rippling above, golden afternoon sunlight, luxury detail photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Modern travertine pool deck with lounge chairs and plants, golden hour, luxury backyard lifestyle photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "Pool being constructed with gunite shotcrete application in progress, professional crew, daylight, documentary construction photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Pool with waterfall feature and natural stone landscaping at twilight, accent lighting, luxurious magazine photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

const SOLAR_INSTALLERS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Stunning low-angle photograph looking up at perfectly aligned high-tech monocrystalline solar panels glowing in golden hour sunlight, dramatic lens flare highlights, brilliant blue sky reflecting in panels, modern minimalist home architecture in foreground, professional commercial photography, ultra-sharp details, 8k resolution, dramatic composition, magazine quality, photorealistic",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_16_9",
  },
  {
    slot: "service1",
    prompt:
      "Solar panel array closeup with dramatic golden light reflecting off cells, technical detail photography, sharp focus on circuitry pattern",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Professional solar installer in safety gear on residential roof securing panel mounts, blue sky, photojournalism style, sharp focus",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "Modern home battery storage system on a clean garage wall with electrical panel, technical product photography, bright lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Hand using a smartphone showing solar production app dashboard with kWh data, modern interior background, lifestyle photography, bright clean lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// B2B Commercial — corporate, data-forward, professional
// ─────────────────────────────────────────────────────────────────────

const POLISHED_CONCRETE: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Wide angle photo of a vast polished concrete warehouse floor with mirror-like sheen, industrial steel beams overhead, dramatic perspective leading to vanishing point, professional architectural photography, clean atmospheric lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux-pro/v1.1-ultra",
    imageSize: "landscape_16_9",
  },
  {
    slot: "service1",
    prompt:
      "Industrial concrete polishing machine in operation on a warehouse floor, sparks and slurry, professional concrete contractor, sharp focus, side lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Closeup of high-gloss polished concrete floor surface with reflection of overhead industrial lights, sharp detail, professional photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "Modern retail store interior with polished stained concrete floor, contemporary architecture, daylight, lifestyle commercial photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Concrete densifier being applied to a commercial floor by professional contractor, technical documentary photography, clean lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Visual / Pinterest group — editorial, refined, design-forward
// ─────────────────────────────────────────────────────────────────────

const DECORATIVE_CONCRETE: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Beautifully stamped concrete patio with rich earthtone staining and slate pattern, outdoor furniture and landscaping, golden hour light casting long shadows, magazine quality outdoor lifestyle photography, photorealistic",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  {
    slot: "service1",
    prompt:
      "Closeup of stamped concrete pattern in slate gray with rich texture detail, dramatic side lighting, architectural detail photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
  {
    slot: "service2",
    prompt:
      "Acid-stained interior concrete floor in rich amber and burnt orange, modern industrial loft setting, dramatic lighting, lifestyle photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
  {
    slot: "service3",
    prompt:
      "Exposed aggregate concrete walkway through a manicured garden, bright daylight, clean composition, lifestyle outdoor photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
  {
    slot: "service4",
    prompt:
      "Decorative concrete pool deck with cool tones and salt finish, summer afternoon, lifestyle architectural photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
];

const HAIR_SALONS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Stylish modern hair salon interior with elegant chairs, soft natural light streaming through tall windows, terrazzo floors, brass fixtures, plants, editorial lifestyle photography, magazine quality, photorealistic, no people",
    negativePrompt: COMMON_NEGATIVE + ", crowded, cluttered",
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  {
    slot: "service1",
    prompt:
      "Hair color formulation flatlay on white marble — bowls of color, brushes, foils, in soft natural light, editorial product photography, sharp focus",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
  {
    slot: "service2",
    prompt:
      "Closeup of glossy salon-styled wavy hair with sun-kissed highlights, behind portrait lighting, beauty editorial photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
  {
    slot: "service3",
    prompt:
      "Premium salon shampoo and conditioner products arranged on a white marble counter with eucalyptus, soft natural window light, lifestyle product photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
  {
    slot: "service4",
    prompt:
      "Hair extensions in subtle balayage tones laid out on a marble surface, soft window light, editorial beauty product photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
];

const MEDICAL_SPAS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Bright modern medical spa treatment room with white walls and warm wood accents, sleek treatment chair, plants, soft natural light, clinical yet welcoming, photorealistic editorial photography, magazine quality, no people",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  {
    slot: "service1",
    prompt:
      "Aesthetic dermatology product line including serums in glass dropper bottles arranged on a white marble surface, soft window light, editorial beauty photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
  {
    slot: "service2",
    prompt:
      "Modern laser treatment device on a clean medical spa counter, professional medical equipment, soft clinical lighting, technical product photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
  {
    slot: "service3",
    prompt:
      "Closeup of glowing healthy skin texture, beauty editorial photography, soft natural light, magazine quality",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
  {
    slot: "service4",
    prompt:
      "Medical spa lobby with white walls, modern leather lounge chairs, plants and natural light, lifestyle architectural photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "square_hd",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Auto Body — automotive professional
// ─────────────────────────────────────────────────────────────────────

const AUTO_BODY: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Auto body technician in clean uniform polishing a freshly painted car fender to mirror finish, modern bright auto body shop interior, dramatic side lighting reflecting on car paint, professional photojournalism, sharp focus, magazine quality",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux-pro/v1.1-ultra",
    imageSize: "portrait_4_3",
  },
  {
    slot: "service1",
    prompt:
      "Closeup of a flawless car paint surface reflecting overhead lights, mirror polish quality, automotive detail photography, sharp focus",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Auto body technician using paintless dent repair tool on a vehicle panel, professional craftsmanship, focused work, automotive shop lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "Modern auto paint booth with a sedan inside under bright color-correcting lights, professional automotive photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Auto body technician welding a frame repair on a vehicle, sparks flying, dramatic lighting, professional automotive documentary photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Mobile Pet Grooming — warm/family editorial
// ─────────────────────────────────────────────────────────────────────

const MOBILE_PET_GROOMING: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Joyful golden retriever looking directly at camera with happy expression, freshly groomed gleaming coat, sitting in soft natural light at the open door of a branded mobile grooming van interior visible behind with professional equipment, lifestyle pet photography, ultra-sharp focus on dog's eyes, warm afternoon light, photorealistic, magazine quality, 8k resolution",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_16_9",
  },
  {
    slot: "service1",
    prompt:
      "Closeup of a small dog being gently brushed during grooming session, soft natural lighting, lifestyle photography, peaceful expression on dog",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Interior of a clean professional mobile pet grooming van with hydraulic table and grooming tools, bright fluorescent lighting, technical interior photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "Doodle dog enjoying a bath in a professional pet grooming tub, gentle warm water, lifestyle pet photography, joyful atmosphere",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Groomer trimming a small dog's nails carefully, focus on hands and pet, professional pet care lifestyle photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Fitness Studios — energetic, dark mode
// ─────────────────────────────────────────────────────────────────────

const FITNESS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Group fitness class mid-rep in a dark modern boutique gym with dramatic side lighting, sweat and intensity visible, real members not models, low-key gym aesthetic, photojournalism style, magazine quality",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_16_9",
  },
  {
    slot: "service1",
    prompt:
      "Closeup of kettlebells in a dark gym setting, dramatic side lighting, gritty atmosphere, fitness equipment photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Modern weight rack in a dark industrial gym, dramatic lighting, athletic atmosphere, fitness facility photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "Yoga mats laid out in a serene studio with floor-to-ceiling windows, soft natural morning light, lifestyle wellness photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Spin class bikes lined up with neon accent lighting, dark studio atmosphere, fitness facility photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Aging-in-Place — dignified, warm, accessible
// ─────────────────────────────────────────────────────────────────────

const STAIR_LIFT: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Smiling senior man calmly riding a modern stair lift in a warm sunlit home staircase, elegant interior with framed family photos, lifestyle photography, dignified atmosphere, magazine quality, photorealistic",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  {
    slot: "service1",
    prompt:
      "Modern stair lift mounted on residential staircase, no person, focus on the equipment and clean home interior, soft natural lighting, technical product photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Curved stair lift gracefully following the curve of a modern home staircase, no person, warm natural lighting, residential lifestyle photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "Senior woman comfortably seated on stair lift smiling at adult daughter, warm home interior, soft natural light, family lifestyle photography, dignified atmosphere",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Professional stair lift technician installing equipment in a clean home staircase, focused work, professional uniform, lifestyle photography",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Personal Brand — Real Estate
// ─────────────────────────────────────────────────────────────────────

const REAL_ESTATE: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Professional real estate agent portrait, confident smile, modern blazer, suburban neighborhood softly blurred behind, golden hour lighting, magazine editorial portrait photography, photorealistic, sharp focus",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  {
    slot: "service1",
    prompt:
      "Beautiful luxury suburban home exterior at twilight with warm interior lights, real estate photography, magazine quality, photorealistic",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service2",
    prompt:
      "Open house sign in front of a charming home on a tree-lined street, lifestyle real estate photography, golden hour light",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service3",
    prompt:
      "Real estate agent shaking hands with happy young couple in front of their new home with sold sign, joyful lifestyle photography, sunny afternoon",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
  {
    slot: "service4",
    prompt:
      "Modern bright kitchen interior with island and natural light, professional real estate listing photography, magazine quality",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux/schnell",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Master map — niche slug → prompt set
// ─────────────────────────────────────────────────────────────────────

export const NICHE_IMAGE_PROMPTS: Record<string, ImagePrompt[]> = {
  "foundation-repair": FOUNDATION_REPAIR,
  plumbers: PLUMBERS,
  hvac: HVAC,
  roofers: ROOFERS,
  "pool-builders": POOL_BUILDERS,
  "solar-installers": SOLAR_INSTALLERS,
  "polished-concrete": POLISHED_CONCRETE,
  "decorative-concrete": DECORATIVE_CONCRETE,
  "hair-salons": HAIR_SALONS,
  "medical-spas": MEDICAL_SPAS,
  "auto-body": AUTO_BODY,
  "mobile-pet-grooming": MOBILE_PET_GROOMING,
  fitness: FITNESS,
  "stair-lift": STAIR_LIFT,
  "real-estate": REAL_ESTATE,
};

export function getNicheImagePrompts(slug: string): ImagePrompt[] {
  return NICHE_IMAGE_PROMPTS[slug] || [];
}
