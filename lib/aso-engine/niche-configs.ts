/**
 * ASO Engine — Niche Configurations
 * Each niche config adapts all 6 audit pillars to the specific business type.
 * Add new niches by copying the template at the bottom.
 */

export interface NicheConfig {
  slug: string;
  businessType: string;
  entityLabel: string;
  customerLabel: string;
  serviceDomain: string;
  credentialField: string;
  primaryDirectories: string[];
  ymyl: boolean;
  schemaTypes: string[];
  faqTopics: string[];
  exampleEntity: string;
}

export const NICHE_CONFIGS: Record<string, NicheConfig> = {
  chiropractic: {
    slug: "chiropractic",
    businessType: "MedicalBusiness",
    entityLabel: "chiropractic practice",
    customerLabel: "patients",
    serviceDomain: "health / medical (YMYL)",
    credentialField: "Doctor of Chiropractic (DC), state license number",
    primaryDirectories: ["Healthgrades", "Zocdoc", "WebMD", "Psychology Today"],
    ymyl: true,
    schemaTypes: ["MedicalBusiness", "FAQPage", "MedicalCondition", "Physician"],
    faqTopics: ["conditions treated", "first visit", "insurance", "cost", "outcomes"],
    exampleEntity: "[Name] Chiropractic is a practice in [City] specializing in back pain, sciatica, and sports injuries.",
  },

  security: {
    slug: "security",
    businessType: "LocalBusiness",
    entityLabel: "security alarm dealer / home security company",
    customerLabel: "homeowners and business owners",
    serviceDomain: "home services / safety",
    credentialField: "state alarm contractor license, monitoring certifications",
    primaryDirectories: ["Angi", "HomeAdvisor", "SafeWise", "BBB", "Alarm.org"],
    ymyl: false,
    schemaTypes: ["LocalBusiness", "Service", "Product", "FAQPage"],
    faqTopics: ["monitoring cost", "response time", "equipment brands", "contracts", "AI features", "installation process"],
    exampleEntity: "[Name] Security is a licensed alarm dealer serving [City] with AI-powered security systems and 24/7 monitoring.",
  },

  dental: {
    slug: "dental",
    businessType: "MedicalBusiness",
    entityLabel: "dental practice",
    customerLabel: "patients",
    serviceDomain: "health / medical (YMYL)",
    credentialField: "Doctor of Dental Surgery (DDS/DMD), state license number",
    primaryDirectories: ["Healthgrades", "Zocdoc", "1-800-Dentist", "WebMD"],
    ymyl: true,
    schemaTypes: ["MedicalBusiness", "FAQPage", "MedicalCondition", "Dentist"],
    faqTopics: ["insurance accepted", "emergency dental", "cosmetic options", "cost", "first visit", "sedation"],
    exampleEntity: "[Name] Dental is a practice in [City] offering general, cosmetic, and emergency dental care.",
  },

  plumbing: {
    slug: "plumbing",
    businessType: "HomeAndConstructionBusiness",
    entityLabel: "plumbing company",
    customerLabel: "homeowners",
    serviceDomain: "home services",
    credentialField: "state plumbing contractor license",
    primaryDirectories: ["Angi", "HomeAdvisor", "Yelp", "BBB"],
    ymyl: false,
    schemaTypes: ["LocalBusiness", "Service", "HowTo", "FAQPage"],
    faqTopics: ["emergency plumbing", "cost estimates", "water heater", "drain cleaning", "leak detection", "service area"],
    exampleEntity: "[Name] Plumbing is a licensed plumbing company serving [City] for residential and commercial plumbing.",
  },

  hvac: {
    slug: "hvac",
    businessType: "HomeAndConstructionBusiness",
    entityLabel: "HVAC company",
    customerLabel: "homeowners",
    serviceDomain: "home services",
    credentialField: "state HVAC contractor license, EPA certification",
    primaryDirectories: ["Angi", "HomeAdvisor", "Yelp", "BBB", "ACCA directory"],
    ymyl: false,
    schemaTypes: ["LocalBusiness", "Service", "HowTo", "FAQPage"],
    faqTopics: ["AC repair cost", "furnace replacement", "maintenance plans", "emergency service", "energy efficiency", "financing"],
    exampleEntity: "[Name] HVAC is a licensed heating and cooling company serving [City] for AC repair, installation, and maintenance.",
  },

  electrician: {
    slug: "electrician",
    businessType: "HomeAndConstructionBusiness",
    entityLabel: "electrical contractor",
    customerLabel: "homeowners",
    serviceDomain: "home services",
    credentialField: "state electrical contractor license",
    primaryDirectories: ["Angi", "HomeAdvisor", "Yelp", "BBB"],
    ymyl: false,
    schemaTypes: ["LocalBusiness", "Service", "HowTo", "FAQPage"],
    faqTopics: ["panel upgrade cost", "emergency electrician", "wiring", "EV charger", "generator installation", "permits"],
    exampleEntity: "[Name] Electric is a licensed electrical contractor serving [City] for residential and commercial electrical work.",
  },

  roofing: {
    slug: "roofing",
    businessType: "HomeAndConstructionBusiness",
    entityLabel: "roofing contractor",
    customerLabel: "homeowners / property managers",
    serviceDomain: "home improvement / construction",
    credentialField: "state roofing contractor license (CCC), manufacturer certifications",
    primaryDirectories: ["Angi", "HomeAdvisor", "GAF contractor directory", "BBB"],
    ymyl: false,
    schemaTypes: ["LocalBusiness", "Service", "HowTo", "FAQPage"],
    faqTopics: ["roof lifespan", "repair vs replace", "storm damage", "insurance claims", "cost", "warranty"],
    exampleEntity: "[Name] Roofing is a licensed roofing contractor serving [City] for roof repair, replacement, and storm damage.",
  },

  "law-firm": {
    slug: "law-firm",
    businessType: "LegalService",
    entityLabel: "law firm",
    customerLabel: "clients",
    serviceDomain: "legal (YMYL)",
    credentialField: "state bar number, practice areas",
    primaryDirectories: ["Avvo", "Martindale-Hubbell", "FindLaw", "Justia", "Super Lawyers"],
    ymyl: true,
    schemaTypes: ["LegalService", "FAQPage", "Attorney"],
    faqTopics: ["consultation cost", "case timeline", "experience", "practice areas", "fees", "results"],
    exampleEntity: "[Name] Law is a firm in [City] providing legal representation in [practice areas].",
  },

  "medical-spa": {
    slug: "medical-spa",
    businessType: "MedicalBusiness",
    entityLabel: "medical spa / medspa",
    customerLabel: "clients / patients",
    serviceDomain: "health / aesthetics (YMYL)",
    credentialField: "medical director credentials, state medical license",
    primaryDirectories: ["RealSelf", "Healthgrades", "Yelp", "Google"],
    ymyl: true,
    schemaTypes: ["MedicalBusiness", "FAQPage", "Service", "Product"],
    faqTopics: ["treatment cost", "downtime", "results timeline", "safety", "before/after", "memberships"],
    exampleEntity: "[Name] Med Spa is a medical aesthetics practice in [City] offering Botox, fillers, laser treatments, and body contouring.",
  },

  // Generic fallback for any unrecognized niche
  generic: {
    slug: "generic",
    businessType: "LocalBusiness",
    entityLabel: "local business",
    customerLabel: "customers",
    serviceDomain: "local services",
    credentialField: "business license, industry certifications",
    primaryDirectories: ["Yelp", "BBB", "Angi", "Google"],
    ymyl: false,
    schemaTypes: ["LocalBusiness", "Service", "FAQPage"],
    faqTopics: ["cost", "service area", "hours", "guarantees", "process", "credentials"],
    exampleEntity: "[Name] is a local business serving [City].",
  },
};

/**
 * Find the best niche config for a given industry string.
 * Falls back to 'generic' if no match.
 */
export function getNicheConfig(industry: string): NicheConfig {
  const lower = (industry || "").toLowerCase();

  if (lower.includes("chiro")) return NICHE_CONFIGS.chiropractic;
  if (lower.includes("security") || lower.includes("alarm")) return NICHE_CONFIGS.security;
  if (lower.includes("dental") || lower.includes("dentist")) return NICHE_CONFIGS.dental;
  if (lower.includes("plumb")) return NICHE_CONFIGS.plumbing;
  if (lower.includes("hvac") || lower.includes("heating") || lower.includes("cooling")) return NICHE_CONFIGS.hvac;
  if (lower.includes("electri")) return NICHE_CONFIGS.electrician;
  if (lower.includes("roof")) return NICHE_CONFIGS.roofing;
  if (lower.includes("law") || lower.includes("attorney") || lower.includes("legal")) return NICHE_CONFIGS["law-firm"];
  if (lower.includes("med") && lower.includes("spa") || lower.includes("medspa") || lower.includes("aestheti")) return NICHE_CONFIGS["medical-spa"];

  return NICHE_CONFIGS.generic;
}
