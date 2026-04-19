"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

interface Finding {
  status: "pass" | "fail" | "warn" | "info";
  message: string;
  weight: number;
}

interface PillarResult {
  pillar: string;
  pillarLabel: string;
  grade: string;
  score: number;
  findings: Finding[];
  recommendations: string[];
  serviceName: string;
  serviceLink: string;
}

interface FullReport {
  businessName: string;
  niche: string;
  nicheLabel: string;
  cityState: string;
  websiteUrl: string;
  overallGrade: string;
  overallScore: number;
  pillars: PillarResult[];
  summary: string;
  topPriorities: string[];
  generatedAt: string;
}

const GRADE_RING_COLORS: Record<string, string> = {
  A: "#22c55e", B: "#3b82f6", C: "#eab308", D: "#f97316", F: "#ef4444",
};

const STATUS_ICONS: Record<string, { icon: string; color: string }> = {
  pass: { icon: "✓", color: "text-green-400" },
  fail: { icon: "✗", color: "text-red-400" },
  warn: { icon: "⚠", color: "text-amber-400" },
  info: { icon: "ℹ", color: "text-blue-400" },
};

function GradeRing({ grade, score, size = 160 }: { grade: string; score: number; size?: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = GRADE_RING_COLORS[grade] ?? "#ef4444";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
        <circle cx="60" cy="60" r={radius} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-white">{grade}</span>
        <span className="text-sm text-slate-400">{score}/100</span>
      </div>
    </div>
  );
}

function PillarCard({ pillar }: { pillar: PillarResult }) {
  const color = GRADE_RING_COLORS[pillar.grade] ?? "#ef4444";
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-slate-900/80 overflow-hidden">
      {/* Header with grade */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black border"
            style={{ color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
          >
            {pillar.grade}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-white text-lg">{pillar.pillarLabel}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-24 bg-slate-800 rounded-full h-1.5">
                <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${pillar.score}%`, backgroundColor: color }} />
              </div>
              <span className="text-xs text-slate-500">{pillar.score}/100</span>
            </div>
          </div>
        </div>
        <svg className={`w-5 h-5 text-slate-500 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Findings */}
      {expanded && (
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-2">
            {pillar.findings.map((f, i) => {
              const si = STATUS_ICONS[f.status] ?? STATUS_ICONS.info;
              return (
                <div key={i} className="flex items-start gap-2.5 text-sm">
                  <span className={`shrink-0 mt-0.5 font-bold ${si.color}`}>{si.icon}</span>
                  <span className="text-slate-300">{f.message}</span>
                </div>
              );
            })}
          </div>

          {pillar.recommendations.length > 0 && (
            <div className="rounded-xl bg-slate-800/50 border border-white/[0.06] p-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recommendations</p>
              <ul className="space-y-1.5">
                {pillar.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="shrink-0 mt-0.5 text-violet-400">→</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href={pillar.serviceLink}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Fix this with {pillar.serviceName} →
          </a>
        </div>
      )}
    </div>
  );
}

export function FullReportView() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [report, setReport] = useState<FullReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = useCallback(async () => {
    if (!id) { setError("No report ID provided."); setLoading(false); return; }
    try {
      const res = await fetch(`/api/audit/full?id=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("Report not found");
      const data = await res.json();
      setReport(data.report);
    } catch {
      setError("Could not load report. The link may have expired.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchReport(); }, [fetchReport]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-600 border-t-transparent mb-4" />
          <p className="text-slate-400">Loading your full report…</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4">⚠️</p>
          <h2 className="text-xl font-bold text-white mb-2">Report not found</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <a href="/audit" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500">
            Run a New Audit
          </a>
        </div>
      </div>
    );
  }

  const passCount = report.pillars.reduce((sum, p) => sum + p.findings.filter((f) => f.status === "pass").length, 0);
  const failCount = report.pillars.reduce((sum, p) => sum + p.findings.filter((f) => f.status === "fail").length, 0);
  const totalFindings = report.pillars.reduce((sum, p) => sum + p.findings.length, 0);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-400 mb-4">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
          Full Business Report
        </p>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl tracking-tight">
          {report.businessName}
        </h1>
        <p className="text-slate-400 mt-1">{report.cityState} &middot; {report.nicheLabel || report.niche}</p>
        <p className="text-xs text-slate-500 mt-2">
          Generated {new Date(report.generatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Overall Score */}
      <div className="rounded-2xl border border-white/[0.08] bg-slate-900/80 p-8 mb-8">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="flex flex-col items-center">
            <GradeRing grade={report.overallGrade} score={report.overallScore} />
            <p className="mt-3 text-sm text-slate-400">AI Search Readiness Score</p>
          </div>
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed">{report.summary}</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3">
                <p className="text-2xl font-bold text-green-400">{passCount}</p>
                <p className="text-xs text-slate-500">Passing</p>
              </div>
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3">
                <p className="text-2xl font-bold text-red-400">{failCount}</p>
                <p className="text-xs text-slate-500">Failing</p>
              </div>
              <div className="rounded-xl bg-slate-500/10 border border-slate-500/20 p-3">
                <p className="text-2xl font-bold text-slate-400">{totalFindings}</p>
                <p className="text-xs text-slate-500">Total Checks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Priorities */}
      {report.topPriorities.length > 0 && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 mb-8">
          <h2 className="font-bold text-white text-lg mb-3">Top Priorities</h2>
          <ol className="space-y-2">
            {report.topPriorities.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-400">
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Pillar Cards */}
      <div className="space-y-4 mb-12">
        <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-4">
          Detailed <span className="text-gradient-electric">Analysis</span>
        </h2>
        {report.pillars.map((pillar) => (
          <PillarCard key={pillar.pillar} pillar={pillar} />
        ))}
      </div>

      {/* CTA */}
      <div className="border-gradient rounded-3xl bg-slate-900 p-10 text-center">
        <h2 className="font-display text-2xl font-bold text-white tracking-tight">Ready to Fix These Issues?</h2>
        <p className="mt-3 text-slate-400 max-w-md mx-auto">
          We can implement every recommendation in this report. Pick a plan and we'll get started.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <a
            href="/#contact"
            className="rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white hover:bg-blue-500 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            Get Started →
          </a>
          <a
            href="tel:+18889721544"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
          >
            📞 Call (888) 972-1544
          </a>
        </div>
      </div>
    </div>
  );
}
