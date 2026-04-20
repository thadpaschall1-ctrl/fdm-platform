import type { Metadata } from "next";
import Link from "next/link";
import { UNIFIED_PACKAGES, PackageSlug } from "@/lib/data/packages";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};

interface PageProps {
  searchParams: Promise<{
    tier?: string;
    interval?: string;
    type?: string;
    session_id?: string;
  }>;
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Full-audit one-time purchase path
  if (params.type === "full-audit") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
            <svg className="h-10 w-10 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-4">
            Full Audit Ordered
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-3">
            Your full business audit is being generated. You&rsquo;ll receive the PDF report in your email within 15 minutes.
          </p>
          <Link href="/" className="inline-block mt-6 rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-500 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Subscription signup path
  const tierSlug = params.tier as PackageSlug | undefined;
  const tier = UNIFIED_PACKAGES.find((p) => p.slug === tierSlug);
  const interval = params.interval === "year" ? "annual" : "monthly";

  return (
    <div className="min-h-screen flex items-center px-6 py-16">
      <div className="mx-auto max-w-2xl">
        {/* Confirmation header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
            <svg className="h-10 w-10 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-display text-4xl font-bold text-white tracking-tight mb-3">
            You&rsquo;re in.
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            {tier ? (
              <>
                Your subscription to <strong className="text-white">{tier.name}</strong> ({interval}) is active.
                Receipt is on its way to your email.
              </>
            ) : (
              <>Your subscription is active. Receipt is on its way to your email.</>
            )}
          </p>
        </div>

        {/* Next step card */}
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-violet-600/10 p-8 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            Next Step — 2 minutes
          </p>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-3">
            Complete Your Onboarding
          </h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            Drop your existing website URL (or a brief form if you don&rsquo;t have one yet) and we&rsquo;ll build
            your Smart Website. Your <strong className="text-white">5 business day</strong> launch clock starts
            the moment onboarding is complete.
          </p>
          <Link
            href={tierSlug ? `/onboarding?tier=${tierSlug}` : "/onboarding"}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(37,99,235,0.3)]"
          >
            Start Onboarding →
          </Link>
        </div>

        {/* What to expect */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3 text-center">
          <div className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-5">
            <div className="text-2xl mb-2">1.</div>
            <div className="text-sm font-semibold text-white">Onboarding (today)</div>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Drop your URL or answer a few quick questions
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-5">
            <div className="text-2xl mb-2">2.</div>
            <div className="text-sm font-semibold text-white">AI builds your site</div>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              5 business days — you&rsquo;ll get an email when it&rsquo;s ready
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-5">
            <div className="text-2xl mb-2">3.</div>
            <div className="text-sm font-semibold text-white">Go live</div>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Review, approve, publish. Your site is live.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Questions? Your dashboard has an AI help center built in.
          For billing, email <a href="mailto:hello@fastdigitalmarketing.com" className="text-slate-400 hover:text-white">hello@fastdigitalmarketing.com</a>.
        </p>
      </div>
    </div>
  );
}
