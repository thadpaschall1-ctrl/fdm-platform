/**
 * Generic business website scraper for onboarding.
 * Works for any industry — chiro, plumber, attorney, security firm, agency.
 * Mirrors leadgen-platform/lib/onboarding/scrape-business.ts.
 */

import Anthropic from "@anthropic-ai/sdk";

export interface ScrapedBusiness {
  business_name: string | null;
  owner_name: string | null;
  owner_credentials: string | null;
  short_description: string | null;
  phone: string | null;
  email: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  service_area: string | null;
  hours: string | null;
  services: Array<{ name: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  testimonials: Array<{ name: string; quote: string }>;
  team: Array<{ name: string; title: string; bio: string }>;
  certifications: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  yelp_url: string | null;
  bbb_url: string | null;
  raw_markdown_chars: number;
}

const FIRECRAWL_BASE = "https://api.firecrawl.dev/v1";

interface FirecrawlMapResponse { success: boolean; links?: string[]; }
interface FirecrawlScrapeResponse {
  success: boolean;
  data?: { markdown?: string; metadata?: { title?: string } };
}

async function firecrawlMap(url: string, apiKey: string): Promise<string[]> {
  try {
    const res = await fetch(`${FIRECRAWL_BASE}/map`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ url, limit: 30 }),
    });
    const data: FirecrawlMapResponse = await res.json();
    return data.success && data.links ? data.links : [url];
  } catch {
    return [url];
  }
}

async function firecrawlScrape(url: string, apiKey: string): Promise<{ title: string; markdown: string } | null> {
  try {
    const res = await fetch(`${FIRECRAWL_BASE}/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ url, formats: ["markdown"], timeout: 15000 }),
    });
    const data: FirecrawlScrapeResponse = await res.json();
    if (data.success && data.data?.markdown) {
      return { title: data.data.metadata?.title || url, markdown: data.data.markdown.slice(0, 15000) };
    }
    return null;
  } catch {
    return null;
  }
}

const PAGE_KEYWORDS = [
  ["about", "our-team", "team", "staff", "meet", "provider"],
  ["service", "treatment", "what-we-do", "solutions", "offerings"],
  ["contact", "location", "hours", "directions"],
  ["faq", "questions"],
  ["testimonial", "review", "case-stud"],
];

function pickPages(allLinks: string[], homepage: string): string[] {
  const picked = [homepage];
  const used = new Set([homepage]);
  for (const keywordGroup of PAGE_KEYWORDS) {
    if (picked.length >= 6) break;
    const match = allLinks.find(
      l => !used.has(l) && keywordGroup.some(k => l.toLowerCase().includes(k))
    );
    if (match) {
      picked.push(match);
      used.add(match);
    }
  }
  return picked;
}

function findSocial(text: string, pattern: RegExp): string | null {
  const m = text.match(pattern);
  return m ? m[0] : null;
}

export async function scrapeBusinessSite(websiteUrl: string): Promise<ScrapedBusiness> {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  const empty: ScrapedBusiness = {
    business_name: null, owner_name: null, owner_credentials: null,
    short_description: null, phone: null, email: null,
    street_address: null, city: null, state: null, zip: null,
    service_area: null, hours: null,
    services: [], faqs: [], testimonials: [], team: [],
    certifications: null,
    facebook_url: null, instagram_url: null, linkedin_url: null,
    youtube_url: null, yelp_url: null, bbb_url: null,
    raw_markdown_chars: 0,
  };

  if (!firecrawlKey) return empty;

  const allLinks = await firecrawlMap(websiteUrl, firecrawlKey);
  const homepage = allLinks.find(l => {
    try { return new URL(l).pathname === "/" || new URL(l).pathname === ""; }
    catch { return false; }
  }) || websiteUrl;

  const pagesToScrape = pickPages(allLinks, homepage);

  const rawPages: Array<{ url: string; title: string; markdown: string }> = [];
  for (const url of pagesToScrape) {
    const result = await firecrawlScrape(url, firecrawlKey);
    if (result) rawPages.push({ url, ...result });
  }

  if (rawPages.length === 0) return empty;

  const allText = rawPages.map(p => p.markdown).join(" ");
  const socials = {
    facebook_url: findSocial(allText, /https?:\/\/(www\.)?facebook\.com\/[a-z0-9._-]+/i),
    instagram_url: findSocial(allText, /https?:\/\/(www\.)?instagram\.com\/[a-z0-9._-]+/i),
    linkedin_url: findSocial(allText, /https?:\/\/(www\.)?linkedin\.com\/(company|in)\/[a-z0-9._-]+/i),
    youtube_url: findSocial(allText, /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[a-z0-9._\/@-]+/i),
    yelp_url: findSocial(allText, /https?:\/\/(www\.)?yelp\.com\/biz\/[a-z0-9._-]+/i),
    bbb_url: findSocial(allText, /https?:\/\/(www\.)?bbb\.org\/[a-z0-9.\/_-]+/i),
  };

  if (!anthropicKey) {
    return { ...empty, ...socials, raw_markdown_chars: allText.length };
  }

  const combined = rawPages
    .map(p => `=== ${p.title} (${p.url}) ===\n${p.markdown}`)
    .join("\n\n---\n\n")
    .slice(0, 40000);

  try {
    const client = new Anthropic({ apiKey: anthropicKey });
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20250929",
      max_tokens: 3000,
      system: `You extract structured business information from website content for ANY industry — chiropractic, plumbing, law, security, marketing, etc. Return ONLY valid JSON. Use null for unknown strings, [] for unknown arrays.`,
      messages: [{
        role: "user",
        content: `Extract this business's information from its website content:

${combined}

Return JSON with these fields:
{
  "business_name": "Exact legal/display name of the business",
  "owner_name": "Full name of the primary owner/founder/lead practitioner",
  "owner_credentials": "Certifications, licenses, awards combined (e.g. 'Licensed & Insured, BBB A+, Google Partner')",
  "short_description": "2-3 sentence plain-English summary of what the business does and who they serve",
  "phone": "Primary business phone number",
  "email": "Public contact email if listed",
  "street_address": "Street address (number + street name only)",
  "city": "City",
  "state": "State (2-letter code if possible)",
  "zip": "ZIP / postal code",
  "service_area": "Service area if mentioned",
  "hours": "Hours of operation as a single formatted string",
  "services": [{"name": "...", "description": "..."}],
  "faqs": [{"question": "...", "answer": "..."}],
  "testimonials": [{"name": "Reviewer name or 'Anonymous'", "quote": "..."}],
  "team": [{"name": "...", "title": "...", "bio": "..."}],
  "certifications": "Combined string of certs/awards/licenses visible on site"
}`,
      }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "{}";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return { ...empty, ...socials, raw_markdown_chars: allText.length };

    const parsed = JSON.parse(match[0]);
    return {
      business_name: parsed.business_name ?? null,
      owner_name: parsed.owner_name ?? null,
      owner_credentials: parsed.owner_credentials ?? parsed.certifications ?? null,
      short_description: parsed.short_description ?? null,
      phone: parsed.phone ?? null,
      email: parsed.email ?? null,
      street_address: parsed.street_address ?? null,
      city: parsed.city ?? null,
      state: parsed.state ?? null,
      zip: parsed.zip ?? null,
      service_area: parsed.service_area ?? null,
      hours: parsed.hours ?? null,
      services: Array.isArray(parsed.services) ? parsed.services : [],
      faqs: Array.isArray(parsed.faqs) ? parsed.faqs : [],
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : [],
      team: Array.isArray(parsed.team) ? parsed.team : [],
      certifications: parsed.certifications ?? null,
      ...socials,
      raw_markdown_chars: allText.length,
    };
  } catch (err) {
    console.error("[scrape-business] claude failed:", err);
    return { ...empty, ...socials, raw_markdown_chars: allText.length };
  }
}
