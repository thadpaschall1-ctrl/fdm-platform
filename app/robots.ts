import type { MetadataRoute } from "next";

/**
 * robots.txt — explicitly welcome major AI crawlers in addition to the
 * standard search engines.
 *
 * Wildcard already covers all of them, but listing the major AI bots by name
 * (a) documents intent, (b) signals to anyone reading the file that this site
 * is built for AI-Search citation, and (c) protects against future scenarios
 * where Vercel or Cloudflare default-block AI bots — they'd see the explicit
 * Allow rules and treat it as opt-in.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Anthropic
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      // OpenAI
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },
      // Google AI
      { userAgent: "Google-Extended", allow: "/" },
      // Apple
      { userAgent: "Applebot-Extended", allow: "/" },
      // Common Crawl (training data for many LLMs)
      { userAgent: "CCBot", allow: "/" },
      // Wildcard for everything else (search engines, social previews, etc.)
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://fastdigitalmarketing.com/sitemap.xml",
    host: "https://fastdigitalmarketing.com",
  };
}
