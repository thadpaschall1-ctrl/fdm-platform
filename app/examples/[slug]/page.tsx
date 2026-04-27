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
import { ShowcaseVoiceWidget } from "@/components/preview/showcase-voice-widget";
import { ShowcaseExplainer } from "@/components/preview/showcase-explainer";
import { ShowcaseFAQ } from "@/components/preview/showcase-faq";
import { buildShowcaseSchema } from "@/lib/preview/showcase-schema";

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

  return (
    <>
      {/* AI Search Optimization: full @graph with LocalBusiness + Service[] +
          FAQPage + BreadcrumbList + WebPage. Citable by ChatGPT, Perplexity,
          Google AI Overviews, and Gemini. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ShowcaseBackLink />
      <ExampleSite business={business} />
      {/* Floating sales chrome — five interactive elements positioned around
          the page edges so they don't compete with each other:
            top-left      ShowcaseExplainer  ("Preview · What is this?")
            top-right     ShowcaseBackLink   ("← Demo by FDM")  (above)
            left-middle   ShowcaseFAQ        ("Business Owner?")
            bottom-left   ShowcaseTour       ("Tour this site")
            bottom-right  ShowcaseVoiceWidget ("Talk to Holland") */}
      <ShowcaseExplainer />
      <ShowcaseFAQ />
      <ShowcaseTour schema={schema} />
      <ShowcaseVoiceWidget
        nicheSlug={business.niche_slug}
        nicheName={business.niche_name}
        businessName={business.business_name}
      />
    </>
  );
}
