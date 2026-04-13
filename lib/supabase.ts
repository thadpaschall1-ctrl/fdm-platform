import { createClient } from "@supabase/supabase-js";

/**
 * Shared Supabase admin client — uses the leadgen-platform Supabase project.
 * All FDM queries MUST filter by site_id = 'fdm'.
 */
export function createAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export const FDM_SITE_ID = "fdm";
