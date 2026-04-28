/**
 * Niche-specific SITE content (customer-facing).
 *
 * IMPORTANT: This is NOT FDM's marketing copy. This is the content that a real
 * business in each niche would put on their own website to sell to THEIR customers.
 *
 * Examples:
 *   - Foundation Repair company → speaks to homeowners with cracked walls
 *   - Plumber → speaks to homeowners with leaks/clogs
 *   - Med Spa → speaks to clients booking treatments
 *   - Real Estate Agent → speaks to buyers/sellers
 *
 * lib/data/industries.ts is the OPPOSITE — it's FDM marketing copy speaking
 * TO industry owners about FDM's services. Don't confuse the two.
 *
 * The preview generator combines:
 *   archetype design (visual language)
 *   + niche-design overrides (palette/hero/imagery shifts)
 *   + this content (the actual words on the site)
 *   + business data (name, phone, address)
 *   = a generated customer-facing site for that business in that niche.
 */

export interface NicheSiteContent {
  /** Hero tagline — short, customer-facing. Renders as h1. */
  heroTagline: string;
  /** Hero subtitle paragraph — describes what the business does for the customer */
  heroSubtitle: string;
  /** Hero CTA button text */
  heroCta: string;
  /** Secondary CTA button text */
  heroSecondaryCta: string;

  /** Trust stats shown in hero — generic but plausible for the niche */
  trustStats: { value: string; label: string }[];

  /** "Sound familiar?" customer-pain section heading */
  customerPainsHeading: string;
  /** Customer-side pains — what the customer is experiencing, NOT what the business owner faces */
  customerPains: string[];

  /** "What we do" services heading */
  servicesHeading: string;
  /** Services the BUSINESS offers to the customer */
  services: { title: string; description: string }[];

  /** "Why us" reasons-to-choose section heading */
  whyUsHeading: string;
  whyUs: { title: string; description: string }[];

  /** FAQ section — questions a CUSTOMER would ask the business (not FDM) */
  faqs: { question: string; answer: string }[];

  /** Final CTA copy */
  finalCtaHeading: string;
  finalCtaSubtitle: string;
  finalCtaButton: string;
}

// ─────────────────────────────────────────────────────────────────────
// Urgent Trade group
// ─────────────────────────────────────────────────────────────────────

const FOUNDATION_REPAIR: NicheSiteContent = {
  heroTagline: "Saw a crack? We’ll be there before it spreads.",
  heroSubtitle:
    "Free in-home foundation inspection, transparent quotes, and lifetime-transferable warranties. We fix what’s already settled and stop what’s about to.",
  heroCta: "Book Free Inspection",
  heroSecondaryCta: "See Our Work",
  trustStats: [
    { value: "Lifetime", label: "Transferable Warranty" },
    { value: "20+ yrs", label: "Local Experience" },
    { value: "Free", label: "On-Site Inspection" },
    { value: "Same-day", label: "Quote Turnaround" },
  ],
  customerPainsHeading: "Sound familiar?",
  customerPains: [
    "You’ve got a crack in the wall and don’t know if it’s cosmetic or structural",
    "Doors and windows are sticking — could be settlement, could be humidity",
    "There’s water in the basement after every heavy rain",
    "Your floors slope or feel uneven in spots",
    "Another contractor quoted $30K and you have no idea if that’s fair",
  ],
  servicesHeading: "What we fix.",
  services: [
    {
      title: "Helical & Push Piers",
      description:
        "Steel piers driven to load-bearing soil to lift and stabilize your settling foundation. Permanent fix, engineered to support full home weight.",
    },
    {
      title: "Crack Injection",
      description:
        "Polyurethane or epoxy injection seals foundation cracks against water intrusion. Fast, no excavation, lifetime-warrantied.",
    },
    {
      title: "Wall Anchors & Bracing",
      description:
        "Stabilization for bowing or buckling basement walls. Permanent fix to prevent further movement, often invisible after finishing.",
    },
    {
      title: "Basement Waterproofing",
      description:
        "Interior drainage, sump pumps, and exterior membranes that keep groundwater out for good. Backed by a transferable dry-basement warranty.",
    },
    {
      title: "Slab Leveling (Mudjacking)",
      description:
        "Concrete or polyurethane injection to lift settled slabs — driveways, walkways, garage floors — without breaking and replacing.",
    },
    {
      title: "Crawlspace Repair",
      description:
        "Encapsulation, vapor barriers, and structural support for crawlspaces. Stops moisture damage and improves indoor air quality upstairs.",
    },
  ],
  whyUsHeading: "Why homeowners pick us.",
  whyUs: [
    {
      title: "Free On-Site Inspection",
      description:
        "We come out, look at the actual problem, and give you a written report. No high-pressure sales pitch.",
    },
    {
      title: "Engineered Solutions",
      description:
        "Every repair is designed by a structural engineer and inspected before final payment. You get the documentation for resale.",
    },
    {
      title: "Lifetime Transferable Warranty",
      description:
        "If you sell the house, the warranty transfers to the next owner. Adds resale value, not headaches.",
    },
    {
      title: "Financing Available",
      description:
        "Fix it now, pay over 12–60 months. We work with multiple lenders so you get the best rate.",
    },
  ],
  faqs: [
    {
      question: "How do I know if a crack is structural or just cosmetic?",
      answer:
        "Hairline cracks under 1/16\" wide that run vertically are usually cosmetic — settling drywall or paint shrinkage. Cracks wider than 1/8\", horizontal cracks, or stair-step cracks in masonry are structural and need professional eyes. Free inspection settles it in 20 minutes.",
    },
    {
      question: "Will my homeowners insurance cover foundation repair?",
      answer:
        "Usually no — most policies exclude foundation issues from earth movement, settling, or hydrostatic pressure. There are exceptions for sudden events (a tree falls, plumbing leak underneath). We help you document what we find so you can file a claim if applicable.",
    },
    {
      question: "How long does foundation repair take?",
      answer:
        "Crack injection: a half-day. Pier installation: 1–3 days for an average home. Full waterproofing: 2–4 days. Most jobs we’re done before the weekend, with no need for you to leave the house during work.",
    },
    {
      question: "Will the repair be visible after?",
      answer:
        "Interior repairs are usually invisible — patched and ready for paint. Exterior repairs may show some grading work for the first season until landscaping fills in. We restore the area as part of the job, not as an afterthought.",
    },
  ],
  finalCtaHeading: "The crack isn’t getting smaller.",
  finalCtaSubtitle:
    "Free inspection. Honest answer about what you’re looking at. Quote in writing the same day. No pressure.",
  finalCtaButton: "Schedule Free Inspection",
};

const PLUMBERS: NicheSiteContent = {
  heroTagline: "Burst pipe? On the way in 30 minutes.",
  heroSubtitle:
    "24/7 emergency response, transparent flat-rate pricing, and 100% satisfaction guarantee. Licensed and insured plumbers serving residential and commercial clients.",
  heroCta: "Call Now — On the Way",
  heroSecondaryCta: "View Services",
  trustStats: [
    { value: "30 min", label: "Average Response" },
    { value: "24/7", label: "Emergency Service" },
    { value: "Flat-rate", label: "No Surprise Pricing" },
    { value: "$0", label: "Diagnostic Fee" },
  ],
  customerPainsHeading: "Plumbing emergencies don’t wait.",
  customerPains: [
    "Water’s pouring out of a fitting and you don’t know where the shutoff is",
    "Toilet’s clogged for the third time this month — something’s wrong",
    "Hot water’s out and you’ve got a houseful of family in town",
    "There’s a wet spot on the ceiling that wasn’t there yesterday",
    "Your last plumber left a $1,200 bill with no breakdown",
  ],
  servicesHeading: "What we fix.",
  services: [
    {
      title: "Emergency Repairs",
      description:
        "Burst pipes, water heater failures, sewer backups, gas leaks. We’re on call 24/7/365 with stocked trucks ready to roll.",
    },
    {
      title: "Drain Cleaning & Sewer",
      description:
        "Clogged drains, root intrusion, sewer line video inspection, hydro-jetting, and trenchless sewer repair. We fix the cause, not just the symptom.",
    },
    {
      title: "Water Heater Service",
      description:
        "Tank, tankless, and hybrid water heater repair, replacement, and installation. Same-day service on most brands. Energy-efficient upgrades available.",
    },
    {
      title: "Leak Detection",
      description:
        "Hidden leaks under slabs, behind walls, under floors. We use thermal imaging and acoustic equipment to find leaks without tearing your home apart.",
    },
    {
      title: "Repipes & Remodels",
      description:
        "Whole-home repipes, kitchen and bath remodels, fixture upgrades. Quality materials, code-compliant installs, and clean-up after every visit.",
    },
    {
      title: "Commercial Plumbing",
      description:
        "Property managers, restaurants, retail. Routine maintenance contracts, emergency response, backflow testing, and grease trap service.",
    },
  ],
  whyUsHeading: "Why customers stick with us.",
  whyUs: [
    {
      title: "Up-Front Pricing",
      description:
        "Flat-rate quotes before any work starts. You approve the price, we do the work. No hourly meter running, no surprise add-ons.",
    },
    {
      title: "Licensed & Insured",
      description:
        "Master plumbers on every job. Fully licensed, bonded, and insured. We pull permits when required and stand behind every repair.",
    },
    {
      title: "Clean Trucks, Clean Worksites",
      description:
        "Drop cloths, shoe covers, and clean-up before we leave. Your home should look better when we’re done than when we got there.",
    },
    {
      title: "Lifetime Warranty on Workmanship",
      description:
        "If something we installed fails because of how we installed it, we fix it free. Forever.",
    },
  ],
  faqs: [
    {
      question: "How fast can you actually be here for an emergency?",
      answer:
        "Average dispatch time is 30 minutes within our service area, 24/7. We’ll give you an honest ETA when you call — no ‘between noon and 5pm’ window.",
    },
    {
      question: "Do you charge a service or diagnostic fee?",
      answer:
        "No. We come out, diagnose the problem, and give you a flat-rate quote — all free. You pay only if you authorize the repair.",
    },
    {
      question: "Will you give me a price before you start?",
      answer:
        "Always. Flat-rate quotes in writing before any wrench turns. The price you approve is the price you pay — no surprise add-ons.",
    },
    {
      question: "Do you handle insurance claims?",
      answer:
        "Yes. We document the damage with photos and provide itemized invoices that work directly with your homeowners insurance for water-damage claims.",
    },
  ],
  finalCtaHeading: "Don’t let a small leak become a big disaster.",
  finalCtaSubtitle:
    "Call now. We’ll have a licensed plumber on the way within the hour, with up-front pricing and same-day repairs.",
  finalCtaButton: "Call Now",
};

const HVAC: NicheSiteContent = {
  heroTagline: "AC out at 3am? We work 24/7 so you don’t bake.",
  heroSubtitle:
    "Same-day service for cooling, heating, and indoor air. Licensed HVAC technicians serving residential and light commercial. Manufacturer-certified for major brands.",
  heroCta: "Schedule Same-Day Service",
  heroSecondaryCta: "Maintenance Plans",
  trustStats: [
    { value: "Same-day", label: "Service Available" },
    { value: "24/7", label: "Emergency Response" },
    { value: "100%", label: "Satisfaction Guarantee" },
    { value: "0% APR", label: "Financing Available" },
  ],
  customerPainsHeading: "When your HVAC goes down, everything stops.",
  customerPains: [
    "AC quit on the hottest day of the year and the kids are miserable",
    "Heat pump is making a grinding noise and you don’t want to lose it",
    "Energy bill went up $80 last month with no obvious explanation",
    "Allergies are worse indoors than outside — air filter isn’t cutting it",
    "Last service company left without explaining what they actually did",
  ],
  servicesHeading: "What we service.",
  services: [
    {
      title: "AC Repair & Installation",
      description:
        "Diagnostic, repair, and replacement for central air, mini-splits, and heat pumps. We fix what’s broken before pushing for replacement.",
    },
    {
      title: "Heating Service",
      description:
        "Furnaces, heat pumps, boilers — gas, electric, and dual-fuel. Annual tune-ups, emergency repair, full-system replacement with rebate-friendly options.",
    },
    {
      title: "Indoor Air Quality",
      description:
        "Whole-home filtration, UV-C lights, humidity control, and duct cleaning. Real solutions for allergies and asthma — not just better filters.",
    },
    {
      title: "Maintenance Plans",
      description:
        "Two visits per year (spring + fall), priority emergency response, 15% off repairs, and no overtime fees. Pays for itself the first time you need us.",
    },
    {
      title: "Ductwork & Sealing",
      description:
        "Diagnostics for leaky ducts (typical homes lose 20–30% of conditioned air), sealing, and zoning systems for multi-story homes.",
    },
    {
      title: "Commercial HVAC",
      description:
        "Light commercial — offices, restaurants, retail. Preventive maintenance contracts, emergency dispatch, and Energy Star rebates handled for you.",
    },
  ],
  whyUsHeading: "Why we win on service.",
  whyUs: [
    {
      title: "Repair Before Replace",
      description:
        "We fix what’s fixable before recommending a new system. If replacement is the right call, you’ll get the data behind that recommendation.",
    },
    {
      title: "Manufacturer-Certified Techs",
      description:
        "Every technician is factory-certified on the brands we service — Carrier, Trane, Lennox, Mitsubishi, and more. No guesswork on warranty work.",
    },
    {
      title: "Up-Front Pricing",
      description:
        "Flat-rate diagnostics and written quotes before any work begins. No hourly billing surprises.",
    },
    {
      title: "Comfort Guarantee",
      description:
        "If our installed system doesn’t meet the cooling/heating spec, we make it right — including swapping equipment at no charge to you.",
    },
  ],
  faqs: [
    {
      question: "Should I repair or replace my old AC?",
      answer:
        "Rule of thumb: if your unit is over 12 years old AND the repair is more than 30% of replacement cost, replace. Under 8 years old, almost always repair. We give you the math, not a sales pitch.",
    },
    {
      question: "How often should I get HVAC tune-ups?",
      answer:
        "Twice a year — spring (AC) and fall (heat). It catches small problems before they cause failures, keeps efficiency up, and is required for most manufacturer warranties to stay valid.",
    },
    {
      question: "Are there rebates for new high-efficiency systems?",
      answer:
        "Yes — federal tax credits up to $2,000 for qualifying heat pumps, plus state and utility rebates that can total $3,000–$8,000. We handle the paperwork for you.",
    },
    {
      question: "Do you service my brand?",
      answer:
        "Almost certainly. We service all major brands — Carrier, Trane, Lennox, Goodman, Rheem, Mitsubishi, Daikin, and more. Many of our techs are factory-certified on multiple brands.",
    },
  ],
  finalCtaHeading: "Your comfort shouldn’t depend on luck.",
  finalCtaSubtitle:
    "Same-day service, transparent pricing, and 24/7 emergency response. Schedule online or call us now.",
  finalCtaButton: "Schedule Service",
};

const ROOFERS: NicheSiteContent = {
  heroTagline: "Lost a few shingles in last night’s storm? Free inspection.",
  heroSubtitle:
    "Residential and commercial roofing, repair to full replacement. Storm damage specialists with insurance-claim assistance. Lifetime workmanship warranty.",
  heroCta: "Free Roof Inspection",
  heroSecondaryCta: "View Our Work",
  trustStats: [
    { value: "Free", label: "Roof Inspection" },
    { value: "Insurance", label: "Claims Specialist" },
    { value: "Lifetime", label: "Workmanship Warranty" },
    { value: "GAF + OC", label: "Master Certified" },
  ],
  customerPainsHeading: "After a storm, every minute matters.",
  customerPains: [
    "You see shingles in the yard and don’t know if there’s damage worth claiming",
    "There’s a water spot on the bedroom ceiling and you don’t know how long it’s been there",
    "Insurance adjuster wants paperwork you don’t have",
    "Roof is 17 years old and you don’t know if it’ll make another season",
    "Three quotes came in within $4,000 of each other — how do you pick?",
  ],
  servicesHeading: "What we do.",
  services: [
    {
      title: "Storm Damage & Insurance Claims",
      description:
        "Free post-storm inspection with detailed photos, insurance estimate worksheet, and direct communication with your adjuster. Most claims approved on the first try.",
    },
    {
      title: "Roof Replacement",
      description:
        "Full tear-off and replacement using GAF, Owens Corning, CertainTeed, or your preferred brand. Lifetime material + workmanship warranty included.",
    },
    {
      title: "Roof Repair",
      description:
        "Targeted repair for leaks, missing shingles, damaged flashing, and chimney work. Most repairs completed same-day with photo documentation.",
    },
    {
      title: "Commercial Roofing",
      description:
        "Flat roofs, TPO, EPDM, and metal. Preventive maintenance contracts, emergency repair, and full replacement with manufacturer-backed warranties.",
    },
    {
      title: "Gutters & Soffit",
      description:
        "Seamless gutter installation, leaf-guard systems, soffit and fascia replacement. Often bundled with roof work for full exterior protection.",
    },
    {
      title: "Skylights & Vents",
      description:
        "Skylight install and replacement, ridge venting, attic ventilation. Done right the first time, watertight every time.",
    },
  ],
  whyUsHeading: "Why homeowners pick us after a storm.",
  whyUs: [
    {
      title: "Insurance Specialists",
      description:
        "We’ve worked thousands of insurance claims. We know what adjusters look for, document the damage their software requires, and meet them on-site if needed.",
    },
    {
      title: "Master Certified Installers",
      description:
        "GAF Master Elite and Owens Corning Platinum certifications mean access to the strongest material warranties. Fewer than 2% of roofers in the country qualify.",
    },
    {
      title: "Lifetime Workmanship Warranty",
      description:
        "If a leak or failure happens because of how we installed it — even 20 years later — we fix it free. Transferable to the next owner.",
    },
    {
      title: "No High-Pressure Sales",
      description:
        "Free inspection, written report, multiple options, no pressure. If repair makes more sense than replacement, that’s what we’ll recommend.",
    },
  ],
  faqs: [
    {
      question: "Will my insurance cover the new roof?",
      answer:
        "If the damage is from a covered event (wind, hail, falling tree), most policies cover repair or replacement minus your deductible. We document the damage to insurance specs and work directly with your adjuster.",
    },
    {
      question: "How long does a roof replacement take?",
      answer:
        "Average single-family home: 1–2 days, weather permitting. Larger or steeper homes: 2–3 days. We tarp every night and clean up daily, so your home is never left exposed.",
    },
    {
      question: "What’s the difference between architectural and 3-tab shingles?",
      answer:
        "3-tab is the older, thinner, less expensive option (about 20-year lifespan). Architectural (or dimensional) shingles are thicker, look more textured, last 30+ years, and handle wind better. Most insurance replacements upgrade to architectural at no extra cost to you.",
    },
    {
      question: "Do you handle the cleanup?",
      answer:
        "Yes. We use magnetic rollers to pick up nails from the lawn and driveway, haul away all debris, and leave your property cleaner than we found it. Final walk-through is part of the job.",
    },
  ],
  finalCtaHeading: "Don’t wait for a small leak to become a ceiling collapse.",
  finalCtaSubtitle:
    "Free post-storm inspection, insurance-claim help, and lifetime workmanship warranty. We come out, we tell you the truth, you decide.",
  finalCtaButton: "Schedule Free Inspection",
};

// ─────────────────────────────────────────────────────────────────────
// Other niches — placeholder content that's still customer-facing.
// Will be expanded in a follow-up session per niche.
// ─────────────────────────────────────────────────────────────────────

function placeholder(nicheName: string, customerNoun: string): NicheSiteContent {
  return {
    heroTagline: `Trusted ${nicheName.toLowerCase()} serving your community.`,
    heroSubtitle: `Quality work, transparent pricing, and the kind of service that turns first-time ${customerNoun} into long-term ones.`,
    heroCta: "Get Started",
    heroSecondaryCta: "See Our Work",
    trustStats: [
      { value: "20+ yrs", label: "Local Experience" },
      { value: "100%", label: "Satisfaction Guarantee" },
      { value: "Free", label: "Consultation" },
      { value: "5★", label: "Highly Rated" },
    ],
    customerPainsHeading: "Sound familiar?",
    customerPains: [
      "You’ve been burned by a flaky service provider before",
      "You don’t know what a fair price actually looks like",
      "You want someone who shows up on time and finishes what they start",
      "You’re tired of vague estimates and surprise add-ons",
    ],
    servicesHeading: "What we offer.",
    services: [
      { title: "Service One", description: "Comprehensive service tailored to your specific needs." },
      { title: "Service Two", description: "Expert delivery with attention to every detail." },
      { title: "Service Three", description: "Solutions that solve the actual problem, not just the symptom." },
    ],
    whyUsHeading: `Why ${customerNoun} pick us.`,
    whyUs: [
      { title: "Up-Front Pricing", description: "Quotes in writing before any work starts." },
      { title: "Local & Trusted", description: "We live and work in your community." },
      { title: "Quality Guarantee", description: "If you’re not happy, we make it right." },
    ],
    faqs: [
      {
        question: "How long have you been in business?",
        answer: "We’ve been serving the local community for over 20 years and have built our reputation one customer at a time.",
      },
      {
        question: "Are you licensed and insured?",
        answer: "Yes — fully licensed, bonded, and insured. We’ll provide proof of insurance on request.",
      },
      {
        question: "Do you offer free estimates?",
        answer: "Absolutely — every initial consultation is free, with no obligation to book.",
      },
    ],
    finalCtaHeading: "Ready to get started?",
    finalCtaSubtitle: "Reach out today for a free, no-obligation consultation. We’ll come out, take a look, and give you honest answers.",
    finalCtaButton: "Contact Us",
  };
}

// ─────────────────────────────────────────────────────────────────────
// Main lookup
// ─────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────
// Premium Outdoor Living group
// ─────────────────────────────────────────────────────────────────────

const POOL_BUILDERS: NicheSiteContent = {
  heroTagline: "Backyards that take your breath away — every time you walk outside.",
  heroSubtitle:
    "Custom-designed inground pools, spas, and outdoor living spaces. From concept to completion, every detail considered. Florida-licensed, fully insured, lifetime structural warranty.",
  heroCta: "Book Free Design Consult",
  heroSecondaryCta: "View Our Portfolio",
  trustStats: [
    { value: "Lifetime", label: "Structural Warranty" },
    { value: "30+ yrs", label: "Building Experience" },
    { value: "Free", label: "Design Consult" },
    { value: "5★", label: "Customer Rating" },
  ],
  customerPainsHeading: "We hear this every week.",
  customerPains: [
    "You’ve been quoted three different prices for the same pool — none of them itemized",
    "The contractor you talked to disappeared after taking a deposit",
    "You want a custom design, not a pool that looks like every other one in the neighborhood",
    "You’re worried about a 6-month build dragging into 14 months",
    "Permits, easements, HOA approvals — nobody’s explained what’s actually involved",
  ],
  servicesHeading: "What we build.",
  services: [
    {
      title: "Custom Inground Pool Design",
      description:
        "Geometric, freeform, infinity-edge, vanishing-edge, or perimeter-overflow. 3D renderings before any concrete pours. We design around your home, your lot, your lifestyle.",
    },
    {
      title: "Pool Renovation & Resurfacing",
      description:
        "Re-plaster, re-tile, deck resurfacing, and equipment upgrades for older pools. Bring a 25-year-old pool back to brand-new appearance and modern efficiency.",
    },
    {
      title: "Spas & Water Features",
      description:
        "Integrated spas, sheer-descent waterfalls, scupper bowls, deck jets, fire bowls, and grottos. Custom water features designed in concert with the pool.",
    },
    {
      title: "Outdoor Kitchens & Lanais",
      description:
        "Built-in grills, pizza ovens, beverage centers, and full-cover lanais. Seamless integration with the pool deck so your backyard works as one entertaining space.",
    },
    {
      title: "Smart Pool Equipment",
      description:
        "Variable-speed pumps, salt chlorination, LED lighting, app-controlled automation. Energy-efficient systems that save 60–80% on operating costs vs. older equipment.",
    },
    {
      title: "Maintenance & Service",
      description:
        "Weekly maintenance plans, equipment service, and chemistry monitoring after your pool is built. Our build customers get priority service for life.",
    },
  ],
  whyUsHeading: "Why homeowners pick us.",
  whyUs: [
    {
      title: "3D Design Before Concrete",
      description:
        "You see exactly what your pool will look like — photo-realistic renderings from multiple angles — before we break ground. No surprises, no ‘wait, that’s not what I imagined.’",
    },
    {
      title: "Fixed-Price Bids, Itemized",
      description:
        "Every line item — concrete, steel, tile, equipment, electrical, decking — priced separately and in writing. The price you sign is the price you pay.",
    },
    {
      title: "Lifetime Structural Warranty",
      description:
        "If the shell ever fails, we fix it. Lifetime, transferable. Most builders give you 1 year. We stand behind our work as long as the pool exists.",
    },
    {
      title: "On-Schedule Builds",
      description:
        "Average build time: 10–14 weeks for inground custom pools. We give you a written schedule before construction starts and update you weekly through completion.",
    },
  ],
  faqs: [
    {
      question: "How much does a custom pool actually cost?",
      answer:
        "Florida custom pools typically run $65K–$180K depending on size, materials, and features. A 14×28 with basic equipment, paver deck, and standard tile starts around $75K. Add spa, water features, premium tile, or larger size and you climb from there. Free design consult includes a written estimate.",
    },
    {
      question: "How long does the build take?",
      answer:
        "Permitting takes 4–6 weeks (Florida HOA + county). Once permits are issued, the build itself takes 10–14 weeks for a typical custom pool. Total project: 4–5 months from design to swim.",
    },
    {
      question: "Do you handle permits and HOA approval?",
      answer:
        "Yes — we handle every permit, every HOA submission, every neighbor-notice. You sign one contract, we manage the bureaucracy.",
    },
    {
      question: "What about saltwater vs. chlorine?",
      answer:
        "We install both. Saltwater is gentler on skin and lower-maintenance day-to-day; chlorine is cheaper upfront. We’ll walk you through the trade-offs at consult and recommend based on your usage and budget.",
    },
  ],
  finalCtaHeading: "The backyard you’ve been picturing — built right.",
  finalCtaSubtitle:
    "Free design consult, 3D rendering, and itemized written quote. No high-pressure sales, no fake discounts, no ‘this price is only good today.’",
  finalCtaButton: "Schedule Design Consult",
};

const SOLAR_INSTALLERS: NicheSiteContent = {
  heroTagline: "Lock in your kWh rate before the next utility hike.",
  heroSubtitle:
    "Residential solar installation, battery storage, and energy-monitoring systems. Florida-licensed, NABCEP-certified installers. Federal tax credit + utility rebate paperwork handled for you.",
  heroCta: "Get Solar Estimate",
  heroSecondaryCta: "See Savings Calculator",
  trustStats: [
    { value: "30%", label: "Federal Tax Credit" },
    { value: "25 yr", label: "Production Warranty" },
    { value: "0% APR", label: "Financing Available" },
    { value: "NABCEP", label: "Certified Installers" },
  ],
  customerPainsHeading: "Your power bill keeps climbing.",
  customerPains: [
    "Your utility just raised rates again — third time in two years",
    "Solar quotes you’ve gotten don’t agree on panel count, wattage, or savings",
    "You don’t know if your roof is even right for solar — orientation, shade, age",
    "Battery storage adds thousands — is it actually worth it for hurricane season?",
    "Federal tax credit paperwork looks confusing and you don’t want to mess up the filing",
  ],
  servicesHeading: "What we install.",
  services: [
    {
      title: "Residential Solar Systems",
      description:
        "Tier-1 monocrystalline panels (REC, Q CELLS, Silfab) with Enphase or SolarEdge inverters. Sized to offset 90–110% of your annual usage based on actual utility bills.",
    },
    {
      title: "Battery Storage & Backup",
      description:
        "Tesla Powerwall, Enphase IQ Battery, and FranklinWH systems. Hurricane-grade backup that keeps essentials running during outages — no generator needed.",
    },
    {
      title: "Roof Assessment & Prep",
      description:
        "Free pre-install roof inspection. If your roof needs work first, we coordinate with your roofer or recommend trusted partners — no solar on a tired roof.",
    },
    {
      title: "Tax Credit & Incentive Filing",
      description:
        "Federal 30% Investment Tax Credit, FL property tax exemption, utility rebates — we prepare and submit every form on your behalf, with a CPA-reviewed package.",
    },
    {
      title: "Smart Monitoring & App",
      description:
        "Real-time production monitoring on your phone. See what your panels generated today, this month, this year. Alerts if any panel underperforms or fails.",
    },
    {
      title: "Service & Performance Warranty",
      description:
        "25-year production warranty on panels, 10-year inverter, 12.5-year battery. We handle all warranty claims with the manufacturer — you never call them.",
    },
  ],
  whyUsHeading: "Why Florida homeowners pick us.",
  whyUs: [
    {
      title: "Honest Sizing",
      description:
        "We size your system to your actual usage, not the biggest array we can fit. Smaller systems pay back faster — we’ll tell you when not to oversize.",
    },
    {
      title: "Real Production Numbers",
      description:
        "Our quotes use historical irradiance data from your specific zip code, not generic estimates. The kWh number on your proposal is what your panels actually produce.",
    },
    {
      title: "Permit & Interconnection Handled",
      description:
        "AHJ permits, utility interconnection applications, post-install inspections — we handle every form, every appointment, every back-and-forth.",
    },
    {
      title: "Local, Not National",
      description:
        "Local crews, local service. We’ll be here when your warranty matters in 15 years — most national installers won’t.",
    },
  ],
  faqs: [
    {
      question: "How much does solar actually cost?",
      answer:
        "Average Florida residential system (8–12kW) runs $22K–$36K before incentives. After 30% federal credit, net cost is roughly $15K–$25K. Most homeowners see payback in 7–9 years and free electricity for the next 16+ years.",
    },
    {
      question: "What about hurricanes?",
      answer:
        "Modern panels are rated to 140 mph wind loads. Mounting hardware is rated higher. We’ve installed thousands of systems through multiple Florida hurricane seasons with minimal damage. Insurance covers what little does happen.",
    },
    {
      question: "Will I still pay my utility company if I have solar?",
      answer:
        "Yes — a small connection charge (~$8/month). You’ll generate excess during the day that flows to the grid for credit (1:1 net metering for now), then draw at night. Most customers cut their bill by 80–95%.",
    },
    {
      question: "Should I add a battery?",
      answer:
        "Depends on outage frequency in your area and what you want backed up. Hurricane-prone zones: yes, 80% of customers add storage. Lower outage zones: optional. We model both scenarios in your proposal so you can decide based on numbers.",
    },
  ],
  finalCtaHeading: "Lock in your rate before the next hike.",
  finalCtaSubtitle:
    "Free roof assessment, custom production estimate, and tax-credit-included quote in writing. No high-pressure pitch.",
  finalCtaButton: "Get My Solar Estimate",
};

// ─────────────────────────────────────────────────────────────────────
// Visual / Pinterest group
// ─────────────────────────────────────────────────────────────────────

const DECORATIVE_CONCRETE: NicheSiteContent = {
  heroTagline: "Stamped, stained, and worth showing off.",
  heroSubtitle:
    "Decorative concrete that turns ordinary patios, driveways, and pool decks into something you actually want to photograph. Stamped patterns, acid stains, micro-toppings, and exposed aggregate.",
  heroCta: "Book Free Design Consult",
  heroSecondaryCta: "See Our Patterns",
  trustStats: [
    { value: "200+", label: "Patterns Available" },
    { value: "15 yr", label: "Color Warranty" },
    { value: "Free", label: "On-Site Estimate" },
    { value: "5★", label: "Houzz Rating" },
  ],
  customerPainsHeading: "Decorative concrete done badly stays bad.",
  customerPains: [
    "You’ve seen stamped concrete that started peeling within two seasons",
    "Color samples online never match what gets poured at your house",
    "You want something custom, not the same three patterns every contractor offers",
    "Pool decks need to be cool to the touch — not every product handles Florida heat",
    "Concrete cracks. You don’t know which contractor will cover them vs. blame you",
  ],
  servicesHeading: "What we pour & finish.",
  services: [
    {
      title: "Stamped Concrete",
      description:
        "Slate, ashlar, cobblestone, brick, wood-plank, and custom pattern stamps. Color-hardened with antiquing release for depth that solid colors can’t match.",
    },
    {
      title: "Acid-Stained Concrete",
      description:
        "Reactive acid stains for interior and exterior floors. Mottled, organic color that reacts uniquely with your concrete — no two installs look alike.",
    },
    {
      title: "Exposed Aggregate",
      description:
        "Decorative stone aggregate exposed for natural texture and traction. Common on driveways, walkways, and pool decks where slip resistance matters.",
    },
    {
      title: "Micro-Toppings & Overlays",
      description:
        "Polymer-modified overlays applied over existing concrete to refresh tired surfaces. 3–8mm thick, no demo, finished in custom colors and patterns.",
    },
    {
      title: "Cool-Deck Pool Surfaces",
      description:
        "Florida-specific cool-deck and Kool-Deck installations that stay 15–30°F cooler than standard concrete in direct sun. Bare-foot friendly all summer.",
    },
    {
      title: "Sealing & Maintenance",
      description:
        "Annual re-seal services, color refresh, and crack repair on existing decorative concrete. Keep what you bought looking like it did the day we finished.",
    },
  ],
  whyUsHeading: "Why we don’t look like a generic concrete crew.",
  whyUs: [
    {
      title: "Custom Patterns On-Site",
      description:
        "We bring 40+ stamp pattern boards to every consult. You touch them, see them in your daylight, choose what fits your home — not a tiny photo on a website.",
    },
    {
      title: "Color Tests Before the Pour",
      description:
        "We pour 12×12 sample tiles in your chosen color combo and let them cure on your property for 5 days. You approve the actual final color before the truck arrives.",
    },
    {
      title: "Crack-Control Engineering",
      description:
        "Concrete cracks. Our job is to control where. We score, joint, and reinforce per engineered plans so cracks happen at expansion lines — invisible, by design.",
    },
    {
      title: "15-Year Color Warranty",
      description:
        "If the color fades or the seal fails outside normal wear, we re-finish for free. Most decorative concrete contractors warranty 1 year. We do 15.",
    },
  ],
  faqs: [
    {
      question: "How much does stamped concrete cost vs. pavers or natural stone?",
      answer:
        "Stamped concrete typically runs $12–$22/sqft installed. Pavers run $18–$30/sqft. Natural stone $25–$50/sqft. Stamped concrete gives you the look of stone at a fraction of the cost, and one-piece concrete avoids the weed/settling issues pavers can have.",
    },
    {
      question: "Will the color fade over time?",
      answer:
        "Modern color-hardener and integral color products keep their color for 15–20 years with proper sealing. Lighter colors fade faster than darker ones. We re-seal every 2–4 years to extend life — and our 15-year warranty backs that.",
    },
    {
      question: "Can you stamp over my existing concrete?",
      answer:
        "Yes — micro-topping or overlay over existing concrete. The existing slab needs to be structurally sound (no major cracking or settling). We do a free assessment to determine if overlay or full removal-and-repour is the right call.",
    },
    {
      question: "How long until I can walk/drive on it?",
      answer:
        "Walk on it: 24 hours. Furniture: 3–5 days. Vehicle traffic: 7 days minimum. Full cure (final hardness): 28 days. We schedule your install around your usage so disruption is minimal.",
    },
  ],
  finalCtaHeading: "Stop pinning. Start pouring.",
  finalCtaSubtitle:
    "Free on-site consult, 40+ stamp samples to touch, custom color tiles cured in your daylight. The decorative concrete you actually want — built right.",
  finalCtaButton: "Schedule Design Consult",
};

const HAIR_SALONS: NicheSiteContent = {
  heroTagline: "The chair where your hair finally gets understood.",
  heroSubtitle:
    "Boutique full-service hair salon specializing in custom color, dimensional balayage, hand-tied extensions, and precision cutting. The colorists clients drive across town for. By appointment only.",
  heroCta: "Book Your Appointment",
  heroSecondaryCta: "Meet Our Stylists",
  trustStats: [
    { value: "8 yrs", label: "In Business" },
    { value: "300+", label: "Five-Star Reviews" },
    { value: "Custom", label: "Color Formulation" },
    { value: "L’Oréal", label: "Master Color Partner" },
  ],
  customerPainsHeading: "Bad hair experiences are why you’re here.",
  customerPains: [
    "Your last balayage came out brassy two weeks later",
    "You’ve described what you want with photos and walked out with something else",
    "Your stylist rushes — 45 minutes for a service that should take 2 hours",
    "Extensions you tried somewhere else damaged your natural hair",
    "Salon prices feel arbitrary — you never know what the bill will be until checkout",
  ],
  servicesHeading: "What you can book.",
  services: [
    {
      title: "Custom Color & Highlights",
      description:
        "Full-color, partial highlights, color correction, gloss treatments, and toners. Custom-formulated for your hair’s history, lifestyle, and goals — not a chart on a wall.",
    },
    {
      title: "Dimensional Balayage",
      description:
        "Hand-painted highlights with foiled root smudges for that grown-out, sun-kissed look that lasts 3–4 months between visits. Our most-booked service.",
    },
    {
      title: "Hand-Tied Hair Extensions",
      description:
        "Beaded weft, tape-in, and hand-tied extensions in 100% Remy human hair. Color-matched to your existing tone. 6–8 week maintenance cycle. Removable, reusable.",
    },
    {
      title: "Take-Home Products & Pro Care",
      description:
        "Salon-grade shampoo, conditioner, masks, leave-ins, and styling products curated for your hair type. Olaplex, K18, Oribe, Davines — formulated to extend your color and protect your investment between visits.",
    },
    {
      title: "Smoothing & Keratin Treatments",
      description:
        "Brazilian Blowout, Cezanne, and Keratin Express treatments. Frizz reduction, shine boost, and humidity-resistance for Florida weather. Lasts 3–6 months.",
    },
    {
      title: "Bridal & Special Event Styling",
      description:
        "Trial appointments, day-of bridal services, bridal party group bookings. Updos, half-ups, glam waves. Travel to your venue available with advance booking.",
    },
  ],
  whyUsHeading: "Why our chairs are booked out 6 weeks.",
  whyUs: [
    {
      title: "30-Min Consult Before Color",
      description:
        "Every new color client gets a paid consult before a single drop of dye. We discuss tone, maintenance, lifestyle, photo references, and history — then formulate a plan in writing.",
    },
    {
      title: "All-Inclusive Pricing",
      description:
        "Quoted price includes the service, the gloss, the tone, the blowout, the styling. No nickel-and-dime add-ons at checkout. The price you book is the price you pay.",
    },
    {
      title: "Master-Level Stylists Only",
      description:
        "Every stylist on our team has 8+ years of experience and master colorist certification. We don’t hire fresh-out-of-school. You get experience, every visit.",
    },
    {
      title: "Hair-Health First",
      description:
        "We’ll tell you when you shouldn’t color. We’ll tell you when extensions aren’t right. We’d rather lose the appointment than damage your hair.",
    },
  ],
  faqs: [
    {
      question: "How much do services cost?",
      answer:
        "Cuts $75–$150. Single-process color $120–$180. Partial highlights $180–$240. Full balayage $280–$420. Extensions $1,200–$2,400 install + maintenance. We quote everything in writing before booking — no surprises.",
    },
    {
      question: "How far out are you booked?",
      answer:
        "New-client appointments are typically 4–6 weeks out for color services, 2–3 weeks for cuts. Existing clients can book 1–2 weeks out. Cancellation list can sometimes get you in sooner.",
    },
    {
      question: "Do you work with damaged or over-processed hair?",
      answer:
        "Yes — that’s a lot of our color-correction work. We’ll assess your hair’s integrity at consult and create a multi-visit plan if needed. Sometimes one big appointment, sometimes 3 sessions over 6 weeks. We’ll always tell you what’s realistic.",
    },
    {
      question: "What about extensions damaging my hair?",
      answer:
        "Hand-tied and beaded weft extensions installed correctly cause zero damage to your natural hair — they’re sewn to a beaded foundation, not glued or fused. Our installers have 5+ years on extensions specifically.",
    },
  ],
  finalCtaHeading: "Hair you’ll actually love walking out with.",
  finalCtaSubtitle:
    "Book a 30-minute color consult or a precision cut. New clients welcomed by referral or online booking. Your first visit gets the same attention as your tenth.",
  finalCtaButton: "Book Now",
};

const MEDICAL_SPAS: NicheSiteContent = {
  heroTagline: "Medical-grade. Spa-soft. Results that actually show up.",
  heroSubtitle:
    "Aesthetic medicine practice offering injectables, lasers, body contouring, and skincare. Board-certified medical director on-site. Honest assessments, conservative dosing, natural-looking results.",
  heroCta: "Book Free Consult",
  heroSecondaryCta: "See Treatments",
  trustStats: [
    { value: "MD", label: "Medical Director On-Site" },
    { value: "Allergan", label: "Diamond Provider" },
    { value: "20K+", label: "Treatments Performed" },
    { value: "Free", label: "Initial Consult" },
  ],
  customerPainsHeading: "You don’t want to look done.",
  customerPains: [
    "You’ve seen friends come back from injectables looking frozen or filtered",
    "You don’t know whether you actually need Botox, filler, laser, or just a good skincare routine",
    "You’re tired of skincare promises that don’t deliver — and prices that climb every visit",
    "You want a provider who’ll tell you when LESS is the right answer",
    "You’re intimidated by med-spa pricing menus that read like a menu in a foreign language",
  ],
  servicesHeading: "What we offer.",
  services: [
    {
      title: "Botox & Dysport",
      description:
        "Wrinkle relaxers for forehead lines, crow’s feet, glabella, and lip flips. Conservative dosing — we err on the side of natural movement and add more at 2-week follow-up if needed.",
    },
    {
      title: "Dermal Fillers",
      description:
        "Juvederm, Restylane, RHA, and Sculptra. Lip enhancement, cheek volume, jawline contouring, tear-trough correction, hand rejuvenation. We dose in halves and check in between.",
    },
    {
      title: "Laser Treatments",
      description:
        "IPL photo facial, BBL, Halo hybrid resurfacing, laser hair removal, and pigment correction. Reduce sun damage, redness, fine lines, and unwanted hair. Series-based for lasting results.",
    },
    {
      title: "Microneedling & RF",
      description:
        "Morpheus8 and SkinPen microneedling, with optional radiofrequency for skin tightening. Texture, scars, fine lines, and laxity addressed in 3–4 session series.",
    },
    {
      title: "Body Contouring",
      description:
        "EmSculpt NEO for muscle and fat in the same treatment. CoolSculpting Elite for stubborn fat pockets. Treatment plans built from in-office body composition assessment.",
    },
    {
      title: "Medical-Grade Skincare",
      description:
        "ZO Skin Health, SkinMedica, SkinBetter Science, and Alastin. Custom regimens built from skin analysis — not a single bottle that costs $200 and does nothing.",
    },
  ],
  whyUsHeading: "Why our patients refer their best friends.",
  whyUs: [
    {
      title: "Free 45-Minute Consult",
      description:
        "Every new patient gets a 45-min consult with a licensed provider. Skin analysis, treatment options, realistic expectations, written quote. Zero pressure to book that day.",
    },
    {
      title: "Board-Certified MD On-Site",
      description:
        "Our medical director is on-site for all injectable and laser services. Not a part-time-supervising MD. You meet the doctor whose license is on the wall.",
    },
    {
      title: "Conservative Dosing",
      description:
        "We’d rather under-treat and add more in 2 weeks than over-treat and have you regret it. Most providers chase units. We chase results.",
    },
    {
      title: "Honest Treatment Recommendations",
      description:
        "If you don’t need filler, we’ll tell you. If skincare alone will get you to your goal, we’ll prescribe that. We’re building 20-year patients, not 1-visit transactions.",
    },
  ],
  faqs: [
    {
      question: "What does Botox cost?",
      answer:
        "$13–$15 per unit for Botox; $4 per unit for Dysport. Average forehead + glabella + crow’s feet treatment is 30–50 units, or roughly $390–$650. We always quote total dollars, not just per-unit, so you know what to expect.",
    },
    {
      question: "Will I look natural or done?",
      answer:
        "Natural is our default — and we have hundreds of before/after photos to show you. We undercorrect on first visit and add at follow-up. If you specifically want a more dramatic look, we’ll discuss whether that’s achievable safely.",
    },
    {
      question: "Are there risks with injectables?",
      answer:
        "Yes — bruising, swelling, asymmetry, vascular complications. Major complications are rare with experienced injectors using proper technique and FDA-approved products. Our medical director handles any concerns same-day.",
    },
    {
      question: "How long do results last?",
      answer:
        "Botox: 3–4 months. Filler: 6 months (lips) to 18 months (deeper structural). Laser: depends on treatment series; sun damage corrections last years. We schedule maintenance based on your specific treatments and metabolism.",
    },
  ],
  finalCtaHeading: "Honest assessment. Real results. No pressure.",
  finalCtaSubtitle:
    "Book a free 45-minute consult with our medical team. Skin analysis, treatment options, written quote — and we’ll tell you when you don’t need anything at all.",
  finalCtaButton: "Schedule Free Consult",
};

const MOBILE_PET_GROOMING: NicheSiteContent = {
  heroTagline: "We come to you. Your dog stays calm. Everyone wins.",
  heroSubtitle:
    "Fully-equipped mobile grooming van service that comes to your driveway. Your dog gets a calm one-on-one groom in a familiar environment — no kennel time, no drop-off, no stress.",
  heroCta: "Book Mobile Groom",
  heroSecondaryCta: "Service Areas",
  trustStats: [
    { value: "Door-to-door", label: "We Come to You" },
    { value: "1-on-1", label: "No Kennel Time" },
    { value: "Certified", label: "NDGAA Groomer" },
    { value: "5★", label: "Google Reviews" },
  ],
  customerPainsHeading: "Salon grooming is rough on dogs.",
  customerPains: [
    "Your dog hates the salon — barking, shaking, hiding under the couch when it’s grooming day",
    "Salon waits stretch from 2 hours to 5 because they overbook back-to-back",
    "Other people’s anxious dogs make YOUR dog more anxious",
    "Senior dogs can’t handle the stress of being away that long",
    "You can’t pick up at lunch — your dog ends up alone in a kennel for the workday",
  ],
  servicesHeading: "What’s included.",
  services: [
    {
      title: "Full Service Groom",
      description:
        "Bath with breed-appropriate shampoo, conditioning rinse, blow-out, full-body trim, ear cleaning, sanitary trim, nail clip + grind, and brush-out. The works — door-to-door.",
    },
    {
      title: "Bath & Brush",
      description:
        "For breeds that don’t need full haircuts (Labs, Goldens, Pit mixes). Deep clean, de-shedding treatment, nails, ears, and a brush-out that gets the undercoat actually clean.",
    },
    {
      title: "Breed-Specific Cuts",
      description:
        "Doodle puppy cuts, Schnauzer trims, Poodle clips, Yorkie summer cuts, Bichon poofs. We know what each breed’s coat needs and don’t cut everyone the same way.",
    },
    {
      title: "Nail Trim & Grind",
      description:
        "Stand-alone nail visit if your dog just needs a touch-up. We grind smooth so there’s no clicking on hardwood. Available between full grooms with no minimum.",
    },
    {
      title: "Senior & Anxious Dog Service",
      description:
        "Slower pace, calming pheromones, breaks built into the appointment, owner present if helpful. We specialize in dogs other groomers turn away — geriatric, post-surgery, anxiety-prone.",
    },
    {
      title: "De-shedding & Skin Care",
      description:
        "Furminator de-shedding treatments, medicated shampoos for skin conditions, oatmeal baths for sensitive skin. We carry vet-approved products in the van.",
    },
  ],
  whyUsHeading: "Why our customers never go back to salons.",
  whyUs: [
    {
      title: "One Dog at a Time",
      description:
        "Your dog is the only client we see during your slot. No barking, no waiting, no anxiety from other dogs. Calm, focused environment — the way grooming should be.",
    },
    {
      title: "Same Groomer, Every Visit",
      description:
        "Your dog gets to know us. We get to know your dog’s personality, preferences, sensitivities, and what they hate. Trust builds visit over visit.",
    },
    {
      title: "Hospital-Grade Sanitization",
      description:
        "Van interior sanitized between every appointment. Tools UV-sterilized. We’re NDGAA-certified and follow professional grooming hygiene standards.",
    },
    {
      title: "Senior & Special-Needs Friendly",
      description:
        "Doors that don’t require jumping, tubs at low-stress height, breaks built into long grooms. Senior dogs and dogs with mobility issues do better in our van than any salon.",
    },
  ],
  faqs: [
    {
      question: "How much does it cost vs. a salon?",
      answer:
        "Mobile grooming runs $80–$160 depending on size, coat condition, and services. Roughly $20–$40 more than a salon — and worth every penny if your dog hates being away from home. Standing appointments get a 10% discount.",
    },
    {
      question: "Do you have water and electricity in the van?",
      answer:
        "Yes — we’re fully self-contained. We bring our own water tank, water heater, and generator. No need to use your hose or outlet (though we’ll happily plug into a 110V outlet if you have one nearby).",
    },
    {
      question: "How long does it take?",
      answer:
        "Most full grooms take 60–90 minutes. Larger or matted coats: up to 2 hours. We schedule one dog per slot so we’re never rushing your appointment to get to the next one.",
    },
    {
      question: "What if my dog is aggressive or scared?",
      answer:
        "Talk to us at booking — we work with reactive and anxious dogs every day. Sometimes that means a couple short ‘meet and greet’ sessions before the first groom. Sometimes it means owner-present visits. We’ll figure out what works.",
    },
  ],
  finalCtaHeading: "A groom your dog actually doesn’t hate.",
  finalCtaSubtitle:
    "Book a one-time groom or set up a recurring 6-week schedule. We come to your driveway, do the work, and leave a happy, clean dog at your door.",
  finalCtaButton: "Book Mobile Groom",
};

// ─────────────────────────────────────────────────────────────────────
// B2B Commercial group
// ─────────────────────────────────────────────────────────────────────

const POLISHED_CONCRETE: NicheSiteContent = {
  heroTagline: "Polished concrete floors that perform under traffic — for decades.",
  heroSubtitle:
    "Industrial and commercial polished concrete for warehouses, showrooms, retail, and food service. Diamond-ground, densified, and finished to your gloss spec. Minimal downtime, full performance documentation.",
  heroCta: "Request Project Quote",
  heroSecondaryCta: "See Recent Projects",
  trustStats: [
    { value: "ASCC", label: "Certified Crews" },
    { value: "1M+ sq ft", label: "Polished to Date" },
    { value: "24–72 hr", label: "Typical Cure Window" },
    { value: "Bonded", label: "& Fully Insured" },
  ],
  customerPainsHeading: "Your facility floor is costing you money.",
  customerPains: [
    "Coating systems that peel within 18 months and have to be redone",
    "Forklift traffic gouging epoxy and exposing raw concrete",
    "Dust from un-densified slabs contaminating product or equipment",
    "Polishing contractors who can’t work around your operations schedule",
    "No documentation when your insurance carrier or auditor asks for spec sheets",
  ],
  servicesHeading: "What we deliver.",
  services: [
    {
      title: "Mechanical Diamond Polishing",
      description:
        "Multi-step diamond grinding from 30-grit through 3000-grit to your specified gloss level. CSDA-classified Level 1 through Level 4 finishes documented per the project spec.",
    },
    {
      title: "Densification & Hardening",
      description:
        "Lithium-silicate or sodium-silicate densifier penetrates the slab to chemically harden the surface. 30–40% increased abrasion resistance, dust-proofed for the life of the floor.",
    },
    {
      title: "Joint Filling & Crack Repair",
      description:
        "Semi-rigid polyurea joint fill rated for forklift traffic. Crack stitching and full-depth repairs before polishing so the finished floor stays flat under load.",
    },
    {
      title: "Stain & Dye Systems",
      description:
        "Acid stains, water-based dyes, and integral colors for showroom, retail, and brand-spec finishes. Sealed and topped with a wear-resistant guard coat.",
    },
    {
      title: "Restoration & Refresh",
      description:
        "Bring tired existing polished floors back to spec without full re-polishing. Re-densify, re-burnish, and re-seal in a single overnight visit.",
    },
    {
      title: "Maintenance Programs",
      description:
        "Quarterly burnishing and chemistry monitoring keep your floor at spec gloss. We document every visit so your QC binder stays current.",
    },
  ],
  whyUsHeading: "Why facility teams pick us.",
  whyUs: [
    {
      title: "Off-Hours & Weekend Crews",
      description:
        "We mobilize nights and weekends so your operations don’t stop. Most projects deliver with zero production downtime.",
    },
    {
      title: "Spec-Sheet Documentation",
      description:
        "Every job ships with mix designs, densifier rates, grit progression logs, and gloss readings. Your auditor gets answers in one PDF.",
    },
    {
      title: "Performance Warranty",
      description:
        "Three-year warranty on gloss retention and dust-proofing under documented maintenance. We stand behind the system, not just the labor.",
    },
    {
      title: "ASCC-Certified Operators",
      description:
        "Every operator on every job is ASCC Polished Concrete Craftsman certified. No subbing, no day-labor, no mystery crews.",
    },
  ],
  faqs: [
    {
      question: "How much does polished concrete cost per square foot?",
      answer:
        "Standard Level 2 polish on existing slabs runs $4–$7/sf. Level 3 with stains or dyes runs $7–$11/sf. Heavy joint repair, broadcast aggregates, or color exposure can push pricing higher. Free site walk + written quote.",
    },
    {
      question: "Can you work without shutting down our operations?",
      answer:
        "Yes. We work in zones, after-hours, or weekends. Equipment runs HEPA-filtered with vacuum shrouds — your team can keep operating in adjacent areas while we polish.",
    },
    {
      question: "Will polished concrete hold up to forklift traffic?",
      answer:
        "Yes — when densified properly. A polished slab densified with lithium silicate is harder than the original concrete and outperforms epoxy for forklift wear. Most coatings fail in 2–3 years; densified polish lasts 20+.",
    },
    {
      question: "Do you do new construction or only existing floors?",
      answer:
        "Both. For new construction we coordinate with your GC to spec the slab properly (mix design, finishing, curing) so the polish performs. For existing floors we evaluate condition and recommend the right level.",
    },
  ],
  finalCtaHeading: "Get a polished floor that lasts.",
  finalCtaSubtitle:
    "Send us your square footage and a few photos of the existing slab. We’ll come walk the site, measure conditions, and send a written quote with timeline and disruption plan.",
  finalCtaButton: "Request Site Walk",
};

// ─────────────────────────────────────────────────────────────────────
// Auto Body — Urgent Trade group
// ─────────────────────────────────────────────────────────────────────

const AUTO_BODY: NicheSiteContent = {
  heroTagline: "Collision repair that puts your car back to factory — not just back together.",
  heroSubtitle:
    "Certified collision repair, paint matching, and frame straightening for every make and model. We work directly with your insurance, give you a real timeline, and deliver a vehicle that drives like it never happened.",
  heroCta: "Get Free Estimate",
  heroSecondaryCta: "Start an Insurance Claim",
  trustStats: [
    { value: "I-CAR", label: "Gold Class Certified" },
    { value: "Lifetime", label: "Repair Warranty" },
    { value: "Direct", label: "Insurance Billing" },
    { value: "5★", label: "Driver Rating" },
  ],
  customerPainsHeading: "After a wreck, the last thing you need is more stress.",
  customerPains: [
    "The first shop quoted a week, then it stretched to a month — with no updates",
    "The paint doesn’t actually match — you can see the panel from across the parking lot",
    "Your insurance company keeps pushing you to “their” shop, but you want a choice",
    "You don’t know if the frame got pulled correctly or just patched over",
    "Aftermarket parts you didn’t agree to — and now alignment is off",
  ],
  servicesHeading: "What we repair.",
  services: [
    {
      title: "Collision Repair",
      description:
        "Front-end, rear-end, side-impact — full panel replacement and structural repair. Computer-measured frame straightening with electronic documentation before, during, and after.",
    },
    {
      title: "Paint Matching & Refinishing",
      description:
        "Spectrophotometer-matched paint formulas across every OEM color. Downdraft booth, two-stage clearcoat, factory-finish blend across adjacent panels.",
    },
    {
      title: "Frame & Unibody Straightening",
      description:
        "Computerized measuring system pulls frame to factory tolerance. Every measurement documented in writing before we release the vehicle.",
    },
    {
      title: "ADAS Calibration",
      description:
        "Lane-keep, automatic braking, blind-spot, and forward-collision sensors recalibrated after any panel or windshield work. Static and dynamic calibration in-house.",
    },
    {
      title: "Glass & Trim",
      description:
        "Windshield, side glass, and back glass — OEM-spec replacement with urethane bonding. Trim, badges, and weatherstripping replaced to factory standard.",
    },
    {
      title: "Paintless Dent Repair",
      description:
        "Hail damage, door dings, and minor creases removed without paint or filler. Faster turnaround and the panel keeps its original factory finish.",
    },
  ],
  whyUsHeading: "Why drivers pick us.",
  whyUs: [
    {
      title: "OEM Parts Whenever Possible",
      description:
        "We push for original-equipment parts on every claim. If your insurer insists on aftermarket, we tell you what that means for fit, finish, and resale.",
    },
    {
      title: "Real Timelines, In Writing",
      description:
        "We give you a written delivery date the day we get the parts in. If anything changes, you hear about it before lunch — not after.",
    },
    {
      title: "Lifetime Repair Warranty",
      description:
        "As long as you own the vehicle, our repair work is warrantied. Paint, panel, frame — if it fails because of our work, we fix it. No fine print.",
    },
    {
      title: "We Handle the Insurance Headache",
      description:
        "Direct billing with every major carrier. Supplements, photo estimates, parts approvals — we deal with the adjusters so you don’t.",
    },
  ],
  faqs: [
    {
      question: "Do I have to use the shop my insurance recommends?",
      answer:
        "No — you have the right to choose your repair shop in every state. Insurance can recommend, but they cannot require. We work with every major carrier and bill them directly.",
    },
    {
      question: "How long will the repair take?",
      answer:
        "Minor cosmetic work runs 3–5 days. Moderate collision (one or two panels + paint) is 7–10 days. Major collision with frame or ADAS work is typically 14–21 days. We give you a written timeline before any work starts.",
    },
    {
      question: "Will the paint really match?",
      answer:
        "Yes. We use a spectrophotometer to read your existing paint and pull the exact formula, then blend across adjacent panels so the transition is invisible. Bring it back if it doesn’t — we’ll redo it.",
    },
    {
      question: "What if there’s hidden damage you find later?",
      answer:
        "That’s called a supplement, and it’s normal. We document everything with photos, submit it to your carrier, and get approval before continuing. You won’t see surprise charges.",
    },
  ],
  finalCtaHeading: "Bring it in. We’ll make it right.",
  finalCtaSubtitle:
    "Drive in, send photos, or start a claim online. Free estimate, written timeline, and direct insurance billing — so you can stop thinking about the wreck and get back to driving.",
  finalCtaButton: "Get Free Estimate",
};

// ─────────────────────────────────────────────────────────────────────
// Fitness Studio — Health & Wellness group
// ─────────────────────────────────────────────────────────────────────

const FITNESS: NicheSiteContent = {
  heroTagline: "Train with intention. See results that actually stick.",
  heroSubtitle:
    "Small-group strength training, personal coaching, and metabolic conditioning. Programmed by certified coaches, built around your body, delivered in a studio that doesn’t feel like a chain gym.",
  heroCta: "Book Free Intro Session",
  heroSecondaryCta: "View Class Schedule",
  trustStats: [
    { value: "NASM/CSCS", label: "Certified Coaches" },
    { value: "1:6", label: "Coach-to-Member Ratio" },
    { value: "Weekly", label: "Programming" },
    { value: "5★", label: "Member Rating" },
  ],
  customerPainsHeading: "Big-box gyms aren’t working for you.",
  customerPains: [
    "You wander the gym floor not really knowing what to do — and the results show it",
    "Trainers vanish after the consult and you’re left guessing on form",
    "You’ve tried apps and YouTube programs but can’t stay consistent solo",
    "You want strength, mobility, and conditioning — not just cardio machines",
    "You’re recovering from an injury and need a coach who actually adjusts",
  ],
  servicesHeading: "How we train.",
  services: [
    {
      title: "Small-Group Strength",
      description:
        "Six members per coach, programmed weekly. Compound lifts, accessory work, and recovery — all coached on every rep. The accountability of a class with the attention of personal training.",
    },
    {
      title: "1:1 Personal Coaching",
      description:
        "Private sessions with a NASM- or CSCS-certified coach. Movement screen, custom programming, and nutrition framework built around your goals and your schedule.",
    },
    {
      title: "Metabolic Conditioning",
      description:
        "Heart-rate-monitored conditioning classes — sled, rower, ski erg, kettlebell. Programmed in zones so you train the right energy system, not just hard for hard’s sake.",
    },
    {
      title: "Mobility & Recovery",
      description:
        "Coach-led mobility classes, soft-tissue work, and recovery protocols. Add it to a strength membership or come for mobility alone — your back and hips will thank us.",
    },
    {
      title: "Nutrition Coaching",
      description:
        "Habit-based nutrition program — no meal plans, no “clean eating” guilt. We coach the behaviors that actually move body composition, with weekly check-ins.",
    },
    {
      title: "Athlete & Sport Prep",
      description:
        "Pre-season strength and conditioning for competitive athletes. Velocity-based training, force-plate testing, and sport-specific programming for tactical, combat, and field athletes.",
    },
  ],
  whyUsHeading: "Why members pick us.",
  whyUs: [
    {
      title: "Coaches, Not Trainers",
      description:
        "Every coach holds an NASM, NSCA-CSCS, or comparable credential — not a weekend cert. They program for you, watch every rep, and adjust on the fly.",
    },
    {
      title: "Programming, Not Random Workouts",
      description:
        "We follow a 12-week strength block with built-in deloads. You see strength numbers go up week after week — not the same workout dressed up differently every day.",
    },
    {
      title: "Real Movement Assessment",
      description:
        "Day one is a Functional Movement Screen, not a sales pitch. We find what’s tight, what’s weak, and what hurts before we ask you to lift heavy.",
    },
    {
      title: "A Studio, Not a Gym",
      description:
        "Limited memberships, no contracts, no upselling. You walk in, the coach knows your name, and the workout is already on the board.",
    },
  ],
  faqs: [
    {
      question: "I’m completely out of shape. Will I keep up?",
      answer:
        "Yes — every workout has scaling options, and your coach picks them with you. Most members start with 2 sessions a week and build from there. We meet you where you are.",
    },
    {
      question: "How much does membership cost?",
      answer:
        "Small-group strength is $199–$279/month for 2–3x weekly. Personal coaching runs $90–$140/session in packages. Free intro session and movement screen — no obligation, no “sign here today” pressure.",
    },
    {
      question: "Do you do nutrition or just training?",
      answer:
        "Both. Most members add the nutrition program after a few months — habit coaching, weekly check-ins, and body composition tracking. It’s included with our top-tier membership and available a la carte.",
    },
    {
      question: "What if I’m injured or recovering from surgery?",
      answer:
        "Talk to us first. Several of our coaches have post-rehab certifications and we work with local PTs to bridge you back to full training. We don’t just hand you a band and call it a workout.",
    },
  ],
  finalCtaHeading: "Stop wandering the gym. Start training with a plan.",
  finalCtaSubtitle:
    "Book a free intro session — movement screen, conversation about your goals, and a sample workout. No pressure, no contracts, and no “same workout for everyone.”",
  finalCtaButton: "Book Free Intro",
};

// ─────────────────────────────────────────────────────────────────────
// Stair Lift Installer — Aging in Place group
// ─────────────────────────────────────────────────────────────────────

const STAIR_LIFT: NicheSiteContent = {
  heroTagline: "Stay in the home you love. Keep every floor.",
  heroSubtitle:
    "Straight, curved, and outdoor stair lifts installed in days, not weeks. Certified technicians, lifetime parts warranty, and a no-pressure in-home assessment so you choose the right lift for your stairs and your loved one.",
  heroCta: "Schedule Free Home Assessment",
  heroSecondaryCta: "Compare Stair Lift Models",
  trustStats: [
    { value: "Same-Week", label: "Installation" },
    { value: "Lifetime", label: "Parts Warranty" },
    { value: "Bruno + Stannah", label: "Authorized Dealer" },
    { value: "5★", label: "Family Rating" },
  ],
  customerPainsHeading: "The stairs have become the problem.",
  customerPains: [
    "Mom or Dad is afraid of falling — and the family is more afraid than they are",
    "You’ve been told the only options are moving or expensive home renovations",
    "You’ve called three companies and heard three different prices for the same lift",
    "Your staircase is curved and you’ve been told a lift won’t fit (it will)",
    "You need this resolved in days, not the 6–8 weeks the big-box stores quoted",
  ],
  servicesHeading: "What we install.",
  services: [
    {
      title: "Straight Stair Lifts",
      description:
        "For standard straight staircases. Installed in 2–4 hours, mounted to the treads (not the wall), powered by rechargeable battery so it runs through power outages.",
    },
    {
      title: "Curved Stair Lifts",
      description:
        "Custom-rail lifts for curved, spiral, or multi-landing staircases. Laser-measured, factory-built to your exact stairs. Installed in a single day once the rail arrives.",
    },
    {
      title: "Outdoor Stair Lifts",
      description:
        "Weather-rated lifts for porches, decks, and outdoor walkways. UV-resistant covers, sealed motors, and full warranty in any climate.",
    },
    {
      title: "Wheelchair Platform Lifts",
      description:
        "Vertical platform lifts for porches and short rises, and inclined platform lifts for staircases. Full ADA compliance, perfect for wheelchairs and mobility scooters.",
    },
    {
      title: "Rentals & Short-Term Lifts",
      description:
        "Short-term rentals for post-surgery recovery, hospice, or visiting family. Same-week install, monthly billing, removed when you no longer need it.",
    },
    {
      title: "Service & Maintenance",
      description:
        "Annual inspection, battery replacement, and 24/7 service line for any issue. Most repairs handled in-home the same day we get the call.",
    },
  ],
  whyUsHeading: "Why families pick us.",
  whyUs: [
    {
      title: "In-Home Assessment, Not a Sales Visit",
      description:
        "A certified technician comes to your home, measures your stairs, and walks you through every option. No pressure, no “sign today,” no commission-driven recommendations.",
    },
    {
      title: "Installed in Days",
      description:
        "Straight lifts installed within the week. Curved lifts ship in 2–3 weeks (custom-built to your stairs) and install in a single day. We know this is urgent.",
    },
    {
      title: "Authorized Dealer for Major Brands",
      description:
        "Bruno, Stannah, Harmar, Acorn — we carry the lifts trusted by occupational therapists nationwide. Real warranty support, real parts in stock, real technicians.",
    },
    {
      title: "We Train the Whole Family",
      description:
        "After install, we train the user and family on safe operation, charging, and what to do if power goes out. We answer the phone forever. Your peace of mind is the product.",
    },
  ],
  faqs: [
    {
      question: "How much does a stair lift cost?",
      answer:
        "Straight lifts run $3,200–$4,800 installed. Curved lifts (custom-rail for non-straight stairs) run $9,500–$16,000 installed. Outdoor lifts run $4,800–$6,500. Free in-home assessment includes a written quote.",
    },
    {
      question: "Will it damage my stairs or banister?",
      answer:
        "No — lifts mount to the treads, not the wall, and use small bolts that fill in cleanly when the lift is removed. Your handrail and banister stay exactly where they are.",
    },
    {
      question: "What about insurance — does Medicare cover it?",
      answer:
        "Standard Medicare and most private insurance do not cover stair lifts. Some long-term care policies and VA benefits do. We help you check and file. Affordable financing is available regardless.",
    },
    {
      question: "What happens if the lift breaks down?",
      answer:
        "24/7 service line. Most issues are battery-related and resolved in-home the same day. Lifetime parts warranty on motors and rails — we don’t leave you stuck on a staircase.",
    },
  ],
  finalCtaHeading: "Keep them home. Keep every floor.",
  finalCtaSubtitle:
    "Schedule a free in-home assessment. We measure, walk you through options, and send a written quote — no pressure, no obligation, no upselling.",
  finalCtaButton: "Schedule Free Assessment",
};

// ─────────────────────────────────────────────────────────────────────
// Real Estate Agent — Personal Brand group
// ─────────────────────────────────────────────────────────────────────

const REAL_ESTATE: NicheSiteContent = {
  heroTagline: "Buy or sell with someone who actually knows the neighborhood.",
  heroSubtitle:
    "Local-market expertise, negotiating muscle, and an honest read on what your home is really worth. Sellers see higher net proceeds, buyers see homes before they hit the public market.",
  heroCta: "Schedule a Strategy Call",
  heroSecondaryCta: "Get a Free Home Valuation",
  trustStats: [
    { value: "Top 1%", label: "Local Producer" },
    { value: "$120M+", label: "Closed Volume" },
    { value: "98%", label: "List-to-Sale Ratio" },
    { value: "12 days", label: "Avg. Days on Market" },
  ],
  customerPainsHeading: "You’ve heard the horror stories.",
  customerPains: [
    "The agent listed your friend’s home, then disappeared until showing requests stopped",
    "You don’t know what your home is actually worth — Zillow and the next-door neighbor disagree by $80K",
    "You’re competing with cash buyers and don’t know how to win without overpaying",
    "Your last agent didn’t negotiate — they just passed messages between you and the other side",
    "You want someone who tells you the truth, not someone who tells you what you want to hear",
  ],
  servicesHeading: "How I work.",
  services: [
    {
      title: "Seller Representation",
      description:
        "Pricing strategy backed by real comps and current market data, professional staging consult, full-spectrum marketing (pro photo, video, drone, paid social), and aggressive negotiation. The goal is highest net to you, not fastest sale to me.",
    },
    {
      title: "Buyer Representation",
      description:
        "Off-market and pre-market access, neighborhood deep-dives, inspection coordination, and a negotiation strategy that wins without overpaying. Most of my buyers see homes before they hit the MLS.",
    },
    {
      title: "Free Home Valuation",
      description:
        "Real comparative market analysis — not an automated estimate. I walk your home, look at recent sales within a quarter mile, and give you a number you can take to the bank.",
    },
    {
      title: "Investor & Multi-Family",
      description:
        "Cap rate analysis, rental comp data, and 1031 exchange coordination. Whether it’s your first rental or your tenth doors, I underwrite the deal before I let you fall in love with it.",
    },
    {
      title: "Relocation",
      description:
        "Coming from out of state? Virtual home tours, neighborhood video walkthroughs, and a school-district breakdown so you can shortlist before you ever fly in.",
    },
    {
      title: "New Construction",
      description:
        "Builder representation matters. I negotiate price, upgrades, closing costs, and lender concessions on your behalf — at no cost to you. Builders pay the agent fee.",
    },
  ],
  whyUsHeading: "Why buyers and sellers pick me.",
  whyUs: [
    {
      title: "I Negotiate, I Don’t Just Pass Messages",
      description:
        "Most agents are licensed messengers. I’ve closed $120M+ in volume and I know how to push for price, terms, repairs, and credits. The other side notices.",
    },
    {
      title: "Real Pricing, Not Wishful Thinking",
      description:
        "I won’t list your home at a price I know it won’t sell for just to win the listing. We price it right, we sell it fast, and you net more. That’s the math.",
    },
    {
      title: "I Answer the Phone",
      description:
        "Calls answered same day. Texts within an hour. Showings booked within 24. Real-estate is a 7-day-a-week business and I treat it that way.",
    },
    {
      title: "I Know This Market — Block by Block",
      description:
        "I’ve sold homes on most of the streets you’re considering. School ratings, traffic patterns, HOA reputations, flood zones — I’ve got the unwritten data the apps don’t.",
    },
  ],
  faqs: [
    {
      question: "How do you decide what to list my home for?",
      answer:
        "Real comparative market analysis. I look at homes that actually sold (not what they listed for) within the last 90 days, within a quarter mile, with similar size, condition, and features. Then I adjust for differences. You see the comp sheet — no black-box pricing.",
    },
    {
      question: "What does it cost to work with you?",
      answer:
        "For sellers, my fee is built into the transaction and we discuss it openly upfront. For buyers, my fee is typically paid by the seller’s side at closing. Either way, you see every number in writing before we sign anything.",
    },
    {
      question: "How fast can you sell my home?",
      answer:
        "My listings average 12 days on market with a 98% list-to-sale ratio. Pricing right, professional photo and video, broad marketing, and pre-listing prep all matter. We can talk through your specific home on a free strategy call.",
    },
    {
      question: "What if I’m not ready to sell for another 6–12 months?",
      answer:
        "Even better — that’s the right time to start the conversation. I’ll do a walk-through, give you a punch list of what to fix vs. what to leave, and check in quarterly. No pressure, no obligation. When you’re ready, we’re ready.",
    },
  ],
  finalCtaHeading: "Let’s talk before you list — or before you lose the bid.",
  finalCtaSubtitle:
    "Free 30-minute strategy call. We’ll talk through your goals, your timeline, and what the market is actually doing. No sales pressure, no “sign with me today” — just a real conversation.",
  finalCtaButton: "Schedule Strategy Call",
};

// ─────────────────────────────────────────────────────────────────────
// Main lookup
// ─────────────────────────────────────────────────────────────────────

export const NICHE_SITE_CONTENT: Record<string, NicheSiteContent> = {
  "foundation-repair": FOUNDATION_REPAIR,
  plumbers: PLUMBERS,
  hvac: HVAC,
  roofers: ROOFERS,
  "pool-builders": POOL_BUILDERS,
  "solar-installers": SOLAR_INSTALLERS,
  "decorative-concrete": DECORATIVE_CONCRETE,
  "hair-salons": HAIR_SALONS,
  "medical-spas": MEDICAL_SPAS,
  "mobile-pet-grooming": MOBILE_PET_GROOMING,

  "polished-concrete": POLISHED_CONCRETE,
  "auto-body": AUTO_BODY,
  fitness: FITNESS,
  "stair-lift": STAIR_LIFT,
  "real-estate": REAL_ESTATE,
};

export function getNicheSiteContent(slug: string): NicheSiteContent {
  return NICHE_SITE_CONTENT[slug] || placeholder("Local Service Pro", "customers");
}
