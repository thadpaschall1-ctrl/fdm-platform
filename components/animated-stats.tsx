"use client";

const STATS_ROW = [
  { value: "10+", label: "Years in Business", icon: "🏢" },
  { value: "200+", label: "Clients Served", icon: "👥" },
  { value: "3.8x", label: "Average ROAS", icon: "📈" },
  { value: "92%", label: "Client Retention", icon: "🤝" },
  { value: "24/7", label: "AI Answering", icon: "🤖" },
  { value: "<2s", label: "Page Load Speed", icon: "⚡" },
  { value: "60s", label: "Voice AI Callback", icon: "📞" },
  { value: "5 Days", label: "Website Delivery", icon: "🚀" },
];

export function AnimatedStats() {
  return (
    <section className="relative border-y border-white/[0.06] bg-slate-900/50 py-6 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-track">
          {/* Duplicate for seamless loop */}
          {[...STATS_ROW, ...STATS_ROW].map((s, i) => (
            <div
              key={`${s.label}-${i}`}
              className="inline-flex items-center gap-3 px-8"
            >
              <span className="text-xl">{s.icon}</span>
              <span className="text-2xl font-bold text-white stat-value">{s.value}</span>
              <span className="text-sm text-slate-400 font-medium">{s.label}</span>
              <span className="ml-4 text-slate-700">|</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
