"use client";

import { useState } from "react";

interface Props {
  plan: string;
  serviceTitle: string;
  price: string;
  setupFee?: string;
  className?: string;
}

export function ServiceCheckoutButton({ plan, serviceTitle, price, setupFee, className }: Props) {
  const [busy, setBusy] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (!emailInput || !emailInput.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email: emailInput, businessName: "" }),
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

  // If a custom className is passed, this is being used inside a package card — use compact stacked layout
  if (className) {
    return (
      <div className="w-full space-y-2">
        <input
          type="email"
          placeholder="Your email"
          value={emailInput}
          onChange={(e) => { setEmailInput(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && handleCheckout()}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50"
        />
        <button
          onClick={handleCheckout}
          disabled={busy}
          className={`${className} disabled:opacity-60 disabled:cursor-wait`}
        >
          {busy ? "Processing..." : "Get Started"}
        </button>
        {error && <p className="text-xs text-red-400 text-center">{error}</p>}
      </div>
    );
  }

  // Default layout — wider, used on service page hero
  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <input
        type="email"
        placeholder="Your email"
        value={emailInput}
        onChange={(e) => { setEmailInput(e.target.value); setError(""); }}
        onKeyDown={(e) => e.key === "Enter" && handleCheckout()}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
      />
      <button
        onClick={handleCheckout}
        disabled={busy}
        className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(37,99,235,0.3)] hover:bg-blue-500 disabled:opacity-60 disabled:cursor-wait"
      >
        {busy ? "Processing..." : `Get Started -- ${price}/mo`}
      </button>
      {setupFee && (
        <p className="text-xs text-slate-500 text-center">+ {setupFee} build cost</p>
      )}
      {error && (
        <p className="text-xs text-red-400 text-center">{error}</p>
      )}
    </div>
  );
}
