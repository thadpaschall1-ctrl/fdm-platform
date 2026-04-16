"use client";

interface ServiceProps {
  service: {
    icon: string;
    title: string;
    slug: string;
    price?: string;
    tier?: string;
    description: string;
    highlights: string[];
    color: string;
    glow: string;
  };
  index: number;
}

const tierColors: Record<string, string> = {
  Starter: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  Growth: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  Pro: "bg-violet-500/10 border-violet-500/20 text-violet-400",
};

export function ServiceCard({ service: s, index }: ServiceProps) {
  return (
    <a
      href={`/services/${s.slug}`}
      className={`group relative rounded-2xl border border-white/[0.08] bg-slate-900/80 p-7 transition-all duration-300 hover:border-transparent hover:-translate-y-2 hover:shadow-2xl ${s.glow} overflow-hidden`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Gradient top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Hover glow background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-2xl`} />

      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">{s.icon}</span>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">{s.title}</h3>
        </div>

        <p className="mb-5 text-sm text-slate-400 leading-relaxed">{s.description}</p>
        <ul className="space-y-2 mb-5">
          {s.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-slate-500">
              <div className={`h-1 w-1 rounded-full bg-gradient-to-r ${s.color}`} />
              {h}
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-500 group-hover:text-blue-400 transition-all group-hover:gap-2">
          Learn more
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </a>
  );
}
