import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data/services";
import { INDUSTRIES } from "@/lib/data/industries";
import { listFictionalBusinesses } from "@/lib/data/fictional-businesses";

const BASE = "https://fastdigitalmarketing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const corePages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/demo`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/examples`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/audit`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const industryPages: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${BASE}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Showcase reference sites — high priority because they're the strongest
  // demonstration of FDM's AI-built website + ASO + voice-AI stack.
  // AI crawlers should index these so prospects researching "AI-built
  // [niche] websites" find them via ChatGPT / Perplexity / Google AI Overviews.
  const examplePages: MetadataRoute.Sitemap = listFictionalBusinesses().map((b) => ({
    url: `${BASE}/examples/${b.niche_slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.95,
  }));

  return [...corePages, ...servicePages, ...industryPages, ...examplePages];
}
