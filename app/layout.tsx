import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TrackingScripts } from "@/components/tracking-scripts";
import { GHLChatWidget } from "@/components/ghl-chat-widget";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

/* Bold display font — punchy headlines, nothing generic */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-cabinet",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Fast Digital Marketing | Digital Marketing Agency",
    template: "%s | Fast Digital Marketing",
  },
  description:
    "AI-delivered marketing platform for small businesses. Smart Websites, AI Voice Receptionist, AI Search Optimization, Review Autopilot, and Lead Nurture. From $47/mo. Live in 5 days.",
  metadataBase: new URL("https://fastdigitalmarketing.com"),
  alternates: {
    canonical: "https://fastdigitalmarketing.com",
  },
  openGraph: {
    siteName: "Fast Digital Marketing",
    title: "Fast Digital Marketing | AI-Delivered Marketing Platform",
    description:
      "Smart Websites, AI Voice Receptionist, AI Search Optimization, Review Autopilot. 75+ industry playbooks. Month-to-month from $47/mo. Live in 5 days.",
    url: "https://fastdigitalmarketing.com",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fast Digital Marketing — AI-Delivered Marketing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Digital Marketing | AI-Delivered Marketing Platform",
    description:
      "Smart Websites, AI Voice Receptionist, AI Search Optimization, Review Autopilot. 75+ industry playbooks. Month-to-month from $47/mo. Live in 5 days.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    sitemap: "/sitemap.xml",
    "llms-txt": "/llms.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${spaceGrotesk.variable} h-full`}>
      <head>
        <link rel="author" href="/llms.txt" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://fastdigitalmarketing.com/#organization",
              name: "Fast Digital Marketing",
              url: "https://fastdigitalmarketing.com",
              logo: "https://fastdigitalmarketing.com/logo.png",
              image: "https://fastdigitalmarketing.com/og-image.png",
              description:
                "Fast Digital Marketing is an AI-delivered digital marketing platform for small businesses. Smart Websites, AI Voice Receptionist, AI Search Optimization, Review Autopilot, and Lead Nurture — all self-service, month-to-month from $47/mo.",
              telephone: "+18889721544",
              email: "hello@fastdigitalmarketing.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Tampa",
                addressLocality: "Tampa",
                addressRegion: "FL",
                postalCode: "33602",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 27.9506,
                longitude: -82.4572,
              },
              areaServed: {
                "@type": "Country",
                name: "United States",
              },
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
              sameAs: [
                "https://www.facebook.com/fastdigitalmarketing",
                "https://www.linkedin.com/company/fast-digital-marketing",
                "https://www.yelp.com/biz/fast-digital-marketing-tampa",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "47",
                bestRating: "5",
                worstRating: "1",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "AI-Delivered Marketing Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Voice Receptionist",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Search Optimization",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Smart Website Design & Development",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Review Automation",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Lead Nurture Automation",
                    },
                  },
                ],
              },
            }),
          }}
        />
        <TrackingScripts />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {/* GHL Chat Widget — auto-suppressed on /examples/[slug] showcase routes */}
        <GHLChatWidget />
      </body>
    </html>
  );
}
