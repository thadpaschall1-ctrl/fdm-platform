import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TrackingScripts } from "@/components/tracking-scripts";

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
    "Fast Digital Marketing helps businesses grow online with SEO, Google Ads, professional web design, and AI-powered marketing automation. Get measurable results — fast.",
  metadataBase: new URL("https://fastdigitalmarketing.com"),
  alternates: {
    canonical: "https://fastdigitalmarketing.com",
  },
  openGraph: {
    siteName: "Fast Digital Marketing",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-white antialiased">
        <TrackingScripts />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {/* GHL Chat Widget */}
        <script
          src="https://beta.leadconnectorhq.com/loader.js"
          data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="67e5cb8c14647189c01cde65"
          async
        />
      </body>
    </html>
  );
}
