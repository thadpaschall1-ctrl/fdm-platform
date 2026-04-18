/**
 * Telnyx SMS alert — mirrors leadgen-platform/lib/monitoring/alert.ts
 */

export async function sendAlertSms(message: string): Promise<boolean> {
  const key = process.env.TELNYX_API_KEY;
  if (!key) {
    console.error("[alert] TELNYX_API_KEY missing:", message);
    return false;
  }

  const from = process.env.TELNYX_FROM_NUMBER || "+18139156587";
  const to = process.env.NOTIFY_SMS_TO || "+18138604551";

  try {
    const res = await fetch("https://api.telnyx.com/v2/messages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, text: message.slice(0, 300) }),
    });
    if (!res.ok) return false;
    return true;
  } catch {
    return false;
  }
}
