import type { Metadata } from "next";
import SmartOnboarding from "@/components/onboarding/smart-onboarding";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Onboarding — Fast Digital Marketing",
  description: "Drop your website and we'll build you an A-rated site this week.",
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-white/[0.08] bg-slate-900/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3.5">
          <a href="https://fastdigitalmarketing.com" className="text-lg font-bold text-white">
            Fast Digital <span className="text-amber-400">Marketing</span>
          </a>
          <span className="text-xs text-slate-500">Client Onboarding</span>
        </div>
      </header>

      <div className="text-center mb-2 pt-12 px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Welcome to Fast Digital Marketing
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Drop your website URL and we&apos;ll do the rest. A-rated site live this week.
        </p>
      </div>

      <SmartOnboarding />
    </div>
  );
}
