import { NextRequest, NextResponse } from "next/server";
import { sendFdmSms, buildHollandFollowupMessage } from "@/lib/ghl/sms";

/**
 * POST /api/test/send-sms
 *
 * Manual test endpoint to verify the FDM SMS-sender works.
 * Gated by a static token in the request body so random people can't blast
 * our messaging quota. Remove or replace with proper auth before exposing
 * publicly.
 *
 * Body:
 *   {
 *     token: "fdm-test-sms-2026" (must match SMS_TEST_TOKEN env or default),
 *     toPhone: "+15551234567",
 *     firstName?: "Thad",
 *     message?: "custom message — defaults to Holland follow-up template"
 *   }
 */

const REQUIRED_TOKEN = process.env.SMS_TEST_TOKEN || "fdm-test-sms-2026";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const {
    token,
    toPhone,
    firstName,
    message,
  } = body as {
    token?: string;
    toPhone?: string;
    firstName?: string;
    message?: string;
  };

  if (token !== REQUIRED_TOKEN) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  if (!toPhone) {
    return NextResponse.json({ error: "toPhone is required" }, { status: 400 });
  }

  try {
    const result = await sendFdmSms({
      toPhone,
      message: message || buildHollandFollowupMessage(firstName),
      firstName,
    });
    return NextResponse.json({
      ok: true,
      contactId: result.contactId,
      messageId: result.messageId,
      conversationId: result.conversationId,
      from: process.env.GHL_AISE_FROM_NUMBER,
      to: toPhone,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
