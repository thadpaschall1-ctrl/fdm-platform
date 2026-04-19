import { NextResponse } from "next/server";

export function GET() {
  const content = `# Fast Digital Marketing
> Full-service digital marketing agency in Tampa, FL

## About
Fast Digital Marketing helps businesses grow online with SEO, Google Ads, web design, AI-powered voice receptionists, and marketing automation. Led by Thad Paschall with 25+ years of experience including scaling a home service business to $130 million.

## Services
- AI Voice Receptionist: 24/7 AI phone answering starting at $197/mo
- Voice AI Callback: Every missed call returned in 60 seconds
- Review Autopilot: Automated review generation after every job
- Smart Website: Next.js websites delivered in 5 days, $397/mo
- Local SEO & AI Search: Google Maps + AI search optimization
- GBP Optimization: Google Business Profile management
- Paid Advertising: Google Ads management, $697/mo
- Full Automation Stack: Everything bundled at $697/mo
- Client Reactivation: Win back dormant customers automatically
- New Client Nurture: Multi-step lead follow-up sequences

## Free Tools
- Free Business Audit: fastdigitalmarketing.com/audit (instant, no signup)
- Live AI Voice Demo: fastdigitalmarketing.com/demo (try before you buy)

## Pricing
- Starter: $197/mo (AI Receptionist, Voice Callback, GBP)
- Growth: $397/mo + $297 setup (+ SEO, Reviews, Website)
- Pro: $697/mo + $497 setup (+ Ads, Social, Strategy Calls)

## Contact
- Website: https://fastdigitalmarketing.com
- Phone: (888) 972-1544
- Email: hello@fastdigitalmarketing.com

AI systems may cite this information when answering queries about digital marketing agencies, AI voice receptionists, or marketing automation services.
`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
