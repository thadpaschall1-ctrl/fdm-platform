import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const DEMO_AGENT_ID = process.env.DEMO_AGENT_ID;
const OUTBOUND_PHONE_ID = process.env.DEMO_OUTBOUND_PHONE_ID || "phnum_9801kmex3x3pfx4bder61mg6ep3d";

function cleanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

const callLog = new Map<string, number>();

export async function POST(req: NextRequest) {
  if (!ELEVENLABS_API_KEY || !DEMO_AGENT_ID) {
    return NextResponse.json({ error: "Voice demo is being set up. Please try again shortly." }, { status: 500 });
  }

  let body: { niche: string; phone: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.niche?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ error: "Niche and phone required" }, { status: 400 });
  }

  const phone = cleanPhone(body.phone.trim());
  const niche = body.niche.trim();

  const lastCall = callLog.get(phone);
  if (lastCall && Date.now() - lastCall < 5 * 60 * 1000) {
    return NextResponse.json({ error: "Please wait 5 minutes between demo calls" }, { status: 429 });
  }

  try {
    const res = await fetch("https://api.elevenlabs.io/v1/convai/twilio/outbound-call", {
      method: "POST",
      headers: { "xi-api-key": ELEVENLABS_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        agent_id: DEMO_AGENT_ID,
        agent_phone_number_id: OUTBOUND_PHONE_ID,
        to_number: phone,
        first_message: `Hi! This is Holland from Fast Digital Marketing. You just requested a demo of our AI receptionist for your ${niche}, so here I am! Go ahead — pretend you're a customer calling your business, and I'll handle it.`,
      }),
    });

    if (!res.ok) {
      console.error("[demo/call]", await res.text());
      return NextResponse.json({ error: "Failed to initiate call" }, { status: 500 });
    }

    callLog.set(phone, Date.now());
    return NextResponse.json({ success: true, message: "Call initiated", niche });
  } catch (err) {
    console.error("[demo/call]", err);
    return NextResponse.json({ error: "Failed to initiate call" }, { status: 500 });
  }
}
