/**
 * GHL API client for FDM.
 * Creates contacts in the FDM GHL location after every lead capture.
 * Data is ALWAYS written to Supabase first — GHL is the secondary sync.
 */

const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";
const FDM_LOCATION_ID = "ejzusLjCJ1suIrgnfBbQ";

function getApiKey(): string {
  const key = process.env.GHL_API_KEY;
  if (!key) throw new Error("GHL_API_KEY not set");
  return key;
}

interface CreateContactPayload {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  tags?: string[];
  source?: string;
  customFields?: { id: string; value: string }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ghlFetch(path: string, method: string, body?: unknown): Promise<any> {
  const res = await fetch(`${GHL_BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`[GHL] ${method} ${path} failed: ${res.status} ${text}`);
    return null;
  }

  if (res.status === 204) return null;
  return res.json();
}

/**
 * Create or update a contact in the FDM GHL location.
 * Non-blocking — caller should not await this in the critical path.
 */
export async function syncContactToGHL(data: {
  name: string;
  email: string;
  phone?: string;
  businessName: string;
  industry?: string;
  cityState: string;
  source: string;
  tags: string[];
  auditScore?: number;
  auditGrade?: string;
}): Promise<void> {
  try {
    const [firstName, ...lastParts] = data.name.split(" ");
    const lastName = lastParts.join(" ") || undefined;
    const [city, state] = data.cityState.split(",").map((s) => s.trim());

    const payload: CreateContactPayload & { locationId: string } = {
      locationId: FDM_LOCATION_ID,
      firstName: firstName || data.name,
      lastName,
      email: data.email,
      phone: data.phone,
      city,
      state,
      source: data.source,
      tags: [
        ...data.tags,
        "fdm",
        ...(data.auditGrade ? [`audit-grade-${data.auditGrade.toLowerCase()}`] : []),
        ...(data.industry ? [data.industry.toLowerCase().replace(/\s+/g, "-")] : []),
      ],
    };

    await ghlFetch("/contacts/", "POST", payload);
  } catch (err) {
    console.error("[GHL sync] Failed to create contact:", err);
    // Never throw — GHL sync is best-effort
  }
}
