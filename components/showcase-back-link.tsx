import Link from "next/link";
import type { ShowcasePalette } from "@/lib/preview/get-niche-palette";

/**
 * Small floating "FDM Demo" pill, fixed in the top-right corner of every
 * /examples/[slug] showcase page. Provides a way back to the gallery
 * without imposing FDM's full nav.
 *
 * Uses the niche's primary color for the ring + glow so the pill blends
 * into each business's brand identity. Falls back to FDM blue if no
 * palette is provided.
 */

const FDM_FALLBACK_PRIMARY = "#60a5fa";

interface ShowcaseBackLinkProps {
  palette?: ShowcasePalette;
}

export function ShowcaseBackLink({ palette }: ShowcaseBackLinkProps = {}) {
  const primary = palette?.primary ?? FDM_FALLBACK_PRIMARY;
  return (
    <Link
      href="/examples"
      className="fixed top-3 right-3 z-[60] rounded-full bg-slate-950/85 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur-md hover:bg-slate-950 hover:text-white transition-all hover:scale-[1.02] shadow-md"
      style={{
        // Subtle niche-colored ring so the pill picks up the page's brand identity
        boxShadow: `0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px ${primary}66, 0 0 12px ${primary}22`,
      }}
    >
      ← FDM Demo
    </Link>
  );
}
