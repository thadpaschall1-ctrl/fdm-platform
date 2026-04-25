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
  heroTagline: "Saw a crack? We&rsquo;ll be there before it spreads.",
  heroSubtitle:
    "Free in-home foundation inspection, transparent quotes, and lifetime-transferable warranties. We fix what&rsquo;s already settled and stop what&rsquo;s about to.",
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
    "You&rsquo;ve got a crack in the wall and don&rsquo;t know if it&rsquo;s cosmetic or structural",
    "Doors and windows are sticking — could be settlement, could be humidity",
    "There&rsquo;s water in the basement after every heavy rain",
    "Your floors slope or feel uneven in spots",
    "Another contractor quoted $30K and you have no idea if that&rsquo;s fair",
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
      title: "Wall Anchor / Bracing",
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
        "Crack injection: a half-day. Pier installation: 1–3 days for an average home. Full waterproofing: 2–4 days. Most jobs we&rsquo;re done before the weekend, with no need for you to leave the house during work.",
    },
    {
      question: "Will the repair be visible after?",
      answer:
        "Interior repairs are usually invisible — patched and ready for paint. Exterior repairs may show some grading work for the first season until landscaping fills in. We restore the area as part of the job, not as an afterthought.",
    },
  ],
  finalCtaHeading: "The crack isn&rsquo;t getting smaller.",
  finalCtaSubtitle:
    "Free inspection. Honest answer about what you&rsquo;re looking at. Quote in writing the same day. No pressure.",
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
  customerPainsHeading: "Plumbing emergencies don&rsquo;t wait.",
  customerPains: [
    "Water&rsquo;s pouring out of a fitting and you don&rsquo;t know where the shutoff is",
    "Toilet&rsquo;s clogged for the third time this month — something&rsquo;s wrong",
    "Hot water&rsquo;s out and you&rsquo;ve got a houseful of family in town",
    "There&rsquo;s a wet spot on the ceiling that wasn&rsquo;t there yesterday",
    "Your last plumber left a $1,200 bill with no breakdown",
  ],
  servicesHeading: "What we fix.",
  services: [
    {
      title: "Emergency Repairs",
      description:
        "Burst pipes, water heater failures, sewer backups, gas leaks. We&rsquo;re on call 24/7/365 with stocked trucks ready to roll.",
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
        "Drop cloths, shoe covers, and clean-up before we leave. Your home should look better when we&rsquo;re done than when we got there.",
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
        "Average dispatch time is 30 minutes within our service area, 24/7. We&rsquo;ll give you an honest ETA when you call — no &lsquo;between noon and 5pm&rsquo; window.",
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
  finalCtaHeading: "Don&rsquo;t let a small leak become a big disaster.",
  finalCtaSubtitle:
    "Call now. We&rsquo;ll have a licensed plumber on the way within the hour, with up-front pricing and same-day repairs.",
  finalCtaButton: "Call Now",
};

const HVAC: NicheSiteContent = {
  heroTagline: "AC out at 3am? We work 24/7 so you don&rsquo;t bake.",
  heroSubtitle:
    "Same-day service for cooling, heating, and indoor air. Licensed HVAC technicians serving residential and light commercial. Manufacturer-certified for major brands.",
  heroCta: "Schedule Same-Day Service",
  heroSecondaryCta: "Maintenance Plans",
  trustStats: [
    { value: "Same-day", label: "Service Available" },
    { value: "24/7", label: "Emergency Response" },
    { value: "100%", label: "Satisfaction Guarantee" },
    { value: "0%", label: "Financing Available" },
  ],
  customerPainsHeading: "When your HVAC goes down, everything stops.",
  customerPains: [
    "AC quit on the hottest day of the year and the kids are miserable",
    "Heat pump is making a grinding noise and you don&rsquo;t want to lose it",
    "Energy bill went up $80 last month with no obvious explanation",
    "Allergies are worse indoors than outside — air filter isn&rsquo;t cutting it",
    "Last service company left without explaining what they actually did",
  ],
  servicesHeading: "What we service.",
  services: [
    {
      title: "AC Repair & Installation",
      description:
        "Diagnostic, repair, and replacement for central air, mini-splits, and heat pumps. We fix what&rsquo;s broken before pushing for replacement.",
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
        "Diagnostic for leaky ducts (typical homes lose 20–30% of conditioned air), sealing, and zoning systems for multi-story homes.",
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
        "We fix what&rsquo;s fixable before recommending a new system. If replacement is the right call, you&rsquo;ll get the data behind that recommendation.",
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
        "If our installed system doesn&rsquo;t meet the cooling/heating spec, we make it right — including swapping equipment at no charge to you.",
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
        "Twice a year — spring (AC) and fall (heat). It catches small problems before they fail, keeps efficiency up, and is required for most manufacturer warranties to stay valid.",
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
  finalCtaHeading: "Your comfort shouldn&rsquo;t depend on luck.",
  finalCtaSubtitle:
    "Same-day service, transparent pricing, and 24/7 emergency response. Schedule online or call us now.",
  finalCtaButton: "Schedule Service",
};

const ROOFERS: NicheSiteContent = {
  heroTagline: "Lost a few shingles in last night&rsquo;s storm? Free inspection.",
  heroSubtitle:
    "Residential and commercial roofing, repair to full replacement. Storm damage specialists with insurance-claim assistance. Lifetime workmanship warranty.",
  heroCta: "Free Roof Inspection",
  heroSecondaryCta: "View Our Work",
  trustStats: [
    { value: "Free", label: "Roof Inspection" },
    { value: "Insurance", label: "Claims Specialist" },
    { value: "Lifetime", label: "Workmanship Warranty" },
    { value: "GAF/Owens", label: "Master Certified" },
  ],
  customerPainsHeading: "After a storm, every minute matters.",
  customerPains: [
    "You see shingles in the yard and don&rsquo;t know if there&rsquo;s damage worth claiming",
    "There&rsquo;s a water spot on the bedroom ceiling and you don&rsquo;t know how long it&rsquo;s been there",
    "Insurance adjuster wants paperwork you don&rsquo;t have",
    "Roof is 17 years old and you don&rsquo;t know if it&rsquo;ll make another season",
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
        "We&rsquo;ve worked thousands of insurance claims. We know what adjusters look for, document the damage their software requires, and meet them on-site if needed.",
    },
    {
      title: "Master Certified Installers",
      description:
        "GAF Master Elite and Owens Corning Platinum certifications mean access to the strongest material warranties. Less than 2% of roofers in the country qualify.",
    },
    {
      title: "Lifetime Workmanship Warranty",
      description:
        "If a leak or failure happens because of how we installed it — even 20 years later — we fix it free. Transferable to the next owner.",
    },
    {
      title: "No High-Pressure Sales",
      description:
        "Free inspection, written report, multiple options, no pressure. If repair makes more sense than replacement, that&rsquo;s what we&rsquo;ll recommend.",
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
      question: "What&rsquo;s the difference between architectural and 3-tab shingles?",
      answer:
        "3-tab is the older, thinner, less expensive option (about 20-year lifespan). Architectural (or dimensional) shingles are thicker, look more textured, last 30+ years, and handle wind better. Most insurance replacements upgrade to architectural at no extra cost to you.",
    },
    {
      question: "Do you handle the cleanup?",
      answer:
        "Yes. We use magnetic rollers to pick up nails from the lawn and driveway, haul away all debris, and leave your property cleaner than we found it. Final walk-through is part of the job.",
    },
  ],
  finalCtaHeading: "Don&rsquo;t wait for a small leak to become a ceiling collapse.",
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
      "You&rsquo;ve been burned by a flaky service provider before",
      "You don&rsquo;t know what a fair price actually looks like",
      "You want someone who shows up on time and finishes what they start",
      "You&rsquo;re tired of vague estimates and surprise add-ons",
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
      { title: "Quality Guarantee", description: "If you&rsquo;re not happy, we make it right." },
    ],
    faqs: [
      {
        question: "How long have you been in business?",
        answer: "We&rsquo;ve been serving the local community for over 20 years and have built our reputation one customer at a time.",
      },
      {
        question: "Are you licensed and insured?",
        answer: "Yes — fully licensed, bonded, and insured. We&rsquo;ll provide proof of insurance on request.",
      },
      {
        question: "Do you offer free estimates?",
        answer: "Absolutely. Most consultations are completed within a week of your initial inquiry, and there&rsquo;s never any obligation.",
      },
    ],
    finalCtaHeading: "Ready to get started?",
    finalCtaSubtitle: "Reach out today for a free, no-obligation consultation. We&rsquo;ll come out, take a look, and give you honest answers.",
    finalCtaButton: "Contact Us",
  };
}

// ─────────────────────────────────────────────────────────────────────
// Main lookup
// ─────────────────────────────────────────────────────────────────────

export const NICHE_SITE_CONTENT: Record<string, NicheSiteContent> = {
  "foundation-repair": FOUNDATION_REPAIR,
  plumbers: PLUMBERS,
  hvac: HVAC,
  roofers: ROOFERS,

  // Placeholder content for niches not yet fleshed out — V2 expansion
  "solar-installers": placeholder("Solar Installers", "homeowners"),
  "pool-builders": placeholder("Pool Builders", "homeowners"),
  "polished-concrete": placeholder("Polished Concrete Contractors", "facility managers"),
  "decorative-concrete": placeholder("Decorative Concrete Specialists", "homeowners"),
  "hair-salons": placeholder("Hair Salon", "clients"),
  "medical-spas": placeholder("Medical Spa", "clients"),
  "auto-body": placeholder("Auto Body Shop", "drivers"),
  "mobile-pet-grooming": placeholder("Mobile Pet Groomer", "pet owners"),
  fitness: placeholder("Fitness Studio", "members"),
  "stair-lift": placeholder("Stair Lift Installer", "families"),
  "real-estate": placeholder("Real Estate Agent", "buyers and sellers"),
};

export function getNicheSiteContent(slug: string): NicheSiteContent {
  return NICHE_SITE_CONTENT[slug] || placeholder("Local Service Pro", "customers");
}
