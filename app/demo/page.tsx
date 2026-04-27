import type { Metadata } from "next";
import { DemoWidget } from "@/components/demo-widget";

export const metadata: Metadata = {
  title: "Live AI Voice Demo | Try It For Your Business",
  description:
    "Hear how an AI voice receptionist sounds for YOUR business. Pick your industry, start a live conversation — free, no signup required.",
  alternates: {
    canonical: "https://fastdigitalmarketing.com/demo",
  },
  openGraph: {
    title: "Live AI Voice Demo | Fast Digital Marketing",
    description:
      "Try Holland — the 24/7 AI voice receptionist — live in your browser. Pick your industry and have a real conversation.",
    url: "https://fastdigitalmarketing.com/demo",
    type: "website",
    siteName: "Fast Digital Marketing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live AI Voice Demo | Fast Digital Marketing",
    description:
      "Try Holland — the 24/7 AI voice receptionist — live in your browser.",
  },
};

// AI Search Optimization: Service + FAQPage schema for the demo experience.
// Citable by ChatGPT, Perplexity, Google AI Overviews when prospects ask
// "what does an AI voice receptionist sound like" or "is there a free AI
// voice agent demo for [industry]". The Organization schema is already in
// the root layout; this adds the specific Service + FAQ data this page is
// the canonical source for.
const DEMO_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://fastdigitalmarketing.com/demo#service",
      name: "AI Voice Receptionist (Holland)",
      serviceType: "Voice AI / Conversational AI Receptionist",
      description:
        "24/7 AI voice receptionist that answers calls in a natural British accent, books appointments, qualifies leads, and routes urgent calls to the business owner. Trained per industry. Included in Fast Digital Marketing's Smart Site + Voice tier ($297/mo) and Full Automation Stack ($397/mo).",
      provider: {
        "@type": "Organization",
        "@id": "https://fastdigitalmarketing.com/#organization",
      },
      areaServed: { "@type": "Country", name: "United States" },
      offers: {
        "@type": "Offer",
        price: "297",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "297",
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      },
      hasDemo: {
        "@type": "WebPage",
        url: "https://fastdigitalmarketing.com/demo",
        name: "Live AI Voice Demo",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://fastdigitalmarketing.com/demo#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does the AI voice receptionist work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Holland answers your business phone in under two rings, greets the caller in a natural British accent, asks qualifying questions specific to your industry, books appointments directly into your calendar, and texts the caller a confirmation. Urgent calls are routed to you in real time.",
          },
        },
        {
          "@type": "Question",
          name: "Can I try the AI voice receptionist before I sign up?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — the demo at fastdigitalmarketing.com/demo lets you have a live conversation with Holland in your browser, free, no signup required. You pick your industry and Holland responds as if it were answering for that type of business.",
          },
        },
        {
          "@type": "Question",
          name: "Does the AI voice receptionist work for my industry?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Holland is trained on 75+ industry-specific playbooks covering home services, trades, health and wellness, automotive, professional services, and specialty niches. The demo lets you select your industry and hear how it handles your typical customer questions.",
          },
        },
        {
          "@type": "Question",
          name: "What happens when the AI can't answer a question?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Holland tells the caller it will pass the question along, captures their contact info, sends you a transcript and a callback task, and offers the caller an option to schedule a callback. No caller is ever left without a response.",
          },
        },
        {
          "@type": "Question",
          name: "How much does the AI voice receptionist cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI Voice Receptionist is included in Fast Digital Marketing's Smart Site + Voice tier at $297 per month and the Full Automation Stack tier at $397 per month. Month-to-month, no setup fee, cancel anytime.",
          },
        },
        {
          "@type": "Question",
          name: "What can the AI voice receptionist do that a regular answering service cannot?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Holland answers 24/7 with zero hold time, books directly to your calendar without a human in the middle, qualifies leads against your specific criteria, sends instant SMS confirmations, and integrates with your CRM. Traditional answering services charge per minute, miss after-hours calls, and require human handoff.",
          },
        },
      ],
    },
  ],
};

// Niches shown as tiles on /demo. Ordered so the most-recognized industries
// appear first (top of the grid, above the fold on both mobile and desktop),
// then Fast Start priority niches, then specialty + long-tail verticals.
// Users can also type a custom niche via the "Other" input.
const POPULAR_NICHES = [
  // Row 1 — the 4 most-searched industries (always visible first)
  "Security Company",
  "Chiropractic Practice",
  "Dental Office",
  "Plumbing Company",

  // Row 2 — core home services
  "HVAC Company",
  "Electrical Contractor",
  "Roofing Company",
  "Law Firm",

  // Row 3 — Fast Start high-ticket urgency niches
  "Foundation Repair",
  "Solar Panel Installation",
  "Mold Remediation",
  "Crawl Space Encapsulation",
  "Spray Foam Insulation",

  // Row 4 — Florida / Sunbelt plays
  "Pool Resurfacing & Remodeling",
  "Screen Enclosure / Lanai Builder",
  "Hurricane Shutter / Impact Window",
  "Soft Wash Roof & Exterior Cleaning",

  // Row 5 — Outdoor living / hardscape
  "Artificial Turf Installation",
  "Paver & Hardscape Contractor",
  "Deck Builder",
  "Landscaping Company",

  // Row 6 — Concrete / floors
  "Polished Concrete (Commercial)",
  "Concrete Coatings / Garage Floors",
  "Stained / Stamped Decorative Concrete",
  "Epoxy Flooring",

  // Row 7 — Specialty plumbing & water
  "Tankless Water Heater Install",
  "Whole-Home Water Filtration / Softeners",
  "Bathtub Reglazing / Refinishing",
  "Dryer Vent Cleaning",

  // Row 8 — Auto / mobile services
  "Auto Repair Shop",
  "Paintless Dent Repair",
  "Auto Window Tinting",
  "Mobile Pet Grooming",

  // Row 9 — Commercial B2B
  "Commercial Pressure Washing",
  "Commercial Cleaning / Janitorial",
  "Stair Lift Installation",
  "Senior Bathroom Remodels (Walk-in Tubs)",

  // Row 10 — Sensitive cleanup + residential cleaning
  "Biohazard / Crime Scene / Hoarding Cleanup",
  "Home Cleaning Service",
  "Veterinary Clinic",
  "Mobile Veterinarian",

  // Row 11 — Health, beauty, lifestyle
  "Medical Spa / Medspa",
  "Hair Salon / Beautician",
  "Fitness Studio / Gym",
  "Photography Studio",

  // Row 12 — Professional services
  "Accounting Firm",
  "Business Consultant",
  "Insurance Agency",
  "Real Estate Agency",

  // Row 13 — Other specialty
  "Window & Door Company",
];

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      {/* AI Search Optimization: Service + FAQPage schema. Makes this page
          citable by ChatGPT, Perplexity, Google AI Overviews, and Gemini
          when prospects ask about AI voice receptionists. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DEMO_SCHEMA) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px] animate-[float_10s_ease-in-out_infinite_2s]" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative">
          <p className="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-bold text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            Live Demo — No Signup Required
          </p>
          <h1 className="reveal reveal-delay-1 mx-auto max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl tracking-tight">
            Hear How AI Sounds for{" "}
            <span className="text-gradient-blue">Your Business</span>
          </h1>
          <p className="reveal reveal-delay-2 mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Pick your industry, click start, and have a live conversation with an AI
            receptionist trained for your niche.
          </p>
        </div>
      </section>

      {/* Demo Widget */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <DemoWidget popularNiches={POPULAR_NICHES} />
      </section>

      {/* What You're Experiencing */}
      <section className="relative overflow-hidden px-6 py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
        <div className="relative mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-white tracking-tight">
            What You&apos;re About to <span className="text-gradient-electric">Experience</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: "🎯", title: "Niche-Trained", desc: "The AI knows your industry — appointment types, common questions, services, and terminology.", color: "from-blue-600/20 to-blue-900/20 border-blue-500/20" },
              { icon: "🇬🇧", title: "British Accent", desc: "Meet Holland — your AI receptionist with a natural British accent that customers love.", color: "from-violet-600/20 to-violet-900/20 border-violet-500/20" },
              { icon: "⚡", title: "Works 24/7", desc: "Never miss a call again. Your AI receptionist handles calls at 2am the same as 2pm.", color: "from-emerald-600/20 to-emerald-900/20 border-emerald-500/20" },
            ].map((item) => (
              <div key={item.title} className={`card-hover rounded-2xl border bg-gradient-to-br ${item.color} p-7 text-center`}>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-2xl">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="border-gradient rounded-3xl bg-slate-900 p-12 text-center">
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">Ready to Put This to Work?</h2>
            <p className="mx-auto mt-4 max-w-md text-slate-400">
              Get a custom AI receptionist for your business — handles calls, books appointments, and never takes a day off.
            </p>
            <a
              href="/audit"
              className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-4 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)]"
            >
              Get Your Free Audit
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
