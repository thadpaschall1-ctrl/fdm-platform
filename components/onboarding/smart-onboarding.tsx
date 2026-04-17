"use client";

import { useState } from "react";
import OnboardingForm from "./onboarding-form";

interface Scraped {
  business_name: string | null;
  owner_name: string | null;
  owner_credentials: string | null;
  short_description: string | null;
  phone: string | null;
  email: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  service_area: string | null;
  hours: string | null;
  services: Array<{ name: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  testimonials: Array<{ name: string; quote: string }>;
  team: Array<{ name: string; title: string; bio: string }>;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  yelp_url: string | null;
  bbb_url: string | null;
}

type Stage = "url-gate" | "scraping" | "confirm" | "manual-full" | "success";

export default function SmartOnboarding() {
  const [stage, setStage] = useState<Stage>("url-gate");
  const [url, setUrl] = useState("");
  const [scraped, setScraped] = useState<Scraped | null>(null);
  const [scrapeError, setScrapeError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successId, setSuccessId] = useState<string | null>(null);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [packageTier, setPackageTier] = useState("");
  const [notes, setNotes] = useState("");
  const [practicePhotoUrl, setPracticePhotoUrl] = useState("");

  const input = "w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50";
  const btn = "rounded-xl bg-amber-500 px-6 py-3 font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-600 disabled:opacity-50";
  const btnSecondary = "rounded-xl border border-amber-500/50 px-6 py-3 font-bold text-amber-400 transition hover:bg-amber-500/10";

  async function runScrape() {
    if (!url.trim()) { setScrapeError("Paste your website URL first."); return; }
    setScrapeError("");
    setStage("scraping");
    try {
      const res = await fetch("/api/onboarding/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Scrape failed");

      setScraped(data.scraped);
      setPhone(data.scraped.phone || "");
      setEmail(data.scraped.email || "");
      setOwnerName(data.scraped.owner_name || "");
      setStage("confirm");
    } catch (err) {
      setScrapeError(err instanceof Error ? err.message : "Couldn't read that site.");
      setStage("url-gate");
    }
  }

  async function handleSubmit() {
    setSubmitError("");
    if (!phone.trim() && !email.trim()) {
      setSubmitError("Please provide either a phone number or email.");
      return;
    }
    if (!scraped) return;

    const payload = {
      brand: "fdm",
      source: "smart/fdm",
      email: email.trim() || null,
      phone: phone.trim() || null,
      owner_name: ownerName.trim() || scraped.owner_name,
      owner_credentials: scraped.owner_credentials,
      business_name: scraped.business_name || url,
      short_description: scraped.short_description,
      street_address: scraped.street_address,
      city: scraped.city,
      state: scraped.state,
      zip: scraped.zip,
      service_area: scraped.service_area,
      website_url: url,
      facebook_url: scraped.facebook_url,
      instagram_url: scraped.instagram_url,
      linkedin_url: scraped.linkedin_url,
      youtube_url: scraped.youtube_url,
      yelp_url: scraped.yelp_url,
      bbb_url: scraped.bbb_url,
      services: scraped.services,
      faqs: scraped.faqs,
      testimonials: scraped.testimonials,
      team: scraped.team,
      tone: "professional",
      package_tier: packageTier || null,
      notes: notes.trim() || null,
      practice_photo_url: practicePhotoUrl.trim() || null,
      scraped_data: scraped,
    };

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submit failed");
      setSuccessId(data.id);
      setStage("success");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (stage === "success") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20">
          <svg className="h-8 w-8 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">You&apos;re in.</h1>
        <p className="text-lg text-slate-400 max-w-md mx-auto">
          Thanks for onboarding with Fast Digital Marketing. We&apos;ll get your build started within 24 hours.
        </p>
        {successId && <p className="mt-4 text-xs text-slate-600">Ref: {successId}</p>}
      </div>
    );
  }

  if (stage === "manual-full") return <OnboardingForm />;

  if (stage === "scraping") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-white" />
        <h2 className="text-2xl font-bold text-white mb-2">Reading your website…</h2>
        <p className="text-slate-400">Pulling services, hours, team, social profiles. Usually takes 20–40 seconds.</p>
      </div>
    );
  }

  if (stage === "confirm" && scraped) {
    const foundCount = [
      scraped.business_name, scraped.phone, scraped.street_address, scraped.hours,
      scraped.services.length > 0 ? "services" : null,
      scraped.facebook_url, scraped.instagram_url, scraped.linkedin_url, scraped.yelp_url, scraped.bbb_url,
    ].filter(Boolean).length;

    return (
      <div className="mx-auto max-w-3xl px-6 py-12 space-y-8">
        <div className="rounded-2xl border border-amber-500/30 bg-slate-800/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold bg-amber-500/20 text-amber-400">
              ✓ Found {foundCount} data points
            </span>
            <span className="text-xs text-slate-500">{url}</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-4">Here&apos;s what we pulled from your site</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <Item label="Business" value={scraped.business_name} />
            <Item label="Owner" value={scraped.owner_name} />
            <Item label="Phone" value={scraped.phone} />
            <Item label="Address" value={[scraped.street_address, scraped.city, scraped.state].filter(Boolean).join(", ") || null} />
            <Item label="Hours" value={scraped.hours} />
            <Item label="Services" value={scraped.services.length ? `${scraped.services.length} detected` : null} />
            <Item label="FAQs" value={scraped.faqs.length ? `${scraped.faqs.length} detected` : null} />
            <Item label="Testimonials" value={scraped.testimonials.length ? `${scraped.testimonials.length} detected` : null} />
            <Item label="Social / Directories" value={[scraped.facebook_url, scraped.instagram_url, scraped.linkedin_url, scraped.yelp_url, scraped.bbb_url].filter(Boolean).length ? "✓ linked" : null} />
          </dl>
          <p className="mt-4 text-xs text-slate-500">
            We&apos;ll use all of this to build your new site. You can edit anything later from your client dashboard.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-slate-800/50 p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Just a few more things</h3>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone <span className="text-slate-500">(prefilled from your site)</span></label>
            <input className={input} value={phone} onChange={e => setPhone(e.target.value)} placeholder="(813) 555-0123" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <input type="email" className={input} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            <p className="mt-1 text-xs text-slate-500">This is how you&apos;ll sign into your dashboard to edit your site and see your new leads.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Your name</label>
            <input className={input} value={ownerName} onChange={e => setOwnerName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Package (optional)</label>
            <select className={input} value={packageTier} onChange={e => setPackageTier(e.target.value)}>
              <option value="">Let us recommend</option>
              <option value="starter">Starter — Free / $49 mo</option>
              <option value="pro">Pro — $495 / $297 mo</option>
              <option value="pro-seo">Pro + SEO — $995 / $397 mo</option>
              <option value="full-stack">Full Stack — $1,747 / $497 mo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Owner / Doctor photo URL <span className="text-slate-500">(optional)</span></label>
            <input type="url" className={input} value={practicePhotoUrl} onChange={e => setPracticePhotoUrl(e.target.value)} placeholder="https://... paste a link to your professional headshot" />
            <p className="mt-1 text-xs text-slate-500">If your site doesn&apos;t have your photo publicly, add one here. You can also add it later from your dashboard.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Anything we should know? (optional)</label>
            <textarea rows={3} className={`${input} resize-none`} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Unique offerings, things to emphasize, things to avoid..." />
          </div>

          {submitError && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{submitError}</div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={handleSubmit} className={btn}>Submit to Fast Digital Marketing</button>
            <button onClick={() => setStage("manual-full")} className={btnSecondary}>Fill out the full form instead</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="rounded-2xl border border-white/[0.08] bg-slate-800/50 p-8">
        <h2 className="text-2xl font-bold text-white mb-3">Start with your website URL</h2>
        <p className="text-slate-400 mb-6">
          Paste your current site and we&apos;ll pull your services, hours, team, and social profiles automatically.
          You won&apos;t have to re-type things we can already see.
        </p>

        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className={input}
          placeholder="yourbusiness.com"
          onKeyDown={e => { if (e.key === "Enter") runScrape(); }}
        />

        {scrapeError && (
          <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {scrapeError}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <button onClick={runScrape} className={btn}>Scan my site &rarr;</button>
          <button onClick={() => setStage("manual-full")} className="text-amber-400 hover:text-amber-300 underline">
            I don&apos;t have a website yet
          </button>
        </div>
      </div>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className={`text-sm ${value ? "text-white" : "text-slate-600 italic"}`}>{value || "—"}</dd>
    </div>
  );
}
