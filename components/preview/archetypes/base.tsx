/**
 * Base archetype layout — refined fallback for archetypes that don't yet have
 * a fully bespoke implementation.
 *
 * Used by: urgent-trade, b2b-commercial, health-wellness, aging-in-place, personal-brand
 *
 * This is a significant upgrade from the original PreviewSite — better typography,
 * tighter spacing system, more sophisticated palette use, image-led hero with
 * subtle layering, refined service grid, editorial FAQ. Still archetype-aware
 * (palette, fonts, motion) but with a single unified JSX structure.
 *
 * Each of the 5 archetypes using this will get its own bespoke layout in a
 * follow-up session — but until then, this looks far more designed than the
 * original generic template.
 */

import type { DesignArchetype } from "@/lib/data/design-archetypes";
import type { NicheDesignOverride } from "@/lib/data/niche-design";
import type { NicheSiteContent } from "@/lib/data/niche-site-content";
import type { FictionalBusiness } from "@/lib/data/fictional-businesses";
import { getNicheImage } from "@/lib/preview/load-images";

export interface BaseLayoutProps {
  archetype: DesignArchetype;
  niche: NicheDesignOverride;
  content: NicheSiteContent;
  business: FictionalBusiness;
  palette: DesignArchetype["palette"];
  cssVars: React.CSSProperties;
}

export function BaseLayout({
  archetype,
  niche,
  content,
  business,
  palette,
  cssVars,
}: BaseLayoutProps) {
  const heroImg = getNicheImage(business.niche_slug, "hero");
  const phoneHref = `tel:${business.phone_e164}`;
  const heroTagline = business.tagline || niche.heroContext.tagline || content.heroTagline;
  const yearsInBusiness = new Date().getFullYear() - business.year_founded;

  return (
    <div
      style={cssVars}
      className="min-h-screen"
      data-archetype={archetype.id}
      data-niche={business.niche_slug}
    >
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(
          archetype.typography.display
        )}:wght@400;500;600;700;800&family=${encodeURIComponent(
          archetype.typography.body
        )}:wght@300;400;500;600;700&display=swap`}
      />
      <div
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          fontFamily: `${archetype.typography.body}, sans-serif`,
        }}
      >
        {/* ── Header ───────────────────────────────────────── */}
        <header
          className="sticky top-0 z-40 backdrop-blur-md border-b"
          style={{
            background: `${palette.background}f0`,
            borderColor: palette.border,
          }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex items-center justify-between">
            <div
              className="text-xl tracking-tight font-bold"
              style={{ fontFamily: `${archetype.typography.display}, serif` }}
            >
              {business.business_name}
            </div>
            <div className="flex items-center gap-4">
              <a
                href={phoneHref}
                className="hidden sm:inline-block text-sm font-medium"
                style={{ color: palette.muted }}
              >
                {business.phone}
              </a>
              <a
                href={phoneHref}
                className="rounded-md px-5 py-2.5 text-sm font-bold transition-all hover:opacity-90 hover:-translate-y-px"
                style={{
                  background: palette.primary,
                  color: palette.primaryFg,
                }}
              >
                {archetype.cta.style === "phone-first"
                  ? "Call Now"
                  : archetype.cta.style === "appointment-first"
                  ? "Book"
                  : "Get Quote"}
              </a>
            </div>
          </div>
        </header>

        {/* ── Hero — split layout with full-height image ──────── */}
        <section className="relative">
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            {/* Text side */}
            <div className="px-6 lg:px-16 py-20 lg:py-32 flex flex-col justify-center">
              <div className="max-w-2xl">
                <p
                  className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: palette.primary }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ background: palette.primary }}
                  />
                  Serving {business.city}, {business.state}
                </p>
                <h1
                  className="text-5xl lg:text-7xl font-bold leading-[1.0] tracking-tight"
                  style={{
                    fontFamily: `${archetype.typography.display}, serif`,
                    color: palette.foreground,
                    letterSpacing: "-0.02em",
                    textWrap: "balance",
                  }}
                  dangerouslySetInnerHTML={{ __html: heroTagline }}
                />
                <p
                  className="mt-7 text-lg lg:text-xl leading-[1.65] max-w-xl"
                  style={{ color: palette.muted, textWrap: "pretty" }}
                  dangerouslySetInnerHTML={{ __html: content.heroSubtitle }}
                />
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href={phoneHref}
                    className="rounded-md px-7 py-4 text-base font-bold transition-all hover:-translate-y-0.5"
                    style={{
                      background: palette.primary,
                      color: palette.primaryFg,
                      boxShadow: `0 10px 30px ${palette.primary}30`,
                    }}
                  >
                    📞 {business.phone}
                  </a>
                  <a
                    href="#services"
                    className="rounded-md px-7 py-4 text-base font-medium border transition-colors hover:bg-white/5"
                    style={{
                      borderColor: palette.border,
                      color: palette.foreground,
                    }}
                  >
                    {content.heroSecondaryCta}
                  </a>
                </div>
                <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {content.trustStats.map((s) => (
                    <div
                      key={s.label}
                      className="border-t pt-3"
                      style={{ borderColor: palette.border }}
                    >
                      <div
                        className="text-2xl lg:text-3xl font-bold"
                        style={{
                          color: palette.accent,
                          fontFamily: `${archetype.typography.accent || archetype.typography.display}, serif`,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {s.value}
                      </div>
                      <p
                        className="text-[11px] uppercase tracking-[0.15em] mt-1"
                        style={{ color: palette.muted }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image side */}
            <div className="relative min-h-[560px] lg:min-h-[720px]">
              {heroImg ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={heroImg.url}
                  alt={`${business.business_name}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
                  }}
                />
              )}
              {/* Subtle overlay for image richness */}
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-multiply opacity-20"
                style={{
                  background: `linear-gradient(135deg, transparent 50%, ${palette.primary} 100%)`,
                }}
              />
            </div>
          </div>
        </section>

        {/* ── Customer Pains — Editorial section ──────────────── */}
        <section
          className="px-6 lg:px-16 py-20 lg:py-28"
          style={{ background: palette.surface }}
        >
          <div className="mx-auto max-w-5xl">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-5"
              style={{ color: palette.accent }}
            >
              The Reality
            </p>
            <h2
              className="text-3xl lg:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl"
              style={{
                fontFamily: `${archetype.typography.display}, serif`,
                color: palette.foreground,
                letterSpacing: "-0.02em",
              }}
            >
              {content.customerPainsHeading}
            </h2>
            <p
              className="mt-4 text-base lg:text-lg max-w-2xl leading-[1.65]"
              style={{ color: palette.muted }}
            >
              These are the situations we help {business.city.split(",")[0]} customers solve every week.
            </p>
            <ul className="mt-12 grid gap-4 md:grid-cols-2">
              {content.customerPains.map((pp) => (
                <li
                  key={pp}
                  className="rounded-lg border p-5 flex gap-4 transition-colors hover:bg-white/[0.02]"
                  style={{
                    borderColor: palette.border,
                    background: palette.background,
                  }}
                >
                  <span
                    className="text-2xl shrink-0 leading-[1] mt-1"
                    style={{ color: palette.accent }}
                  >
                    →
                  </span>
                  <span
                    className="text-base lg:text-[17px] leading-[1.55]"
                    style={{ color: palette.foreground }}
                    dangerouslySetInnerHTML={{ __html: pp }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Services — sophisticated grid ────────────────────── */}
        <section id="services" className="px-6 lg:px-16 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-12 items-end mb-16">
              <div className="lg:col-span-7">
                <p
                  className="text-xs uppercase tracking-[0.3em] mb-5"
                  style={{ color: palette.accent }}
                >
                  Our Services
                </p>
                <h2
                  className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.0]"
                  style={{
                    fontFamily: `${archetype.typography.display}, serif`,
                    color: palette.foreground,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {content.servicesHeading}
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.services.slice(0, 6).map((s, i) => {
                const slot = `service${i + 1}` as
                  | "service1"
                  | "service2"
                  | "service3"
                  | "service4"
                  | "service5"
                  | "service6";
                const tileImg = getNicheImage(business.niche_slug, slot);
                return (
                  <div
                    key={s.title}
                    className="group rounded-xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
                    style={{
                      background: palette.surface,
                      border: `1px solid ${palette.border}`,
                    }}
                  >
                    {tileImg && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={tileImg.url}
                          alt={s.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                    )}
                    <div className="p-6 lg:p-7 flex-1 flex flex-col">
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3"
                        style={{ color: palette.accent }}
                      >
                        Service · {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3
                        className="text-xl lg:text-2xl font-bold mb-3 leading-[1.15]"
                        style={{
                          fontFamily: `${archetype.typography.display}, serif`,
                          color: palette.foreground,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="text-[15px] leading-[1.65]"
                        style={{ color: palette.muted }}
                      >
                        {s.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Why Us ─────────────────────────────────────────── */}
        <section
          className="px-6 lg:px-16 py-20 lg:py-28"
          style={{ background: palette.surface }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-14">
              <p
                className="text-xs uppercase tracking-[0.3em] mb-5"
                style={{ color: palette.accent }}
              >
                The Difference
              </p>
              <h2
                className="text-3xl lg:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl"
                style={{
                  fontFamily: `${archetype.typography.display}, serif`,
                  color: palette.foreground,
                  letterSpacing: "-0.02em",
                }}
              >
                {content.whyUsHeading}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {content.whyUs.map((reason, idx) => (
                <div
                  key={reason.title}
                  className="rounded-xl p-7 lg:p-8 border"
                  style={{
                    background: palette.background,
                    borderColor: palette.border,
                  }}
                >
                  <div
                    className="text-5xl font-bold mb-5 leading-none"
                    style={{
                      color: palette.primary,
                      fontFamily: `${archetype.typography.display}, serif`,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="text-2xl font-bold mb-3 leading-[1.15]"
                    style={{
                      fontFamily: `${archetype.typography.display}, serif`,
                      color: palette.foreground,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="text-[15px] lg:text-base leading-[1.7]"
                    style={{ color: palette.muted }}
                  >
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section className="px-6 lg:px-16 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-5 text-center"
              style={{ color: palette.accent }}
            >
              Common Questions
            </p>
            <h2
              className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-12 leading-[1.1]"
              style={{
                fontFamily: `${archetype.typography.display}, serif`,
                color: palette.foreground,
                letterSpacing: "-0.02em",
              }}
            >
              You probably want to know.
            </h2>
            <div className="space-y-2">
              {content.faqs.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-lg border p-6 transition-colors"
                  style={{
                    borderColor: palette.border,
                    background: palette.background,
                  }}
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                    <span
                      className="text-lg font-semibold"
                      style={{ color: palette.foreground }}
                    >
                      {f.question}
                    </span>
                    <span
                      className="text-2xl transition-transform group-open:rotate-45 shrink-0"
                      style={{ color: palette.primary }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="mt-4 text-[15px] leading-[1.7]"
                    style={{ color: palette.muted }}
                  >
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────── */}
        <section
          className="relative px-6 lg:px-16 py-24 lg:py-32 text-center overflow-hidden"
          style={{ background: palette.surface }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse at center, ${palette.primary}33, transparent 60%)`,
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2
              className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.0]"
              style={{
                fontFamily: `${archetype.typography.display}, serif`,
                color: palette.foreground,
                letterSpacing: "-0.02em",
              }}
              dangerouslySetInnerHTML={{ __html: content.finalCtaHeading }}
            />
            <p
              className="mt-6 text-lg lg:text-xl leading-[1.65]"
              style={{ color: palette.muted }}
              dangerouslySetInnerHTML={{ __html: content.finalCtaSubtitle }}
            />
            <a
              href={phoneHref}
              className="mt-10 inline-block rounded-md px-10 py-5 text-lg font-bold transition-all hover:-translate-y-0.5"
              style={{
                background: palette.primary,
                color: palette.primaryFg,
                boxShadow: `0 20px 50px ${palette.primary}40`,
              }}
            >
              📞 {business.phone}
            </a>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer
          className="px-6 lg:px-16 py-14 border-t"
          style={{
            borderColor: palette.border,
            background: palette.background,
          }}
        >
          <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-3">
            <div>
              <p
                className="text-lg font-bold mb-2"
                style={{
                  fontFamily: `${archetype.typography.display}, serif`,
                  color: palette.foreground,
                }}
              >
                {business.business_name}
              </p>
              <p
                className="text-sm leading-[1.7]"
                style={{ color: palette.muted }}
              >
                {business.street_address}
                <br />
                {business.city}, {business.state} {business.zip}
              </p>
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] mb-3"
                style={{ color: palette.muted }}
              >
                Contact
              </p>
              <p className="text-sm" style={{ color: palette.foreground }}>
                {business.phone}
              </p>
              <p className="text-sm" style={{ color: palette.foreground }}>
                {business.email}
              </p>
            </div>
            <div className="md:text-right">
              <p
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: palette.muted }}
              >
                Site by Fast Digital Marketing
              </p>
              <p
                className="text-xs mt-2 opacity-60"
                style={{ color: palette.muted }}
              >
                {yearsInBusiness}+ years · Archetype · {archetype.label}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
