"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Demo Tour — guided walkthrough for /demo, focused on the AI Voice
 * Receptionist experience. Different content from the showcase tour:
 * shorter (5 stops), no JSON-LD inspector, voice-AI-centric.
 *
 * Layout-wise it mirrors the showcase tour: bottom-right launch pill,
 * dimmed page with spotlight cutout, info card with progress bar.
 *
 * Targets sections in /demo via [data-tour="..."] attributes.
 */

interface TourStop {
  target: string;
  title: string;
  description: string;
  insight: string;
  category: "voice" | "ai-search" | "automation" | "design" | "conversion";
}

const CATEGORY_LABELS: Record<TourStop["category"], string> = {
  voice: "Voice AI",
  "ai-search": "AI Search",
  automation: "Automation",
  design: "Design",
  conversion: "Conversion",
};

const CATEGORY_ICONS: Record<TourStop["category"], string> = {
  voice:
    "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
  "ai-search":
    "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  automation:
    "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  design:
    "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  conversion: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
};

const TOUR_STOPS: TourStop[] = [
  {
    target: "demo-hero",
    title: "Live AI Voice Demo",
    description:
      "This page lets you have a real conversation with Holland — the same AI voice receptionist that answers calls 24/7 for Fast Digital Marketing customers in production.",
    insight:
      "Most demos are pre-recorded videos. This one is a live ElevenLabs Conversational AI session in your browser. What you're about to hear is exactly what your customers would hear if you bought it today.",
    category: "voice",
  },
  {
    target: "demo-niches",
    title: "75+ Industry Playbooks",
    description:
      "Pick your industry below — Holland adapts her vocabulary, qualifying questions, and booking flow to match your business type.",
    insight:
      "Generic AI receptionists ask awkward questions. Holland is trained per niche: a chiropractic intake is different from a roofing emergency call is different from a med spa appointment booking. Same AI, niche-specific behavior.",
    category: "ai-search",
  },
  {
    target: "demo-features",
    title: "What Makes Holland Different",
    description:
      "Niche-trained vocabulary, natural British accent, 24/7 availability, calendar integration, and SMS confirmations — all built in.",
    insight:
      "Traditional answering services charge per-minute, miss after-hours calls, and require human handoff. Holland answers in under two rings, books directly to your calendar, and never sleeps.",
    category: "automation",
  },
  {
    target: "demo-cta",
    title: "Ready When You Are",
    description:
      "Holland is included in Smart Site + Voice ($297/mo) and the Full Automation Stack ($397/mo). Live in 5 business days. Cancel anytime.",
    insight:
      "Fast Digital Marketing tiers: Basic $47/mo · Smart Website $197/mo · Smart Site + Voice $297/mo · Full Automation Stack $397/mo. No setup fees, no human account managers, no long-term contracts. Sign up online and your AI receptionist is live within a week.",
    category: "conversion",
  },
];

export function DemoTour() {
  const [isActive, setIsActive] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [cardPosition, setCardPosition] = useState<"bottom" | "top">("bottom");
  const cardRef = useRef<HTMLDivElement>(null);

  const stop = TOUR_STOPS[currentStop];

  const measureTarget = useCallback(() => {
    if (!isActive) return;
    const el = document.querySelector(
      `[data-tour="${TOUR_STOPS[currentStop].target}"]`
    );
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);
      setCardPosition(rect.top > window.innerHeight * 0.5 ? "top" : "bottom");
    }
  }, [isActive, currentStop]);

  useEffect(() => {
    if (!isActive) return;
    const el = document.querySelector(
      `[data-tour="${TOUR_STOPS[currentStop].target}"]`
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const t = setTimeout(measureTarget, 600);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        if (currentStop < TOUR_STOPS.length - 1) {
          setCurrentStop((p) => p + 1);
        } else {
          handleEnd();
        }
      }, 200);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, currentStop, measureTarget]);

  useEffect(() => {
    if (!isActive) return;
    window.addEventListener("scroll", measureTarget, { passive: true });
    window.addEventListener("resize", measureTarget);
    return () => {
      window.removeEventListener("scroll", measureTarget);
      window.removeEventListener("resize", measureTarget);
    };
  }, [isActive, measureTarget]);

  function handleStart() {
    setIsActive(true);
    setCurrentStop(0);
  }

  function handleNext() {
    if (currentStop < TOUR_STOPS.length - 1) {
      setCurrentStop((p) => p + 1);
    } else {
      handleEnd();
    }
  }

  function handlePrev() {
    if (currentStop > 0) setCurrentStop((p) => p - 1);
  }

  function handleEnd() {
    setIsActive(false);
    setCurrentStop(0);
    setTargetRect(null);
  }

  return (
    <>
      {!isActive && (
        <button
          onClick={handleStart}
          className="fixed bottom-4 right-4 z-[90] group flex items-center gap-2.5 px-5 py-3 rounded-full text-white hover:scale-105 transition-all duration-300"
          style={{
            background: "rgba(15, 23, 42, 0.92)",
            border: "1.5px solid rgba(96, 165, 250, 0.4)",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.4), 0 0 24px rgba(59, 130, 246, 0.25)",
            backdropFilter: "blur(12px)",
            animation: "demoTourSlideIn 0.5s ease-out 0.5s both",
          }}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-sm font-bold tracking-wide leading-tight">
              Take the Tour
            </div>
            <div className="text-[10px] text-blue-300 font-medium leading-tight">
              4 features explained
            </div>
          </div>
          <svg
            className="w-4 h-4 text-blue-300 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {isActive && targetRect && (
        <>
          {/* Dim with spotlight */}
          <div
            className="fixed inset-0 z-[80] pointer-events-none transition-all duration-500"
            style={{
              background: "rgba(15, 23, 42, 0.7)",
              clipPath: `polygon(
                0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%,
                ${targetRect.left - 12}px ${targetRect.top - 12}px,
                ${targetRect.left - 12}px ${targetRect.bottom + 12}px,
                ${targetRect.right + 12}px ${targetRect.bottom + 12}px,
                ${targetRect.right + 12}px ${targetRect.top - 12}px,
                ${targetRect.left - 12}px ${targetRect.top - 12}px
              )`,
            }}
          />

          {/* Spotlight ring */}
          <div
            className="fixed z-[81] pointer-events-none rounded-2xl border-2 border-blue-400 transition-all duration-500"
            style={{
              left: targetRect.left - 12,
              top: targetRect.top - 12,
              width: targetRect.width + 24,
              height: targetRect.height + 24,
              boxShadow:
                "0 0 0 4px rgba(96, 165, 250, 0.18), 0 0 30px rgba(59, 130, 246, 0.35)",
            }}
          />

          {/* Info card */}
          <div
            ref={cardRef}
            className="fixed z-[85] w-[440px] max-w-[calc(100vw-32px)] pointer-events-auto"
            style={{
              left: Math.min(
                Math.max(16, targetRect.left + targetRect.width / 2 - 220),
                window.innerWidth - 456
              ),
              ...(cardPosition === "bottom"
                ? {
                    top: Math.min(targetRect.bottom + 28, window.innerHeight - 320),
                  }
                : { bottom: window.innerHeight - targetRect.top + 28 }),
              animation: "demoTourCardIn 0.4s ease-out",
            }}
          >
            <div className="rounded-2xl border border-blue-500/30 bg-slate-950/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="h-1 bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentStop + 1) / TOUR_STOPS.length) * 100}%`,
                  }}
                />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15">
                    <svg
                      className="w-3.5 h-3.5 text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d={CATEGORY_ICONS[stop.category]}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                      {CATEGORY_LABELS[stop.category]}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {currentStop + 1} / {TOUR_STOPS.length}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5">
                  {stop.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  {stop.description}
                </p>

                <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-3.5 mb-4">
                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-blue-300"
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
                    <p className="text-xs leading-relaxed text-blue-100 font-medium">
                      {stop.insight}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleEnd}
                    className="text-xs text-slate-400 hover:text-white font-medium transition-colors"
                  >
                    Skip Tour
                  </button>
                  <div className="flex items-center gap-2">
                    {currentStop > 0 && (
                      <button
                        onClick={handlePrev}
                        className="px-4 py-2 rounded-full border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:border-blue-500/40 transition-colors"
                      >
                        &larr; Back
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      className="px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold transition-all shadow-sm hover:shadow-[0_8px_20px_rgba(59,130,246,0.5)]"
                    >
                      {currentStop === TOUR_STOPS.length - 1
                        ? "Finish ✓"
                        : "Next →"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-slate-950/95 border border-blue-500/30 ${
                cardPosition === "bottom"
                  ? "-top-2 border-b-0 border-r-0"
                  : "-bottom-2 border-t-0 border-l-0"
              }`}
            />
          </div>

          {/* Top bar with step dots */}
          <div
            className="fixed top-4 left-0 right-0 z-[85] pointer-events-auto"
            style={{ animation: "demoTourSlideIn 0.3s ease-out" }}
          >
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex items-center justify-between bg-slate-950/95 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-xl border border-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-semibold">
                    AI Voice Demo Tour
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  {TOUR_STOPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentStop(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentStop
                          ? "bg-blue-400 w-6"
                          : i < currentStop
                            ? "bg-white/50 w-2"
                            : "bg-white/20 w-2"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleEnd}
                  className="text-white/50 hover:text-white transition-colors p-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes demoTourSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes demoTourCardIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
