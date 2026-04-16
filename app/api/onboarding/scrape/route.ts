import { NextRequest, NextResponse } from "next/server";
import { scrapeBusinessSite } from "@/lib/scrape-business";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const urlInput: string = (body.url || "").trim();
  if (!urlInput) return NextResponse.json({ error: "url required" }, { status: 400 });

  let url = urlInput;
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;

  try { new URL(url); }
  catch { return NextResponse.json({ error: "Invalid URL format" }, { status: 400 }); }

  try {
    const scraped = await scrapeBusinessSite(url);
    return NextResponse.json({ success: true, url, scraped });
  } catch (err) {
    console.error("[onboarding/scrape] failed:", err);
    return NextResponse.json(
      { error: "Scrape failed", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
