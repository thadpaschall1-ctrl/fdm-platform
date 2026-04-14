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
  const [showEmail, setShowEmail] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  async function handleCheckout() {
    if (!emailInput || !emailInput.includes("@")) {
      setShowEmail(true);
      return;
    }
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
        alert(data.error || "Checkout failed. Please try again.");
        setBusy(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  if (showEmail) {
    return (
      <div className="w-full max-w-md mx-auto space-y-3">
        <input
          type="email"
          placeholder="Enter your email to continue"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCheckout()}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          autoFocus
        />
        <button
          onClick={handleCheckout}
          disabled={busy}
          className={`w-full rounded-2xl bg-blue-600 px-10 py-5 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)] disabled:opacity-60 disabled:cursor-wait`}
        >
          {busy ? "Processing..." : `Continue to Checkout -- ${price}/mo${setupFee ? ` + ${setupFee} setup` : ""}`}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={busy}
      className={className || "group relative inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-5 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)] disabled:opacity-60 disabled:cursor-wait"}
    >
      {busy ? "Processing..." : `Get ${serviceTitle} -- ${price}/mo`}
    </button>
  );
}
