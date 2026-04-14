import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedStats } from "@/components/animated-stats";
import { ServiceCard } from "@/components/service-card";
import { ProcessTimeline } from "@/components/process-timeline";

export const metadata: Metadata = {
  title: "Fast Digital Marketing | SEO, Google Ads & Web Design Agency",
  description:
    "Fast Digital Marketing helps businesses grow online with SEO, Google Ads, professional web design, and AI-powered marketing automation. Get measurable results — fast.",
  alternates: {
    canonical: "https://fastdigitalmarketing.com",
  },
  openGraph: {
    title: "Fast Digital Marketing | SEO, Google Ads & Web Design Agency",
    description:
      "Grow your business online with SEO, paid ads, web design, and AI automation. Results-driven digital marketing for any industry.",
    url: "https://fastdigitalmarketing.com",
    type: "website",
  },
};

const SERVICES = [
  {
    icon: "📞",
    title: "AI Voice Receptionist",
    slug: "ai-voice-receptionist",
    price: "$197/mo",
    tier: "Starter",
    description: "Every call answered on the first ring — 24/7. Natural conversation, appointment booking, and lead qualification.",
    highlights: ["24/7 live answering", "Natural British accent", "Books appointments", "Transfers when needed"],
    color: "from-blue-600 to-cyan-500",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    icon: "⚡",
    title: "Voice AI Callback",
    slug: "voice-ai-callback",
    price: "$197/mo",
    tier: "Starter",
    description: "Every missed call returned in under 60 seconds by your AI agent. She calls back, qualifies, and books.",
    highlights: ["60-second callback", "Lead qualification", "Direct booking", "Call recordings"],
    color: "from-violet-600 to-purple-500",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: "⭐",
    title: "Review Autopilot",
    slug: "review-autopilot",
    price: "$397/mo",
    tier: "Growth",
    description: "Automated review requests after every job. Happy customers go to Google, unhappy ones come to you.",
    highlights: ["Automated requests", "Smart routing", "One-tap reviews", "Response templates"],
    color: "from-amber-500 to-orange-500",
    glow: "group-hover:shadow-amber-500/20",
  },
  {
    icon: "🔄",
    title: "Client Reactivation",
    slug: "client-reactivation",
    price: "$397/mo",
    tier: "Growth",
    description: "Your database is full of dormant customers. We reach out automatically to bring them back. 15-25% reactivation.",
    highlights: ["Dormant client ID", "Multi-step sequences", "Direct booking", "ROI tracking"],
    color: "from-pink-600 to-rose-500",
    glow: "group-hover:shadow-pink-500/20",
  },
  {
    icon: "🎯",
    title: "New Client Nurture",
    slug: "new-client-nurture",
    price: "$397/mo",
    tier: "Growth",
    description: "Only 2% of leads convert on first contact. Our sequences follow up until they book — no leads lost.",
    highlights: ["Instant first response", "Multi-channel", "Behavior triggers", "Hot lead alerts"],
    color: "from-sky-600 to-blue-500",
    glow: "group-hover:shadow-sky-500/20",
  },
  {
    icon: "💻",
    title: "Smart Website",
    slug: "smart-website",
    price: "$397/mo",
    tier: "Growth",
    description: "Next.js sites that load in under 2 seconds, optimized for Google AND AI search. Delivered in 5 days.",
    highlights: ["Sub-2s load time", "Mobile-first", "SEO-ready", "AI search optimized"],
    color: "from-indigo-600 to-blue-500",
    glow: "group-hover:shadow-indigo-500/20",
  },
  {
    icon: "📈",
    title: "Local SEO & AI Search",
    slug: "local-seo-ai",
    price: "$397/mo",
    tier: "Growth",
    description: "Rank on Google Maps, organic search, AND AI engines. Google, ChatGPT, Perplexity — everywhere customers search.",
    highlights: ["GBP optimization", "Citation building", "Content strategy", "AI search optimization"],
    color: "from-teal-600 to-cyan-500",
    glow: "group-hover:shadow-teal-500/20",
  },
  {
    icon: "🎰",
    title: "Paid Advertising",
    slug: "paid-advertising",
    price: "$697/mo",
    tier: "Pro",
    description: "Google Ads that turn spend into booked jobs. Tight targeting, compelling copy, weekly optimization.",
    highlights: ["Search campaigns", "Local Service Ads", "Conversion tracking", "Weekly optimization"],
    color: "from-red-600 to-orange-500",
    glow: "group-hover:shadow-red-500/20",
  },
  {
    icon: "🚀",
    title: "Full Automation Stack",
    slug: "full-automation-stack",
    price: "$697/mo",
    tier: "Pro",
    description: "Everything in one package. AI receptionist, callbacks, reviews, reactivation, website, SEO, ads.",
    highlights: ["Every service included", "One integrated system", "Live in 5 days", "Monthly strategy calls"],
    color: "from-blue-600 to-violet-600",
    glow: "group-hover:shadow-blue-500/20",
  },
];

const INDUSTRIES = [
  { name: "Security Companies", slug: "security-companies" },
  { name: "Chiropractors", slug: "chiropractors" },
  { name: "Dental Practices", slug: "dental" },
  { name: "Plumbing Companies", slug: "plumbers" },
  { name: "HVAC Companies", slug: "hvac" },
  { name: "Electricians", slug: "electricians" },
  { name: "Roofing Companies", slug: "roofers" },
  { name: "Law Firms", slug: "law-firms" },
  { name: "Medical Spas", slug: "medical-spas" },
];

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://fastdigitalmarketing.com/#organization",
    name: "Fast Digital Marketing",
    url: "https://fastdigitalmarketing.com",
    logo: "https://fastdigitalmarketing.com/logo.png",
    image: "https://fastdigitalmarketing.com/og-image.png",
    description:
      "Fast Digital Marketing is a full-service digital marketing agency in Tampa, FL specializing in SEO, Google Ads, web design, AI voice receptionists, and marketing automation for businesses across all industries.",
    telephone: "+18889834449",
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
      "Search Engine Optimization",
      "Pay-Per-Click Advertising",
      "Web Design",
      "AI Voice Receptionist",
      "Marketing Automation",
      "Review Management",
      "Client Reactivation",
    ],
    priceRange: "$$",
    sameAs: [
      "https://www.facebook.com/fastdigitalmarketing",
      "https://www.linkedin.com/company/fast-digital-marketing",
      "https://www.yelp.com/biz/fast-digital-marketing-tampa",
    ],
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
          text: "Fast Digital Marketing is a full-service digital marketing agency based in Tampa, FL. We help businesses grow online through SEO, Google Ads, professional web design, AI-powered voice receptionists, review management, client reactivation campaigns, and complete marketing automation. We work with businesses in any industry across the United States.",
        },
      },
      {
        "@type": "Question",
        name: "How much does the AI voice receptionist cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The AI Voice Receptionist starts at $197 per month with no long-term contracts. It answers every call 24/7 with a natural-sounding voice, qualifies leads, and books appointments directly into your calendar. You can cancel anytime. It is also included in our Growth and Pro plans.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our Smart Websites are built on Next.js and delivered in as few as 5 business days. Every site loads in under 2 seconds, is mobile-first, SEO-optimized, and designed for both Google and AI search engines. The monthly cost is $397 with no setup fee.",
        },
      },
      {
        "@type": "Question",
        name: "What industries does Fast Digital Marketing work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We work with businesses in any industry. Our most popular verticals include security companies, chiropractors, dental practices, plumbing companies, HVAC companies, electricians, roofing companies, law firms, and medical spas. If your customers search online, we can help you reach them.",
        },
      },
      {
        "@type": "Question",
        name: "How does the free business audit work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our free business audit takes about 60 seconds. Enter your business name and we instantly analyze your Google reputation, website performance, SEO health, and AI search readiness. There is no signup, no credit card, and no sales call required -- just instant, actionable results you can use right away.",
        },
      },
      {
        "@type": "Question",
        name: "Can I try the AI receptionist before buying?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can try a live AI demo right on our website at no cost. You can also call our main number at (888) 983-4449 to experience the AI receptionist firsthand -- Holland answers 24/7. There is no obligation to buy.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in the Full Automation Stack?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Full Automation Stack at $697/month includes every service we offer in one integrated package: AI voice receptionist, voice AI callback, review autopilot, client reactivation, new client nurture sequences, a smart website, local SEO and AI search optimization, and paid advertising management. It also includes monthly strategy calls and is live within 5 days.",
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
            Digital Marketing Agency — Tampa, FL
          </div>

          {/* Headline — absolutely massive */}
          <h1 className="reveal reveal-delay-1 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-8xl">
            Grow Your Business
            <br />
            <span className="text-gradient-blue">Online. Fast.</span>
          </h1>

          <p className="reveal reveal-delay-2 mx-auto mt-8 max-w-2xl text-lg text-slate-400 leading-relaxed sm:text-xl">
            SEO, Google Ads, web design, and AI-powered automation — all under one roof.
            We help businesses in <span className="text-white font-medium">any industry</span> get more leads, more traffic, and more revenue.
          </p>

          {/* CTA Row */}
          <div className="reveal reveal-delay-3 mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/audit"
              className="group relative inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-5 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)]"
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative">Get a Free Business Audit</span>
              <svg className="relative w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
            >
              <span className="text-xl">🎙</span> Try Live AI Demo
            </a>
          </div>

          {/* Trust signals below hero */}
          <div className="reveal reveal-delay-4 mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              No contracts
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Cancel anytime
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Results in 30 days
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              200+ businesses served
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
              Full-Service <span className="text-gradient-electric">Digital Marketing</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
              One team. Full accountability. No finger-pointing between five different agencies.
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
                Most agencies talk about strategy. We obsess over execution.
                Every dollar you spend should return more than a dollar — and we have the reporting to prove it.
              </p>
              <a
                href="/#contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10 hover:border-white/20"
              >
                Start Growing
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { title: "We Move Fast", desc: "No 6-week onboarding. Campaigns live, websites launched — faster than any agency you've worked with.", icon: "⚡", color: "from-blue-600/20 to-blue-900/20 border-blue-500/20" },
                { title: "Transparent Reporting", desc: "You'll know exactly what your money is doing. Monthly dashboards, real numbers, zero fluff.", icon: "📊", color: "from-emerald-600/20 to-emerald-900/20 border-emerald-500/20" },
                { title: "Industry Agnostic", desc: "Healthcare, legal, home services, SaaS — if your customers are online, we can reach them.", icon: "🌐", color: "from-violet-600/20 to-violet-900/20 border-violet-500/20" },
                { title: "AI-Enhanced", desc: "We use the latest AI to move faster, write better copy, and spot opportunities others miss.", icon: "🤖", color: "from-amber-600/20 to-amber-900/20 border-amber-500/20" },
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
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight mb-8">
            Pre-Packaged for <span className="text-gradient-electric">Your Industry</span>
          </h2>
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
              SEO health, AI search readiness. Takes 60 seconds.
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
              href="tel:+18889834449"
              className="card-hover rounded-2xl border border-white/[0.08] bg-slate-900 p-8 text-center"
            >
              <div className="mb-3 text-3xl">📞</div>
              <h3 className="text-lg font-bold text-white">Call: (888) 983-4449</h3>
              <p className="mt-2 text-sm text-slate-400">
                Our AI answers 24/7 — experience the product firsthand.
              </p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
