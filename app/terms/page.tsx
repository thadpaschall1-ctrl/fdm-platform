import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Fast Digital Marketing",
  description:
    "Terms of Service for Fast Digital Marketing, operated by AI Security Edge LLC.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-white font-medium">Terms of Service</span>
        </nav>

        <h1 className="text-3xl font-bold text-white mb-2 font-display">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Last updated: April 14, 2026
        </p>

        <div className="space-y-8 text-slate-300 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              1. Agreement to Terms
            </h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of
              fastdigitalmarketing.com and all related services (collectively,
              the &quot;Services&quot;) operated by{" "}
              <strong className="text-white">AI Security Edge LLC</strong>, a
              Wyoming limited liability company, doing business as Fast Digital
              Marketing (&quot;Company,&quot; &quot;we,&quot; &quot;us&quot;).
            </p>
            <p className="mt-3">
              By using our Services, you agree to these Terms. If you do not
              agree, please do not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              2. Services Description
            </h2>
            <p>We provide the following digital marketing services:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong className="text-white">SEO &amp; AI Search Optimization</strong>{" "}
                — Local SEO, on-page optimization, and AI search engine
                visibility for businesses.
              </li>
              <li>
                <strong className="text-white">Google Ads Management</strong> —
                Pay-per-click advertising strategy, campaign setup, and ongoing
                management.
              </li>
              <li>
                <strong className="text-white">Web Design</strong> —
                Custom-built, SEO-optimized websites with modern design and
                performance optimization.
              </li>
              <li>
                <strong className="text-white">AI Voice Receptionist</strong> —
                AI-powered phone answering service that handles inbound calls,
                scheduling, and caller inquiries.
              </li>
              <li>
                <strong className="text-white">Voice AI Callback</strong> —
                Automated AI voice callback system for missed calls and lead
                follow-up.
              </li>
              <li>
                <strong className="text-white">Review Automation</strong> —
                Automated review request and reputation management system.
              </li>
              <li>
                <strong className="text-white">Client Reactivation</strong> —
                Automated outreach campaigns to re-engage past customers.
              </li>
              <li>
                <strong className="text-white">Lead Nurture &amp; Marketing Automation</strong>{" "}
                — Multi-channel follow-up sequences and CRM-integrated
                automation workflows.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              3. Accounts and Registration
            </h2>
            <p>
              To access certain Services, you may need to provide business
              information and create an account. You agree to provide accurate,
              current, and complete information and to update it as necessary.
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activity under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              4. Payment Terms
            </h2>
            <p>
              Our products include one-time setup fees and recurring monthly
              subscriptions. Payments are processed securely through Stripe. By
              purchasing a product, you authorize us to charge your payment
              method as agreed.
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>
                All prices are in US dollars and are subject to change with 30
                days&apos; notice.
              </li>
              <li>
                Monthly subscription fees are billed automatically on the same
                date each month.
              </li>
              <li>
                You may cancel your subscription at any time. Cancellations take
                effect at the end of the current billing period.
              </li>
              <li>
                We do not offer refunds for partial billing periods or setup
                fees once work has commenced.
              </li>
              <li>
                If a payment fails, we may suspend services until the balance is
                resolved.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              5. AI Voice and Communication Consent
            </h2>
            <p>
              Some of our services are enhanced with artificial intelligence,
              including AI voice receptionists, voice AI callback systems, and
              automated communications. When you interact with our phone system,
              you may be communicating with an AI voice agent.
            </p>
            <p className="mt-3">
              By using our Services or providing your phone number, you
              acknowledge and consent to receiving calls that may be handled by
              AI voice agents. If you prefer to speak with a human
              representative, you may request to be transferred at any time or
              contact us via email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              6. SMS Consent
            </h2>
            <p>
              By submitting a form on our website or purchasing a product, you
              consent to receive communications from Fast Digital Marketing
              (operated by AI Security Edge LLC) including:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong className="text-white">Email:</strong> Service updates,
                marketing emails, and campaign communications. Unsubscribe via
                the link in any email.
              </li>
              <li>
                <strong className="text-white">SMS/Text Messages:</strong>{" "}
                Service notifications and marketing messages to the phone number
                you provide. Message and data rates may apply. Message frequency
                varies. Reply STOP to opt out. Reply HELP for assistance.
              </li>
              <li>
                <strong className="text-white">Phone Calls:</strong> Follow-up
                calls regarding your inquiry, which may be handled by AI voice
                assistants or human representatives.
              </li>
            </ul>
            <p className="mt-3">
              Consent to receive communications is not a condition of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              7. Intellectual Property
            </h2>
            <p>
              Websites and digital assets created by Fast Digital Marketing are
              custom-built for your business and delivered within the timeframe
              specified at purchase. While we build and host the website, you
              retain ownership of your business content, images, and brand
              assets. The website design, code, and infrastructure remain the
              property of AI Security Edge LLC and are licensed to you for the
              duration of your active subscription.
            </p>
            <p className="mt-3">
              Upon cancellation, your website will be taken offline at the end of
              your billing period. You may request an export of your content at
              any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, AI Security Edge LLC shall
              not be liable for any indirect, incidental, special, consequential,
              or punitive damages resulting from your use of our Services. This
              includes, but is not limited to, loss of revenue, loss of data,
              loss of business opportunities, or any damages arising from
              interruptions to service.
            </p>
            <p className="mt-3">
              Our total liability shall not exceed the amount you paid us in the
              12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              9. Dispute Resolution
            </h2>
            <p>
              These Terms are governed by the laws of the State of Wyoming. Any
              dispute arising under these Terms shall first be subject to good
              faith negotiation between the parties for a period of 30 days. If
              the dispute cannot be resolved through negotiation, it shall be
              resolved in the courts of the State of Wyoming.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              10. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your access to our
              Services at any time, with or without cause, with or without
              notice. Upon termination, your website and any active services will
              be removed from our platforms at the end of your current billing
              period. You remain responsible for any outstanding fees incurred
              prior to termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              11. Changes to Terms
            </h2>
            <p>
              We may update these Terms from time to time. Changes will be posted
              on this page with an updated date. Continued use of our Services
              after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">
              12. Contact Information
            </h2>
            <p>Questions about these Terms? Contact us:</p>
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
                href="tel:+18889721544"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                (888) 972-1544
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
