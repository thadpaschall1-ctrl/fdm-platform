import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFictionalBusiness, listFictionalBusinesses } from "@/lib/data/fictional-businesses";
import { ExampleSite } from "@/components/preview/example-site";

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
  return {
    title: `${business.niche_name} Website Example | Fast Digital Marketing`,
    description: `Example ${business.niche_name.toLowerCase()} website built by Fast Digital Marketing. AI-generated, niche-specific design with all FDM tools embedded.`,
    alternates: {
      canonical: `https://www.fastdigitalmarketing.com/examples/${slug}`,
    },
    openGraph: {
      title: `${business.niche_name} Website Example | Fast Digital Marketing`,
      description: `See what an AI-built ${business.niche_name.toLowerCase()} website looks like with FDM's full service stack.`,
      url: `https://www.fastdigitalmarketing.com/examples/${slug}`,
      type: "website",
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

  return <ExampleSite business={business} />;
}
