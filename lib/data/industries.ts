export interface IndustryData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  painPoints: string[];
  solutions: { title: string; description: string }[];
  stats: { value: string; label: string }[];
  faqs: { question: string; answer: string }[];
  /** Old URLs that should 301 redirect to this page */
  redirectFrom?: string[];
  /**
   * If set, every "Get Started" / "Try Demo" CTA on this page routes to this
   * external URL instead of FDM's own /pricing or /demo. Used for verticals
   * where FDM already ranks for the keyword but we have a better-specialized
   * brand elsewhere (e.g. chiropractors → growyourchiropracticpractice.com).
   * The FDM page keeps its Google ranking, but conversions flow to the
   * specialist platform.
   */
  externalCtaUrl?: string;
  /** Label shown on external-CTA buttons. Defaults to "Get Started →" */
  externalCtaLabel?: string;
  /**
   * Short explanatory line shown above the pricing section when
   * externalCtaUrl is set (e.g. "We built a platform specifically for
   * chiropractors. Check it out →").
   */
  externalCtaCallout?: string;
}
// NOTE: Pricing was removed per-industry. All industries share UNIFIED_PACKAGES
// from `./packages.ts`. Change pricing once, updates across all 34 industries.

export const INDUSTRIES: IndustryData[] = [
  {
    slug: "security-companies",
    name: "Security & Alarm Companies",
    metaTitle: "Digital Marketing for Security Companies | AI Automation | Fast Digital Marketing",
    metaDescription: "AI-powered marketing for security and alarm companies. AI voice agents, SEO, lead generation, and automated follow-up — built to fill your install calendar.",
    hero: "Fill Your Install Calendar on Autopilot",
    painPoints: [
      "Missed calls from potential customers go straight to competitors",
      "Your website doesn't rank for '[city] security company' or '[city] alarm installation'",
      "Following up with leads takes too long — they've already called someone else",
      "You're paying for ads but can't track which ones actually generate installs",
      "After-hours calls go to voicemail and you lose the sale",
    ],
    solutions: [
      { title: "AI Voice Receptionist", description: "A 24/7 AI agent that answers every call, qualifies leads, and books consultations — even at 2am when a homeowner's alarm goes off and they want a new system." },
      { title: "Local SEO Domination", description: "We get you ranking for 'security company near me', 'alarm installation [city]', and 'home security [city]' in Google and AI search engines." },
      { title: "Automated Lead Follow-Up", description: "Every lead gets an instant text and email response, followed by a multi-step nurture sequence. No more leads slipping through the cracks." },
      { title: "Review Autopilot", description: "After every installation, customers automatically receive a review request. Your 5-star reviews build trust and boost your Google Maps ranking." },
      { title: "Smart Website", description: "A fast, mobile-optimized website built to convert visitors into booked consultations — with online scheduling, click-to-call, and trust signals." },
    ],
    stats: [
      { value: "62%", label: "of calls to security companies go unanswered" },
      { value: "$4.2B", label: "US residential security market (2026)" },
      { value: "73%", label: "of homeowners research online before buying" },
      { value: "3.8x", label: "average ROAS for security company Google Ads" },
    ],
    faqs: [
      { question: "Do you work with both residential and commercial security companies?", answer: "Yes. Our marketing systems work for residential alarm installers, commercial security integrators, access control companies, and monitoring service providers. We customize the messaging for your specific market." },
      { question: "Can the AI receptionist handle technical security questions?", answer: "Yes. We train the AI on your specific products, services, and common customer questions. It can explain the difference between monitored and unmonitored systems, discuss camera options, and qualify leads based on property type and budget." },
      { question: "How do you generate security leads?", answer: "Through a combination of local SEO (ranking for 'security company near me'), Google Ads targeting high-intent keywords, and automated follow-up systems that convert website visitors and callers into booked consultations." },
    ],
    redirectFrom: [],
  },
  {
    slug: "chiropractors",
    name: "Chiropractors",
    metaTitle: "Chiropractic Marketing Agency | AI-Powered Growth | Fast Digital Marketing",
    metaDescription: "Marketing automation for chiropractic practices. AI receptionist, review generation, patient reactivation, and local SEO — get more patients without more staff.",
    hero: "Get More Patients Without More Staff",
    painPoints: [
      "New patient flow is inconsistent month to month",
      "Your front desk misses calls during adjustments and lunch breaks",
      "Patients don't leave Google reviews unless you remind them (repeatedly)",
      "Inactive patients sitting in your EHR could be reactivated but nobody has time",
      "You're invisible on Google Maps compared to the chiropractor down the street",
    ],
    solutions: [
      { title: "AI Voice Receptionist", description: "Never miss a new patient call again. Your AI receptionist answers 24/7, schedules appointments, and answers common questions about insurance, services, and availability." },
      { title: "Review Autopilot", description: "After every visit, patients automatically get a review request via text. Happy patients go to Google, unhappy ones come to you privately. Watch your star rating climb." },
      { title: "Patient Reactivation", description: "We identify patients who haven't visited in 3-6+ months and automatically reach out with personalized messages to bring them back." },
      { title: "Local SEO & AI Search", description: "We optimize your Google Business Profile, build local citations, and structure your site so Google, ChatGPT, and Perplexity recommend you when patients search." },
      { title: "Smart Website", description: "A modern, fast website that showcases your practice, ranks on Google, and converts visitors into booked appointments — not a template, a custom-built site." },
    ],
    stats: [
      { value: "35M+", label: "Americans visit chiropractors annually" },
      { value: "47%", label: "of patients find their chiropractor via Google" },
      { value: "$47", label: "average CPC for 'car accident chiropractor'" },
      { value: "5x", label: "more likely to book with 50+ Google reviews" },
    ],
    faqs: [
      { question: "I already have a website. Do I need a new one?", answer: "Not necessarily. If your current site is fast, mobile-friendly, and converts visitors into patients, we'll optimize it. If it's a slow WordPress site from 2019, a rebuild will pay for itself in new patients within the first month." },
      { question: "How does patient reactivation work?", answer: "We connect to your practice management system, identify patients who haven't visited in a set period, and send them personalized text and email outreach. Most practices reactivate 15-25% of dormant patients in the first campaign." },
      { question: "Is this HIPAA compliant?", answer: "Yes. We don't access or store protected health information. Our systems handle appointment scheduling and marketing communications only — no clinical data." },
    ],
    redirectFrom: ["/seo-for-chiropractors", "/ai-for-chiropractors"],
    // FDM ranks #1 for "Fast Digital Marketing for Chiropractors" — we keep the
    // SEO equity here and funnel converting traffic to GYCP (our specialized
    // chiropractic platform with patient reactivation + EHR integration etc.)
    externalCtaUrl: "https://growyourchiropracticpractice.com",
    externalCtaLabel: "Visit Our Chiropractic Platform →",
    externalCtaCallout: "We built a whole platform specifically for chiropractors — Grow Your Chiropractic Practice. Purpose-designed for patient reactivation, HIPAA-compliant workflows, and chiro-specific SEO. Check it out to see everything tailored to your practice.",
  },
  {
    slug: "dental",
    name: "Dental Practices",
    metaTitle: "Dental Marketing Agency | AI Automation for Dentists | Fast Digital Marketing",
    metaDescription: "Fill your hygiene schedule and attract high-value cases. AI receptionist, review automation, patient reactivation, and SEO built specifically for dental practices.",
    hero: "Fill Your Chair Time. Attract Better Cases.",
    painPoints: [
      "Hygiene schedule has gaps but your front desk is too busy to fill them",
      "You lose new patient calls to voicemail during procedures",
      "Patients cancel or no-show and nobody follows up fast enough",
      "Your Google reviews are stale while the new practice down the road has 200+",
      "You want more implant/cosmetic cases but only attract cleanings",
    ],
    solutions: [
      { title: "AI Voice Receptionist", description: "Your AI receptionist handles new patient calls, insurance questions, and appointment scheduling while your front desk focuses on in-office patients. Works 24/7." },
      { title: "Review Autopilot", description: "Automated review requests after every appointment. Patients get a text, tap a link, and leave a Google review in 30 seconds." },
      { title: "Recall & Reactivation", description: "Patients overdue for cleanings get automated text and email reminders. We fill hygiene gaps without your staff making phone calls." },
      { title: "High-Value Case SEO", description: "We rank you for 'dental implants [city]', 'cosmetic dentist near me', and other high-CPC keywords that attract profitable cases." },
      { title: "Smart Website", description: "A fast, modern website with online scheduling, before/after galleries, and trust signals that convert visitors into patients." },
    ],
    stats: [
      { value: "$140", label: "average CPC for 'dental implants near me'" },
      { value: "68%", label: "of patients choose a dentist based on reviews" },
      { value: "$300K+", label: "average annual revenue lost to inactive patients" },
      { value: "24hrs", label: "to get your AI receptionist live" },
    ],
    faqs: [
      { question: "Can the AI handle insurance verification questions?", answer: "The AI can confirm which insurance plans you accept, explain your office's insurance process, and direct patients to provide their info for verification. It won't verify benefits in real-time, but it handles the conversation naturally." },
      { question: "How do you help attract implant and cosmetic cases?", answer: "Through targeted Google Ads for high-intent keywords like 'dental implants near me' combined with landing pages designed to convert. We also optimize your site content to rank organically for these high-value terms." },
      { question: "What if we use Dentrix/Eaglesoft/Open Dental?", answer: "Our systems integrate with all major dental practice management software for appointment scheduling and patient data. We'll set up the connection during onboarding." },
    ],
    redirectFrom: [],
  },
  {
    slug: "plumbers",
    name: "Plumbing Companies",
    metaTitle: "Plumber Marketing | AI Lead Generation for Plumbers | Fast Digital Marketing",
    metaDescription: "Marketing automation for plumbing companies. AI receptionist for after-hours calls, SEO for emergency keywords, and automated follow-up that books more jobs.",
    hero: "Book More Jobs. Answer Every Call.",
    painPoints: [
      "Emergency calls come in after hours and go to voicemail — the customer calls the next plumber",
      "You're spending on ads but can't tell which ones actually generate booked jobs",
      "Your technicians are too busy to call back leads quickly",
      "The big franchises dominate Google in your area",
      "Seasonal demand swings leave you either slammed or slow",
    ],
    solutions: [
      { title: "AI Voice Receptionist", description: "Emergency plumbing calls don't wait until morning. Your AI answers 24/7, qualifies the emergency, and either dispatches or schedules — even at 3am when a pipe bursts." },
      { title: "Local SEO for Emergency Keywords", description: "We rank you for 'emergency plumber near me', 'plumber [city]', and '24 hour plumber' — the keywords people search when they need help NOW." },
      { title: "Automated Lead Follow-Up", description: "Every lead gets an instant text response. Non-emergency quotes get a nurture sequence. No lead gets forgotten because a tech was on a job." },
      { title: "Review Autopilot", description: "After every completed job, your customer gets an automated review request. Plumbers with 100+ Google reviews dominate the Map Pack." },
      { title: "Smart Website", description: "A fast website with click-to-call, online booking, service area maps, and trust signals that convert panicked homeowners into booked jobs." },
    ],
    stats: [
      { value: "85%", label: "of plumbing calls are emergencies needing same-day service" },
      { value: "$35-65", label: "average CPC for plumbing keywords" },
      { value: "5 min", label: "response time to convert 50% more leads" },
      { value: "93%", label: "of homeowners check reviews before hiring" },
    ],
    faqs: [
      { question: "Can the AI dispatch emergency calls?", answer: "Yes. The AI can qualify the emergency (burst pipe vs. dripping faucet), collect the customer's address and details, and either transfer to your on-call tech or schedule a next-day appointment based on your rules." },
      { question: "Do you manage Google Local Service Ads (LSAs)?", answer: "Yes, on our Pro plan. LSAs show up above regular Google Ads with a Google Guaranteed badge. For plumbers, they're often the highest-converting ad format." },
      { question: "How do you handle seasonal fluctuations?", answer: "We adjust your ad spend and SEO focus seasonally — heavy on emergency/heating keywords in winter, drain/AC keywords in summer. Your marketing matches your demand patterns." },
    ],
    redirectFrom: [],
  },
  {
    slug: "hvac",
    name: "HVAC Companies",
    metaTitle: "HVAC Marketing | AI Automation for HVAC Companies | Fast Digital Marketing",
    metaDescription: "Fill your HVAC schedule year-round. AI voice receptionist, local SEO, seasonal campaigns, and review automation built for heating and cooling companies.",
    hero: "Stay Booked Through Every Season",
    painPoints: [
      "Summer and winter are slammed — spring and fall are dead",
      "Competitors with bigger budgets outrank you on Google",
      "After-hours AC emergency calls go to voicemail in the middle of a heat wave",
      "Your maintenance agreement renewal rate is too low",
      "You can't track which marketing actually generates booked jobs",
    ],
    solutions: [
      { title: "AI Voice Receptionist", description: "When it's 100 degrees and the phone won't stop ringing, your AI handles overflow calls, qualifies emergencies, and books appointments while your dispatchers focus on scheduling techs." },
      { title: "Seasonal SEO Strategy", description: "We optimize for AC keywords in summer, heating keywords in winter, and maintenance/tune-up keywords in the shoulder seasons to smooth out your demand curve." },
      { title: "Maintenance Agreement Campaigns", description: "Automated campaigns to sell new maintenance agreements and renew existing ones — creating predictable recurring revenue through slow seasons." },
      { title: "Review Autopilot", description: "Automated review requests after every install and service call. HVAC companies with 200+ reviews dominate their local market." },
      { title: "Smart Website", description: "A modern website with emergency click-to-call, online scheduling for tune-ups, and financing information that converts visitors into booked jobs." },
    ],
    stats: [
      { value: "$50-80", label: "average CPC for HVAC emergency keywords" },
      { value: "4.5x", label: "lifetime value of a maintenance agreement customer" },
      { value: "76%", label: "of HVAC searches happen on mobile" },
      { value: "48hrs", label: "to get your AI receptionist live" },
    ],
    faqs: [
      { question: "How do you handle the seasonal nature of HVAC?", answer: "We adjust your entire strategy seasonally: AC repair/install keywords and ads in summer, heating keywords in winter, and maintenance/tune-up campaigns in spring and fall. Your marketing budget works harder in peak season and maintains visibility in off-peak." },
      { question: "Can the AI handle warranty and maintenance agreement questions?", answer: "Yes. We train the AI on your warranty terms, maintenance agreement benefits, and common questions. It can sell the value of a maintenance agreement to callers who might not know you offer one." },
      { question: "Do you work with residential and commercial HVAC?", answer: "Yes. We customize the messaging, keywords, and landing pages for your target market. Commercial HVAC keywords have different intent than residential, and we optimize for both." },
    ],
    redirectFrom: [],
  },
  {
    slug: "electricians",
    name: "Electrical Contractors",
    metaTitle: "Electrician Marketing | AI Lead Generation for Electricians | Fast Digital Marketing",
    metaDescription: "Marketing automation for electrical contractors. AI receptionist, local SEO, Google Ads, and automated follow-up that books more jobs and grows your business.",
    hero: "More Calls. More Jobs. Less Hassle.",
    painPoints: [
      "You're losing emergency calls to voicemail when you're on a job site",
      "Homeowners call 3 electricians and hire whoever answers first",
      "Your Google listing has fewer reviews than the guy who started last year",
      "You know you should be marketing but you're too busy running jobs",
      "Permit and inspection scheduling eats up your admin time",
    ],
    solutions: [
      { title: "AI Voice Receptionist", description: "Your AI answers every call — even when you're up a ladder. It qualifies the job (panel upgrade vs. outlet install vs. emergency), collects details, and books the estimate." },
      { title: "Local SEO", description: "We rank you for 'electrician near me', 'emergency electrician [city]', and 'electrical panel upgrade [city]' — the searches that turn into booked jobs." },
      { title: "Automated Lead Follow-Up", description: "Estimates that don't close immediately get an automated follow-up sequence. Most homeowners need 2-3 touchpoints before deciding — your follow-up happens automatically." },
      { title: "Review Autopilot", description: "After every completed job, your customer gets an automated review request. More reviews = higher Google rankings = more calls." },
      { title: "Smart Website", description: "A professional website with your services, service area, licensing info, and online booking that makes homeowners confident in hiring you." },
    ],
    stats: [
      { value: "$30-55", label: "average CPC for electrician keywords" },
      { value: "78%", label: "of homeowners hire the first electrician who answers" },
      { value: "62%", label: "of electrical service calls are emergencies" },
      { value: "3x", label: "more leads with 100+ Google reviews" },
    ],
    faqs: [
      { question: "Can the AI tell the difference between an emergency and a routine job?", answer: "Yes. We train the AI to ask the right questions: Are you without power? Do you smell burning? Is there exposed wiring? It qualifies emergencies for immediate dispatch and schedules routine work for your next available slot." },
      { question: "I'm a one-person operation. Is this worth it?", answer: "Especially for one-person shops. You can't answer the phone when you're pulling wire. Every missed call is a lost job. The AI receptionist alone typically pays for itself with 1-2 extra jobs per month." },
      { question: "Do you handle commercial electrical contractor marketing too?", answer: "Yes. Commercial keywords and messaging are different from residential, and we optimize for both. Commercial jobs are higher value, so the ROI on marketing is even better." },
    ],
    redirectFrom: [],
  },
  {
    slug: "roofers",
    name: "Roofing Companies",
    metaTitle: "Roofing Marketing | AI Lead Generation for Roofers | Fast Digital Marketing",
    metaDescription: "Fill your roofing pipeline year-round. AI receptionist, storm damage SEO, Google Ads, and review automation built for residential and commercial roofers.",
    hero: "Fill Your Pipeline Rain or Shine",
    painPoints: [
      "Storm season brings a flood of calls you can't handle — then it goes quiet",
      "Homeowners get 3-5 roofing quotes and you can't follow up fast enough",
      "Your competitors have 500 Google reviews and you have 30",
      "You're paying for leads from HomeAdvisor/Angi but the quality is terrible",
      "Insurance restoration jobs are lucrative but hard to market for",
    ],
    solutions: [
      { title: "AI Voice Receptionist", description: "After a storm, your phone explodes. Your AI handles the overflow, qualifies storm damage vs. maintenance calls, collects addresses for inspections, and books estimates — while your sales team runs appointments." },
      { title: "Storm & Emergency SEO", description: "We rank you for 'roof repair near me', 'storm damage roof [city]', and 'emergency roof tarp [city]' — so you're the first name homeowners see after hail hits." },
      { title: "Speed-to-Lead Automation", description: "The first roofer to respond usually wins the job. Our system responds to every lead in under 60 seconds with a text, email, and call-back — automatically." },
      { title: "Review Autopilot", description: "After every completed roof, your customer automatically gets a review request. Roofers with 200+ reviews charge more and close faster." },
      { title: "Smart Website", description: "A professional site with before/after galleries, financing info, manufacturer certifications, and instant quote requests." },
    ],
    stats: [
      { value: "$40-90", label: "average CPC for roofing keywords" },
      { value: "5 min", label: "response window to 10x your close rate" },
      { value: "$12K+", label: "average residential roof job value" },
      { value: "91%", label: "of homeowners check online reviews for roofers" },
    ],
    faqs: [
      { question: "How do you handle storm chasing seasons?", answer: "We pre-build storm campaigns that can be activated the day hail or wind hits your market. Within hours of a storm, your Google Ads, social posts, and AI receptionist are all optimized for storm damage calls." },
      { question: "Can you help with insurance restoration marketing?", answer: "Yes. We create content and campaigns targeting homeowners who've filed insurance claims and need a contractor. The AI can also explain your insurance claim process to callers." },
      { question: "What about commercial roofing?", answer: "Commercial roofing has different keywords, longer sales cycles, and higher ticket values. Our Pro plan includes commercial-specific campaigns targeting property managers, HOAs, and facility directors." },
    ],
    redirectFrom: ["/ai-for-roofers"],
  },
  {
    slug: "law-firms",
    name: "Law Firms",
    metaTitle: "Law Firm Marketing | Legal Marketing Agency | Fast Digital Marketing",
    metaDescription: "Client acquisition for law firms. AI intake receptionist, local SEO, Google Ads for high-value cases, and automated follow-up — ethically compliant marketing that works.",
    hero: "More Clients. Higher Value Cases.",
    painPoints: [
      "Potential clients call after hours and hire the firm that answers",
      "Your cost per lead from Google Ads keeps climbing",
      "Intake staff is overwhelmed and potential clients wait on hold",
      "You need more personal injury/family law/estate cases but attract the wrong type",
      "Competing with firms that spend $50K+/month on marketing",
    ],
    solutions: [
      { title: "AI Intake Receptionist", description: "Your AI answers every call 24/7, conducts preliminary intake, qualifies the case type, and schedules consultations. Potential clients get immediate attention instead of voicemail." },
      { title: "Practice Area SEO", description: "We rank you for high-value practice area keywords: 'personal injury lawyer [city]', 'divorce attorney near me', 'estate planning lawyer [city]' — whichever cases you want more of." },
      { title: "High-Intent Google Ads", description: "Targeted campaigns for your most profitable case types with conversion tracking that shows exactly which keywords generate signed clients, not just calls." },
      { title: "Speed-to-Lead Follow-Up", description: "In legal, the first firm to respond wins 50% of the time. Our system responds to every inquiry in under 60 seconds — 24/7." },
      { title: "Smart Website", description: "A professional, trust-building website with attorney profiles, practice area pages, case results, and clear calls-to-action that converts visitors into consultations." },
    ],
    stats: [
      { value: "$100-500", label: "average CPC for personal injury keywords" },
      { value: "79%", label: "of legal consumers search online first" },
      { value: "60 sec", label: "response time increases conversion 5x" },
      { value: "42%", label: "of potential clients contact only one firm" },
    ],
    faqs: [
      { question: "Is AI intake ethically compliant?", answer: "Yes. The AI identifies itself as an automated assistant, not an attorney. It collects basic information and schedules consultations — it does not provide legal advice. We ensure compliance with your state bar's advertising and intake rules." },
      { question: "What practice areas do you specialize in?", answer: "We've driven results for personal injury, family law, criminal defense, estate planning, immigration, and employment law firms. The marketing principles are the same; we customize the strategy for your specific practice areas." },
      { question: "Can the AI qualify cases during intake?", answer: "Yes. We train the AI to ask qualifying questions specific to your practice areas — statute of limitations, injury severity, case type, jurisdiction — so your attorneys only spend time on viable cases." },
    ],
    redirectFrom: [],
  },
  {
    slug: "medical-spas",
    name: "Medical Spas & Aesthetics",
    metaTitle: "Medspa Marketing | Medical Spa Marketing Agency | Fast Digital Marketing",
    metaDescription: "Fill your treatment rooms with high-value clients. AI receptionist, SEO for aesthetics keywords, review automation, and social media built for medical spas.",
    hero: "Attract Premium Clients on Autopilot",
    painPoints: [
      "Your Botox and filler keywords are dominated by big chains and directories",
      "Potential clients DM you on Instagram but nobody responds fast enough",
      "Membership and package sales are inconsistent month to month",
      "Your before/after photos are amazing but your website doesn't showcase them",
      "You need more high-value treatments (body contouring, laser) but attract bargain shoppers",
    ],
    solutions: [
      { title: "AI Voice & Chat Receptionist", description: "Answer calls and website chat 24/7. The AI books consultations, answers service questions, and handles pricing inquiries — even when your aestheticians are mid-treatment." },
      { title: "Aesthetics SEO", description: "Rank for 'Botox near me', 'lip filler [city]', 'CoolSculpting [city]', and other high-intent aesthetics keywords that attract clients ready to book." },
      { title: "Social Media & Visual Marketing", description: "Strategic Instagram, TikTok, and Facebook content showcasing your results. Before/after galleries, treatment videos, and provider spotlights that build trust and drive bookings." },
      { title: "Review & Reputation Management", description: "Automated review requests, professional responses to all reviews, and a reputation monitoring system that protects your brand." },
      { title: "Smart Website", description: "A visually stunning website with treatment menus, before/after galleries, provider bios, and online booking that converts browsers into booked consultations." },
    ],
    stats: [
      { value: "$21B", label: "US medical aesthetics market (2026)" },
      { value: "$60-150", label: "average CPC for Botox/filler keywords" },
      { value: "89%", label: "of medspa clients research online first" },
      { value: "3.2x", label: "average lifetime value of a membership client" },
    ],
    faqs: [
      { question: "Can the AI handle sensitive aesthetic questions?", answer: "Yes. We train the AI to answer common questions about treatments, downtime, pricing ranges, and candidacy — while appropriately directing medical questions to your providers. It's trained to be warm and non-judgmental." },
      { question: "How do you help sell memberships and packages?", answer: "Through targeted email campaigns, social media promotions, and website optimization that highlights the value of your membership programs. We also set up automated renewal reminders and win-back campaigns for lapsed members." },
      { question: "Do you create before/after content?", answer: "We help you set up a system for capturing and organizing before/after photos, then we optimize and deploy them across your website, social media, and Google Business Profile. You take the photos; we make them work for you." },
    ],
    redirectFrom: [],
  },
  {
    slug: "foundation-repair",
    name: "Foundation Repair Contractors",
    metaTitle: "Foundation Repair Marketing | AI Lead Generation for Foundation Contractors | Fast Digital Marketing",
    metaDescription: "Marketing automation for foundation repair companies. AI voice agent handles panicked homeowners 24/7, SEO for urgent foundation searches, and follow-up that books more $10K+ assessments.",
    hero: "Book More Assessments. Close More $10K+ Jobs.",
    painPoints: [
      "Panicked homeowners call after seeing a crack — and go to voicemail if your crew is out on a job",
      "Every missed call is a $5K–$30K job that went to the next contractor on Google",
      "Big-ticket decisions mean long sales cycles — 'just getting quotes' prospects disappear without follow-up",
      "Technical questions (piering vs. wall anchors vs. crack injection) confuse callers before you can even quote",
      "Heavy rain and freeze-thaw seasons spike call volume beyond what you can staff for",
    ],
    solutions: [
      { title: "AI Voice Receptionist (Panic-Trained)", description: "Holland answers every call 24/7 with empathy first — 'That sounds scary, tell me what you're seeing.' She triages severity (cracks, water, sloping floors), handles technical questions, and books a free on-site assessment before the homeowner calls your competitor." },
      { title: "Emergency-Intent SEO", description: "We rank you for the searches that actually bring buyers — 'foundation repair near me,' 'foundation crack [city],' 'settling foundation [city],' 'water in basement.' Not vanity keywords — revenue keywords." },
      { title: "Long-Cycle Nurture Automation", description: "Not every caller is ready to sign today. Our 30/60/90-day text + email sequences keep you top-of-mind so when the crack spreads or water comes back, they call you — not someone they found on TikTok." },
      { title: "Review Autopilot", description: "A $15K foundation job is a trust purchase. Every completed job triggers an automated review request so your Google reviews climb — and 'foundation repair [city]' searchers pick you over the competition." },
      { title: "Smart Website (Warranty-Forward)", description: "Built-in before/after gallery, written lifetime warranty, structural engineer credentials, and online assessment booking. Every page is written to answer the #1 homeowner question: 'How do I know these people aren't going to rip me off on a $20K job?'" },
    ],
    stats: [
      { value: "40%+", label: "of calls to foundation repair companies go unanswered" },
      { value: "$8–15K", label: "average foundation repair ticket" },
      { value: "$24B", label: "US foundation repair market (2026)" },
      { value: "68%", label: "of homeowners pick the contractor based on reviews + warranty" },
    ],
    faqs: [
      { question: "Do you work with piering installers, slab lifters, crawlspace specialists, AND crack injection shops?", answer: "Yes — every sub-vertical. Whether you do helical piers, push piers, polyurethane slab jacking, carbon fiber wall reinforcement, crack injection, or crawlspace encapsulation, we customize the messaging and SEO keywords to your specialty so you attract the right jobs." },
      { question: "Can the AI handle technical questions like 'is it settling or just a cosmetic crack'?", answer: "Yes. Holland is trained on settlement vs. heave vs. hydrostatic pressure vs. thermal movement. She won't diagnose — that's what your inspector does — but she qualifies severity with the right triage questions (size/location/water/doors/floors) and books the assessment. She also handles 'how much does it cost' without scaring callers off: 'Every foundation's different, which is why the on-site inspection is free.'" },
      { question: "How fast will leads start coming in?", answer: "Google Ads: booked appointments within 48–72 hours of launch. Local SEO: 60–90 days for organic rankings to compound. The AI receptionist starts converting missed-call leakage into booked assessments the day it goes live — which for most foundation shops is 3–5x bigger than any new-lead channel." },
    ],
    redirectFrom: [],
  },
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return INDUSTRIES.map((i) => i.slug);
}
