import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
          <svg className="h-10 w-10 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-4">
          You&apos;re All Set!
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed mb-3">
          Your order has been confirmed. We&apos;ve sent a receipt to your email.
        </p>
        <p className="text-slate-500 mb-8">
          Our team will reach out within 1 business day to get started. In the meantime, check your inbox for next steps.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-500 transition-colors"
          >
            Back to Home
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
