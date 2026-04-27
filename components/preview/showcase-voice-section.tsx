"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Conversation } from "@elevenlabs/client";
import { getNicheVoiceRole } from "@/lib/data/niche-voice-roles";

/**
 * Showcase Voice Section — INLINE section in the page (not a floating button).
 *
 * Drops between "Why Us" and "FAQ" in each archetype so the prospect naturally
 * scrolls to it. Headline frames the AI receptionist as a niche specialist
 * (e.g. "Try Our AI Pool Design Consultant Right Now") rather than the generic
 * "Holland" — sounds more believable and more valuable per niche.
 *
 * When the prospect clicks Start, the conversation UI replaces the start
 * button inline (no overlay, no modal). When the call ends they see retry
 * + pricing buttons.
 *
 * Replaces the previous floating-bottom-right `<ShowcaseVoiceWidget>`.
 */

interface ShowcaseVoiceSectionProps {
  nicheSlug: string;
  nicheName: string;
  businessName: string;
  /** Theme colors passed from each archetype so the section blends visually */
  palette: {
    background: string;
    foreground: string;
    surface: string;
    muted: string;
    border: string;
    primary: string;
    primaryFg: string;
    accent: string;
  };
}

interface ChatMessage {
  role: "ai" | "user";
  text: string;
}

function SoundBars({ active, color = "currentColor" }: { active: boolean; color?: string }) {
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
              ? `voiceSectionWave 0.7s ease-in-out infinite ${i * 0.08}s`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

export function ShowcaseVoiceSection({
  nicheSlug,
  nicheName,
  businessName,
  palette,
}: ShowcaseVoiceSectionProps) {
  const { role, ctaVerb } = getNicheVoiceRole(nicheSlug);
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
      const tokenRes = await fetch("/api/demo/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: nicheName }),
      });
      const tokenData = await tokenRes.json();

      if (!tokenRes.ok || !tokenData.signed_url) {
        throw new Error(tokenData.error || "Failed to start voice session");
      }

      // Customize Holland's first message so the prospect hears their AI
      // specialist greeting them as if they'd called THIS specific business.
      const customFirstMessage = `Hi there, thanks for calling ${businessName}! This is your AI ${role}. How can I help you today?`;

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
  }, [nicheName, businessName, role]);

  const endConversation = useCallback(async () => {
    if (conversationRef.current) {
      await conversationRef.current.endSession();
      conversationRef.current = null;
    }
    setIsConnected(false);
    setStatus("ended");
  }, []);

  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        conversationRef.current.endSession();
      }
    };
  }, []);

  return (
    <section
      data-tour="voice"
      data-voice-section=""
      className="px-6 lg:px-16 py-20 lg:py-28"
      style={{ background: palette.surface }}
      aria-label={`Try our AI ${role}`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-4"
            style={{ color: palette.accent }}
          >
            Live Demo · No Signup
          </p>
          <h2
            className="text-3xl lg:text-5xl mb-5 leading-[1.05]"
            style={{ color: palette.foreground, fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            {ctaVerb} our AI {role} right now.
          </h2>
          <p
            className="text-base lg:text-lg leading-[1.6] max-w-2xl mx-auto"
            style={{ color: palette.muted }}
          >
            Hear exactly what your customers will hear when they call. The same
            real-time AI conversation that runs 24/7 on every Fast Digital
            Marketing Smart Site + Voice subscription.
          </p>
        </div>

        <div
          className="rounded-2xl p-6 lg:p-8"
          style={{
            background: palette.background,
            border: `1px solid ${palette.border}`,
          }}
        >
          {status === "idle" && (
            <div className="text-center py-6">
              <button
                onClick={startConversation}
                disabled={isConnecting}
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-base font-bold shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: palette.primary,
                  color: palette.primaryFg,
                  boxShadow: `0 10px 30px ${palette.primary}40`,
                }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ background: palette.primaryFg }}
                  />
                  <span
                    className="relative inline-flex h-2.5 w-2.5 rounded-full"
                    style={{ background: palette.primaryFg }}
                  />
                </span>
                Start the Conversation
              </button>
              <p className="mt-4 text-xs" style={{ color: palette.muted }}>
                Mic permission required · Free, no signup, ~3 min average
              </p>
            </div>
          )}

          {status === "connecting" && (
            <div className="text-center py-10">
              <div
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
                style={{
                  background: `${palette.primary}15`,
                  border: `1px solid ${palette.primary}40`,
                }}
              >
                <SoundBars active={true} color={palette.primary} />
                <span className="text-sm font-semibold" style={{ color: palette.primary }}>
                  Connecting…
                </span>
              </div>
              <p className="mt-3 text-xs" style={{ color: palette.muted }}>
                Your browser may ask for microphone permission
              </p>
            </div>
          )}

          {status === "active" && (
            <>
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`relative w-9 h-9 rounded-full flex items-center justify-center ${
                      isConnected ? "" : ""
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: palette.primaryFg }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-bold" style={{ color: palette.foreground }}>
                      AI {role}
                    </div>
                    <div className="text-[11px]" style={{ color: palette.muted }}>
                      {isAgentSpeaking
                        ? "Speaking…"
                        : isUserSpeaking
                          ? "Listening…"
                          : "Live"}
                    </div>
                  </div>
                </div>

                {(isAgentSpeaking || isUserSpeaking) && (
                  <SoundBars
                    active
                    color={isAgentSpeaking ? palette.primary : palette.accent}
                  />
                )}

                <button
                  onClick={endConversation}
                  className="px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors"
                  style={{
                    background: "rgba(239, 68, 68, 0.15)",
                    border: "1px solid rgba(239, 68, 68, 0.4)",
                    color: "#fca5a5",
                  }}
                >
                  End Call
                </button>
              </div>

              <div
                className="max-h-72 overflow-y-auto rounded-lg p-4 space-y-2.5"
                style={{
                  background: palette.surface,
                  border: `1px solid ${palette.border}`,
                }}
              >
                {messages.length === 0 ? (
                  <p
                    className="text-xs text-center py-6"
                    style={{ color: palette.muted }}
                  >
                    Start talking — your AI {role} will respond.
                  </p>
                ) : (
                  messages.map((m, i) => (
                    <div
                      key={i}
                      className={`text-sm leading-relaxed ${m.role === "user" ? "text-right" : ""}`}
                    >
                      <span
                        className="inline-block px-3 py-2 rounded-lg max-w-[85%]"
                        style={{
                          background:
                            m.role === "ai"
                              ? `${palette.primary}15`
                              : `${palette.accent}15`,
                          border: `1px solid ${m.role === "ai" ? palette.primary : palette.accent}30`,
                          color: palette.foreground,
                        }}
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
              <p className="text-sm font-bold mb-2" style={{ color: palette.foreground }}>
                Call ended
              </p>
              <p
                className="text-xs leading-relaxed mb-5 max-w-md mx-auto"
                style={{ color: palette.muted }}
              >
                Want this 24/7 for your own {nicheName.toLowerCase()} business?
                Your AI {role} is included in Smart Site + Voice from $297/mo.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setStatus("idle");
                    setMessages([]);
                    setError(null);
                  }}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    border: `1px solid ${palette.border}`,
                    color: palette.foreground,
                  }}
                >
                  Try again
                </button>
                <a
                  href="/pricing"
                  className="px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    background: palette.primary,
                    color: palette.primaryFg,
                  }}
                >
                  See Pricing →
                </a>
              </div>
            </div>
          )}

          {error && (
            <p
              className="mt-4 text-xs px-3 py-2 rounded-md"
              style={{
                color: "#fca5a5",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes voiceSectionWave {
          0%, 100% { height: 5px; }
          50% { height: 18px; }
        }
      `}</style>
    </section>
  );
}
