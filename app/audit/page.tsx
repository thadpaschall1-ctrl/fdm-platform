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
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="border-b border-white/[0.06] bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400 mb-6">
          FREE · INSTANT · NO CREDIT CARD
        </div>
        <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
          Get Your Free Business Audit
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-4">
          See exactly how your business appears online — Google reputation,
          website quality, SEO health, AI search readiness, and more. Takes
          60 seconds.
        </p>
        <p className="text-sm text-slate-500">
          We audit 6 categories and give you a letter grade with specific
          recommendations for each.
        </p>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-2xl px-6 py-16">
        <AuditForm />
      </div>
    </div>
  );
}
