"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

type CategoryResult = {
  grade: string;
  score: number;
  findings: string[];
  recommendation: string;
  serviceName: string;
  serviceLink: string;
};

type AuditData = {
  auditId: string;
  businessName: string;
  cityState: string;
  overallGrade: string;
  overallScore: number;
  categories: {
    googleReputation: CategoryResult;
    websiteQuality: CategoryResult;
    seoHealth: CategoryResult;
    aiSearchReadiness: CategoryResult;
    onlineVisibility: CategoryResult;
    leadCapture: CategoryResult;
  };
};

const CATEGORY_LABELS: Record<string, string> = {
  googleReputation: "Google Reputation",
  websiteQuality: "Website Quality",
  seoHealth: "SEO Health",
  aiSearchReadiness: "AI Search Readiness",
  onlineVisibility: "Online Visibility",
  leadCapture: "Lead Capture",
};

const GRADE_COLORS: Record<string, { text: string; bg: string; border: string; bar: string; ring: string }> = {
  A: { text: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30", bar: "bg-green-500", ring: "#22c55e" },
  B: { text: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30", bar: "bg-blue-500", ring: "#3b82f6" },
  C: { text: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", bar: "bg-yellow-500", ring: "#eab308" },
  D: { text: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30", bar: "bg-orange-500", ring: "#f97316" },
  F: { text: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/30", bar: "bg-red-500", ring: "#ef4444" },
};

function GradeRing({ grade, score }: { grade: string; score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = GRADE_COLORS[grade]?.ring ?? "#ef4444";

  return (
    <div className="relative inline-flex items-center justify-center w-40 h-40">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={radius} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-white">{grade}</span>
        <span className="text-sm text-slate-400">{score}/100</span>
      </div>
    </div>
  );
}

function CategoryCard({ label, result }: { label: string; result: CategoryResult }) {
  const g = GRADE_COLORS[result.grade] ?? GRADE_COLORS["F"];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-slate-900/80 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-white text-base">{label}</h3>
          <div className="mt-2.5 w-full bg-slate-800 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${g.bar} transition-all duration-700`}
              style={{ width: `${result.score}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">{result.score}/100</p>
        </div>
        <span className={`ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-lg font-black ${g.text} ${g.bg} ${g.border}`}>
          {result.grade}
        </span>
      </div>

      <ul className="space-y-1.5 mb-4">
        {result.findings.map((finding, i) => {
          const isNegative = /no |missing|unable|not found|weak|below|losing|fewer/i.test(finding);
          return (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="mt-0.5 shrink-0">
                {isNegative ? <span className="text-red-400">✗</span> : <span className="text-green-400">✓</span>}
              </span>
              {finding}
            </li>
          );
        })}
      </ul>

      <div className="rounded-xl bg-slate-800/50 border border-white/[0.06] p-3 mb-4">
        <p className="text-xs text-slate-400">{result.recommendation}</p>
      </div>

      <a
        href={result.serviceLink}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
      >
        Fix this with {result.serviceName} →
      </a>
    </div>
  );
}

// ── Upsell Plans (same tiers as GYCP) ────────────────────────────────────────

const PLANS = [
  {
    name: "Starter",
    setup: "$0",
    monthly: "$197",
    badge: null,
    borderClass: "border-white/[0.08]",
    buttonClass: "border border-white/20 bg-white/5 text-white hover:bg-white/10",
    features: [
      "AI Voice Receptionist (24/7)",
      "Voice AI Callback (60-sec)",
      "GBP Optimization",
      "Monthly Performance Report",
    ],
  },
  {
    name: "Growth",
    setup: "$297",
    monthly: "$397",
    badge: "MOST POPULAR",
    borderClass: "border-blue-500/40 ring-1 ring-blue-500/20",
    buttonClass: "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]",
    features: [
      "Everything in Starter",
      "Local SEO (5 target keywords)",
      "Review Autopilot",
      "Smart Website (5-day delivery)",
      "New Client Nurture Sequences",
    ],
  },
  {
    name: "Pro",
    setup: "$197",
    monthly: "$697",
    badge: "BEST VALUE",
    borderClass: "border-violet-500/40 ring-1 ring-violet-500/20",
    buttonClass: "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]",
    features: [
      "Everything in Growth",
      "Google Ads Management",
      "15 target keywords",
      "Social Media Content (3×/week)",
      "Client Reactivation Campaigns",
      "Monthly Strategy Call",
    ],
  },
];

function CheckoutButton({ plan, label, className, email, businessName, auditId }: {
  plan: string; label: string; className: string; email?: string; businessName?: string; auditId?: string;
}) {
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email: email || "", businessName: businessName || "", auditId: auditId || "" }),
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

  return (
    <button onClick={handleClick} disabled={busy} className={`${className} disabled:opacity-60 disabled:cursor-wait`}>
      {busy ? "Processing..." : label}
    </button>
  );
}

export function AuditResults() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<AuditData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAudit = useCallback(async () => {
    if (!id) { setError("No audit ID provided."); setLoading(false); return; }
    try {
      const res = await fetch(`/api/audit?id=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("Audit not found");
      setData(await res.json());
    } catch {
      setError("Could not load audit results. The link may have expired.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchAudit(); }, [fetchAudit]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mb-4" />
          <p className="text-slate-400">Loading your results…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4">⚠️</p>
          <h2 className="text-xl font-bold text-white mb-2">Results not found</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <a href="/audit" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500">
            Run a New Audit
          </a>
        </div>
      </div>
    );
  }

  const categoryEntries = Object.entries(data.categories) as [string, CategoryResult][];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10 reveal">
        <p className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          Audit Complete
        </p>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight">
          {data.businessName}
        </h1>
        <p className="text-slate-400 mt-1">{data.cityState}</p>
      </div>

      {/* Overall Score */}
      <div className="rounded-2xl border border-white/[0.08] bg-slate-900/80 p-8 mb-8 text-center">
        <p className="text-sm text-slate-400 uppercase tracking-wider mb-5">
          Overall Business Score
        </p>
        <div className="flex justify-center mb-4">
          <GradeRing grade={data.overallGrade} score={data.overallScore} />
        </div>
        <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
          {data.overallScore >= 75
            ? "Your business has a solid online presence. A few targeted improvements could put you in the top tier."
            : data.overallScore >= 50
            ? "Your business is visible but missing key conversion tools. Competitors are likely capturing your customers."
            : "Your business has significant gaps that are costing you customers every day. Let's fix that."}
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid gap-5 sm:grid-cols-2 mb-12">
        {categoryEntries.map(([key, result]) => (
          <CategoryCard key={key} label={CATEGORY_LABELS[key] ?? key} result={result} />
        ))}
      </div>

      {/* ═══════ FULL REPORT UPSELL ═══════ */}
      <section className="mb-12">
        <div className="border-gradient rounded-3xl bg-slate-900 p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
                Upgrade Available
              </p>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl tracking-tight">
                Want the <span className="text-gradient-fire">Full Picture?</span>
              </h2>
              <p className="mt-3 text-slate-400 leading-relaxed">
                This free audit covers the basics. The <strong className="text-white">Full Business Report</strong> goes
                deeper — competitor analysis, keyword gaps, backlink profile, page-by-page SEO teardown,
                AI search citation audit, and a custom action plan ranked by ROI.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Side-by-side competitor comparison (top 5 in your market)",
                  "Keyword gap analysis — what your competitors rank for that you don't",
                  "Backlink profile audit with link-building opportunities",
                  "Page-by-page SEO teardown with fix priorities",
                  "AI search citation audit (ChatGPT, Perplexity, Google AI)",
                  "Custom 90-day action plan ranked by impact",
                  "30-minute strategy call to walk through findings (auto-scheduled)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="shrink-0 mt-0.5 text-amber-500">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Full Business Report</p>
              <div className="mb-1">
                <span className="text-5xl font-black text-white">$197</span>
              </div>
              <p className="text-sm text-slate-400 mb-6">One-time &middot; Instant delivery</p>
              <CheckoutButton
                plan="full-report"
                label="Get Your Full Report →"
                className="block w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-4 text-base font-bold text-slate-900 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all hover:-translate-y-0.5"
                email={data?.categories ? undefined : undefined}
                businessName={data?.businessName}
                auditId={id || undefined}
              />
              <p className="mt-4 text-xs text-slate-500">
                Includes auto-scheduled strategy call
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MONTHLY PLANS ═══════ */}
      <section id="pricing" className="mb-12">
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-400 mb-4">
            Or Let Us Fix Everything
          </p>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">
            Choose Your <span className="text-gradient-blue">Plan</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto">
            Every plan includes setup, launch, and ongoing optimization. No contracts — cancel anytime.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`card-hover relative rounded-2xl border bg-slate-900/80 p-8 flex flex-col ${plan.borderClass}`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-blue-600 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <p className="font-display text-lg font-bold text-white">{plan.name}</p>

              <div className="mt-4">
                {plan.setup !== "$0" && (
                  <p className="text-sm text-slate-400">
                    {plan.setup} <span className="text-slate-500">one-time setup</span>
                  </p>
                )}
                <p className="text-3xl font-black text-white mt-1">
                  {plan.monthly}<span className="text-base font-normal text-slate-400">/mo</span>
                </p>
              </div>

              <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="shrink-0 font-bold text-blue-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <CheckoutButton
                plan={plan.name.toLowerCase().split(" ")[0]}
                label="Get Started →"
                className={`mt-8 w-full block rounded-xl px-4 py-3.5 text-center text-sm font-bold transition-all ${plan.buttonClass}`}
                businessName={data?.businessName}
                auditId={id || undefined}
              />
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-500 mt-5">
          Secure checkout via Stripe &middot; Cancel anytime &middot; No long-term contracts
        </p>
      </section>

      {/* Talk to someone */}
      <div className="rounded-2xl border border-white/[0.08] bg-slate-900/80 p-8 text-center">
        <h2 className="font-display text-xl font-bold text-white">Prefer to Talk First?</h2>
        <p className="mt-2 text-slate-400 text-sm max-w-md mx-auto">
          Call us at (888) 983-4449 — Alexandra answers 24/7. Or try a live voice demo to hear the AI in action.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <a
            href="tel:+18889834449"
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
          >
            📞 Call (888) 983-4449
          </a>
          <a
            href="/demo"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500 transition-colors"
          >
            🎙 Try Live AI Demo
          </a>
        </div>
      </div>
    </div>
  );
}
