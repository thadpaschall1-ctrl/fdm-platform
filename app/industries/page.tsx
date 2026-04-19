import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES, getIndustryBySlug } from "@/lib/data/industries";

export const metadata: Metadata = {
  title: "Industries We Serve | 50+ Playbooks | Fast Digital Marketing",
  description:
    "AI-delivered marketing for 50+ industries. Home services, concrete, outdoor living, health and wellness, pet services, automotive, professional services, and specialty trades. Every playbook built for your niche.",
  alternates: {
    canonical: "https://fastdigitalmarketing.com/industries",
  },
  openGraph: {
    title: "Industries We Serve | Fast Digital Marketing",
    description:
      "50+ industry playbooks. Same pricing, tuned to your niche. Pick yours and see the exact marketing system we build for it.",
    url: "https://fastdigitalmarketing.com/industries",
    type: "website",
  },
};

// Category map — slugs grouped by vertical. Update this when adding new niches.
// Any slug in INDUSTRIES but not listed here falls into "Other" at the bottom.
const CATEGORIES: {
  name: string;
  blurb: string;
  slugs: string[];
  accent: string;
}[] = [
  {
    name: "Home Services & Trades",
    blurb:
      "Mission-critical repairs, installs, and diagnostics. High urgency, missed-call leakage kills revenue.",
    accent: "blue",
    slugs: [
      "security-companies",
      "plumbers",
      "hvac",
      "electricians",
      "roofers",
      "windows-doors",
      "tankless-water-heater",
      "water-filtration",
      "mold-remediation",
      "spray-foam-insulation",
      "foundation-repair",
      "crawl-space-encapsulation",
      "solar-installers",
      "dryer-vent-cleaning",
      "biohazard-cleanup",
      "gutter-services",
      "garage-door",
      "fence-installers",
      "tree-service",
      "appliance-repair",
      "painters",
      "kitchen-bath-remodel",
      "home-inspectors",
      "restoration-water-fire",
      "outdoor-lighting",
    ],
  },
  {
    name: "Concrete & Flooring",
    blurb:
      "Specialty coatings, decorative concrete, and paver block installs — residential and commercial.",
    accent: "amber",
    slugs: [
      "epoxy-flooring",
      "concrete-coatings",
      "polished-concrete",
      "decorative-concrete",
      "paver-hardscape",
    ],
  },
  {
    name: "Outdoor Living & Landscape",
    blurb:
      "Design-build, installs, and outdoor upgrades. Long sales cycles, portfolio-driven buyers.",
    accent: "emerald",
    slugs: [
      "pool-builders",
      "pool-resurfacing",
      "hurricane-protection",
      "screen-enclosure",
      "paver-hardscape",
      "deck-builders",
      "artificial-turf",
      "landscaping",
      "irrigation-sprinkler",
    ],
  },
  {
    name: "Cleaning & Maintenance",
    blurb:
      "Residential, commercial, and recurring-service businesses. Route density wins.",
    accent: "cyan",
    slugs: [
      "soft-wash",
      "home-cleaning",
      "commercial-pressure-washing",
      "pest-control",
      "mosquito-control",
      "bathtub-reglazing",
      "carpet-cleaning",
      "junk-removal",
    ],
  },
  {
    name: "Aging-in-Place & Accessibility",
    blurb:
      "Adult-child buyer, benefits-navigation intensive, long research cycles. Huge 2026–2035 tailwind.",
    accent: "violet",
    slugs: [
      "stair-lift",
      "senior-bathroom-remodel",
      "home-health-senior-care",
    ],
  },
  {
    name: "Health, Wellness & Beauty",
    blurb:
      "Appointment-based practices where every missed call is a missed patient or client.",
    accent: "rose",
    slugs: [
      "chiropractors",
      "dental",
      "medical-spas",
      "weight-loss-hrt",
      "remote-therapists",
      "fitness",
      "hair-salons",
    ],
  },
  {
    name: "Pet & Veterinary",
    blurb:
      "Clinic-based and mobile pet services — wellness, grooming, boarding, and training.",
    accent: "teal",
    slugs: [
      "veterinary",
      "mobile-vet",
      "mobile-pet-grooming",
      "pet-boarding",
      "dog-trainers",
    ],
  },
  {
    name: "Automotive",
    blurb:
      "Shop-based and mobile technicians. The phone rings while you're on a car — AI solves that.",
    accent: "orange",
    slugs: [
      "auto-repair",
      "auto-body",
      "paintless-dent-repair",
      "auto-window-tint",
      "car-detailing",
    ],
  },
  {
    name: "Professional Services",
    blurb:
      "Service professionals who sell trust. Review velocity and instant response win the business.",
    accent: "indigo",
    slugs: [
      "law-firms",
      "real-estate",
      "insurance",
      "accounting",
      "business-consultants",
      "financial-advisors",
      "mortgage-brokers",
      "photography",
    ],
  },
];

const ACCENT_CLASSES: Record<
  string,
  { pill: string; dot: string; heading: string }
> = {
  blue: {
    pill: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    dot: "bg-blue-400",
    heading: "text-gradient-blue",
  },
  amber: {
    pill: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    dot: "bg-amber-400",
    heading: "text-gradient-electric",
  },
  emerald: {
    pill: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
    heading: "text-gradient-blue",
  },
  cyan: {
    pill: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    dot: "bg-cyan-400",
    heading: "text-gradient-electric",
  },
  violet: {
    pill: "border-violet-500/30 bg-violet-500/10 text-violet-400",
    dot: "bg-violet-400",
    heading: "text-gradient-blue",
  },
  rose: {
    pill: "border-rose-500/30 bg-rose-500/10 text-rose-400",
    dot: "bg-rose-400",
    heading: "text-gradient-electric",
  },
  teal: {
    pill: "border-teal-500/30 bg-teal-500/10 text-teal-400",
    dot: "bg-teal-400",
    heading: "text-gradient-blue",
  },
  orange: {
    pill: "border-orange-500/30 bg-orange-500/10 text-orange-400",
    dot: "bg-orange-400",
    heading: "text-gradient-electric",
  },
  indigo: {
    pill: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    dot: "bg-indigo-400",
    heading: "text-gradient-blue",
  },
};

// Stable anchor id from category name for the submenu jump links.
function catId(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function IndustriesIndexPage() {
  // Surface any slug that hasn't been assigned to a category (safety net for
  // new niches added without category updates).
  const categorized = new Set(CATEGORIES.flatMap((c) => c.slugs));
  const uncategorized = INDUSTRIES.filter((i) => !categorized.has(i.slug));

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industries We Serve | Fast Digital Marketing",
    url: "https://fastdigitalmarketing.com/industries",
    description:
      "Full directory of industry-specific AI marketing playbooks — home services, concrete, outdoor living, health and wellness, pet services, automotive, and professional services.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: INDUSTRIES.length,
      itemListElement: INDUSTRIES.map((i, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: i.name,
        url: `https://fastdigitalmarketing.com/industries/${i.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-3xl">
          <p className="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Industries We Serve
          </p>
          <h1 className="reveal reveal-delay-1 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
            {INDUSTRIES.length}+ playbooks.
            <br />
            <span className="text-gradient-blue">One platform.</span>
          </h1>
          <p className="reveal reveal-delay-2 mx-auto mt-6 max-w-xl text-lg text-slate-400 leading-relaxed">
            Every industry has different buyer behavior. Pick yours and see the
            exact AI-delivered marketing system we build — same pricing, tuned
            to your niche.
          </p>
          <div className="reveal reveal-delay-2 mt-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-slate-900/60 px-5 py-2 text-sm text-slate-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            All plans start at $47/mo. No setup fees. Month-to-month.
          </div>
        </div>
      </section>

      {/* Sticky category submenu — jumps to each section */}
      <div className="sticky top-[72px] z-40 border-y border-white/[0.08] bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6">
          <nav
            aria-label="Industry categories"
            className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map((cat) => {
              const accent = ACCENT_CLASSES[cat.accent] ?? ACCENT_CLASSES.blue;
              const count = cat.slugs.filter((s) =>
                getIndustryBySlug(s)
              ).length;
              return (
                <a
                  key={cat.name}
                  href={`#${catId(cat.name)}`}
                  className={`group shrink-0 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all hover:-translate-y-0.5 ${accent.pill} hover:brightness-125`}
                >
                  {cat.name}
                  <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">
                    {count}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Category sections */}
      <section className="relative px-6 pt-12 pb-20">
        <div className="mx-auto max-w-6xl space-y-16">
          {CATEGORIES.map((cat) => {
            const items = cat.slugs
              .map((s) => getIndustryBySlug(s))
              .filter((i): i is NonNullable<typeof i> => !!i);

            if (items.length === 0) return null;

            const accent = ACCENT_CLASSES[cat.accent] ?? ACCENT_CLASSES.blue;

            return (
              <div key={cat.name} id={catId(cat.name)} className="scroll-mt-32">
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p
                      className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${accent.pill}`}
                    >
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full ${accent.dot} animate-pulse`}
                      />
                      {cat.name}
                    </p>
                    <h2 className="font-display text-2xl font-bold text-white sm:text-3xl tracking-tight">
                      {cat.name.split(" & ")[0]}{" "}
                      <span className={accent.heading}>
                        {cat.name.includes(" & ")
                          ? `& ${cat.name.split(" & ").slice(1).join(" & ")}`
                          : ""}
                      </span>
                    </h2>
                  </div>
                  <p className="max-w-md text-sm text-slate-400 leading-relaxed">
                    {cat.blurb}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((ind) => (
                    <Link
                      key={ind.slug}
                      href={`/industries/${ind.slug}`}
                      className="group relative rounded-2xl border border-white/[0.08] bg-slate-900/80 p-5 transition-all hover:border-blue-500/40 hover:bg-slate-900 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                            {ind.name}
                          </h3>
                          <p className="mt-1.5 text-sm text-slate-400 leading-relaxed line-clamp-2">
                            {ind.hero}
                          </p>
                        </div>
                        <svg
                          className="mt-1 h-5 w-5 shrink-0 text-slate-600 transition-all group-hover:text-blue-400 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 12h14m-6-6 6 6-6 6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Uncategorized safety net */}
          {uncategorized.length > 0 && (
            <div>
              <div className="mb-8">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-500/30 bg-slate-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-400">
                  More Industries
                </p>
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl tracking-tight">
                  Also <span className="text-gradient-blue">serving</span>
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {uncategorized.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={`/industries/${ind.slug}`}
                    className="group relative rounded-2xl border border-white/[0.08] bg-slate-900/80 p-5 transition-all hover:border-blue-500/40 hover:bg-slate-900 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                          {ind.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-slate-400 leading-relaxed line-clamp-2">
                          {ind.hero}
                        </p>
                      </div>
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-slate-600 transition-all group-hover:text-blue-400 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 12h14m-6-6 6 6-6 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Not-listed callout */}
      <section className="relative px-6 py-16 border-y border-white/[0.06] bg-slate-900/40">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl tracking-tight">
            Don&rsquo;t see your industry?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400 leading-relaxed">
            The platform works for any business that sells something, takes
            calls, and wants to show up in search. We have playbooks we
            haven&rsquo;t published yet — ask us.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="group relative inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Get My Free Audit →</span>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-xl border border-white/[0.12] bg-white/[0.03] px-6 py-3 text-sm font-bold text-white hover:bg-white/[0.08] transition-colors"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
