import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UNIFIED_PACKAGES, PackageSlug } from "@/lib/data/packages";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = {
  title: "Checkout | Fast Digital Marketing",
  description: "Complete your subscription to Fast Digital Marketing.",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ tier?: string; cycle?: string }>;
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const tierSlug = params.tier as PackageSlug | undefined;
  const cycle = params.cycle === "annual" ? "annual" : "monthly";

  const tier = UNIFIED_PACKAGES.find((p) => p.slug === tierSlug);
  if (!tier) notFound();

  const price = cycle === "annual" ? tier.priceAnnual : tier.priceMonthly;
  const priceLabel =
    cycle === "annual"
      ? `$${tier.priceAnnual}/year (save 2 months)`
      : `$${tier.priceMonthly}/month`;
  const billingInterval = cycle === "annual" ? "year" : "month";

  return (
    <div className="min-h-[80vh] px-6 py-16">
      <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-5 lg:gap-12">
        {/* Order summary */}
        <aside className="lg:col-span-2">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            You&rsquo;re signing up for
          </p>
          <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h1 className="font-display text-2xl font-bold text-white tracking-tight">
                {tier.name}
              </h1>
            </div>
            <p className="mt-2 text-sm text-slate-400">{tier.tagline}</p>
            <div className="mt-5 rounded-xl bg-slate-950/60 border border-white/[0.05] p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-slate-400">Price</span>
                <span className="text-2xl font-bold text-white">${price}</span>
              </div>
              <div className="mt-1 text-xs text-slate-500 text-right">
                {priceLabel}
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-slate-400">
              <li className="flex gap-2">
                <span className="text-emerald-400">✓</span>
                <span>$0 setup fee</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Month-to-month (cancel anytime)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Live in 5 business days</span>
              </li>
              {cycle === "annual" && (
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>2 months free vs. monthly</span>
                </li>
              )}
            </ul>
          </div>

          <p className="mt-5 text-center text-xs text-slate-500">
            <Link href="/pricing" className="hover:text-white transition-colors">
              ← Back to pricing
            </Link>
          </p>
        </aside>

        {/* Email capture form (client component) */}
        <section className="lg:col-span-3">
          <CheckoutForm tier={tier.slug} billingInterval={billingInterval} />
        </section>
      </div>
    </div>
  );
}
