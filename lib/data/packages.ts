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

export interface PackageFeature {
  /** Short label displayed on the pricing card */
  label: string;
  /**
   * Plain-English explainer shown in an (i) tooltip when the user taps the icon.
   * Written at a 9th-grade reading level for blue-collar contractors.
   * Undefined = no tooltip (feature is self-evident).
   */
  explainer?: string;
}

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
  features: PackageFeature[];
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
      {
        label: "1–3 pages (home, about, contact)",
        explainer: "A small website with up to 3 pages. Enough to tell folks who you are, what you do, and how to reach you. Basic is a simple online brochure — if you want the phone ringing, step up to Smart Website.",
      },
      {
        label: "Up to 750 words of professional copy",
        explainer: "We write the words on your website for you. 750 words is enough to cover your services, your experience, and why people should hire you. You don't write a thing.",
      },
      {
        label: "Mobile-optimized, fast-loading",
        explainer: "Your site works perfectly on phones, tablets, and computers — loads in under 2 seconds. Shows up looking sharp no matter how someone finds you.",
      },
      {
        label: "Your phone number + email displayed clearly",
        explainer: "Your phone and email are shown in big, easy-to-read type so customers can reach out on their own. No tap-to-call button — that's on Smart Website. Basic is a static business card online.",
      },
      {
        label: "SSL security + hosting + daily backups",
        explainer: "Your site shows that little padlock in the browser (people trust it more), it's hosted on our servers (nothing for you to manage), and we save a copy every single day. If anything ever breaks, we have you back online in minutes.",
      },
      {
        label: "Custom domain connection (or free subdomain)",
        explainer: "Your site can live at YourCompany.com if you already own a web address. If you don't, we give you a free one like YourCompany.fdmsites.com so you can get started right now without buying anything.",
      },
      {
        label: "Help Center with 100+ step-by-step guides",
        explainer: "Any question you could have is already answered in a library with screenshots and click-by-click instructions. Plus an AI assistant that finds the right answer in seconds.",
      },
      {
        label: "Live in 5 business days",
        explainer: "You sign up Monday, your website is live by Friday. No months of back-and-forth. No meetings. We build it, you review it, we publish it.",
      },
    ],
    limits: [
      "Content updates available with paid support or by upgrading to Smart Website",
      "2 GB storage for photos",
    ],
  },
  {
    slug: "smart",
    name: "Smart Website",
    priceMonthly: 197,
    priceAnnual: 1970,
    tagline: "Everything in Basic plus the growth engine.",
    highlighted: true,
    features: [
      {
        label: "Everything in Basic",
      },
      {
        label: "Click-to-call button",
        explainer: "On a phone, folks just tap one button and it calls you — no typing numbers. Sounds small, but it means 3x more people actually pick up the phone to hire you. Included in Smart and up.",
      },
      {
        label: "Contact + lead capture forms with email & SMS alerts",
        explainer: "Forms on your site that grab a lead's name, phone, and what they need — then text AND email you the second somebody fills one out. First one to call back wins the job. Speed matters.",
      },
      {
        label: "Self-service dashboard — edit anything, anytime",
        explainer: "A simple login to change anything on your site yourself — hours, phone number, photos, prices, services, you name it. Takes 30 seconds per change, no phone calls to us needed. Most folks never have to contact support at all.",
      },
      {
        label: "Up to 15 pages",
        explainer: "A bigger site — room for every single service you offer, a FAQ page, testimonials, photos of your work, a blog, and more. Plenty of space to grow into.",
      },
      {
        label: "Up to 3,000 words of professional copy",
        explainer: "We write up to 3,000 words for you — enough to cover every service in real depth, plus the kind of pages that actually help you show up on Google.",
      },
      {
        label: "Keyword Research Engine — 50 local keywords",
        explainer: "We find 50 Google search phrases that people in your area are actually typing — ones your competitors are ignoring — so you can show up higher with less work. Think 'foundation crack repair Tulsa' or 'emergency plumber Ada' — real words customers use.",
      },
      {
        label: "New AI-written blog post every week",
        explainer: "Every week we publish a new article on your site, targeting one of those keywords. Over a year that's 52 brand-new pages helping you get found on Google. You approve each one from your dashboard before it goes live.",
      },
      {
        label: "FAQ that grows on its own",
        explainer: "When your customers ask questions we haven't answered yet, we add those questions and answers to your FAQ page automatically. Your site gets smarter every week — you never have to type a word.",
      },
      {
        label: "AI search optimization (ChatGPT, Perplexity, Google AI)",
        explainer: "People don't just Google anymore — they ask ChatGPT, Perplexity, and Google's new AI answers. We set up your site so those AI tools recommend your business when people ask about what you do. It's how you get found in the next 5 years.",
      },
      {
        label: "Advanced schema markup",
        explainer: "Special hidden code we add to your site that helps Google understand what you do. That's how your business shows up with stars, hours, prices, and the map pin on Google instead of just a blue link. It's free traffic other folks leave on the table.",
      },
      {
        label: "Monthly performance report",
        explainer: "A one-page summary emailed to you every month. Shows how many people visited, how many became leads, which Google searches are bringing you business, and where you rank. No jargon — just the numbers that matter.",
      },
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
    priceMonthly: 297,
    priceAnnual: 2970,
    tagline: "Never miss a lead. Holland answers 24/7.",
    features: [
      {
        label: "Everything in Smart Website",
      },
      {
        label: "24/7 AI Voice Receptionist (Holland)",
        explainer: "Holland is an AI that answers your phone — day, night, weekends, holidays. She sounds like a real person. She never takes a break, never calls in sick, and never sends a caller to voicemail. Every call gets handled.",
      },
      {
        label: "Niche-trained knowledge base",
        explainer: "Holland knows YOUR business — your services, your pricing, your hours, what makes you different from the other guy. She's not a generic robot; she's been trained on everything a customer of yours would ask.",
      },
      {
        label: "Dedicated business phone number",
        explainer: "A brand-new phone number just for your business that we set up for you. Calls and texts both come in to Holland. You put it on your truck, your business cards, your Google listing — wherever.",
      },
      {
        label: "Knowledge base auto-updates from your site",
        explainer: "When you change something on your website — new service, different hours, a price change — Holland learns it automatically within minutes. You never have to update her separately. One change, everywhere.",
      },
      {
        label: "SMS booking confirmations",
        explainer: "When Holland books an appointment, the customer gets a text right away confirming the date and time. Fewer no-shows, fewer people forgetting their appointment, fewer headaches for you.",
      },
      {
        label: "Guided Google Business Profile setup (normally $97)",
        explainer: "Your Google Business Profile is that big listing with stars, photos, and the map that people see before your website — 70% of your customers look there first. We help you claim it, fill it in, and make it look good. Included free with this plan.",
      },
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
      {
        label: "Everything in Smart Site + Voice",
      },
      {
        label: "Review Autopilot — automatic review requests",
        explainer: "After you finish a job, we automatically text your customer asking for a Google review. Happy customers go straight to Google (and boost your stars). If somebody's unhappy, they come to you privately first so you can fix it before they blast you online. This is how shops end up with 500+ 5-star reviews.",
      },
      {
        label: "New-Client Nurture drips (SMS + email)",
        explainer: "When somebody fills out your lead form but doesn't book yet, we automatically text and email them over the next few weeks — friendly reminders, helpful tips, a soft nudge to book. Most folks need 3–5 touches before they hire you. We do all of them for you.",
      },
      {
        label: "Local SEO & AI Search content strategy",
        explainer: "The full playbook to get you ranked on Google Maps, regular Google search, AND the new AI search engines. Citations built (mentions of your business on other sites), content published regularly, schema maintained — all of it, ongoing, no effort from you.",
      },
      {
        label: "Guided Google Business Profile setup included",
        explainer: "Same as Smart+Voice — we help you claim and set up your Google Business Profile. Normally $97, included free.",
      },
      {
        label: "Priority AI support in dashboard",
        explainer: "Faster response from our AI support assistant, plus your support requests get bumped to the front of the line if anything needs human eyes.",
      },
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
