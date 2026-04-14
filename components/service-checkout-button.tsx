"use client";

import { useState } from "react";

interface Props {
  plan: string;
  serviceTitle: string;
  price: string;
  setupFee?: string;
  className?: string;
}

export function ServiceCheckoutButton({ plan, serviceTitle, price, setupFee }: Props) {
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

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Your email"
          value={emailInput}
          onChange={(e) => { setEmailInput(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && handleCheckout()}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        />
        <button
          onClick={handleCheckout}
          disabled={busy}
          className="shrink-0 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(37,99,235,0.3)] hover:bg-blue-500 disabled:opacity-60 disabled:cursor-wait"
        >
          {busy ? "..." : `Get Started -- ${price}/mo`}
        </button>
      </div>
      {setupFee && (
        <p className="text-xs text-slate-500 mt-2 text-center">+ {setupFee} one-time setup</p>
      )}
      {error && (
        <p className="text-xs text-red-400 mt-2 text-center">{error}</p>
      )}
      <p className="text-[10px] text-slate-600 mt-2 text-center">
        Secure checkout via Stripe &middot; Cancel anytime &middot; No contracts
      </p>
    </div>
  );
}
