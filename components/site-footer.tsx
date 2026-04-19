import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-slate-950 px-6 pt-16 pb-8">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] bg-blue-600/5 blur-[100px] rounded-full" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-white">
                Fast<span className="text-gradient-blue">Digital</span>Marketing
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-400 leading-relaxed">
              A results-driven digital marketing agency helping businesses grow faster online through SEO, paid ads, web design, and AI-powered automation.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="/audit"
                className="rounded-lg bg-blue-600/20 border border-blue-600/30 px-4 py-2 text-xs font-bold text-blue-400 hover:bg-blue-600/30 transition-colors"
              >
                Free Audit →
              </a>
              <a
                href="tel:+18889721544"
                className="rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-white/10 transition-colors"
              >
                (888) 972-1544
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {[
                { label: "AI Voice Receptionist", href: "/services/ai-voice-receptionist" },
                { label: "Voice AI Callback", href: "/services/voice-ai-callback" },
                { label: "Review Autopilot", href: "/services/review-autopilot" },
                { label: "Smart Website", href: "/services/smart-website" },
                { label: "Local SEO & AI", href: "/services/local-seo-ai" },
                { label: "Google Ads", href: "/services/paid-advertising" },
                { label: "Full Automation Stack", href: "/services/full-automation-stack" },
              ].map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="hover:text-white transition-colors hover:translate-x-0.5 inline-block">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/demo" className="hover:text-white transition-colors">Live AI Demo</a></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li>
                <a href="tel:+18889721544" className="hover:text-white transition-colors">
                  (888) 972-1544
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {year} Fast Digital Marketing. All rights reserved.</p>
          <p className="text-slate-500">fastdigitalmarketing.com</p>
        </div>
      </div>
    </footer>
  );
}
