/**
 * FDM Notification System
 * Sends email (and eventually SMS) to Thad on every lead event.
 * Uses Hostinger SMTP (same as leadgen-platform).
 *
 * Required env vars:
 * - SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT (email)
 * - TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, NOTIFY_PHONE_NUMBER (SMS — when ready)
 */

import nodemailer from "nodemailer";

const NOTIFY_EMAIL = "thadpaschall1@gmail.com";

// ── Email ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let transporter: any = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.log("[Notify] SMTP not configured — skipping email");
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

async function sendEmail(subject: string, html: string): Promise<void> {
  const t = getTransporter();
  if (!t) return;

  try {
    const from = process.env.SMTP_USER || "hello@fastdigitalmarketing.com";
    await t.sendMail({
      from: `Fast Digital Marketing <${from}>`,
      to: NOTIFY_EMAIL,
      subject,
      html,
    });
    console.log(`[Notify] Email sent: ${subject}`);
  } catch (err) {
    console.error("[Notify] Email failed:", err);
  }
}

// ── SMS (when Twilio/10DLC is approved) ──────────────────────────────────────

async function sendSms(message: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const auth = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  const to = process.env.NOTIFY_PHONE_NUMBER;

  if (!sid || !auth || !from || !to) {
    console.log("[Notify] Twilio not configured — skipping SMS");
    return;
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${auth}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: from, Body: message }).toString(),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Notify] SMS failed:", err);
    } else {
      console.log("[Notify] SMS sent");
    }
  } catch (err) {
    console.error("[Notify] SMS error:", err);
  }
}

// ── Public notification functions ────────────────────────────────────────────

export async function notifyAudit(data: {
  businessName: string;
  niche: string;
  cityState: string;
  email: string;
  phone: string;
  overallGrade: string;
  overallScore: number;
}): Promise<void> {
  const subject = `🔍 New FDM Audit — ${data.businessName} (${data.overallGrade}, ${data.overallScore}/100)`;

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 500px; padding: 20px;">
      <h2 style="margin: 0 0 16px; color: #1e293b;">New Free Audit</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #64748b; width: 120px;">Business</td><td style="padding: 8px 0; font-weight: 600;">${data.businessName}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Industry</td><td style="padding: 8px 0;">${data.niche || "Not specified"}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Location</td><td style="padding: 8px 0;">${data.cityState}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Phone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone || "Not provided"}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Score</td><td style="padding: 8px 0; font-weight: 700; font-size: 18px;">${data.overallGrade} (${data.overallScore}/100)</td></tr>
      </table>
      <p style="margin-top: 16px; font-size: 12px; color: #94a3b8;">fastdigitalmarketing.com — Automated notification</p>
    </div>
  `;

  const sms = `FDM Audit: ${data.businessName} — ${data.overallGrade} (${data.overallScore}/100) | ${data.email} | ${data.phone || "no phone"}`;

  // Send both in parallel (each handles its own errors)
  await Promise.all([
    sendEmail(subject, html),
    sendSms(sms),
  ]);
}

export async function notifyCallback(data: {
  name: string;
  phone: string;
  businessName?: string;
  notes?: string;
}): Promise<void> {
  const subject = `📞 FDM Callback Request — ${data.name}`;

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 500px; padding: 20px;">
      <h2 style="margin: 0 0 16px; color: #1e293b;">Callback Requested</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #64748b; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.name}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Phone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
        ${data.businessName ? `<tr><td style="padding: 8px 0; color: #64748b;">Business</td><td style="padding: 8px 0;">${data.businessName}</td></tr>` : ""}
        ${data.notes ? `<tr><td style="padding: 8px 0; color: #64748b;">Notes</td><td style="padding: 8px 0;">${data.notes}</td></tr>` : ""}
      </table>
      <p style="margin-top: 16px; font-size: 12px; color: #94a3b8;">fastdigitalmarketing.com — Automated notification</p>
    </div>
  `;

  const sms = `FDM Callback: ${data.name} — ${data.phone}${data.businessName ? ` (${data.businessName})` : ""}`;

  await Promise.all([sendEmail(subject, html), sendSms(sms)]);
}

export async function notifySale(data: {
  businessName: string;
  email: string;
  plan: string;
  amount: string;
}): Promise<void> {
  const subject = `💰 FDM Sale — ${data.businessName} (${data.plan})`;

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 500px; padding: 20px;">
      <h2 style="margin: 0 0 16px; color: #16a34a;">New Sale!</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #64748b; width: 120px;">Business</td><td style="padding: 8px 0; font-weight: 600;">${data.businessName}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Plan</td><td style="padding: 8px 0; font-weight: 600;">${data.plan}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Amount</td><td style="padding: 8px 0; font-weight: 700; color: #16a34a; font-size: 18px;">${data.amount}</td></tr>
      </table>
      <p style="margin-top: 16px; font-size: 12px; color: #94a3b8;">fastdigitalmarketing.com — Automated notification</p>
    </div>
  `;

  const sms = `FDM SALE! ${data.businessName} — ${data.plan} (${data.amount})`;

  await Promise.all([sendEmail(subject, html), sendSms(sms)]);
}
