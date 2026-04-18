import type { Metadata } from "next";
import { PricingCards } from "@/components/pricing-cards";
import { UNIFIED_PACKAGES, ADD_ONS } from "@/lib/data/packages";

export const metadata: Metadata = {
  title: "Pricing | Fast Digital Marketing — Smart Websites & AI Automation",
  description:
    "Simple, transparent pricing for AI-powered marketing. Basic websites from $47/mo, Smart Websites from $197/mo, AI Voice Receptionist from $297/mo. No contracts, cancel anytime.",
  alternates: {
    canonical: "https://fastdigitalmarketing.com/pricing",
  },
  openGraph: {
    title: "Pricing | Fast Digital Marketing",
    description:
      "Four simple tiers. All AI-delivered. $47, $197, $297, $397/mo. No setup fees. Cancel anytime.",
    url: "https://fastdigitalmarketing.com/pricing",
    type: "website",
  },
};

// Pricing FAQs — these address the most common buyer objections.
// Matches schema.org/FAQPage for AI search citation.
const PRICING_FAQS = [
  {
    question: "Are there any setup fees?",
    answer:
      "No. All four tiers have $0 setup. You pay the first month when you sign up, your site is live in 5 business days, and that's it. No hidden onboarding charges.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. Every plan is month-to-month. Cancel anytime from your dashboard — no phone calls, no hoops. Most customers stay because the system works, not because they're locked in.",
  },
  {
    question: "What happens if I go over the usage limits?",
    answer:
      "We don't cut you off. Voice minutes over the monthly cap bill at $0.12 per minute. SMS overages bill at $0.02 per message. Content updates beyond what's included can be added via the Content Velocity add-on ($97/mo).",
  },
  {
    question: "Can I upgrade or downgrade anytime?",
    answer:
      "Yes. Upgrade at any time — the difference is prorated on your next invoice. Downgrade takes effect at the end of your current billing cycle. All self-service from your dashboard.",
  },
  {
    question: "What if I pay annual and cancel mid-year?",
    answer:
      "Annual plans are paid upfront (10 months for 12). If you cancel mid-year, you keep access for the remainder of the year you've already paid for. No partial refunds on annual — but no lock-in either, because you can use what you already bought.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "No free trial — but the Basic Website at $47/mo with zero setup fee and month-to-month cancel is effectively a no-risk starting point. Try it for a month. If it's not for you, cancel in one click.",
  },
  {
    question: "Who do I talk to if something goes wrong?",
    answer:
      "Everything is self-service from your dashboard, including a Help Center with 100+ step-by-step guides and an AI assistant that answers most questions in seconds. We designed the platform so you never have to wait on a human — that's how we keep pricing this low.",
  },
  {
    question: "How are you priced so much lower than other agencies?",
    answer:
      "Because everything is AI-delivered. Traditional agencies charge $1,500+/mo because they're paying account managers to edit your site, schedule your posts, and handle your calls. We automated all of that. You get the same outputs at 1/5 the price — and you get them instantly instead of waiting for someone to get to your ticket.",
  },
];

export default function PricingPage() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Fast Digital Marketing — AI-Powered Marketing Platform",
    description:
      "AI-delivered digital marketing: Smart Websites, AI Voice Receptionist, SEO, Review Autopilot, and Lead Nurture. Fully automated, self-service, no contracts.",
    brand: { "@type": "Brand", name: "Fast Digital Marketing" },
    offers: UNIFIED_PACKAGES.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      description: pkg.tagline,
      price: pkg.priceMonthly.toString(),
      priceCurrency: "USD",
      url: `https://fastdigitalmarketing.com/pricing#${pkg.slug}`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: pkg.priceMonthly.toString(),
        priceCurrency: "USD",
        unitText: "MON",
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-3xl">
          <p className="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            Simple Pricing
          </p>
          <h1 className="reveal reveal-delay-1 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl tracking-tight">
            Pick a Plan. <span className="text-gradient-blue">Get Started.</span>
          </h1>
          <p className="reveal reveal-delay-2 mx-auto mt-6 max-w-xl text-lg text-slate-400 leading-relaxed">
            All AI-delivered. All automated. No contracts, no setup fees, no
            sales calls. Four tiers, every industry, same pricing for everyone.
          </p>
        </div>
      </section>

      {/* Pricing cards (client component — handles monthly/annual toggle) */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <PricingCards />
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-white/[0.06] bg-slate-900/50 px-6 py-10">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 text-center sm:grid-cols-4">
          <div>
            <div className="text-2xl font-bold text-gradient-blue">$0</div>
            <div className="mt-1 text-xs text-slate-500">setup fee on every plan</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gradient-blue">5 days</div>
            <div className="mt-1 text-xs text-slate-500">from signup to live website</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gradient-blue">24/7</div>
            <div className="mt-1 text-xs text-slate-500">AI handles everything</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gradient-blue">Month-to-month</div>
            <div className="mt-1 text-xs text-slate-500">cancel anytime, self-service</div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-white tracking-tight">
            Pricing <span className="text-gradient-electric">Questions</span>
          </h2>
          <div className="space-y-3">
            {PRICING_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/[0.08] bg-slate-900/80 p-6 transition-colors hover:border-white/[0.14]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-white">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Suppress unused-import TS warnings for re-exports used later */}
      <span className="hidden" aria-hidden="true">
        {String(ADD_ONS.length)}
      </span>
    </>
  );
}
