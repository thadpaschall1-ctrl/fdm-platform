import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "@/lib/data/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: "Not Found" };

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `https://fastdigitalmarketing.com/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://fastdigitalmarketing.com/services/${service.slug}`,
      type: "website",
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
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
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            {service.title}
          </p>
          <h1 className="reveal reveal-delay-1 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl tracking-tight">
            {service.hero}
          </h1>
          <p className="reveal reveal-delay-2 mx-auto mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            {service.intro}
          </p>
          <Link
            href="/#contact"
            className="reveal reveal-delay-3 group mt-10 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-5 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)]"
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">Get a Free Quote</span>
            <svg className="relative w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="relative px-6 py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-white sm:text-4xl tracking-tight">
            What&apos;s <span className="text-gradient-electric">Included</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <div
                key={f.title}
                className="card-hover rounded-2xl border border-white/[0.08] bg-slate-900/80 p-7"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <h3 className="mb-2 text-lg font-bold text-white">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-white sm:text-4xl tracking-tight">
            Our <span className="text-gradient-fire">Process</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p) => (
              <div key={p.step} className="card-hover rounded-2xl border border-white/[0.08] bg-slate-900/80 p-6 text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-gradient-blue">{p.step}</span>
                </div>
                <h3 className="mb-2 font-bold text-white">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
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
            {service.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/[0.08] bg-slate-900/80 p-7">
                <h3 className="font-bold text-white text-lg">{faq.question}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="border-gradient rounded-3xl bg-slate-900 p-12 text-center">
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">Ready to Get Started?</h2>
            <p className="mx-auto mt-4 max-w-md text-slate-400 leading-relaxed">
              Tell us about your business and goals. We&apos;ll put together a custom strategy — free, no commitment.
            </p>
            <Link
              href="/#contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-4 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)]"
            >
              Get a Free Quote
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
