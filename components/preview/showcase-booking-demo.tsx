"use client";

import { useState } from "react";
import type { FictionalBusiness } from "@/lib/data/fictional-businesses";
import type { NicheSiteContent } from "@/lib/data/niche-site-content";
import type { DesignArchetype } from "@/lib/data/design-archetypes";

/**
 * Showcase Booking Demo — multi-step modal that demonstrates how a real
 * customer would book an appointment / request a quote on this site.
 *
 * Replaces the broken `tel:` link that the hero CTA used to be. Now when a
 * prospect clicks "Book Appointment" / "Schedule Inspection" / "Book Free
 * Consult" they see what their actual customers would experience: a clean,
 * professional 4-step flow ending in confirmation.
 *
 * The modal is wired by exporting a `<BookingTrigger>` that any layout can
 * wrap around its existing CTA — clicking the trigger opens the modal.
 *
 * Steps: Service → Date/Time → Contact → Confirmation
 *
 * Niche-aware:
 *   - Services come from `content.services` (first 4)
 *   - Business name + city in the modal header
 *   - Palette inherited so the modal feels native to the page
 *   - End-state has the "This is what your customers experience" frame +
 *     FDM CTA so prospects understand what they're seeing
 */

interface ShowcaseBookingDemoProps {
  business: FictionalBusiness;
  content: NicheSiteContent;
  palette: DesignArchetype["palette"];
  /** Open state — controlled by parent (BookingTrigger toggles it) */
  isOpen: boolean;
  onClose: () => void;
}

// Generate the next 14 days as date options (skip Sundays for niches that
// typically don't operate Sundays — keeps the picker realistic).
function generateDateOptions(): { iso: string; label: string; dayOfWeek: string }[] {
  const out = [];
  const now = new Date();
  let added = 0;
  let offset = 1; // start tomorrow
  while (added < 10) {
    const d = new Date(now);
    d.setDate(d.getDate() + offset);
    if (d.getDay() !== 0) {
      // skip Sundays
      out.push({
        iso: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        dayOfWeek: d.toLocaleDateString("en-US", { weekday: "short" }),
      });
      added++;
    }
    offset++;
  }
  return out;
}

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export function ShowcaseBookingDemo({
  business,
  content,
  palette,
  isOpen,
  onClose,
}: ShowcaseBookingDemoProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const dates = generateDateOptions();
  const services = content.services.slice(0, 4);

  function reset() {
    setStep(1);
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setPhone("");
    setEmail("");
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit() {
    // No real booking — demo only. Move to confirmation.
    setStep(4);
  }

  if (!isOpen) return null;

  const dateLabel = dates.find((d) => d.iso === selectedDate)?.label ?? selectedDate;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book an appointment"
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
        style={{
          background: palette.background,
          border: `1px solid ${palette.border}`,
          animation: "bookingModalIn 0.25s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b shrink-0 flex items-center justify-between"
          style={{ borderColor: palette.border, background: palette.surface }}
        >
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.2em] font-bold mb-0.5"
              style={{ color: palette.accent }}
            >
              Sample Booking · Demo Only
            </p>
            <h2
              className="text-lg font-bold leading-tight"
              style={{ color: palette.foreground }}
            >
              Book with {business.business_name}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            style={{ color: palette.muted }}
            aria-label="Close"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Step indicator */}
        {step < 4 && (
          <div
            className="flex items-center gap-2 px-6 py-3 border-b shrink-0"
            style={{ borderColor: palette.border, background: palette.surface }}
          >
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2 flex-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background:
                      step >= n ? palette.primary : palette.background,
                    color:
                      step >= n
                        ? palette.primaryFg
                        : palette.muted,
                    border: `1px solid ${step >= n ? palette.primary : palette.border}`,
                  }}
                >
                  {step > n ? "✓" : n}
                </div>
                {n < 3 && (
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: step > n ? palette.primary : palette.border,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* ─── Step 1: Service ─── */}
          {step === 1 && (
            <div>
              <h3
                className="text-base font-bold mb-1"
                style={{ color: palette.foreground }}
              >
                What do you need?
              </h3>
              <p className="text-xs mb-5" style={{ color: palette.muted }}>
                Pick a service to schedule.
              </p>
              <div className="space-y-2.5">
                {services.map((svc) => (
                  <button
                    key={svc.title}
                    onClick={() => {
                      setSelectedService(svc.title);
                      setStep(2);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg transition-all hover:scale-[1.01]"
                    style={{
                      background:
                        selectedService === svc.title
                          ? `${palette.primary}15`
                          : palette.surface,
                      border: `1px solid ${
                        selectedService === svc.title
                          ? palette.primary
                          : palette.border
                      }`,
                    }}
                  >
                    <div
                      className="text-sm font-semibold mb-0.5"
                      style={{ color: palette.foreground }}
                    >
                      {svc.title}
                    </div>
                    <div
                      className="text-xs leading-snug line-clamp-2"
                      style={{ color: palette.muted }}
                    >
                      {svc.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── Step 2: Date / Time ─── */}
          {step === 2 && (
            <div>
              <h3
                className="text-base font-bold mb-1"
                style={{ color: palette.foreground }}
              >
                Pick a day & time
              </h3>
              <p className="text-xs mb-5" style={{ color: palette.muted }}>
                Times shown as live availability — actual customer site
                connects to your real calendar.
              </p>

              <p
                className="text-[11px] uppercase tracking-[0.2em] font-bold mb-2"
                style={{ color: palette.accent }}
              >
                Date
              </p>
              <div className="grid grid-cols-5 gap-2 mb-5">
                {dates.map((d) => (
                  <button
                    key={d.iso}
                    onClick={() => setSelectedDate(d.iso)}
                    className="px-2 py-2 rounded-lg text-center transition-all"
                    style={{
                      background:
                        selectedDate === d.iso
                          ? palette.primary
                          : palette.surface,
                      color:
                        selectedDate === d.iso
                          ? palette.primaryFg
                          : palette.foreground,
                      border: `1px solid ${
                        selectedDate === d.iso
                          ? palette.primary
                          : palette.border
                      }`,
                    }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-wide font-bold opacity-80"
                    >
                      {d.dayOfWeek}
                    </div>
                    <div className="text-xs font-bold">{d.label}</div>
                  </button>
                ))}
              </div>

              {selectedDate && (
                <>
                  <p
                    className="text-[11px] uppercase tracking-[0.2em] font-bold mb-2"
                    style={{ color: palette.accent }}
                  >
                    Time
                  </p>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className="px-2 py-2 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          background:
                            selectedTime === t
                              ? palette.primary
                              : palette.surface,
                          color:
                            selectedTime === t
                              ? palette.primaryFg
                              : palette.foreground,
                          border: `1px solid ${
                            selectedTime === t
                              ? palette.primary
                              : palette.border
                          }`,
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ─── Step 3: Contact ─── */}
          {step === 3 && (
            <div>
              <h3
                className="text-base font-bold mb-1"
                style={{ color: palette.foreground }}
              >
                Your contact info
              </h3>
              <p className="text-xs mb-5" style={{ color: palette.muted }}>
                We&apos;ll send a confirmation text and email.
              </p>

              <div className="space-y-3">
                {[
                  { label: "Full Name", value: name, set: setName, type: "text", placeholder: "Jane Smith" },
                  { label: "Phone", value: phone, set: setPhone, type: "tel", placeholder: "(555) 123-4567" },
                  { label: "Email", value: email, set: setEmail, type: "email", placeholder: "you@example.com" },
                ].map((field) => (
                  <div key={field.label}>
                    <label
                      className="block text-[11px] uppercase tracking-[0.18em] font-bold mb-1.5"
                      style={{ color: palette.muted }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 transition-all"
                      style={{
                        background: palette.surface,
                        border: `1px solid ${palette.border}`,
                        color: palette.foreground,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Step 4: Confirmation ─── */}
          {step === 4 && (
            <div className="text-center py-4">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: `${palette.primary}25` }}
              >
                <svg
                  className="w-8 h-8"
                  style={{ color: palette.primary }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: palette.foreground }}
              >
                You&apos;re booked!
              </h3>
              <p className="text-sm mb-5" style={{ color: palette.muted }}>
                {selectedService} · {dateLabel} at {selectedTime}
                <br />
                {name && <>Confirmation sent to {phone || email}</>}
              </p>

              <div
                className="rounded-xl p-4 mb-5 text-left"
                style={{
                  background: `${palette.primary}10`,
                  border: `1px solid ${palette.primary}40`,
                }}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.2em] font-bold mb-2"
                  style={{ color: palette.primary }}
                >
                  This is what your customers experience
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: palette.foreground }}
                >
                  In production, the booking writes to your calendar, sends
                  the customer an SMS + email confirmation, and triggers your
                  AI receptionist to handle any rescheduling. Included in
                  Smart Site + Voice ($297/mo) and Full Automation Stack
                  ($397/mo).
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    border: `1px solid ${palette.border}`,
                    color: palette.foreground,
                  }}
                >
                  Close
                </button>
                <a
                  href="/pricing"
                  className="px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    background: palette.primary,
                    color: palette.primaryFg,
                  }}
                >
                  See FDM Pricing →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer (steps 2 + 3 only — step 1 advances on click, step 4 has its own buttons) */}
        {(step === 2 || step === 3) && (
          <div
            className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-3"
            style={{ borderColor: palette.border, background: palette.surface }}
          >
            <button
              onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
              className="text-xs font-medium transition-colors"
              style={{ color: palette.muted }}
            >
              ← Back
            </button>
            {step === 2 && (
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="px-6 py-2.5 rounded-full text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: palette.primary,
                  color: palette.primaryFg,
                }}
              >
                Continue →
              </button>
            )}
            {step === 3 && (
              <button
                onClick={handleSubmit}
                disabled={!name || (!phone && !email)}
                className="px-6 py-2.5 rounded-full text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: palette.primary,
                  color: palette.primaryFg,
                }}
              >
                Confirm Booking ✓
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes bookingModalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
