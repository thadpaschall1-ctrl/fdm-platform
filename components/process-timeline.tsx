"use client";

const STEPS = [
  {
    step: "01",
    title: "Discovery & Audit",
    description: "We analyze your current online presence, competitors, and biggest growth opportunities. You get a plain-English breakdown — free, no commitment.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    step: "02",
    title: "Strategy & Roadmap",
    description: "We build a custom plan targeting your highest-ROI channels. No generic templates — everything is tailored to your business and budget.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    step: "03",
    title: "Launch & Execute",
    description: "Campaigns go live, websites get built, and content gets published. We execute fast and iterate based on data, not gut feelings.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    step: "04",
    title: "Measure & Scale",
    description: "Monthly reporting shows exactly what's working. We double down on winners and eliminate waste — compounding your results.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
];

export function ProcessTimeline() {
  return (
    <section id="process" className="relative overflow-hidden px-6 py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
            Our Process
          </p>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl tracking-tight">
            From Audit to Revenue <span className="text-gradient-fire">in 4 Steps</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            No endless kick-off calls. We learn your business, build your strategy, and get to work.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {STEPS.map((p, i) => (
            <div key={p.step} className="relative group">
              {/* Connector line (desktop) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+30px)] w-[calc(100%-60px)] h-[2px]">
                  <div className={`h-full bg-gradient-to-r ${p.color} opacity-20`} />
                </div>
              )}

              <div className="card-hover rounded-2xl border border-white/[0.08] bg-slate-900/80 p-7 text-center">
                {/* Step number with gradient ring */}
                <div className="mx-auto mb-5 relative w-16 h-16">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${p.color} opacity-20 group-hover:opacity-40 transition-opacity blur-sm`} />
                  <div className={`relative w-16 h-16 rounded-full border ${p.bg} flex items-center justify-center`}>
                    <span className={`text-2xl font-bold bg-gradient-to-br ${p.color} bg-clip-text text-transparent`}>
                      {p.step}
                    </span>
                  </div>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
