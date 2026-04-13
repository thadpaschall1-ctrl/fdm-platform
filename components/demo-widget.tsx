"use client";

import { useState, useCallback } from "react";

interface DemoWidgetProps {
  popularNiches: string[];
}

type DemoState = "select" | "ready" | "connecting" | "active" | "ended";

export function DemoWidget({ popularNiches }: DemoWidgetProps) {
  const [niche, setNiche] = useState("");
  const [customNiche, setCustomNiche] = useState("");
  const [state, setState] = useState<DemoState>("select");
  const [error, setError] = useState<string | null>(null);
  const [showPhoneOption, setShowPhoneOption] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callState, setCallState] = useState<"idle" | "calling" | "sent">("idle");

  const selectedNiche = niche || customNiche;

  const handleStartBrowserDemo = useCallback(async () => {
    if (!selectedNiche.trim()) return;
    setState("connecting");
    setError(null);

    try {
      const res = await fetch("/api/demo/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: selectedNiche.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to start demo");
      }

      const data = await res.json();
      if (data.widget_url || data.signed_url) {
        window.open(data.widget_url || data.signed_url, "ai-demo", "width=400,height=600");
      }
      setState("active");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("ready");
    }
  }, [selectedNiche]);

  const handlePhoneDemo = useCallback(async () => {
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
  }, [selectedNiche, phoneNumber]);

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
              onClick={() => { setNiche(n); setCustomNiche(""); if (state === "select") setState("ready"); }}
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
            onChange={(e) => { setCustomNiche(e.target.value); setNiche(""); if (e.target.value.trim() && state === "select") setState("ready"); }}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
      </div>

      {/* Step 2: Start demo */}
      {(state !== "select" || selectedNiche) && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">2</span>
            Start your demo
          </h2>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            {selectedNiche && (
              <p className="mb-4 text-sm text-slate-400">
                Demo configured for: <span className="font-semibold text-blue-400">{selectedNiche}</span>
              </p>
            )}
            {error && (
              <div className="mb-4 rounded-lg bg-red-900/30 border border-red-800/50 px-4 py-2 text-sm text-red-300">{error}</div>
            )}

            <button
              onClick={handleStartBrowserDemo}
              disabled={!selectedNiche.trim() || state === "connecting"}
              className={`w-full rounded-xl py-4 text-base font-bold transition ${
                !selectedNiche.trim() ? "cursor-not-allowed bg-slate-800 text-slate-600"
                : state === "connecting" ? "bg-blue-800 text-blue-300 cursor-wait"
                : state === "active" ? "bg-green-600 text-white"
                : "bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
              }`}
            >
              {state === "connecting" ? "Connecting to Holland..." : state === "active" ? "Demo Running — Check Your Browser" : "Start Live Voice Demo"}
            </button>

            {state === "active" && (
              <p className="mt-3 text-center text-sm text-slate-500">A new window opened with the AI conversation. Talk to Holland!</p>
            )}

            {/* Phone option */}
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

      {(state === "active" || state === "ended") && (
        <button
          onClick={() => { setState("select"); setNiche(""); setCustomNiche(""); setCallState("idle"); setPhoneNumber(""); setShowPhoneOption(false); setError(null); }}
          className="text-sm text-slate-500 hover:text-white transition-colors"
        >
          ← Try a different niche
        </button>
      )}
    </div>
  );
}
