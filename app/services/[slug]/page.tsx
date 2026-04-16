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
                <span className="text-sm text-slate-500 pb-1.5">+ {service.setupFee} build cost</span>
              )}
            </div>
            {service.includedIn && (
              <p className="text-sm text-blue-400 font-medium">{service.includedIn}</p>
            )}
            <p className="text-xs text-slate-500">No contracts &middot; Cancel anytime</p>
            <div className="mt-2">
              <ServiceCheckoutButton
                plan={service.planTier}
                serviceTitle={service.title}
                price={service.price}
                setupFee={service.setupFee}
              />
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              {(service.slug === "ai-voice-receptionist" || service.slug === "voice-ai-callback") ? (
                <Link href="/demo" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Try Live Voice Demo →
                </Link>
              ) : (
                <Link href="/audit" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Or run a free audit first →
                </Link>
              )}
              <span className="text-slate-600">|</span>
              <a href="tel:+18889834449" className="text-slate-500 hover:text-white transition-colors">
                Call (888) 983-4449
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Packages (if service has multiple tiers) — shown prominently after hero */}
      {service.packages && service.packages.length > 0 && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <p className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-400 mb-4">
                Choose Your Plan
              </p>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight">
                Simple, Transparent <span className="text-gradient-blue">Pricing</span>
              </h2>
              <p className="mt-4 text-slate-400 max-w-lg mx-auto">
                No long-term contracts. No hidden fees. Cancel anytime. Every plan includes AI Search Optimization.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
              {service.packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`card-hover relative rounded-2xl border p-7 flex flex-col ${
                    pkg.highlighted
                      ? "border-blue-500/40 bg-blue-950/20 ring-1 ring-blue-500/20"
                      : "border-white/[0.08] bg-slate-900/80"
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-blue-600 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
                        {pkg.badge}
                      </span>
                    </div>
                  )}
                  <p className="font-display text-lg font-bold text-white">{pkg.name}</p>
                  <div className="mt-3">
                    {pkg.setup !== "FREE" ? (
                      <p className="text-sm text-slate-400">{pkg.setup} <span className="text-slate-500">build cost</span></p>
                    ) : (
                      <p className="text-sm font-bold text-emerald-400">FREE to build</p>
                    )}
                    <p className="text-3xl font-black text-white mt-1">
                      {pkg.monthly}<span className="text-base font-normal text-slate-400">/mo</span>
                    </p>
                  </div>
                  <ul className="mt-5 flex flex-col gap-2.5 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="shrink-0 font-bold text-blue-500 mt-0.5">&#x2713;</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <ServiceCheckoutButton
                      plan={pkg.name.toLowerCase().replace(/\s+/g, "-")}
                      serviceTitle={pkg.name}
                      price={pkg.monthly}
                      setupFee={pkg.setup !== "FREE" ? pkg.setup : undefined}
                      className={`w-full block rounded-xl px-4 py-3.5 text-center text-sm font-bold transition-all ${
                        pkg.highlighted
                          ? "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500 mt-6">
              Secure checkout via Stripe &middot; Cancel anytime &middot; No long-term contracts
            </p>
          </div>
        </section>
      )}

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

      {/* AI Voice Demo CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-8 sm:p-10 text-center">
            <p className="text-3xl mb-4">🎙</p>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              Try Our AI Voice Receptionist — Live
            </h2>
            <p className="mt-3 text-slate-400 max-w-lg mx-auto">
              Pick your industry and have a real conversation with Holland, our AI receptionist.
              She&apos;ll handle calls, answer questions, and book appointments — just like she would for your business.
            </p>
            <Link
              href="/demo"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-500 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              Start Live Voice Demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <p className="mt-3 text-xs text-slate-500">No signup needed. Works for any industry.</p>
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
            {!service.packages && (
              <>
                <div className="mt-4 flex items-end justify-center gap-2">
                  <span className="text-4xl font-black text-white">{service.price}</span>
                  <span className="text-lg text-slate-400 pb-0.5">/mo</span>
                  {service.setupFee && (
                    <span className="text-sm text-slate-500 pb-1">+ {service.setupFee} build cost</span>
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
              </>
            )}
            {service.packages && (
              <p className="mt-4 text-slate-400">
                Plans start at just <span className="text-white font-bold">{service.price}/mo</span> with a free build. Scroll up to compare plans.
              </p>
            )}
            <p className="mt-4 text-xs text-slate-600">
              Or <Link href="/audit" className="text-blue-400 hover:underline">run a free audit first</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
