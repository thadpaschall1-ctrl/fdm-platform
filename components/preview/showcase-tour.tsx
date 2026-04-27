"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Showcase Tour — interactive walkthrough overlay for /examples/[slug] showcase
 * pages. Adapted from the chiro `GuidedTour` in leadgen-platform but rewritten
 * for FDM's narrative: instead of pitching ONE chiropractic practice, this tour
 * pitches FAST DIGITAL MARKETING as the platform that built every showcase site.
 *
 * What it spotlights:
 *   - The cinematic AI-generated hero video
 *   - The AggregateRating + LocalBusiness JSON-LD schema (proof, not claim)
 *   - Service schema citations
 *   - FAQPage schema (Google AI Overviews bait)
 *   - The fact that this whole site = one FDM subscription
 *
 * Each stop targets an element via [data-tour="<id>"] attribute. Layouts
 * (premium-outdoor.tsx, visual-pinterest.tsx, base.tsx) attach those attributes
 * to the relevant sections.
 *
 * The tour also has a "View Live JSON-LD" button that opens a panel showing the
 * actual @graph rendered for the current page — most agencies CLAIM schema;
 * FDM SHOWS it. Strong conversion lever.
 */

export interface TourStop {
  /** [data-tour="X"] selector value to spotlight */
  target: string;
  /** Bold headline shown in the card */
  title: string;
  /** What this feature IS, plain language */
  description: string;
  /** WHY a small business owner should care — the FDM sales angle */
  insight: string;
  /** Tag category (drives badge color) */
  category: "ai-search" | "design" | "automation" | "trust" | "conversion";
}

const CATEGORY_LABELS: Record<TourStop["category"], string> = {
  "ai-search": "AI Search",
  design: "Premium Design",
  automation: "Automation",
  trust: "Trust Signal",
  conversion: "Conversion",
};

const CATEGORY_ICONS: Record<TourStop["category"], string> = {
  "ai-search":
    "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  design:
    "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  automation:
    "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  trust:
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  conversion: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
};

const TOUR_STOPS: TourStop[] = [
  {
    target: "hero",
    title: "Cinematic AI-Generated Hero",
    description:
      "This isn't a stock photo or a static image — it's a 5-second AI-generated cinematic loop, built from a still that was also AI-generated.",
    insight:
      "Static beautiful sites read as templates. Subtle cinematic motion is what makes a site feel custom-built. Premium real estate, hotel, and luxury brand sites all use this. Smart Websites at Fast Digital Marketing start at $197/mo and include this kind of motion.",
    category: "design",
  },
  {
    target: "trust-stats",
    title: "Trust Signals as Schema",
    description:
      "Years in business, certifications, and ratings aren't just decorative. Each one is also marked up as JSON-LD AggregateRating + LocalBusiness data.",
    insight:
      "When prospects ask Google AI or ChatGPT 'best [niche] in [city]', the engines look for entities with schema.org structure. Without it, you're invisible to AI search — and AI search is now 27% of mobile queries.",
    category: "ai-search",
  },
  {
    target: "services",
    title: "Each Service is a Citable Entity",
    description:
      "Every service tile is wrapped in Service schema with provider, area-served, and description. Google and ChatGPT can extract these individually.",
    insight:
      "When someone asks ChatGPT 'who does [specific service] in [city]', the engine doesn't search your homepage — it scans for Service schema. This is how you get cited as the answer instead of buried as a search result.",
    category: "ai-search",
  },
  {
    target: "why-us",
    title: "Differentiator Block",
    description:
      "Specific, tangible reasons to choose this business — written for both human visitors and AI engines.",
    insight:
      "Google AI Overviews and Perplexity love comparison content. This block answers 'why pick X over Y' queries directly, which is exactly the question prospects ask AI right before they buy.",
    category: "conversion",
  },
  {
    target: "faqs",
    title: "FAQPage Schema = AI Overview Citations",
    description:
      "Every FAQ on this page is structured as schema.org Question + Answer. ChatGPT, Perplexity, and Google AI Overviews quote these directly.",
    insight:
      "FAQPage schema is the single highest-ROI AI Search investment. Voice search ('Hey Siri, how much does a custom pool cost?') pulls answers from FAQ schema. Most local businesses have zero. This site has 4-6 per page.",
    category: "ai-search",
  },
  {
    target: "map",
    title: "Live Google Map + Local SEO",
    description:
      "A real Google Maps embed showing the exact business location, plus structured PostalAddress data so search engines know where to put you on the map.",
    insight:
      "Local pack rankings (the map results above the regular listings) are pulled from this exact data — address, phone, service area. Your real customer site uses your actual address — this preview just shows what it'll look like.",
    category: "ai-search",
  },
  {
    target: "schema-badge",
    title: "Live JSON-LD — Click to Inspect",
    description:
      "Most agencies claim 'we do schema.' This button shows you the actual JSON-LD graph rendered on this exact page right now.",
    insight:
      "Every Fast Digital Marketing site ships with full schema graphs (LocalBusiness + Service + FAQPage + BreadcrumbList + AggregateRating + WebPage) baked into the static HTML. Most competitors charge $1,500/mo for less; FDM Smart Websites start at $197/mo.",
    category: "trust",
  },
  {
    target: "final-cta",
    title: "Voice + Reviews + Nurture, Built-In",
    description:
      "Click-to-call here doesn't just dial a number — it routes through Holland (the AI receptionist), Review Autopilot kicks in after every job, and Lead Nurture follows up automatically.",
    insight:
      "Fast Digital Marketing tiers: Basic Website $47/mo · Smart Website $197/mo · Smart Site + Voice $297/mo · Full Automation Stack $397/mo (everything you see on this page). Live in 5 days. Month-to-month, no setup fee, no contracts.",
    category: "automation",
  },
];

interface ShowcaseTourProps {
  /** The full JSON-LD @graph for this page — passed in so the inspect panel
   *  can show it without re-fetching */
  schema: object;
}

export function ShowcaseTour({ schema }: ShowcaseTourProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [cardPosition, setCardPosition] = useState<"bottom" | "top">("bottom");
  const [showSchemaPanel, setShowSchemaPanel] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const stop = TOUR_STOPS[currentStop];

  const measureTarget = useCallback(() => {
    if (!isActive) return;
    const el = document.querySelector(`[data-tour="${TOUR_STOPS[currentStop].target}"]`);
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
      const timer = setTimeout(measureTarget, 600);
      return () => clearTimeout(timer);
    } else {
      // No matching element — skip to next stop after a beat
      const timer = setTimeout(() => {
        if (currentStop < TOUR_STOPS.length - 1) {
          setCurrentStop((p) => p + 1);
        } else {
          handleEnd();
        }
      }, 200);
      return () => clearTimeout(timer);
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

  // Special-case: when the user reaches the schema-badge step, also offer
  // direct access to the JSON-LD inspector panel from the card.
  const isSchemaStop = stop?.target === "schema-badge";

  return (
    <>
      {/* ═══════ LAUNCH BUTTON ═══════ */}
      {!isActive && (
        <button
          onClick={handleStart}
          className="fixed bottom-4 left-4 z-[90] group flex items-center gap-2.5 px-5 py-3 rounded-full text-white hover:scale-105 transition-all duration-300"
          style={{
            background: "rgba(15, 23, 42, 0.92)",
            border: "1.5px solid rgba(96, 165, 250, 0.4)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.4), 0 0 24px rgba(59, 130, 246, 0.25)",
            backdropFilter: "blur(12px)",
            animation: "showcaseSlideIn 0.5s ease-out 0.5s both",
          }}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-sm font-bold tracking-wide leading-tight">Tour this site</div>
            <div className="text-[10px] text-blue-300 font-medium leading-tight">
              {TOUR_STOPS.length} features explained
            </div>
          </div>
          <svg className="w-4 h-4 text-blue-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* ═══════ OVERLAY (active tour) ═══════ */}
      {isActive && targetRect && (
        <>
          {/* Dimmed page with spotlight cutout */}
          <div
            className="fixed inset-0 z-[80] pointer-events-none transition-all duration-500"
            style={{
              background: "rgba(15, 23, 42, 0.65)",
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

          {/* Pulsing corners */}
          {[
            { left: targetRect.left - 16, top: targetRect.top - 16 },
            { left: targetRect.right + 8, top: targetRect.top - 16 },
            { left: targetRect.left - 16, top: targetRect.bottom + 8 },
            { left: targetRect.right + 8, top: targetRect.bottom + 8 },
          ].map((pos, i) => (
            <div
              key={i}
              className="fixed z-[82] w-2 h-2 rounded-full bg-blue-400 pointer-events-none"
              style={{ ...pos, animation: `showcasePulse 2s ease-in-out infinite ${i * 0.3}s` }}
            />
          ))}

          {/* ═══════ INFO CARD ═══════ */}
          <div
            ref={cardRef}
            className="fixed z-[85] w-[440px] max-w-[calc(100vw-32px)] pointer-events-auto"
            style={{
              left: Math.min(
                Math.max(16, targetRect.left + targetRect.width / 2 - 220),
                window.innerWidth - 456
              ),
              ...(cardPosition === "bottom"
                ? { top: Math.min(targetRect.bottom + 28, window.innerHeight - 360) }
                : { bottom: window.innerHeight - targetRect.top + 28 }),
              animation: "showcaseCardIn 0.4s ease-out",
            }}
          >
            <div className="rounded-2xl border border-blue-500/30 bg-slate-950/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Progress bar */}
              <div className="h-1 bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 ease-out"
                  style={{ width: `${((currentStop + 1) / TOUR_STOPS.length) * 100}%` }}
                />
              </div>

              <div className="p-5">
                {/* Category badge + step counter */}
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

                <h3 className="text-lg font-bold text-white mb-1.5">{stop.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">{stop.description}</p>

                {/* Insight box */}
                <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-3.5 mb-4">
                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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

                {/* Schema-stop bonus action */}
                {isSchemaStop && (
                  <button
                    onClick={() => setShowSchemaPanel(true)}
                    className="w-full mb-4 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white text-xs font-bold transition-all"
                  >
                    👁  View Live JSON-LD Schema
                  </button>
                )}

                {/* Nav */}
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
                      {currentStop === TOUR_STOPS.length - 1 ? "Finish Tour ✓" : "Next →"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pointer arrow */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-slate-950/95 border border-blue-500/30 ${
                cardPosition === "bottom"
                  ? "-top-2 border-b-0 border-r-0"
                  : "-bottom-2 border-t-0 border-l-0"
              }`}
            />
          </div>

          {/* ═══════ TOP BAR (during tour) ═══════ */}
          <div
            className="fixed top-4 left-0 right-0 z-[85] pointer-events-auto"
            style={{ animation: "showcaseSlideIn 0.3s ease-out" }}
          >
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex items-center justify-between bg-slate-950/95 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-xl border border-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-semibold">
                    Fast Digital Marketing — Showcase Tour
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════ JSON-LD INSPECTOR PANEL ═══════ */}
      {showSchemaPanel && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowSchemaPanel(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[80vh] rounded-2xl border border-blue-500/30 bg-slate-950 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Live JSON-LD Schema</div>
                  <div className="text-[10px] text-slate-400">
                    Rendered into the static HTML of this page right now
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowSchemaPanel(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="p-5 overflow-auto max-h-[calc(80vh-60px)]">
              <pre className="text-[11px] leading-relaxed text-blue-100 font-mono whitespace-pre-wrap break-words">
                {JSON.stringify(schema, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ═══════ ANIMATIONS ═══════ */}
      <style jsx global>{`
        @keyframes showcaseSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes showcaseCardIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes showcasePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.5); }
        }
      `}</style>
    </>
  );
}
