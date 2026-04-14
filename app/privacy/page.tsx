import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Fast Digital Marketing",
  description:
    "Privacy Policy for Fast Digital Marketing, operated by AI Security Edge LLC.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-white font-medium">Privacy Policy</span>
        </nav>

        <h1 className="text-3xl font-bold text-white mb-2 font-display">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Last updated: April 14, 2026
        </p>

        <div className="space-y-8 text-slate-300 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              1. Who We Are
            </h2>
            <p>
              Fast Digital Marketing (&quot;we,&quot; &quot;us,&quot;
              &quot;our&quot;) is a brand operated by{" "}
              <strong className="text-white">AI Security Edge LLC</strong>, a
              Wyoming limited liability company. Our services include the website
              fastdigitalmarketing.com and related digital marketing, web design,
              AI voice, and business automation services for small and
              medium-sized businesses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              2. Information We Collect
            </h2>
            <p>
              We collect the following information when you interact with our
              services:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Business name and contact name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Website URL</li>
              <li>City and state</li>
              <li>Industry or business type</li>
              <li>Website audit data and performance metrics</li>
              <li>Any message or notes you provide</li>
            </ul>
            <p className="mt-3">
              We also automatically collect standard web analytics data including
              IP address, browser type, pages visited, and referring URL through
              analytics tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              3. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Deliver our digital marketing services including SEO, Google Ads
                management, web design, and marketing automation
              </li>
              <li>
                Perform website audits and generate performance reports
              </li>
              <li>
                Communicate with you about our services and your account
              </li>
              <li>
                Send marketing emails about our products and services (you can
                opt out at any time)
              </li>
              <li>
                Send SMS text messages for service-related communications and
                marketing (message and data rates may apply; reply STOP to opt
                out)
              </li>
              <li>
                Contact you by phone regarding your inquiry, which may include
                AI-assisted voice calls
              </li>
              <li>Process payments securely</li>
              <li>Improve our websites and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              4. SMS/Text Message Disclosure
            </h2>
            <p>
              By providing your phone number and submitting a form on our
              website, you expressly consent to receive text messages from Fast
              Digital Marketing (operated by AI Security Edge LLC) at the phone
              number provided. These messages may include:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Confirmation of your form submission or purchase</li>
              <li>
                Follow-up regarding your website audit, project, or inquiry
              </li>
              <li>Information about our products and services</li>
            </ul>
            <p className="mt-3">
              Message frequency varies. Message and data rates may apply.{" "}
              <strong className="text-white">
                Reply STOP to any message to opt out.
              </strong>{" "}
              Reply HELP for assistance. Consent is not a condition of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              5. Third-Party Services
            </h2>
            <p>
              We use trusted third-party service providers to help us operate our
              business, including providers for:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Secure payment processing (Stripe)
              </li>
              <li>Email delivery and marketing communications</li>
              <li>SMS and phone communication services</li>
              <li>
                AI-powered voice and chat services (ElevenLabs)
              </li>
              <li>Website hosting and performance (Vercel)</li>
              <li>Data storage and security (Supabase)</li>
              <li>
                Website analytics and advertising measurement (Google Analytics,
                Facebook Pixel)
              </li>
            </ul>
            <p className="mt-3">
              These providers are contractually required to protect your data and
              only use it to provide services on our behalf. Each provider
              maintains their own privacy policy governing their handling of
              data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              6. AI Voice Communication Disclosure
            </h2>
            <p>
              Some of our services utilize artificial intelligence for voice
              communications. When you call our business phone number or receive
              a callback from us, your call may be answered or handled by an AI
              voice agent. These AI voice agents are powered by third-party
              services and are designed to assist with scheduling, answering
              questions, and routing calls.
            </p>
            <p className="mt-3">
              By interacting with our phone system, you acknowledge that you may
              be communicating with an AI assistant. If you prefer to speak with
              a human representative, you may request to be transferred at any
              time or contact us via email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              7. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              data, including encrypted connections (HTTPS), secure database
              hosting, and access controls. However, no method of transmission
              over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              8. Data Retention
            </h2>
            <p>
              We retain your information for as long as necessary to provide our
              services and comply with legal obligations. You may request
              deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              9. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>
                Opt out of marketing emails (unsubscribe link in every email)
              </li>
              <li>Opt out of text messages (reply STOP)</li>
              <li>Opt out of phone calls (tell us during any call)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              10. Children&apos;s Privacy
            </h2>
            <p>
              Our services are not directed to individuals under the age of 18.
              We do not knowingly collect personal information from children. If
              we become aware that we have collected data from a child under 18,
              we will take steps to delete that information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              11. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated date. Continued use of our
              services after changes constitutes acceptance of the updated
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              12. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or want to exercise
              your data rights, contact us at:
            </p>
            <p className="mt-3">
              <strong className="text-white">Fast Digital Marketing</strong>
              <br />
              <span className="text-slate-500">
                Operated by AI Security Edge LLC
              </span>
              <br />
              Email:{" "}
              <a
                href="mailto:hello@fastdigitalmarketing.com"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                hello@fastdigitalmarketing.com
              </a>
              <br />
              Phone:{" "}
              <a
                href="tel:+18889834449"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                (888) 983-4449
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
