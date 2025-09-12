// app/sitemap/page.tsx
"use client";

import Link from "next/link";

const routes = {
  public: [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events (Catalog)" },
    { href: "/community", label: "Community" },
    { href: "/certificates", label: "Certificates" },
    { href: "/attendance", label: "Attendance" },
    { href: "/analytics", label: "Analytics" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ],
  auth: [
    { href: "/auth/login", label: "Login" },
    { href: "/auth/register", label: "Register" },
    { href: "/auth/forgot-password", label: "Forgot Password" },
  ],
  participant: [
    { href: "/dashboard", label: "Dashboard (Overview)" },
    { href: "/dashboard/registrations", label: "My Registrations" },
    { href: "/dashboard/history", label: "Participation History" },
    { href: "/dashboard/notifications", label: "Notifications" },
    { href: "/dashboard/profile", label: "Profile" },
  ],
  organizer: [
    { href: "/organizer", label: "Organizer (Overview)" },
    { href: "/organizer/events", label: "Manage Events" },
    { href: "/organizer/attendances", label: "Attendance Logs" },
    { href: "/organizer/certificates", label: "Issue Certificates" },
    { href: "/organizer/media", label: "Media Uploads" },
    { href: "/organizer/announcements", label: "Announcements" },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Admin (Overview)" },
    { href: "/admin/moderation", label: "Moderation" },
    { href: "/admin/manage-users", label: "Users & Roles" },
    { href: "/admin/reports", label: "Reports" },
    { href: "/admin/settings", label: "Settings" },
  ],
  verify: [{ href: "/verify/certificate/demo-code", label: "Verify Certificate (demo)" }],
  examples: [
    // Bạn có thể bỏ mục này khi dùng dữ liệu thật
    { href: "/events/1", label: "Event #1 (detail)" },
    { href: "/events/1/register", label: "Event #1 – Register" },
    { href: "/events/1/reviews", label: "Event #1 – Reviews" },
    { href: "/events/1/attendance", label: "Event #1 – Attendance" },
  ],
};

export default function HtmlSitemapPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Sitemap</h1>
      <p className="mt-2 text-slate-600">
        Quick overview of pages and navigation in EventSphere.
      </p>

      <Section title="Public">
        <LinkList items={routes.public} />
      </Section>

      <Section title="Auth">
        <LinkList items={routes.auth} />
      </Section>

      <Section title="Participant">
        <LinkList items={routes.participant} />
      </Section>

      <Section title="Organizer">
        <LinkList items={routes.organizer} />
      </Section>

      <Section title="Admin">
        <LinkList items={routes.admin} />
      </Section>

      <Section title="Verify & Utilities">
        <LinkList items={routes.verify} />
      </Section>

      <Section title="Examples (Demo)">
        <LinkList items={routes.examples} />
      </Section>

      <footer className="mt-10 rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
        For search engines, see the{" "}
        <a className="text-cyan-600 hover:underline" href="/sitemap.xml">
          XML sitemap
        </a>
        .
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 rounded-xl border border-slate-200 p-4">{children}</div>
    </section>
  );
}

function LinkList({ items }: { items: { href: string; label: string }[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <li key={it.href}>
          <Link
            href={it.href}
            className="inline-block rounded-md px-2 py-1 text-cyan-700 hover:bg-cyan-50"
          >
            {it.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
