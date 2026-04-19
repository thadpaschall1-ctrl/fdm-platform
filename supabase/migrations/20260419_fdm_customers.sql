-- ═══════════════════════════════════════════════════════════════════════
-- FDM customers schema
-- Run this in the Supabase SQL Editor against the shared AISE project
-- (qlgvoebiyixwsabtxlwp.supabase.co).
--
-- Design notes:
--   - Shares the `site_id` discriminator with GYCP/callmabel/etc.
--     Every FDM row must have site_id = 'fdm'.
--   - Keys off Supabase Auth (auth.users) so signups plug into magic-link login.
--   - Onboarding data is stored as JSONB so we can iterate on the wizard
--     without schema churn.
-- ═══════════════════════════════════════════════════════════════════════

-- ── Tier enum ──────────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE fdm_tier AS ENUM ('basic', 'smart', 'voice', 'full');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ── Onboarding status enum ─────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE fdm_onboarding_status AS ENUM (
    'pending',        -- just signed up, hasn't started the wizard
    'in_progress',    -- mid-wizard
    'complete',       -- wizard complete, 5-day clock started
    'live'            -- website is live, everything provisioned
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ── Subscription status enum (mirror Stripe) ───────────────────────────
DO $$ BEGIN
  CREATE TYPE fdm_subscription_status AS ENUM (
    'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'incomplete', 'incomplete_expired', 'paused'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ── Customers table ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fdm_customers (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id                 TEXT NOT NULL DEFAULT 'fdm' CHECK (site_id = 'fdm'),

  -- Auth linkage
  auth_user_id            UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email                   TEXT NOT NULL,

  -- Stripe linkage
  stripe_customer_id      TEXT UNIQUE,
  stripe_subscription_id  TEXT UNIQUE,
  stripe_price_id         TEXT,
  subscription_status     fdm_subscription_status DEFAULT 'incomplete',
  billing_interval        TEXT CHECK (billing_interval IN ('month', 'year')),
  current_period_end      TIMESTAMPTZ,
  canceled_at             TIMESTAMPTZ,

  -- Plan + tier
  tier                    fdm_tier,

  -- Onboarding
  onboarding_status       fdm_onboarding_status NOT NULL DEFAULT 'pending',
  onboarding_data         JSONB NOT NULL DEFAULT '{}'::jsonb,
  onboarding_completed_at TIMESTAMPTZ,
  website_live_at         TIMESTAMPTZ,

  -- Business basics (pulled from onboarding_data for quick filtering)
  business_name           TEXT,
  industry_slug           TEXT,
  city                    TEXT,
  state                   TEXT,
  phone                   TEXT,
  website_url             TEXT,

  -- Metadata
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS fdm_customers_email_idx           ON fdm_customers (email);
CREATE INDEX IF NOT EXISTS fdm_customers_auth_user_id_idx    ON fdm_customers (auth_user_id);
CREATE INDEX IF NOT EXISTS fdm_customers_stripe_customer_idx ON fdm_customers (stripe_customer_id);
CREATE INDEX IF NOT EXISTS fdm_customers_site_id_idx         ON fdm_customers (site_id);
CREATE INDEX IF NOT EXISTS fdm_customers_tier_idx            ON fdm_customers (tier);
CREATE INDEX IF NOT EXISTS fdm_customers_industry_slug_idx   ON fdm_customers (industry_slug);

-- ── Row-level security ─────────────────────────────────────────────────
ALTER TABLE fdm_customers ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS by default; these policies let authenticated
-- customers read/update their own row from the browser.
DROP POLICY IF EXISTS fdm_customers_self_select ON fdm_customers;
CREATE POLICY fdm_customers_self_select ON fdm_customers
  FOR SELECT USING (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS fdm_customers_self_update ON fdm_customers;
CREATE POLICY fdm_customers_self_update ON fdm_customers
  FOR UPDATE USING (auth.uid() = auth_user_id);

-- ── Updated-at trigger ─────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION fdm_customers_touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS fdm_customers_touch ON fdm_customers;
CREATE TRIGGER fdm_customers_touch
BEFORE UPDATE ON fdm_customers
FOR EACH ROW EXECUTE FUNCTION fdm_customers_touch_updated_at();

-- ── Add-on purchases table (tracks Content Velocity, Client Reactivation, etc.) ──
CREATE TABLE IF NOT EXISTS fdm_addons (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id                 TEXT NOT NULL DEFAULT 'fdm' CHECK (site_id = 'fdm'),
  customer_id             UUID NOT NULL REFERENCES fdm_customers(id) ON DELETE CASCADE,
  addon_slug              TEXT NOT NULL,
  stripe_subscription_item_id TEXT,
  stripe_price_id         TEXT NOT NULL,
  status                  TEXT NOT NULL DEFAULT 'active',
  activated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  canceled_at             TIMESTAMPTZ,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS fdm_addons_customer_idx ON fdm_addons (customer_id);
CREATE INDEX IF NOT EXISTS fdm_addons_slug_idx     ON fdm_addons (addon_slug);

ALTER TABLE fdm_addons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS fdm_addons_self_select ON fdm_addons;
CREATE POLICY fdm_addons_self_select ON fdm_addons
  FOR SELECT USING (
    customer_id IN (SELECT id FROM fdm_customers WHERE auth_user_id = auth.uid())
  );

-- ── Webhook event log (audit trail for every Stripe webhook we process) ──
CREATE TABLE IF NOT EXISTS fdm_stripe_events (
  id                      TEXT PRIMARY KEY,   -- Stripe event ID (evt_*)
  site_id                 TEXT NOT NULL DEFAULT 'fdm' CHECK (site_id = 'fdm'),
  type                    TEXT NOT NULL,
  payload                 JSONB NOT NULL,
  processed_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  customer_id             UUID REFERENCES fdm_customers(id) ON DELETE SET NULL,
  error                   TEXT
);

CREATE INDEX IF NOT EXISTS fdm_stripe_events_type_idx     ON fdm_stripe_events (type);
CREATE INDEX IF NOT EXISTS fdm_stripe_events_customer_idx ON fdm_stripe_events (customer_id);

-- ═══════════════════════════════════════════════════════════════════════
-- End of FDM customers migration
-- ═══════════════════════════════════════════════════════════════════════
