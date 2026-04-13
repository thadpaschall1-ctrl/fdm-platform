import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Old WordPress admin/feed ────────────────────────────────────
      { source: "/wp-admin", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/feed/", destination: "/", permanent: true },

      // ── Old core pages ──────────────────────────────────────────────
      { source: "/home", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/digital-marketing-services", destination: "/services/seo", permanent: true },
      { source: "/social-media-management", destination: "/services/social-media", permanent: true },
      { source: "/lead-generation-services", destination: "/services/seo", permanent: true },
      { source: "/service-areas", destination: "/", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditions", destination: "/privacy", permanent: true },
      { source: "/site-map-2", destination: "/sitemap.xml", permanent: true },
      { source: "/seo-blogger", destination: "/services/seo", permanent: true },
      { source: "/wordpress", destination: "/", permanent: true },

      // ── Old industry pages → new industry pages ─────────────────────
      { source: "/seo-for-chiropractors", destination: "/industries/chiropractors", permanent: true },
      { source: "/ai-for-chiropractors", destination: "/industries/chiropractors", permanent: true },
      { source: "/ai-for-roofers", destination: "/industries/roofers", permanent: true },
      { source: "/digital-marketing-for-window-companies", destination: "/industries/electricians", permanent: true },

      // ── Old city SEO pages → homepage (until city pages are built) ──
      { source: "/tampa-seo-company", destination: "/services/seo", permanent: false },
      { source: "/tampa-seo-guide", destination: "/services/seo", permanent: false },
      { source: "/miami-seo", destination: "/services/seo", permanent: false },
      { source: "/orlando-seo", destination: "/services/seo", permanent: false },
      { source: "/jacksonville-seo", destination: "/services/seo", permanent: false },
      { source: "/fort-lauderdale-seo", destination: "/services/seo", permanent: false },
      { source: "/st-petersburg-seo", destination: "/services/seo", permanent: false },
      { source: "/clearwater-seo", destination: "/services/seo", permanent: false },
      { source: "/sarasota-seo", destination: "/services/seo", permanent: false },
      { source: "/naples-seo", destination: "/services/seo", permanent: false },
      { source: "/gainesville-seo", destination: "/services/seo", permanent: false },
      { source: "/tallahassee-seo", destination: "/services/seo", permanent: false },
      { source: "/cape-coral-seo", destination: "/services/seo", permanent: false },
      { source: "/fort-myers-seo", destination: "/services/seo", permanent: false },
      { source: "/west-palm-beach-seo", destination: "/services/seo", permanent: false },
      { source: "/port-st-lucie-seo", destination: "/services/seo", permanent: false },
      { source: "/hollywood-seo", destination: "/services/seo", permanent: false },
      { source: "/hialeah-seo", destination: "/services/seo", permanent: false },
      { source: "/miramar-seo", destination: "/services/seo", permanent: false },
      { source: "/pembroke-pines-seo", destination: "/services/seo", permanent: false },
      { source: "/palm-bay-seo", destination: "/services/seo", permanent: false },
      { source: "/san-antonio-seo", destination: "/services/seo", permanent: false },
      { source: "/austin-seo-company", destination: "/services/seo", permanent: false },
      { source: "/seo-agency-houston", destination: "/services/seo", permanent: false },
      { source: "/fort-worth-seo", destination: "/services/seo", permanent: false },
      { source: "/seo-el-paso", destination: "/services/seo", permanent: false },
      { source: "/seo-plano", destination: "/services/seo", permanent: false },
      { source: "/seo-frisco", destination: "/services/seo", permanent: false },
      { source: "/seo-mckinney", destination: "/services/seo", permanent: false },
      { source: "/seo-irving", destination: "/services/seo", permanent: false },
      { source: "/seo-garland", destination: "/services/seo", permanent: false },
      { source: "/seo-laredo", destination: "/services/seo", permanent: false },
      { source: "/seo-corpus-christi", destination: "/services/seo", permanent: false },
      { source: "/seo-amarillo", destination: "/services/seo", permanent: false },
      { source: "/lubbock-tx-seo-company", destination: "/services/seo", permanent: false },
      { source: "/seo-midland", destination: "/services/seo", permanent: false },
      { source: "/seo-odessa", destination: "/services/seo", permanent: false },
      { source: "/seo-mcallen", destination: "/services/seo", permanent: false },
      { source: "/seo-killeen", destination: "/services/seo", permanent: false },
      { source: "/seo-grand-prairie", destination: "/services/seo", permanent: false },
      { source: "/waco-seo", destination: "/services/seo", permanent: false },
      { source: "/seo-for-weebly", destination: "/services/seo", permanent: false },

      // ── Old blog posts → blog (when built) ──────────────────────────
      { source: "/maximizing-social-media-strategy-with-ai", destination: "/", permanent: false },
      { source: "/revolutionizing-business-operations-the-power-of-autonomous-ai-agents", destination: "/", permanent: false },
      { source: "/game-changing-ai-revolutionizes-cybersecurity-defense", destination: "/", permanent: false },
      { source: "/ai-revolutionizes-customer-service-experts-weigh-in", destination: "/", permanent: false },
      { source: "/revolutionary-chatbots-and-virtual-assistants-take-center-stage", destination: "/", permanent: false },
      { source: "/top-5-digital-marketing-strategies-for-miami-businesses", destination: "/", permanent: false },
      { source: "/the-top-5-paid-advertising-platforms-for-small-businesses", destination: "/", permanent: false },
      { source: "/ask-engine-optimization-get-your-business-featured-in-ai-responses", destination: "/", permanent: false },
      { source: "/12-essential-dallas-seo-strategies-for-boosting-your-online-presence", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
