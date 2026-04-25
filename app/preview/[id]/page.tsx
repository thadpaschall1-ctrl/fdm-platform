import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolvePreviewId, listAllPreviews } from "@/lib/preview/load-business";
import { PreviewSite } from "@/components/preview/preview-site";

export const dynamic = "force-static"; // Pre-rendered at build, fast page loads

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const resolved = resolvePreviewId(id);
  if (!resolved) {
    return { title: "Preview not found", robots: { index: false, follow: false } };
  }
  return {
    title: `${resolved.business.business_name} — Preview by Fast Digital Marketing`,
    description: `AI-generated site preview for ${resolved.business.business_name} (${resolved.business.niche_name}, ${resolved.business.city}).`,
    robots: { index: false, follow: false }, // Previews are internal-only
  };
}

export async function generateStaticParams() {
  return listAllPreviews().map((p) => ({ id: p.previewId }));
}

export default async function PreviewPage({ params }: PageProps) {
  const { id } = await params;
  const resolved = resolvePreviewId(id);
  if (!resolved) notFound();

  return <PreviewSite business={resolved.business} />;
}
