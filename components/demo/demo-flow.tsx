"use client";

import { useState } from "react";

// Calls leadgen-platform demo APIs cross-origin (CORS allowed on the server side).
const API_BASE = "https://growyourchiropracticpractice.com";

type Stage = "url-or-startup" | "scraping" | "startup-form" | "scraped-teaser" | "contact-form" | "otp" | "success";

interface ScrapedTeaser {
  business_name: string | null;
  phone: string | null;
  city: string | null;
  services?: unknown[];
  faqs?: unknown[];
  testimonials?: unknown[];
}

export default function DemoFlow() {
  const [stage, setStage] = useState<Stage>("url-or-startup");
  const [url, setUrl] = useState("");
  const [scraped, setScraped] = useState<ScrapedTeaser | null>(null);
  const [startupAnswers, setStartupAnswers] = useState({
    business_name: "",
    industry: "",
    city: "",
    primary_service: "",
    ideal_customer: "",
    differentiator: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const [leadId, setLeadId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [otpExpiresAt, setOtpExpiresAt] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const CONSENT_TEXT = `By checking this box, you agree to receive texts from Fast Digital Marketing, including a verification code now and occasional updates about your preview. Msg frequency varies. Reply STOP to opt out. Msg & data rates may apply.`;

  const btn = "rounded-xl bg-amber-500 px-6 py-3 font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-600 disabled:opacity-50";
  const btnSec = "rounded-xl border border-amber-500/50 px-6 py-3 font-bold text-amber-400 transition hover:bg-amber-500/10";
  const input = "w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50";

  async function runScan() {
    if (!url.trim()) { setError("Paste your website URL first."); return; }
    setError("");
    setStage("scraping");
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/api/demo/scrape`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Scan failed");
      setScraped(data.scraped);
      setStage("scraped-teaser");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStage("url-or-startup");
    } finally {
      setBusy(false);
    }
  }

  async function requestOtp() {
    setError("");
    if (!consent) { setError("Please agree to receive texts to continue."); return; }
    setBusy(true);
    try {
      const payload = {
        brand: "fdm",
        source_url: scraped ? url : null,
        startup_form: !scraped ? startupAnswers : null,
        name,
        email,
        phone,
        sms_consent: true,
        sms_consent_text: CONSENT_TEXT,
      };
      const res = await fetch(`${API_BASE}/api/demo/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't send code.");
      setLeadId(data.lead_id);
      setOtpExpiresAt(data.otp_expires_at);
      setStage("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send code.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode() {
    setError("");
    if (!leadId || !code.trim()) { setError("Enter the code we texted you."); return; }
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/api/demo/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: leadId, code: code.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Wrong code.");
      window.location.href = data.preview_url || `${API_BASE}/demo/${leadId}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't verify.");
    } finally {
      setBusy(false);
    }
  }

  async function resendCode() {
    if (!leadId) return;
    setError("");
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/api/demo/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: leadId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't resend.");
      setOtpExpiresAt(data.otp_expires_at);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't resend.");
    } finally {
      setBusy(false);
    }
  }

  if (stage === "scraping") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-white" />
        <h2 className="text-2xl font-bold text-white mb-2">Scanning your site…</h2>
        <p className="text-slate-400">Pulling services, team, social profiles. 20–40 seconds.</p>
      </div>
    );
  }

  if (stage === "url-or-startup") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-2xl border border-white/[0.08] bg-slate-800/50 p-8">
          <h2 className="text-2xl font-bold text-white mb-3">Get your free preview in 60 seconds</h2>
          <p className="text-slate-400 mb-6">
            Drop your current website URL and we&apos;ll show you exactly what a modern,
            AI-optimized redesign would look like. Free, no credit card.
          </p>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            className={input}
            placeholder="yourbusiness.com"
            onKeyDown={e => { if (e.key === "Enter") runScan(); }}
          />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <button onClick={runScan} disabled={busy} className={btn}>Scan my site &rarr;</button>
            <button onClick={() => setStage("startup-form")} className="text-amber-400 hover:text-amber-300 underline">
              I don&apos;t have a website yet
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "startup-form") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-2xl border border-white/[0.08] bg-slate-800/50 p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-1">Tell us about your business</h2>
          <p className="text-slate-400 mb-4">A few answers and we&apos;ll generate a preview site from scratch.</p>

          <F label="Business name *"><input className={input} value={startupAnswers.business_name} onChange={e => setStartupAnswers(s => ({ ...s, business_name: e.target.value }))} /></F>
          <F label="What industry / what do you sell? *"><input className={input} value={startupAnswers.industry} onChange={e => setStartupAnswers(s => ({ ...s, industry: e.target.value }))} placeholder="Plumbing, Law firm, Dental..." /></F>
          <F label="City / service area"><input className={input} value={startupAnswers.city} onChange={e => setStartupAnswers(s => ({ ...s, city: e.target.value }))} placeholder="Tampa, FL" /></F>
          <F label="Your primary service (one line) *"><input className={input} value={startupAnswers.primary_service} onChange={e => setStartupAnswers(s => ({ ...s, primary_service: e.target.value }))} placeholder="Emergency plumbing repair, 24/7" /></F>
          <F label="Who's your ideal customer?"><input className={input} value={startupAnswers.ideal_customer} onChange={e => setStartupAnswers(s => ({ ...s, ideal_customer: e.target.value }))} /></F>
          <F label="What makes you different?"><input className={input} value={startupAnswers.differentiator} onChange={e => setStartupAnswers(s => ({ ...s, differentiator: e.target.value }))} /></F>

          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button onClick={() => {
              if (!startupAnswers.business_name.trim() || !startupAnswers.industry.trim() || !startupAnswers.primary_service.trim()) {
                setError("Business name, industry, and primary service are required.");
                return;
              }
              setError("");
              setStage("contact-form");
            }} className={btn}>Continue &rarr;</button>
            <button onClick={() => { setError(""); setStage("url-or-startup"); }} className={btnSec}>Back</button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "scraped-teaser" && scraped) {
    const found = [
      scraped.business_name, scraped.phone, scraped.city,
      Array.isArray(scraped.services) && scraped.services.length > 0 ? "services" : null,
      Array.isArray(scraped.testimonials) && scraped.testimonials.length > 0 ? "testimonials" : null,
    ].filter(Boolean).length;

    return (
      <div className="mx-auto max-w-2xl px-6 py-12 space-y-6">
        <div className="rounded-2xl border border-amber-500/30 bg-slate-800/50 p-6">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold bg-amber-500/20 text-amber-400">
            ✓ Found {found} data points
          </span>
          <h2 className="mt-3 text-xl font-bold text-white">
            {scraped.business_name || "Your site"}
            {scraped.city && <span className="text-slate-400 font-normal"> · {scraped.city}</span>}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            We scanned your site. Unlock the full redesign preview below.
          </p>
        </div>
        <button onClick={() => setStage("contact-form")} className={btn + " w-full"}>
          See My Redesign →
        </button>
      </div>
    );
  }

  if (stage === "contact-form") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-2xl border border-white/[0.08] bg-slate-800/50 p-8 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Where should we send your preview?</h2>
            <p className="text-slate-400 text-sm">We&apos;ll text you a verification code to make sure we reach the right person.</p>
          </div>
          <F label="Your name"><input className={input} value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" /></F>
          <F label="Email *">
            <input type="email" className={input} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@business.com" />
            <p className="mt-1 text-xs text-slate-500">So you can sign into your dashboard to edit the site + see your leads.</p>
          </F>
          <F label="Mobile phone *"><input type="tel" className={input} value={phone} onChange={e => setPhone(e.target.value)} placeholder="(813) 555-0123" /></F>

          <label className="flex items-start gap-3 text-sm text-slate-300">
            <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 flex-shrink-0" />
            <span>{CONSENT_TEXT}</span>
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={requestOtp} disabled={busy} className={btn}>
              {busy ? "Sending code…" : "Send me my code →"}
            </button>
            <button onClick={() => { setError(""); setStage(scraped ? "scraped-teaser" : "startup-form"); }} className={btnSec}>Back</button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "otp") {
    return (
      <div className="mx-auto max-w-md px-6 py-12">
        <div className="rounded-2xl border border-white/[0.08] bg-slate-800/50 p-8 space-y-4 text-center">
          <h2 className="text-2xl font-bold text-white">Enter your code</h2>
          <p className="text-slate-400 text-sm">
            We just texted a 6-digit code to <span className="text-white font-mono">{phone}</span>.
          </p>
          <input
            inputMode="numeric"
            pattern="\d*"
            maxLength={6}
            className={`${input} text-center text-2xl tracking-[0.4em] font-mono`}
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
            onKeyDown={e => { if (e.key === "Enter") verifyCode(); }}
            autoFocus
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button onClick={verifyCode} disabled={busy || code.length !== 6} className={btn + " w-full"}>
            {busy ? "Verifying…" : "Verify & See Preview"}
          </button>
          <button onClick={resendCode} disabled={busy} className="text-amber-400 text-sm underline hover:opacity-80 disabled:opacity-40">
            Didn&apos;t get the code? Resend
          </button>
          {otpExpiresAt && (
            <p className="text-xs text-slate-500">
              Code expires at {new Date(otpExpiresAt).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
