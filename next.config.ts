import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 301 redirects from old WordPress URL structure
  async redirects() {
    return [
      // WordPress feed/admin endpoints
      { source: "/wp-admin", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/feed/", destination: "/", permanent: true },
      // Common WordPress page slugs that may have been indexed
      { source: "/home", destination: "/", permanent: true },
      { source: "/digital-marketing", destination: "/#services", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/about-us", destination: "/#why-fdm", permanent: true },
      { source: "/about", destination: "/#why-fdm", permanent: true },
      { source: "/contact-us", destination: "/#contact", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
