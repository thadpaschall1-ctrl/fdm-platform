/**
 * UNIFIED PRICING — single source of truth across every industry page,
 * the /pricing page, Stripe SKU generation, and the Holland voice prompt.
 *
 * Change a price HERE → updates across all 34 industry pages instantly.
 *
 * Philosophy:
 *   - All services AI-delivered, no human intervention
 *   - Fully automated from signup to site-live
 *   - Dashboard-driven self-service (no account managers, no monthly calls)
 *   - All caps published in TOS to protect margins
 */

export type PackageSlug = "basic" | "smart" | "voice" | "full";

export interface PackageTier {
  slug: PackageSlug;
  name: string;
  /** Monthly price in whole dollars */
  priceMonthly: number;
  /** Annual price = 10 months (pay-10-get-12) */
  priceAnnual: number;
  /** One-liner shown under the tier name on the pricing card */
  tagline: string;
  /** Bullet list shown on pricing cards + industry page feature lists */
  features: string[];
  /** Fine-print caps that appear in TOS + dashboard usage meters */
  limits: string[];
  /** Visually highlight this tier as "recommended" on the pricing card */
  highlighted?: boolean;
  /** Stripe price IDs — filled in after `scripts/create-stripe-products.ts` runs */
  stripeMonthlyPriceId?: string;
  stripeAnnualPriceId?: string;
}

export interface AddOn {
  slug: string;
  name: string;
  price: number;
  unit: "monthly" | "annual" | "one-time";
  description: string;
  /** Which tiers can purchase this add-on (empty = all tiers) */
  availableFor?: PackageSlug[];
  /** If true, this add-on is INCLUDED free with the listed tiers and only sold standalone below them */
  bundledWith?: PackageSlug[];
  stripePriceId?: string;
}

// ═══════════════════════════════════════════════════════════════════
// The 4 tiers
// ═══════════════════════════════════════════════════════════════════

export const UNIFIED_PACKAGES: PackageTier[] = [
  {
    slug: "basic",
    name: "Basic Website",
    priceMonthly: 47,
    priceAnnual: 470,
    tagline: "Professional web presence, built and hosted for you.",
    features: [
      "1–3 pages (home, about, contact)",
      "Up to 750 words of professional copy",
      "Mobile-optimized, fast-loading",
      "Contact form with email alerts",
      "Click-to-call button",
      "SSL security + hosting + daily backups",
      "Custom domain connection (or free subdomain)",
      "Self-service dashboard",
      "Help Center access (100+ how-to guides)",
      "Live in 5 business days",
    ],
    limits: [
      "Up to 15 content updates/month via dashboard",
      "5 GB storage for photos and documents",
    ],
  },
  {
    slug: "smart",
    name: "Smart Website",
    priceMonthly: 147,
    priceAnnual: 1470,
    tagline: "Everything in Basic plus the growth engine.",
    highlighted: true,
    features: [
      "Everything in Basic",
      "Up to 15 pages",
      "Up to 3,000 words of professional copy",
      "Keyword Research Engine — 50 low-competition keywords for your market",
      "New AI-written blog post every week (4/month)",
      "FAQ that auto-expands from real customer questions",
      "AI search optimization (ChatGPT, Perplexity, Google AI Overviews)",
      "Advanced schema markup",
      "Lead capture forms with instant alerts",
      "Monthly performance report",
    ],
    limits: [
      "4 blog posts/month included (upgrade: Content Velocity add-on)",
      "50 keywords/quarter refresh",
      "10 GB storage",
    ],
  },
  {
    slug: "voice",
    name: "Smart Site + Voice",
    priceMonthly: 247,
    priceAnnual: 2470,
    tagline: "Never miss a lead. Holland answers 24/7.",
    features: [
      "Everything in Smart Website",
      "24/7 AI Voice Receptionist (Holland)",
      "Niche-trained knowledge base",
      "Dedicated business phone number",
      "Auto-updated knowledge base from your site",
      "SMS booking confirmations",
      "Guided Google Business Profile Setup included (normally $97)",
    ],
    limits: [
      "1,000 inbound minutes/month ($0.12/min overage)",
      "1,000 outbound SMS/month ($0.02/msg overage)",
      "Fair-use: 500 calls/month soft cap",
    ],
  },
  {
    slug: "full",
    name: "Full Stack",
    priceMonthly: 397,
    priceAnnual: 3970,
    tagline: "The entire growth engine on autopilot.",
    features: [
      "Everything in Smart Site + Voice",
      "Review Autopilot — automated review requests after every job",
      "New-Client Nurture drips (SMS + email)",
      "Local SEO & AI Search content strategy",
      "Guided Google Business Profile Setup included",
      "Priority AI support in dashboard",
    ],
    limits: [
      "3,000 outbound SMS/month",
      "1,000 active nurture sequences",
      "20 GB storage",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════
// Add-Ons — optional, single-click, never forced
// ═══════════════════════════════════════════════════════════════════

export const ADD_ONS: AddOn[] = [
  {
    slug: "domain",
    name: "Buy a domain through us",
    price: 17,
    unit: "annual",
    description: "Auto-registered via our registrar partners. No DNS setup — we handle everything. Renews automatically.",
  },
  {
    slug: "content-velocity",
    name: "Content Velocity",
    price: 97,
    unit: "monthly",
    description: "4 additional AI-written blog posts per month (8 total), plus expanded keyword research (150 keywords vs. 50).",
    availableFor: ["smart", "voice", "full"],
  },
  {
    slug: "client-reactivation",
    name: "Client Reactivation",
    price: 147,
    unit: "monthly",
    description:
      "Automated dormant-customer drip campaigns. Identifies inactive customers in your CRM and brings them back via SMS + email. Available for dental, chiro, medspa, HVAC, pool, auto, salon, and fitness niches.",
    availableFor: ["smart", "voice", "full"],
  },
  {
    slug: "guided-gbp-setup",
    name: "Guided Google Business Profile Setup",
    price: 97,
    unit: "one-time",
    description:
      "We pre-fill your Google Business Profile with everything we scraped, guide you through Google's verification, and sync hours + services + photos. Included free with Smart Site + Voice and Full Stack.",
    bundledWith: ["voice", "full"],
  },
];

// ═══════════════════════════════════════════════════════════════════
// Lookup helpers (used by pricing page, industry pages, Holland prompt)
// ═══════════════════════════════════════════════════════════════════

export function getPackage(slug: PackageSlug): PackageTier {
  const tier = UNIFIED_PACKAGES.find((p) => p.slug === slug);
  if (!tier) throw new Error(`Unknown package slug: ${slug}`);
  return tier;
}

export function getAddOn(slug: string): AddOn | undefined {
  return ADD_ONS.find((a) => a.slug === slug);
}

/** Add-ons available for a given tier (filters bundled + availability) */
export function addOnsForTier(slug: PackageSlug): AddOn[] {
  return ADD_ONS.filter((a) => {
    if (a.availableFor && !a.availableFor.includes(slug)) return false;
    if (a.bundledWith?.includes(slug)) return false; // already included free
    return true;
  });
}

/** Shorthand for marketing copy — "$470/year (2 months free)" */
export function annualSavingsLabel(tier: PackageTier): string {
  return `$${tier.priceAnnual}/year (2 months free)`;
}
