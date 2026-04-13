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
              <li><a href="#services" className="hover:text-white transition-colors">SEO</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Google Ads & PPC</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Web Design</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Social Media</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI & Automation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#why-fdm" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Our Process</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
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
