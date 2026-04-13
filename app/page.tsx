import type { Metadata } from "next";

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
    description:
      "Every call answered on the first ring — 24/7, nights, weekends, holidays. Natural conversation, appointment booking, and lead qualification. Never lose a caller to voicemail again.",
    highlights: ["24/7 live answering", "Natural British accent", "Books appointments", "Transfers when needed"],
  },
  {
    icon: "⚡",
    title: "Voice AI Callback",
    slug: "voice-ai-callback",
    description:
      "Every missed call returned in under 60 seconds by your AI agent. She calls back, qualifies the lead, and books the appointment — automatically.",
    highlights: ["60-second callback", "Lead qualification", "Direct booking", "Call recordings"],
  },
  {
    icon: "💬",
    title: "Missed Call Text-Back",
    slug: "missed-call-text-back",
    description:
      "When a call goes unanswered, the caller gets an instant text: 'Sorry we missed you! How can we help?' Recovers 30-40% of missed leads.",
    highlights: ["Instant response", "Two-way texting", "Booking links", "After-hours aware"],
  },
  {
    icon: "⭐",
    title: "Review Autopilot",
    slug: "review-autopilot",
    description:
      "Automated review requests after every job or appointment. Happy customers go to Google, unhappy ones come to you privately. Watch your rating climb.",
    highlights: ["Automated requests", "Smart routing", "One-tap reviews", "Response templates"],
  },
  {
    icon: "🔄",
    title: "Client Reactivation",
    slug: "client-reactivation",
    description:
      "Your database is full of dormant customers. We reach out automatically with personalized messages to bring them back. Most businesses reactivate 15-25%.",
    highlights: ["Dormant client ID", "Multi-step sequences", "Direct booking", "ROI tracking"],
  },
  {
    icon: "🎯",
    title: "New Client Nurture",
    slug: "new-client-nurture",
    description:
      "Only 2% of leads convert on first contact. Our automated sequences follow up via text and email until they book — no leads fall through the cracks.",
    highlights: ["Instant first response", "Multi-channel", "Behavior triggers", "Hot lead alerts"],
  },
  {
    icon: "💻",
    title: "Smart Website",
    slug: "smart-website",
    description:
      "Fast, modern websites built on Next.js that load in under 2 seconds and are optimized for Google and AI search engines. Delivered in 5 business days.",
    highlights: ["Sub-2s load time", "Mobile-first", "SEO-ready", "AI search optimized"],
  },
  {
    icon: "📈",
    title: "Local SEO & AI Search",
    slug: "local-seo-ai",
    description:
      "Rank on Google Maps, organic search, AND AI search engines. We optimize your presence for everywhere customers search — Google, ChatGPT, Perplexity.",
    highlights: ["GBP optimization", "Citation building", "Content strategy", "AI search optimization"],
  },
  {
    icon: "🎰",
    title: "Paid Advertising",
    slug: "paid-advertising",
    description:
      "Google Ads and Local Service Ads that turn ad spend into booked jobs. Tight targeting, compelling copy, and weekly optimization for maximum ROI.",
    highlights: ["Search campaigns", "Local Service Ads", "Conversion tracking", "Weekly optimization"],
  },
  {
    icon: "🚀",
    title: "Full Automation Stack",
    slug: "full-automation-stack",
    description:
      "Everything above in one integrated package. AI receptionist, callbacks, texts, reviews, reactivation, nurture, website, SEO, and ads — all on autopilot.",
    highlights: ["Every service included", "One integrated system", "Live in 5 days", "Monthly strategy calls"],
  },
];

const STATS = [
  { value: "10+", label: "Years in Business" },
  { value: "200+", label: "Clients Served" },
  { value: "3.8x", label: "Average ROAS" },
  { value: "92%", label: "Client Retention Rate" },
];

const REASONS = [
  {
    title: "We Move Fast",
    description:
      "No 6-week onboarding. We get campaigns live and websites launched faster than any agency you've worked with — without cutting corners.",
  },
  {
    title: "Transparent Reporting",
    description:
      "You'll know exactly what your money is doing. Monthly dashboards, real numbers, no fluff.",
  },
  {
    title: "Industry Agnostic",
    description:
      "We've driven results for healthcare, legal, home services, e-commerce, SaaS, and more. If your customers are online, we can reach them.",
  },
  {
    title: "AI-Enhanced Execution",
    description:
      "We use the latest AI tools to move faster, write better copy, and spot opportunities that human-only teams miss.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery & Audit",
    description:
      "We analyze your current online presence, competitors, and biggest growth opportunities. You get a plain-English breakdown — free, no commitment.",
  },
  {
    step: "02",
    title: "Strategy & Roadmap",
    description:
      "We build a custom plan targeting your highest-ROI channels. No generic templates — everything is tailored to your business and budget.",
  },
  {
    step: "03",
    title: "Launch & Execute",
    description:
      "Campaigns go live, websites get built, and content gets published. We execute fast and iterate based on data, not gut feelings.",
  },
  {
    step: "04",
    title: "Measure & Scale",
    description:
      "Monthly reporting shows exactly what's working. We double down on winners and eliminate waste — compounding your results over time.",
  },
];

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Fast Digital Marketing",
    url: "https://fastdigitalmarketing.com",
    description:
      "Digital marketing agency specializing in SEO, Google Ads, web design, social media, and AI-powered marketing automation.",
    serviceType: [
      "Search Engine Optimization",
      "Pay-Per-Click Advertising",
      "Web Design",
      "Social Media Marketing",
      "Marketing Automation",
    ],
    areaServed: "United States",
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-24 text-center lg:py-32">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[500px] w-[800px] rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <p className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Digital Marketing Agency
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Grow Your Business Online.{" "}
            <span className="text-blue-400">Fast.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            SEO, Google Ads, web design, and AI-powered automation — all under one roof.
            We help businesses in any industry get more leads, more traffic, and more revenue online.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Get a Free Marketing Audit →
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white transition hover:bg-white/10"
            >
              See Our Services
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-slate-900/50 px-6 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold text-blue-400">{s.value}</div>
              <div className="mt-1 text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-500">
              What We Do
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Full-Service Digital Marketing
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Everything your business needs to dominate online — no piecemeal agencies, no finger-pointing.
              One team, full accountability.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <a
                key={s.title}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-white/[0.08] bg-slate-900 p-7 transition hover:border-blue-700/50 hover:shadow-lg hover:shadow-blue-950/40"
              >
                <div className="mb-4 text-3xl">{s.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">{s.title}</h3>
                <p className="mb-4 text-sm text-slate-400 leading-relaxed">{s.description}</p>
                <ul className="space-y-1.5">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-slate-500">
                      <svg className="h-3.5 w-3.5 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-500 group-hover:text-blue-400">
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FDM ──────────────────────────────────────────────────────── */}
      <section id="why-fdm" className="border-t border-white/[0.06] bg-slate-900/30 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-500">
                Why Choose Us
              </p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl leading-tight">
                Marketing That Actually Moves the Needle
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Most agencies talk about strategy. We obsess over execution.
                Every dollar you spend should return more than a dollar — and we have the reporting to prove it.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Start Growing →
              </a>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {REASONS.map((r) => (
                <div
                  key={r.title}
                  className="rounded-xl border border-white/[0.08] bg-slate-900 p-6"
                >
                  <div className="mb-2 h-8 w-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                  </div>
                  <h3 className="mb-1.5 font-semibold text-white">{r.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section id="process" className="border-t border-white/[0.06] px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-500">
              How It Works
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              From Audit to Revenue in 4 Steps
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              No endless kick-off calls. We learn your business, build your strategy, and get to work.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="relative">
                <div className="mb-4 text-4xl font-bold text-blue-600/30">{p.step}</div>
                <h3 className="mb-2 font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────────── */}
      <section id="industries" className="border-t border-white/[0.06] bg-slate-900/30 px-6 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">Industries We Serve</p>
          <h2 className="mb-6 text-2xl font-bold text-white">Pre-Packaged Marketing for Your Industry</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: "Security Companies", slug: "security-companies" },
              { name: "Chiropractors", slug: "chiropractors" },
              { name: "Dental Practices", slug: "dental" },
              { name: "Plumbing Companies", slug: "plumbers" },
              { name: "HVAC Companies", slug: "hvac" },
              { name: "Electricians", slug: "electricians" },
              { name: "Roofing Companies", slug: "roofers" },
              { name: "Law Firms", slug: "law-firms" },
              { name: "Medical Spas", slug: "medical-spas" },
            ].map((industry) => (
              <a
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 transition hover:border-blue-500/50 hover:bg-blue-950/30 hover:text-blue-300"
              >
                {industry.name} →
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ────────────────────────────────────────────────── */}
      <section id="contact" className="border-t border-white/[0.06] px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-blue-900/40 bg-gradient-to-br from-blue-950/60 to-slate-900 p-10">
            <div className="text-center mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
                Schedule Your AI Strategy Call
              </p>
              <h2 className="text-3xl font-bold text-white">
                See How AI Can Work for Your Business
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400 leading-relaxed">
                On this call, you&apos;ll sit down with Thad Paschall — the entrepreneur who built an
                800,000-installation home services company from scratch, disrupted the industry with the
                DIY model, and now deploys AI systems that run businesses 24/7.
              </p>
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.08] bg-white/5 p-4 text-center">
                <div className="mb-1 text-lg font-bold text-blue-400">1</div>
                <p className="text-xs text-slate-400">Review your current lead flow and where you&apos;re losing customers</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/5 p-4 text-center">
                <div className="mb-1 text-lg font-bold text-blue-400">2</div>
                <p className="text-xs text-slate-400">Live walkthrough of AI receptionist, review automation, and follow-up systems</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/5 p-4 text-center">
                <div className="mb-1 text-lg font-bold text-blue-400">3</div>
                <p className="text-xs text-slate-400">Custom recommendation with clear pricing — no surprises</p>
              </div>
            </div>

            {/* GHL Calendar Embed */}
            <div className="rounded-xl overflow-hidden bg-white">
              <iframe
                src="https://link.fastaiautomationagency.com/widget/booking/PNYld3gQjtIioQrzWA3K"
                style={{ width: "100%", height: "700px", border: "none", overflow: "hidden" }}
                scrolling="no"
                id="JUCcDTW3W6EHYyQNNjR4_1776101092179"
                title="Schedule Your AI Strategy Call"
              />
            </div>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script src="https://link.fastaiautomationagency.com/js/form_embed.js" type="text/javascript" />

            <p className="mt-4 text-center text-xs text-slate-600">
              This call is for business owners ready to grow — not vendors.
              If you&apos;re selling something, we admire the hustle:{" "}
              <a href="mailto:info@fastdigitalmarketing.com" className="text-slate-500 hover:text-blue-400">
                info@fastdigitalmarketing.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
