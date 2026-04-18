"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small (i) icon that opens a plain-English explainer when tapped/clicked.
 *
 * Designed for blue-collar readers — the explainer copy itself is written at
 * a 9th-grade reading level. This component just handles the interaction:
 *   - Desktop: hover OR click to open
 *   - Mobile: tap to open, tap outside to close
 *   - Keyboard: tab to focus, Enter/Space to toggle, Esc to close
 *   - Auto-flips above/below the icon based on available screen space
 */
export function InfoTooltip({ content, label }: { content: string; label?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<"below" | "above">("below");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close when tapping/clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Decide whether to flip above or below the icon
  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setPosition(spaceBelow < 200 ? "above" : "below");
  }, [isOpen]);

  return (
    <span className="relative inline-flex">
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((v) => !v);
        }}
        aria-label={label ? `What is ${label}?` : "More info"}
        aria-expanded={isOpen}
        className="ml-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-600/70 bg-slate-800/60 text-[10px] font-bold text-slate-400 transition-colors hover:border-blue-400/80 hover:bg-blue-500/15 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      >
        <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontStyle: "italic", lineHeight: 1 }}>
          i
        </span>
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          role="tooltip"
          className={`absolute left-1/2 z-50 w-64 -translate-x-1/2 rounded-xl border border-white/[0.12] bg-slate-950/98 p-4 text-xs leading-relaxed text-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-sm ${
            position === "below" ? "top-6" : "bottom-6"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Little arrow */}
          <span
            aria-hidden="true"
            className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border border-white/[0.12] bg-slate-950 ${
              position === "below"
                ? "-top-1 border-b-0 border-r-0"
                : "-bottom-1 border-t-0 border-l-0"
            }`}
          />
          <p className="relative">{content}</p>
        </div>
      )}
    </span>
  );
}
