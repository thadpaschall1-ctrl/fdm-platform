import type { Metadata } from "next";
import { DemoWidget } from "@/components/demo-widget";

export const metadata: Metadata = {
  title: "Live AI Voice Demo | Try It For Your Business",
  description:
    "Hear how an AI voice receptionist sounds for YOUR business. Pick your industry, start a live conversation — free, no signup required.",
  alternates: {
    canonical: "https://fastdigitalmarketing.com/demo",
  },
};

// Niches shown as tiles on /demo. Ordered so the most-recognized industries
// appear first (top of the grid, above the fold on both mobile and desktop),
// then Fast Start priority niches, then specialty + long-tail verticals.
// Users can also type a custom niche via the "Other" input.
const POPULAR_NICHES = [
  // Row 1 — the 4 most-searched industries (always visible first)
  "Security Company",
  "Chiropractic Practice",
  "Dental Office",
  "Plumbing Company",

  // Row 2 — core home services
  "HVAC Company",
  "Electrical Contractor",
  "Roofing Company",
  "Law Firm",

  // Row 3 — Fast Start high-ticket urgency niches
  "Foundation Repair",
  "Solar Panel Installation",
  "Mold Remediation",
  "Crawl Space Encapsulation",
  "Spray Foam Insulation",

  // Row 4 — Florida / Sunbelt plays
  "Pool Resurfacing & Remodeling",
  "Screen Enclosure / Lanai Builder",
  "Hurricane Shutter / Impact Window",
  "Soft Wash Roof & Exterior Cleaning",

  // Row 5 — Outdoor living / hardscape
  "Artificial Turf Installation",
  "Paver & Hardscape Contractor",
  "Deck Builder",
  "Landscaping Company",

  // Row 6 — Concrete / floors
  "Polished Concrete (Commercial)",
  "Concrete Coatings / Garage Floors",
  "Stained / Stamped Decorative Concrete",
  "Epoxy Flooring",

  // Row 7 — Specialty plumbing & water
  "Tankless Water Heater Install",
  "Whole-Home Water Filtration / Softeners",
  "Bathtub Reglazing / Refinishing",
  "Dryer Vent Cleaning",

  // Row 8 — Auto / mobile services
  "Auto Repair Shop",
  "Paintless Dent Repair",
  "Auto Window Tinting",
  "Mobile Pet Grooming",

  // Row 9 — Commercial B2B
  "Commercial Pressure Washing",
  "Commercial Cleaning / Janitorial",
  "Stair Lift Installation",
  "Senior Bathroom Remodels (Walk-in Tubs)",

  // Row 10 — Sensitive cleanup + residential cleaning
  "Biohazard / Crime Scene / Hoarding Cleanup",
  "Home Cleaning Service",
  "Veterinary Clinic",
  "Mobile Veterinarian",

  // Row 11 — Health, beauty, lifestyle
  "Medical Spa / Medspa",
  "Hair Salon / Beautician",
  "Fitness Studio / Gym",
  "Photography Studio",

  // Row 12 — Professional services
  "Accounting Firm",
  "Business Consultant",
  "Insurance Agency",
  "Real Estate Agency",

  // Row 13 — Other specialty
  "Window & Door Company",
];

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px] animate-[float_10s_ease-in-out_infinite_2s]" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative">
          <p className="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-bold text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            Live Demo — No Signup Required
          </p>
          <h1 className="reveal reveal-delay-1 mx-auto max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl tracking-tight">
            Hear How AI Sounds for{" "}
            <span className="text-gradient-blue">Your Business</span>
          </h1>
          <p className="reveal reveal-delay-2 mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Pick your industry, click start, and have a live conversation with an AI
            receptionist trained for your niche.
          </p>
        </div>
      </section>

      {/* Demo Widget */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <DemoWidget popularNiches={POPULAR_NICHES} />
      </section>

      {/* What You're Experiencing */}
      <section className="relative overflow-hidden px-6 py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
        <div className="relative mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-white tracking-tight">
            What You&apos;re About to <span className="text-gradient-electric">Experience</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: "🎯", title: "Niche-Trained", desc: "The AI knows your industry — appointment types, common questions, services, and terminology.", color: "from-blue-600/20 to-blue-900/20 border-blue-500/20" },
              { icon: "🇬🇧", title: "British Accent", desc: "Meet Holland — your AI receptionist with a natural British accent that customers love.", color: "from-violet-600/20 to-violet-900/20 border-violet-500/20" },
              { icon: "⚡", title: "Works 24/7", desc: "Never miss a call again. Your AI receptionist handles calls at 2am the same as 2pm.", color: "from-emerald-600/20 to-emerald-900/20 border-emerald-500/20" },
            ].map((item) => (
              <div key={item.title} className={`card-hover rounded-2xl border bg-gradient-to-br ${item.color} p-7 text-center`}>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-2xl">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="border-gradient rounded-3xl bg-slate-900 p-12 text-center">
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">Ready to Put This to Work?</h2>
            <p className="mx-auto mt-4 max-w-md text-slate-400">
              Get a custom AI receptionist for your business — handles calls, books appointments, and never takes a day off.
            </p>
            <a
              href="/audit"
              className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-4 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)]"
            >
              Get Your Free Audit
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
