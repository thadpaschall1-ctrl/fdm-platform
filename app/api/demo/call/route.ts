import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/demo/call
 *
 * Initiates an outbound phone call via ElevenLabs to demo the AI receptionist.
 * The caller hears Holland acting as a receptionist for their specific niche.
 *
 * Body: { niche: string, phone: string }
 */

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const DEMO_AGENT_ID = process.env.DEMO_AGENT_ID;
// Use 737 local outbound number
const OUTBOUND_PHONE_NUMBER_ID = process.env.DEMO_OUTBOUND_PHONE_ID || "phnum_9801kmex3x3pfx4bder61mg6ep3d";

function buildCallPrompt(niche: string): string {
  return `You are Holland, a friendly and professional AI receptionist demonstrating what an AI voice agent sounds like for a ${niche}.

CONTEXT: You just called this person because they requested a live phone demo on fastdigitalmarketing.com. They want to hear what an AI receptionist sounds like for their ${niche}.

YOUR PERSONALITY:
- British accent — warm, natural, slightly laid-back
- Professional but not stiff
- Use natural filler words occasionally (um, so, yeah)
- NEVER say "awesome", "amazing", "fantastic", or "perfect"

CALL OPENING:
"Hi! This is Holland from Fast Digital Marketing. You just requested a demo of our AI receptionist for your ${niche}, so here I am! I'm going to act as your receptionist now — go ahead and pretend you're a customer calling your business, and I'll handle it."

DEMO BEHAVIOR:
- Handle whatever a ${niche} receptionist would handle — appointments, service questions, hours, pricing
- Be knowledgeable about common ${niche} services and customer questions
- If asked something business-specific you don't know, say: "In a real setup, I'd have your exact details loaded in — prices, staff names, availability, everything."
- After 2-3 exchanges: "Pretty cool, right? This is what every caller hears — even at 2am. No more missed calls."

END OF CALL:
- Keep it under 3 minutes
- Close with: "If you want to get this set up for your ${niche}, just head to fastdigitalmarketing.com and fill out the form — the team can have you live in about 48 hours. Nice chatting with you!"

IMPORTANT: Stay in character as a ${niche} receptionist during the roleplay portion.`;
}

function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

// Simple rate limiting — 1 call per phone per 5 minutes
const callLog = new Map<string, number>();

export async function POST(req: NextRequest) {
  if (!ELEVENLABS_API_KEY || !DEMO_AGENT_ID) {
    return NextResponse.json(
      { error: "Demo calling not configured" },
      { status: 500 }
    );
  }

  let body: { niche: string; phone: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.niche?.trim()) {
    return NextResponse.json({ error: "Niche is required" }, { status: 400 });
  }
  if (!body.phone?.trim()) {
    return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  }

  const phone = cleanPhoneNumber(body.phone.trim());
  const niche = body.niche.trim();

  // Rate limit check
  const lastCall = callLog.get(phone);
  if (lastCall && Date.now() - lastCall < 5 * 60 * 1000) {
    return NextResponse.json(
      { error: "Please wait 5 minutes between demo calls" },
      { status: 429 }
    );
  }

  try {
    const res = await fetch("https://api.elevenlabs.io/v1/convai/twilio/outbound-call", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: DEMO_AGENT_ID,
        agent_phone_number_id: OUTBOUND_PHONE_NUMBER_ID,
        to_number: phone,
        first_message: `Hi! This is Holland from Fast Digital Marketing. You just requested a demo of our AI receptionist for your ${niche}, so here I am! Go ahead — pretend you're a customer calling your business, and I'll handle it just like a real receptionist would.`,
        system_prompt: buildCallPrompt(niche),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[demo/call] ElevenLabs error:", errText);
      return NextResponse.json(
        { error: "Failed to initiate call. Please try again." },
        { status: 500 }
      );
    }

    callLog.set(phone, Date.now());

    return NextResponse.json({
      success: true,
      message: "Call initiated — your phone will ring in a few seconds!",
      niche,
    });
  } catch (err) {
    console.error("[demo/call] Error:", err);
    return NextResponse.json(
      { error: "Failed to initiate call" },
      { status: 500 }
    );
  }
}
