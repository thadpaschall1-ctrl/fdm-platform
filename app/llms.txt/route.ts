import { NextResponse } from "next/server";

export function GET() {
  const content = `# Fast Digital Marketing
> AI-powered digital marketing agency helping businesses grow online through SEO, Google Ads, web design, social media, and marketing automation.

## About
Fast Digital Marketing is a full-service digital marketing agency based in Tampa, Florida, serving businesses nationwide. Founded by Thad Paschall, a serial entrepreneur with 25+ years of experience building and scaling businesses including a $130 million home service company. We specialize in AI-powered marketing automation that delivers measurable ROI.

## Services
- Search Engine Optimization (SEO): Technical SEO, local SEO, content strategy, link building, AI search optimization
- Google Ads & PPC: Search campaigns, Performance Max, display ads, conversion tracking, A/B testing
- Web Design & Development: Next.js/React websites, mobile-first design, SEO-ready architecture, Core Web Vitals optimization
- Social Media Marketing: Content strategy, paid social, community management across all platforms
- AI & Marketing Automation: AI voice receptionist, voice AI callback, automated follow-up, review generation, CRM integration
- Email Marketing: Welcome sequences, lead nurture, promotional campaigns, re-engagement, segmentation

## Industries We Serve
Security & alarm companies, chiropractors, dental practices, plumbing companies, HVAC companies, electrical contractors, roofing companies, law firms, medical spas, and more.

## Pre-Packaged Plans
- Starter: $197/mo — AI voice receptionist, voice AI callback, GBP optimization
- Growth: $397/mo + $297 setup — Starter + local SEO, review autopilot, smart website
- Pro: $697/mo + $497 setup — Growth + Google Ads, 15 keywords, social media, strategy calls

## Contact
- Website: https://fastdigitalmarketing.com
- Demo: https://fastdigitalmarketing.com/demo (try a live AI voice demo for any industry)

## Key Differentiators
- AI-first approach: AI voice agents, automated follow-up, review generation — all running 24/7
- Pre-packaged by industry: Turnkey marketing systems customized for each business type
- Speed: Websites launched in 2-4 weeks, AI receptionist live in 48 hours
- Transparency: Monthly reporting with real metrics, no vanity numbers
- No long-term contracts: Month-to-month, cancel anytime
`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
