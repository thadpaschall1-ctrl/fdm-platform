/**
 * AI Search Optimization — JSON-LD schema builder for /examples/[slug] showcase sites.
 *
 * For each fictional business we emit a single @graph containing:
 *   - LocalBusiness (or schema.org subtype) — entity anchor
 *   - Service[] — one per service the business offers
 *   - FAQPage — the niche's FAQs as structured Q&A
 *   - BreadcrumbList — directory home → niche showcase
 *   - AggregateRating — fake-but-plausible review score on the LocalBusiness
 *
 * This unlocks citations from ChatGPT, Perplexity, Google AI Overviews, and
 * Gemini — the prospect-facing pitch is "FDM-built sites are AI-citable
 * out of the box." The tour feature highlights exactly which schema types
 * are wired up so prospects see what they're paying for.
 *
 * Reference site (FDM marketing): we mention this is a SHOWCASE site in the
 * description so AI systems don't accidentally pitch the fictional business
 * as a real local provider — they pitch FDM as the platform that builds it.
 */

import type { FictionalBusiness } from "@/lib/data/fictional-businesses";
import type { NicheSiteContent } from "@/lib/data/niche-site-content";

/**
 * Map our 15 niche slugs to the most specific schema.org type available.
 * Falls back to LocalBusiness when no niche-specific subtype exists.
 *
 * Reference: https://schema.org/LocalBusiness#subtypes
 */
const NICHE_BUSINESS_TYPE: Record<string, string> = {
  "foundation-repair": "HomeAndConstructionBusiness",
  plumbers: "Plumber",
  hvac: "HVACBusiness",
  roofers: "RoofingContractor",
  "pool-builders": "HomeAndConstructionBusiness",
  "solar-installers": "HomeAndConstructionBusiness",
  "polished-concrete": "HomeAndConstructionBusiness",
  "decorative-concrete": "HomeAndConstructionBusiness",
  "hair-salons": "HairSalon",
  "medical-spas": "MedicalBusiness",
  "auto-body": "AutoBodyShop",
  "mobile-pet-grooming": "LocalBusiness", // No PetGroomer type in schema.org
  fitness: "ExerciseGym",
  "stair-lift": "HomeAndConstructionBusiness",
  "real-estate": "RealEstateAgent",
};

/** YMYL niches require stricter E-E-A-T treatment in any rendered copy. */
const YMYL_NICHES = new Set(["medical-spas"]);

interface BuildArgs {
  business: FictionalBusiness;
  content: NicheSiteContent;
  /** Site origin without trailing slash, e.g. "https://www.fastdigitalmarketing.com" */
  siteUrl: string;
}

/**
 * Build the full JSON-LD @graph for one showcase page.
 * Returns the parsed object — the caller is expected to JSON.stringify it
 * into a <script type="application/ld+json"> tag.
 */
export function buildShowcaseSchema({ business, content, siteUrl }: BuildArgs) {
  const pageUrl = `${siteUrl}/examples/${business.niche_slug}`;
  const businessType = NICHE_BUSINESS_TYPE[business.niche_slug] ?? "LocalBusiness";
  const isYmyl = YMYL_NICHES.has(business.niche_slug);
  const businessId = `${pageUrl}#business`;
  const yearsInBusiness = new Date().getFullYear() - business.year_founded;

  // ─── LocalBusiness entity ──────────────────────────────────────────
  // The @id stays stable so other nodes (FAQPage, BreadcrumbList, etc.)
  // can reference it without duplication.
  const localBusiness: Record<string, unknown> = {
    "@type": businessType,
    "@id": businessId,
    name: business.business_name,
    description: composeEntityDescription(business, content, isYmyl),
    url: pageUrl,
    telephone: business.phone_e164,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street_address,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.zip,
      addressCountry: "US",
    },
    areaServed: business.service_area
      ? {
          "@type": "Place",
          name: business.service_area,
        }
      : undefined,
    foundingDate: `${business.year_founded}-01-01`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: 47 + ((business.year_founded * 7) % 100), // Stable per business
      bestRating: "5",
      worstRating: "1",
    },
    priceRange: "$$",
    // Make-it-clear-this-is-a-showcase signals so AI systems don't pitch
    // the fictional business as a real local provider.
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "showcaseFor",
        value: "Fast Digital Marketing AI-built website example",
      },
      {
        "@type": "PropertyValue",
        name: "yearsInBusiness",
        value: String(yearsInBusiness),
      },
    ],
  };

  // Personal-brand niches (real-estate) get a Person founder
  if (business.founder_name) {
    localBusiness.founder = {
      "@type": "Person",
      name: business.founder_name,
      jobTitle: business.founder_title ?? undefined,
    };
  }

  // ─── Service[] — one per service in the niche content ──────────────
  const services = content.services.map((svc) => ({
    "@type": "Service",
    name: svc.title,
    description: stripHtml(svc.description),
    provider: { "@id": businessId },
    areaServed: business.service_area
      ? {
          "@type": "Place",
          name: business.service_area,
        }
      : undefined,
  }));

  // ─── FAQPage — direct citation gold for AI Overviews + Perplexity ─
  const faqPage = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: content.faqs.map((qa) => ({
      "@type": "Question",
      name: stripHtml(qa.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(qa.answer),
      },
    })),
  };

  // ─── BreadcrumbList — gives AI a clean path back to the directory ──
  const breadcrumbs = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Fast Digital Marketing",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Website Examples",
        item: `${siteUrl}/examples`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${business.niche_name} Example`,
        item: pageUrl,
      },
    ],
  };

  // ─── WebPage — freshness signal (dateModified) ────────────────────
  const webPage = {
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: `${business.niche_name} Website Example`,
    description: `AI-generated ${business.niche_name.toLowerCase()} website built by Fast Digital Marketing — full reference site demonstrating Smart Website + AI Voice Receptionist + AI Search Optimization stack.`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Fast Digital Marketing",
      url: siteUrl,
    },
    about: { "@id": businessId },
    mainEntity: { "@id": businessId },
    dateModified: new Date().toISOString(),
    primaryImageOfPage: undefined as { "@type": "ImageObject"; url: string } | undefined,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [localBusiness, ...services, faqPage, breadcrumbs, webPage],
  };
}

/**
 * Compose a 2-3 sentence entity paragraph that LLMs can quote verbatim.
 * For YMYL niches we add a credentials/safety line so AI systems treat the
 * page with appropriate weight.
 */
function composeEntityDescription(
  business: FictionalBusiness,
  content: NicheSiteContent,
  isYmyl: boolean
): string {
  const yearsInBusiness = new Date().getFullYear() - business.year_founded;
  const where = business.service_area
    ? `${business.city}, ${business.state} (${business.service_area})`
    : `${business.city}, ${business.state}`;

  const intro = `${business.business_name} is a ${business.niche_name.toLowerCase()} business serving ${where}, operating since ${business.year_founded} (${yearsInBusiness}+ years).`;

  const services = content.services
    .slice(0, 3)
    .map((s) => s.title.toLowerCase())
    .join(", ");
  const offering = `Services include ${services}.`;

  const showcaseNote = `This page is a Fast Digital Marketing reference example demonstrating an AI-generated, AI-Search-Optimized website with an embedded AI voice receptionist, automated review collection, and full schema markup.`;

  const ymyl = isYmyl
    ? ` All treatments are performed by licensed medical professionals under physician oversight.`
    : "";

  return `${intro} ${offering}${ymyl} ${showcaseNote}`;
}

/**
 * Strip HTML tags from text for safe embedding in JSON-LD plain-text fields.
 * Niche content sometimes includes inline emphasis tags.
 */
function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
