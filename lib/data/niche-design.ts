/**
 * Niche → Archetype mapping with per-niche design overrides.
 *
 * Every niche maps to one of 7 archetypes (broad visual language) plus
 * niche-specific overrides (color shifts, hero copy tone, photography hints,
 * micro-interactions). The result: two niches in the same archetype still
 * feel like distinct brands at a glance.
 *
 * The overrides are intentionally light — the archetype carries 80% of the
 * visual identity; per-niche tweaks carry the remaining 20% that makes a
 * foundation-repair site feel different from a plumber's site.
 */

import { ArchetypeId } from "./design-archetypes";

export interface NicheDesignOverride {
  /** Archetype this niche inherits from */
  archetype: ArchetypeId;

  /** Color shifts on top of archetype base (any palette key from DesignArchetype.palette) */
  paletteShifts?: Partial<{
    primary: string;
    primaryFg: string;
    accent: string;
    accent2: string;
    background: string;
    foreground: string;
    surface: string;
    muted: string;
    border: string;
  }>;

  /**
   * Hero "context" — drives copy generation tone and imagery hint.
   * Examples:
   *   foundation-repair: { urgency: "panic-discovery", proof: "before-after-cracks" }
   *   plumbers:          { urgency: "right-now",       proof: "fast-response-time" }
   *   hvac:              { urgency: "comfort-recovery", proof: "year-round-equipment" }
   *   roofers:           { urgency: "pre-leak",         proof: "storm-damage" }
   */
  heroContext: {
    /** Free-text key that the composer uses to pick imagery + copy variant */
    urgency: string;
    proof: string;
    /** One-line tagline override — if undefined, composer falls back to industries.ts hero */
    tagline?: string;
  };

  /** Imagery hints — inform alt-text generation and photo selection later */
  imagery?: {
    heroSubject?: string;
    sectionAccents?: string[];
  };

  /** Optional layout overrides on top of archetype defaults */
  layoutOverrides?: Partial<{
    heroAlignment: "centered" | "split-left" | "split-right" | "asymmetric";
    sectionDensity: "minimal" | "card" | "data-dense";
  }>;
}

// ─────────────────────────────────────────────────────────────────────
// Niche → archetype map (covers the 15 QA-batch niches; expand as needed)
// ─────────────────────────────────────────────────────────────────────

export const NICHE_DESIGN: Record<string, NicheDesignOverride> = {
  // ── Urgent Trade group ─────────────────────────────────────────
  "foundation-repair": {
    archetype: "urgent-trade",
    paletteShifts: {
      primary: "#b45309",    // earthy amber — "concrete + clay"
      accent: "#0f172a",     // deep slate — "structural"
      accent2: "#f59e0b",
    },
    heroContext: {
      urgency: "panic-discovery",
      proof: "before-after-cracks",
      tagline: "Saw a crack? We&rsquo;ll be there before it spreads.",
    },
    imagery: {
      heroSubject: "Concrete crack closeup with steel pier installation",
      sectionAccents: ["foundation diagrams", "before/after wall photos"],
    },
  },

  plumbers: {
    archetype: "urgent-trade",
    paletteShifts: {
      primary: "#1d4ed8",    // utility blue — "water"
      accent: "#dc2626",     // emergency red
      accent2: "#06b6d4",
    },
    heroContext: {
      urgency: "right-now",
      proof: "fast-response-time",
      tagline: "Burst pipe? On the way in 30 minutes.",
    },
    imagery: {
      heroSubject: "Plumber arriving at door with toolkit, focused look",
      sectionAccents: ["pipe schematic", "wrench close-up", "service van"],
    },
  },

  hvac: {
    archetype: "urgent-trade",
    paletteShifts: {
      primary: "#0284c7",    // cool blue (AC)
      accent: "#ea580c",     // warm orange (heat)
      accent2: "#3b82f6",
    },
    heroContext: {
      urgency: "comfort-recovery",
      proof: "year-round-equipment",
      tagline: "AC out at 3am? We work 24/7 so you don&rsquo;t bake.",
    },
    imagery: {
      heroSubject: "HVAC tech installing condenser, calm and competent",
      sectionAccents: ["thermostat", "AC unit close-up", "comfort lifestyle"],
    },
  },

  roofers: {
    archetype: "urgent-trade",
    paletteShifts: {
      primary: "#15803d",    // weathered green-slate
      accent: "#fbbf24",     // sun/storm contrast
      accent2: "#475569",
    },
    heroContext: {
      urgency: "pre-leak",
      proof: "storm-damage",
      tagline: "Lost a few shingles in last night&rsquo;s storm? Free inspection.",
    },
    imagery: {
      heroSubject: "Drone shot of crew on roof installing shingles, sky after storm",
      sectionAccents: ["before/after roof photos", "storm damage closeups"],
    },
  },

  // ── Premium Outdoor Living group ───────────────────────────────
  "pool-builders": {
    archetype: "premium-outdoor-living",
    paletteShifts: {
      primary: "#0c4a6e",    // deep pool blue
      accent: "#0d9488",     // tropical teal
    },
    heroContext: {
      urgency: "long-build",
      proof: "drone-portfolio",
      tagline: "Backyard transformations that take three months and last forever.",
    },
    imagery: {
      heroSubject: "Drone shot of completed pool at golden hour with home and landscaping",
      sectionAccents: ["water tile detail", "pool deck lifestyle", "build timeline"],
    },
  },

  // ── B2B Commercial group ───────────────────────────────────────
  "polished-concrete": {
    archetype: "b2b-commercial",
    paletteShifts: {
      primary: "#334155",    // industrial slate
      accent: "#0891b2",     // technical cyan
    },
    heroContext: {
      urgency: "rfp-deadline",
      proof: "performance-data",
      tagline: "Spec-compliant polished concrete. ASTM-tested. RFP-ready in 24 hours.",
    },
    imagery: {
      heroSubject: "Polished concrete warehouse floor at scale, industrial lighting",
      sectionAccents: ["sheen-level chart", "test data tables", "completed project map"],
    },
  },

  // ── Visual / Pinterest group ───────────────────────────────────
  "decorative-concrete": {
    archetype: "visual-pinterest",
    paletteShifts: {
      primary: "#7c2d12",    // burnt umber
      accent: "#a16207",     // earthy gold
    },
    heroContext: {
      urgency: "design-shop",
      proof: "pinterest-portfolio",
      tagline: "Stamped, stained, and done right. Pinterest-worthy in real life.",
    },
    imagery: {
      heroSubject: "Stamped concrete patio with outdoor furniture, late afternoon light",
      sectionAccents: ["stamp-pattern grid", "color-stain swatches", "before/after"],
    },
  },

  "hair-salons": {
    archetype: "visual-pinterest",
    paletteShifts: {
      primary: "#be185d",    // signature rose
      accent: "#0f766e",     // unexpected teal counterweight
    },
    heroContext: {
      urgency: "rebook",
      proof: "client-transformation",
      tagline: "The chair where your hair finally gets understood.",
    },
    imagery: {
      heroSubject: "Stylist mid-color session, soft natural light, Instagram-ready",
      sectionAccents: ["color formulation flatlay", "stylist portraits", "salon interior"],
    },
  },

  "medical-spas": {
    archetype: "visual-pinterest",
    paletteShifts: {
      primary: "#9333ea",    // luxe purple
      accent: "#06b6d4",     // clinical fresh
      background: "#fdf4ff",
    },
    heroContext: {
      urgency: "results-shopping",
      proof: "medical-grade-results",
      tagline: "Medical-grade. Spa-soft. Results that actually show up.",
    },
    imagery: {
      heroSubject: "Bright clean treatment room with natural skin texture portrait",
      sectionAccents: ["before/after", "device close-ups", "team in scrubs"],
    },
  },

  // ── Solar (currently bridges urgent-trade + premium-outdoor — going premium-outdoor for the visual lift) ──
  "solar-installers": {
    archetype: "premium-outdoor-living",
    paletteShifts: {
      primary: "#ca8a04",    // sun gold
      accent: "#0f766e",     // panel-back teal
    },
    heroContext: {
      urgency: "rate-lock",
      proof: "kwh-savings-data",
      tagline: "Lock in your kWh rate before it climbs again.",
    },
    imagery: {
      heroSubject: "Drone shot of completed rooftop array on suburban home",
      sectionAccents: ["panel install close-up", "savings chart", "team installing"],
    },
    layoutOverrides: { sectionDensity: "data-dense" },
  },

  // ── Auto Body — sits in urgent-trade with insurance-pay flavor ──
  "auto-body": {
    archetype: "urgent-trade",
    paletteShifts: {
      primary: "#1e3a8a",    // deep automotive blue
      accent: "#dc2626",     // emergency red
      accent2: "#94a3b8",
    },
    heroContext: {
      urgency: "post-accident",
      proof: "insurance-direct-bill",
      tagline: "Just had an accident? Take a breath. We&rsquo;ll handle the rest.",
    },
    imagery: {
      heroSubject: "Tech buffing a freshly-painted fender, sparkling clean shop",
      sectionAccents: ["before/after collision", "OEM certification badges", "loaner cars"],
    },
  },

  // ── Mobile Pet Grooming — warm/family but route-density themed ──
  "mobile-pet-grooming": {
    archetype: "visual-pinterest",
    paletteShifts: {
      primary: "#15803d",    // calm grass green
      accent: "#f59e0b",     // friendly gold
      background: "#f7fdf9",
    },
    heroContext: {
      urgency: "rebook",
      proof: "before-after-grooming",
      tagline: "We come to you. Your dog stays calm. Everyone wins.",
    },
    imagery: {
      heroSubject: "Smiling groomer with happy dog in front of branded van",
      sectionAccents: ["before/after grooms", "van interior", "breed gallery"],
    },
  },

  // ── Fitness Studios — health-wellness archetype ───────────────
  fitness: {
    archetype: "health-wellness",
    paletteShifts: {
      primary: "#16a34a",    // active green
      accent: "#0ea5e9",     // recovery blue
      background: "#0a0a0a", // dark mode for energy
      foreground: "#f5f5f5",
    },
    heroContext: {
      urgency: "trial-class",
      proof: "transformation-stories",
      tagline: "Your first class is on us. Show up — that&rsquo;s the hard part.",
    },
    imagery: {
      heroSubject: "Group class mid-rep, low-key gym lighting, real members",
      sectionAccents: ["coach portraits", "transformation stories", "class schedule"],
    },
    layoutOverrides: { heroAlignment: "centered" },
  },

  // ── Stair Lift — aging-in-place ──────────────────────────────
  "stair-lift": {
    archetype: "aging-in-place",
    paletteShifts: {
      primary: "#065f46",    // confidence green
      accent: "#92400e",     // warm umber
    },
    heroContext: {
      urgency: "post-fall-or-planning",
      proof: "same-week-install",
      tagline: "Mom or Dad shouldn&rsquo;t avoid the upstairs. Same-week installs.",
    },
    imagery: {
      heroSubject: "Senior smiling on stair lift mid-ride, family member nearby",
      sectionAccents: ["product close-ups by brand", "warranty docs", "install timeline"],
    },
  },

  // ── Real Estate Agents — personal brand ─────────────────────
  "real-estate": {
    archetype: "personal-brand",
    paletteShifts: {
      primary: "#1e293b",    // navy authority
      accent: "#dc2626",     // signature red
    },
    heroContext: {
      urgency: "ready-to-list",
      proof: "recent-sales",
      tagline: "Local market. National network. Your move.",
    },
    imagery: {
      heroSubject: "Agent portrait with neighborhood backdrop, environmental light",
      sectionAccents: ["recent listings carousel", "testimonial quotes", "market reports"],
    },
  },
};

/**
 * Return the design override for a given niche slug, falling back to a sensible
 * default if no override exists yet.
 */
export function getNicheDesign(slug: string): NicheDesignOverride {
  return (
    NICHE_DESIGN[slug] || {
      archetype: "urgent-trade",
      heroContext: {
        urgency: "general",
        proof: "general-trust",
      },
    }
  );
}
