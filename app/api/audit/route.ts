import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, FDM_SITE_ID } from "@/lib/supabase";
import { notifyAudit } from "@/lib/notify";
import { checkRateLimit, getClientIp, validateEmail, honeypotFilled } from "@/lib/bot-protection";
import { randomUUID } from "crypto";

// ── Types ────────────────────────────────────────────────────────────────────

type CategoryResult = {
  grade: string;
  score: number;
  findings: string[];
  recommendation: string;
  serviceName: string;
  serviceLink: string;
};

type AuditResult = {
  auditId: string;
  businessName: string;
  niche: string;
  cityState: string;
  websiteUrl: string;
  email: string;
  phone: string;
  overallGrade: string;
  overallScore: number;
  categories: {
    googleReputation: CategoryResult;
    websiteQuality: CategoryResult;
    seoHealth: CategoryResult;
    aiSearchReadiness: CategoryResult;
    onlineVisibility: CategoryResult;
    leadCapture: CategoryResult;
  };
  createdAt: string;
};

// ── In-memory store (survives hot-reload in dev) ─────────────────────────────

const g = globalThis as typeof globalThis & {
  __fdmAuditStore?: Map<string, AuditResult>;
};
function getStore(): Map<string, AuditResult> {
  if (!g.__fdmAuditStore) g.__fdmAuditStore = new Map();
  return g.__fdmAuditStore;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function scoreToGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 45) return "D";
  return "F";
}

async function fetchWebsite(url: string): Promise<string | null> {
  if (!url) return null;
  try {
    const normalized = url.startsWith("http") ? url : `https://${url}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(normalized, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; FDMAuditBot/1.0)" },
    });
    clearTimeout(timeout);
    return (await res.text()).toLowerCase();
  } catch {
    return null;
  }
}

// ── Category Checks ─────────────────────────────────────────────────────────

async function checkGoogleReputation(businessName: string, cityState: string): Promise<CategoryResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const findings: string[] = [];
  let score = 0;

  try {
    const query = encodeURIComponent(`${businessName} ${cityState}`);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
    const res = await fetch(url);
    const json = await res.json();
    const place = json.results?.[0];

    if (place) {
      const rating: number = place.rating ?? 0;
      const reviewCount: number = place.user_ratings_total ?? 0;

      let ratingScore = 40;
      if (rating >= 5) ratingScore = 100;
      else if (rating >= 4) ratingScore = 80;
      else if (rating >= 3) ratingScore = 60;

      let reviewScore = 40;
      if (reviewCount >= 200) reviewScore = 100;
      else if (reviewCount >= 100) reviewScore = 80;
      else if (reviewCount >= 50) reviewScore = 60;

      score = Math.round((ratingScore + reviewScore) / 2);
      findings.push(`Google rating: ${rating} stars`);
      findings.push(`Total reviews: ${reviewCount}`);
      if (rating < 4.5) findings.push("Rating below 4.5 — losing customers to competitors");
      if (reviewCount < 100) findings.push("Fewer than 100 reviews hurts local search ranking");
      if (rating >= 4.5) findings.push("Strong rating — keep it consistent");
    } else {
      score = 20;
      findings.push("Business not found on Google — critical visibility gap");
      findings.push("No Google Business Profile detected");
    }
  } catch {
    score = 30;
    findings.push("Unable to retrieve Google data");
  }

  return {
    grade: scoreToGrade(score),
    score,
    findings,
    recommendation: score >= 75
      ? "Your reputation is strong. Automate review collection to stay ahead of competitors."
      : "You're losing customers to competitors with more reviews. Start collecting reviews automatically after every job.",
    serviceName: "Review Autopilot",
    serviceLink: "/services/review-autopilot",
  };
}

async function checkWebsiteQuality(html: string | null): Promise<CategoryResult> {
  const findings: string[] = [];
  let score = 0;

  if (!html) {
    return {
      grade: "F", score: 0,
      findings: ["No website URL provided or site unreachable"],
      recommendation: "A professional website is essential for converting visitors into customers.",
      serviceName: "Smart Website", serviceLink: "/services/smart-website",
    };
  }

  if (html.includes('name="viewport"') || html.includes("name='viewport'")) { score += 25; findings.push("Mobile-optimized — good"); }
  else findings.push("Missing mobile viewport — most customers search on phones");

  if (/book|appointment|schedule|reserve/i.test(html)) { score += 25; findings.push("Online booking detected"); }
  else findings.push("No online booking — customers can't book after hours");

  if (/chat|widget|messenger|intercom|drift/i.test(html)) { score += 25; findings.push("Chat widget detected"); }
  else findings.push("No chat widget — missing real-time customer engagement");

  if (html.includes("https://")) { score += 25; findings.push("SSL certificate active"); }
  else findings.push("No SSL detected — hurts trust and search ranking");

  return {
    grade: scoreToGrade(score), score, findings,
    recommendation: score >= 75
      ? "Your website has solid fundamentals. Add AI chat and call tracking to capture more leads."
      : "Your website is losing customers before they call. Upgrade to a fast, conversion-focused smart site.",
    serviceName: "Smart Website", serviceLink: "/services/smart-website",
  };
}

async function checkSeoHealth(html: string | null): Promise<CategoryResult> {
  const findings: string[] = [];
  let score = 0;

  if (!html) {
    return {
      grade: "F", score: 0,
      findings: ["Website not accessible for SEO analysis"],
      recommendation: "SEO fundamentals are required to show up in local search.",
      serviceName: "Local SEO & AI Search", serviceLink: "/services/local-seo-ai",
    };
  }

  if (/<title[^>]*>[^<]+<\/title>/i.test(html)) { score += 25; findings.push("Title tag present"); }
  else findings.push("Missing title tag — critical SEO issue");

  if (/<meta[^>]+name=["']description["'][^>]*content=["'][^"']+["']/i.test(html)) { score += 25; findings.push("Meta description present"); }
  else findings.push("Missing meta description — reduces click-through from search");

  if (/<h1[^>]*>[^<]+<\/h1>/i.test(html)) { score += 25; findings.push("H1 tag present"); }
  else findings.push("Missing H1 tag — weakens on-page SEO");

  if (/schema\.org/i.test(html) || /"@type"/i.test(html)) { score += 25; findings.push("Schema.org markup detected"); }
  else findings.push("No schema markup — missing structured data for rich search results");

  return {
    grade: scoreToGrade(score), score, findings,
    recommendation: score >= 75
      ? "SEO foundation is solid. Focus on local keyword optimization and backlinks."
      : "Multiple SEO issues are preventing you from ranking. A properly built site fixes these automatically.",
    serviceName: "Local SEO & AI Search", serviceLink: "/services/local-seo-ai",
  };
}

async function checkAiSearchReadiness(html: string | null): Promise<CategoryResult> {
  const findings: string[] = [];
  let score = 0;

  if (!html) {
    return {
      grade: "F", score: 0,
      findings: ["Website not accessible for AI search analysis"],
      recommendation: "AI search engines (ChatGPT, Perplexity) are sending customers to businesses with structured content.",
      serviceName: "Smart Website", serviceLink: "/services/smart-website",
    };
  }

  if (/faq|frequently asked/i.test(html)) { score += 25; findings.push("FAQ section detected — good for AI search"); }
  else findings.push("No FAQ section — AI search engines prefer Q&A content");

  if (/"@type"/i.test(html) || /schema\.org/i.test(html)) { score += 25; findings.push("Structured data present"); }
  else findings.push("No structured data — AI can't easily parse your content");

  if (/localbusiness|professionalservice|localservice/i.test(html)) { score += 25; findings.push("Local business schema detected"); }
  else findings.push("No local business schema — missing key AI ranking signal");

  if (/address|location|serving|near|city|state/i.test(html)) { score += 25; findings.push("Location information present"); }
  else findings.push("Location context missing — hurts local AI search results");

  return {
    grade: scoreToGrade(score), score, findings,
    recommendation: score >= 75
      ? "Good AI search foundation. Add more FAQ content to capture voice search queries."
      : "You're invisible to AI search assistants. People asking ChatGPT for businesses like yours won't find you.",
    serviceName: "Smart Website", serviceLink: "/services/smart-website",
  };
}

async function checkOnlineVisibility(businessName: string, cityState: string): Promise<CategoryResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const findings: string[] = [];
  let score = 0;

  try {
    const query = encodeURIComponent(`${businessName} ${cityState}`);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
    const res = await fetch(url);
    const json = await res.json();
    const place = json.results?.[0];

    if (place) {
      score += 25; findings.push("Business found in Google search results");
      const photoCount: number = place.photos?.length ?? 0;
      if (photoCount > 0) { score += 25; findings.push(`${photoCount} photos on Google profile`); }
      else findings.push("No photos — profiles with photos get 42% more requests");

      if (place.formatted_address || place.website) { score += 25; findings.push("Website listed on Google profile"); }
      else findings.push("No website on Google profile — missing traffic opportunity");

      if (place.opening_hours) { score += 25; findings.push("Business hours listed"); }
      else findings.push("No hours listed — customers don't know when you're open");
    } else {
      findings.push("Business not found in Google Maps");
      findings.push("No photos, hours, or website detected");
      findings.push("Missing from local search entirely");
    }
  } catch {
    score = 30;
    findings.push("Unable to check online visibility");
  }

  return {
    grade: scoreToGrade(score), score, findings,
    recommendation: score >= 75
      ? "Good visibility. Weekly posts and photo uploads will push you into the top 3 Map Pack."
      : "You're not showing up where customers look. GBP Optimization puts you on the map — literally.",
    serviceName: "GBP Optimization", serviceLink: "/services/gbp-optimization",
  };
}

async function checkLeadCapture(html: string | null): Promise<CategoryResult> {
  const findings: string[] = [];
  let score = 0;

  if (!html) {
    return {
      grade: "F", score: 0,
      findings: ["Website not accessible for lead capture analysis"],
      recommendation: "Without a website, you have no way to capture leads online.",
      serviceName: "Voice AI Callback", serviceLink: "/services/voice-ai-callback",
    };
  }

  if (/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|tel:/i.test(html)) { score += 25; findings.push("Phone number visible on website"); }
  else findings.push("No phone number found — customers can't easily call you");

  if (/contact.*form|form.*contact|<form/i.test(html)) { score += 25; findings.push("Contact form detected"); }
  else findings.push("No contact form — losing after-hours inquiries");

  if (/book|appointment|schedule|reserve/i.test(html)) { score += 25; findings.push("Booking functionality detected"); }
  else findings.push("No online booking — 40% of bookings happen outside office hours");

  if (/call now|get started|free consult|schedule now|book now|contact us/i.test(html)) { score += 25; findings.push("Call-to-action buttons present"); }
  else findings.push("Weak or missing CTAs — visitors leave without taking action");

  return {
    grade: scoreToGrade(score), score, findings,
    recommendation: score >= 75
      ? "Good capture setup. Add Voice AI Callback to recover every missed caller — AI calls them back in 60 seconds."
      : "You're getting traffic but not converting it. Every missed call is a lost customer.",
    serviceName: "Voice AI Callback", serviceLink: "/services/voice-ai-callback",
  };
}

// ── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    businessName = "",
    niche = "",
    cityState = "",
    websiteUrl = "",
    email = "",
    phone = "",
  } = body;

  // ── Bot protection ──────────────────────────────────────────

  // Honeypot: silently eat requests that fill hidden fields
  if (honeypotFilled(body)) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Email validation: syntax, disposable, obfuscation
  const emailCheck = validateEmail(email);
  if (!emailCheck.ok) {
    return NextResponse.json(
      { error: "Please enter a valid business email address." },
      { status: 400 }
    );
  }

  // Rate limit: 3 audits per IP per day
  const ip = getClientIp(request);
  const rl = await checkRateLimit(ip, "fdm.audit", 3, 60 * 24);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "You've reached today's audit limit. Please try again tomorrow." },
      { status: 429 }
    );
  }

  // ── Field validation ────────────────────────────────────────

  if (!businessName || !cityState || !email) {
    return NextResponse.json({ error: "Business name, city/state, and email are required." }, { status: 400 });
  }

  // Fetch website once, share across checks
  const html = await fetchWebsite(websiteUrl);

  // Run all 6 checks in parallel
  const [googleReputation, websiteQuality, seoHealth, aiSearchReadiness, onlineVisibility, leadCapture] =
    await Promise.all([
      checkGoogleReputation(businessName, cityState),
      checkWebsiteQuality(html),
      checkSeoHealth(html),
      checkAiSearchReadiness(html),
      checkOnlineVisibility(businessName, cityState),
      checkLeadCapture(html),
    ]);

  const scores = [
    googleReputation.score,
    websiteQuality.score,
    seoHealth.score,
    aiSearchReadiness.score,
    onlineVisibility.score,
    leadCapture.score,
  ];
  const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const overallGrade = scoreToGrade(overallScore);

  const auditId = randomUUID();
  const result: AuditResult = {
    auditId,
    businessName,
    niche,
    cityState,
    websiteUrl,
    email,
    phone,
    overallGrade,
    overallScore,
    categories: { googleReputation, websiteQuality, seoHealth, aiSearchReadiness, onlineVisibility, leadCapture },
    createdAt: new Date().toISOString(),
  };

  // Store in memory for immediate retrieval
  getStore().set(auditId, result);

  // 1. Persist to Supabase (source of truth)
  try {
    const db = createAdminClient();
    await db.from("audit_results").insert({
      id: auditId,
      site_id: FDM_SITE_ID,
      practice_name: businessName,
      city_state: cityState,
      website_url: websiteUrl,
      email,
      phone,
      overall_grade: overallGrade,
      overall_score: overallScore,
      categories: result.categories,
    });
  } catch (err) {
    console.error("[audit] Supabase write failed:", err);
  }

  // 2. Notify Thad (email + SMS when available)
  notifyAudit({
    businessName,
    niche,
    cityState,
    email,
    phone,
    overallGrade,
    overallScore,
  }).catch((err) => console.error("[audit] Notification failed:", err));

  return NextResponse.json({ auditId });
}

// ── GET handler (fetch results by ID) ────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  // Try in-memory first
  const stored = getStore().get(id);
  if (stored) return NextResponse.json(stored);

  // Fall back to Supabase
  try {
    const db = createAdminClient();
    const { data } = await db
      .from("audit_results")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (data) {
      return NextResponse.json({
        auditId: data.id,
        businessName: data.practice_name,
        cityState: data.city_state,
        websiteUrl: data.website_url,
        email: data.email,
        phone: data.phone,
        overallGrade: data.overall_grade,
        overallScore: data.overall_score,
        categories: data.categories,
        createdAt: data.created_at,
      });
    }
  } catch (err) {
    console.error("[audit] Supabase read failed:", err);
  }

  return NextResponse.json({ error: "Audit not found" }, { status: 404 });
}
