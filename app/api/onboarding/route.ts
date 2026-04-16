import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/onboarding
 * FDM onboarding endpoint. Writes to the shared client_onboarding table
 * in leadgen-platform Supabase, brand = 'fdm'.
 */
export async function POST(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Always force brand = 'fdm' on this endpoint
  body.brand = "fdm";

  if (!body.email || !body.business_name) {
    return NextResponse.json(
      { error: "email and business_name required" },
      { status: 400 }
    );
  }

  const db = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dbAny = db as any;

  const row = {
    brand: "fdm",
    status: "submitted",
    package_tier: body.package_tier ?? null,
    email: body.email,
    phone: body.phone ?? null,
    owner_name: body.owner_name ?? null,
    owner_credentials: body.owner_credentials ?? null,
    business_name: body.business_name,
    business_type: body.business_type ?? null,
    industry: body.industry ?? null,
    year_established: body.year_established ?? null,
    short_description: body.short_description ?? null,
    street_address: body.street_address ?? null,
    city: body.city ?? null,
    state: body.state ?? null,
    zip: body.zip ?? null,
    service_area: body.service_area ?? null,
    website_url: body.website_url ?? null,
    gbp_url: body.gbp_url ?? null,
    yelp_url: body.yelp_url ?? null,
    bbb_url: body.bbb_url ?? null,
    facebook_url: body.facebook_url ?? null,
    instagram_url: body.instagram_url ?? null,
    linkedin_url: body.linkedin_url ?? null,
    youtube_url: body.youtube_url ?? null,
    niche_directory_urls: body.niche_directory_urls ?? null,
    google_rating: body.google_rating ?? null,
    google_review_count: body.google_review_count ?? null,
    services: body.services ?? null,
    faqs: body.faqs ?? null,
    testimonials: body.testimonials ?? null,
    team: body.team ?? null,
    pricing_notes: body.pricing_notes ?? null,
    logo_url: body.logo_url ?? null,
    primary_color: body.primary_color ?? null,
    secondary_color: body.secondary_color ?? null,
    tone: body.tone ?? null,
    competitor_urls: body.competitor_urls ?? null,
    source: body.source ?? "fdm/onboarding",
    scraped_data: body.scraped_data ?? null,
    notes: body.notes ?? null,
  };

  const { data, error } = await dbAny
    .from("client_onboarding")
    .insert(row)
    .select("id")
    .single();

  if (error) {
    console.error("[fdm onboarding] insert failed:", error);
    return NextResponse.json(
      { error: "Failed to save onboarding", detail: error.message },
      { status: 500 }
    );
  }

  void notify(body.business_name, body.email, data.id);

  return NextResponse.json({ success: true, id: data.id });
}

async function notify(businessName: string, email: string, id: string) {
  const msg = `New FDM onboarding: ${businessName} (${email}) — id ${id}`;
  const telnyxKey = process.env.TELNYX_API_KEY;
  const from = process.env.TELNYX_FROM_NUMBER || "+18139156587";
  const to = process.env.NOTIFY_SMS_TO || "+18138604551";
  if (telnyxKey) {
    try {
      await fetch("https://api.telnyx.com/v2/messages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${telnyxKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, text: msg }),
      });
    } catch (err) {
      console.error("[fdm onboarding] SMS failed:", err);
    }
  }
}
