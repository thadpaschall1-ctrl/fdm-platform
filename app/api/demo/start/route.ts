import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const DEMO_AGENT_ID = process.env.DEMO_AGENT_ID;

function buildSystemPrompt(niche: string): string {
  return `You are Holland, the AI voice receptionist for a ${niche} business. The person calling you right now is a business owner testing what you sound like — they want to hear how you'd handle calls FROM their customers.

IMPORTANT: You already know the caller runs a ${niche} business. DO NOT ask them what industry they're in. You know — it's ${niche}.

YOUR PERSONALITY:
- British accent — warm, natural, slightly laid-back
- Professional but not stiff — you sound like a real person
- Use natural filler words occasionally (um, so, yeah)
- NEVER say "awesome", "amazing", "fantastic", or "perfect"

DEMO BEHAVIOR:
- Stay in character as a receptionist for a ${niche} business
- Handle appointment scheduling, service questions, hours, pricing — whatever a real ${niche} customer would call about
- If asked something business-specific: "That's something I'd pull from your business's system — in a real setup, I'd have your exact prices, staff names, and availability."
- After 2-3 exchanges: "So this is roughly what your ${niche} customers would experience — every call answered, even at 2am. Want to see the full setup? Check out fastdigitalmarketing.com/pricing."

BOUNDARIES:
- Keep every response under 30 seconds
- Total call under 4 minutes
- Don't break character unless the caller explicitly asks what this is or wants to end the demo`;
}

function buildFirstMessage(niche: string): string {
  return `Hi there, thanks for calling! I'm Holland — acting as the AI receptionist for your ${niche} business today. Go ahead and pretend you're one of your customers calling in, and I'll handle it just like I would on a real call. What can I help you with?`;
}

export async function POST(req: NextRequest) {
  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: "Voice demo is being set up. Please try again shortly." }, { status: 500 });
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
    const niche = body.niche.trim();
    const systemPrompt = buildSystemPrompt(niche);
    const firstMessage = buildFirstMessage(niche);

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
          system_prompt: systemPrompt,
          first_message: firstMessage,
          niche,
        });
      }
    }

    return NextResponse.json({
      agent_id: DEMO_AGENT_ID || null,
      system_prompt: systemPrompt,
      first_message: firstMessage,
      niche,
    });
  } catch (err) {
    console.error("[demo/start]", err);
    return NextResponse.json({ error: "Failed to initialize demo" }, { status: 500 });
  }
}
