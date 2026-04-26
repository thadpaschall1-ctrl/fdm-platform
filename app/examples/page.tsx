import type { Metadata } from "next";
import Link from "next/link";
import { listFictionalBusinesses } from "@/lib/data/fictional-businesses";
import { getNicheDesign } from "@/lib/data/niche-design";
import { ARCHETYPES } from "@/lib/data/design-archetypes";
import { getNicheImage } from "@/lib/preview/load-images";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Website Examples by Niche | Fast Digital Marketing",
  description:
    "See real examples of AI-generated websites Fast Digital Marketing builds — niche-specific design, photography, voice AI, appointments, AI SEO. One example per industry.",
  alternates: {
    canonical: "https://www.fastdigitalmarketing.com/examples",
  },
};

export default function ExamplesGalleryPage() {
  const businesses = listFictionalBusinesses();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 lg:px-16 py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            Website Examples
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0]">
            See what we build,{" "}
            <span className="text-gradient-blue">by industry.</span>
          </h1>
          <p className="mt-7 text-lg lg:text-xl text-slate-400 max-w-2xl leading-[1.65]">
            Each example below is an AI-generated website tuned to its
            specific industry — designed differently from the others, with
            real-world photography, niche-specific copy, and Fast Digital
            Marketing&apos;s full service stack ready to demo.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            These are <em>fictional</em> businesses for demonstration. When you
            sign up, your own site is built using the same archetypes, tuned
            to <strong className="text-slate-300">your</strong> business.
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="px-6 lg:px-16 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => {
              const design = getNicheDesign(b.niche_slug);
              const archetype = ARCHETYPES[design.archetype];
              const heroImg = getNicheImage(b.niche_slug, "hero");
              return (
                <Link
                  key={b.niche_slug}
                  href={`/examples/${b.niche_slug}`}
                  className="group rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-900/80 transition-all hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)]"
                >
                  {/* Image preview */}
                  {heroImg ? (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={heroImg.url}
                        alt={b.niche_name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-600/30 to-violet-600/30" />
                  )}

                  {/* Card body */}
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">
                      {archetype.label}
                    </p>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-1.5">
                      {b.business_name}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {b.niche_name} · {b.city}, {b.state}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-sm">
                      <span className="text-slate-500">{archetype.feel.split(".")[0]}</span>
                      <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-16 py-10 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl text-center text-sm text-slate-500">
          <p>
            Want a site like this for your business?{" "}
            <Link href="/pricing" className="text-blue-400 underline underline-offset-4 hover:text-blue-300">
              See pricing
            </Link>{" "}
            or{" "}
            <Link href="/audit" className="text-blue-400 underline underline-offset-4 hover:text-blue-300">
              run a free audit
            </Link>{" "}
            of your current online presence.
          </p>
        </div>
      </footer>
    </div>
  );
}
