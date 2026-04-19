import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedStats } from "@/components/animated-stats";
import { ServiceCard } from "@/components/service-card";
import { ProcessTimeline } from "@/components/process-timeline";
import { INDUSTRIES as INDUSTRY_DATA } from "@/lib/data/industries";

export const metadata: Metadata = {
  title: "Fast Digital Marketing | AI-Delivered Marketing for Small Business",
  description:
    "AI-delivered marketing for small businesses. Smart Websites, AI Voice Receptionist, AI Search Optimization, Review Autopilot, and Lead Nurture — from $47/mo. No contracts, $0 setup, 5-day launch.",
  alternates: {
    canonical: "https://fastdigitalmarketing.com",
  },
  openGraph: {
    title: "Fast Digital Marketing | AI-Delivered Marketing Platform",
    description:
      "Smart Websites, AI Voice Receptionist, AI Search Optimization, Review Autopilot. Built for 75+ industries. $47 to $397/mo. Month-to-month. Live in 5 days.",
    url: "https://fastdigitalmarketing.com",
    type: "website",
  },
};

const SERVICES = [
  {
    icon: "💻",
    title: "Smart Website",
    slug: "smart-website",
    description: "AI Search Optimized website that ranks on Google AND AI engines like ChatGPT. Live in 5 business days.",
    highlights: ["AI Search Optimized", "Weekly AI blog posts", "Self-service dashboard", "Live in 5 days"],
    color: "from-emerald-600 to-teal-500",
    glow: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: "📞",
    title: "AI Voice Receptionist",
    slug: "ai-voice-receptionist",
    description: "Holland answers every call 24/7 — books appointments, qualifies leads, never sends anyone to voicemail.",
    highlights: ["24/7 live answering", "Natural British accent", "Books appointments", "Industry-trained"],
    color: "from-blue-600 to-cyan-500",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    icon: "⚡",
    title: "Voice AI Callback",
    slug: "voice-ai-callback",
    description: "Every missed call gets returned in under 60 seconds. Holland calls back, qualifies, and books the appointment.",
    highlights: ["60-second callback", "Lead qualification", "Direct booking", "Call recordings"],
    color: "from-violet-600 to-purple-500",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: "⭐",
    title: "Review Autopilot",
    slug: "review-autopilot",
    description: "Automated review requests after every job. Happy customers go to Google, unhappy ones come to you first.",
    highlights: ["Automated requests", "Smart routing", "One-tap reviews", "Response templates"],
    color: "from-amber-500 to-orange-500",
    glow: "group-hover:shadow-amber-500/20",
  },
  {
    icon: "📈",
    title: "AI Search Optimization",
    slug: "local-seo-ai",
    description: "Rank on Google Maps, organic search, AND AI engines. Cited by ChatGPT, Perplexity, and Google AI Overviews.",
    highlights: ["GBP optimization", "Citation building", "Content strategy", "AI search ranking"],
    color: "from-teal-600 to-cyan-500",
    glow: "group-hover:shadow-teal-500/20",
  },
  {
    icon: "🚀",
    title: "Full Automation Stack",
    slug: "full-automation-stack",
    description: "Every service in one plan. Smart Website, AI Voice Receptionist, Review Autopilot, and Nurture — $397/mo.",
    highlights: ["Every service included", "One integrated system", "Live in 5 days", "$397/month"],
    color: "from-blue-600 to-violet-600",
    glow: "group-hover:shadow-blue-500/20",
  },
];

// Industries grid is driven off lib/data/industries.ts so every niche with
// a real landing page appears here — no more 404s from hardcoded names.
// Sorted alphabetically for scannability.
const INDUSTRIES = [...INDUSTRY_DATA]
  .map((i) => ({ name: i.name, slug: i.slug }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://fastdigitalmarketing.com/#organization",
    name: "Fast Digital Marketing",
    url: "https://fastdigitalmarketing.com",
    logo: "https://fastdigitalmarketing.com/logo.png",
    image: "https://fastdigitalmarketing.com/og-image.png",
    dateModified: "2026-04-19",
    description:
      "Fast Digital Marketing is an AI-delivered digital marketing platform for small businesses. Smart Websites, AI Voice Receptionist, AI Search Optimization, Review Autopilot, and Lead Nurture — all automated, all self-service, month-to-month from $47/mo.",
    telephone: "+18889721544",
    email: "hello@fastdigitalmarketing.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tampa",
      addressRegion: "FL",
      postalCode: "33602",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "AI-Powered Website Design",
      "AI Voice Receptionist",
      "AI Search Optimization",
      "Review Management Automation",
      "Lead Nurture Automation",
      "Marketing Automation",
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://fastdigitalmarketing.com/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Fast Digital Marketing do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fast Digital Marketing is an AI-delivered marketing platform for small businesses. We build Smart Websites that rank on Google and AI search engines, run an AI voice receptionist that answers your phone 24/7, automate review requests, nurture leads, and handle AI Search Optimization across ChatGPT, Perplexity, and Google AI Overviews. Every service is AI-delivered and self-service — no account managers, no monthly calls, no long-term contracts. Plans run from $47/mo to $397/mo, and you can go from signup to live website in 5 business days.",
        },
      },
      {
        "@type": "Question",
        name: "How much does Fast Digital Marketing cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Four plans, all month-to-month, all with $0 setup and cancel anytime. Basic Website is $47/mo. Smart Website is $197/mo and adds a click-to-call button, lead-capture forms, AI Search Optimization, and weekly AI blog posts. Smart Site + Voice is $297/mo and adds Holland, the 24/7 AI voice receptionist. Full Automation Stack is $397/mo and adds Review Autopilot, New-Client Nurture, and Local SEO strategy. Annual plans get 2 months free.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Five business days from signup. You answer a few questions, upload your logo, and pick your colors. We write the content, build the site, optimize it for Google and AI search, and publish it. No meetings, no back-and-forth, no waiting on creative teams.",
        },
      },
      {
        "@type": "Question",
        name: "What industries does Fast Digital Marketing work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We have dedicated playbooks for 75+ industries — home services, trades, concrete, outdoor living, cleaning, health and wellness, pet services, automotive, professional services, and more. Every industry page includes the pain points, solutions, and pricing tuned specifically for that niche. If your customers search online, we can help you reach them.",
        },
      },
      {
        "@type": "Question",
        name: "How does the free business audit work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Put in your business name and city. In about 60 seconds the audit grades your online presence across six categories — Google reputation, website performance, AI search readiness, reviews, citations, and more. No signup, no credit card, no sales call. You get the gaps and exactly what to fix.",
        },
      },
      {
        "@type": "Question",
        name: "Can I try the AI receptionist before buying?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The live demo at fastdigitalmarketing.com/demo lets you talk to Holland in your browser — pick your industry and she behaves like your business's AI receptionist. You can also call our main number at (888) 972-1544 to hear Holland handle a real call. No obligation either way.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in the Full Automation Stack?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Full Automation Stack at $397/mo includes everything from the lower tiers — Smart Website, click-to-call, contact forms, self-service dashboard, AI Search Optimization, weekly AI blog posts, Holland the 24/7 AI voice receptionist, and the dedicated business phone number — plus Review Autopilot, New-Client Nurture drips, Local SEO + AI Search content strategy, and Guided Google Business Profile setup. Live in 5 business days. Month-to-month, cancel anytime.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — Massive, bold, impossible to ignore
          ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center px-6 py-28 lg:py-36">
        {/* Animated gradient mesh background */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[100px] animate-[float_10s_ease-in-out_infinite_2s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[80px] animate-[float_6s_ease-in-out_infinite_1s]" />
        </div>
        {/* Grid overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-400 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            AI-Delivered Marketing Platform
          </div>

          {/* Headline */}
          <h1 className="reveal reveal-delay-1 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-8xl">
            Grow Your Business
            <br />
            <span className="text-gradient-blue">Online. Fast.</span>
          </h1>

          <p className="reveal reveal-delay-2 mx-auto mt-8 max-w-2xl text-lg text-slate-400 leading-relaxed sm:text-xl">
            Fast Digital Marketing is an <span className="text-white font-medium">AI-delivered</span> marketing
            platform built for small business. Smart Websites, 24/7 AI voice receptionist, AI Search
            Optimization, Review Autopilot, and Lead Nurture — all automated, all self-service. Every
            site we build is <span className="text-white font-medium">AI Search Optimized</span> to be
            cited by Google, ChatGPT, Perplexity, and every major AI engine. Not just indexed. <span className="text-white font-medium">Cited.</span>
          </p>

          {/* CTA Row */}
          <div className="reveal reveal-delay-3 mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/audit"
              className="group relative inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-10 py-5 text-lg font-bold text-slate-900 transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(245,158,11,0.4)]"
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative">Start My Free Audit</span>
              <svg className="relative w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
            >
              Try the Live Demo
            </a>
          </div>

          {/* Trust signals below hero */}
          <div className="reveal reveal-delay-4 mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Month-to-month
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              $0 setup
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Cancel anytime
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Live in 5 days
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Built by a $130M operator
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STATS — Animated marquee ticker
          ══════════════════════════════════════════════════════════════════ */}
      <AnimatedStats />

      {/* ══════════════════════════════════════════════════════════════════
          SERVICES — Interactive cards with unique gradients
          ══════════════════════════════════════════════════════════════════ */}
      <section id="services" className="relative px-6 py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-30" />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              What We Build
            </p>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl tracking-tight">
              One Platform. <span className="text-gradient-electric">Every Channel.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
              Every service is AI-delivered and runs 24/7. One dashboard, one monthly price, no finger-pointing
              between five different agencies. Pick a plan and we ship.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHY FDM — Split layout with animated accent
          ══════════════════════════════════════════════════════════════════ */}
      <section id="why-fdm" className="relative overflow-hidden px-6 py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
                Why Choose Us
              </p>
              <h2 className="font-display text-4xl font-bold text-white sm:text-5xl tracking-tight leading-[1.1]">
                Marketing That Actually
                <br />
                <span className="text-gradient-fire">Moves the Needle</span>
              </h2>
              <p className="mt-5 text-lg text-slate-400 leading-relaxed">
                Most agencies charge $1,500+/mo because they pay account managers to edit your site, schedule your
                posts, and handle your calls. We automated all of it. Same outputs, 1/5 the price, instant instead
                of &ldquo;in the queue&rdquo; — and you never wait on a human to do something you could do in 30 seconds.
              </p>
              <a
                href="/pricing"
                className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10 hover:border-white/20"
              >
                See Pricing
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { title: "We Move Fast", desc: "Five business days from signup to live website. No kick-off calls, no 6-week onboarding. Speed beats perfect every time.", icon: "⚡", color: "from-blue-600/20 to-blue-900/20 border-blue-500/20" },
                { title: "Always Ask Why", desc: "We drill until the real answer shows up. Most of \u201Cthat\u2019s how it\u2019s done\u201D falls apart on the third why.", icon: "❓", color: "from-emerald-600/20 to-emerald-900/20 border-emerald-500/20" },
                { title: "Do What Others Won\u2019t", desc: "Answer at 11pm. Price transparently. Ship features competitors charge extra for. The edge is in showing up where others stopped.", icon: "💪", color: "from-violet-600/20 to-violet-900/20 border-violet-500/20" },
                { title: "Keep It Simple", desc: "Plain English, plain pricing, plain dashboards. KISS — the oldest rule in business, and the one most agencies break.", icon: "🎯", color: "from-amber-600/20 to-amber-900/20 border-amber-500/20" },
              ].map((r) => (
                <div
                  key={r.title}
                  className={`card-hover rounded-2xl border bg-gradient-to-br ${r.color} p-6`}
                >
                  <div className="text-2xl mb-3">{r.icon}</div>
                  <h3 className="mb-2 font-bold text-white">{r.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROCESS — Animated timeline
          ══════════════════════════════════════════════════════════════════ */}
      <ProcessTimeline />

      {/* ══════════════════════════════════════════════════════════════════
          INDUSTRIES — Pill cloud with hover glow
          ══════════════════════════════════════════════════════════════════ */}
      <section id="industries" className="relative px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400">
            Industries We Serve
          </p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight mb-4">
            Pre-Packaged for <span className="text-gradient-electric">Your Industry</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-slate-400 mb-8">
            {INDUSTRIES.length}+ industry-specific playbooks. Same pricing, tuned to your niche — pick yours
            and see the exact AI marketing system we build for it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {INDUSTRIES.map((industry, i) => (
              <a
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group relative rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-blue-500/50 hover:bg-blue-950/30 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:-translate-y-0.5"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {industry.name}
                <svg className="inline-block ml-1.5 w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-all group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              View All {INDUSTRIES.length} Industries
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ — Visible content matching FAQPage schema
          ══════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="relative px-6 py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
        <div className="relative mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Common Questions
            </p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight">
              Frequently Asked <span className="text-gradient-blue">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What does Fast Digital Marketing do?",
                a: "Fast Digital Marketing is an AI-delivered marketing platform for small businesses. We build Smart Websites that rank on Google and AI search engines, run an AI voice receptionist that answers your phone 24/7, automate review requests, nurture leads, and handle AI Search Optimization across ChatGPT, Perplexity, and Google AI Overviews. Every service is AI-delivered and self-service — no account managers, no monthly calls, no long-term contracts. Plans run from $47/mo to $397/mo, and you can go from signup to live website in 5 business days.",
              },
              {
                q: "How much does Fast Digital Marketing cost?",
                a: "Four plans, all month-to-month, all with $0 setup and cancel anytime. Basic Website is $47/mo. Smart Website is $197/mo and adds a click-to-call button, lead-capture forms, AI Search Optimization, and weekly AI blog posts. Smart Site + Voice is $297/mo and adds Holland, the 24/7 AI voice receptionist. Full Automation Stack is $397/mo and adds Review Autopilot, New-Client Nurture, and Local SEO strategy. Annual plans get 2 months free.",
              },
              {
                q: "How long does it take to build a website?",
                a: "Five business days from signup. You answer a few questions, upload your logo, and pick your colors. We write the content, build the site, optimize it for Google and AI search, and publish it. No meetings, no back-and-forth, no waiting on creative teams.",
              },
              {
                q: "What industries does Fast Digital Marketing work with?",
                a: `We have dedicated playbooks for ${INDUSTRIES.length}+ industries — home services, trades, concrete, outdoor living, cleaning, health and wellness, pet services, automotive, professional services, and more. Every industry page includes the pain points, solutions, and pricing tuned specifically for that niche. If your customers search online, we can help you reach them.`,
              },
              {
                q: "How does the free business audit work?",
                a: "Put in your business name and city. In about 60 seconds the audit grades your online presence across six categories — Google reputation, website performance, AI search readiness, reviews, citations, and more. No signup, no credit card, no sales call. You get the gaps and exactly what to fix.",
              },
              {
                q: "Can I try the AI receptionist before buying?",
                a: "Yes. The live demo at fastdigitalmarketing.com/demo lets you talk to Holland in your browser — pick your industry and she behaves like your business's AI receptionist. You can also call our main number at (888) 972-1544 to hear Holland handle a real call. No obligation either way.",
              },
              {
                q: "What is included in the Full Automation Stack?",
                a: "The Full Automation Stack at $397/mo includes everything from the lower tiers — Smart Website, click-to-call, contact forms, self-service dashboard, AI Search Optimization, weekly AI blog posts, Holland the 24/7 AI voice receptionist, and the dedicated business phone number — plus Review Autopilot, New-Client Nurture drips, Local SEO + AI Search content strategy, and Guided Google Business Profile setup. Live in 5 business days. Month-to-month, cancel anytime.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/[0.08] bg-slate-900 transition-colors hover:border-white/[0.15]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-white select-none [&::-webkit-details-marker]:hidden list-none">
                  <span>{item.q}</span>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-slate-500 transition-transform group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-slate-400 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ABOUT — Who we are, track record, credibility
          ══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="relative px-6 py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                About Fast Digital Marketing
              </p>
              <h2 className="font-display text-4xl font-bold text-white sm:text-5xl tracking-tight leading-[1.1]">
                Built by a business owner. <span className="text-gradient-blue">Run by AI.</span>
              </h2>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                Fast Digital Marketing was founded by Thad Paschall, a business owner with over
                25 years of hands-on experience. Thad grew a home-service business from a single
                truck to a $130 million enterprise — writing checks for websites that never ranked,
                ad agencies that burned budget, and SEO firms that sent monthly PDFs but never moved
                the phone. He figured out what actually works and built Fast Digital Marketing to
                ship that playbook as software.
              </p>
              <p className="mt-4 text-lg text-slate-400 leading-relaxed">
                We are an AI-delivered platform, not an agency. Every service — Smart Website, AI
                Voice Receptionist, AI Search Optimization, Review Autopilot, Lead Nurture — is
                built into software, delivered by AI, and priced so any small business can afford
                it. No account managers. No monthly calls. No contracts. You sign up, you go live
                in five days, and you cancel any time from your dashboard.
              </p>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
              >
                Read the Full Story
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-blue-900/10 p-6 text-center">
                <div className="font-display text-4xl font-bold text-white">25+</div>
                <p className="mt-2 text-sm text-slate-400">Years Experience</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/10 to-emerald-900/10 p-6 text-center">
                <div className="font-display text-4xl font-bold text-white">$130M</div>
                <p className="mt-2 text-sm text-slate-400">Revenue Track Record</p>
              </div>
              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 to-violet-900/10 p-6 text-center">
                <div className="font-display text-4xl font-bold text-white">{INDUSTRIES.length}+</div>
                <p className="mt-2 text-sm text-slate-400">Industry Playbooks</p>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-600/10 to-amber-900/10 p-6 text-center">
                <div className="font-display text-4xl font-bold text-white">100%</div>
                <p className="mt-2 text-sm text-slate-400">U.S.-Based Platform</p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-8">
              <h3 className="mb-3 text-lg font-bold text-white">Our Mission</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Give every small business access to the same digital marketing firepower big
                corporations use — at a price that actually fits a small business budget. No fluff,
                no vanity metrics. More leads, more revenue.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-8">
              <h3 className="mb-3 text-lg font-bold text-white">Our Approach</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                One integrated system — website, voice receptionist, AI Search Optimization, reviews,
                and nurture — working together as a single revenue engine. Built on AI so you pay
                software prices, not agency prices.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-8">
              <h3 className="mb-3 text-lg font-bold text-white">Our Guarantee</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                No long-term contracts. $0 setup on every plan. Cancel anytime from your dashboard.
                We earn the business every month by delivering results you can see — and feel in your
                bottom line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CONTACT / CTA — Big and bold
          ══════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative px-6 py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-blue-600/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl">
          {/* Primary CTA */}
          <div className="border-gradient rounded-3xl bg-slate-900 p-12 text-center lg:p-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-400 mb-8">
              FREE &middot; INSTANT &middot; NO CREDIT CARD
            </div>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl tracking-tight">
              Get Your Free
              <br />
              <span className="text-gradient-blue">Business Audit</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400 leading-relaxed">
              See exactly how your business appears online — Google reputation, website quality,
              AI search readiness, reviews, and more. Takes 60 seconds.
            </p>
            <a
              href="/audit"
              className="group mt-10 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-12 py-5 text-xl font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)]"
            >
              Start My Free Audit
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <p className="mt-5 text-sm text-slate-600">
              No signup. No sales call. Just instant results.
            </p>
          </div>

          {/* Secondary CTAs */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Link
              href="/demo"
              className="card-hover rounded-2xl border border-white/[0.08] bg-slate-900 p-8 text-center"
            >
              <div className="mb-3 text-3xl">🎙</div>
              <h3 className="text-lg font-bold text-white">Try a Live AI Demo</h3>
              <p className="mt-2 text-sm text-slate-400">
                Hear Holland handle calls for your industry. No signup needed.
              </p>
            </Link>
            <a
              href="tel:+18889721544"
              className="card-hover rounded-2xl border border-white/[0.08] bg-slate-900 p-8 text-center"
            >
              <div className="mb-3 text-3xl">📞</div>
              <h3 className="text-lg font-bold text-white">Call: (888) 972-1544</h3>
              <p className="mt-2 text-sm text-slate-400">
                Holland answers 24/7 — experience the product firsthand.
              </p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
