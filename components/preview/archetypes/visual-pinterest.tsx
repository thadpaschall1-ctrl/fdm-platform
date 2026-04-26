/**
 * Visual / Pinterest archetype layout — bespoke implementation.
 *
 * Aesthetic direction: Editorial fashion magazine. Vogue meets Kinfolk meets
 * Cereal. High-craft, art-directed, restrained-but-confident. Heavy negative
 * space. Typography-as-personality. Image-led storytelling.
 *
 * Layout signature:
 *   - Asymmetric hero with rotated/offset image
 *   - Service grid as masonry with mixed aspect ratios
 *   - Pull quotes set in oversize italic Cormorant
 *   - Editorial divider lines (thin, accent color)
 *   - Numbered sections (issue/spread style)
 */

import type { DesignArchetype } from "@/lib/data/design-archetypes";
import type { NicheDesignOverride } from "@/lib/data/niche-design";
import type { NicheSiteContent } from "@/lib/data/niche-site-content";
import type { FictionalBusiness } from "@/lib/data/fictional-businesses";
import { getNicheImage } from "@/lib/preview/load-images";

export interface VisualPinterestProps {
  archetype: DesignArchetype;
  niche: NicheDesignOverride;
  content: NicheSiteContent;
  business: FictionalBusiness;
  palette: DesignArchetype["palette"];
  cssVars: React.CSSProperties;
}

export function VisualPinterestLayout({
  archetype,
  niche,
  content,
  business,
  palette,
  cssVars,
}: VisualPinterestProps) {
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
        href={`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Lato:wght@300;400;500;700&display=swap`}
      />
      <div
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          fontFamily: "Lato, sans-serif",
        }}
      >
        {/* ── Header — magazine masthead ───────────────────────── */}
        <header
          className="border-b"
          style={{ borderColor: palette.border, background: palette.background }}
        >
          <div className="mx-auto max-w-[1400px] px-8 lg:px-12 py-6 flex items-center justify-between">
            <div
              className="text-xl tracking-[0.2em] uppercase"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: palette.foreground,
                fontWeight: 500,
              }}
            >
              {business.business_name}
            </div>
            <div className="flex items-center gap-8">
              <a
                href={phoneHref}
                className="hidden md:inline-block text-xs tracking-[0.18em] uppercase"
                style={{ color: palette.muted }}
              >
                {business.phone}
              </a>
              <a
                href={phoneHref}
                className="px-6 py-3 text-xs tracking-[0.18em] uppercase font-medium transition-opacity hover:opacity-80"
                style={{
                  background: palette.primary,
                  color: palette.primaryFg,
                }}
              >
                Book
              </a>
            </div>
          </div>
        </header>

        {/* ── Hero — asymmetric editorial spread ──────────────── */}
        <section className="px-8 lg:px-16 pt-16 lg:pt-24 pb-20 lg:pb-32">
          <div className="mx-auto max-w-[1400px]">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-12 lg:mb-20"
              style={{ color: palette.accent }}
            >
              Issue 01 · {business.city}, {business.state}
            </p>
            <div className="grid gap-12 lg:gap-20 lg:grid-cols-12 items-end">
              {/* Headline — left 7 cols */}
              <div className="lg:col-span-7">
                <h1
                  className="text-5xl sm:text-7xl lg:text-[100px] leading-[0.92]"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    color: palette.foreground,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                  dangerouslySetInnerHTML={{ __html: heroTagline }}
                />
                <div className="mt-12 grid grid-cols-3 gap-8 max-w-md">
                  {content.trustStats.slice(0, 3).map((s) => (
                    <div key={s.label} className="border-t pt-4" style={{ borderColor: palette.border }}>
                      <div
                        className="text-2xl lg:text-3xl"
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          color: palette.primary,
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {s.value}
                      </div>
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase mt-2"
                        style={{ color: palette.muted }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image — right 5 cols, slightly offset down */}
              <div className="lg:col-span-5 lg:translate-y-12">
                {heroImg ? (
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={heroImg.url}
                      alt={`${business.business_name}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="aspect-[3/4]"
                    style={{
                      background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
                    }}
                  />
                )}
                <p
                  className="mt-4 text-[10px] tracking-[0.25em] uppercase italic"
                  style={{
                    color: palette.muted,
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  {niche.imagery?.heroSubject || "From our portfolio"}
                </p>
              </div>
            </div>

            {/* Subtitle paragraph */}
            <div className="mt-20 lg:mt-32 max-w-2xl">
              <p
                className="text-lg lg:text-xl leading-[1.7]"
                style={{
                  color: palette.foreground,
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 400,
                }}
              >
                {content.heroSubtitle}
              </p>
              <div className="mt-10 flex items-center gap-6">
                <a
                  href={phoneHref}
                  className="px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all hover:opacity-90"
                  style={{
                    background: palette.primary,
                    color: palette.primaryFg,
                  }}
                >
                  {content.heroCta}
                </a>
                <a
                  href="#services"
                  className="text-xs tracking-[0.2em] uppercase font-medium border-b pb-1 transition-opacity hover:opacity-70"
                  style={{
                    color: palette.foreground,
                    borderColor: palette.foreground,
                  }}
                >
                  See the work
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services — Masonry-style image grid ──────────────── */}
        <section
          id="services"
          className="px-8 lg:px-16 py-24 lg:py-32"
          style={{ background: palette.surface }}
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-16 lg:mb-24 grid gap-8 lg:grid-cols-12 items-end">
              <div className="lg:col-span-5">
                <p
                  className="text-xs tracking-[0.4em] uppercase mb-6"
                  style={{ color: palette.accent }}
                >
                  No. 02 — The Services
                </p>
                <h2
                  className="text-4xl lg:text-6xl leading-[1.0]"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    color: palette.foreground,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {content.servicesHeading}
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p
                  className="text-base lg:text-lg leading-[1.7]"
                  style={{
                    color: palette.muted,
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Each service crafted with the same attention you&rsquo;d bring to your
                  own home. Quality work, transparent pricing, no surprises.
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {content.services.slice(0, 4).map((s, i) => {
                const slot = `service${i + 1}` as
                  | "service1"
                  | "service2"
                  | "service3"
                  | "service4";
                const tileImg = getNicheImage(business.niche_slug, slot);
                // First card spans 2 cols on lg for asymmetry
                const isFeature = i === 0;
                return (
                  <div
                    key={s.title}
                    className={`flex flex-col ${
                      isFeature ? "lg:col-span-2 lg:row-span-1" : ""
                    }`}
                  >
                    {tileImg && (
                      <div
                        className={`relative overflow-hidden ${
                          isFeature ? "aspect-[16/10]" : "aspect-[4/5]"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={tileImg.url}
                          alt={s.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-[1.03] duration-700"
                        />
                      </div>
                    )}
                    <div className="pt-6">
                      <p
                        className="text-[10px] tracking-[0.3em] uppercase mb-3"
                        style={{ color: palette.accent }}
                      >
                        — Service {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3
                        className={`mb-4 leading-[1.1] ${
                          isFeature
                            ? "text-3xl lg:text-4xl"
                            : "text-2xl lg:text-3xl"
                        }`}
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          color: palette.foreground,
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="text-base leading-[1.65]"
                        style={{
                          color: palette.muted,
                          fontFamily: "Lato, sans-serif",
                        }}
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

        {/* ── Pull-quote ───────────────────────────────────────── */}
        <section className="px-8 lg:px-16 py-24 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="text-3xl lg:text-5xl leading-[1.25] italic"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: palette.foreground,
                fontWeight: 400,
              }}
            >
              &ldquo;The chair where your hair finally gets understood&rdquo;
              isn&rsquo;t a tagline. It&rsquo;s how every appointment ends.
            </p>
            <p
              className="mt-12 text-xs tracking-[0.3em] uppercase"
              style={{ color: palette.muted }}
            >
              {business.business_name} · Est. {business.year_founded}
            </p>
          </div>
        </section>

        {/* ── Why us — Three numbered editorial blocks ──────── */}
        <section
          className="px-8 lg:px-16 py-24 lg:py-32"
          style={{ background: palette.surface }}
        >
          <div className="mx-auto max-w-[1400px]">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: palette.accent }}
            >
              No. 03 — The Difference
            </p>
            <h2
              className="text-4xl lg:text-6xl mb-16 lg:mb-24 leading-[1.0]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: palette.foreground,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              {content.whyUsHeading}
            </h2>
            <div className="grid gap-12 lg:gap-20 md:grid-cols-3">
              {content.whyUs.slice(0, 3).map((reason, idx) => (
                <div key={reason.title}>
                  <div
                    className="text-7xl lg:text-8xl mb-6 leading-none"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      color: palette.primary,
                      fontWeight: 500,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="text-2xl lg:text-3xl mb-4 leading-[1.15]"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      color: palette.foreground,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="text-base leading-[1.7]"
                    style={{
                      color: palette.muted,
                      fontFamily: "Lato, sans-serif",
                    }}
                  >
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ — refined single-column ───────────────────── */}
        <section className="px-8 lg:px-16 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <h2
              className="text-3xl lg:text-5xl mb-12 leading-[1.05]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: palette.foreground,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              Common questions, considered answers.
            </h2>
            <div className="space-y-1">
              {content.faqs.map((f) => (
                <details
                  key={f.question}
                  className="group border-b py-7"
                  style={{ borderColor: palette.border }}
                >
                  <summary
                    className="flex items-center justify-between cursor-pointer list-none text-xl lg:text-2xl"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      color: palette.foreground,
                      fontWeight: 500,
                    }}
                  >
                    <span>{f.question}</span>
                    <span
                      className="text-2xl transition-transform group-open:rotate-45 ml-6"
                      style={{ color: palette.accent }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="mt-5 text-base lg:text-lg leading-[1.75]"
                    style={{
                      color: palette.muted,
                      fontFamily: "Lato, sans-serif",
                    }}
                  >
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────── */}
        <section
          className="px-8 lg:px-16 py-32 lg:py-44 text-center"
          style={{ background: palette.surface }}
        >
          <div className="mx-auto max-w-3xl">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-8"
              style={{ color: palette.accent }}
            >
              No. 04 — Hello
            </p>
            <h2
              className="text-4xl lg:text-7xl leading-[0.98] mb-10"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: palette.foreground,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
              dangerouslySetInnerHTML={{ __html: content.finalCtaHeading }}
            />
            <p
              className="text-lg lg:text-xl leading-[1.7] mb-12 italic max-w-xl mx-auto"
              style={{
                color: palette.muted,
                fontFamily: "Cormorant Garamond, serif",
              }}
              dangerouslySetInnerHTML={{ __html: content.finalCtaSubtitle }}
            />
            <a
              href={phoneHref}
              className="inline-block px-12 py-5 text-xs tracking-[0.25em] uppercase font-medium transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: palette.primary,
                color: palette.primaryFg,
              }}
            >
              {business.phone}
            </a>
            <p
              className="mt-8 text-xs tracking-[0.2em] uppercase"
              style={{ color: palette.muted }}
            >
              {business.email}
            </p>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────── */}
        <footer
          className="px-8 lg:px-16 py-16 border-t"
          style={{
            borderColor: palette.border,
            background: palette.background,
          }}
        >
          <div className="mx-auto max-w-[1400px] grid gap-12 md:grid-cols-3">
            <div>
              <p
                className="text-lg tracking-[0.2em] uppercase mb-3"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  color: palette.foreground,
                  fontWeight: 500,
                }}
              >
                {business.business_name}
              </p>
              <p
                className="text-sm leading-[1.7]"
                style={{ color: palette.muted, fontFamily: "Lato, sans-serif" }}
              >
                {business.street_address}
                <br />
                {business.city}, {business.state} {business.zip}
              </p>
            </div>
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: palette.muted }}
              >
                Inquire
              </p>
              <p
                className="text-base"
                style={{ color: palette.foreground, fontFamily: "Lato, sans-serif" }}
              >
                {business.phone}
              </p>
              <p
                className="text-base"
                style={{ color: palette.foreground, fontFamily: "Lato, sans-serif" }}
              >
                {business.email}
              </p>
            </div>
            <div className="md:text-right">
              <p
                className="text-xs tracking-[0.3em] uppercase"
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
