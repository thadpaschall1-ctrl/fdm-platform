import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, FDM_SITE_ID } from "@/lib/supabase";
import { notifyAudit } from "@/lib/notify";
import { runFullAudit } from "@/lib/aso-engine";
import { randomUUID } from "crypto";

/**
 * POST /api/audit/full
 * Runs the full 6-pillar ASO audit using the ASO engine.
 * Used for: $497 paid Full Business Report AND internal site audits.
 *
 * Body: { businessName, niche, cityState, websiteUrl, email, phone }
 *
 * GET /api/audit/full?id=<auditId>
 * Retrieves a saved full audit report.
 */

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { businessName = "", niche = "", cityState = "", websiteUrl = "", email = "", phone = "" } = body;

  if (!businessName || !cityState || !websiteUrl) {
    return NextResponse.json(
      { error: "Business name, city/state, and website URL are required for a full audit." },
      { status: 400 }
    );
  }

  try {
    // Run the full ASO engine
    const report = await runFullAudit({ businessName, niche, cityState, websiteUrl });

    const auditId = randomUUID();

    // Save to Supabase
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
        overall_grade: report.overallGrade,
        overall_score: report.overallScore,
        categories: report.pillars,
        audit_type: "full",
      });
    } catch (err) {
      console.error("[audit/full] Supabase write failed:", err);
    }

    // Notify Thad
    notifyAudit({
      businessName,
      niche,
      cityState,
      email,
      phone,
      overallGrade: report.overallGrade,
      overallScore: report.overallScore,
    }).catch((err) => console.error("[audit/full] Notification failed:", err));

    return NextResponse.json({ auditId, report });
  } catch (err) {
    console.error("[audit/full] Audit failed:", err);
    return NextResponse.json({ error: "Audit failed. Please try again." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const db = createAdminClient();
    const { data } = await db
      .from("audit_results")
      .select("*")
      .eq("id", id)
      .eq("audit_type", "full")
      .maybeSingle();

    if (data) {
      return NextResponse.json({
        auditId: data.id,
        report: {
          businessName: data.practice_name,
          cityState: data.city_state,
          websiteUrl: data.website_url,
          overallGrade: data.overall_grade,
          overallScore: data.overall_score,
          pillars: data.categories,
          generatedAt: data.created_at,
        },
      });
    }
  } catch (err) {
    console.error("[audit/full] Supabase read failed:", err);
  }

  return NextResponse.json({ error: "Report not found" }, { status: 404 });
}
