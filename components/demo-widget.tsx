"use client";

import { useState, useEffect, useRef } from "react";

interface DemoWidgetProps {
  popularNiches: string[];
}

const DEMO_AGENT_ID = "agent_0601kp3z63v1fk19pj9txffr31tg";

export function DemoWidget({ popularNiches }: DemoWidgetProps) {
  const [niche, setNiche] = useState("");
  const [customNiche, setCustomNiche] = useState("");
  const [started, setStarted] = useState(false);
  const scriptLoaded = useRef(false);

  const selectedNiche = niche || customNiche;

  // Phone call state
  const [showPhoneOption, setShowPhoneOption] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callState, setCallState] = useState<"idle" | "calling" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!started || scriptLoaded.current) return;
    scriptLoaded.current = true;

    const script = document.createElement("script");
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.head.appendChild(script);
  }, [started]);

  async function handlePhoneDemo() {
    if (!selectedNiche.trim() || !phoneNumber.trim()) return;
    setCallState("calling");
    setError(null);

    try {
      const res = await fetch("/api/demo/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: selectedNiche.trim(), phone: phoneNumber.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to initiate call");
      }
      setCallState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setCallState("idle");
    }
  }

  return (
    <div className="space-y-8">
      {/* Step 1: Pick niche */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">1</span>
          What type of business do you have?
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {popularNiches.map((n) => (
            <button
              key={n}
              onClick={() => { setNiche(n); setCustomNiche(""); }}
              className={`rounded-lg border px-3 py-2.5 text-sm transition ${
                niche === n ? "border-blue-500 bg-blue-600/20 text-blue-300" : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder='Or type your own: e.g. "Pet Grooming Salon"'
            value={customNiche}
            onChange={(e) => { setCustomNiche(e.target.value); setNiche(""); }}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
      </div>

      {/* Step 2: Start demo */}
      {selectedNiche && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">2</span>
            Talk to Holland
          </h2>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <p className="mb-4 text-sm text-slate-400">
              Demo configured for: <span className="font-semibold text-blue-400">{selectedNiche}</span>
            </p>

            {error && (
              <div className="mb-4 rounded-lg bg-red-900/30 border border-red-800/50 px-4 py-2 text-sm text-red-300">{error}</div>
            )}

            {!started ? (
              <button
                onClick={() => setStarted(true)}
                className="w-full rounded-xl bg-blue-600 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
              >
                🎙 Start Live Voice Demo
              </button>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-green-400 font-medium">
                  Holland is ready — click the mic below to start talking!
                </p>
                <div className="fdm-widget-container w-full flex justify-center">
                  {/* @ts-expect-error — elevenlabs-convai is a custom HTML element */}
                  <elevenlabs-convai agent-id={DEMO_AGENT_ID} />
                </div>
                <p className="text-xs text-slate-500">
                  Tell Holland you run a {selectedNiche.toLowerCase()} and she&apos;ll demo as your receptionist.
                </p>
                <style>{`
                  /* Pull widget out of fixed corner → inline in the demo box */
                  .fdm-widget-container elevenlabs-convai {
                    position: relative !important;
                    bottom: auto !important;
                    right: auto !important;
                    left: auto !important;
                    z-index: 1 !important;
                  }
                  /* Override the widget's internal fixed-position wrapper */
                  elevenlabs-convai::part(widget) {
                    position: relative !important;
                    bottom: auto !important;
                    right: auto !important;
                  }
                  /* Match FDM dark theme colors */
                  elevenlabs-convai {
                    --elevenlabs-convai-widget-color: #2563eb !important;
                    --elevenlabs-convai-widget-bg: #0f172a !important;
                    --elevenlabs-convai-widget-text: #e2e8f0 !important;
                  }
                  elevenlabs-convai::part(widget),
                  elevenlabs-convai::part(chat) {
                    background: #0f172a !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                    border-radius: 1rem !important;
                  }
                  elevenlabs-convai::part(header) {
                    background: #1e293b !important;
                    border-bottom: 1px solid rgba(255,255,255,0.06) !important;
                  }
                  elevenlabs-convai::part(toggle) {
                    background: #2563eb !important;
                    box-shadow: 0 0 20px rgba(37,99,235,0.4) !important;
                  }
                  /* Hide ElevenLabs branding */
                  elevenlabs-convai::part(powered-by),
                  elevenlabs-convai [class*="powered"],
                  elevenlabs-convai [class*="branding"],
                  elevenlabs-convai a[href*="elevenlabs"] {
                    display: none !important;
                    visibility: hidden !important;
                    height: 0 !important;
                    overflow: hidden !important;
                  }
                `}</style>
              </div>
            )}

            {/* Phone call option */}
            <div className="mt-4 border-t border-white/[0.06] pt-4">
              {!showPhoneOption ? (
                <button onClick={() => setShowPhoneOption(true)} className="text-sm text-slate-500 hover:text-blue-400 transition-colors">
                  Or get a real phone call instead →
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-slate-400">Enter your number — Holland will call you in about 10 seconds:</p>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50"
                    />
                    <button
                      onClick={handlePhoneDemo}
                      disabled={!phoneNumber.trim() || callState !== "idle"}
                      className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition ${
                        callState === "sent" ? "bg-green-600 text-white" : callState === "calling" ? "bg-blue-800 text-blue-300 cursor-wait" : "bg-blue-600 text-white hover:bg-blue-500"
                      }`}
                    >
                      {callState === "sent" ? "Call Incoming!" : callState === "calling" ? "Dialing..." : "Call Me"}
                    </button>
                  </div>
                  {callState === "sent" && (
                    <p className="text-sm text-green-400">Your phone should ring in a few seconds. Answer and talk to Holland!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {started && (
        <button
          onClick={() => { setStarted(false); setNiche(""); setCustomNiche(""); setCallState("idle"); setPhoneNumber(""); setShowPhoneOption(false); setError(null); scriptLoaded.current = false; }}
          className="text-sm text-slate-500 hover:text-white transition-colors"
        >
          ← Try a different niche
        </button>
      )}
    </div>
  );
}
