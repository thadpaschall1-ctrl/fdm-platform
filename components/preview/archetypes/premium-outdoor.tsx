/**
 * Premium Outdoor Living archetype layout — bespoke implementation.
 *
 * Aesthetic direction: Architectural Digest editorial. Magazine-spread feel.
 * Drone hero dominates → editorial intro paragraph with drop cap → cinematic
 * services as full-bleed alternating image rows → editorial pull-quote → FAQ
 * as single-column elegance → final atmospheric CTA.
 *
 * Why this is different from the base layout:
 *   - Hero is 90vh cinematic image, NOT a card with text
 *   - Services are alternating image-text rows (left/right/left), not a 3-tile grid
 *   - Drop cap on first paragraph (typographic detail that says "magazine")
 *   - Pull-quote between sections
 *   - Serif typography throughout for editorial feel
 *   - Generous negative space; tight typography
 */

import type { DesignArchetype } from "@/lib/data/design-archetypes";
import type { NicheDesignOverride } from "@/lib/data/niche-design";
import type { NicheSiteContent } from "@/lib/data/niche-site-content";
import type { FictionalBusiness } from "@/lib/data/fictional-businesses";
import { getNicheImage, getNicheHeroVideo } from "@/lib/preview/load-images";

export interface PremiumOutdoorProps {
  archetype: DesignArchetype;
  niche: NicheDesignOverride;
  content: NicheSiteContent;
  business: FictionalBusiness;
  palette: DesignArchetype["palette"];
  cssVars: React.CSSProperties;
}

export function PremiumOutdoorLayout({
  archetype,
  niche,
  content,
  business,
  palette,
  cssVars,
}: PremiumOutdoorProps) {
  const heroImg = getNicheImage(business.niche_slug, "hero");
  const heroVideo = getNicheHeroVideo(business.niche_slug);
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
        href={`https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=EB+Garamond:ital,wght@0,400;1,400&display=swap`}
      />
      <div
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          fontFamily: "Source Serif 4, Georgia, serif",
        }}
      >
        {/* ── Header — minimal, editorial ───────────────────────── */}
        <header
          className="absolute top-0 inset-x-0 z-50"
          style={{ color: palette.primaryFg }}
        >
          <div className="mx-auto max-w-[1400px] px-8 lg:px-12 py-7 flex items-center justify-between">
            <div
              className="text-xl tracking-[0.18em] uppercase font-semibold"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {business.business_name}
            </div>
            <a
              href={phoneHref}
              className="hidden md:inline-block text-sm tracking-[0.15em] uppercase border-b pb-1 transition-opacity hover:opacity-70"
              style={{ borderColor: palette.primaryFg }}
            >
              {business.phone} · Schedule a Visit
            </a>
            <a
              href={phoneHref}
              className="md:hidden text-sm font-semibold underline underline-offset-4"
            >
              Call
            </a>
          </div>
        </header>

        {/* ── Hero — Cinematic full-bleed (video if generated, still otherwise) ── */}
        <section data-tour="hero" className="relative h-screen min-h-[680px] overflow-hidden">
          {heroVideo ? (
            <video
              src={heroVideo.url}
              poster={heroImg?.url}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
            />
          ) : null}
          {heroImg ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={heroImg.url}
              alt={`${business.business_name} portfolio`}
              className={`absolute inset-0 w-full h-full object-cover ${heroVideo ? "motion-reduce:block hidden" : ""}`}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
              }}
            />
          )}
          {/* Bottom-up gradient for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)`,
            }}
          />

          {/* Hero text — anchored bottom-left, magazine-poster style */}
          <div className="absolute inset-x-0 bottom-0 px-8 lg:px-16 pb-20 lg:pb-28">
            <div className="mx-auto max-w-[1400px]">
              <p
                className="mb-4 text-xs tracking-[0.32em] uppercase opacity-90"
                style={{
                  color: palette.primaryFg,
                  fontFamily: "Source Serif 4, serif",
                }}
              >
                {business.service_area || `${business.city}, ${business.state}`}
              </p>
              <h1
                className="text-5xl sm:text-7xl lg:text-[88px] font-semibold leading-[0.95] max-w-5xl"
                style={{
                  color: palette.primaryFg,
                  fontFamily: "Playfair Display, serif",
                  letterSpacing: "-0.02em",
                  textWrap: "balance",
                }}
                dangerouslySetInnerHTML={{ __html: heroTagline }}
              />
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-6 right-8 lg:right-16 text-xs tracking-[0.3em] uppercase opacity-70"
            style={{ color: palette.primaryFg }}
          >
            Scroll ↓
          </div>
        </section>

        {/* ── Editorial Intro with Drop Cap ───────────────────── */}
        <section data-tour="trust-stats" className="px-8 lg:px-16 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-8"
              style={{ color: palette.muted }}
            >
              {yearsInBusiness}+ Years · Family Owned · {business.city}
            </p>
            <p
              className="text-2xl lg:text-3xl leading-[1.45]"
              style={{
                fontFamily: "Source Serif 4, serif",
                color: palette.foreground,
                textWrap: "pretty",
              }}
            >
              <span
                className="float-left mr-3 mt-1 leading-[0.85]"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "5.5em",
                  fontWeight: 700,
                  color: palette.primary,
                }}
              >
                {content.heroSubtitle.charAt(0)}
              </span>
              {content.heroSubtitle.slice(1)}
            </p>
          </div>
        </section>

        {/* ── Services — Alternating editorial rows ─────────────── */}
        <section
          id="services"
          data-tour="services"
          className="px-8 lg:px-16 pb-24 lg:pb-32"
          style={{ background: palette.surface }}
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="pt-24 lg:pt-32 mb-20 lg:mb-32 text-center">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: palette.muted }}
              >
                The Work
              </p>
              <h2
                className="text-4xl lg:text-6xl"
                style={{
                  fontFamily: "Playfair Display, serif",
                  letterSpacing: "-0.02em",
                  color: palette.foreground,
                  fontWeight: 600,
                }}
              >
                {content.servicesHeading}
              </h2>
            </div>

            <div className="space-y-24 lg:space-y-32">
              {content.services.slice(0, 4).map((s, i) => {
                const slot = `service${i + 1}` as
                  | "service1"
                  | "service2"
                  | "service3"
                  | "service4";
                const tileImg = getNicheImage(business.niche_slug, slot);
                const reverse = i % 2 === 1;

                return (
                  <div
                    key={s.title}
                    className={`grid gap-12 lg:gap-20 items-center ${
                      reverse ? "lg:grid-cols-[1fr_1.4fr]" : "lg:grid-cols-[1.4fr_1fr]"
                    }`}
                  >
                    <div className={reverse ? "lg:order-2" : ""}>
                      {tileImg && (
                        <div className="relative aspect-[4/5] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={tileImg.url}
                            alt={s.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div className={reverse ? "lg:order-1 lg:pr-12" : "lg:pl-12"}>
                      <p
                        className="text-xs tracking-[0.3em] uppercase mb-4"
                        style={{ color: palette.accent }}
                      >
                        — {String(i + 1).padStart(2, "0")} ·{" "}
                        {s.title.split(" ")[0]}
                      </p>
                      <h3
                        className="text-3xl lg:text-5xl mb-6 leading-[1.05]"
                        style={{
                          fontFamily: "Playfair Display, serif",
                          color: palette.foreground,
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="text-lg lg:text-xl leading-[1.7]"
                        style={{
                          color: palette.muted,
                          fontFamily: "Source Serif 4, serif",
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
        <section className="px-8 lg:px-16 py-24 lg:py-40 text-center">
          <div className="mx-auto max-w-4xl">
            <span
              className="block text-7xl lg:text-9xl leading-none mb-4"
              style={{ color: palette.accent, fontFamily: "Playfair Display, serif" }}
            >
              &ldquo;
            </span>
            <p
              className="text-2xl lg:text-4xl leading-[1.3] italic"
              style={{
                fontFamily: "EB Garamond, Georgia, serif",
                color: palette.foreground,
              }}
            >
              {content.whyUs[0]?.description ||
                "Quality work, transparent pricing, and the kind of service that turns first-time customers into long-term ones."}
            </p>
            <p
              className="mt-10 text-xs tracking-[0.3em] uppercase"
              style={{ color: palette.muted }}
            >
              — {business.business_name}, est. {business.year_founded}
            </p>
          </div>
        </section>

        {/* ── Why us — Three-column editorial card ────────────── */}
        <section
          data-tour="why-us"
          className="px-8 lg:px-16 py-24 lg:py-32"
          style={{ background: palette.surface }}
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-16 lg:mb-20 max-w-3xl">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: palette.muted }}
              >
                What sets us apart
              </p>
              <h2
                className="text-4xl lg:text-5xl"
                style={{
                  fontFamily: "Playfair Display, serif",
                  letterSpacing: "-0.02em",
                  color: palette.foreground,
                  fontWeight: 600,
                }}
              >
                {content.whyUsHeading}
              </h2>
            </div>

            <div className="grid gap-12 lg:gap-16 md:grid-cols-2 lg:grid-cols-3">
              {content.whyUs.slice(0, 3).map((reason, idx) => (
                <div key={reason.title} className="border-t pt-8" style={{ borderColor: palette.border }}>
                  <p
                    className="text-xs tracking-[0.3em] uppercase mb-5"
                    style={{ color: palette.accent }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="text-2xl lg:text-3xl mb-4 leading-[1.15]"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      color: palette.foreground,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="text-base leading-[1.65]"
                    style={{
                      color: palette.muted,
                      fontFamily: "Source Serif 4, serif",
                    }}
                  >
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ — single-column elegance ──────────────────── */}
        <section data-tour="faqs" className="px-8 lg:px-16 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <h2
              className="text-3xl lg:text-5xl mb-12 text-center"
              style={{
                fontFamily: "Playfair Display, serif",
                letterSpacing: "-0.02em",
                color: palette.foreground,
                fontWeight: 600,
              }}
            >
              Frequently asked.
            </h2>
            <div className="space-y-2">
              {content.faqs.map((f) => (
                <details
                  key={f.question}
                  className="group border-b py-6 cursor-pointer"
                  style={{ borderColor: palette.border }}
                >
                  <summary
                    className="flex items-center justify-between text-xl lg:text-2xl list-none"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      color: palette.foreground,
                      fontWeight: 500,
                    }}
                  >
                    <span>{f.question}</span>
                    <span
                      className="text-3xl transition-transform group-open:rotate-45 ml-4"
                      style={{ color: palette.accent, fontFamily: "Source Serif 4, serif" }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="mt-5 text-lg leading-[1.7]"
                    style={{
                      color: palette.muted,
                      fontFamily: "Source Serif 4, serif",
                    }}
                  >
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA — Atmospheric ─────────────────────────── */}
        <section
          data-tour="final-cta"
          className="relative px-8 lg:px-16 py-32 lg:py-44 text-center overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${palette.background}, ${palette.surface})`,
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(ellipse at center bottom, ${palette.primary}22, transparent 70%)`,
            }}
          />
          <div className="relative mx-auto max-w-3xl">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-8"
              style={{ color: palette.accent }}
            >
              Take the next step
            </p>
            <h2
              className="text-4xl lg:text-7xl leading-[0.98] mb-10"
              style={{
                fontFamily: "Playfair Display, serif",
                letterSpacing: "-0.02em",
                color: palette.foreground,
                fontWeight: 600,
              }}
              dangerouslySetInnerHTML={{ __html: content.finalCtaHeading }}
            />
            <p
              className="text-lg lg:text-xl leading-[1.6] mb-12"
              style={{
                color: palette.muted,
                fontFamily: "Source Serif 4, serif",
              }}
              dangerouslySetInnerHTML={{ __html: content.finalCtaSubtitle }}
            />
            <a
              href={phoneHref}
              className="inline-block px-12 py-6 text-sm tracking-[0.25em] uppercase font-medium transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: palette.primary,
                color: palette.primaryFg,
                fontFamily: "Source Serif 4, serif",
              }}
            >
              {business.phone}
            </a>
          </div>
        </section>

        {/* ── Footer — Editorial credit ───────────────────────── */}
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
                className="text-lg tracking-[0.18em] uppercase mb-3 font-semibold"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: palette.foreground,
                }}
              >
                {business.business_name}
              </p>
              <p
                className="text-sm leading-[1.7]"
                style={{ color: palette.muted, fontFamily: "Source Serif 4, serif" }}
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
                Schedule
              </p>
              <p
                className="text-base"
                style={{ color: palette.foreground, fontFamily: "Source Serif 4, serif" }}
              >
                {business.phone}
              </p>
              <p
                className="text-base"
                style={{ color: palette.foreground, fontFamily: "Source Serif 4, serif" }}
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
                Archetype · {archetype.label}
              </p>
              {/* AI SEO badge — tour spotlight target. Click expands JSON-LD. */}
              <div
                data-tour="schema-badge"
                className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide"
                style={{
                  background: `${palette.primary}10`,
                  color: palette.primary,
                  border: `1px solid ${palette.primary}30`,
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ background: palette.primary }}
                />
                AI Search Optimized · Schema verified
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
