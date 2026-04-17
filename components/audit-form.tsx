"use client";

import { useState } from "react";

const NICHE_OPTIONS = [
  "Security / Alarm Company",
  "Chiropractic Practice",
  "Dental Practice",
  "Plumbing Company",
  "HVAC Company",
  "Electrical Contractor",
  "Roofing Company",
  "Law Firm",
  "Medical Spa / Aesthetics",
  "Real Estate Agency",
  "Auto Repair Shop",
  "Veterinary Clinic",
  "Insurance Agency",
  "Fitness Studio / Gym",
  "Accounting Firm",
  "Home Cleaning Service",
  "Landscaping Company",
  "Other",
];

const STEPS = [
  "Checking Google reputation...",
  "Analyzing your website...",
  "Running SEO audit...",
  "Checking AI search readiness...",
  "Scanning online visibility...",
  "Testing lead capture...",
  "Calculating your score...",
  "Generating recommendations...",
];

export function AuditForm() {
  const [form, setForm] = useState({
    businessName: "",
    niche: "",
    scope: "",
    cityState: "",
    websiteUrl: "",
    email: "",
    phone: "",
    website_confirm: "", // honeypot — hidden from real users
  });
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step = Math.min(step + 1, STEPS.length - 1);
      setStepIndex(step);
    }, 4000);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45000);

      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      clearInterval(interval);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Audit failed. Please try again.");
      }

      const { auditId } = await res.json();
      window.location.href = `/audit/results?id=${auditId}`;
    } catch (err: unknown) {
      clearInterval(interval);
      setLoading(false);
      if (err instanceof Error && err.name === "AbortError") {
        setError("The audit timed out. Please try again.");
      } else {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      }
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-slate-900 p-10 text-center">
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-lg font-semibold text-white mb-2">
          Auditing Your Business...
        </p>
        <p className="text-blue-400 text-sm animate-pulse">
          {STEPS[stepIndex]}
        </p>
        <div className="mt-6 mx-auto max-w-xs bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-1000"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/[0.08] bg-slate-900 p-8 space-y-5"
    >
      {error && (
        <div className="rounded-lg bg-red-900/30 border border-red-800/50 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Honeypot — hidden from real users; bots fill it; submission rejected server-side */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, pointerEvents: "none", height: 0, width: 0, overflow: "hidden" }}
      >
        <label>
          Website confirmation (leave blank):
          <input
            type="text"
            name="website_confirm"
            value={form.website_confirm}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Business Name *
        </label>
        <input
          type="text"
          name="businessName"
          value={form.businessName}
          onChange={handleChange}
          required
          placeholder="e.g. Tampa Bay Plumbing"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Industry *
        </label>
        <select
          name="niche"
          value={form.niche}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        >
          <option value="">Select your industry</option>
          {NICHE_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Business Type *
        </label>
        <select
          name="scope"
          value={form.scope}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        >
          <option value="">How does your business operate?</option>
          <option value="local">Local Business (single location)</option>
          <option value="local-multi">Local Business (multiple locations)</option>
          <option value="regional">Regional Business (state or multi-state)</option>
          <option value="national">National Business (serves all of US)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          {form.scope === "national" ? "Headquarters City, State" : "City, State"} *
        </label>
        <input
          type="text"
          name="cityState"
          value={form.cityState}
          onChange={handleChange}
          required
          placeholder="e.g. Tampa, FL"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Website URL
        </label>
        <input
          type="text"
          name="websiteUrl"
          value={form.websiteUrl}
          onChange={handleChange}
          placeholder="e.g. tampabaypluming.com"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@business.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-4 text-base font-bold text-white transition hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30"
      >
        Run My Free Audit →
      </button>

      <p className="text-center text-xs text-slate-600">
        No credit card. No sales call. Just instant results.
      </p>
    </form>
  );
}
