import type { FictionalBusiness } from "@/lib/data/fictional-businesses";
import type { DesignArchetype } from "@/lib/data/design-archetypes";

/**
 * Showcase Map — Google Maps embed + address card section. Renders near
 * the footer of each archetype, below the final CTA.
 *
 * Uses the iframe-only embed (no API key required) so the map renders for
 * any address without auth setup. The address is the fictional business
 * street + city + state.
 *
 * Two purposes:
 *   1. Aesthetic — every real local business website has a "find us" block
 *   2. Demonstrates that the customer's eventual real site will have a real
 *      live map showing their actual location (a tour stop highlights this)
 *
 * Wrapped with data-tour="map" so the showcase tour can spotlight it.
 *
 * Each archetype passes its own palette so the section blends visually.
 */

interface ShowcaseMapProps {
  business: FictionalBusiness;
  palette: DesignArchetype["palette"];
  /** Aesthetic vibe per archetype — "premium" uses serif headings + warm tones,
   *  "editorial" uses display serif + tight letter-spacing, "base" uses bold sans. */
  variant?: "premium" | "editorial" | "base";
  /** Display font family from the archetype (used for variant="base") */
  displayFont?: string;
}

export function ShowcaseMap({
  business,
  palette,
  variant = "base",
  displayFont = "system-ui",
}: ShowcaseMapProps) {
  const fullAddress = `${business.street_address}, ${business.city}, ${business.state} ${business.zip}`;
  const mapsQuery = encodeURIComponent(fullAddress);
  const mapsUrl = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

  // Heading style varies per archetype
  const headingStyle =
    variant === "premium"
      ? {
          fontFamily: "Playfair Display, serif",
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }
      : variant === "editorial"
        ? {
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }
        : {
            fontFamily: `${displayFont}, serif`,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          };

  const eyebrowStyle = {
    color: palette.accent,
    letterSpacing:
      variant === "editorial" ? "0.4em" : variant === "premium" ? "0.3em" : "0.25em",
  };

  return (
    <section
      data-tour="map"
      className="px-6 lg:px-16 py-20 lg:py-28"
      style={{ background: palette.background }}
      aria-label="Visit us"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="mb-10 lg:mb-14 text-center">
          <p
            className="text-xs font-bold uppercase mb-4"
            style={eyebrowStyle}
          >
            Visit Us
          </p>
          <h2
            className="text-3xl lg:text-5xl leading-[1.05]"
            style={{ ...headingStyle, color: palette.foreground }}
          >
            {business.city}, {business.state}
          </h2>
        </div>

        {/* Map + address grid */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-stretch">
          {/* Address card */}
          <div
            className="rounded-2xl p-8 lg:p-10 flex flex-col justify-center"
            style={{
              background: palette.surface,
              border: `1px solid ${palette.border}`,
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.25em] mb-3 font-semibold"
              style={{ color: palette.accent }}
            >
              {business.business_name}
            </p>
            <p
              className="text-base lg:text-lg leading-[1.7] mb-6"
              style={{ color: palette.foreground }}
            >
              {business.street_address}
              <br />
              {business.city}, {business.state} {business.zip}
            </p>

            <div className="space-y-3">
              <div>
                <p
                  className="text-[11px] uppercase tracking-[0.25em] mb-1.5"
                  style={{ color: palette.muted }}
                >
                  Phone
                </p>
                <a
                  href={`tel:${business.phone_e164}`}
                  className="text-base font-semibold hover:underline underline-offset-4"
                  style={{ color: palette.primary }}
                >
                  {business.phone}
                </a>
              </div>

              {business.email && (
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.25em] mb-1.5"
                    style={{ color: palette.muted }}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-sm hover:underline underline-offset-4 break-all"
                    style={{ color: palette.foreground }}
                  >
                    {business.email}
                  </a>
                </div>
              )}

              {business.service_area && (
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.25em] mb-1.5"
                    style={{ color: palette.muted }}
                  >
                    Service Area
                  </p>
                  <p className="text-sm" style={{ color: palette.foreground }}>
                    {business.service_area}
                  </p>
                </div>
              )}
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-bold transition-all hover:-translate-y-0.5"
              style={{ background: palette.primary, color: palette.primaryFg }}
            >
              Get Directions
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Map embed */}
          <div
            className="rounded-2xl overflow-hidden relative min-h-[320px] lg:min-h-[400px]"
            style={{
              border: `1px solid ${palette.border}`,
              background: palette.surface,
            }}
          >
            <iframe
              title={`Map of ${business.business_name}`}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapsUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
