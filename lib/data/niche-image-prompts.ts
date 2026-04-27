/**
 * Niche-specific image generation prompts.
 *
 * For each niche we define a hero prompt + 4 service-tile prompts. Each
 * service slot is paired in the renderer with the corresponding service
 * by index — service1 image renders next to services[0], service2 with
 * services[1], etc. So the prompt for slot serviceN MUST describe imagery
 * that matches the title at services[N-1] in lib/data/niche-site-content.ts.
 * If the prompt drifts from the service title, the rendered tile looks
 * "off by one" to the visitor — broken.
 *
 * Reference sites at /examples/[slug] are FDM's one-time-paid showcase, so
 * every slot uses GPT Image 2 for premium quality and tighter prompt
 * adherence. Real customer sites (each pays their own generation) can use
 * cheaper models.
 *
 * Prompt-writing principles:
 *   - Specific over generic — tie each prompt to the exact service title
 *   - Lighting + mood baked in (golden hour, dramatic studio lighting)
 *   - Camera + composition cues (low-angle, wide establishing, top-down flat-lay)
 *   - Quality boosters (photorealistic, magazine quality, sharp focus)
 *   - Negative prompts that block known AI failure modes
 *   - Match the archetype's visual feel (urgent-trade gritty, premium-outdoor
 *     aspirational, visual-pinterest editorial, b2b-commercial corporate)
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

const COMMON_NEGATIVE = "text, watermark, logo, cartoon, illustration, anime, drawing, sketch, painting, low quality, blurry, distorted faces, extra fingers, deformed, signage, lettering, gibberish text";

// ─────────────────────────────────────────────────────────────────────
// Urgent Trade group — gritty real-world, dramatic lighting
// ─────────────────────────────────────────────────────────────────────

// Services: Helical & Push Piers · Crack Injection · Wall Anchors & Bracing · Basement Waterproofing
const FOUNDATION_REPAIR: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Photorealistic close-up of a structural foundation crack with a steel push pier installation in progress, professional construction site, dramatic warm afternoon lighting, dusty atmosphere, hands working with tools visible, suburban basement setting, magazine photography quality, shallow depth of field",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  // service1 = "Helical & Push Piers"
  {
    slot: "service1",
    prompt:
      "Industrial galvanized steel helical pier being driven into the soil beside a residential foundation, hydraulic drive head visible at the top of the pier, professional construction site, dramatic side lighting on threading detail, dusty atmosphere, photorealistic documentary photography, sharp focus.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "Crack Injection"
  {
    slot: "service2",
    prompt:
      "Closeup of a polyurethane injection gun pressed against a vertical concrete foundation crack, expanding foam resin visibly filling the crack, professional contractor's gloved hand steady on the gun, basement workshop lighting, technical documentary photography, photorealistic, sharp focus.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Wall Anchors & Bracing"
  {
    slot: "service3",
    prompt:
      "A galvanized steel wall anchor plate bolted to a bowed basement foundation wall with the threaded rod and exterior earth anchor visible through a cutaway, vertical steel I-beam brace running floor to ceiling alongside, clean basement interior with concrete floor, technical engineering photography, dramatic side lighting, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, carbon fiber strap, fabric reinforcement`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "Basement Waterproofing"
  {
    slot: "service4",
    prompt:
      "Interior basement waterproofing system in progress — a perforated drain tile pipe being laid in a freshly cut trench at the base of the foundation wall, a black dimpled vapor barrier membrane sealed against the wall above, a sump pit with new pump in the corner, fresh gravel beside the trench, bright work lights, technical construction photography, photorealistic, sharp focus.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
];

// Services: Emergency Repairs · Drain Cleaning & Sewer · Water Heater Service · Leak Detection
const PLUMBERS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Professional plumber arriving at suburban front door at golden hour with toolkit, friendly approachable expression, clean uniform with company logo placeholder, photojournalism style, warm natural lighting, photorealistic, magazine quality",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux-pro/v1.1-ultra",
    imageSize: "portrait_4_3",
  },
  // service1 = "Emergency Repairs"
  {
    slot: "service1",
    prompt:
      "Urgent plumbing emergency scene — water actively leaking from a burst copper pipe under a residential sink, a wrench and shutoff valve handle in clear focus, droplets caught mid-fall, harsh top-down work-light from a flashlight, sense of urgency, documentary photojournalism, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, calm scene, no water, dry`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "Drain Cleaning & Sewer"
  {
    slot: "service2",
    prompt:
      "Heavy-duty drain cleaning auger snake feeding into a residential floor drain, the motorized cable spool visible beside it, professional plumber's tools laid out neatly nearby, clean garage workshop setting, side lighting, technical documentary photography, photorealistic, sharp focus.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Water Heater Service"
  {
    slot: "service3",
    prompt:
      "A modern tankless water heater unit mounted on a clean utility-room wall, copper supply lines and gas line cleanly run, technician's wrench resting on top, bright fluorescent overhead lighting, technical product photography, photorealistic, sharp focus. No people.",
    negativePrompt: `${COMMON_NEGATIVE}, people, person`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "Leak Detection"
  {
    slot: "service4",
    prompt:
      "A professional plumber holding a thermal-imaging leak detection camera against a kitchen wall, the camera's screen showing a glowing orange-red hot spot indicating a hidden pipe leak, modern home interior softly blurred behind, technical inspection photography, sharp focus on the device, photorealistic, magazine quality.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
];

// Services: AC Repair & Installation · Heating Service · Indoor Air Quality · Maintenance Plans
const HVAC: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "HVAC technician in branded uniform installing a sleek modern outdoor condenser unit beside a suburban home, late afternoon golden light, calm focused expression, professional documentary photography, clean composition, sharp focus",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux-pro/v1.1-ultra",
    imageSize: "portrait_4_3",
  },
  // service1 = "AC Repair & Installation"
  {
    slot: "service1",
    prompt:
      "A new outdoor AC condenser unit being installed beside a suburban home — the technician's wrench tightening a refrigerant line connection, gauges on a manifold set lying on the concrete pad, fresh copper line set running into the wall, late-afternoon golden light, technical documentary photography, photorealistic, sharp focus on the unit.",
    negativePrompt: `${COMMON_NEGATIVE}, indoor thermostat, smart thermostat`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "Heating Service"
  {
    slot: "service2",
    prompt:
      "A residential gas furnace in a basement utility room with the access panel removed, an HVAC technician's gloved hands inspecting the burner assembly with a flashlight, blue pilot flames visible, technical side lighting, documentary photography, sharp focus on the burners, photorealistic.",
    negativePrompt: `${COMMON_NEGATIVE}, outdoor unit only, no person`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Indoor Air Quality"
  {
    slot: "service3",
    prompt:
      "A high-MERV pleated HEPA air filter being slid into a residential HVAC return air vent, the technician's gloved hand guiding it home, the old dust-clogged filter visible on the floor beside for contrast, clean utility room, technical detail photography, bright lighting, photorealistic, sharp focus.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "Maintenance Plans"
  {
    slot: "service4",
    prompt:
      "An HVAC technician kneeling beside an outdoor condenser unit, performing a seasonal tune-up — refrigerant gauges connected to the service ports, a digital multimeter probe on the contactor, a clipboard with a maintenance checklist resting on top of the unit, branded service truck softly blurred in the background, golden afternoon light, documentary photography, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, ductwork only, attic only`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
];

// Services: Storm Damage & Insurance Claims · Roof Replacement · Roof Repair · Commercial Roofing
const ROOFERS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Drone shot of professional roofing crew installing dark architectural shingles on a suburban home, dramatic sky after a recent storm clearing, golden afternoon light breaking through clouds, photorealistic aerial photography, magazine quality",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/flux-pro/v1.1-ultra",
    imageSize: "landscape_16_9",
  },
  // service1 = "Storm Damage & Insurance Claims"
  {
    slot: "service1",
    prompt:
      "A residential roof immediately after a hailstorm — visible hail-strike pocks on dark architectural shingles, several shingles torn loose and curled at the corners, a blue tarp partially covering the damaged section, an insurance adjuster's clipboard and digital camera resting on the ridge, dramatic post-storm sky with breaking sunlight, documentary photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, brand new install, perfect roof, no damage`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "Roof Replacement"
  {
    slot: "service2",
    prompt:
      "Mid-tear-off scene on a suburban home — half the roof has been stripped down to bare plywood decking, the other half still has old worn shingles, a debris chute running to a dumpster in the driveway, professional crew working with nail guns visible, golden afternoon light, documentary aerial photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, single shingle closeup, gutter, skylight`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Roof Repair"
  {
    slot: "service3",
    prompt:
      "A roofer kneeling on a residential roof patching a small section of damaged shingles — fresh new shingles being slid into place beside a roofing nailer, a tube of roofing sealant and a putty knife resting beside, the surrounding existing roof still intact, focused detail work, sharp focus on the patch area, photojournalism, photorealistic.",
    negativePrompt: `${COMMON_NEGATIVE}, gutters, skylight install, full replacement`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "Commercial Roofing"
  {
    slot: "service4",
    prompt:
      "Wide-angle view of a flat commercial building roof under installation — large rolls of white TPO membrane being heat-welded into place by a roofing crew, mechanical HVAC units distributed across the roofline, parapet wall visible at the edge, distant city skyline beyond, blue sky, documentary commercial photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, residential, sloped roof, asphalt shingles`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Premium Outdoor Living group — drone, magazine, aspirational
// ─────────────────────────────────────────────────────────────────────

// Services: Custom Inground Pool Design · Pool Renovation & Resurfacing · Spas & Water Features · Outdoor Kitchens & Lanais
const POOL_BUILDERS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Drone aerial photograph of a stunning custom infinity-edge pool with vanishing edge cascading into landscape, vibrant turquoise water, custom waterfall feature, luxury Mediterranean home in background, twilight ambient lighting with pool lights illuminating water from below, lush tropical landscaping with palm trees, photorealistic architectural photography, Architectural Digest magazine quality, ultra-sharp details, 8k resolution, dramatic composition",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_16_9",
  },
  // service1 = "Custom Inground Pool Design"
  {
    slot: "service1",
    prompt:
      "A stunning newly-completed custom geometric inground swimming pool with a perfectly clean rectangular shape and modern travertine coping, crystal clear bright turquoise water, raised spa with cascading sheer descent waterfall, manicured landscaping, modern Mediterranean home in background, photographed in beautiful golden afternoon light, photorealistic architectural photography, magazine quality, ultra-sharp focus on the pool design.",
    negativePrompt: `${COMMON_NEGATIVE}, people, construction equipment, demolition, unfinished, cracks, dirty water`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "Pool Renovation & Resurfacing"
  {
    slot: "service2",
    prompt:
      "An older swimming pool mid-renovation — the pool has been drained and the interior plaster surface is being resurfaced with fresh material, professional pool renovation tools and a trowel resting on the deck, scaffolding visible at the edge, daytime documentary photography of pool restoration work in progress, photorealistic, magazine quality, no people visible.",
    negativePrompt: `${COMMON_NEGATIVE}, people, full water, finished pool, brand new pool`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Spas & Water Features"
  {
    slot: "service3",
    prompt:
      "An integrated raised spa beside an inground pool with multiple water features active — a tall sheer-descent waterfall cascading from a stone wall into the pool, two scupper bowls flowing water in parallel, accent lighting beneath the waterfall, evening twilight setting with warm pool lights glowing, ultra-luxurious resort backyard, photorealistic, magazine architectural photography, sharp focus on the water features.",
    negativePrompt: `${COMMON_NEGATIVE}, people, empty pool, daytime harsh light`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "Outdoor Kitchens & Lanais"
  {
    slot: "service4",
    prompt:
      "A luxury built-in outdoor kitchen with stainless steel grill, polished stone countertop, integrated beverage refrigerator, and bar seating with modern stools, set within a covered lanai featuring a wood-beamed ceiling and overhead pendant lights, swimming pool visible in the background through the lanai opening, golden hour light, photorealistic architectural photography, magazine quality, no people.",
    negativePrompt: `${COMMON_NEGATIVE}, people, only pool, indoor kitchen`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
];

// Services: Residential Solar Systems · Battery Storage & Backup · Roof Assessment & Prep · Tax Credit & Incentive Filing
const SOLAR_INSTALLERS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Stunning low-angle photograph looking up at perfectly aligned high-tech monocrystalline solar panels glowing in golden hour sunlight, dramatic lens flare highlights, brilliant blue sky reflecting in panels, modern minimalist home architecture in foreground, professional commercial photography, ultra-sharp details, 8k resolution, dramatic composition, magazine quality, photorealistic",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_16_9",
  },
  // service1 = "Residential Solar Systems"
  {
    slot: "service1",
    prompt:
      "Drone aerial view of a complete residential solar panel array installed on a modern suburban rooftop, perfectly aligned dark monocrystalline panels covering most of the south-facing roof slope, manicured lawn and driveway visible below, brilliant blue sky, golden hour light, photorealistic architectural photography, magazine quality, sharp focus on the full array.",
    negativePrompt: `${COMMON_NEGATIVE}, single panel closeup, person, battery`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "Battery Storage & Backup"
  {
    slot: "service2",
    prompt:
      "Two sleek modern home battery storage units mounted side by side on a clean garage wall, glowing LED status indicators, electrical conduit running cleanly between them and a circuit breaker panel, polished concrete floor below, soft cool overhead lighting, technical product photography, photorealistic, sharp focus on the batteries. No people.",
    negativePrompt: `${COMMON_NEGATIVE}, people, rooftop, panels`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Roof Assessment & Prep"
  {
    slot: "service3",
    prompt:
      "A solar assessor standing on a residential roof with a measuring tape and digital tablet, evaluating the roof slope and surface condition, drone hovering nearby, marker chalk lines visible on the shingles indicating proposed panel layout, suburban neighborhood softly blurred below, blue sky, golden afternoon light, documentary professional photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, panels installed, batteries, paperwork`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "Tax Credit & Incentive Filing"
  {
    slot: "service4",
    prompt:
      "Top-down flat-lay of solar tax-credit paperwork on a desk — IRS Form 5695 in clear focus, a calculator with the display showing a rebate total, a pen, a folder labeled in plain text, a coffee cup beside, soft window light from upper right, organized professional financial-paperwork lifestyle photography, photorealistic, sharp focus, no readable text on documents.",
    negativePrompt: `${COMMON_NEGATIVE}, panels, rooftop, batteries, smartphone app`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// B2B Commercial — corporate, data-forward, professional
// ─────────────────────────────────────────────────────────────────────

// Services: Mechanical Diamond Polishing · Densification & Hardening · Joint Filling & Crack Repair · Stain & Dye Systems
const POLISHED_CONCRETE: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Wide angle photo of a vast polished concrete warehouse floor with mirror-like sheen, industrial steel beams overhead, dramatic perspective leading to vanishing point, professional architectural photography, clean atmospheric lighting",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_16_9",
  },
  // service1 = "Mechanical Diamond Polishing"
  {
    slot: "service1",
    prompt:
      "A heavy industrial concrete polishing machine in mid-operation on a vast warehouse floor — multiple diamond polishing pads spinning under the head, slurry water running off the slab, the operator's boots and the machine's handle visible, dramatic side lighting catching the wet surface, photojournalism, photorealistic, sharp focus on the polishing head.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "Densification & Hardening"
  {
    slot: "service2",
    prompt:
      "A concrete densifier being applied to a commercial floor — a wide pump-up sprayer wand depositing a clear lithium-silicate liquid that visibly soaks into the gray concrete surface in a fan pattern, the wet line clearly distinct from the dry untreated concrete beside it, the contractor's boots in frame at the edge, bright work lights, technical documentary photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, finished glossy floor only, retail interior`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Joint Filling & Crack Repair"
  {
    slot: "service3",
    prompt:
      "Closeup of a control joint in a polished concrete warehouse floor being filled with a flexible gray polyurea joint sealant from a dual-cartridge applicator gun, the freshly extruded bead glistening, an excess-trim razor knife resting beside, the surrounding polished slab reflecting overhead industrial lights, technical detail photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, retail store, finished floor only`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "Stain & Dye Systems"
  {
    slot: "service4",
    prompt:
      "A richly stained polished concrete floor showing varied amber-bronze tones with naturally occurring marbling and color variation across the surface, photographed from a low angle to emphasize the glossy sheen and color depth, a stain applicator pump sprayer visible at the edge of frame, modern commercial space, dramatic side lighting, magazine architectural photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, gray plain concrete, densifier, machine`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Visual / Pinterest group — editorial, refined, design-forward
// ─────────────────────────────────────────────────────────────────────

// Services: Stamped Concrete · Acid-Stained Concrete · Exposed Aggregate · Micro-Toppings & Overlays
const DECORATIVE_CONCRETE: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Beautifully stamped concrete patio with rich earthtone staining and slate pattern, outdoor furniture and landscaping, golden hour light casting long shadows, magazine quality outdoor lifestyle photography, photorealistic",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  // service1 = "Stamped Concrete"
  {
    slot: "service1",
    prompt:
      "Closeup of a stamped concrete patio surface in slate-gray tones with deeply embossed natural stone pattern, rich texture and grout lines clearly defined, outdoor furniture leg visible at the edge of frame, golden afternoon light raking across the surface to emphasize relief, architectural detail photography, photorealistic, sharp focus.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
  // service2 = "Acid-Stained Concrete"
  {
    slot: "service2",
    prompt:
      "Acid-stained interior concrete floor in rich amber and burnt-orange tones with naturally occurring marbling and translucent depth, photographed in a modern industrial loft with floor-to-ceiling windows, dramatic side lighting catching the variegation, lifestyle architectural photography, photorealistic, sharp focus on the floor surface.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
  // service3 = "Exposed Aggregate"
  {
    slot: "service3",
    prompt:
      "Closeup of an exposed aggregate concrete walkway surface — multicolored small pebbles and quartz stones bonded into the concrete, freshly washed surface with subtle wet sheen, manicured garden borders visible at the edges, bright daylight, sharp architectural detail photography, photorealistic, ultra-sharp focus on the aggregate texture.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
  // service4 = "Micro-Toppings & Overlays"
  {
    slot: "service4",
    prompt:
      "A craftsman applying a thin micro-topping concrete overlay onto an existing patio surface — a wide steel finishing trowel spreading a smooth pearl-gray overlay material across the slab, the previously worn concrete visible beyond the trowel line, technical documentary photography, sharp focus on the trowel and the smooth fresh surface, photorealistic, magazine quality.",
    negativePrompt: `${COMMON_NEGATIVE}, pool deck only, salt finish`,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
];

// Services: Custom Color & Highlights · Dimensional Balayage · Hand-Tied Hair Extensions · Precision Cuts & Styling
const HAIR_SALONS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Stylish modern hair salon interior with elegant chairs, soft natural light streaming through tall windows, terrazzo floors, brass fixtures, plants, editorial lifestyle photography, magazine quality, photorealistic, no people",
    negativePrompt: COMMON_NEGATIVE + ", crowded, cluttered",
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  // service1 = "Custom Color & Highlights"
  {
    slot: "service1",
    prompt:
      "Editorial flat-lay of custom hair color formulation on a white marble counter — three professional ceramic mixing bowls each holding a different hair color shade, professional tint brushes resting in each, foil sheets neatly stacked beside, a measuring scale partially visible at the edge, a single eucalyptus sprig for styling, soft golden window light from upper right, magazine beauty editorial photography, photorealistic, sharp focus.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
  // service2 = "Dimensional Balayage"
  {
    slot: "service2",
    prompt:
      "Closeup of beautifully dimensional balayage — long wavy hair with hand-painted highlights creating a natural sun-kissed gradient from cooler dark roots to warm caramel-blonde tips, soft beauty lighting from behind catching the highlights, magazine editorial beauty photography, photorealistic, ultra-sharp focus on the dimensional color.",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
  // service3 = "Hand-Tied Hair Extensions"
  {
    slot: "service3",
    prompt:
      "Premium hand-tied hair extension wefts laid out on a white marble surface — long wefts of hair in a balayage gradient from dark to caramel blonde, the hand-tied weft band clearly visible at the top showing the careful stitching, a small clear gel comb resting beside, professional installation tools nearby, soft natural window light, magazine beauty product photography, photorealistic, sharp focus on the weft construction.",
    negativePrompt: `${COMMON_NEGATIVE}, shampoo bottles, products only`,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
  // service4 = "Precision Cuts & Styling"
  {
    slot: "service4",
    prompt:
      "Editorial closeup of professional hair-cutting in motion — sharp Japanese-style hairdressing shears mid-cut on a clean section of dark hair, a fine-tooth comb in the stylist's other hand holding tension, the precision-cut bluntly straight edge visible, soft beauty lighting, sharp focus on the shears and freshly cut line, magazine editorial photography, photorealistic.",
    negativePrompt: `${COMMON_NEGATIVE}, hair extensions, weft, product flat-lay`,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
];

// Services: Botox & Dysport · Dermal Fillers · Laser Treatments · Microneedling & RF
const MEDICAL_SPAS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Empty modern medical spa treatment room interior, white walls with warm walnut wood accents, single sleek cream-colored treatment bed centered in frame, large potted fiddle leaf fig plant in corner, sheer curtains diffusing soft golden hour light, polished concrete floor, minimalist sculptural pendant light fixture, no people, no humans, no figures, architectural interior photography, magazine editorial quality, sharp focus, photorealistic, 8k",
    negativePrompt: `${COMMON_NEGATIVE}, people, person, human, face, woman, man, model, hands, fingers, body parts`,
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  // service1 = "Botox & Dysport"
  {
    slot: "service1",
    prompt:
      "Editorial flat-lay of injectable aesthetic medicine prep on a polished white marble countertop — a slim insulin-style syringe in clear focus, a small unlabeled vial, a sterile alcohol prep pad, white nitrile gloves folded neatly, soft golden side light from upper right, magazine medical-aesthetic editorial photography, ultra-sharp focus on the syringe, photorealistic. No people, no faces, no skin.",
    negativePrompt: `${COMMON_NEGATIVE}, people, faces, skin, hands, body, dropper bottles, serum`,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
  // service2 = "Dermal Fillers"
  {
    slot: "service2",
    prompt:
      "Editorial flat-lay of dermal-filler treatment products on a white marble surface — a small clear hyaluronic-acid syringe with a fine needle attached, a sealed sterile package beside it, a single fresh white rose laid for visual softness, soft natural window light, magazine beauty editorial photography, ultra-sharp focus on the syringe, photorealistic. No people, no faces.",
    negativePrompt: `${COMMON_NEGATIVE}, people, faces, lips, body parts, laser device`,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
  // service3 = "Laser Treatments"
  {
    slot: "service3",
    prompt:
      "A modern medical-grade aesthetic laser treatment device on a polished white counter in a bright clinical room, sleek white chassis with a subtle blue LED indicator glowing, the articulated arm and treatment handpiece resting in their cradle, neutral cool lighting, depth of field with the device sharp and the room softly blurred, professional product photography, magazine quality, photorealistic. No people, no hands.",
    negativePrompt: `${COMMON_NEGATIVE}, people, hands, fingers, rose petal`,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
  // service4 = "Microneedling & RF"
  {
    slot: "service4",
    prompt:
      "A professional microneedling pen device resting on a sterile white tray on a polished marble counter — sleek white-and-rose-gold device with the disposable needle cartridge attached, a sterile sealed cartridge package beside, a small bottle of hyaluronic-acid serum, soft window light, magazine medical-aesthetic editorial product photography, ultra-sharp focus on the device, photorealistic. No people, no faces, no skin treatment in progress.",
    negativePrompt: `${COMMON_NEGATIVE}, people, faces, skin, hands, lobby, reception`,
    model: "fal-ai/gpt-image-2",
    imageSize: "square_hd",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Auto Body — automotive professional
// ─────────────────────────────────────────────────────────────────────

// Services: Collision Repair · Paint Matching & Refinishing · Frame & Unibody Straightening · ADAS Calibration
const AUTO_BODY: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Auto body technician in clean uniform polishing a freshly painted car fender to mirror finish, modern bright auto body shop interior, dramatic side lighting reflecting on car paint, professional photojournalism, sharp focus, magazine quality",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  // service1 = "Collision Repair"
  {
    slot: "service1",
    prompt:
      "A modern sedan with collision damage to the front-right quarter panel sitting on a lift inside a clean professional auto body shop — crumpled fender clearly visible, hood slightly misaligned, the technician's tools and a body-hammer set on a rolling cart beside, bright shop lighting, documentary photography, photorealistic, sharp focus on the damaged area.",
    negativePrompt: `${COMMON_NEGATIVE}, perfect paint, mirror polish, no damage`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "Paint Matching & Refinishing"
  {
    slot: "service2",
    prompt:
      "A handheld spectrophotometer paint-match device pressed against a metallic-gray car fender, a digital tablet beside it displaying a color chart with the matched formula, paint-mixing canisters and a stir paddle in the background, clean auto-body paint room, dramatic side lighting, technical documentary photography, photorealistic, sharp focus on the device.",
    negativePrompt: `${COMMON_NEGATIVE}, dent repair tool, frame, welding`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Frame & Unibody Straightening"
  {
    slot: "service3",
    prompt:
      "A vehicle clamped onto a heavy-duty frame straightening rack inside an auto body shop — multiple hydraulic pulling chains tensioned at strategic points along the unibody, computerized measuring sensors mounted to the frame, technician's laptop displaying frame dimension data on a rolling stand, bright shop lighting, documentary photography, photorealistic, sharp focus on the rack and chains.",
    negativePrompt: `${COMMON_NEGATIVE}, paint booth, sparks, welding only`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "ADAS Calibration"
  {
    slot: "service4",
    prompt:
      "ADAS sensor calibration in progress in a modern auto body shop — a vehicle parked precisely in front of a large standing target board with reference patterns and crosshair markers, a technician's diagnostic laptop on a stand showing calibration data, lane-departure camera and forward-collision radar sensors visible behind the vehicle's grille, bright shop lighting, technical documentary photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, welding, frame chains, paint, sparks`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Mobile Pet Grooming — warm/family editorial
// ─────────────────────────────────────────────────────────────────────

// Services: Full Service Groom · Bath & Brush · Breed-Specific Cuts · Nail Trim & Grind
const MOBILE_PET_GROOMING: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "A clean unbranded white Mercedes Sprinter van parked on a tree-lined suburban street, completely plain white exterior with no signage, no logos, no text, no lettering, no decals, no graphics — just a pure white panel van. Side door slightly open showing professional grooming equipment inside. Warm afternoon golden hour light, dappled tree shadows on the pavement, residential neighborhood with manicured green lawns and mature oaks. Lifestyle commercial photography, sharp focus on the van, photorealistic, magazine quality, 8k. No animals, no people.",
    negativePrompt: `${COMMON_NEGATIVE}, text, lettering, signage, writing, words, logos, decals, graphics, branding, phone number, website, vehicle wrap, dog, dogs, animals, pets, people, person, paws, anatomy errors`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_16_9",
  },
  // service1 = "Full Service Groom"
  {
    slot: "service1",
    prompt:
      "A handsome clean golden retriever standing in full side profile on a soft outdoor lawn with a freshly groomed gleaming coat, photographed from across the lawn with a telephoto lens — entire body in frame from nose to tail, all four legs clearly visible standing on the ground, ears alert, calm content expression, warm afternoon golden hour light, lifestyle pet photography, sharp focus on the dog's silhouette, photorealistic, magazine quality.",
    negativePrompt: `${COMMON_NEGATIVE}, closeup paws, hands, fingers, anatomy errors, extra limbs, missing limbs, missing legs, deformed paws`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "Bath & Brush"
  {
    slot: "service2",
    prompt:
      "A small wet dog being gently bathed in a stainless-steel mobile grooming tub — soft white suds on the dog's back, a handheld sprayer visible at the edge of frame, the side profile of the calm relaxed dog clearly in view, fresh towels stacked nearby, warm bright daylight from the open van door, lifestyle pet photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, closeup paws, hands closeup, anatomy errors, empty van interior only`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Breed-Specific Cuts"
  {
    slot: "service3",
    prompt:
      "A small clean fluffy white poodle freshly groomed in a classic continental breed-specific cut sitting in calm side profile on a soft cream towel against a neutral background, full body in frame from side view showing the breed-specific topiary clip detail, head turned slightly toward camera, soft north-facing window light, lifestyle pet portrait photography, magazine quality, photorealistic, ultra-sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, closeup paws, hands, fingers, anatomy errors, missing legs, deformed limbs, multiple heads`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "Nail Trim & Grind"
  {
    slot: "service4",
    prompt:
      "Top-down flat-lay of professional pet nail-care tools arranged on a warm-toned wood surface — a stainless-steel guillotine-style nail clipper, a small electric nail grinder with the abrasive head visible, a styptic-powder container, a fresh white towel folded beside, soft golden natural light, magazine product editorial photography, photorealistic, sharp focus. No people, no hands, no animals.",
    negativePrompt: `${COMMON_NEGATIVE}, people, hands, fingers, dogs, animals, paws closeup`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Fitness Studios — energetic, dark mode
// ─────────────────────────────────────────────────────────────────────

// Services: Small-Group Strength · 1:1 Personal Coaching · Metabolic Conditioning · Mobility & Recovery
const FITNESS: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Group fitness class mid-rep in a dark modern boutique gym with dramatic side lighting, sweat and intensity visible, real members not models, low-key gym aesthetic, photojournalism style, magazine quality",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_16_9",
  },
  // service1 = "Small-Group Strength"
  {
    slot: "service1",
    prompt:
      "A small group of four to six adults training together in a dark modern boutique gym — each on their own platform mid-deadlift with loaded barbells, a coach observing from the center calling form cues, dramatic side lighting catching the chalk dust in the air, gritty intense atmosphere, real bodies not fitness models, photojournalism photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, empty gym, equipment only, kettlebells flat-lay`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "1:1 Personal Coaching"
  {
    slot: "service2",
    prompt:
      "A personal coach in a fitted dark coaching shirt demonstrating squat depth to a single athletic client in a dark boutique gym — coach kneeling beside the client mid-squat, hand pointing to the client's hip position, the client wearing a fitness watch and gripping a loaded barbell, focused intense expressions, dramatic side lighting, photojournalism, photorealistic, sharp focus on the coaching interaction.",
    negativePrompt: `${COMMON_NEGATIVE}, empty equipment, group class, yoga`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Metabolic Conditioning"
  {
    slot: "service3",
    prompt:
      "Metabolic conditioning workout in progress in a dark gritty gym — an athlete pushing a heavy weighted sled across a turf strip with battle-rope station, ski erg, and concept-2 rower visible in the background, sweat visible, motion blur on the sled, dramatic side lighting catching the dust, gritty photojournalism, photorealistic, sharp focus on the athlete.",
    negativePrompt: `${COMMON_NEGATIVE}, yoga mats, serene studio, empty gym`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "Mobility & Recovery"
  {
    slot: "service4",
    prompt:
      "A calm mobility and recovery space inside a boutique gym — an athlete lying on a yoga mat doing a hip-opening stretch with a foam roller and a percussion massage gun beside, wooden plyo boxes and lacrosse balls neatly arranged on a recovery shelf in the background, soft warm lighting, calm atmosphere distinct from the main training floor, lifestyle photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, spin bikes, neon, intense workout, sled`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Aging-in-Place — dignified, warm, accessible
// ─────────────────────────────────────────────────────────────────────

// Services: Straight Stair Lifts · Curved Stair Lifts · Outdoor Stair Lifts · Wheelchair Platform Lifts
const STAIR_LIFT: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Smiling senior man calmly riding a modern stair lift in a warm sunlit home staircase, elegant interior with framed family photos, lifestyle photography, dignified atmosphere, magazine quality, photorealistic",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  // service1 = "Straight Stair Lifts"
  {
    slot: "service1",
    prompt:
      "A modern straight-rail stair lift mounted along the treads of a residential straight staircase, no person seated, focus on the equipment and clean home interior, soft natural lighting through a nearby window, framed family photos visible on the wall, technical product photography, photorealistic, sharp focus on the rail and chair.",
    negativePrompt: `${COMMON_NEGATIVE}, curved rail, outdoor, platform`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "Curved Stair Lifts"
  {
    slot: "service2",
    prompt:
      "A custom curved-rail stair lift gracefully following the curve of a modern home staircase with a 90-degree turn at a mid-landing, no person seated, the rail clearly visible bending around the curve, warm natural lighting, residential lifestyle photography, magazine quality, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, straight rail, outdoor, platform`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Outdoor Stair Lifts"
  {
    slot: "service3",
    prompt:
      "A weather-rated outdoor stair lift mounted along a residential porch staircase leading from a deck to a backyard garden, weather-resistant gray rail and chair with a protective fabric cover folded at the seat, no person seated, manicured lawn and patio furniture in the background, golden afternoon light, lifestyle exterior photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, indoor, family scene, person on lift`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "Wheelchair Platform Lifts"
  {
    slot: "service4",
    prompt:
      "A vertical wheelchair platform lift installed at the side of a residential porch with several steps — a sturdy steel platform large enough for a wheelchair, white safety gates at the top and bottom, control panel mounted on a post, accessible ramp leading onto the platform, no person on the platform, suburban home in soft afternoon light, lifestyle accessibility photography, photorealistic, sharp focus.",
    negativePrompt: `${COMMON_NEGATIVE}, seated stair lift, technician, indoor staircase`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Personal Brand — Real Estate
// ─────────────────────────────────────────────────────────────────────

// Services: Seller Representation · Buyer Representation · Free Home Valuation · Investor & Multi-Family
const REAL_ESTATE: ImagePrompt[] = [
  {
    slot: "hero",
    prompt:
      "Professional real estate agent portrait, confident smile, modern blazer, suburban neighborhood softly blurred behind, golden hour lighting, magazine editorial portrait photography, photorealistic, sharp focus",
    negativePrompt: COMMON_NEGATIVE,
    model: "fal-ai/gpt-image-2",
    imageSize: "portrait_4_3",
  },
  // service1 = "Seller Representation"
  {
    slot: "service1",
    prompt:
      "A beautiful luxury suburban home exterior at golden-hour twilight with warm interior lights glowing through windows, a professional 'Just Listed' real-estate yard sign in the front lawn (sign blank without readable text), manicured landscaping, magazine real-estate photography, photorealistic, sharp focus on the home and sign.",
    negativePrompt: `${COMMON_NEGATIVE}, sold sign, open house sign, handshake, kitchen interior, multifamily`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service2 = "Buyer Representation"
  {
    slot: "service2",
    prompt:
      "A real estate agent walking a young couple through a beautiful living room of a home for sale — the agent gesturing toward features of the room, the couple nodding and looking around with interest, large windows letting in warm afternoon light, modern interior staging, lifestyle real-estate photography, photorealistic, sharp focus on the three figures.",
    negativePrompt: `${COMMON_NEGATIVE}, sold sign, open house sign only, kitchen empty, multifamily building`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service3 = "Free Home Valuation"
  {
    slot: "service3",
    prompt:
      "A real estate agent standing in a homeowner's living room with a digital tablet and clipboard, taking notes during a comparative-market-analysis walkthrough, a laser measure resting on the side table, the homeowner softly blurred in the background, soft natural daylight, lifestyle professional photography, photorealistic, sharp focus on the agent and tablet.",
    negativePrompt: `${COMMON_NEGATIVE}, sold sign, handshake, kitchen only, multifamily`,
    model: "fal-ai/gpt-image-2",
    imageSize: "landscape_4_3",
  },
  // service4 = "Investor & Multi-Family"
  {
    slot: "service4",
    prompt:
      "Exterior wide-angle of a charming small multifamily property — a clean three-story duplex or four-plex apartment building with separate entrances, manicured landscaping, mature trees, mailboxes at the curb, suburban or urban-edge neighborhood, golden afternoon light, real-estate listing photography, photorealistic, sharp focus on the building.",
    negativePrompt: `${COMMON_NEGATIVE}, single family kitchen, handshake, sold sign closeup`,
    model: "fal-ai/gpt-image-2",
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
