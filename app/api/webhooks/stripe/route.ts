import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient, FDM_SITE_ID } from "@/lib/supabase";
import { UNIFIED_PACKAGES, PackageSlug } from "@/lib/data/packages";

/**
 * Stripe webhook handler for FDM.
 *
 * Processes:
 *   - checkout.session.completed      → creates fdm_customers row
 *   - customer.subscription.updated   → syncs tier + status
 *   - customer.subscription.deleted   → marks canceled
 *   - invoice.payment_succeeded       → updates current_period_end
 *   - invoice.payment_failed          → marks past_due
 *
 * All events are logged to fdm_stripe_events for an audit trail.
 *
 * SETUP:
 *   1. In the Stripe dashboard, add an endpoint at:
 *      https://fastdigitalmarketing.com/api/webhooks/stripe
 *   2. Subscribe to the events listed above.
 *   3. Copy the signing secret into .env.local as STRIPE_WEBHOOK_SECRET.
 */

// Next.js 16: disable body parsing so Stripe signature verification works.
export const runtime = "nodejs";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

// Look up which FDM tier a Stripe price ID belongs to, by matching
// the lookup_key metadata we set in the setup script.
function tierFromPriceId(priceId: string, lookupKey?: string | null): PackageSlug | null {
  // Preferred: parse from lookup_key like "fdm_smart_monthly"
  if (lookupKey) {
    const match = lookupKey.match(/^fdm_(basic|smart|voice|full)_/);
    if (match) return match[1] as PackageSlug;
  }
  // Fallback: match against stored stripeMonthlyPriceId / stripeAnnualPriceId
  for (const tier of UNIFIED_PACKAGES) {
    if (tier.stripeMonthlyPriceId === priceId || tier.stripeAnnualPriceId === priceId) {
      return tier.slug;
    }
  }
  return null;
}

function intervalFromPriceId(lookupKey?: string | null): "month" | "year" | null {
  if (!lookupKey) return null;
  if (lookupKey.endsWith("_monthly")) return "month";
  if (lookupKey.endsWith("_annual")) return "year";
  return null;
}

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const db = createAdminClient();

  // Log the raw event first — idempotent via primary key (Stripe event IDs are unique)
  await db.from("fdm_stripe_events").upsert(
    {
      id: event.id,
      site_id: FDM_SITE_ID,
      type: event.type,
      payload: event as unknown as object,
    },
    { onConflict: "id" }
  );

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Only handle FDM sessions (metadata set in /api/checkout)
        if (session.metadata?.site !== "fdm") break;

        const email = session.customer_email || session.customer_details?.email;
        if (!email) {
          console.warn("[stripe-webhook] checkout.session.completed without email");
          break;
        }

        // Fetch line items with price expansion
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ["data.price"],
          limit: 10,
        });

        const primary = lineItems.data[0];
        const price = primary?.price as Stripe.Price | undefined;
        const tier = price ? tierFromPriceId(price.id, price.lookup_key ?? null) : null;
        const interval = price ? intervalFromPriceId(price.lookup_key ?? null) : null;

        const customerId = typeof session.customer === "string"
          ? session.customer
          : session.customer?.id;
        const subscriptionId = typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id;

        // Upsert into fdm_customers — keyed by email for first-time customers
        const { data: existing } = await db
          .from("fdm_customers")
          .select("id")
          .eq("site_id", FDM_SITE_ID)
          .eq("email", email)
          .maybeSingle();

        const row = {
          site_id: FDM_SITE_ID,
          email,
          stripe_customer_id: customerId ?? null,
          stripe_subscription_id: subscriptionId ?? null,
          stripe_price_id: price?.id ?? null,
          tier,
          billing_interval: interval,
          subscription_status: (session.payment_status === "paid"
            ? "active"
            : "incomplete") as string,
          business_name: session.metadata?.businessName || null,
          onboarding_status: "pending" as const,
        };

        if (existing?.id) {
          await db.from("fdm_customers").update(row).eq("id", existing.id);
        } else {
          await db.from("fdm_customers").insert(row);
        }

        console.log(`[stripe-webhook] Customer provisioned: ${email} (${tier || "unknown tier"})`);
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;

        const priceId = sub.items.data[0]?.price.id;
        const lookupKey = sub.items.data[0]?.price.lookup_key ?? null;
        const tier = priceId ? tierFromPriceId(priceId, lookupKey) : null;
        const interval = intervalFromPriceId(lookupKey);

        await db
          .from("fdm_customers")
          .update({
            subscription_status: sub.status,
            stripe_price_id: priceId ?? null,
            tier,
            billing_interval: interval,
            current_period_end: new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000).toISOString(),
            canceled_at: sub.canceled_at
              ? new Date(sub.canceled_at * 1000).toISOString()
              : null,
          })
          .eq("site_id", FDM_SITE_ID)
          .eq("stripe_subscription_id", sub.id);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await db
          .from("fdm_customers")
          .update({
            subscription_status: "canceled",
            canceled_at: new Date().toISOString(),
          })
          .eq("site_id", FDM_SITE_ID)
          .eq("stripe_subscription_id", sub.id);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = typeof (invoice as unknown as { subscription?: string | Stripe.Subscription }).subscription === "string"
          ? (invoice as unknown as { subscription: string }).subscription
          : (invoice as unknown as { subscription?: Stripe.Subscription }).subscription?.id;
        if (!subscriptionId) break;
        await db
          .from("fdm_customers")
          .update({ subscription_status: "active" })
          .eq("site_id", FDM_SITE_ID)
          .eq("stripe_subscription_id", subscriptionId);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = typeof (invoice as unknown as { subscription?: string | Stripe.Subscription }).subscription === "string"
          ? (invoice as unknown as { subscription: string }).subscription
          : (invoice as unknown as { subscription?: Stripe.Subscription }).subscription?.id;
        if (!subscriptionId) break;
        await db
          .from("fdm_customers")
          .update({ subscription_status: "past_due" })
          .eq("site_id", FDM_SITE_ID)
          .eq("stripe_subscription_id", subscriptionId);
        break;
      }

      default:
        // Event logged but not handled — no action needed.
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`[stripe-webhook] Error processing ${event.type}:`, err);
    // Record the error on the event row but still return 200 so Stripe doesn't
    // hammer us with retries for bugs we can't fix in-flight.
    await db
      .from("fdm_stripe_events")
      .update({ error: err instanceof Error ? err.message : String(err) })
      .eq("id", event.id);
    return NextResponse.json({ received: true, error: "logged" });
  }
}
