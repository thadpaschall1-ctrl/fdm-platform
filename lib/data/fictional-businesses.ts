/**
 * Fictional businesses for the public-facing /examples/[slug] reference sites.
 *
 * IMPORTANT: These are NOT real companies. They are deliberately composed to:
 *   - Avoid colliding with any specific real local company
 *   - Spread across 15 distinct U.S. metros (FDM serves the whole country)
 *   - Use phone numbers in the 555-prefix range (E.164 invalid by FCC reservation)
 *   - Use *.example email addresses (RFC 2606 reserved TLD — guaranteed not real)
 *
 * Names favor unusual word pairings, regional-but-not-iconic landmarks, and
 * compound nouns to minimize the chance of overlapping with an actual business.
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
  /** Service area description, e.g. "Greater [Metro] & surrounding counties" */
  service_area?: string;
}

export const FICTIONAL_BUSINESSES: Record<string, FictionalBusiness> = {
  "foundation-repair": {
    niche_slug: "foundation-repair",
    niche_name: "Foundation Repair",
    business_name: "Bedrock Foundation Specialists",
    year_founded: 2003,
    city: "Plano",
    state: "TX",
    phone: "(469) 555-0142",
    phone_e164: "+14695550142",
    street_address: "5800 Tennyson Pkwy, Suite 220",
    zip: "75024",
    email: "hello@bedrockfoundation.example",
    service_area: "Dallas–Fort Worth Metroplex",
  },

  plumbers: {
    niche_slug: "plumbers",
    niche_name: "Plumbers",
    business_name: "Cactus Hollow Plumbing & Drain",
    year_founded: 2008,
    city: "Phoenix",
    state: "AZ",
    phone: "(602) 555-0188",
    phone_e164: "+16025550188",
    street_address: "2438 W Indian School Rd",
    zip: "85015",
    email: "service@cactushollowplumbing.example",
    service_area: "Maricopa County & East Valley",
  },

  hvac: {
    niche_slug: "hvac",
    niche_name: "HVAC",
    business_name: "Cypress Pine HVAC",
    year_founded: 1998,
    city: "Atlanta",
    state: "GA",
    phone: "(404) 555-0173",
    phone_e164: "+14045550173",
    street_address: "1840 Howell Mill Rd NW",
    zip: "30318",
    email: "comfort@cypresspinehvac.example",
    service_area: "Greater Atlanta & North Fulton",
  },

  roofers: {
    niche_slug: "roofers",
    niche_name: "Roofers",
    business_name: "Snowcap Roofing Co.",
    year_founded: 2011,
    city: "Denver",
    state: "CO",
    phone: "(303) 555-0167",
    phone_e164: "+13035550167",
    street_address: "4385 S Quebec St",
    zip: "80237",
    email: "estimates@snowcaproofing.example",
    service_area: "Denver Metro & Front Range corridor",
  },

  "pool-builders": {
    niche_slug: "pool-builders",
    niche_name: "Pool Builders",
    business_name: "Sonora Pool & Outdoor Living",
    year_founded: 1995,
    city: "Scottsdale",
    state: "AZ",
    phone: "(480) 555-0125",
    phone_e164: "+14805550125",
    street_address: "8550 E Shea Blvd",
    zip: "85260",
    email: "design@sonorapool.example",
    service_area: "Scottsdale, Paradise Valley & Cave Creek",
    tagline: "Backyards that take your breath away — every time you walk outside.",
  },

  "solar-installers": {
    niche_slug: "solar-installers",
    niche_name: "Solar Installers",
    business_name: "Pacific Crest Solar",
    year_founded: 2014,
    city: "San Diego",
    state: "CA",
    phone: "(619) 555-0119",
    phone_e164: "+16195550119",
    street_address: "9560 Waples St",
    zip: "92121",
    email: "info@pacificcrestsolar.example",
    service_area: "San Diego County & North County",
    tagline: "Lock in your kWh rate before the next utility hike.",
  },

  "polished-concrete": {
    niche_slug: "polished-concrete",
    niche_name: "Polished Concrete",
    business_name: "Lakefront Industrial Floors",
    year_founded: 2009,
    city: "Chicago",
    state: "IL",
    phone: "(312) 555-0156",
    phone_e164: "+13125550156",
    street_address: "2240 W 21st St",
    zip: "60608",
    email: "rfp@lakefrontfloors.example",
    service_area: "Chicagoland & Northern Indiana commercial",
  },

  "decorative-concrete": {
    niche_slug: "decorative-concrete",
    niche_name: "Decorative Concrete",
    business_name: "Hill Country Concrete Studio",
    year_founded: 2012,
    city: "Austin",
    state: "TX",
    phone: "(512) 555-0147",
    phone_e164: "+15125550147",
    street_address: "4914 N Lamar Blvd",
    zip: "78751",
    email: "studio@hillcountryconcrete.example",
    service_area: "Austin, Round Rock & Hill Country",
    tagline: "Stamped, stained, and worth showing off.",
  },

  "hair-salons": {
    niche_slug: "hair-salons",
    niche_name: "Hair Salons",
    business_name: "Studio Quill Salon",
    year_founded: 2017,
    city: "Nashville",
    state: "TN",
    phone: "(615) 555-0134",
    phone_e164: "+16155550134",
    street_address: "1308 12th Ave S",
    zip: "37203",
    email: "book@studioquill.example",
    service_area: "12 South & Belmont",
    tagline: "The chair where your hair finally gets understood.",
  },

  "medical-spas": {
    niche_slug: "medical-spas",
    niche_name: "Med Spas",
    business_name: "Coastline Aesthetics MedSpa",
    year_founded: 2016,
    city: "Miami",
    state: "FL",
    phone: "(305) 555-0192",
    phone_e164: "+13055550192",
    street_address: "2600 Biscayne Blvd, Suite 410",
    zip: "33137",
    email: "concierge@coastlineaesthetics.example",
    service_area: "Miami Edgewater, Brickell & Wynwood",
    tagline: "Medical-grade. Spa-soft. Results that actually show up.",
  },

  "auto-body": {
    niche_slug: "auto-body",
    niche_name: "Auto Body",
    business_name: "Coachline Auto Body Works",
    year_founded: 2001,
    city: "Royal Oak",
    state: "MI",
    phone: "(248) 555-0103",
    phone_e164: "+12485550103",
    street_address: "4820 N Main St",
    zip: "48073",
    email: "estimates@coachlineautobody.example",
    service_area: "Oakland County & Metro Detroit",
  },

  "mobile-pet-grooming": {
    niche_slug: "mobile-pet-grooming",
    niche_name: "Mobile Pet Grooming",
    business_name: "Tail & Tonic Mobile Grooming",
    year_founded: 2019,
    city: "Charlotte",
    state: "NC",
    phone: "(704) 555-0181",
    phone_e164: "+17045550181",
    street_address: "Mobile service throughout Mecklenburg County",
    zip: "28203",
    email: "hello@tailandtonic.example",
    service_area: "Charlotte, Matthews, Ballantyne & Lake Norman",
    tagline: "We come to you. Your dog stays calm. Everyone wins.",
  },

  fitness: {
    niche_slug: "fitness",
    niche_name: "Fitness",
    business_name: "Foothills Strength Studio",
    year_founded: 2018,
    city: "Boulder",
    state: "CO",
    phone: "(303) 555-0177",
    phone_e164: "+13035550177",
    street_address: "1820 30th St",
    zip: "80301",
    email: "front-desk@foothillsstrength.example",
    service_area: "Boulder & Louisville",
    tagline: "First class is on us. Show up — that’s the hard part.",
  },

  "stair-lift": {
    niche_slug: "stair-lift",
    niche_name: "Stair Lift",
    business_name: "Allegheny Stair Lift Co.",
    year_founded: 2007,
    city: "Pittsburgh",
    state: "PA",
    phone: "(412) 555-0152",
    phone_e164: "+14125550152",
    street_address: "1100 Liberty Ave",
    zip: "15222",
    email: "care@alleghenystairlift.example",
    service_area: "Western PA, Eastern OH & Northern WV",
    tagline: "Mom or Dad shouldn’t avoid the upstairs. Same-week installs.",
  },

  "real-estate": {
    niche_slug: "real-estate",
    niche_name: "Real Estate",
    business_name: "Hayden Pierce, Realtor®",
    founder_name: "Hayden Pierce",
    founder_title: "Top-producing agent · Treasure Valley & Boise foothills",
    year_founded: 2014,
    city: "Boise",
    state: "ID",
    phone: "(208) 555-0116",
    phone_e164: "+12085550116",
    street_address: "950 W Bannock St, Suite 1100",
    zip: "83702",
    email: "hayden@haydenpierce.example",
    service_area: "Boise, Eagle, Meridian & Treasure Valley foothills",
    tagline: "Local market. National network. Your move.",
  },
};

export function getFictionalBusiness(slug: string): FictionalBusiness | null {
  return FICTIONAL_BUSINESSES[slug] ?? null;
}

export function listFictionalBusinesses(): FictionalBusiness[] {
  return Object.values(FICTIONAL_BUSINESSES);
}
