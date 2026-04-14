import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient, FDM_SITE_ID } from "@/lib/supabase";
import { notifySale } from "@/lib/notify";

/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session for FDM products.
 *
 * Body: {
 *   plan: "full-report" | "starter" | "growth" | "pro",
 *   businessName: string,
 *   email: string,
 *   auditId?: string,  // link checkout to an existing audit
 * }
 *
 * Returns: { url: string } — redirect to Stripe Checkout
 */

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

// Plan configurations — prices will be created on first use or use existing IDs
const PLANS: Record<string, {
  name: string;
  mode: "payment" | "subscription";
  lineItems: { description: string; amount: number; recurring?: boolean }[];
}> = {
  "full-report": {
    name: "Full Business Report",
    mode: "payment",
    lineItems: [
      { description: "Full AI Search Optimization Report", amount: 19700 },
    ],
  },
  starter: {
    name: "Starter Plan",
    mode: "subscription",
    lineItems: [
      { description: "Starter Plan — AI Receptionist, Voice Callback, GBP", amount: 19700, recurring: true },
    ],
  },
  growth: {
    name: "Growth Plan",
    mode: "subscription",
    lineItems: [
      { description: "Growth Plan Setup Fee", amount: 29700 },
      { description: "Growth Plan — SEO, Reviews, Website + Starter", amount: 39700, recurring: true },
    ],
  },
  pro: {
    name: "Pro Plan",
    mode: "subscription",
    lineItems: [
      { description: "Pro Plan Setup Fee", amount: 49700 },
      { description: "Pro Plan — Ads, Social, Strategy + Growth", amount: 69700, recurring: true },
    ],
  },
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { plan, businessName, email, auditId } = body;

  if (!plan || !PLANS[plan]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const planConfig = PLANS[plan];
  const stripe = getStripe();

  try {
    // Build line items dynamically using Stripe price_data
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = planConfig.lineItems.map((item) => {
      if (item.recurring) {
        return {
          price_data: {
            currency: "usd",
            product_data: { name: item.description },
            unit_amount: item.amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        };
      }
      return {
        price_data: {
          currency: "usd",
          product_data: { name: item.description },
          unit_amount: item.amount,
        },
        quantity: 1,
      };
    });

    // Determine mode — if any item is recurring, use subscription
    const hasRecurring = planConfig.lineItems.some((i) => i.recurring);
    const mode = hasRecurring ? "subscription" : "payment";

    const successUrl = plan === "full-report" && auditId
      ? `https://fastdigitalmarketing.com/audit/full-report?id=${auditId}&checkout=success`
      : `https://fastdigitalmarketing.com/checkout/success?plan=${plan}`;

    const session = await stripe.checkout.sessions.create({
      mode,
      customer_email: email,
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: `https://fastdigitalmarketing.com/checkout/cancel`,
      metadata: {
        plan,
        businessName: businessName || "",
        auditId: auditId || "",
        site: "fdm",
      },
      allow_promotion_codes: true,
    });

    // Log to Supabase
    try {
      const db = createAdminClient();
      await db.from("orders").insert({
        site_id: FDM_SITE_ID,
        stripe_session_id: session.id,
        plan,
        business_name: businessName || "",
        email,
        audit_id: auditId || null,
        status: "pending",
        amount_cents: planConfig.lineItems.reduce((sum, i) => sum + i.amount, 0),
      });
    } catch {
      // Don't block checkout if DB write fails
    }

    // Notify
    notifySale({
      businessName: businessName || "Unknown",
      email,
      plan: planConfig.name,
      amount: plan === "full-report" ? "$197" : `$${(planConfig.lineItems.find(i => i.recurring)?.amount || 0) / 100}/mo`,
    }).catch(() => {});

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
