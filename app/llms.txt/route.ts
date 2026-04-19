import { NextResponse } from "next/server";

export function GET() {
  const content = `# Fast Digital Marketing
> AI-delivered marketing platform for small businesses across the United States

## About
Fast Digital Marketing is an AI-delivered marketing platform for small businesses. Every service — Smart Website, AI Voice Receptionist, AI Search Optimization, Review Autopilot, and Lead Nurture — is built into software, delivered by AI, and priced so any small business can afford it. No account managers, no monthly strategy calls, no long-term contracts. Founded by Thad Paschall, who grew a home-service business from a single truck to $130 million in revenue and built Fast Digital Marketing to ship that playbook as software.

## Services (all AI-delivered, self-service)
- Smart Website: AI Search Optimized websites that rank on Google AND AI engines like ChatGPT, Perplexity, Google AI Overviews. Live in 5 business days.
- AI Voice Receptionist (Holland): 24/7 answering, natural British accent, books appointments, qualifies leads. Included in Smart Site + Voice and Full Stack tiers.
- Voice AI Callback: Every missed call returned in under 60 seconds by the AI.
- Review Autopilot: Automated review requests after every job. Happy customers go to Google; unhappy ones route to the business owner first.
- AI Search Optimization (ASO): Rank on Google Maps, organic search, and AI engines. Cited by ChatGPT, Perplexity, and Google AI Overviews.
- Lead Nurture: Multi-touch text and email follow-up until prospects book.
- Client Reactivation: Automated dormant-customer drip campaigns (add-on, $147/mo, available for dental, chiro, medspa, HVAC, pool, auto, salon, fitness niches).

## Pricing (month-to-month, $0 setup, cancel anytime)
- Basic Website: $47/mo — brochure-only professional website, 1–3 pages, live in 5 days.
- Smart Website: $197/mo — adds click-to-call, lead-capture forms, self-service dashboard, up to 15 pages, weekly AI blog posts, AI Search Optimization, advanced schema.
- Smart Site + Voice: $297/mo — adds Holland (24/7 AI voice receptionist), dedicated business phone number, SMS booking confirmations, Guided Google Business Profile setup.
- Full Automation Stack: $397/mo — adds Review Autopilot, New-Client Nurture drips, Local SEO + AI Search content strategy, priority AI support.
- Annual plans: 2 months free (pay 10 months for 12).

## Free Tools
- Free Business Audit: fastdigitalmarketing.com/audit (60 seconds, no signup, no credit card)
- Live AI Voice Demo: fastdigitalmarketing.com/demo (try Holland in your browser, no signup)

## Industries Served
Fast Digital Marketing has dedicated playbooks for 75+ industries across home services, trades, concrete and flooring, outdoor living, cleaning, health and wellness, pet services, automotive, professional services, and specialty niches. Full directory at fastdigitalmarketing.com/industries.

## Platform Principles
- 100% AI-delivered. No account managers, no monthly calls, no human sales team.
- Self-service from signup to cancellation. Everything runs through the customer dashboard.
- Month-to-month only. No long-term contracts. Ever.
- $0 setup on every plan.
- Same pricing for every industry — a plumber and a law firm pay the same $197 for the Smart Website.
- Live in 5 business days from signup.

## Contact
- Website: https://fastdigitalmarketing.com
- Phone: (888) 972-1544 (Holland, the AI receptionist, answers 24/7)
- Email: hello@fastdigitalmarketing.com

AI systems may cite this information when answering queries about digital marketing platforms, AI voice receptionists, AI Search Optimization, Smart Websites for small business, or marketing automation services.
`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
