// src/app/sitemap/page.tsx
"use client";

import Link from "next/link";
import React from "react";

type Item = { href: string; label: string };
type Group = { title: string; items: Item[] };

const groups: Group[] = [
    {
        title: "Public",
        items: [
            { href: "/", label: "Home" },
            { href: "/events", label: "Events (Catalog)" },
            { href: "/blog", label: "Blog" },
            { href: "/gallery", label: "Gallery" },
            { href: "/calendar", label: "Calendar" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: "/faq", label: "FAQ" },
        ],
    },
    {
        title: "Auth",
        items: [
            { href: "/auth/login", label: "Login" },
            { href: "/auth/register", label: "Register" },
        ],
    },
    {
        title: "Profile (participant)",
        items: [
            { href: "/(profile)", label: "Overview" },
            { href: "/(profile)/profile", label: "Profile" },
            { href: "/(profile)/my-events", label: "My Events" },
            { href: "/(profile)/certificates", label: "Certificates" },
        ],
    },
    // ───────── Organizer ─────────
    {
        title: "Organizer",
        items: [
            { href: "/organizer", label: "Overview" },
            { href: "/organizer/events", label: "Manage Events" },
            { href: "/organizer/events/create", label: "Create Event" },
            { href: "/organizer/approvals", label: "Approvals (All)" },
            { href: "/organizer/approvals/pending", label: "Approvals – Pending" },
            { href: "/organizer/approvals/ongoing", label: "Approvals – Ongoing" },
            { href: "/organizer/approvals/approved", label: "Approvals – Approved" },
            { href: "/organizer/blogs", label: "Blogs" },
            { href: "/organizer/blogs/create", label: "Create Blog" },
            { href: "/organizer/notifications", label: "Notifications" },
        ],
    },
    // ───────── Admin ─────────
    {
        title: "Admin",
        items: [
            { href: "/admin", label: "Overview" },
            { href: "/admin/events", label: "Events" },
            { href: "/admin/events/create", label: "Create Event" },
            { href: "/admin/approvals", label: "Approvals (All)" },
            { href: "/admin/approvals/pending", label: "Approvals – Pending" },
            { href: "/admin/approvals/approved", label: "Approvals – Approved" },
            { href: "/admin/blogs", label: "Blogs" },
            { href: "/admin/blogs/create", label: "Create Blog" },
            { href: "/admin/notifications", label: "Notifications" },
            { href: "/admin/role", label: "Roles (All)" },
            { href: "/admin/role/admin", label: "Role – Admin" },
            { href: "/admin/role/organizer", label: "Role – Organizer" },
            { href: "/admin/role/user", label: "Role – User" },
        ],
    },
    // ───────── Roles (public) ─────────
    {
        title: "Roles",
        items: [
            { href: "/roles", label: "All Roles" },
            { href: "/roles/admin", label: "Role: Admin" },
            { href: "/roles/organizer", label: "Role: Organizer" },
            { href: "/roles/user", label: "Role: User" },
        ],
    },
    // ───────── Examples / deep links ─────────
    {
        title: "Examples (Demo)",
        items: [
            { href: "/events/1", label: "Event #1 – Detail" },
            { href: "/events/1/attendance", label: "Event #1 – Attendance" },
            { href: "/events/1/reviews", label: "Event #1 – Reviews" },
            { href: "/admin/events/1", label: "Admin – Event Detail (#1)" },
            { href: "/organizer/events/1", label: "Organizer – Event Detail (#1)" },
            { href: "/blog/1", label: "Blog Detail (#1)" },
        ],
    },
];

export default function HtmlSitemapPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-3xl font-bold text-slate-900">Sitemap</h1>
            <p className="mt-2 text-slate-600">Quick overview of pages and navigation in EventSphere.</p>

            {groups.map((g) => (
                <Section key={g.title} title={g.title}>
                    <LinkList items={g.items} />
                </Section>
            ))}
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

function LinkList({ items }: { items: Item[] }) {
    return (
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
                <li key={it.href}>
                    <Link href={it.href} className="inline-block rounded-md px-2 py-1 text-cyan-700 hover:bg-cyan-50">
                        {it.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
