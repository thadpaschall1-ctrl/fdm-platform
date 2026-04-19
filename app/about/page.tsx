import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Fast Digital Marketing — Founded by a $130M Operator",
  description:
    "Fast Digital Marketing was founded by Thad Paschall, who scaled a home-service business from one truck to $130 million. Now every small business gets the same firepower — AI-delivered, fully automated, no contracts.",
  alternates: {
    canonical: "https://fastdigitalmarketing.com/about",
  },
  openGraph: {
    title: "About Fast Digital Marketing",
    description:
      "Built by a business owner who scaled to $130M. AI-delivered marketing for every industry. Fully automated. Keep it simple, make it work.",
    url: "https://fastdigitalmarketing.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Fast Digital Marketing",
      url: "https://fastdigitalmarketing.com",
      founder: {
        "@type": "Person",
        name: "Thad Paschall",
        description:
          "Business owner with 25+ years of hands-on experience. Scaled a home-service business from a single truck to a $130 million enterprise.",
      },
      description:
        "A U.S.-based, AI-delivered digital marketing platform serving small and mid-sized businesses across every industry. Smart Websites, AI Voice Receptionist, AI Search Optimization (ASO), Review Autopilot, and Lead Nurture — all automated, all self-service, no contracts.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-3xl">
          <p className="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            About Us
          </p>
          <h1 className="reveal reveal-delay-1 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
            Built by a business owner.
            <br />
            <span className="text-gradient-blue">Run by AI.</span>
          </h1>
          <p className="reveal reveal-delay-2 mx-auto mt-6 max-w-xl text-lg text-slate-400 leading-relaxed">
            Fast Digital Marketing gives every small business the same online
            firepower the big companies use — at a price that actually fits a
            small business budget.
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-5 lg:items-start">
            <div className="lg:col-span-3">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
                Founder Story
              </p>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight leading-[1.15]">
                One truck to{" "}
                <span className="text-gradient-blue">$130 million.</span>
              </h2>
              <div className="mt-6 space-y-4 text-base text-slate-300 leading-relaxed">
                <p>
                  Fast Digital Marketing was founded by Thad Paschall, a
                  business owner with over 25 years of hands-on experience
                  building and scaling companies.
                </p>
                <p>
                  Thad grew a home-service business from a single truck into a
                  $130 million enterprise. Along the way he wrote the checks
                  for websites that never ranked, ad agencies that burned
                  budget, and SEO firms that sent monthly PDFs full of charts
                  but never moved the phone.
                </p>
                <p>
                  He also figured out what actually works. Answer every call.
                  Follow up fast. Ask every happy customer for a review. Show
                  up in search when someone nearby is ready to buy. Keep the
                  website simple, fast, and obvious. Do those things every
                  day, without fail, and revenue follows.
                </p>
                <p>
                  That is the playbook Fast Digital Marketing ships — built
                  into software, delivered by AI, priced so any small business
                  can afford it.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-blue-900/10 p-6 text-center">
                <div className="font-display text-4xl font-bold text-white">
                  25+
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Years in business
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/10 to-emerald-900/10 p-6 text-center">
                <div className="font-display text-4xl font-bold text-white">
                  $130M
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Revenue track record
                </p>
              </div>
              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 to-violet-900/10 p-6 text-center">
                <div className="font-display text-4xl font-bold text-white">
                  100%
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  U.S.-based platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KISS philosophy */}
      <section className="relative px-6 py-20 border-y border-white/[0.06] bg-slate-900/40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
              Our Philosophy
            </p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight leading-[1.15]">
              Keep it simple,{" "}
              <span className="text-gradient-electric">stupid.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
              KISS. The oldest rule in business, and still the one most
              agencies break. Most win by making it look complicated so you
              cannot leave. We win by making it so simple you stay because it
              works.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-slate-950 p-7">
              <div className="mb-3 text-3xl">🎯</div>
              <h3 className="text-lg font-bold text-white">
                One price, every industry
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                A plumber and a law firm both pay the same $197/mo for the
                Smart Website. No custom quotes, no sales calls, no mystery.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-slate-950 p-7">
              <div className="mb-3 text-3xl">🤖</div>
              <h3 className="text-lg font-bold text-white">
                AI does the heavy lifting
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Your website, your voice receptionist, your review requests,
                and your follow-ups run on automation — 24/7, no sick days.
                That is how we charge $197 instead of $1,500.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-slate-950 p-7">
              <div className="mb-3 text-3xl">📅</div>
              <h3 className="text-lg font-bold text-white">
                Live in 5 business days
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Answer a few questions, upload your logo, pick your colors.
                Five business days later your Smart Website is live and
                ranking.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-slate-950 p-7">
              <div className="mb-3 text-3xl">📊</div>
              <h3 className="text-lg font-bold text-white">
                You own the dashboard
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Every call, every form, every review, every follow-up — in one
                place, in real time. Upgrade, downgrade, or cancel in one
                click.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-slate-950 p-7">
              <div className="mb-3 text-3xl">🚫</div>
              <h3 className="text-lg font-bold text-white">
                No contracts. Ever.
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Every plan is month-to-month. If we stop earning our keep, you
                walk away. No phone calls. No retention specialist. Just a
                cancel button.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-slate-950 p-7">
              <div className="mb-3 text-3xl">💬</div>
              <h3 className="text-lg font-bold text-white">
                Plain English, always
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                No buzzwords. No jargon. Every feature, every invoice, every
                report — written so a ninth-grader gets it on the first read.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How we operate — Thad's operating principles */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
              How We Operate
            </p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight leading-[1.15]">
              Always ask why.{" "}
              <span className="text-gradient-blue">Then run fast.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
              The operating rules Thad built a $130M company on — the same
              rules we build product on every day.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-7">
              <div className="mb-3 text-3xl">❓</div>
              <h3 className="text-lg font-bold text-white">
                Always ask why
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Why can&rsquo;t I do this? Why not? Why? Keep asking until the
                real answer shows up. Most &ldquo;that&rsquo;s just how it
                works&rdquo; falls apart on the third why.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-7">
              <div className="mb-3 text-3xl">💪</div>
              <h3 className="text-lg font-bold text-white">
                Do what others won&rsquo;t
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Answer at 11pm. Ship the price everyone else hides. Build the
                feature other agencies charge extra for. Most of the edge is
                just showing up where others stopped.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-7">
              <div className="mb-3 text-3xl">🏃</div>
              <h3 className="text-lg font-bold text-white">
                Run fast. Don&rsquo;t look back
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                When the answer is yes, move. Speed beats perfect every time.
                We ship in days what big agencies ship in quarters — because
                momentum is the product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why FDM exists */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-400">
              Why We Exist
            </p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight leading-[1.15]">
              Small business marketing is{" "}
              <span className="text-gradient-blue">broken.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-900/20 to-slate-950 p-7">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-red-400">
                The old way
              </h3>
              <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-red-400">✕</span>
                  <span>
                    $2,000/mo retainer with a 12-month contract
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400">✕</span>
                  <span>
                    A junior account manager who just graduated
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400">✕</span>
                  <span>
                    Monthly PDF reports full of charts, no leads
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400">✕</span>
                  <span>
                    Calls going to voicemail after 5pm and all weekend
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400">✕</span>
                  <span>
                    A website you cannot edit without a ticket
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-slate-950 p-7">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">
                The FDM way
              </h3>
              <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>
                    $47–$397/mo, month-to-month, cancel in one click
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>
                    AI that never takes a day off or misses a call
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>
                    Live dashboard — every call, lead, and review
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>
                    24/7 answering — including nights and weekends
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>
                    Self-serve edits that save in seconds, not days
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Approach / Guarantee */}
      <section className="relative px-6 py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-8">
              <h3 className="mb-3 text-lg font-bold text-white">
                Our Mission
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Give every small business access to the same digital marketing
                firepower the big corporations use — at a price point that
                makes sense. No fluff, no vanity metrics. More leads, more
                revenue.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-8">
              <h3 className="mb-3 text-lg font-bold text-white">
                Our Approach
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                One integrated system — website, voice receptionist, AI Search
                Optimization, reviews, and nurture — working together as a
                single revenue engine. Built on AI so you pay software prices,
                not agency prices.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-8">
              <h3 className="mb-3 text-lg font-bold text-white">
                Our Guarantee
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                No long-term contracts. $0 setup on every plan. Cancel anytime
                from your dashboard. We earn your business every month by
                delivering results you can see — and feel in your bottom line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-blue-600/20 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight leading-[1.15]">
            Ready to see it work for{" "}
            <span className="text-gradient-blue">your business?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate-400 leading-relaxed">
            Get a free audit of your current online presence — website speed,
            AI search visibility, Google Business Profile, and missed-call
            risk. No sales pitch, no strings.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="group relative inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Get My Free Audit →</span>
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center rounded-xl border border-white/[0.12] bg-white/[0.03] px-6 py-3 text-sm font-bold text-white hover:bg-white/[0.08] transition-colors"
            >
              Try the Live Demo
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            Or call us direct:{" "}
            <a
              href="tel:+18889721544"
              className="text-slate-300 hover:text-white transition-colors"
            >
              (888) 972-1544
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
