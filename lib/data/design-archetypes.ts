/**
 * Design Archetypes for the FDM AI site generator.
 *
 * Per Thad's design philosophy (memory: project_fdm_design_philosophy.md), every
 * AI-generated FDM site must look distinct per niche. The strategy is:
 *
 *   1. Map each niche → one of 7 archetypes (broad visual language)
 *   2. Apply per-niche overrides (color shifts, copy tone, photography hints)
 *   3. Composer renders archetype + niche overrides + business data → final site
 *
 * This file defines the 7 archetypes. Niche mappings + overrides live in
 * `niche-design.ts`. Per-niche industry copy (painPoints/solutions/etc.) lives
 * in `industries.ts`.
 */

export type ArchetypeId =
  | "urgent-trade"          // foundation, plumber, HVAC, roofer, garage door, restoration
  | "premium-outdoor-living" // pool, deck, paver, outdoor lighting, screen enclosure
  | "b2b-commercial"         // polished concrete, commercial pressure, IT/MSP, B2B services
  | "visual-pinterest"       // decorative concrete, hair salons, med spas, photography
  | "health-wellness"        // chiropractors (GYCP only), fitness, weight loss
  | "aging-in-place"         // stair lift, senior bath, home health, mobile vet, biohazard
  | "personal-brand";        // real estate, business consultants, photographers, financial

export interface DesignArchetype {
  id: ArchetypeId;
  /** Human-readable name shown in admin/preview tools */
  label: string;
  /** One-line summary of the visual language */
  feel: string;

  // ── Visual primitives ────────────────────────────────────────────
  /** Tailwind color tokens. Hex values so we can use arbitrary classes. */
  palette: {
    /** Page background */
    background: string;
    /** Body text default */
    foreground: string;
    /** Muted background (cards, sections) */
    surface: string;
    /** Muted text */
    muted: string;
    /** Subtle border */
    border: string;
    /** Primary brand color (hero, primary CTA) */
    primary: string;
    /** Primary contrast (text on primary) */
    primaryFg: string;
    /** Accent / secondary action */
    accent: string;
    /** Optional second accent for splits */
    accent2?: string;
  };

  /** Typography pairings — Google Fonts names */
  typography: {
    /** Headers */
    display: string;
    /** Body */
    body: string;
    /** Optional accent face for special use (numerals, eyebrow) */
    accent?: string;
  };

  /** Layout primitives — composer reads these to switch component variants */
  layout: {
    /** "centered" | "split-left" | "split-right" | "asymmetric" */
    heroAlignment: "centered" | "split-left" | "split-right" | "asymmetric";
    /** Body content width tier — narrow=600px, normal=900px, wide=1200px, full=1440px */
    contentWidth: "narrow" | "normal" | "wide" | "full";
    /** "minimal" | "card" | "data-dense" — section style for body sections */
    sectionDensity: "minimal" | "card" | "data-dense";
    /** "subtle" | "bold" | "fluid" — animation/motion language */
    motion: "subtle" | "bold" | "fluid";
  };

  /** CTA personality */
  cta: {
    /** "sticky-bottom" | "header" | "embedded" — primary CTA placement */
    primaryPlacement: "sticky-bottom" | "header" | "embedded";
    /** "phone-first" | "form-first" | "appointment-first" */
    style: "phone-first" | "form-first" | "appointment-first";
  };

  /** Hero treatment */
  hero: {
    /** "before-after" | "lifestyle" | "data" | "portrait" | "video-bg" | "drone" | "minimal" */
    style: "before-after" | "lifestyle" | "data" | "portrait" | "video-bg" | "drone" | "minimal";
    /** "panic" | "calm" | "premium" | "professional" | "sensitive" | "energetic" — copy voice */
    tone: "panic" | "calm" | "premium" | "professional" | "sensitive" | "energetic";
  };
}

// ─────────────────────────────────────────────────────────────────────
// Archetype definitions
// ─────────────────────────────────────────────────────────────────────

export const ARCHETYPES: Record<ArchetypeId, DesignArchetype> = {
  // ── Urgent Trade ───────────────────────────────────────────────
  // Foundation crack at 11pm, no AC at noon, water leaking now.
  // Bold geometric, color-saturated, primary CTA always visible,
  // before/after evidence, emergency-tinged copy.
  "urgent-trade": {
    id: "urgent-trade",
    label: "Urgent Trade",
    feel: "Bold, geometric, primary-CTA-always-visible. Reassures someone in panic mode.",
    palette: {
      background: "#0b1120",
      foreground: "#f1f5f9",
      surface: "#0f1729",
      muted: "#94a3b8",
      border: "#1e293b",
      primary: "#dc2626",       // urgent red
      primaryFg: "#ffffff",
      accent: "#fbbf24",        // amber attention
      accent2: "#0ea5e9",       // calming blue counterweight
    },
    typography: {
      display: "Archivo",       // condensed bold geometric
      body: "Inter",
      accent: "JetBrains Mono", // for response-time stats
    },
    layout: {
      heroAlignment: "split-left",
      contentWidth: "wide",
      sectionDensity: "card",
      motion: "bold",
    },
    cta: { primaryPlacement: "sticky-bottom", style: "phone-first" },
    hero: { style: "before-after", tone: "panic" },
  },

  // ── Premium Outdoor Living ─────────────────────────────────────
  // Pool, deck, hardscape — long sales cycles, design-forward, drone-photo hero,
  // earth tones, magazine-style storytelling.
  "premium-outdoor-living": {
    id: "premium-outdoor-living",
    label: "Premium Outdoor Living",
    feel: "Magazine spread. Drone photography hero dominates the page. Slower scroll-driven reveal.",
    palette: {
      background: "#fafaf9",
      foreground: "#1c1917",
      surface: "#f5f5f4",
      muted: "#78716c",
      border: "#e7e5e4",
      primary: "#0f766e",       // deep teal — water/earth
      primaryFg: "#ffffff",
      accent: "#ca8a04",        // warm gold
    },
    typography: {
      display: "Playfair Display",
      body: "Source Sans 3",
    },
    layout: {
      heroAlignment: "centered",   // full-bleed banner — image leads, text below
      contentWidth: "wide",
      sectionDensity: "minimal",
      motion: "fluid",
    },
    cta: { primaryPlacement: "embedded", style: "appointment-first" },
    hero: { style: "drone", tone: "premium" },
  },

  // ── B2B Commercial ─────────────────────────────────────────────
  // Polished concrete, commercial pressure, IT/MSP, B2B advisory.
  // Stat-heavy, case-study-forward, corporate blue, multi-column data.
  "b2b-commercial": {
    id: "b2b-commercial",
    label: "B2B Commercial",
    feel: "Stat-card hero, performance-data tables, case-study-driven. Speaks to facility managers and procurement.",
    palette: {
      background: "#ffffff",
      foreground: "#0f172a",
      surface: "#f8fafc",
      muted: "#475569",
      border: "#e2e8f0",
      primary: "#1d4ed8",       // corporate blue
      primaryFg: "#ffffff",
      accent: "#0891b2",        // technical cyan
    },
    typography: {
      display: "IBM Plex Sans",
      body: "Inter",
      accent: "IBM Plex Mono",
    },
    layout: {
      heroAlignment: "split-right",
      contentWidth: "wide",
      sectionDensity: "data-dense",
      motion: "subtle",
    },
    cta: { primaryPlacement: "header", style: "form-first" },
    hero: { style: "data", tone: "professional" },
  },

  // ── Visual / Pinterest Design ──────────────────────────────────
  // Decorative concrete, hair salons, med spas, photography.
  // Pastel/warm, masonry image grids, video hero, font-as-personality.
  "visual-pinterest": {
    id: "visual-pinterest",
    label: "Visual / Pinterest",
    feel: "Masonry image grid. Whitespace. Font pairing IS the brand.",
    palette: {
      background: "#fffbf5",
      foreground: "#27272a",
      surface: "#fef3e8",
      muted: "#71717a",
      border: "#f4e7d3",
      primary: "#a21caf",       // muted plum
      primaryFg: "#ffffff",
      accent: "#e11d48",        // rose
    },
    typography: {
      display: "Cormorant Garamond",
      body: "Lato",
    },
    layout: {
      heroAlignment: "centered",
      contentWidth: "wide",
      sectionDensity: "minimal",
      motion: "fluid",
    },
    cta: { primaryPlacement: "embedded", style: "appointment-first" },
    hero: { style: "lifestyle", tone: "premium" },
  },

  // ── Health & Wellness ──────────────────────────────────────────
  // Fitness, weight loss, med spas (overlap), wellness clinics.
  // Calm/muted, photography-driven, soft motion, testimonial-forward.
  "health-wellness": {
    id: "health-wellness",
    label: "Health & Wellness",
    feel: "Calm, photography-driven, testimonial cards lead. Soft, body-forward.",
    palette: {
      background: "#f8fafc",
      foreground: "#0f172a",
      surface: "#f1f5f9",
      muted: "#64748b",
      border: "#e2e8f0",
      primary: "#0d9488",       // wellness teal
      primaryFg: "#ffffff",
      accent: "#84cc16",        // life green
    },
    typography: {
      display: "Fraunces",
      body: "Manrope",
    },
    layout: {
      heroAlignment: "split-right",
      contentWidth: "normal",
      sectionDensity: "card",
      motion: "subtle",
    },
    cta: { primaryPlacement: "embedded", style: "appointment-first" },
    hero: { style: "lifestyle", tone: "calm" },
  },

  // ── Aging-in-Place / Sensitive ─────────────────────────────────
  // Stair lift, senior bath, home health, biohazard.
  // Accessibility-first, large fonts, high contrast, dignified imagery.
  "aging-in-place": {
    id: "aging-in-place",
    label: "Aging-in-Place",
    feel: "Accessibility-first. Large fonts. Dignified, never patronizing. Adult-child buyer.",
    palette: {
      background: "#fffbf5",
      foreground: "#1c1917",
      surface: "#faf5eb",
      muted: "#57534e",
      border: "#e7e0d2",
      primary: "#7c2d12",       // warm umber
      primaryFg: "#ffffff",
      accent: "#0369a1",        // trust blue
    },
    typography: {
      display: "Lora",
      body: "Source Sans 3",
    },
    layout: {
      heroAlignment: "centered",
      contentWidth: "narrow",
      sectionDensity: "card",
      motion: "subtle",
    },
    cta: { primaryPlacement: "embedded", style: "phone-first" },
    hero: { style: "lifestyle", tone: "sensitive" },
  },

  // ── Personal Brand Service ─────────────────────────────────────
  // Real estate agents, business consultants, photographers, financial advisors.
  // Portrait-heavy hero, story-forward, bio-driven, testimonial weight.
  "personal-brand": {
    id: "personal-brand",
    label: "Personal Brand",
    feel: "Portrait-heavy hero. Founder/agent IS the product. Story-forward.",
    palette: {
      background: "#0a0a0a",
      foreground: "#fafafa",
      surface: "#171717",
      muted: "#a3a3a3",
      border: "#262626",
      primary: "#e2b714",       // signature gold
      primaryFg: "#0a0a0a",
      accent: "#dc2626",        // bold red accent
    },
    typography: {
      display: "Bodoni Moda",
      body: "Inter",
    },
    layout: {
      heroAlignment: "split-right",
      contentWidth: "normal",
      sectionDensity: "card",
      motion: "fluid",
    },
    cta: { primaryPlacement: "embedded", style: "appointment-first" },
    hero: { style: "portrait", tone: "premium" },
  },
};

export function getArchetype(id: ArchetypeId): DesignArchetype {
  return ARCHETYPES[id];
}
