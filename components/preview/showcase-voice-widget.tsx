"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Conversation } from "@elevenlabs/client";

/**
 * Showcase Voice Widget — floating "Talk to Holland" button on every
 * /examples/[slug] showcase page.
 *
 * When clicked, opens a compact panel with a real ElevenLabs Conversational AI
 * session pre-configured for the niche. Holland answers as if she's the AI
 * receptionist for that specific business — prospects literally hear what
 * their own AI receptionist would sound like.
 *
 * Why this matters: every showcase page currently ends with a phone CTA that
 * just `tel:` dials a fake number. With this widget, prospects can click and
 * immediately have a real voice conversation. The static demo at /demo gets
 * rave reviews; putting the same demo INSIDE every reference site is a
 * different conversion lever entirely.
 *
 * Adapted from leadgen-platform/components/redesign/voice-widget.tsx, with
 * (a) bottom-right positioning so it doesn't conflict with showcase chrome,
 * (b) niche-aware system prompt via FDM's existing /api/demo/start endpoint,
 * (c) FDM blue palette, (d) compact panel that doesn't dominate the page.
 */

interface ShowcaseVoiceWidgetProps {
  /** Niche slug used to scope Holland's role (e.g. "pool-builders") */
  nicheSlug: string;
  /** Human-readable niche name for prompt + UI ("Pool Builders") */
  nicheName: string;
  /** Fictional business name — shown in the widget header */
  businessName: string;
}

interface ChatMessage {
  role: "ai" | "user";
  text: string;
}

function SoundBars({ active, color = "#93c5fd" }: { active: boolean; color?: string }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-[3px] rounded-full transition-all duration-200"
          style={{
            backgroundColor: color,
            height: active ? undefined : "5px",
            animation: active
              ? `showcaseSoundWave 0.7s ease-in-out infinite ${i * 0.08}s`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

export function ShowcaseVoiceWidget({
  nicheSlug,
  nicheName,
  businessName,
}: ShowcaseVoiceWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "connecting" | "active" | "ended">("idle");

  const conversationRef = useRef<Awaited<ReturnType<typeof Conversation.startSession>> | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAgentSpeaking]);

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    setStatus("connecting");
    setMessages([]);

    try {
      // Pass the niche name (not slug) so the prompt reads naturally:
      // "AI receptionist for a Pool Builders business" not "pool-builders"
      const tokenRes = await fetch("/api/demo/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: nicheName }),
      });
      const tokenData = await tokenRes.json();

      if (!tokenRes.ok || !tokenData.signed_url) {
        throw new Error(tokenData.error || "Failed to start voice session");
      }

      // Customize Holland's first message for this specific business so it
      // sounds like prospects called THIS company, not a generic demo.
      const customFirstMessage = `Hi there, thanks for calling ${businessName}! I'm Holland — the AI receptionist. How can I help you today?`;

      const conversation = await Conversation.startSession({
        signedUrl: tokenData.signed_url,
        connectionType: "websocket",
        overrides: {
          agent: {
            firstMessage: customFirstMessage,
            prompt: tokenData.system_prompt
              ? { prompt: tokenData.system_prompt }
              : undefined,
          },
        },
        onConnect: () => {
          setIsConnected(true);
          setIsConnecting(false);
          setStatus("active");
        },
        onDisconnect: () => {
          setIsConnected(false);
          setIsAgentSpeaking(false);
          setIsUserSpeaking(false);
          setStatus("ended");
        },
        onError: (err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          setError(msg);
          setIsConnecting(false);
          setStatus("ended");
        },
        onMessage: ({ message, source }: { message: string; source: "ai" | "user" }) => {
          if (!message?.trim()) return;
          setMessages((prev) => [...prev, { role: source, text: message }]);
        },
        onModeChange: ({ mode }: { mode: "speaking" | "listening" }) => {
          setIsAgentSpeaking(mode === "speaking");
          setIsUserSpeaking(mode === "listening");
        },
      });

      conversationRef.current = conversation;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setIsConnecting(false);
      setStatus("ended");
    }
  }, [nicheName, businessName]);

  const endConversation = useCallback(async () => {
    if (conversationRef.current) {
      await conversationRef.current.endSession();
      conversationRef.current = null;
    }
    setIsConnected(false);
    setStatus("ended");
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        conversationRef.current.endSession();
      }
    };
  }, []);

  const handleClose = () => {
    if (isConnected) endConversation();
    setIsOpen(false);
    setStatus("idle");
    setMessages([]);
    setError(null);
  };

  return (
    <>
      {/* ═══════ FLOATING LAUNCH BUTTON ═══════ */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-[90] group flex items-center gap-2.5 px-5 py-3 rounded-full text-white hover:scale-105 transition-all duration-300"
          style={{
            background: "rgba(15, 23, 42, 0.92)",
            border: "1.5px solid rgba(96, 165, 250, 0.4)",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.4), 0 0 24px rgba(59, 130, 246, 0.25)",
            backdropFilter: "blur(12px)",
            animation: "showcaseSlideIn 0.5s ease-out 0.8s both",
          }}
          aria-label={`Talk to Holland — the AI receptionist for ${businessName}`}
        >
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Pulsing dot indicating live AI */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 ring-2 ring-slate-950 animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold tracking-wide leading-tight">
              Talk to Holland
            </div>
            <div className="text-[10px] text-blue-300 font-medium leading-tight">
              Live AI receptionist · Free
            </div>
          </div>
        </button>
      )}

      {/* ═══════ EXPANDED PANEL ═══════ */}
      {isOpen && (
        <div
          className="fixed bottom-4 right-4 z-[90] w-[380px] max-w-[calc(100vw-32px)] rounded-2xl border border-blue-500/30 bg-slate-950/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          style={{ animation: "showcaseSlideIn 0.3s ease-out" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-slate-950 ${
                    isConnected ? "bg-green-400 animate-pulse" : "bg-slate-500"
                  }`}
                />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold text-white">Holland</div>
                <div className="text-[10px] text-blue-300">
                  AI receptionist for {businessName}
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-800 transition-colors"
              aria-label="Close voice widget"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Body — varies by status */}
          <div className="p-4">
            {status === "idle" && (
              <div className="text-center py-4">
                <p className="text-sm text-slate-300 leading-relaxed mb-1">
                  Hear what Holland sounds like answering for a real
                </p>
                <p className="text-sm font-bold text-white mb-4">
                  {nicheName} business.
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-5 px-2">
                  This is the same AI that answers your phone 24/7 in production.
                  Click below to start a live conversation.
                </p>
                <button
                  onClick={startConversation}
                  disabled={isConnecting}
                  className="w-full px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg hover:shadow-[0_8px_24px_rgba(59,130,246,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🎙  Start Conversation
                </button>
                <p className="text-[10px] text-slate-500 mt-3">
                  Mic permission required · Free, no signup
                </p>
              </div>
            )}

            {status === "connecting" && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/30 mb-3">
                  <SoundBars active={true} />
                  <span className="text-xs font-medium text-blue-200">
                    Connecting to Holland…
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Your browser may ask for microphone permission
                </p>
              </div>
            )}

            {status === "active" && (
              <>
                {/* Live status row */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    {isAgentSpeaking ? (
                      <>
                        <SoundBars active={true} color="#60a5fa" />
                        <span className="text-[11px] font-semibold text-blue-300">
                          Holland speaking
                        </span>
                      </>
                    ) : isUserSpeaking ? (
                      <>
                        <SoundBars active={true} color="#34d399" />
                        <span className="text-[11px] font-semibold text-emerald-300">
                          Listening to you
                        </span>
                      </>
                    ) : (
                      <span className="text-[11px] text-slate-400">Live</span>
                    )}
                  </div>
                  <button
                    onClick={endConversation}
                    className="px-3 py-1.5 rounded-full bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-[11px] font-bold text-red-300 transition-colors"
                  >
                    End Call
                  </button>
                </div>

                {/* Transcript */}
                <div className="max-h-64 overflow-y-auto rounded-lg bg-slate-900/60 border border-slate-800 p-3 space-y-2.5">
                  {messages.length === 0 ? (
                    <p className="text-[11px] text-slate-500 text-center py-6">
                      Start talking — Holland will respond
                    </p>
                  ) : (
                    messages.map((m, i) => (
                      <div
                        key={i}
                        className={`text-xs leading-relaxed ${
                          m.role === "ai"
                            ? "text-blue-100"
                            : "text-emerald-100 text-right"
                        }`}
                      >
                        <span
                          className={`inline-block px-2.5 py-1.5 rounded-lg max-w-[85%] ${
                            m.role === "ai"
                              ? "bg-blue-500/15 border border-blue-500/25"
                              : "bg-emerald-500/15 border border-emerald-500/25"
                          }`}
                        >
                          {m.text}
                        </span>
                      </div>
                    ))
                  )}
                  <div ref={bottomRef} />
                </div>
              </>
            )}

            {status === "ended" && (
              <div className="text-center py-6">
                <p className="text-sm font-bold text-white mb-2">Call ended</p>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-4 px-3">
                  Want this 24/7 for your own {nicheName.toLowerCase()} business?
                  Holland is included in Smart Site + Voice from $297/mo.
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setMessages([]);
                      setError(null);
                    }}
                    className="px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-800 hover:border-blue-500/40 text-xs font-medium text-slate-300 transition-colors"
                  >
                    Try again
                  </button>
                  <a
                    href="/pricing"
                    className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    See Pricing →
                  </a>
                </div>
              </div>
            )}

            {error && (
              <p className="mt-3 text-[11px] text-red-300 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
                {error}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ═══════ ANIMATIONS ═══════ */}
      <style jsx global>{`
        @keyframes showcaseSoundWave {
          0%, 100% { height: 5px; }
          50% { height: 18px; }
        }
        @keyframes showcaseSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
