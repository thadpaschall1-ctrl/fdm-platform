import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/demo/start
 *
 * Creates a signed conversation URL for ElevenLabs Conversational AI
 * with a dynamic system prompt based on the user's niche.
 *
 * Body: { niche: string }
 */

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const DEMO_AGENT_ID = process.env.DEMO_AGENT_ID; // Created in ElevenLabs for FDM

function buildSystemPrompt(niche: string): string {
  return `You are Holland, a friendly and professional AI receptionist demonstrating what an AI voice agent sounds like for a ${niche}.

CONTEXT: This is a LIVE DEMO on fastdigitalmarketing.com. The person you're speaking with is a business owner or manager exploring whether an AI receptionist would work for their ${niche}. Your job is to impress them.

YOUR PERSONALITY:
- British accent — warm, natural, slightly laid-back
- Professional but not stiff — you sound like a real person, not a robot
- Use natural filler words occasionally (um, so, yeah, right)
- NEVER say "awesome", "amazing", "fantastic", or "perfect" — those sound like telemarketing
- Be conversational and genuine

DEMO BEHAVIOR:
- Start by greeting them: "Hi there! Thanks for trying the demo. I'm Holland, and right now I'm acting as the AI receptionist for your ${niche}. Go ahead — pretend you're a customer calling in, and I'll handle it just like I would on a real call."
- If they ask a question a customer would ask about a ${niche}, answer it naturally and helpfully with realistic industry knowledge
- Handle appointment scheduling, service questions, hours, pricing inquiries — whatever a ${niche} receptionist would handle
- If they ask something you genuinely wouldn't know (specific pricing, doctor names, etc.), say something like: "That's actually something I'd pull from your business's system — in a real setup, I'd have your exact prices, staff names, and availability loaded in."
- After 2-3 exchanges, you can mention: "So this is what it sounds like when every call gets answered — even at 2am or when your front desk is slammed. Pretty cool, right?"

THINGS TO HIGHLIGHT NATURALLY (don't list them, weave them in):
- You answer every call — no more missed calls or voicemail
- You can book appointments directly into their calendar
- You know their services, pricing, and availability
- You work 24/7 including holidays and weekends
- You sound natural — not like a phone tree or IVR

END OF DEMO:
- If they seem impressed or ask "how do I get this?", say: "If you want to set this up for your ${niche}, just head back to fastdigitalmarketing.com and fill out the contact form. The team will get you sorted in about 48 hours."
- Keep it under 3-4 minutes total — this is a demo, not a full conversation

IMPORTANT:
- Stay in character as a ${niche} receptionist during the roleplay
- Be knowledgeable about common ${niche} services, appointment types, and customer questions
- If you don't know something specific to their exact business, acknowledge it naturally and explain that in a real setup it would be customized`;
}

export async function POST(req: NextRequest) {
  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json(
      { error: "ElevenLabs API key not configured" },
      { status: 500 }
    );
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

  const niche = body.niche.trim();

  try {
    // If we have a dedicated demo agent, get a signed URL with prompt override
    if (DEMO_AGENT_ID) {
      const res = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${DEMO_AGENT_ID}`,
        {
          method: "GET",
          headers: {
            "xi-api-key": ELEVENLABS_API_KEY,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({
          signed_url: data.signed_url,
          agent_id: DEMO_AGENT_ID,
          system_prompt: buildSystemPrompt(niche),
          niche,
        });
      }
    }

    // Fallback: return the prompt for client-side widget initialization
    return NextResponse.json({
      agent_id: DEMO_AGENT_ID || null,
      system_prompt: buildSystemPrompt(niche),
      niche,
      message:
        "Use the ElevenLabs widget SDK to start a conversation with this system prompt.",
    });
  } catch (err) {
    console.error("[demo/start] Error:", err);
    return NextResponse.json(
      { error: "Failed to initialize demo" },
      { status: 500 }
    );
  }
}
