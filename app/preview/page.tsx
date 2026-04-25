import type { Metadata } from "next";
import Link from "next/link";
import { listAllPreviews, listBatchNiches } from "@/lib/preview/load-business";
import { getNicheDesign } from "@/lib/data/niche-design";
import { ARCHETYPES } from "@/lib/data/design-archetypes";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "QA Preview Gallery | FDM",
  description: "Internal QA gallery — AI-generated site previews across niches.",
  robots: { index: false, follow: false },
};

export default function PreviewIndexPage() {
  const niches = listBatchNiches();
  const all = listAllPreviews();

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
            FDM AI Generator — QA Gallery
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            {all.length} preview sites across {niches.length} niches
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl">
            Each site is AI-generated from the business&apos;s real data + niche-specific
            design archetype + per-niche overrides. Compare each preview against the
            business&apos;s existing website to evaluate whether the FDM generator produces
            visually distinct, niche-appropriate output.
          </p>
        </header>

        {niches.map((n) => {
          const design = getNicheDesign(n.slug);
          const archetype = ARCHETYPES[design.archetype];
          const items = all.filter((p) => p.business.niche_slug === n.slug);

          return (
            <section key={n.slug} className="mb-16">
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{n.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Archetype:{" "}
                    <span className="text-slate-300">{archetype.label}</span>
                    {" · "}
                    {archetype.feel}
                  </p>
                </div>
                <span className="text-xs text-slate-500">
                  {items.length} preview{items.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <div
                    key={item.previewId}
                    className="group rounded-xl border border-white/[0.08] bg-slate-900/80 p-5 transition hover:border-blue-500/40 hover:bg-slate-900 flex flex-col"
                  >
                    <Link
                      href={`/preview/${item.previewId}`}
                      className="block flex-1"
                    >
                      <div className="text-xs font-mono text-slate-500 mb-2">
                        {item.previewId}
                      </div>
                      <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors">
                        {item.business.business_name}
                      </h3>
                      <div className="mt-2 text-sm text-slate-400 space-y-1">
                        <div>📍 {item.business.city}</div>
                        {item.business.phone && <div>📞 {item.business.phone}</div>}
                        <div className="text-xs text-slate-500">
                          ⭐ {item.business.rating?.toFixed(1) || "—"} ·{" "}
                          {item.business.review_count} reviews
                        </div>
                      </div>
                    </Link>
                    {item.business.website && (
                      <div className="mt-3 pt-3 border-t border-white/[0.06]">
                        <a
                          href={item.business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-slate-500 hover:text-blue-400 underline truncate block"
                        >
                          Compare → {item.business.website}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <footer className="mt-16 pt-8 border-t border-white/[0.08] text-sm text-slate-500">
          Generated from <code className="text-slate-300">data/qa-batch.json</code>.
          Re-run <code className="text-slate-300">npm run qa-pull</code> to regenerate
          the input set, then redeploy to update these previews.
        </footer>
      </div>
    </div>
  );
}
