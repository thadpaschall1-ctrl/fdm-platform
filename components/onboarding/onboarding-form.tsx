"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const INDUSTRY_OPTIONS = [
  "chiropractic","dental","medical-spa","law-firm","plumbing","HVAC",
  "roofing","electrician","security-consulting","digital-marketing","other"
];

export default function OnboardingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: "",
    phone: "",
    owner_name: "",
    owner_credentials: "",
    business_name: "",
    business_type: "local",
    industry: "chiropractic",
    year_established: "",
    short_description: "",
    street_address: "",
    city: "",
    state: "",
    zip: "",
    service_area: "",
    website_url: "",
    gbp_url: "",
    yelp_url: "",
    bbb_url: "",
    facebook_url: "",
    instagram_url: "",
    linkedin_url: "",
    youtube_url: "",
    services_text: "",
    faqs_text: "",
    testimonials_text: "",
    logo_url: "",
    primary_color: "",
    tone: "professional",
    competitor_urls_text: "",
    package_tier: "",
    notes: "",
  });

  function upd<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function parseServices(text: string) {
    return text.split("\n").map(l => l.trim()).filter(Boolean).map(line => {
      const [name, ...rest] = line.split("|");
      return { name: name.trim(), description: rest.join("|").trim() };
    });
  }
  function parseFaqs(text: string) {
    return text.split(/\n\s*\n/).map(block => {
      const q = block.match(/Q:\s*(.+)/i)?.[1]?.trim();
      const a = block.match(/A:\s*([\s\S]+)/i)?.[1]?.trim();
      return q && a ? { question: q, answer: a } : null;
    }).filter(Boolean);
  }
  function parseTestimonials(text: string) {
    return text.split(/\n\s*\n/).map(block => {
      const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) return null;
      const name = lines[0].replace(/^[-—]\s*/, "");
      const quote = lines.slice(1).join(" ");
      return { name, quote };
    }).filter(Boolean);
  }
  function parseList(text: string) {
    return text.split("\n").map(l => l.trim()).filter(Boolean);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!form.phone.trim() && !form.email.trim()) {
      setStatus("error");
      setErrorMessage("Please provide either a phone number or email so we can reach you.");
      return;
    }

    const payload = {
      brand: "fdm",
      email: form.email,
      phone: form.phone || null,
      owner_name: form.owner_name || null,
      owner_credentials: form.owner_credentials || null,
      business_name: form.business_name,
      business_type: form.business_type,
      industry: form.industry,
      year_established: form.year_established || null,
      short_description: form.short_description || null,
      street_address: form.street_address || null,
      city: form.city || null,
      state: form.state || null,
      zip: form.zip || null,
      service_area: form.service_area || null,
      website_url: form.website_url || null,
      gbp_url: form.gbp_url || null,
      yelp_url: form.yelp_url || null,
      bbb_url: form.bbb_url || null,
      facebook_url: form.facebook_url || null,
      instagram_url: form.instagram_url || null,
      linkedin_url: form.linkedin_url || null,
      youtube_url: form.youtube_url || null,
      services: parseServices(form.services_text),
      faqs: parseFaqs(form.faqs_text),
      testimonials: parseTestimonials(form.testimonials_text),
      logo_url: form.logo_url || null,
      primary_color: form.primary_color || null,
      tone: form.tone,
      competitor_urls: parseList(form.competitor_urls_text),
      package_tier: form.package_tier || null,
      notes: form.notes || null,
      source: "fdm/onboarding",
    };

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setId(data.id);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const btn = "w-full rounded-xl bg-amber-500 px-8 py-3.5 text-base font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-600 disabled:opacity-50";
  const input = "w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50";

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20">
          <svg className="h-8 w-8 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">You&apos;re in.</h1>
        <p className="text-lg text-slate-400 max-w-md mx-auto">
          Thanks for onboarding with Fast Digital Marketing. We&apos;ll review
          your info and get your build started within 24 hours.
        </p>
        {id && <p className="mt-4 text-xs text-slate-600">Ref: {id}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-10 px-6 py-12">
      <Section title="About the Business" subtitle="The basics that power your homepage and schema.">
        <Field label="Business Name *"><input required className={input} value={form.business_name} onChange={e => upd("business_name", e.target.value)} /></Field>
        <Field label="Industry"><select className={input} value={form.industry} onChange={e => upd("industry", e.target.value)}>
          {INDUSTRY_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
        </select></Field>
        <Field label="Business Type"><select className={input} value={form.business_type} onChange={e => upd("business_type", e.target.value)}>
          <option value="local">Local (one location)</option>
          <option value="multi-location">Multi-location</option>
          <option value="regional">Regional</option>
          <option value="national">National / online</option>
        </select></Field>
        <Field label="Year Established"><input className={input} value={form.year_established} onChange={e => upd("year_established", e.target.value)} placeholder="2015" /></Field>
        <Field label="Owner / Founder Name"><input className={input} value={form.owner_name} onChange={e => upd("owner_name", e.target.value)} /></Field>
        <Field label="Certifications, Awards & Licenses (optional)" full><input className={input} value={form.owner_credentials} onChange={e => upd("owner_credentials", e.target.value)} placeholder="e.g. Licensed & Insured, BBB A+ rated, Google Partner, Master Plumber #CFC123456, Best of Tampa 2024" /></Field>
        <Field label="2–3 Sentence Description" full><textarea rows={3} className={`${input} resize-none`} value={form.short_description} onChange={e => upd("short_description", e.target.value)} placeholder="What you do, who you serve, why clients pick you." /></Field>
      </Section>

      <Section title="Contact" subtitle="Where should we reach you — and the public?">
        <Field label="Phone"><input type="tel" className={input} value={form.phone} onChange={e => upd("phone", e.target.value)} placeholder="(813) 555-0123" /></Field>
        <Field label="Email (optional)"><input type="email" className={input} value={form.email} onChange={e => upd("email", e.target.value)} placeholder="you@example.com" /></Field>
        <Field label="" full><p className="text-xs text-slate-500 -mt-1">We need at least one — phone or email — so we can reach you.</p></Field>
      </Section>

      {(form.business_type === "local" || form.business_type === "multi-location") && (
        <Section title="Location" subtitle="Used for local schema, maps, and AI citations.">
          <Field label="Street Address" full><input className={input} value={form.street_address} onChange={e => upd("street_address", e.target.value)} /></Field>
          <Field label="City"><input className={input} value={form.city} onChange={e => upd("city", e.target.value)} /></Field>
          <Field label="State"><input className={input} value={form.state} onChange={e => upd("state", e.target.value)} /></Field>
          <Field label="ZIP"><input className={input} value={form.zip} onChange={e => upd("zip", e.target.value)} /></Field>
          <Field label="Service Area" full><input className={input} value={form.service_area} onChange={e => upd("service_area", e.target.value)} placeholder="Tampa Bay Area" /></Field>
        </Section>
      )}

      <Section title="Online Presence" subtitle="Any profile URL we can find you at — these become schema `sameAs`.">
        <Field label="Current Website"><input className={input} value={form.website_url} onChange={e => upd("website_url", e.target.value)} placeholder="https://..." /></Field>
        <Field label="Google Business Profile"><input className={input} value={form.gbp_url} onChange={e => upd("gbp_url", e.target.value)} /></Field>
        <Field label="Yelp"><input className={input} value={form.yelp_url} onChange={e => upd("yelp_url", e.target.value)} /></Field>
        <Field label="BBB"><input className={input} value={form.bbb_url} onChange={e => upd("bbb_url", e.target.value)} /></Field>
        <Field label="Facebook"><input className={input} value={form.facebook_url} onChange={e => upd("facebook_url", e.target.value)} /></Field>
        <Field label="Instagram"><input className={input} value={form.instagram_url} onChange={e => upd("instagram_url", e.target.value)} /></Field>
        <Field label="LinkedIn"><input className={input} value={form.linkedin_url} onChange={e => upd("linkedin_url", e.target.value)} /></Field>
        <Field label="YouTube"><input className={input} value={form.youtube_url} onChange={e => upd("youtube_url", e.target.value)} /></Field>
      </Section>

      <Section title="Content" subtitle="Feeds directly into your homepage, services, and FAQ schema.">
        <Field label="Services (one per line: Name | Description)" full>
          <textarea rows={6} className={`${input} resize-none font-mono text-sm`} value={form.services_text} onChange={e => upd("services_text", e.target.value)} placeholder={"Service Name | Short description\nAnother Service | Short description"} />
        </Field>
        <Field label="FAQs (Q: ... / A: ... with blank line between)" full>
          <textarea rows={8} className={`${input} resize-none font-mono text-sm`} value={form.faqs_text} onChange={e => upd("faqs_text", e.target.value)} placeholder={"Q: Do you take insurance?\nA: Yes, we accept...\n\nQ: Do I need a referral?\nA: No, walk-ins welcome."} />
        </Field>
        <Field label="Testimonials (Name on line 1, quote after. Blank line between.)" full>
          <textarea rows={6} className={`${input} resize-none font-mono text-sm`} value={form.testimonials_text} onChange={e => upd("testimonials_text", e.target.value)} />
        </Field>
      </Section>

      <Section title="Branding" subtitle="Optional — we pick sensible defaults if blank.">
        <Field label="Logo URL"><input className={input} value={form.logo_url} onChange={e => upd("logo_url", e.target.value)} /></Field>
        <Field label="Primary Color (hex)"><input className={input} value={form.primary_color} onChange={e => upd("primary_color", e.target.value)} placeholder="#f59e0b" /></Field>
        <Field label="Tone"><select className={input} value={form.tone} onChange={e => upd("tone", e.target.value)}>
          <option value="professional">Professional</option>
          <option value="friendly">Friendly</option>
          <option value="authoritative">Authoritative</option>
          <option value="playful">Playful</option>
        </select></Field>
        <Field label="Competitor URLs (one per line)" full>
          <textarea rows={3} className={`${input} resize-none`} value={form.competitor_urls_text} onChange={e => upd("competitor_urls_text", e.target.value)} />
        </Field>
      </Section>

      <Section title="Package & Notes">
        <Field label="Package Tier"><select className={input} value={form.package_tier} onChange={e => upd("package_tier", e.target.value)}>
          <option value="">Not sure yet</option>
          <option value="starter">Starter — Free / $49 mo</option>
          <option value="pro">Pro — $495 / $297 mo</option>
          <option value="pro-seo">Pro + SEO — $995 / $397 mo</option>
          <option value="full-stack">Full Stack — $1,747 / $497 mo</option>
        </select></Field>
        <Field label="Anything else?" full>
          <textarea rows={4} className={`${input} resize-none`} value={form.notes} onChange={e => upd("notes", e.target.value)} />
        </Field>
      </Section>

      {status === "error" && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errorMessage}
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className={btn}>
        {status === "submitting" ? "Submitting…" : "Submit to Fast Digital Marketing"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Your info is stored securely and only used to build and optimize your site.
      </p>
    </form>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/[0.08] bg-slate-800/50 p-6 sm:p-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </section>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
