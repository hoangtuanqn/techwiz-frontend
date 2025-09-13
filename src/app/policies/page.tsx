// app/policies/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  Shield,
  Cookie as CookieIcon,
  FileText,
  Image as ImageIcon,
  Wallet,
  Bell,
  RefreshCcw,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Policies | EventSphere",
  description:
    "Privacy Policy, Terms of Use, Cookies, Refunds, Media & Intellectual Property policies for EventSphere.",
};

const LAST_UPDATED = "Sep 13, 2025";
const CONTACT_EMAIL = "events@university.edu";
const COMPANY_NAME = "EventSphere";
const COMPANY_LEGAL = "EventSphere";
const COMPANY_ADDRESS = "268 Ly Thuong Kiet, District 10";
const JURISDICTION = "Viet Nam";

const TOC = [
  { id: "overview", label: "Overview & Scope", icon: Layers },
  { id: "privacy", label: "Privacy Policy", icon: Shield },
  { id: "cookies", label: "Cookie Policy", icon: CookieIcon },
  { id: "terms", label: "Terms of Use", icon: FileText },
  { id: "content-ip", label: "Content & IP", icon: ImageIcon },
  { id: "payments", label: "Payments & Refunds", icon: Wallet },
  { id: "comms", label: "Notifications & Marketing", icon: Bell },
  { id: "changes", label: "Policy Changes", icon: RefreshCcw },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function PoliciesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* HERO */}
      <header className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-cyan-50 via-white to-fuchsia-50 p-8 shadow-sm">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Policies</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Last updated: <span className="font-medium">{LAST_UPDATED}</span>
          </p>
          <p className="mt-3 max-w-3xl text-slate-700">
            This page outlines our Privacy Policy, Terms of Use, Cookies, Content & IP, Payments/Refunds,
            and communication practices for the EventSphere platform.
          </p>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-fuchsia-200/30 blur-3xl"
        />
      </header>

      {/* MOBILE TOC (top bar) */}
      <nav
        aria-label="Table of contents"
        className="sticky top-16 z-10 mt-8 block overflow-x-auto rounded-xl border border-slate-200 bg-white/80 p-3 backdrop-blur lg:hidden"
      >
        <ul className="flex min-w-max items-center gap-2 text-sm">
          {TOC.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-slate-700 ring-1 ring-transparent transition hover:bg-cyan-50 hover:text-cyan-700 hover:ring-cyan-100"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* LAYOUT: SIDEBAR + CONTENT */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* DESKTOP TOC (sidebar) */}
        <aside className="sticky top-24 hidden h-fit lg:block">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Table of contents
            </p>
            <ul className="space-y-1 text-sm">
              {TOC.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-700"
                  >
                    <Icon className="h-4 w-4 text-slate-400 group-hover:text-cyan-600" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* CONTENT */}
        <article className="prose prose-slate max-w-none">
          {/* 1. Overview */}
          <section id="overview" className="scroll-mt-24">
            <SectionCard title="1. Overview & Scope" icon={Layers}>
              <p>
                This “Policies” page describes how {COMPANY_NAME} ({COMPANY_LEGAL}, address: {COMPANY_ADDRESS}) collects
                and processes data, the terms of use, cookie practices, content/intellectual property rules,
                payments/refunds, and our notification mechanisms. These policies apply to all products/services on the
                EventSphere website and applications (collectively, the “Service”).
              </p>
              <p>
                By using the Service, you acknowledge that you have read, understood, and agree to the policies on this page.
                If you do not agree, please stop using the Service.
              </p>
            </SectionCard>
          </section>

          {/* 2. Privacy */}
          <section id="privacy" className="scroll-mt-24">
            <SectionCard title="2. Privacy Policy" icon={Shield}>
              <h3>2.1. Data We Collect</h3>
              <ul>
                <li>
                  <strong>Account information:</strong> full name, email, password (hashed), role (participant/organizer/admin).
                </li>
                <li>
                  <strong>Event information:</strong> registrations, waitlist, QR check-in, feedback/reviews, issued certificates.
                </li>
                <li>
                  <strong>Device &amp; usage:</strong> access logs, device type, browser, truncated IP address, cookies &amp; analytics.
                </li>
                <li>
                  <strong>User-generated content:</strong> comments, uploaded photos/videos (if any), items in the Media Gallery.
                </li>
              </ul>

              <h3>2.2. Purposes of Use</h3>
              <ul>
                <li>Provide core features: browse &amp; register for events, Add-to-Calendar, check-in, certificates.</li>
                <li>Send operational notifications: emails/push about registrations, schedule updates, venue changes, approvals, etc.</li>
                <li>Analyze and improve experience, prevent fraud, and secure the system.</li>
              </ul>

              <h3>2.3. Legal Basis (if GDPR applies)</h3>
              <ul>
                <li>Performance of a contract (e.g., processing event registrations).</li>
                <li>Legitimate interests (e.g., security, abuse prevention).</li>
                <li>Consent (e.g., analytics/marketing cookies, newsletters).</li>
              </ul>

              <h3>2.4. Data Sharing</h3>
              <p>
                We may share data with infrastructure providers (hosting/CDN/email/push), event organizers (regarding registrants
                for their specific events), and government authorities when legally required. We do not sell personal data.
              </p>

              <h3>2.5. Retention &amp; Deletion</h3>
              <p>
                Data is stored for as long as necessary for the purposes above or as required by law. You may request access,
                correction, download, or deletion by contacting{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Certain operational data (logs, system records) may be
                retained for a limited period for security/compliance purposes.
              </p>

              <h3>2.6. Minors</h3>
              <p>
                The Service is not intended for children under 13 (or the minimum age required by law in your jurisdiction). If
                we learn that we have inadvertently collected information from a child, we will take reasonable steps to delete it
                upon notice.
              </p>

              <h3>2.7. Third-Party Services &amp; Add-to-Calendar</h3>
              <p>
                When you use “Add-to-Calendar” (Google Calendar/Apple/Outlook), you may leave our site and be subject to the
                third party’s own policies.
              </p>
            </SectionCard>
          </section>

          {/* 3. Cookies */}
          <section id="cookies" className="scroll-mt-24">
            <SectionCard title="3. Cookie Policy" icon={CookieIcon}>
              <ul>
                <li>
                  <strong>Essential:</strong> login, session security (cannot be disabled).
                </li>
                <li>
                  <strong>Analytics:</strong> traffic measurement and performance (enabled/disabled based on consent).
                </li>
                <li>
                  <strong>Marketing:</strong> newsletters/campaigns (used only with your consent).
                </li>
              </ul>
              <p>
                You can manage cookies via your browser settings or our cookie manager (if available). Disabling certain cookies
                may limit functionality.
              </p>
            </SectionCard>
          </section>

          {/* 4. Terms */}
          <section id="terms" className="scroll-mt-24">
            <SectionCard title="4. Terms of Use" icon={FileText}>
              <h3>4.1. Account &amp; Security</h3>
              <ul>
                <li>You are responsible for keeping your login credentials confidential; notify us immediately of any breach.</li>
                <li>No impersonation and no unauthorized interference with the system.</li>
              </ul>

              <h3>4.2. Event Registration &amp; Attendance</h3>
              <ul>
                <li>Event information may change; we will provide reasonable notice via email/push.</li>
                <li>Check-in via QR at the venue (or online where applicable for online/hybrid events).</li>
                <li>Waitlist may be auto-promoted when a slot becomes available.</li>
              </ul>

              <h3>4.3. Certificates</h3>
              <ul>
                <li>Certificates are issued only when requirements set by the organizer are met (e.g., attendance, completed feedback).</li>
                <li>Certificates may have validity periods or specific terms set by the organizer.</li>
              </ul>

              <h3>4.4. Prohibited Conduct</h3>
              <ul>
                <li>Distributing malware/spam, denial-of-service attacks, or exploiting vulnerabilities.</li>
                <li>Posting illegal, hateful, pornographic, or privacy-infringing content.</li>
                <li>Impersonation or unauthorized collection of others’ data.</li>
              </ul>

              <h3>4.5. Disclaimer &amp; Limitation of Liability</h3>
              <p>
                To the extent permitted by law in {JURISDICTION}, {COMPANY_NAME} is not liable for indirect, special, or
                consequential damages arising from your use of, or inability to use, the Service. Rights may vary by jurisdiction.
              </p>
            </SectionCard>
          </section>

          {/* 5. Content & IP */}
          <section id="content-ip" className="scroll-mt-24">
            <SectionCard title="5. Content & Intellectual Property" icon={ImageIcon}>
              <ul>
                <li>
                  <strong>UGC:</strong> When you post content (comments, photos/videos), you grant {COMPANY_NAME} a non-exclusive,
                  worldwide, transferable, royalty-free license to store and display it within the Service (including the Media
                  Gallery) for operating and promoting events.
                </li>
                <li>
                  <strong>Image rights at events:</strong> Events may be photographed/recorded. If you do not wish to appear,
                  please inform the help desk at the venue or email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to request reasonable masking/removal.
                </li>
                <li>
                  <strong>Copyright claims:</strong> If you believe content infringes your rights, please send a takedown request
                  (with proof of ownership) to{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </li>
                <li>
                  <strong>AI-generated assets:</strong> Some images/graphics may be generated by AI tools and will be labeled where applicable.
                </li>
              </ul>
            </SectionCard>
          </section>

          {/* 6. Payments & Refunds */}
          <section id="payments" className="scroll-mt-24">
            <SectionCard title="6. Payments & Refunds" icon={Wallet}>
              <p>
                {COMPANY_NAME} may record participation/certificate fees set by organizers. Payments (if any) may be processed
                by third-party gateways under their own terms. Refund policies are announced by the organizer for each event; if
                not otherwise specified, refunds (where eligible) will follow the verification procedures of {COMPANY_NAME} and/or
                the payment partner.
              </p>
            </SectionCard>
          </section>

          {/* 7. Comms */}
          <section id="comms" className="scroll-mt-24">
            <SectionCard title="7. Notifications & Marketing" icon={Bell}>
              <ul>
                <li>Operational (transactional) notifications are necessary to provide the Service (cannot be disabled).</li>
                <li>Newsletters/marketing are sent only with your consent; you can unsubscribe via the provided link.</li>
              </ul>
            </SectionCard>
          </section>

          {/* 8. Changes */}
          <section id="changes" className="scroll-mt-24">
            <SectionCard title="8. Policy Changes" icon={RefreshCcw}>
              <p>
                We may update this page from time to time. The new version takes effect upon posting (unless stated otherwise).
                We will provide reasonable notice of material changes.
              </p>
            </SectionCard>
          </section>

          {/* 9. Contact */}
          <section id="contact" className="scroll-mt-24">
            <SectionCard title="9. Contact" icon={Mail}>
              <p>
                For privacy, copyright, or terms of use matters, please contact{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Mailing address: {COMPANY_LEGAL}, {COMPANY_ADDRESS}.
              </p>
              <p className="text-xs text-slate-500">
                Governing law: {JURISDICTION}. If there is any inconsistency between the Vietnamese and English versions (if any),
                the Vietnamese version will prevail to the extent permitted by law.
              </p>
            </SectionCard>
          </section>

          {/* Back to top */}
          <div className="mt-10">
            <Link href="#overview" className="text-cyan-700 hover:underline">
              ↑ Back to top
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

/** ---------- UI atoms ---------- */

function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-center gap-2">
        {Icon ? <Icon className="h-5 w-5 text-cyan-600" /> : null}
        <h2 className="!mb-0 text-xl font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="prose prose-slate max-w-none">{children}</div>
    </div>
  );
}
