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
  doctor_images: Array<{ url: string; alt: string }>;
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
  ["meet-the-team", "meet-the-doctor", "meet-our", "our-doctor", "our-team", "our-staff", "providers", "physicians", "attorneys", "practitioners"],
  ["about", "about-us", "who-we-are", "story"],
  ["service", "treatment", "what-we-do", "solutions", "offerings", "specialties"],
  ["contact", "location", "hours", "directions", "find-us"],
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

const NON_PERSON_PATTERNS = [
  /accident/i, /treatment/i, /procedure/i, /adjustment-/i, /screenshot/i,
  /service(s)?-/i, /logo/i, /icon/i, /banner/i, /hero-bg/i, /background/i,
  /before-after/i, /xray/i, /x-ray/i, /anatomy/i, /chart/i, /diagram/i,
  /equipment/i, /office-interior/i, /facility/i, /exterior/i,
  /stock-/i, /placeholder/i, /demo/i,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterPersonImages(raw: any): Array<{ url: string; alt: string }> {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((img: { url?: string; alt?: string }) => {
      if (!img.url || !/^https?:\/\//i.test(img.url)) return false;
      const haystack = `${img.url} ${img.alt || ""}`;
      return !NON_PERSON_PATTERNS.some(p => p.test(haystack));
    })
    .map((img: { url: string; alt?: string }) => ({ url: img.url, alt: img.alt || "" }))
    .slice(0, 4);
}

export async function scrapeBusinessSite(websiteUrl: string): Promise<ScrapedBusiness> {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  const empty: ScrapedBusiness = {
    business_name: null, owner_name: null, owner_credentials: null,
    short_description: null, phone: null, email: null,
    street_address: null, city: null, state: null, zip: null,
    service_area: null, hours: null,
    services: [], faqs: [], testimonials: [], team: [], doctor_images: [],
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
      model: "claude-haiku-4-5",
      max_tokens: 3000,
      system: `You extract structured business information from website content for ANY industry — chiropractic, plumbing, law, security, marketing, etc. Return ONLY valid JSON. Use null for unknown strings, [] for unknown arrays. Be decisive: if the site names ANY doctor, owner, attorney, or lead practitioner, extract it — don't leave owner_name null because there are multiple options. Pick the first/lead person shown.`,
      messages: [{
        role: "user",
        content: `Extract this business's information from its website content:

${combined}

Return JSON with these fields:
{
  "business_name": "Exact legal/display name of the business",
  "owner_name": "Full name of the primary doctor, owner, founder, attorney, or lead practitioner. If a 'Meet the Team' or 'Our Doctors' section exists, use the first person listed or whoever is labeled as owner/founder/lead. DO NOT leave blank just because multiple people are named — pick the most senior or first-listed.",
  "owner_credentials": "Certifications, licenses, awards combined",
  "short_description": "2-3 sentence plain-English summary of what the business does and who they serve",
  "phone": "PRIMARY business phone number — the main click-to-call number displayed in the header, hero, or 'Call Us' button. IGNORE fax numbers. If both a toll-free and a local number exist, prefer the local one. Return in format like (813) 555-0123.",
  "email": "Public contact email if listed",
  "street_address": "Street address (number + street name only, no city/state)",
  "city": "City",
  "state": "State (2-letter code if possible)",
  "zip": "ZIP / postal code",
  "service_area": "Service area if mentioned",
  "hours": "Hours of operation as a single formatted string",
  "services": [{"name": "...", "description": "..."}],
  "faqs": [{"question": "...", "answer": "..."}],
  "testimonials": [{"name": "Reviewer name or 'Anonymous'", "quote": "..."}],
  "team": [{"name": "...", "title": "...", "bio": "..."}],
  "doctor_images": [{"url": "FULL absolute image URL", "alt": "Name of the person in the photo"}],
  "certifications": "Combined string of certs/awards/licenses visible on site"
}

STRICT RULES for doctor_images:
- Return ONLY photos of actual PEOPLE (doctors, named practitioners, owners, named team members).
- The alt text should name a specific person. If you can't identify the person, DO NOT include the image.
- Order by seniority: main doctor/owner/founder first.
- STRICTLY EXCLUDE: treatment demonstrations, service illustrations, equipment photos, office interiors, stock photography, logos, icons, screenshots, patient photos, before-after comparisons.
- If alt text or URL contains "accident", "treatment", "screenshot", "service", "logo", "icon", "demo", "procedure" — skip it.
- Full absolute URLs only. Empty array is better than bad images.`,
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
      doctor_images: filterPersonImages(parsed.doctor_images),
      certifications: parsed.certifications ?? null,
      ...socials,
      raw_markdown_chars: allText.length,
    };
  } catch (err) {
    console.error("[scrape-business] HARD FAILURE — claude extraction threw:", err);
    throw new Error(
      `Claude extraction failed after successful scrape: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

export function detectSilentFailure(result: ScrapedBusiness): string | null {
  if (result.raw_markdown_chars === 0) return null;
  if (result.raw_markdown_chars < 1000) return null;

  const hasAnyText =
    !!result.business_name ||
    !!result.phone ||
    !!result.owner_name ||
    !!result.short_description ||
    !!result.city;

  const hasAnyArray =
    result.services.length > 0 ||
    result.faqs.length > 0 ||
    result.testimonials.length > 0 ||
    result.team.length > 0;

  if (!hasAnyText && !hasAnyArray) {
    return `silent extraction failure — ${result.raw_markdown_chars} chars scraped but every field is empty`;
  }
  return null;
}
