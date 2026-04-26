/**
 * ExampleSite — public-facing reference site renderer.
 *
 * Resolves a fictional business + archetype + content + design overrides,
 * then dispatches to the right per-archetype layout component.
 *
 * Currently bespoke layouts:
 *   - premium-outdoor-living
 *   - visual-pinterest
 *
 * Other 5 archetypes use the refined `BaseLayout` until their bespoke versions
 * are built in follow-up sessions.
 */

import { ARCHETYPES, type DesignArchetype } from "@/lib/data/design-archetypes";
import { getNicheDesign, type NicheDesignOverride } from "@/lib/data/niche-design";
import { getNicheSiteContent } from "@/lib/data/niche-site-content";
import type { FictionalBusiness } from "@/lib/data/fictional-businesses";

import { PremiumOutdoorLayout } from "./archetypes/premium-outdoor";
import { VisualPinterestLayout } from "./archetypes/visual-pinterest";
import { BaseLayout } from "./archetypes/base";

interface ExampleSiteProps {
  business: FictionalBusiness;
}

function mergePalette(
  archetype: DesignArchetype,
  override: NicheDesignOverride
): DesignArchetype["palette"] {
  return { ...archetype.palette, ...(override.paletteShifts || {}) };
}

export function ExampleSite({ business }: ExampleSiteProps) {
  const niche = getNicheDesign(business.niche_slug);
  const archetype = ARCHETYPES[niche.archetype];
  const palette = mergePalette(archetype, niche);
  const content = getNicheSiteContent(business.niche_slug);

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

  const sharedProps = {
    archetype,
    niche,
    content,
    business,
    palette,
    cssVars,
  };

  // Dispatch to bespoke layouts where available, fall back to refined base.
  switch (archetype.id) {
    case "premium-outdoor-living":
      return <PremiumOutdoorLayout {...sharedProps} />;
    case "visual-pinterest":
      return <VisualPinterestLayout {...sharedProps} />;
    default:
      return <BaseLayout {...sharedProps} />;
  }
}
