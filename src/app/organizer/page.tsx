"use client";

import Link from "next/link";
import {
    Notebook,
    BellPlus,
    CheckSquare,
    CalendarPlus,
    FilePlus,
    UserCircle,
    ChevronRight,
    ClipboardList,
    Send,
    Clock8,
    AlertTriangle,
} from "lucide-react";

/* ========= Small UI Components ========= */
function Stat({
    icon: Icon,
    title,
    value,
    subtitle,
    href,
}: {
    icon: any;
    title: string;
    value: string;
    subtitle?: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
        >
            <div className="rounded-lg bg-slate-100 p-3">
                <Icon className="h-5 w-5 text-slate-600" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="text-lg font-semibold text-slate-900">{value}</div>
                <div className="truncate text-sm text-slate-600">{title}</div>
                {subtitle && <div className="text-xs text-slate-400">{subtitle}</div>}
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
        </Link>
    );
}

function Row({
    title,
    desc,
    href,
    badge,
}: {
    title: string;
    desc: string;
    href: string;
    badge?: { text: string; tone: "ok" | "info" | "warn" | "error" };
}) {
    const tone =
        badge?.tone === "ok"
            ? "bg-emerald-50 text-emerald-700"
            : badge?.tone === "info"
              ? "bg-blue-50 text-blue-700"
              : badge?.tone === "warn"
                ? "bg-amber-50 text-amber-700"
                : badge?.tone === "error"
                  ? "bg-rose-50 text-rose-700"
                  : "bg-slate-100 text-slate-700";

    return (
        <Link
            href={href}
            className="flex items-center justify-between gap-3 border-t border-slate-100 px-3 py-2 transition hover:bg-slate-50"
        >
            <div className="min-w-0">
                <div className="truncate text-sm font-medium text-slate-800">{title}</div>
                <div className="text-xs text-slate-500">{desc}</div>
            </div>
            {badge && <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tone}`}>{badge.text}</span>}
        </Link>
    );
}

/* ========= Main Page ========= */
export default function OrganizerOverviewPage() {
    return (
        <section className="grid gap-6">
            {/* Introduction */}
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                    <Notebook className="h-6 w-6 text-[#06b6d4]" />
                    <h1 className="text-2xl font-bold text-slate-900">Organizer — Overview</h1>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                    Overview of the Organizer area. Create/edit events, send notifications to attendees, monitor
                    approval progress, and manage blog content.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                        href="/organizer/notifications"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <BellPlus className="h-4 w-4" /> Create Notification
                    </Link>
                    <Link
                        href="/organizer/approvals/pending"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <CheckSquare className="h-4 w-4" /> Track Approvals
                    </Link>
                    <Link
                        href="/organizer/events/create"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <CalendarPlus className="h-4 w-4" /> Create Event
                    </Link>
                    <Link
                        href="/organizer/blog/create"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <FilePlus className="h-4 w-4" /> Create Blog
                    </Link>
                </div>
            </article>

            {/* Stats (Static demo, navigation only) */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Stat
                    icon={ClipboardList}
                    title="My Events"
                    value="6"
                    subtitle="2 pending approval"
                    href="/organizer/approvals/pending"
                />
                <Stat
                    icon={Send}
                    title="Sent Notifications"
                    value="28"
                    subtitle="email & push"
                    href="/organizer/notifications"
                />
                <Stat
                    icon={Clock8}
                    title="Scheduled"
                    value="3"
                    subtitle="upcoming notifications"
                    href="/organizer/notifications"
                />
                <Stat
                    icon={AlertTriangle}
                    title="Needs Attention"
                    value="1"
                    subtitle="delivery issues"
                    href="/organizer/notifications"
                />
            </div>

            {/* Recent Activity (Demo links to organizer pages) */}
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                    <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
                    <Link
                        href="/organizer/approvals/approved"
                        className="text-xs font-medium text-slate-600 hover:text-slate-900"
                    >
                        View approved events &rarr;
                    </Link>
                </div>
                <div className="divide-y divide-slate-100">
                    <Row
                        title="Hackathon 2025 — agenda updated"
                        desc="Event • Email sent to 132 registrants"
                        href="/organizer/notifications"
                        badge={{ text: "Sent", tone: "ok" }}
                    />
                    <Row
                        title="Career Fair — approval requested"
                        desc="Event • Waiting for admin approval"
                        href="/organizer/approvals/pending"
                        badge={{ text: "Pending", tone: "info" }}
                    />
                    <Row
                        title="Cultural Night — reminder scheduled"
                        desc="Notification • Set for 7:00 PM today"
                        href="/organizer/notifications"
                        badge={{ text: "Scheduled", tone: "info" }}
                    />
                    <Row
                        title="Workshop — resend email"
                        desc="Notification • 2 email failures, check required"
                        href="/organizer/notifications"
                        badge={{ text: "Failed", tone: "error" }}
                    />
                    <Row
                        title="Blog — Booth Organization Tips"
                        desc="Draft • Not published yet"
                        href="/organizer/blog/create"
                        badge={{ text: "Draft", tone: "warn" }}
                    />
                </div>
            </article>

            {/* Quick Links (based on Organizer sidebar) */}
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold text-slate-900">Quick Links</h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/organizer/profile"
                    >
                        <span className="inline-flex items-center gap-2">
                            <UserCircle className="h-4 w-4" />
                            Profile
                        </span>
                    </Link>
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/organizer/approvals/approved"
                    >
                        <span className="inline-flex items-center gap-2">
                            <CheckSquare className="h-4 w-4" />
                            Approved
                        </span>
                    </Link>
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/organizer/approvals/pending"
                    >
                        <span className="inline-flex items-center gap-2">
                            <CheckSquare className="h-4 w-4" />
                            Pending
                        </span>
                    </Link>
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/organizer/notifications"
                    >
                        <span className="inline-flex items-center gap-2">
                            <BellPlus className="h-4 w-4" />
                            Notifications
                        </span>
                    </Link>
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/organizer/events/create"
                    >
                        <span className="inline-flex items-center gap-2">
                            <CalendarPlus className="h-4 w-4" />
                            Create Event
                        </span>
                    </Link>
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/organizer/blog/create"
                    >
                        <span className="inline-flex items-center gap-2">
                            <FilePlus className="h-4 w-4" />
                            Create Blog
                        </span>
                    </Link>
                </div>
            </article>
        </section>
    );
}
