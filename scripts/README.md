# FDM Scripts

## Setup sequence for first-time deployment

Run these **in order** to get FDM from zero to accepting-real-signups.

---

### 1. Run the Supabase migration

Open the Supabase SQL Editor (project `qlgvoebiyixwsabtxlwp`) and run the contents of:

```
supabase/migrations/20260419_fdm_customers.sql
```

This creates:
- `fdm_customers` — the core customer table
- `fdm_addons` — tracks add-on subscriptions per customer
- `fdm_stripe_events` — audit trail of every Stripe webhook processed
- Three enums (`fdm_tier`, `fdm_onboarding_status`, `fdm_subscription_status`)
- Row-level security policies so customers can read their own row once signed in

Verify with:

```sql
SELECT table_name FROM information_schema.tables
WHERE table_name LIKE 'fdm_%';
```

Should return 3 rows.

---

### 2. Create Stripe products + prices

Make sure `STRIPE_SECRET_KEY` is set in `.env.local` (the live key `sk_live_...`, same one used across AISE brands).

Install dependencies if you haven't yet:

```powershell
cd C:\Users\tpasc\fdm-platform
npm install
```

Then run:

```powershell
npm run setup-stripe
```

This reads `lib/data/packages.ts` and creates in Stripe:
- 4 subscription products (Basic / Smart / Voice / Full) × 2 prices each (monthly + annual) = **8 subscription prices**
- 4 add-on products (Domain / Content Velocity / Client Reactivation / Guided GBP) = **4 add-on prices**

All products are prefixed `FDM — ` so they're easy to find in the Stripe dashboard alongside GYCP / callmabel products.

**Idempotent** — re-running won't duplicate anything. It looks up by metadata and updates/reuses existing entries.

When the script finishes it prints price IDs like:

```
// Basic Website
stripeMonthlyPriceId: "price_1QxxxxxxxxxxxxxxxxBasic",
stripeAnnualPriceId:  "price_1QxxxxxxxxxxxxxxxxBasic",
```

**Copy-paste each `stripeMonthlyPriceId` and `stripeAnnualPriceId` into the matching tier object in `lib/data/packages.ts`.** Commit and push after.

---

### 3. Configure the Stripe webhook endpoint

In the [Stripe dashboard](https://dashboard.stripe.com/webhooks):

1. Click **Add endpoint**
2. URL: `https://fastdigitalmarketing.com/api/webhooks/stripe`
3. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Click **Add endpoint**
5. Copy the **Signing secret** (starts with `whsec_...`)
6. Add to `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
7. Add the same value to Vercel project env vars (Production + Preview)
8. Redeploy so the webhook handler sees the secret

---

### 4. Smoke test

From an incognito browser:

1. Go to https://fastdigitalmarketing.com/pricing
2. Click a tier (e.g. Basic $47/mo)
3. Complete Stripe Checkout with a test card
4. Verify in Supabase:
   ```sql
   SELECT email, tier, subscription_status, created_at
   FROM fdm_customers
   WHERE site_id = 'fdm'
   ORDER BY created_at DESC
   LIMIT 5;
   ```
   The new row should appear within a few seconds of checkout completion.
5. Verify in `fdm_stripe_events` that `checkout.session.completed` was logged without an `error`.

If the customer row never appears, check:
- Vercel logs for `/api/webhooks/stripe` errors
- Stripe dashboard → Webhooks → your endpoint → **Events** tab to see if the webhook delivered successfully

---

## What this enables

After running steps 1–3, the following user flow works end-to-end:

```
Visitor → /pricing → Clicks tier → Stripe Checkout → Pays →
Stripe fires webhook → /api/webhooks/stripe → creates fdm_customers row
```

**What's NOT yet built (next session):**
- Customer login (Supabase magic link at `/login`)
- Customer dashboard (`/dashboard`)
- Full onboarding wizard that reads/writes `fdm_customers.onboarding_data`
- Website editor, voice agent settings, review queue, billing page

Those come next. For now, signups hit the database; onboarding email follow-up happens via the existing `notifySale` notification to Thad.
