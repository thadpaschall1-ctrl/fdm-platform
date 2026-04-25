/**
 * PreviewSite — renders a generated FDM site for a single (niche, business) tuple.
 *
 * IMPORTANT VOICE: this site is the BUSINESS speaking to its CUSTOMERS — not
 * FDM speaking to the business owner. Foundation-repair preview = a foundation
 * repair company selling to homeowners. Plumber preview = a plumber selling to
 * homeowners. Etc. We pull customer-facing copy from `niche-site-content.ts`,
 * NOT from `industries.ts` (which is FDM's pitch to industry owners).
 *
 * Combines:
 *   - Archetype design (color/typography/layout primitives)
 *   - Per-niche overrides (palette shifts, hero context, imagery hints)
 *   - Niche site content (customer-facing copy)
 *   - Business data (name, phone, address, city)
 */

import { ARCHETYPES, type DesignArchetype } from "@/lib/data/design-archetypes";
import { getNicheDesign, type NicheDesignOverride } from "@/lib/data/niche-design";
import { getNicheSiteContent } from "@/lib/data/niche-site-content";
import { getNicheImage } from "@/lib/preview/load-images";
import type { QaBusiness } from "@/lib/preview/load-business";

interface PreviewSiteProps {
  business: QaBusiness;
}

function mergePalette(
  archetype: DesignArchetype,
  override: NicheDesignOverride
): DesignArchetype["palette"] {
  return { ...archetype.palette, ...(override.paletteShifts || {}) };
}

export function PreviewSite({ business }: PreviewSiteProps) {
  const niche = getNicheDesign(business.niche_slug);
  const archetype = ARCHETYPES[niche.archetype];
  const palette = mergePalette(archetype, niche);
  const content = getNicheSiteContent(business.niche_slug);

  // CSS vars give each preview an isolated color world without per-niche stylesheets.
  const cssVars: React.CSSProperties = {
    ["--bg" as string]: palette.background,
    ["--fg" as string]: palette.foreground,
    ["--surface" as string]: palette.surface,
    ["--muted" as string]: palette.muted,
    ["--border" as string]: palette.border,
    ["--primary" as string]: palette.primary,
    ["--primary-fg" as string]: palette.primaryFg,
    ["--accent" as string]: palette.accent,
    ["--accent2" as string]: palette.accent2 || palette.accent,
  };

  const heroAlignment =
    niche.layoutOverrides?.heroAlignment ?? archetype.layout.heroAlignment;
  const phoneHref = business.phone
    ? `tel:${business.phone.replace(/[^\d+]/g, "")}`
    : "#";

  // Override the niche tagline if niche-design.ts specified one (from heroContext);
  // otherwise fall back to the niche-site-content default.
  const heroTagline = niche.heroContext.tagline || content.heroTagline;

  return (
    <div
      style={cssVars}
      className="min-h-screen"
      data-archetype={archetype.id}
      data-niche={business.niche_slug}
    >
      <div
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          fontFamily: archetype.typography.body,
        }}
      >
        {/* Google Fonts loader for archetype fonts */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(
            archetype.typography.display
          )}:wght@400;600;700;800&family=${encodeURIComponent(
            archetype.typography.body
          )}:wght@400;500;600;700&display=swap`}
        />

        {/* ── Header ───────────────────────────────────────── */}
        <header
          className="sticky top-0 z-40 backdrop-blur-md"
          style={{
            background: `${palette.background}cc`,
            borderBottom: `1px solid ${palette.border}`,
          }}
        >
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <div
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: archetype.typography.display }}
            >
              {business.business_name}
            </div>
            <div className="flex items-center gap-3">
              <a
                href={phoneHref}
                className="hidden sm:inline-block text-sm font-semibold"
                style={{ color: palette.muted }}
              >
                {business.phone}
              </a>
              <a
                href={phoneHref}
                className="rounded-lg px-4 py-2 text-sm font-bold transition hover:opacity-90"
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

        {/* ── Hero ────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 py-16 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${palette.primary}33, transparent 60%), radial-gradient(circle at 70% 80%, ${palette.accent}22, transparent 60%)`,
            }}
          />
          <div
            className={`relative mx-auto max-w-6xl grid gap-10 ${
              heroAlignment === "split-left" || heroAlignment === "split-right"
                ? "lg:grid-cols-[1.2fr_1fr] lg:items-center"
                : heroAlignment === "asymmetric"
                ? "lg:grid-cols-[2fr_1fr] lg:items-end"
                : "text-center"
            }`}
          >
            <div className={heroAlignment === "split-right" ? "lg:order-2" : ""}>
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{
                  border: `1px solid ${palette.primary}55`,
                  background: `${palette.primary}11`,
                  color: palette.primary,
                  fontFamily: archetype.typography.body,
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ background: palette.primary }}
                />
                Serving {business.city}
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
                style={{ fontFamily: archetype.typography.display }}
                dangerouslySetInnerHTML={{ __html: heroTagline }}
              />
              <p
                className="mt-6 max-w-xl text-lg leading-relaxed"
                style={{ color: palette.muted }}
                dangerouslySetInnerHTML={{ __html: content.heroSubtitle }}
              />
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={phoneHref}
                  className="rounded-xl px-7 py-4 text-base font-bold shadow-lg transition hover:-translate-y-0.5"
                  style={{
                    background: palette.primary,
                    color: palette.primaryFg,
                  }}
                >
                  📞 {business.phone || content.heroCta}
                </a>
                <a
                  href="#services"
                  className="rounded-xl px-7 py-4 text-base font-medium transition hover:bg-white/5"
                  style={{
                    border: `1px solid ${palette.border}`,
                    color: palette.foreground,
                  }}
                >
                  {content.heroSecondaryCta}
                </a>
              </div>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {content.trustStats.map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-2xl font-bold"
                      style={{
                        color: palette.accent,
                        fontFamily: archetype.typography.accent || archetype.typography.display,
                      }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs mt-1" style={{ color: palette.muted }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual — real AI-generated image when available, gradient fallback */}
            {heroAlignment !== "centered" && (() => {
              const heroImg = getNicheImage(business.niche_slug, "hero");
              return (
                <div
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                  style={{
                    background: heroImg
                      ? "transparent"
                      : `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
                    border: `1px solid ${palette.border}`,
                  }}
                >
                  {heroImg ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={heroImg.url}
                      alt={niche.imagery?.heroSubject || `${business.business_name} ${business.niche_name}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center text-center p-6"
                      style={{ color: palette.primaryFg }}
                    >
                      <div>
                        <div className="text-6xl mb-4">
                          {archetype.hero.style === "drone"
                            ? "🛩️"
                            : archetype.hero.style === "before-after"
                            ? "📐"
                            : archetype.hero.style === "data"
                            ? "📊"
                            : archetype.hero.style === "portrait"
                            ? "👤"
                            : "✨"}
                        </div>
                        <div className="text-sm font-semibold uppercase tracking-widest opacity-80">
                          {niche.imagery?.heroSubject ||
                            `${business.niche_name} hero photo`}
                        </div>
                        <div className="text-xs mt-2 opacity-70">
                          ({archetype.hero.style} style · {archetype.hero.tone} tone)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </section>

        {/* ── Customer pains ────────────────────────────────── */}
        <section className="px-6 py-20" style={{ background: palette.surface }}>
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: archetype.typography.display }}
            >
              {content.customerPainsHeading}
            </h2>
            <p className="mt-3 text-lg" style={{ color: palette.muted }}>
              These are the situations we help {business.city.split(",")[0]} customers solve every week.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.customerPains.map((pp) => (
                <li
                  key={pp}
                  className="rounded-xl p-5 flex gap-3"
                  style={{
                    background: palette.background,
                    border: `1px solid ${palette.border}`,
                  }}
                >
                  <span
                    style={{ color: palette.accent }}
                    className="text-xl shrink-0 leading-none"
                  >
                    ●
                  </span>
                  <span
                    style={{ color: palette.foreground }}
                    dangerouslySetInnerHTML={{ __html: pp }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────── */}
        <section id="services" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: archetype.typography.display }}
            >
              {content.servicesHeading}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.services.map((s, i) => {
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
                    className="rounded-2xl overflow-hidden flex flex-col"
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
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div
                        className="text-xs font-bold uppercase tracking-widest mb-3"
                        style={{ color: palette.primary }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: archetype.typography.display }}
                      >
                        {s.title}
                      </h3>
                      <p style={{ color: palette.muted }}>{s.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Why us ─────────────────────────────────────── */}
        <section className="px-6 py-20" style={{ background: palette.surface }}>
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: archetype.typography.display }}
            >
              {content.whyUsHeading}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {content.whyUs.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-2xl p-6"
                  style={{
                    background: palette.background,
                    border: `1px solid ${palette.border}`,
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      fontFamily: archetype.typography.display,
                      color: palette.primary,
                    }}
                  >
                    {reason.title}
                  </h3>
                  <p style={{ color: palette.muted }}>{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: archetype.typography.display }}
            >
              Common questions.
            </h2>
            <div className="mt-8 space-y-3">
              {content.faqs.map((f) => (
                <details
                  key={f.question}
                  className="rounded-xl p-5 group"
                  style={{
                    background: palette.surface,
                    border: `1px solid ${palette.border}`,
                  }}
                >
                  <summary className="flex items-center justify-between cursor-pointer font-semibold">
                    {f.question}
                    <span
                      className="transition-transform group-open:rotate-45"
                      style={{ color: palette.primary }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3" style={{ color: palette.muted }}>
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────── */}
        <section className="px-6 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: archetype.typography.display }}
              dangerouslySetInnerHTML={{ __html: content.finalCtaHeading }}
            />
            <p
              className="mt-4 text-lg"
              style={{ color: palette.muted }}
              dangerouslySetInnerHTML={{ __html: content.finalCtaSubtitle }}
            />
            <a
              href={phoneHref}
              className="mt-8 inline-block rounded-xl px-10 py-5 text-lg font-bold shadow-lg transition hover:-translate-y-0.5"
              style={{
                background: palette.primary,
                color: palette.primaryFg,
              }}
            >
              📞 {business.phone || content.finalCtaButton}
            </a>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer
          className="px-6 py-10 text-center text-sm"
          style={{
            borderTop: `1px solid ${palette.border}`,
            color: palette.muted,
          }}
        >
          <div className="font-semibold" style={{ color: palette.foreground }}>
            {business.business_name}
          </div>
          {business.formatted_address && (
            <div className="mt-1">{business.formatted_address}</div>
          )}
          {business.phone && <div className="mt-1">{business.phone}</div>}
          <div className="mt-4 text-xs opacity-60">
            Generated by Fast Digital Marketing · Archetype: {archetype.label} · Niche: {business.niche_name}
          </div>
        </footer>
      </div>
    </div>
  );
}
