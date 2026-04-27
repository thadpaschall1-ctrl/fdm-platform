/**
 * Niche-specific AI role labels.
 *
 * Each showcase page's voice widget shows the prospect what THEIR AI receptionist
 * would sound like — but a "Pool Specialist" who answers "Hi, this is Holland
 * at Sonora Pool" reads as more believable and more valuable than a generic
 * "AI Receptionist". The role label appears on:
 *   - The inline "Try our AI [role] right now" section CTA
 *   - The conversation panel header
 *   - The pre-call disclosure ("This is a real ElevenLabs session…")
 *
 * Two fields per niche:
 *   - role:        the title for the AI agent (e.g. "Pool Specialist")
 *   - shortVerb:   the action word in the CTA copy ("Talk to your AI ...",
 *                  "Speak with your AI ...", etc.) — picked to fit the niche's
 *                  customer flow (some are scheduling, some are advisory).
 *
 * If a niche slug isn't here we fall back to "AI Receptionist".
 */

export interface NicheVoiceRole {
  /** Specialist role displayed to the prospect */
  role: string;
  /** Short verb that fits the niche flow ("Talk to" / "Speak with" / "Try") */
  ctaVerb: string;
}

const NICHE_VOICE_ROLES: Record<string, NicheVoiceRole> = {
  // Urgent trade — coordinator framing fits scheduling/dispatch flow
  "foundation-repair": { role: "Foundation Specialist", ctaVerb: "Talk to" },
  plumbers: { role: "Plumbing Coordinator", ctaVerb: "Talk to" },
  hvac: { role: "HVAC Coordinator", ctaVerb: "Talk to" },
  roofers: { role: "Roofing Specialist", ctaVerb: "Talk to" },

  // Premium outdoor — consultative framing fits high-ticket builds
  "pool-builders": { role: "Pool Design Consultant", ctaVerb: "Speak with" },
  "solar-installers": { role: "Solar Consultant", ctaVerb: "Speak with" },

  // B2B commercial — facility-team-friendly framing
  "polished-concrete": { role: "Concrete Floor Specialist", ctaVerb: "Speak with" },

  // Visual / pinterest — design-forward, refined
  "decorative-concrete": { role: "Decorative Concrete Specialist", ctaVerb: "Speak with" },
  "hair-salons": { role: "Hair Specialist", ctaVerb: "Talk to" },
  "medical-spas": { role: "Med Spa Coordinator", ctaVerb: "Speak with" },

  // Auto / mobile services — direct framing
  "auto-body": { role: "Auto Body Specialist", ctaVerb: "Talk to" },
  "mobile-pet-grooming": { role: "Pet Grooming Coordinator", ctaVerb: "Talk to" },

  // Health / wellness
  fitness: { role: "Fitness Coach", ctaVerb: "Talk to" },

  // Aging in place — warm framing
  "stair-lift": { role: "Stair Lift Specialist", ctaVerb: "Speak with" },

  // Personal brand — conversational
  "real-estate": { role: "Real Estate Assistant", ctaVerb: "Talk to" },
};

export function getNicheVoiceRole(slug: string): NicheVoiceRole {
  return (
    NICHE_VOICE_ROLES[slug] ?? {
      role: "AI Receptionist",
      ctaVerb: "Talk to",
    }
  );
}
