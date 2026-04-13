export interface ServiceData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  intro: string;
  features: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES: ServiceData[] = [
  {
    slug: "seo",
    title: "Search Engine Optimization",
    metaTitle: "SEO Services | Search Engine Optimization Agency | Fast Digital Marketing",
    metaDescription:
      "Expert SEO services that drive real organic traffic. Local SEO, technical SEO, content strategy, and link building — powered by AI tools and 25+ years of experience.",
    hero: "Rank Higher. Get Found. Grow Faster.",
    intro:
      "Search engine optimization is the foundation of sustainable online growth. We combine deep technical expertise with AI-powered tools to help businesses rank for the keywords their customers actually search for — not vanity metrics, but real traffic that converts.",
    features: [
      {
        title: "Technical SEO Audit",
        description:
          "We crawl your entire site to identify broken links, slow pages, missing meta tags, duplicate content, crawl errors, and schema markup gaps. You get a plain-English report with prioritized fixes — not a 50-page PDF you'll never read.",
      },
      {
        title: "Local SEO & Google Business Profile",
        description:
          "For businesses that serve a local area, we optimize your Google Business Profile, build consistent NAP citations, manage reviews, and implement local schema markup so you show up in the Map Pack — not just on page one.",
      },
      {
        title: "Content Strategy & Creation",
        description:
          "We research what your ideal customers actually search for, then create content that answers their questions better than anyone else. Blog posts, service pages, FAQ sections, and pillar content — all optimized for both Google and AI search engines.",
      },
      {
        title: "Link Building & Digital PR",
        description:
          "We earn high-quality backlinks through strategic outreach, guest posting, digital PR, and resource page placements. No PBNs, no spam — just real links from real websites that move the needle.",
      },
      {
        title: "AI Search Optimization (ASO)",
        description:
          "Google is not the only search engine anymore. We optimize your site to be cited by ChatGPT, Perplexity, Gemini, and AI Overviews using structured data, entity-based content, and llms.txt protocols.",
      },
      {
        title: "Monthly Reporting & Strategy",
        description:
          "Every month you get a clear report showing keyword rankings, traffic changes, conversions, and what we're doing next. No jargon, no fluff — just the numbers that matter to your business.",
      },
    ],
    process: [
      { step: "01", title: "Audit & Research", description: "We analyze your site, competitors, and keyword landscape to find the biggest opportunities." },
      { step: "02", title: "Strategy & Roadmap", description: "We build a custom SEO plan targeting your highest-ROI keywords and content gaps." },
      { step: "03", title: "Execute & Optimize", description: "Technical fixes, content creation, and link building — executed consistently every month." },
      { step: "04", title: "Measure & Scale", description: "Monthly reporting, strategy adjustments, and scaling what works to compound your results." },
    ],
    faqs: [
      { question: "How long does SEO take to show results?", answer: "Most businesses see measurable improvement in 3-6 months. Competitive industries may take longer. We focus on quick wins first (technical fixes, GBP optimization) while building long-term authority through content and links." },
      { question: "Do you guarantee first page rankings?", answer: "No legitimate SEO agency can guarantee specific rankings — Google's algorithm considers 200+ factors. What we guarantee is transparent reporting, consistent execution, and a strategy built on data, not guesswork." },
      { question: "What's the difference between local SEO and regular SEO?", answer: "Local SEO focuses on ranking in Google's Map Pack and local search results for location-based queries. It involves Google Business Profile optimization, local citations, and review management. Regular SEO targets broader organic rankings through content and technical optimization." },
      { question: "How does AI search optimization work?", answer: "AI search engines like ChatGPT and Perplexity pull information from structured, authoritative content. We optimize your site with clear entity markup, FAQ schema, and factual content structure so AI systems can understand and cite your business accurately." },
    ],
  },
  {
    slug: "google-ads",
    title: "Google Ads & PPC Management",
    metaTitle: "Google Ads Management | PPC Agency | Fast Digital Marketing",
    metaDescription:
      "High-ROI Google Ads management for businesses that want leads, not just clicks. Search, display, shopping, and Performance Max campaigns — managed by certified experts.",
    hero: "Turn Ad Spend Into Revenue.",
    intro:
      "Google Ads puts your business in front of people who are actively searching for what you sell — right now, today. We build and manage campaigns that maximize your return on ad spend with tight targeting, compelling copy, and relentless optimization.",
    features: [
      { title: "Search Campaigns", description: "We target the keywords your customers actually type into Google and write ads that compel them to click. Every campaign is built with proper match types, negative keywords, and bid strategies from day one." },
      { title: "Performance Max & Display", description: "Reach potential customers across Google Search, YouTube, Gmail, Maps, and the Display Network with AI-optimized Performance Max campaigns — or targeted display campaigns for brand awareness and retargeting." },
      { title: "Landing Page Optimization", description: "A great ad is worthless if the landing page doesn't convert. We build or optimize your landing pages for speed, clarity, and conversion — matching the ad's message to the page's offer." },
      { title: "Conversion Tracking & Attribution", description: "We set up proper conversion tracking so you know exactly which keywords, ads, and campaigns drive phone calls, form fills, and purchases. No guessing — real data." },
      { title: "A/B Testing", description: "We continuously test ad copy, headlines, landing pages, and bidding strategies. Small improvements compound into significant ROI gains over time." },
      { title: "Transparent Reporting", description: "Weekly and monthly reports showing spend, clicks, conversions, cost per lead, and ROAS. You always know what your money is doing." },
    ],
    process: [
      { step: "01", title: "Account Audit", description: "We review your existing campaigns (or competitors) to find waste and opportunity." },
      { step: "02", title: "Campaign Build", description: "We structure campaigns, write ads, set targeting, and build landing pages." },
      { step: "03", title: "Launch & Monitor", description: "Campaigns go live with daily monitoring and rapid optimization." },
      { step: "04", title: "Optimize & Scale", description: "We cut waste, double down on winners, and scale profitably." },
    ],
    faqs: [
      { question: "How much should I spend on Google Ads?", answer: "It depends on your industry and goals. Most local service businesses see results starting at $1,500-3,000/month in ad spend. We'll recommend a budget based on your market's cost-per-click data and your revenue goals." },
      { question: "How quickly will I see results from PPC?", answer: "Unlike SEO, PPC can generate leads within days of launch. However, campaigns typically need 2-4 weeks of data before we can fully optimize. Most clients see strong results by month two." },
      { question: "What's a good cost per lead?", answer: "This varies wildly by industry. A plumber might pay $25-50 per lead while a lawyer might pay $150-300. We benchmark against your industry and focus on driving that number down over time." },
      { question: "Do you require long-term contracts?", answer: "We recommend a 3-month commitment to allow proper optimization, but we don't lock you into long-term contracts. Our clients stay because of results, not contracts." },
    ],
  },
  {
    slug: "web-design",
    title: "Web Design & Development",
    metaTitle: "Web Design Agency | Fast, SEO-Ready Websites | Fast Digital Marketing",
    metaDescription:
      "Professional web design built for speed, SEO, and conversions. Next.js, React, and modern frameworks that score 95+ on Core Web Vitals out of the box.",
    hero: "Websites That Work as Hard as You Do.",
    intro:
      "Your website is your hardest-working employee — or it should be. We build fast, modern websites using Next.js and React that load instantly, rank well on Google, and convert visitors into customers. No bloated WordPress themes. No page builders. Clean code that performs.",
    features: [
      { title: "Next.js & React Development", description: "We build on modern frameworks that deliver sub-second load times, perfect Core Web Vitals scores, and server-side rendering for maximum SEO performance. Your site will be faster than 95% of your competitors." },
      { title: "Mobile-First Design", description: "Over 60% of web traffic is mobile. Every site we build starts with the mobile experience and scales up to desktop — not the other way around." },
      { title: "SEO-Ready Architecture", description: "Semantic HTML, proper heading hierarchy, schema markup, dynamic sitemaps, and clean URL structure built in from day one. Your site is ready to rank before we write the first blog post." },
      { title: "Conversion Optimization", description: "Strategic call-to-action placement, trust signals, social proof, and clear user flows designed to turn visitors into leads and customers." },
      { title: "CMS & Content Management", description: "Easy-to-use content management so you can update pages, add blog posts, and manage your site without calling a developer every time." },
      { title: "Hosting & Maintenance", description: "We deploy on Vercel's global edge network for 99.99% uptime and automatic SSL. No shared hosting nightmares, no security patches to worry about." },
    ],
    process: [
      { step: "01", title: "Discovery", description: "We learn your business, audience, and goals. You show us what you like and don't like." },
      { step: "02", title: "Design & Prototype", description: "We design your site and get your approval before writing a single line of code." },
      { step: "03", title: "Build & Test", description: "We build the site, optimize for speed and SEO, and test across all devices." },
      { step: "04", title: "Launch & Support", description: "We launch, monitor performance, and provide ongoing support and updates." },
    ],
    faqs: [
      { question: "Why Next.js instead of WordPress?", answer: "Next.js sites load 3-5x faster than WordPress, score higher on Core Web Vitals (Google's speed ranking factor), are more secure (no plugins to hack), and cost less to host. WordPress is fine for blogs — but for a business that needs to rank and convert, modern frameworks win." },
      { question: "How long does a website build take?", answer: "A typical business website takes 2-4 weeks from kickoff to launch. Complex sites with custom features may take 6-8 weeks. We'll give you a timeline before starting." },
      { question: "Can I update the site myself?", answer: "Yes. We set up a content management system so you can edit text, add blog posts, and manage basic content. For structural changes, our team handles those." },
      { question: "What about my existing website's SEO?", answer: "We set up 301 redirects from every old URL to its new equivalent so you don't lose any existing search rankings. Your SEO equity transfers to the new site." },
    ],
  },
  {
    slug: "social-media",
    title: "Social Media Marketing",
    metaTitle: "Social Media Marketing Agency | Fast Digital Marketing",
    metaDescription:
      "Social media management that builds your brand and drives real business results. Content strategy, paid social, community management, and analytics across all platforms.",
    hero: "Build Your Brand. Engage Your Audience.",
    intro:
      "Social media is where your customers spend their time — but posting randomly doesn't work. We build data-driven social strategies that grow your following, drive engagement, and actually generate leads. Content that stops the scroll and drives action.",
    features: [
      { title: "Content Strategy & Creation", description: "We develop a content calendar aligned with your business goals and create posts that resonate with your audience — not generic stock photo posts, but content that reflects your brand." },
      { title: "Paid Social Advertising", description: "Targeted ad campaigns on Facebook, Instagram, LinkedIn, and TikTok that reach your ideal customers. Precise targeting, compelling creative, and continuous optimization." },
      { title: "Community Management", description: "We monitor and respond to comments, messages, and reviews across all your social platforms. Your audience gets timely, professional engagement." },
      { title: "Analytics & Reporting", description: "Monthly reports showing reach, engagement, follower growth, website traffic from social, and lead attribution. You know exactly what's working." },
      { title: "Platform Management", description: "We manage your presence across Facebook, Instagram, LinkedIn, TikTok, YouTube, and X (Twitter) — whichever platforms make sense for your business." },
      { title: "Influencer & Partnership Outreach", description: "We identify and connect you with relevant micro-influencers and complementary businesses for cross-promotion opportunities." },
    ],
    process: [
      { step: "01", title: "Audit & Strategy", description: "We analyze your current presence, competitors, and audience to build a winning strategy." },
      { step: "02", title: "Content Calendar", description: "We create a month-ahead content calendar with posts, stories, and campaign themes." },
      { step: "03", title: "Create & Publish", description: "Our team creates the content and publishes on schedule across all platforms." },
      { step: "04", title: "Analyze & Adjust", description: "We track performance and adjust the strategy based on what resonates with your audience." },
    ],
    faqs: [
      { question: "Which social platforms should my business be on?", answer: "It depends on where your customers are. B2B companies do well on LinkedIn. Local service businesses thrive on Facebook and Instagram. We'll analyze your audience and recommend the right platforms — you don't need to be everywhere." },
      { question: "How often should we post?", answer: "Quality over quantity. Most businesses benefit from 3-5 posts per week on their primary platforms. We focus on creating content that drives engagement rather than filling a quota." },
      { question: "Can you handle paid social ads too?", answer: "Yes. We manage both organic social content and paid advertising campaigns. The two work best together — organic builds trust, paid drives targeted traffic." },
      { question: "Do you create the content or do we?", answer: "We create it. You approve it before it goes live. We'll occasionally ask for photos, videos, or behind-the-scenes content from your team to keep it authentic." },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI & Marketing Automation",
    metaTitle: "AI Marketing Automation | AI Voice Agents & Chatbots | Fast Digital Marketing",
    metaDescription:
      "Stop losing leads to missed calls and slow follow-up. AI voice receptionists, automated follow-up sequences, chatbots, and CRM integrations that work 24/7.",
    hero: "Never Miss a Lead Again.",
    intro:
      "The average business misses 62% of incoming phone calls. Every missed call is a missed customer. We implement AI-powered systems that answer every call, respond to every inquiry, and follow up with every lead — automatically, 24 hours a day, 365 days a year.",
    features: [
      { title: "AI Voice Receptionist", description: "A natural-sounding AI agent that answers your phone, handles common questions, books appointments, and takes messages — with a voice so natural callers can't tell the difference. Works 24/7 including nights, weekends, and holidays." },
      { title: "Missed Call Text-Back", description: "When a call goes to voicemail (it shouldn't with our AI receptionist, but just in case), the caller automatically receives a text message within 30 seconds: 'Sorry we missed your call! How can we help?' This alone recovers 30-40% of missed leads." },
      { title: "Automated Follow-Up Sequences", description: "New leads get an immediate response followed by a multi-step nurture sequence via email and SMS. No lead falls through the cracks because someone forgot to follow up." },
      { title: "Review Generation Automation", description: "After every appointment or service, your customers automatically receive a review request. We route happy customers to Google and handle unhappy ones privately." },
      { title: "CRM Integration", description: "All leads, calls, and conversations flow into your CRM automatically. No manual data entry, no lost sticky notes, no leads in someone's email that never got logged." },
      { title: "Patient/Client Reactivation", description: "We identify past customers who haven't returned and automatically reach out with personalized messages to bring them back. Most businesses have thousands of dollars in dormant customers." },
    ],
    process: [
      { step: "01", title: "Audit Your Workflow", description: "We map your current lead flow and find where leads are being lost." },
      { step: "02", title: "Design the Automation", description: "We build the AI agents, sequences, and integrations tailored to your business." },
      { step: "03", title: "Deploy & Test", description: "Everything goes live after thorough testing. Your AI receptionist handles real calls within 48 hours." },
      { step: "04", title: "Monitor & Improve", description: "We review call recordings, adjust scripts, and optimize conversion rates continuously." },
    ],
    faqs: [
      { question: "Will callers know they're talking to an AI?", answer: "Most can't tell. Our AI receptionist uses natural speech patterns, appropriate pauses, and conversational language. We've had callers thank 'her' for being so helpful. You can hear a live demo on our demo page." },
      { question: "What if the AI can't handle a question?", answer: "The AI gracefully transfers to a human, takes a message, or schedules a callback — depending on your preference. It's trained to know its limits and escalate appropriately." },
      { question: "Does this replace my front desk staff?", answer: "It complements them. The AI handles overflow calls, after-hours calls, and high-volume periods. Your staff focuses on in-person customers and complex issues. Think of it as a tireless backup that never calls in sick." },
      { question: "How quickly can this be set up?", answer: "Most businesses are fully live within 48-72 hours. The AI receptionist is trained on your specific business — your services, hours, pricing, and appointment types." },
    ],
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    metaTitle: "Email Marketing Agency | Automated Email Campaigns | Fast Digital Marketing",
    metaDescription:
      "Email marketing that drives revenue on autopilot. Welcome sequences, nurture campaigns, promotional blasts, and re-engagement flows — all professionally designed and automated.",
    hero: "Your Most Profitable Marketing Channel.",
    intro:
      "Email marketing returns $36 for every $1 spent — more than any other channel. We build automated email systems that onboard new customers, nurture leads, drive repeat purchases, and reactivate dormant contacts. Set it up once, profit forever.",
    features: [
      { title: "Welcome & Onboarding Sequences", description: "New subscribers and customers get a professionally crafted email series that introduces your brand, builds trust, and moves them toward their first (or next) purchase." },
      { title: "Lead Nurture Campaigns", description: "Not every lead is ready to buy today. We build multi-touch nurture sequences that keep your business top-of-mind until they're ready — without being annoying." },
      { title: "Promotional & Seasonal Campaigns", description: "Strategic promotional emails for sales, events, holidays, and new offers. Designed, written, and scheduled to maximize open rates and conversions." },
      { title: "Re-Engagement & Win-Back", description: "We identify subscribers who've gone cold and run targeted campaigns to bring them back. Most businesses are sitting on thousands of dollars in dormant email subscribers." },
      { title: "Segmentation & Personalization", description: "We segment your list by behavior, purchase history, and engagement level so every subscriber gets relevant content — not one-size-fits-all blasts." },
      { title: "A/B Testing & Optimization", description: "Subject lines, send times, content layout, CTAs — we test everything to continuously improve open rates, click rates, and conversions." },
    ],
    process: [
      { step: "01", title: "Audit & Strategy", description: "We review your current email setup, list health, and identify the highest-impact campaigns to build first." },
      { step: "02", title: "Design & Write", description: "We create branded email templates and write the copy for each sequence." },
      { step: "03", title: "Build & Automate", description: "We set up the automations, triggers, and segmentation rules in your email platform." },
      { step: "04", title: "Monitor & Optimize", description: "Ongoing monitoring, A/B testing, and optimization to improve performance over time." },
    ],
    faqs: [
      { question: "What email platform do you use?", answer: "We work with whatever platform fits your business — Mailchimp, Klaviyo, ActiveCampaign, ConvertKit, or your existing CRM's built-in email tools. We'll recommend the best fit based on your needs and budget." },
      { question: "How often should I email my list?", answer: "It depends on your business and audience. Most businesses benefit from 1-2 emails per week plus automated sequences. We test and find the frequency that maximizes engagement without increasing unsubscribes." },
      { question: "I don't have an email list yet. Can you help?", answer: "Absolutely. We'll set up lead magnets, opt-in forms, and landing pages to build your list from scratch. Combined with your website traffic and ads, most businesses can build a meaningful list within 2-3 months." },
      { question: "What kind of results can I expect?", answer: "Industry benchmarks are 20-25% open rates and 2-5% click rates. Our clients typically see 25-40% open rates and 5-10% click rates because of proper segmentation and relevant content." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
