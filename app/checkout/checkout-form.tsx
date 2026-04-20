"use client";

import { useState } from "react";

interface Props {
  tier: string;
  billingInterval: "month" | "year";
}

export function CheckoutForm({ tier, billingInterval }: Props) {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          interval: billingInterval,
          email,
          businessName,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Checkout failed. Please try again.");
        setBusy(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-7">
      <h2 className="font-display text-xl font-bold text-white tracking-tight">
        Your details
      </h2>
      <p className="mt-1 text-sm text-slate-400">
        We&rsquo;ll send your receipt and login link here.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourbusiness.com"
            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
          />
        </div>

        <div>
          <label htmlFor="businessName" className="block text-sm font-semibold text-white mb-2">
            Business name <span className="text-slate-500 font-normal">(optional)</span>
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Your Business LLC"
            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white transition-all hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {busy ? "Loading secure checkout…" : "Continue to Secure Checkout →"}
        </button>

        <p className="text-center text-xs text-slate-500 leading-relaxed">
          You&rsquo;ll be redirected to Stripe to complete payment. Month-to-month.
          Cancel anytime from your dashboard. Your card is never stored on our servers.
        </p>
      </form>
    </div>
  );
}
