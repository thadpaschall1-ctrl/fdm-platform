"use client";

import { useEffect, useState } from "react";

/**
 * Anti-copy protection for preview pages.
 * Mirror of leadgen-platform/components/anti-copy.tsx.
 *
 * Layers: disabled text selection, right-click + dev-tool shortcut blocks,
 * drag prevention, watermarked clipboard override, toast on block, blur on
 * focus-loss, hide-on-print, protected-content attribution.
 *
 * Not bulletproof — curl/view-source can still get raw HTML. Deters 95%+ of
 * casual copying and signals legally that the content is protected.
 */
export default function AntiCopy({
  watermark,
  termsUrl = "/terms",
}: {
  watermark?: string;
  termsUrl?: string;
}) {
  const [toast, setToast] = useState<string | null>(null);
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    let toastTimer: ReturnType<typeof setTimeout> | null = null;
    const showToast = (msg: string) => {
      setToast(msg);
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => setToast(null), 2500);
    };

    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      showToast("Content is protected — right-click is disabled.");
      return false;
    };

    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      if (e.key === "F12") {
        e.preventDefault();
        showToast("Dev tools are disabled on protected pages.");
        return false;
      }
      if (ctrl && (k === "u" || k === "s" || k === "p")) {
        e.preventDefault();
        showToast("Viewing source, saving, and printing are disabled.");
        return false;
      }
      if (ctrl && e.shiftKey && (k === "i" || k === "j" || k === "c")) {
        e.preventDefault();
        showToast("Dev tools are disabled on protected pages.");
        return false;
      }
      if (ctrl && k === "a") {
        e.preventDefault();
        showToast("Select-all is disabled.");
        return false;
      }
    };

    const onDrag = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData(
          "text/plain",
          `— Content copied from a protected preview${watermark ? ` · ref ${watermark}` : ""} · All rights reserved.`
        );
      }
      showToast("This content is protected. Copying is disabled.");
      return false;
    };

    const onBlur = () => setBlurred(true);
    const onFocus = () => setBlurred(false);

    document.addEventListener("contextmenu", onContext);
    document.addEventListener("keydown", onKey);
    document.addEventListener("dragstart", onDrag);
    document.addEventListener("copy", onCopy);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      if (toastTimer) clearTimeout(toastTimer);
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("dragstart", onDrag);
      document.removeEventListener("copy", onCopy);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, [watermark]);

  return (
    <>
      <style jsx global>{`
        html, body {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }
        img, svg, video {
          -webkit-user-drag: none;
          user-drag: none;
        }
        input, textarea, select, [contenteditable] {
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }
        @media print {
          body > * { display: none !important; }
          body::after {
            content: "This preview is protected and cannot be printed. Contact us to build your real site.";
            display: block !important;
            padding: 3rem;
            font-family: system-ui, sans-serif;
            font-size: 18px;
            text-align: center;
          }
        }
        body.ac-blurred > * {
          filter: blur(16px);
          transition: filter 0.15s ease;
        }
        body.ac-blurred .ac-blur-overlay {
          filter: none !important;
        }
      `}</style>

      {blurred && <BlurClassToggle />}

      {toast && (
        <div
          role="status"
          className="ac-blur-overlay"
          style={{
            position: "fixed",
            top: "4rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            background: "rgba(15, 23, 42, 0.95)",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.75rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "system-ui, sans-serif",
            pointerEvents: "none",
          }}
        >
          🔒 {toast}
        </div>
      )}

      <div
        className="ac-blur-overlay"
        style={{
          position: "fixed",
          bottom: 8,
          right: 12,
          zIndex: 9999,
          fontSize: "10px",
          color: "rgba(148, 163, 184, 0.7)",
          fontFamily: "system-ui, sans-serif",
          pointerEvents: "auto",
        }}
      >
        <a href={termsUrl} style={{ color: "inherit", textDecoration: "none" }}>
          © Protected content
        </a>
      </div>

      {watermark && (
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, pointerEvents: "none" }}
        >
          {watermark}
        </div>
      )}
    </>
  );
}

function BlurClassToggle() {
  useEffect(() => {
    document.body.classList.add("ac-blurred");
    return () => document.body.classList.remove("ac-blurred");
  }, []);
  return null;
}
