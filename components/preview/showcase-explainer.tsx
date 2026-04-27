"use client";

import { useEffect, useState } from "react";
import type { ShowcasePalette } from "@/lib/preview/get-niche-palette";

/**
 * Showcase Explainer — small dismissable "What is this?" pill in the
 * top-left of each /examples/[slug] showcase page.
 *
 * Adopts the niche's primary + accent colors so it visually matches the
 * surrounding site. A salon page gets plum/rose tints, a roofing page
 * gets red/amber, a pool page gets teal/gold, etc.
 *
 * Falls back to FDM blue when no palette is provided (e.g., if the
 * component is dropped on a non-niche page).
 */

const STORAGE_KEY = "fdm-showcase-explainer-hidden";

const FDM_FALLBACK: ShowcasePalette = {
  background: "#0f172a",
  foreground: "#f8fafc",
  surface: "#1e293b",
  muted: "#94a3b8",
  border: "#334155",
  primary: "#60a5fa",
  primaryFg: "#0f172a",
  accent: "#3b82f6",
};

interface ShowcaseExplainerProps {
  /** Niche palette — drives the pill's accent color, glow, and icon gradient */
  palette?: ShowcasePalette;
}

export function ShowcaseExplainer({ palette }: ShowcaseExplainerProps = {}) {
  const p = palette ?? FDM_FALLBACK;
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      const hidden = localStorage.getItem(STORAGE_KEY);
      setDismissed(Boolean(hidden));
    } catch {
      setDismissed(false);
    }
  }, []);

  function hideForever() {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore quota errors */
    }
  }

  if (dismissed) return null;

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="fixed top-3 left-3 z-[88] flex items-center gap-2 px-3 py-1.5 rounded-full text-white hover:scale-105 transition-all duration-200"
        style={{
          background: "rgba(15, 23, 42, 0.92)",
          border: `1px solid ${p.primary}66`,
          boxShadow: `0 2px 10px rgba(0,0,0,0.4), 0 0 16px ${p.primary}33`,
          backdropFilter: "blur(12px)",
        }}
        aria-label="About this preview site"
      >
        <svg
          className="w-3.5 h-3.5"
          style={{ color: p.primary }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[11px] font-semibold tracking-wide">
          What is this?
        </span>
      </button>
    );
  }

  return (
    <div
      className="fixed top-3 left-3 z-[88] w-[320px] max-w-[calc(100vw-24px)] rounded-2xl backdrop-blur-xl shadow-2xl"
      style={{
        background: "rgba(15, 23, 42, 0.95)",
        border: `1px solid ${p.primary}66`,
        animation: "showcaseExplainerIn 0.25s ease-out",
      }}
    >
      <div
        className="flex items-start justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${p.border}80` }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: `${p.primary}33` }}
          >
            <svg
              className="w-4 h-4"
              style={{ color: p.primary }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-sm font-bold text-white">About this preview</div>
        </div>
        <button
          onClick={() => setExpanded(false)}
          aria-label="Collapse"
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors -mt-1 -mr-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <p className="text-[13px] text-slate-300 leading-relaxed mb-3">
          This is a <strong className="text-white">live reference site</strong>{" "}
          built by <strong style={{ color: p.primary }}>Fast Digital Marketing</strong>
          {" "}— a fully-functional preview of what we&apos;d build for your
          business in this industry.
        </p>

        <p className="text-[12px] text-slate-400 leading-relaxed mb-4">
          The business shown is fictional. The technology is real:
          AI-generated design, embedded AI voice receptionist, full schema
          markup for AI search, and cinematic hero video.
        </p>

        <div className="flex flex-col gap-2">
          <a
            href="/pricing"
            className="block w-full rounded-lg text-white text-center font-bold py-2.5 text-[13px] transition-colors hover:opacity-90"
            style={{ background: p.primary, color: p.primaryFg }}
          >
            See Pricing →
          </a>
          <a
            href="/audit"
            className="block w-full rounded-lg border border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-300 text-center font-medium py-2 text-xs transition-colors"
          >
            Free site audit first
          </a>
          <button
            onClick={hideForever}
            className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors py-1"
          >
            Don&apos;t show again
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes showcaseExplainerIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
