import type { Metadata } from "next";
import { AuditForm } from "@/components/audit-form";

export const metadata: Metadata = {
  title: "Free Business Audit | See How You Appear Online | Fast Digital Marketing",
  description:
    "Get a free instant audit of your business's online presence. Google reputation, website quality, SEO health, AI search readiness — graded in 60 seconds.",
  alternates: {
    canonical: "https://fastdigitalmarketing.com/audit",
  },
};

export default function AuditPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative">
          <div className="reveal inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-5 py-2 text-sm font-bold text-blue-400 mb-8">
            FREE &middot; INSTANT &middot; NO CREDIT CARD
          </div>
          <h1 className="reveal reveal-delay-1 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl tracking-tight mb-6">
            Get Your Free <span className="text-gradient-blue">Business Audit</span>
          </h1>
          <p className="reveal reveal-delay-2 text-lg text-slate-400 max-w-2xl mx-auto mb-3">
            See exactly how your business appears online — Google reputation,
            website quality, SEO health, AI search readiness. Takes 60 seconds.
          </p>
          <p className="reveal reveal-delay-3 text-sm text-slate-500">
            We audit 6 categories and give you a letter grade with specific recommendations for each.
          </p>
        </div>
      </section>

      {/* Form */}
      <div className="mx-auto max-w-2xl px-6 py-12">
        <AuditForm />
      </div>
    </div>
  );
}
