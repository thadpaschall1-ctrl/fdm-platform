"use client";

import Link from "next/link";
import { useState } from "react";
import { UNIFIED_PACKAGES, ADD_ONS, addOnsForTier } from "@/lib/data/packages";
import { InfoTooltip } from "@/components/InfoTooltip";

type BillingCycle = "monthly" | "annual";

export function PricingCards() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <div>
      {/* Billing cycle toggle */}
      <div className="mb-10 flex justify-center">
        <div className="inline-flex rounded-full border border-white/[0.08] bg-slate-900/80 p-1">
          <button
            onClick={() => setCycle("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              cycle === "monthly"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setCycle("annual")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              cycle === "annual"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Annual
            <span className="ml-2 rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400">
              2 MONTHS FREE
            </span>
          </button>
        </div>
      </div>

      {/* 4 tier cards */}
      <div className="grid gap-6 lg:grid-cols-4">
        {UNIFIED_PACKAGES.map((pkg) => {
          const price = cycle === "monthly" ? pkg.priceMonthly : pkg.priceAnnual;
          const billedLabel = cycle === "monthly" ? "/mo" : "/yr";
          const altLabel =
            cycle === "monthly"
              ? `or $${pkg.priceAnnual}/yr (2 months free)`
              : `= $${Math.round(pkg.priceAnnual / 12)}/mo effective`;

          return (
            <div
              key={pkg.slug}
              className={`relative rounded-2xl border p-7 transition-all hover:-translate-y-1 ${
                pkg.highlighted
                  ? "border-blue-500/40 bg-blue-950/20 ring-1 ring-blue-500/20"
                  : "border-white/[0.08] bg-slate-900/80"
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
              <p className="mt-1 text-xs text-slate-500">{pkg.tagline}</p>

              <div className="mt-4">
                <span className="text-4xl font-bold text-white">${price}</span>
                <span className="ml-1 text-sm text-slate-500">{billedLabel}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{altLabel}</p>

              <ul className="mt-6 space-y-2.5">
                {pkg.features.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                  >
                    <svg
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="flex-1">
                      {f.label}
                      {f.explainer && <InfoTooltip content={f.explainer} label={f.label} />}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/checkout?tier=${pkg.slug}&cycle=${cycle}`}
                className={`mt-7 block rounded-xl py-3 text-center text-sm font-bold transition-all ${
                  pkg.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Get Started →
              </Link>

              {pkg.limits.length > 0 && (
                <details className="mt-5 text-xs">
                  <summary className="cursor-pointer text-slate-500 hover:text-slate-300">
                    Usage limits
                  </summary>
                  <ul className="mt-2 space-y-1 pl-2">
                    {pkg.limits.map((limit) => (
                      <li key={limit} className="text-slate-500 leading-relaxed">
                        · {limit}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          );
        })}
      </div>

      {/* Add-ons */}
      <div className="mt-20">
        <h2 className="mb-3 text-center font-display text-2xl font-bold text-white tracking-tight">
          Optional Add-Ons
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-center text-sm text-slate-400">
          Click any plan above to check out, then add these during signup or anytime from your dashboard.
        </p>
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {ADD_ONS.map((addon) => {
            const priceLabel =
              addon.unit === "monthly"
                ? `$${addon.price}/mo`
                : addon.unit === "annual"
                ? `$${addon.price}/yr`
                : `$${addon.price} one-time`;
            return (
              <div
                key={addon.slug}
                className="rounded-2xl border border-white/[0.08] bg-slate-900/80 p-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-bold text-white">{addon.name}</h3>
                  <span className="shrink-0 text-sm font-bold text-blue-400">{priceLabel}</span>
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">{addon.description}</p>
                {addon.bundledWith && addon.bundledWith.length > 0 && (
                  <p className="mt-3 text-[11px] font-semibold text-green-400">
                    ✓ Included free with{" "}
                    {addon.bundledWith
                      .map((slug) => UNIFIED_PACKAGES.find((p) => p.slug === slug)?.name)
                      .filter(Boolean)
                      .join(" and ")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Suppress unused import warnings */}
      <span className="hidden">{String(addOnsForTier)}</span>
    </div>
  );
}
