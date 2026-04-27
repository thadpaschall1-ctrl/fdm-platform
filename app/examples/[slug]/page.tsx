import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getFictionalBusiness,
  listFictionalBusinesses,
} from "@/lib/data/fictional-businesses";
import { getNicheSiteContent } from "@/lib/data/niche-site-content";
import { ExampleSite } from "@/components/preview/example-site";
import { ShowcaseBackLink } from "@/components/showcase-back-link";
import { ShowcaseTour } from "@/components/preview/showcase-tour";
import { ShowcaseExplainer } from "@/components/preview/showcase-explainer";
import { ShowcaseFAQ } from "@/components/preview/showcase-faq";
import { buildShowcaseSchema } from "@/lib/preview/showcase-schema";
import { getNichePalette } from "@/lib/preview/get-niche-palette";

const SITE_URL = "https://www.fastdigitalmarketing.com";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = getFictionalBusiness(slug);
  if (!business) {
    return { title: "Example not found", robots: { index: false, follow: false } };
  }
  const pageUrl = `${SITE_URL}/examples/${slug}`;
  const title = `${business.niche_name} Website Example — AI-Built by Fast Digital Marketing`;
  const description = `Live reference site for an AI-built ${business.niche_name.toLowerCase()} website. Includes Smart Website, AI Voice Receptionist, AI Search Optimization, Review Autopilot. Demonstrates the full Fast Digital Marketing stack.`;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      siteName: "Fast Digital Marketing",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    other: {
      // Hint to AI crawlers that this is a showcase / reference example, not
      // a real local business page they should pitch as a service provider.
      "ai-content-type": "showcase-reference",
      "ai-pitch-target": "Fast Digital Marketing platform",
    },
  };
}

export async function generateStaticParams() {
  return listFictionalBusinesses().map((b) => ({ slug: b.niche_slug }));
}

export default async function ExamplePage({ params }: PageProps) {
  const { slug } = await params;
  const business = getFictionalBusiness(slug);
  if (!business) notFound();

  const content = getNicheSiteContent(slug);
  const schema = buildShowcaseSchema({ business, content, siteUrl: SITE_URL });
  // Resolve the niche's merged palette so floating chrome (back-link, tour,
  // FAQ, explainer pills) inherits each business's brand colors instead of
  // looking generic-FDM-blue on every showcase.
  const palette = getNichePalette(slug);

  return (
    <>
      {/* AI Search Optimization: full @graph with LocalBusiness + Service[] +
          FAQPage + BreadcrumbList + WebPage. Citable by ChatGPT, Perplexity,
          Google AI Overviews, and Gemini. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ShowcaseBackLink palette={palette} />
      <ExampleSite business={business} />
      {/* Floating sales chrome — four niche-themed pills positioned around
          the page edges:
            top-left      ShowcaseExplainer  ("What is this?")
            top-right     ShowcaseBackLink   ("← FDM Demo")
            right-middle  ShowcaseFAQ        ("Business Owner?")
            bottom-right  ShowcaseTour       ("Tour this site · 8 stops")
          All four take the niche's `palette` so their borders, glows, icon
          gradients, and accent text adopt the business's brand identity.
          The voice demo is rendered INLINE inside the page (right after the
          editorial intro) via <ShowcaseVoiceSection>. */}
      <ShowcaseExplainer palette={palette} />
      <ShowcaseFAQ palette={palette} />
      <ShowcaseTour schema={schema} palette={palette} />
    </>
  );
}
