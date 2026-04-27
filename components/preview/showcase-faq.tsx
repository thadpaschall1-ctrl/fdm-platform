"use client";

import { useState, useEffect } from "react";

/**
 * Showcase FAQ — left-edge floating "Business Owner? Your questions answered"
 * panel on every /examples/[slug] page.
 *
 * 16 prospect-evaluating-the-preview FAQs covering: customization, branding,
 * cost, timeline, AI search, AI voice, contracts, migration, industries.
 *
 * Adapted from leadgen-platform/components/redesign/preview-faq.tsx (which
 * already had FDM-branded content built in via brand="fdm"). We strip out
 * the chiro variant and lock to FDM-only.
 *
 * Position: vertically centered on the left edge. Doesn't conflict with:
 *   - top-left explainer ("Preview · What is this?")
 *   - top-right back-link ("← Demo by Fast Digital Marketing")
 *   - bottom-left tour ("Tour this site")
 *   - bottom-right voice widget ("Talk to Holland")
 *
 * Auto-pulses 3 seconds after page load to draw attention, stops once opened.
 */

type FAQ = { q: string; a: string; icon: string };

const FAQ_ITEMS: FAQ[] = [
  {
    q: "Can I change the color theme?",
    a: "Yes — we fully customize the entire color scheme to match your business branding. You can choose your own colors, or we'll design a palette that fits your brand. What you see now is just the preview template — your live site will look completely different.",
    icon: "🎨",
  },
  {
    q: "Can I add my own logo?",
    a: "Absolutely. Your logo goes front and center on the final site — in the header, footer, and favicon. Just send it over after purchase and we'll integrate it perfectly. If you don't have a logo yet, we can work with your business name in a professional font.",
    icon: "🏷️",
  },
  {
    q: "Can I customize the rest of the branding?",
    a: "Everything gets customized — colors, fonts, photos, layout emphasis, and content. What you're seeing is a preview template to show the structure and features. Your final site will be uniquely yours and match your business identity.",
    icon: "✨",
  },
  {
    q: "Can I edit the content myself?",
    a: "Yes — you'll have full control to update text, photos, services, hours, and more anytime. We also handle the entire initial content setup for you based on your business details.",
    icon: "✏️",
  },
  {
    q: "How much does a Smart Website cost?",
    a: "Smart Websites start at $197/month. Add the AI Voice Receptionist for $297/mo, or get the Full Automation Stack (website + voice + reviews + nurture) at $397/mo. No setup fees. Live in 5 business days. Month-to-month, cancel anytime.",
    icon: "💰",
  },
  {
    q: "What else does Fast Digital Marketing do besides websites?",
    a: "We're a full AI-delivered marketing platform: Smart Websites, AI Voice Receptionist (Holland), AI Search Optimization, Review Autopilot, and Lead Nurture. The Full Automation Stack at $397/mo includes everything in one integrated subscription — no human account managers, no monthly calls, no contracts.",
    icon: "🛠️",
  },
  {
    q: "How long until my site goes live?",
    a: "We deliver your finished, fully customized website within 5 business days of purchase. Most businesses are live within a week.",
    icon: "⚡",
  },
  {
    q: "What makes this different from Wix or WordPress?",
    a: "Smart Websites are built on Next.js with AI Search Optimization baked in — full JSON-LD schema (LocalBusiness, Service, FAQPage, AggregateRating), so you show up in ChatGPT, Perplexity, and Google AI Overviews, not just traditional Google. Plus built-in lead capture, structured data, and optional AI voice receptionist.",
    icon: "🏆",
  },
  {
    q: "Can I keep my current domain?",
    a: "Yes. We connect your existing domain or provide a new one — we handle all the technical DNS setup at no extra cost.",
    icon: "🌐",
  },
  {
    q: "Will customers actually find me? (SEO)",
    a: "Every Smart Website includes structured data markup, fast load times, mobile-first design, and AI Search Optimization so you get cited by ChatGPT and Perplexity — not just Google. Most businesses see improvements within 60–90 days.",
    icon: "🔍",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Month-to-month — cancel anytime with no penalties. We earn your business every month by delivering results you can see in your dashboard.",
    icon: "📋",
  },
  {
    q: "What's the AI voice receptionist?",
    a: "A real AI voice agent (Holland) that answers your phone 24/7 with a natural British accent. She qualifies leads, books appointments, and routes urgent calls to you. Included from $297/mo. Try it yourself at (888) 972-1544 or click the 'Talk to Holland' button on this page.",
    icon: "🎙️",
  },
  {
    q: "What industries do you work with?",
    a: "Any industry. Home services, trades, medical, dental, chiropractic, medical spas, hair salons, real estate, auto, veterinary, fitness, professional services, and more — 75+ niche playbooks. If your customers search online, we can reach them.",
    icon: "🎯",
  },
  {
    q: "What if I already have a website?",
    a: "No problem. We build your new Smart Website and handle the full migration — redirects, domain transfer, everything. Your old site stays live until the new one is ready. Zero downtime.",
    icon: "🔄",
  },
  {
    q: "Who built Fast Digital Marketing?",
    a: "Founded by Thad Paschall, who scaled a home-service business from one truck to $130M before building Fast Digital Marketing to ship that growth playbook as software. Every service is AI-delivered — no human account managers, no monthly calls, no upsells.",
    icon: "👋",
  },
  {
    q: "How do I get started?",
    a: "Pick a plan at fastdigitalmarketing.com/pricing — everything is online, no calls needed. Or run a free audit at fastdigitalmarketing.com/audit first. Your customized site goes live within 5 business days of signup.",
    icon: "🚀",
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-800 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 py-3.5 text-left group"
      >
        <span className="text-base shrink-0">{item.icon}</span>
        <span className="flex-1 text-[13px] font-semibold text-white group-hover:text-blue-300 transition-colors leading-snug">
          {item.q}
        </span>
        <svg
          className={`w-4 h-4 shrink-0 text-blue-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? "260px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="pb-3.5 pl-8 pr-2 text-[12.5px] text-slate-400 leading-relaxed">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export function ShowcaseFAQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [pulsed, setPulsed] = useState(false);

  // Auto-pulse 3 seconds after load to draw attention, stop once opened
  useEffect(() => {
    const t = setTimeout(() => setPulsed(true), 3000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (isOpen) setPulsed(false);
  }, [isOpen]);

  return (
    <>
      {/* ═══════ FLOATING BUTTON — right edge, vertically centered ═══════ */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-3 top-1/2 -translate-y-1/2 z-[89] flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all duration-200 hover:scale-105"
          style={{
            background: "rgba(15, 23, 42, 0.92)",
            border: "1px solid rgba(96, 165, 250, 0.4)",
            boxShadow: pulsed
              ? "0 2px 12px rgba(59,130,246,0.35), 0 0 0 3px rgba(59,130,246,0.18)"
              : "0 2px 10px rgba(0,0,0,0.4), 0 0 16px rgba(59, 130, 246, 0.2)",
            backdropFilter: "blur(12px)",
            animation: pulsed ? "showcaseFaqPulse 2s ease-in-out infinite" : "none",
          }}
          aria-label="Business Owner? Questions answered"
        >
          <svg
            className="w-3.5 h-3.5 text-blue-300 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[11px] font-semibold text-white tracking-wide whitespace-nowrap">
            Business Owner?
          </span>
        </button>
      )}

      {/* ═══════ SLIDE-OUT PANEL ═══════ */}
      {isOpen && (
        <div
          className="fixed right-3 top-1/2 -translate-y-1/2 md:right-5 z-[91] w-[400px] max-w-[calc(100vw-1.5rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{
            height: "min(640px, calc(100vh - 6rem))",
            boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
            animation: "showcaseFaqSlideUp 0.3s ease-out",
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 shrink-0 border-b border-blue-500/25"
            style={{ background: "rgba(15, 23, 42, 0.98)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-inner">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">
                    Questions About This Website?
                  </p>
                  <p className="text-blue-300/80 text-[11px] mt-0.5">
                    For business owners evaluating this preview
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 transition-colors"
                aria-label="Close FAQ"
              >
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* FAQ Items — scrollable */}
          <div className="flex-1 overflow-y-auto px-5 py-2 bg-slate-950/95 backdrop-blur-xl">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="px-5 py-4 bg-slate-950/95 border-t border-slate-800 shrink-0">
            <a
              href="/pricing"
              className="block w-full py-3 rounded-xl text-center font-bold text-sm text-white transition-all hover:shadow-[0_8px_20px_rgba(59,130,246,0.5)]"
              style={{
                background: "linear-gradient(135deg, #60a5fa, #2563eb)",
              }}
            >
              See Smart Website Plans →
            </a>
            <p className="text-center text-[10px] text-slate-500 mt-2">
              Live in 5 days · No contracts · From $197/mo
            </p>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes showcaseFaqSlideUp {
          from {
            opacity: 0;
            transform: translate(0, calc(-50% + 16px));
          }
          to {
            opacity: 1;
            transform: translate(0, -50%);
          }
        }
        @keyframes showcaseFaqPulse {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(59,130,246,0.25), 0 0 0 0px rgba(59,130,246,0.3);
          }
          50% {
            box-shadow: 0 4px 20px rgba(59,130,246,0.45), 0 0 0 6px rgba(59,130,246,0.15);
          }
        }
      `}</style>
    </>
  );
}
