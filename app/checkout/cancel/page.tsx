import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
  robots: { index: false },
};

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-500/10 border border-slate-500/20">
          <svg className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-4">
          Checkout Cancelled
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed mb-3">
          No worries -- nothing was charged.
        </p>
        <p className="text-slate-500 mb-8">
          If you have questions about our plans or want to talk to someone first, give us a call or try the live AI demo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/audit"
            className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-500 transition-colors"
          >
            Run a Free Audit
          </Link>
          <a
            href="tel:+18889834449"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 font-medium text-white hover:bg-white/10 transition-colors"
          >
            Call (888) 983-4449
          </a>
        </div>
      </div>
    </div>
  );
}
