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
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
            {service.title}
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{service.hero}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400 leading-relaxed">
            {service.intro}
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
            What&apos;s Included
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/[0.08] bg-slate-900 p-6">
                <h3 className="mb-2 font-semibold text-white">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-white/[0.06] bg-slate-900/30 px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
            Our Process
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p) => (
              <div key={p.step}>
                <div className="mb-3 text-4xl font-bold text-blue-600/30">{p.step}</div>
                <h3 className="mb-2 font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-white/[0.06] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-white/[0.08] bg-slate-900 p-6">
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] px-6 py-14">
        <div className="mx-auto max-w-2xl rounded-2xl border border-blue-900/40 bg-gradient-to-br from-blue-950/60 to-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mx-auto mt-3 max-w-md text-slate-400">
            Tell us about your business and goals. We&apos;ll put together a custom strategy — free, no commitment.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-8 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </>
  );
}
