"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Conversation } from "@elevenlabs/client";

interface DemoWidgetProps {
  popularNiches: string[];
}

interface ChatMessage {
  role: "ai" | "user";
  text: string;
}

function SoundBars({ active, color = "#93c5fd" }: { active: boolean; color?: string }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-[3px] rounded-full transition-all duration-200"
          style={{
            backgroundColor: color,
            height: active ? undefined : "6px",
            animation: active ? `fdmSoundWave 0.7s ease-in-out infinite ${i * 0.08}s` : "none",
          }}
        />
      ))}
    </div>
  );
}

export function DemoWidget({ popularNiches }: DemoWidgetProps) {
  const [niche, setNiche] = useState("");
  const [customNiche, setCustomNiche] = useState("");
  const [started, setStarted] = useState(false);

  const selectedNiche = niche || customNiche;

  // Phone call state
  const [showPhoneOption, setShowPhoneOption] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callState, setCallState] = useState<"idle" | "calling" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  // Voice conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "connecting" | "active" | "ended">("idle");

  const conversationRef = useRef<Awaited<ReturnType<typeof Conversation.startSession>> | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  // Ref on the top of the call UI — used to scroll TO the call card when the
  // user hits Start. Previously we auto-scrolled to bottomRef (which is at the
  // END of the messages area) the moment `started` flipped true, causing the
  // viewport to jump PAST the Start button since the messages list was still
  // empty. Now we scroll to the TOP of the call UI instead.
  const callUiRef = useRef<HTMLDivElement>(null);
  // Ref on the Step 2 "Talk to Holland" section so we scroll down to it when
  // the user picks a niche. Without this, clicking a niche tile in Step 1 just
  // sits there — the Start button renders below the fold and the user thinks
  // nothing happened.
  const startStepRef = useRef<HTMLDivElement>(null);

  // Scroll down to Step 2 (the Start Voice Demo section) the moment the user
  // picks a niche. The user sees the Start button land at the top of their
  // viewport so the next action is obvious.
  useEffect(() => {
    const picked = (niche || customNiche).trim();
    if (picked && startStepRef.current && !started) {
      // Small delay lets React finish rendering Step 2 before we scroll.
      const t = setTimeout(() => {
        startStepRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => clearTimeout(t);
    }
  }, [niche, customNiche, started]);

  // Scroll to the call UI when the user hits Start. Runs once when `started`
  // transitions false → true. Uses block: "start" so the top of the call card
  // lands at the top of the viewport.
  useEffect(() => {
    if (started && callUiRef.current) {
      callUiRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [started]);

  // Auto-scroll messages — ONLY once there are actual messages to scroll to.
  // Without this guard, an early trigger (e.g. `isAgentSpeaking` flipping on
  // connection, before the first message lands) scrolls the page to an empty
  // conversation area and looks like the Start button "disappeared upward."
  useEffect(() => {
    if (messages.length === 0) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isAgentSpeaking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { conversationRef.current?.endSession().catch(() => {}); };
  }, []);

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    setVoiceStatus("connecting");
    setMessages([]);

    try {
      const pickedNiche = (niche || customNiche).trim();
      const tokenRes = await fetch("/api/demo/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: pickedNiche }),
      });
      const tokenData = await tokenRes.json();

      if (!tokenRes.ok || !tokenData.signed_url) {
        throw new Error(tokenData.error || "Failed to get voice session");
      }

      // Apply niche-aware overrides so Holland already knows the caller's
      // industry when the call connects. Without these, the ElevenLabs
      // agent's default dashboard prompt runs — and Holland asks "what
      // industry are you in?" because she has no idea.
      //
      // Requires: ElevenLabs agent config has "Allow prompt override" and
      // "Allow first message override" enabled under Security. If they're
      // off, overrides are silently ignored and we fall back to the agent's
      // static prompt — same broken behavior as before.
      const conversation = await Conversation.startSession({
        signedUrl: tokenData.signed_url,
        connectionType: "websocket",
        overrides: {
          agent: {
            prompt: { prompt: tokenData.system_prompt },
            firstMessage: tokenData.first_message,
            language: "en",
          },
        },
        // Also expose niche as a dynamic variable. If overrides are blocked
        // in the dashboard, an operator can reference {{niche}} in the
        // agent's static prompt to still get niche context.
        dynamicVariables: {
          niche: pickedNiche,
        },
        onConnect: () => {
          setIsConnected(true);
          setIsConnecting(false);
          setVoiceStatus("active");
        },
        onDisconnect: () => {
          setIsConnected(false);
          setIsAgentSpeaking(false);
          setIsUserSpeaking(false);
          setVoiceStatus("ended");
        },
        onMessage: (message: { source: string; message: string }) => {
          setMessages((prev) => [
            ...prev,
            { role: message.source === "ai" ? "ai" : "user", text: message.message },
          ]);
        },
        onModeChange: (mode: { mode: string }) => {
          setIsAgentSpeaking(mode.mode === "speaking");
          setIsUserSpeaking(mode.mode === "listening");
        },
        onError: (err: unknown) => {
          console.error("ElevenLabs error:", err);
          setError("Connection interrupted. Click Start to try again.");
          setVoiceStatus("ended");
        },
      });

      conversationRef.current = conversation;
    } catch (err) {
      console.error("Failed to start conversation:", err);
      setError(err instanceof Error ? err.message : "Failed to connect. Check your microphone permissions.");
      setIsConnecting(false);
      setVoiceStatus("idle");
    }
  }, [niche, customNiche]);

  const endConversation = useCallback(async () => {
    try { await conversationRef.current?.endSession(); } catch { /* ignore */ }
    conversationRef.current = null;
    setIsConnected(false);
    setIsAgentSpeaking(false);
    setIsUserSpeaking(false);
    setVoiceStatus("ended");
  }, []);

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
        <div ref={startStepRef}>
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
                onClick={() => { setStarted(true); setVoiceStatus("idle"); setMessages([]); setError(null); }}
                className="w-full rounded-xl bg-blue-600 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
              >
                🎙 Start Live Voice Demo
              </button>
            ) : (
              <div ref={callUiRef} className="rounded-xl border border-white/10 bg-slate-950 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between bg-slate-800 px-5 py-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600/20 flex items-center justify-center">
                      {(isAgentSpeaking || isUserSpeaking) ? (
                        <SoundBars active={true} color="#60a5fa" />
                      ) : (
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                          <path d="M19 10v2a7 7 0 01-14 0v-2" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Holland — AI Receptionist</p>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-400 animate-pulse" : "bg-slate-500"}`} />
                        <span className="text-[11px] text-slate-400">
                          {isAgentSpeaking ? "Speaking..." : isUserSpeaking ? "Listening to you..." : isConnected ? "Connected — speak anytime" : isConnecting ? "Connecting..." : "Ready"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isConnected && (
                    <button onClick={endConversation} className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-medium text-slate-400 hover:bg-white/20 hover:text-white transition-colors">
                      End Call
                    </button>
                  )}
                </div>

                {/* Messages area */}
                <div className="h-[300px] overflow-y-auto p-4 space-y-3">
                  {/* Idle — start prompt */}
                  {voiceStatus === "idle" && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-4">
                      <div className="w-16 h-16 rounded-full bg-blue-600/15 flex items-center justify-center mb-4 relative">
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                          <path d="M19 10v2a7 7 0 01-14 0v-2" />
                          <line x1="12" y1="19" x2="12" y2="23" />
                          <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                        <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping" />
                      </div>
                      <p className="text-white font-semibold text-base">Talk to Holland</p>
                      <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                        Click below, allow your microphone, and have a real conversation. Holland will act as the AI receptionist for your <span className="text-blue-400 font-medium">{selectedNiche.toLowerCase()}</span>.
                      </p>
                      <button
                        onClick={startConversation}
                        className="mt-5 px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                          <path d="M19 10v2a7 7 0 01-14 0v-2" />
                        </svg>
                        Start Conversation
                      </button>
                    </div>
                  )}

                  {/* Connecting */}
                  {voiceStatus === "connecting" && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-4">
                      <div className="w-14 h-14 rounded-full border-[3px] border-slate-700 border-t-blue-500 animate-spin mb-4" />
                      <p className="font-semibold text-white">Connecting to Holland...</p>
                      <p className="text-sm text-slate-400 mt-1">Please allow microphone access when prompted.</p>
                    </div>
                  )}

                  {/* Active — waiting for first message */}
                  {voiceStatus === "active" && messages.length === 0 && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center px-4">
                        <SoundBars active={true} color="#3b82f6" />
                        <p className="text-sm text-slate-400 mt-3">Connected! Holland will greet you...</p>
                      </div>
                    </div>
                  )}

                  {/* Chat messages */}
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`} style={{ animation: "fdmMsgIn 0.3s ease-out" }}>
                      {msg.role === "ai" && (
                        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mr-2 mt-1">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                            <path d="M19 10v2a7 7 0 01-14 0v-2" />
                          </svg>
                        </div>
                      )}
                      <div className={`max-w-[80%] px-4 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-2xl rounded-tr-md"
                          : "bg-slate-800 text-slate-200 rounded-2xl rounded-tl-md border border-white/[0.06]"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Agent speaking indicator */}
                  {isAgentSpeaking && messages.length > 0 && (
                    <div className="flex items-start" style={{ animation: "fdmMsgIn 0.2s ease-out" }}>
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mr-2 mt-1">
                        <SoundBars active={true} color="white" />
                      </div>
                      <div className="bg-slate-800 border border-white/[0.06] rounded-2xl rounded-tl-md px-4 py-2.5">
                        <SoundBars active={true} color="#3b82f6" />
                      </div>
                    </div>
                  )}

                  {/* User speaking indicator */}
                  {isUserSpeaking && (
                    <div className="flex justify-end" style={{ animation: "fdmMsgIn 0.2s ease-out" }}>
                      <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl rounded-tr-md px-4 py-2.5 flex items-center gap-2">
                        <SoundBars active={true} color="#3b82f6" />
                        <span className="text-xs font-medium text-blue-400">Listening...</span>
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <div className="text-center py-4">
                      <p className="text-sm text-red-400 mb-3">{error}</p>
                      <button onClick={startConversation} className="text-sm text-blue-400 font-medium hover:underline">Try Again</button>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* Bottom bar */}
                <div className="px-4 py-3 border-t border-white/[0.06] bg-slate-900/50">
                  {voiceStatus === "active" && isConnected ? (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-10 rounded-full bg-slate-800 border border-white/[0.06] flex items-center px-4">
                        <span className="text-xs text-slate-500">
                          {isUserSpeaking ? "Listening..." : isAgentSpeaking ? "Holland is responding..." : "Speak anytime..."}
                        </span>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isUserSpeaking ? "bg-green-500 shadow-lg shadow-green-500/30 scale-110" : "bg-blue-600"
                      }`}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                          <path d="M19 10v2a7 7 0 01-14 0v-2" />
                        </svg>
                      </div>
                    </div>
                  ) : voiceStatus === "ended" ? (
                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-2">{messages.length > 0 ? "Conversation ended" : "Session ended"}</p>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => { setVoiceStatus("idle"); setMessages([]); setError(null); }}
                          className="px-4 py-2 rounded-full border border-white/10 text-xs font-medium text-slate-400 hover:bg-white/5 transition-colors"
                        >
                          New Conversation
                        </button>
                        <a href="/audit" className="px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors">
                          Get Your Free Audit
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] text-center text-slate-600">
                      AI Voice Technology &middot; <a href="/audit" className="underline hover:text-blue-400">Get this for your business</a>
                    </p>
                  )}
                </div>
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
          onClick={() => {
            if (isConnected) endConversation();
            setStarted(false); setNiche(""); setCustomNiche(""); setCallState("idle"); setPhoneNumber(""); setShowPhoneOption(false); setError(null);
            setVoiceStatus("idle"); setMessages([]);
          }}
          className="text-sm text-slate-500 hover:text-white transition-colors"
        >
          ← Try a different niche
        </button>
      )}

      <style>{`
        @keyframes fdmSoundWave {
          0%, 100% { height: 6px; }
          50% { height: 18px; }
        }
        @keyframes fdmMsgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
