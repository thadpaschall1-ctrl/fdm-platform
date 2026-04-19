import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient, FDM_SITE_ID } from "@/lib/supabase";
import { notifySale } from "@/lib/notify";
import { UNIFIED_PACKAGES, PackageSlug } from "@/lib/data/packages";

/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session for FDM purchases. Accepts two body shapes:
 *
 * 1) New subscription flow (preferred):
 *    { tier: PackageSlug, interval: "month" | "year", email, businessName?, auditId? }
 *
 * 2) Legacy plan-based shape (still supported so existing buttons keep working):
 *    { plan: "basic" | "smart" | "voice" | "full" | "full-report", email, businessName?, auditId? }
 *    - "full-report" → one-time $97 full audit purchase
 *    - any tier slug → monthly subscription to that tier
 *
 * Returns: { url: string } — redirect URL to Stripe Checkout.
 */

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

const FULL_AUDIT_PRICE_CENTS = 9700; // $97 one-time — paid Full Business Audit

function resolveTierPriceId(tier: PackageSlug, interval: "month" | "year"): string | null {
  const t = UNIFIED_PACKAGES.find((p) => p.slug === tier);
  if (!t) return null;
  return interval === "year"
    ? (t.stripeAnnualPriceId ?? null)
    : (t.stripeMonthlyPriceId ?? null);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const {
    tier: rawTier,
    interval: rawInterval,
    plan,
    email,
    businessName,
    auditId,
  } = body as {
    tier?: PackageSlug;
    interval?: "month" | "year";
    plan?: string;
    email?: string;
    businessName?: string;
    auditId?: string;
  };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const stripe = getStripe();

  // ── Route 1: One-time Full Audit purchase ───────────────────────────
  if (plan === "full-report") {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "FDM — Full Business Audit",
                description:
                  "Deep-dive audit with page-by-page analysis, competitor benchmarking, and actionable recommendations. Delivered as a 20+ page PDF report.",
              },
              unit_amount: FULL_AUDIT_PRICE_CENTS,
            },
            quantity: 1,
          },
        ],
        success_url:
          auditId
            ? `https://fastdigitalmarketing.com/audit/full-report?id=${auditId}&checkout=success`
            : `https://fastdigitalmarketing.com/checkout/success?type=full-audit`,
        cancel_url: "https://fastdigitalmarketing.com/checkout/cancel",
        allow_promotion_codes: true,
        payment_intent_data: {
          statement_descriptor: "FAST DIGITAL MKT",
          description: "Fast Digital Marketing — Full Business Audit",
        },
        metadata: {
          site: "fdm",
          product: "full-audit",
          businessName: businessName || "",
          auditId: auditId || "",
        },
      });

      try {
        const db = createAdminClient();
        await db.from("orders").insert({
          site_id: FDM_SITE_ID,
          stripe_session_id: session.id,
          plan: "full-report",
          business_name: businessName || "",
          email,
          audit_id: auditId || null,
          status: "pending",
          amount_cents: FULL_AUDIT_PRICE_CENTS,
        });
      } catch {
        /* non-blocking */
      }

      notifySale({
        businessName: businessName || "Unknown",
        email,
        plan: "Full Business Audit",
        amount: "$97",
      }).catch(() => {});

      return NextResponse.json({ url: session.url });
    } catch (err) {
      console.error("[checkout] full-audit error:", err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Checkout failed" },
        { status: 500 }
      );
    }
  }

  // ── Route 2: Subscription (4 tiers) ──────────────────────────────────
  // Resolve tier from either new (`tier`) or legacy (`plan`) body shape.
  const tierCandidate = (rawTier || plan) as string | undefined;
  const tier = UNIFIED_PACKAGES.find((p) => p.slug === tierCandidate)?.slug;
  if (!tier) {
    return NextResponse.json(
      {
        error:
          "Invalid tier. Pass tier: 'basic' | 'smart' | 'voice' | 'full' or plan: 'full-report' for one-time audit.",
      },
      { status: 400 }
    );
  }
  const billingInterval = rawInterval === "year" ? "year" : "month";

  const priceId = resolveTierPriceId(tier, billingInterval);
  if (!priceId) {
    return NextResponse.json(
      {
        error:
          "Price not configured. Run `npm run setup-stripe` to populate Stripe price IDs in lib/data/packages.ts.",
      },
      { status: 500 }
    );
  }

  const tierConfig = UNIFIED_PACKAGES.find((p) => p.slug === tier)!;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `https://fastdigitalmarketing.com/checkout/success?tier=${tier}&interval=${billingInterval}`,
      cancel_url: `https://fastdigitalmarketing.com/checkout/cancel?tier=${tier}`,
      allow_promotion_codes: true,
      subscription_data: {
        description: `Fast Digital Marketing — ${tierConfig.name} (${
          billingInterval === "year" ? "annual" : "monthly"
        })`,
        metadata: {
          site: "fdm",
          tier,
          interval: billingInterval,
          auditId: auditId || "",
        },
      },
      metadata: {
        site: "fdm",
        tier,
        interval: billingInterval,
        businessName: businessName || "",
        auditId: auditId || "",
      },
    });

    try {
      const db = createAdminClient();
      await db.from("orders").insert({
        site_id: FDM_SITE_ID,
        stripe_session_id: session.id,
        plan: tier,
        business_name: businessName || "",
        email,
        audit_id: auditId || null,
        status: "pending",
        amount_cents:
          (billingInterval === "year" ? tierConfig.priceAnnual : tierConfig.priceMonthly) * 100,
      });
    } catch {
      /* non-blocking */
    }

    notifySale({
      businessName: businessName || "Unknown",
      email,
      plan: tierConfig.name,
      amount:
        billingInterval === "year"
          ? `$${tierConfig.priceAnnual}/yr`
          : `$${tierConfig.priceMonthly}/mo`,
    }).catch(() => {});

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] subscription error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
