"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import type { FictionalBusiness } from "@/lib/data/fictional-businesses";
import type { NicheSiteContent } from "@/lib/data/niche-site-content";
import type { DesignArchetype } from "@/lib/data/design-archetypes";
import { ShowcaseBookingDemo } from "./showcase-booking-demo";

/**
 * Showcase Booking CTA — client wrapper that renders a button which opens
 * the ShowcaseBookingDemo modal. Used by archetype layouts wherever a
 * booking-style CTA appears (hero, final CTA, etc.).
 *
 * Each archetype passes its own className/style so the button matches the
 * existing CTA visual (no design drift) — only the click behavior changes
 * from "tel: dial a fake number" to "open the live booking demo modal."
 */

interface ShowcaseBookingCTAProps {
  business: FictionalBusiness;
  content: NicheSiteContent;
  palette: DesignArchetype["palette"];
  /** Visible button label (uses content.heroCta or whatever the layout decides) */
  label: string;
  /** Tailwind classes for the button visuals (matches each archetype's existing CTA) */
  className?: string;
  /** Inline style for additional theming (background, color, etc.) */
  style?: CSSProperties;
  /** Optional ARIA label override */
  ariaLabel?: string;
}

export function ShowcaseBookingCTA({
  business,
  content,
  palette,
  label,
  className,
  style,
  ariaLabel,
}: ShowcaseBookingCTAProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
        style={style}
        aria-label={ariaLabel || `Book an appointment with ${business.business_name}`}
      >
        {label}
      </button>
      <ShowcaseBookingDemo
        business={business}
        content={content}
        palette={palette}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
