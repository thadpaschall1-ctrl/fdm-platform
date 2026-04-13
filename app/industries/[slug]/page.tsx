import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/lib/data/industries";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) return { title: "Not Found" };

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: {
      canonical: `https://fastdigitalmarketing.com/industries/${industry.slug}`,
    },
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      url: `https://fastdigitalmarketing.com/industries/${industry.slug}`,
      type: "website",
    },
  };
}

export default function IndustryPage({
  params,
}: {
  params: { slug: string };
}) {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Digital Marketing for ${industry.name}`,
    provider: {
      "@type": "ProfessionalService",
      name: "Fast Digital Marketing",
      url: "https://fastdigitalmarketing.com",
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-20 text-center lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[700px] rounded-full bg-blue-600/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Marketing for {industry.name}
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{industry.hero}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            AI-powered marketing automation built specifically for {industry.name.toLowerCase()}.
            More leads, more revenue, less manual work.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              🎙 Try a Live AI Demo →
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-medium text-white transition hover:bg-white/10"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.06] bg-slate-900/50 px-6 py-10">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 text-center lg:grid-cols-4">
          {industry.stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-blue-400">{s.value}</div>
              <div className="mt-1 text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pain Points */}
      <section className="px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
            Sound Familiar?
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {industry.painPoints.map((pain, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-red-900/20 bg-red-950/10 p-4"
              >
                <span className="mt-0.5 text-red-400">✕</span>
                <p className="text-sm text-slate-300">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="border-t border-white/[0.06] bg-slate-900/30 px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-bold text-white sm:text-3xl">
            How We Fix It
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-slate-400">
            Every solution below is automated, runs 24/7, and requires minimal involvement from you or your staff.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industry.solutions.map((sol) => (
              <div
                key={sol.title}
                className="rounded-xl border border-white/[0.08] bg-slate-900 p-6"
              >
                <h3 className="mb-2 font-semibold text-white">{sol.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{sol.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-white/[0.06] px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-slate-400">
            No long-term contracts. No hidden fees. Cancel anytime.
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            {industry.packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl border p-7 ${
                  pkg.highlighted
                    ? "border-blue-500/50 bg-blue-950/20 ring-1 ring-blue-500/20"
                    : "border-white/[0.08] bg-slate-900"
                }`}
              >
                {pkg.highlighted && (
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
                    Most Popular
                  </p>
                )}
                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-white">{pkg.price}</span>
                  {pkg.setup && (
                    <span className="ml-2 text-sm text-slate-500">+ {pkg.setup}</span>
                  )}
                </div>
                <ul className="mt-6 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#contact"
                  className={`mt-6 block rounded-xl py-3 text-center text-sm font-bold transition ${
                    pkg.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="border-t border-white/[0.06] bg-slate-900/30 px-6 py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white">
            Hear It Before You Buy It
          </h2>
          <p className="mt-2 text-slate-400">
            Try a live AI voice demo customized for {industry.name.toLowerCase()} — right in your browser, no signup needed.
          </p>
          <Link
            href="/demo"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-8 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            🎙 Try the Live Demo →
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-white/[0.06] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {industry.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-white/[0.08] bg-slate-900 p-6"
              >
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
