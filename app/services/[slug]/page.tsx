import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "@/lib/data/services";
import { ServiceCheckoutButton } from "@/components/service-checkout-button";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://fastdigitalmarketing.com/services/${service.slug}/#faq`,
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://fastdigitalmarketing.com/services/${service.slug}/#service`,
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "ProfessionalService",
      "@id": "https://fastdigitalmarketing.com/#organization",
      name: "Fast Digital Marketing",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    offers: {
      "@type": "Offer",
      price: service.price.replace("$", ""),
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: service.price.replace("$", ""),
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

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

          {/* Pricing block */}
          <div className="reveal reveal-delay-3 mt-10 flex flex-col items-center gap-5">
            <div className="flex flex-wrap items-end justify-center gap-3">
              <div>
                <span className="text-5xl font-black text-white">{service.price}</span>
                <span className="text-xl text-slate-400">/mo</span>
              </div>
              {service.setupFee && (
                <span className="text-sm text-slate-500 pb-1.5">+ {service.setupFee} one-time setup</span>
              )}
            </div>
            {service.includedIn && (
              <p className="text-sm text-blue-400 font-medium">{service.includedIn}</p>
            )}
            <p className="text-xs text-slate-500">No contracts &middot; Cancel anytime</p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <ServiceCheckoutButton
                plan={service.planTier}
                serviceTitle={service.title}
                price={service.price}
                setupFee={service.setupFee}
              />
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-medium text-white transition-all hover:bg-white/10 backdrop-blur-sm"
              >
                🎙 Try Live Demo
              </Link>
            </div>
          </div>
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
            <div className="mt-4 flex items-end justify-center gap-2">
              <span className="text-4xl font-black text-white">{service.price}</span>
              <span className="text-lg text-slate-400 pb-0.5">/mo</span>
              {service.setupFee && (
                <span className="text-sm text-slate-500 pb-1">+ {service.setupFee} setup</span>
              )}
            </div>
            <p className="mt-3 text-sm text-slate-500">No contracts &middot; Cancel anytime</p>
            <div className="mt-8">
              <ServiceCheckoutButton
                plan={service.planTier}
                serviceTitle={service.title}
                price={service.price}
                setupFee={service.setupFee}
              />
            </div>
            <p className="mt-4 text-xs text-slate-600">
              Or <Link href="/audit" className="text-blue-400 hover:underline">run a free audit first</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
