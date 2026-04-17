/**
 * Bot protection for public forms (audit, callback, etc.)
 *
 * Three layers:
 *  1. Per-IP rate limit via the shared `rate_limits` Supabase table
 *  2. Email validation (syntax + disposable blacklist + obfuscation patterns)
 *  3. Honeypot field check (hidden in the form, real users don't fill it)
 */

import type { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase";

// ── 1. Rate limit ──────────────────────────────────────────────

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

interface RateLimitResult {
  allowed: boolean;
  count: number;
  limit: number;
}

export async function checkRateLimit(
  ip: string,
  endpoint: string,
  limit: number,
  windowMinutes: number
): Promise<RateLimitResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createAdminClient() as any;
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);

  const { count } = await db
    .from("rate_limits")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .eq("endpoint", endpoint)
    .gte("created_at", windowStart.toISOString());

  const current = count || 0;
  const allowed = current < limit;

  if (allowed) {
    void db.from("rate_limits").insert({ ip, endpoint });
  }

  return { allowed, count: current, limit };
}

// ── 2. Email validation ────────────────────────────────────────

const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com","10minutemail.net","guerrillamail.com","guerrillamail.biz",
  "guerrillamail.de","guerrillamail.info","guerrillamail.net","guerrillamail.org",
  "mailinator.com","mailinator.net","mailinator.org","yopmail.com","yopmail.net",
  "sharklasers.com","grr.la","trashmail.com","trashmail.net","trashmail.de",
  "temp-mail.org","tempmail.com","tempmail.net","tempmailaddress.com",
  "throwaway.email","throwawaymail.com","getairmail.com","fakemail.net",
  "maildrop.cc","spam4.me","spambox.us","mohmal.com","inboxbear.com",
  "emailondeck.com","burnermail.io","dispostable.com","mytrashmail.com",
  "mintemail.com","mvrht.com","spamgourmet.com","spamex.com","jetable.org",
  "anonbox.net","discardmail.com","haltospam.com","mailforspam.com",
  "tmail.ws","tmail.io","tmails.net","e4ward.com","moakt.com","moakt.cc",
  "nada.email","mailnesia.com","trbvm.com","shitmail.org","nepwk.com",
]);

const SYNTAX_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

export interface EmailValidation {
  ok: boolean;
  reason?: "invalid_syntax" | "disposable" | "obfuscated" | "empty";
}

/**
 * Validates email. Flags bot-classic dot-obfuscation patterns like
 * "o.se.xu.gic.e.z3.4.0@gmail.com" where a human would just write "osexugic340".
 */
export function validateEmail(email: string | null | undefined): EmailValidation {
  if (!email || email.trim() === "") return { ok: false, reason: "empty" };

  const normalized = email.trim().toLowerCase();
  if (!SYNTAX_REGEX.test(normalized)) return { ok: false, reason: "invalid_syntax" };

  const [local, domain] = normalized.split("@");
  if (DISPOSABLE_DOMAINS.has(domain)) return { ok: false, reason: "disposable" };

  // Bot-obfuscation: many dots AND short segments between them (spam signature)
  // e.g. "o.se.xu.gic.e.z3.4.0" has 7 dots and most segments are 1-3 chars.
  const dotCount = (local.match(/\./g) || []).length;
  if (dotCount >= 4) {
    const segments = local.split(".");
    const shortSegments = segments.filter(s => s.length <= 2).length;
    if (shortSegments >= 3) return { ok: false, reason: "obfuscated" };
  }

  return { ok: true };
}

// ── 3. Honeypot ────────────────────────────────────────────────

/**
 * Returns true if the submission should be rejected (honeypot field was filled).
 * Add a hidden `website_confirm` (or similar) input to every public form;
 * real users won't fill it, bots will.
 */
export function honeypotFilled(body: Record<string, unknown>): boolean {
  const honeypotFields = ["website_confirm", "company_url", "fax", "_hp"];
  return honeypotFields.some(f => {
    const v = body[f];
    return typeof v === "string" && v.trim().length > 0;
  });
}
