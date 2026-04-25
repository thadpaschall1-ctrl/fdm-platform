/**
 * Brand-aware SMS sender for FDM via GHL.
 *
 * FDM Holland (phone agent on 888-972-1544) needs to text follow-up links
 * after Route B calls. The A2P-verified outbound number lives in the AISE
 * GHL sub-account (737-250-9222). This module handles the GHL API plumbing.
 *
 * Usage:
 *   await sendFdmSms({
 *     toPhone: "+15551234567",
 *     message: buildHollandFollowupMessage("Thad"),
 *     firstName: "Thad",
 *   });
 */

const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-04-15"; // Conversations API uses this version

interface AiseCredentials {
  pit: string;
  locationId: string;
  fromNumber: string;
}

function getAiseCredentials(): AiseCredentials {
  const pit = process.env.GHL_AISE_PIT;
  const locationId = process.env.GHL_AISE_LOCATION_ID;
  const fromNumber = process.env.GHL_AISE_FROM_NUMBER;
  if (!pit || !locationId || !fromNumber) {
    throw new Error(
      "AISE GHL env vars missing. Set GHL_AISE_PIT, GHL_AISE_LOCATION_ID, and GHL_AISE_FROM_NUMBER in .env.local + Vercel."
    );
  }
  return { pit, locationId, fromNumber };
}

interface UpsertContactResponse {
  contact: { id: string };
}

interface SendMessageResponse {
  conversationId?: string;
  messageId?: string;
}

/**
 * Upsert a contact in GHL by phone. Returns the contact ID.
 * GHL deduplicates by phone within a location, so repeat calls are safe.
 */
async function upsertContactByPhone(
  phone: string,
  firstName?: string
): Promise<string> {
  const { pit, locationId } = getAiseCredentials();

  const response = await fetch(`${GHL_BASE_URL}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      locationId,
      phone,
      firstName: firstName || "Caller",
      source: "Holland Phone Agent",
      tags: ["fdm", "holland-phone-call"],
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `GHL upsertContact failed: ${response.status} ${response.statusText} — ${text}`
    );
  }

  const data = (await response.json()) as UpsertContactResponse;
  if (!data.contact?.id) {
    throw new Error("GHL upsertContact returned no contact id");
  }
  return data.contact.id;
}

/**
 * Send an SMS from FDM's A2P-verified number (737-250-9222) to a contact.
 */
export async function sendFdmSms(args: {
  toPhone: string;
  message: string;
  firstName?: string;
}): Promise<{ contactId: string; messageId?: string; conversationId?: string }> {
  const { toPhone, message, firstName } = args;

  if (!toPhone || !/^\+?[\d\s()-]{10,}$/.test(toPhone)) {
    throw new Error(`Invalid toPhone: ${toPhone}`);
  }
  if (!message || message.length === 0) {
    throw new Error("Empty SMS message");
  }
  if (message.length > 1600) {
    throw new Error(`SMS message too long: ${message.length} chars (max 1600)`);
  }

  // Normalize phone to E.164
  let normalized = toPhone.replace(/[^\d+]/g, "");
  if (!normalized.startsWith("+")) {
    if (normalized.length === 10) normalized = `+1${normalized}`;
    else if (normalized.length === 11 && normalized.startsWith("1"))
      normalized = `+${normalized}`;
  }

  const { pit, fromNumber } = getAiseCredentials();

  // Step 1: upsert the contact so GHL has a conversation thread to attach to
  const contactId = await upsertContactByPhone(normalized, firstName);

  // Step 2: send the message
  const response = await fetch(`${GHL_BASE_URL}/conversations/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      type: "SMS",
      contactId,
      message,
      fromNumber,
      toNumber: normalized,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `GHL sendSms failed: ${response.status} ${response.statusText} — ${text}`
    );
  }

  const data = (await response.json()) as SendMessageResponse;
  return {
    contactId,
    messageId: data.messageId,
    conversationId: data.conversationId,
  };
}

/**
 * Pre-built FDM Holland SMS template — sends the 3 self-service links.
 */
export function buildHollandFollowupMessage(firstName?: string): string {
  const greeting = firstName ? `Hi ${firstName}!` : "Hi!";
  return [
    `${greeting} Holland here from Fast Digital Marketing — thanks for the call. As promised, here are your links:`,
    "",
    "1) Free Audit: https://fastdigitalmarketing.com/audit",
    "2) Live Demo: https://fastdigitalmarketing.com/demo",
    "3) Pricing: https://fastdigitalmarketing.com/pricing",
    "",
    "Reply STOP to opt out.",
  ].join("\n");
}
