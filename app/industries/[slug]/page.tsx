import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/lib/data/industries";
import { UNIFIED_PACKAGES } from "@/lib/data/packages";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Not Found" };

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: { canonical: `https://fastdigitalmarketing.com/industries/${industry.slug}` },
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      url: `https://fastdigitalmarketing.com/industries/${industry.slug}`,
      type: "website",
    },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Digital Marketing for ${industry.name}`,
    provider: { "@type": "ProfessionalService", name: "Fast Digital Marketing", url: "https://fastdigitalmarketing.com" },
    description: industry.metaDescription,
    url: `https://fastdigitalmarketing.com/industries/${industry.slug}`,
    areaServed: "United States",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-3xl">
          <p className="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            Marketing for {industry.name}
          </p>
          <h1 className="reveal reveal-delay-1 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl tracking-tight">
            {industry.hero}
          </h1>
          <p className="reveal reveal-delay-2 mx-auto mt-6 max-w-xl text-lg text-slate-400 leading-relaxed">
            AI-powered marketing automation built specifically for {industry.name.toLowerCase()}.
            More leads, more revenue, less manual work.
          </p>
          <div className="reveal reveal-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-5 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)]"
            >
              🎙 Try a Live AI Demo
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-medium text-white transition-all hover:bg-white/10 backdrop-blur-sm"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.06] bg-slate-900/50 px-6 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {industry.stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-gradient-blue stat-value">{s.value}</div>
              <div className="mt-1.5 text-xs text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pain Points */}
      <section className="relative px-6 py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
        <div className="relative mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-white sm:text-4xl tracking-tight">
            Sound <span className="text-gradient-fire">Familiar?</span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {industry.painPoints.map((pain, i) => (
              <div
                key={i}
                className="card-hover flex items-start gap-3 rounded-2xl border border-red-900/20 bg-red-950/10 p-5"
              >
                <span className="mt-0.5 text-red-400 text-lg">✕</span>
                <p className="text-sm text-slate-300 leading-relaxed">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="mb-4 text-center font-display text-3xl font-bold text-white sm:text-4xl tracking-tight">
            How We <span className="text-gradient-electric">Fix It</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-slate-400">
            Every solution below is automated, runs 24/7, and requires minimal involvement from you or your staff.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industry.solutions.map((sol, i) => (
              <div
                key={sol.title}
                className="card-hover rounded-2xl border border-white/[0.08] bg-slate-900/80 p-7"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <h3 className="mb-2 text-lg font-bold text-white">{sol.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{sol.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center font-display text-3xl font-bold text-white sm:text-4xl tracking-tight">
            Simple, Transparent <span className="text-gradient-blue">Pricing</span>
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-slate-400">
            No long-term contracts. No hidden fees. Cancel anytime.
          </p>
          <div className="grid gap-6 lg:grid-cols-4">
            {UNIFIED_PACKAGES.map((pkg) => (
              <div
                key={pkg.slug}
                className={`card-hover rounded-2xl border p-7 ${
                  pkg.highlighted
                    ? "border-blue-500/40 bg-blue-950/20 ring-1 ring-blue-500/20 relative"
                    : "border-white/[0.08] bg-slate-900/80"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{pkg.tagline}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">${pkg.priceMonthly}</span>
                  <span className="ml-1 text-sm text-slate-500">/mo</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  or ${pkg.priceAnnual}/yr (2 months free)
                </p>
                <ul className="mt-6 space-y-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/pricing?tier=${pkg.slug}`}
                  className={`mt-6 block rounded-xl py-3 text-center text-sm font-bold transition-all ${
                    pkg.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-slate-500">
            $0 setup · month-to-month · cancel anytime · all services fully automated
          </p>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="border-gradient rounded-3xl bg-slate-900 p-12 text-center">
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              Hear It Before You Buy It
            </h2>
            <p className="mt-4 text-slate-400">
              Try a live AI voice demo customized for {industry.name.toLowerCase()} — right in your browser, no signup needed.
            </p>
            <Link
              href="/demo"
              className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-4 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)]"
            >
              🎙 Try the Live Demo
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-white tracking-tight">
            Frequently Asked <span className="text-gradient-blue">Questions</span>
          </h2>
          <div className="space-y-4">
            {industry.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/[0.08] bg-slate-900/80 p-7">
                <h3 className="font-bold text-white text-lg">{faq.question}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
