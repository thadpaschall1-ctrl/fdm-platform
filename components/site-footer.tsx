import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold text-white">
              Fast<span className="text-blue-500">Digital</span>Marketing
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-400 leading-relaxed">
              A results-driven digital marketing agency helping businesses grow faster online through SEO, paid ads, web design, and AI-powered automation.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/services/ai-voice-receptionist" className="hover:text-white transition-colors">AI Voice Receptionist</a></li>
              <li><a href="/services/voice-ai-callback" className="hover:text-white transition-colors">Voice AI Callback</a></li>
              <li><a href="/services/review-autopilot" className="hover:text-white transition-colors">Review Autopilot</a></li>
              <li><a href="/services/smart-website" className="hover:text-white transition-colors">Smart Website</a></li>
              <li><a href="/services/local-seo-ai" className="hover:text-white transition-colors">Local SEO & AI</a></li>
              <li><a href="/services/paid-advertising" className="hover:text-white transition-colors">Google Ads</a></li>
              <li><a href="/services/full-automation-stack" className="hover:text-white transition-colors">Full Automation Stack</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/demo" className="hover:text-white transition-colors">Live AI Demo</a></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li>
                <a href="tel:+18889834449" className="hover:text-white transition-colors">
                  (888) 983-4449
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {year} Fast Digital Marketing. All rights reserved.</p>
          <p>fastdigitalmarketing.com</p>
        </div>
      </div>
    </footer>
  );
}
