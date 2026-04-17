import type { Metadata } from "next";
import DemoFlow from "@/components/demo/demo-flow";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "See Your Free AI-Optimized Website Preview in 60 Seconds | Fast Digital Marketing",
  description:
    "Drop your current website URL and we'll show you exactly what a modern, AI-optimized redesign looks like — free, instant, no credit card. See how you could rank in ChatGPT, Perplexity, and Google AI Overviews.",
  alternates: {
    canonical: "https://fastdigitalmarketing.com/free-preview",
  },
  openGraph: {
    title: "See Your Free Website Preview in 60 Seconds",
    description: "Enter your URL. We'll show you a modern, AI-optimized redesign — instantly.",
    url: "https://fastdigitalmarketing.com/free-preview",
    siteName: "Fast Digital Marketing",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function FreePreviewPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/3 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      <header className="border-b border-white/[0.08] bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3.5">
          <a href="https://fastdigitalmarketing.com" className="text-lg font-bold text-white">
            Fast Digital <span className="text-amber-400">Marketing</span>
          </a>
          <span className="hidden sm:inline text-xs text-slate-500">
            Free Website Preview · No Credit Card
          </span>
        </div>
      </header>

      <section className="relative px-6 pt-16 pb-8 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400">
            🚀 60-SECOND PREVIEW · FREE · NO SIGNUP TO SEE IT
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
            See Your New Website{" "}
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              in 60 Seconds.
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Drop your URL. We&apos;ll show you exactly what your site could look like —
            redesigned, AI-optimized, and ready to rank in ChatGPT, Perplexity, and Google
            AI Overviews.
          </p>
        </div>
      </section>

      <DemoFlow />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <TrustCard stat="$130M+" label="In revenue generated for clients" />
          <TrustCard stat="A-rated" label="AI search optimization on every site" />
          <TrustCard stat="Days, not months" label="From URL to live site" />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">What your free preview shows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Feature
            icon="🎨"
            title="A full redesign of your homepage"
            body="Modern layout, clean hero, service cards, testimonial wall, booking widget — built from your real business data."
          />
          <Feature
            icon="🤖"
            title="AI-search ready from day 1"
            body="Proper schema, FAQ structure, llms.txt, and entity clarity so ChatGPT / Perplexity / Google AI cite YOU instead of your competitor."
          />
          <Feature
            icon="📞"
            title="Real services, real reviews"
            body="We pull your actual services, hours, team, Google reviews, and social profiles from your existing site — no mockups."
          />
          <Feature
            icon="⚡"
            title="Ready to launch this week"
            body="Like what you see? Your real site goes live within days. Starting at $49/month — less than one cup of coffee per day."
          />
        </div>
      </section>

      <footer className="border-t border-white/[0.08] mt-16">
        <div className="mx-auto max-w-[1200px] px-6 py-10 text-center text-sm text-slate-500 space-y-2">
          <p>
            <a href="https://fastdigitalmarketing.com" className="hover:text-white">Fast Digital Marketing</a>
            {" · "}
            <a href="/privacy" className="hover:text-white">Privacy</a>
            {" · "}
            <a href="/terms" className="hover:text-white">Terms</a>
          </p>
          <p className="text-xs text-slate-600">
            A service of AI Security Edge LLC · Msg & data rates may apply. Reply STOP to cancel.
          </p>
        </div>
      </footer>
    </div>
  );
}

function TrustCard({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 text-center">
      <div className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent mb-2">
        {stat}
      </div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
    </div>
  );
}
