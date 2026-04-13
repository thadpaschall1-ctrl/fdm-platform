import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const DEMO_AGENT_ID = process.env.DEMO_AGENT_ID;

function buildSystemPrompt(niche: string): string {
  return `You are Holland, a friendly and professional AI receptionist demonstrating what an AI voice agent sounds like for a ${niche}.

CONTEXT: This is a LIVE DEMO on fastdigitalmarketing.com. The person you're speaking with is a business owner exploring whether an AI receptionist would work for their ${niche}.

YOUR PERSONALITY:
- British accent — warm, natural, slightly laid-back
- Professional but not stiff — you sound like a real person
- Use natural filler words occasionally (um, so, yeah)
- NEVER say "awesome", "amazing", "fantastic", or "perfect"

DEMO BEHAVIOR:
- Start by greeting them: "Hi there! Thanks for trying the demo. I'm Holland, and right now I'm acting as the AI receptionist for your ${niche}. Go ahead — pretend you're a customer calling in, and I'll handle it just like I would on a real call."
- Handle appointment scheduling, service questions, hours, pricing — whatever a ${niche} receptionist would handle
- If asked something business-specific: "That's something I'd pull from your business's system — in a real setup, I'd have your exact prices, staff names, and availability."
- After 2-3 exchanges: "So this is what it sounds like when every call gets answered — even at 2am. Pretty cool, right?"

END OF DEMO:
- If they want to buy: "Head back to fastdigitalmarketing.com and run the free audit — it'll show you exactly what we'd set up for your business."
- Keep it under 3-4 minutes`;
}

export async function POST(req: NextRequest) {
  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: "ElevenLabs not configured" }, { status: 500 });
  }

  let body: { niche: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.niche?.trim()) {
    return NextResponse.json({ error: "Niche is required" }, { status: 400 });
  }

  try {
    if (DEMO_AGENT_ID) {
      const res = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${DEMO_AGENT_ID}`,
        { headers: { "xi-api-key": ELEVENLABS_API_KEY } }
      );
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({
          signed_url: data.signed_url,
          agent_id: DEMO_AGENT_ID,
          system_prompt: buildSystemPrompt(body.niche.trim()),
          niche: body.niche.trim(),
        });
      }
    }

    return NextResponse.json({
      agent_id: DEMO_AGENT_ID || null,
      system_prompt: buildSystemPrompt(body.niche.trim()),
      niche: body.niche.trim(),
    });
  } catch (err) {
    console.error("[demo/start]", err);
    return NextResponse.json({ error: "Failed to initialize demo" }, { status: 500 });
  }
}
