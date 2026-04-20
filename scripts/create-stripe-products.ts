/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Stripe Products + Prices creation script.
 *
 * Reads lib/data/packages.ts and creates in Stripe:
 *   - 1 Product per tier (Basic, Smart, Voice, Full)
 *     - Monthly price ($priceMonthly/mo)
 *     - Annual price ($priceAnnual/yr, billed as 10× monthly = 2 months free)
 *   - 1 Product per add-on (Domain, Content Velocity, Client Reactivation, Guided GBP)
 *
 * All products are prefixed "Fast Digital Marketing — " so customers see the full brand
 * name in the Stripe Checkout line item (the account-level public business name applies to
 * all AISE brands, so this is where brand identity lives at checkout).
 *
 * Idempotent: re-running won't duplicate products — it looks up by metadata.slug and
 * updates/reuses existing entries.
 *
 * USAGE (from fdm-platform root):
 *   npx tsx scripts/create-stripe-products.ts
 *
 * After running, the script prints price IDs. Paste them into lib/data/packages.ts
 * under each tier's stripeMonthlyPriceId / stripeAnnualPriceId fields.
 */

import Stripe from "stripe";
import { UNIFIED_PACKAGES, ADD_ONS } from "../lib/data/packages";

// Load .env.local (Next.js loads this automatically for app routes, but tsx
// running a standalone script does not). Node 20.12+ supports loadEnvFile.
try {
  process.loadEnvFile(".env.local");
} catch {
  // File not found or Node version too old — fall back to whatever env vars
  // are already set (e.g. in a CI environment).
}

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("❌ STRIPE_SECRET_KEY is not set. Add it to .env.local and try again.");
  process.exit(1);
}

const stripe = new Stripe(key);

// ─── Helpers ──────────────────────────────────────────────────────────────

interface StripeIds {
  productId: string;
  monthlyPriceId?: string;
  annualPriceId?: string;
  oneTimePriceId?: string;
}

/**
 * Find an existing product by metadata slug, or create a new one.
 * Returns the Stripe product.
 */
// Statement descriptor shown on customer credit-card statements for ALL FDM products.
// 5-22 ASCII chars, no special punctuation, represents the business. Overrides the
// Stripe account-level default (which belongs to a different AISE brand).
const FDM_STATEMENT_DESCRIPTOR = "FAST DIGITAL MKT";

async function upsertProduct(args: {
  slug: string;
  name: string;
  description: string;
  brand: string;
}): Promise<Stripe.Product> {
  // Search by metadata — paginate if needed
  const existing = await stripe.products.search({
    query: `metadata['slug']:'${args.slug}' AND metadata['brand']:'${args.brand}'`,
  });

  if (existing.data.length > 0) {
    console.log(`  ↻  Updating existing product: ${args.name}`);
    return await stripe.products.update(existing.data[0].id, {
      name: args.name,
      description: args.description,
      active: true,
      statement_descriptor: FDM_STATEMENT_DESCRIPTOR,
    });
  }

  console.log(`  +  Creating new product: ${args.name}`);
  return await stripe.products.create({
    name: args.name,
    description: args.description,
    statement_descriptor: FDM_STATEMENT_DESCRIPTOR,
    metadata: {
      slug: args.slug,
      brand: args.brand,
    },
  });
}

/**
 * Find an existing recurring price for a product by metadata interval,
 * or create a new one. Returns the Stripe price.
 */
async function upsertRecurringPrice(args: {
  productId: string;
  unitAmount: number;
  interval: "month" | "year";
  lookupKey: string;
}): Promise<Stripe.Price> {
  const existing = await stripe.prices.list({
    product: args.productId,
    active: true,
    type: "recurring",
    limit: 100,
  });

  const match = existing.data.find(
    (p) =>
      p.recurring?.interval === args.interval &&
      p.unit_amount === args.unitAmount &&
      p.active
  );
  if (match) {
    console.log(`      ↻  Price already exists (${args.interval}): ${match.id}`);
    return match;
  }

  // Deactivate any old prices at different amounts for same interval
  for (const old of existing.data) {
    if (old.recurring?.interval === args.interval && old.active) {
      console.log(`      ×  Deactivating old ${args.interval} price: ${old.id}`);
      await stripe.prices.update(old.id, { active: false });
    }
  }

  console.log(`      +  Creating ${args.interval} price: $${args.unitAmount / 100}`);
  return await stripe.prices.create({
    product: args.productId,
    unit_amount: args.unitAmount,
    currency: "usd",
    recurring: { interval: args.interval },
    lookup_key: args.lookupKey,
    metadata: { lookup_key: args.lookupKey },
  });
}

/**
 * Create or find a one-time price for a product.
 */
async function upsertOneTimePrice(args: {
  productId: string;
  unitAmount: number;
  lookupKey: string;
}): Promise<Stripe.Price> {
  const existing = await stripe.prices.list({
    product: args.productId,
    active: true,
    type: "one_time",
    limit: 100,
  });

  const match = existing.data.find(
    (p) => p.unit_amount === args.unitAmount && p.active && !p.recurring
  );
  if (match) {
    console.log(`      ↻  One-time price exists: ${match.id}`);
    return match;
  }

  for (const old of existing.data) {
    if (old.active && !old.recurring) {
      console.log(`      ×  Deactivating old one-time price: ${old.id}`);
      await stripe.prices.update(old.id, { active: false });
    }
  }

  console.log(`      +  Creating one-time price: $${args.unitAmount / 100}`);
  return await stripe.prices.create({
    product: args.productId,
    unit_amount: args.unitAmount,
    currency: "usd",
    lookup_key: args.lookupKey,
    metadata: { lookup_key: args.lookupKey },
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  console.log("─".repeat(72));
  console.log("FDM Stripe Catalog Setup");
  console.log("─".repeat(72));

  const results: Record<string, StripeIds> = {};

  // ── Tier products ──────────────────────────────────────────────────
  console.log("\n📦 TIERS\n");
  for (const tier of UNIFIED_PACKAGES) {
    console.log(`▸ ${tier.name}`);
    const product = await upsertProduct({
      slug: tier.slug,
      name: `Fast Digital Marketing — ${tier.name}`,
      description: tier.tagline,
      brand: "fdm",
    });

    const monthly = await upsertRecurringPrice({
      productId: product.id,
      unitAmount: tier.priceMonthly * 100,
      interval: "month",
      lookupKey: `fdm_${tier.slug}_monthly`,
    });

    const annual = await upsertRecurringPrice({
      productId: product.id,
      unitAmount: tier.priceAnnual * 100,
      interval: "year",
      lookupKey: `fdm_${tier.slug}_annual`,
    });

    results[tier.slug] = {
      productId: product.id,
      monthlyPriceId: monthly.id,
      annualPriceId: annual.id,
    };
  }

  // ── Add-on products ─────────────────────────────────────────────────
  console.log("\n🧩 ADD-ONS\n");
  for (const addOn of ADD_ONS) {
    console.log(`▸ ${addOn.name}`);
    const product = await upsertProduct({
      slug: `addon_${addOn.slug}`,
      name: `Fast Digital Marketing — ${addOn.name}`,
      description: addOn.description,
      brand: "fdm",
    });

    const price =
      addOn.unit === "monthly"
        ? await upsertRecurringPrice({
            productId: product.id,
            unitAmount: addOn.price * 100,
            interval: "month",
            lookupKey: `fdm_addon_${addOn.slug}_monthly`,
          })
        : addOn.unit === "annual"
        ? await upsertRecurringPrice({
            productId: product.id,
            unitAmount: addOn.price * 100,
            interval: "year",
            lookupKey: `fdm_addon_${addOn.slug}_annual`,
          })
        : await upsertOneTimePrice({
            productId: product.id,
            unitAmount: addOn.price * 100,
            lookupKey: `fdm_addon_${addOn.slug}_one_time`,
          });

    results[`addon_${addOn.slug}`] = {
      productId: product.id,
      [addOn.unit === "one-time" ? "oneTimePriceId" : `${addOn.unit}PriceId`]: price.id,
    } as StripeIds;
  }

  // ── Output summary ──────────────────────────────────────────────────
  console.log("\n" + "═".repeat(72));
  console.log("✅ DONE");
  console.log("═".repeat(72));
  console.log("\n📋 Paste these IDs into lib/data/packages.ts:\n");

  console.log("// Tier price IDs");
  for (const tier of UNIFIED_PACKAGES) {
    const ids = results[tier.slug];
    console.log(`\n// ${tier.name}`);
    console.log(`stripeMonthlyPriceId: "${ids.monthlyPriceId}",`);
    console.log(`stripeAnnualPriceId:  "${ids.annualPriceId}",`);
  }

  console.log("\n// Add-on price IDs");
  for (const addOn of ADD_ONS) {
    const ids = results[`addon_${addOn.slug}`];
    const priceId = ids.monthlyPriceId || ids.annualPriceId || ids.oneTimePriceId;
    console.log(`\n// ${addOn.name}`);
    console.log(`stripePriceId: "${priceId}",`);
  }

  console.log("\n" + "─".repeat(72));
  console.log("Next steps:");
  console.log("  1. Paste the IDs above into lib/data/packages.ts");
  console.log("  2. Configure the Stripe webhook endpoint at:");
  console.log("     https://dashboard.stripe.com/webhooks");
  console.log("     URL:    https://fastdigitalmarketing.com/api/webhooks/stripe");
  console.log("     Events: checkout.session.completed, customer.subscription.updated,");
  console.log("             customer.subscription.deleted, invoice.payment_succeeded");
  console.log("  3. Copy the webhook signing secret into .env.local as STRIPE_WEBHOOK_SECRET");
  console.log("─".repeat(72));
}

main().catch((err) => {
  console.error("\n❌ Script failed:");
  console.error(err);
  process.exit(1);
});
