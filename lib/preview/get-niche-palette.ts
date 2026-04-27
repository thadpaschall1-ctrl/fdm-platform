/**
 * Helper: resolve the merged design palette for a given niche slug.
 *
 * Mirrors the logic in components/preview/example-site.tsx so the
 * /examples/[slug] page can pass the same palette to floating chrome
 * components (showcase explainer, FAQ, tour, etc.). That way the
 * floating pills adopt each niche's brand identity instead of all
 * looking identical in FDM blue.
 *
 * Without this helper the page would have to duplicate the niche →
 * archetype → palette merge logic inline; this keeps it single-source.
 */

import { ARCHETYPES, type DesignArchetype } from "@/lib/data/design-archetypes";
import { getNicheDesign } from "@/lib/data/niche-design";

export type ShowcasePalette = DesignArchetype["palette"];

export function getNichePalette(nicheSlug: string): ShowcasePalette {
  const niche = getNicheDesign(nicheSlug);
  const archetype = ARCHETYPES[niche.archetype];
  return { ...archetype.palette, ...(niche.paletteShifts || {}) };
}
