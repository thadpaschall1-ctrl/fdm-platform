import type { Metadata } from "next";
import { DemoWidget } from "@/components/demo-widget";

export const metadata: Metadata = {
  title: "Live AI Voice Demo | Try It For Your Business",
  description:
    "Hear how an AI voice receptionist sounds for YOUR business. Pick your industry, start a live conversation, and experience the future of customer service — free, no signup required.",
  alternates: {
    canonical: "https://fastdigitalmarketing.com/demo",
  },
};

const POPULAR_NICHES = [
  "Dental Office",
  "Law Firm",
  "Plumbing Company",
  "HVAC Company",
  "Chiropractic Practice",
  "Real Estate Agency",
  "Auto Repair Shop",
  "Medical Spa / Medspa",
  "Veterinary Clinic",
  "Insurance Agency",
  "Roofing Company",
  "Landscaping Company",
  "Security Company",
  "Fitness Studio / Gym",
  "Accounting Firm",
  "Home Cleaning Service",
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="border-b border-white/[0.06] bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-20 text-center">
        <p className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400">
          Live Demo — No Signup Required
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
          Hear How AI Sounds for{" "}
          <span className="text-blue-400">Your Business</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
          Pick your industry, click start, and have a live conversation with an AI
          receptionist trained for your niche. No phone number needed.
        </p>
      </section>

      {/* Demo Section */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <DemoWidget popularNiches={POPULAR_NICHES} />
      </section>

      {/* How It Works */}
      <section className="border-t border-white/[0.06] bg-slate-900/30 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-white">
            What You&apos;re About to Experience
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-2xl">
                🎯
              </div>
              <h3 className="mb-2 font-semibold text-white">Niche-Trained</h3>
              <p className="text-sm text-slate-400">
                The AI knows your industry — appointment types, common questions,
                services, and terminology.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-2xl">
                🇬🇧
              </div>
              <h3 className="mb-2 font-semibold text-white">British Accent</h3>
              <p className="text-sm text-slate-400">
                Meet Holland — your AI receptionist with a natural British accent
                that customers love.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-2xl">
                ⚡
              </div>
              <h3 className="mb-2 font-semibold text-white">Works 24/7</h3>
              <p className="text-sm text-slate-400">
                Never miss a call again. Your AI receptionist handles calls at 2am
                the same as 2pm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-blue-900/40 bg-gradient-to-br from-blue-950/60 to-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to Put This to Work?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-slate-400">
            Get a custom AI receptionist for your business — handles calls,
            books appointments, and never takes a day off.
          </p>
          <a
            href="/#contact"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-8 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Get Started →
          </a>
        </div>
      </section>
    </div>
  );
}
