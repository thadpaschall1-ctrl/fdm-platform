import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Fast Digital Marketing.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold text-white">Privacy Policy</h1>
      <div className="prose prose-invert prose-slate max-w-none text-slate-400">
        <p className="text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>

        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you fill out our contact
          form (name, email, phone, website URL, and message). We also collect standard analytics
          data including pages visited, time on site, and referring sources.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect to respond to your inquiries, provide marketing
          services, send service-related communications, and improve our website.
          We do not sell your personal information to third parties.
        </p>

        <h2>Contact Us</h2>
        <p>
          Questions about this policy? Contact us at{" "}
          <a href="mailto:hello@fastdigitalmarketing.com" className="text-blue-400">
            hello@fastdigitalmarketing.com
          </a>
        </p>
      </div>
    </div>
  );
}
