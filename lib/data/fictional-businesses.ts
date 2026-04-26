/**
 * Fictional businesses for the public-facing /examples/[slug] reference sites.
 *
 * IMPORTANT: These are NOT real companies. They're plausible-sounding placeholder
 * businesses used to demonstrate what FDM builds for each niche. The phone numbers
 * are deliberately fake (555-prefix or FDM's own line); addresses are Tampa-based;
 * names avoid being any specific real local company so we don't accidentally
 * compete-with or impersonate.
 *
 * The /preview/[id] routes (internal QA) use REAL Google Places data from
 * data/qa-batch.json. The /examples/[slug] routes (public marketing) use this
 * fictional data instead.
 */

export interface FictionalBusiness {
  niche_slug: string;
  niche_name: string;
  business_name: string;
  /** Owner/principal name — used on Personal Brand archetype heroes */
  founder_name?: string;
  /** Founder's title for Personal Brand archetypes */
  founder_title?: string;
  /** Year founded — drives "20+ years experience" trust signals */
  year_founded: number;
  city: string;
  state: string;
  phone: string;
  /** E.164 for tel: links */
  phone_e164: string;
  street_address: string;
  zip: string;
  /** Tagline / one-liner — overrides niche-design.ts heroContext.tagline if set */
  tagline?: string;
  /** Email for contact section */
  email: string;
  /** Service area description ("Tampa Bay area" / "Florida statewide") */
  service_area?: string;
}

const TAMPA_PHONE_FAKE = "+18885550100"; // deliberately fake 555 prefix

export const FICTIONAL_BUSINESSES: Record<string, FictionalBusiness> = {
  "foundation-repair": {
    niche_slug: "foundation-repair",
    niche_name: "Foundation Repair",
    business_name: "Cornerstone Foundation Repair",
    year_founded: 2003,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0142",
    phone_e164: "+18135550142",
    street_address: "4280 Henderson Blvd, Suite 200",
    zip: "33629",
    email: "hello@cornerstonefoundation.example",
    service_area: "Tampa Bay & Central Florida",
  },

  plumbers: {
    niche_slug: "plumbers",
    niche_name: "Plumbers",
    business_name: "Five-Star Plumbing & Drain",
    year_founded: 2008,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0188",
    phone_e164: "+18135550188",
    street_address: "1820 N Florida Ave",
    zip: "33602",
    email: "service@fivestarplumbing.example",
    service_area: "Hillsborough & Pinellas Counties",
  },

  hvac: {
    niche_slug: "hvac",
    niche_name: "HVAC",
    business_name: "ClearAir HVAC of Tampa",
    year_founded: 1998,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0173",
    phone_e164: "+18135550173",
    street_address: "3915 W Kennedy Blvd",
    zip: "33609",
    email: "comfort@clearairtampa.example",
    service_area: "Greater Tampa Bay",
  },

  roofers: {
    niche_slug: "roofers",
    niche_name: "Roofers",
    business_name: "Sunset Roofing Co.",
    year_founded: 2011,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0167",
    phone_e164: "+18135550167",
    street_address: "5018 W Cypress St",
    zip: "33607",
    email: "estimates@sunsetroofing.example",
    service_area: "Tampa Bay & St. Pete",
  },

  "pool-builders": {
    niche_slug: "pool-builders",
    niche_name: "Pool Builders",
    business_name: "Lagoon & Tile Pool Builders",
    year_founded: 1995,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0125",
    phone_e164: "+18135550125",
    street_address: "10901 Memorial Hwy",
    zip: "33615",
    email: "design@lagoontile.example",
    service_area: "Tampa Bay luxury homes",
    tagline: "Backyards that take your breath away — every time you walk outside.",
  },

  "solar-installers": {
    niche_slug: "solar-installers",
    niche_name: "Solar Installers",
    business_name: "Bright Path Solar",
    year_founded: 2014,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0119",
    phone_e164: "+18135550119",
    street_address: "2402 N Westshore Blvd",
    zip: "33607",
    email: "info@brightpathsolar.example",
    service_area: "Florida statewide",
    tagline: "Lock in your kWh rate before the next utility hike.",
  },

  "polished-concrete": {
    niche_slug: "polished-concrete",
    niche_name: "Polished Concrete",
    business_name: "Concrete Compass Commercial Floors",
    year_founded: 2009,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0156",
    phone_e164: "+18135550156",
    street_address: "8205 Anderson Rd",
    zip: "33634",
    email: "rfp@concretecompass.example",
    service_area: "Florida & Southeast U.S. commercial",
  },

  "decorative-concrete": {
    niche_slug: "decorative-concrete",
    niche_name: "Decorative Concrete",
    business_name: "Patio & Pattern Studio",
    year_founded: 2012,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0147",
    phone_e164: "+18135550147",
    street_address: "1408 N Westshore Blvd",
    zip: "33607",
    email: "studio@patioandpattern.example",
    service_area: "Tampa Bay residential & boutique commercial",
    tagline: "Stamped, stained, and worth showing off.",
  },

  "hair-salons": {
    niche_slug: "hair-salons",
    niche_name: "Hair Salons",
    business_name: "Studio Iris Salon",
    year_founded: 2017,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0134",
    phone_e164: "+18135550134",
    street_address: "240 W Davis Blvd",
    zip: "33606",
    email: "book@studioiris.example",
    service_area: "Hyde Park & Soho District",
    tagline: "The chair where your hair finally gets understood.",
  },

  "medical-spas": {
    niche_slug: "medical-spas",
    niche_name: "Med Spas",
    business_name: "Aurora Aesthetics MedSpa",
    year_founded: 2016,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0192",
    phone_e164: "+18135550192",
    street_address: "510 N Tampa St, Suite 1100",
    zip: "33602",
    email: "concierge@auroraaesthetics.example",
    service_area: "Downtown Tampa & Westshore",
    tagline: "Medical-grade. Spa-soft. Results that actually show up.",
  },

  "auto-body": {
    niche_slug: "auto-body",
    niche_name: "Auto Body",
    business_name: "First Coast Auto Body",
    year_founded: 2001,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0103",
    phone_e164: "+18135550103",
    street_address: "6402 N Florida Ave",
    zip: "33604",
    email: "estimates@firstcoastautobody.example",
    service_area: "Tampa Bay & Pasco County",
  },

  "mobile-pet-grooming": {
    niche_slug: "mobile-pet-grooming",
    niche_name: "Mobile Pet Grooming",
    business_name: "Doorstep Dog Grooming",
    year_founded: 2019,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0181",
    phone_e164: "+18135550181",
    street_address: "Mobile service throughout Tampa Bay",
    zip: "33602",
    email: "hello@doorstepdog.example",
    service_area: "Hillsborough & Pinellas Counties",
    tagline: "We come to you. Your dog stays calm. Everyone wins.",
  },

  fitness: {
    niche_slug: "fitness",
    niche_name: "Fitness",
    business_name: "Reps & Recovery Studio",
    year_founded: 2018,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0177",
    phone_e164: "+18135550177",
    street_address: "1501 W Kennedy Blvd",
    zip: "33606",
    email: "front-desk@repsandrecovery.example",
    service_area: "South Tampa & Hyde Park",
    tagline: "First class is on us. Show up — that's the hard part.",
  },

  "stair-lift": {
    niche_slug: "stair-lift",
    niche_name: "Stair Lift",
    business_name: "Tampa Bay Stair Lift Co.",
    year_founded: 2007,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0152",
    phone_e164: "+18135550152",
    street_address: "1320 W Kennedy Blvd",
    zip: "33606",
    email: "care@tampastairlift.example",
    service_area: "Tampa Bay & Sarasota",
    tagline: "Mom or Dad shouldn't avoid the upstairs. Same-week installs.",
  },

  "real-estate": {
    niche_slug: "real-estate",
    niche_name: "Real Estate",
    business_name: "Marina Reed, Realtor®",
    founder_name: "Marina Reed",
    founder_title: "Top-producing agent · Tampa Bay & Pinellas",
    year_founded: 2014,
    city: "Tampa",
    state: "FL",
    phone: "(813) 555-0116",
    phone_e164: "+18135550116",
    street_address: "100 N Tampa St, Suite 3200",
    zip: "33602",
    email: "marina@marinareed.example",
    service_area: "Tampa Bay & Pinellas waterfront specialty",
    tagline: "Local market. National network. Your move.",
  },
};

export function getFictionalBusiness(slug: string): FictionalBusiness | null {
  return FICTIONAL_BUSINESSES[slug] ?? null;
}

export function listFictionalBusinesses(): FictionalBusiness[] {
  return Object.values(FICTIONAL_BUSINESSES);
}
