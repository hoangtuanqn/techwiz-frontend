"use client";

import Link from "next/link";
import {
    Inbox,
    Send,
    Clock,
    AlertTriangle,
    ChevronRight,
    BellPlus,
    CheckSquare,
    Users,
    CalendarPlus,
} from "lucide-react";
import { useState } from "react"; // Keep useState if needed for other purposes, otherwise remove

interface NotificationItem {
    id: string;
    title: string;
    desc?: string;
    value?: string;
    subtitle?: string;
    icon?: any;
    badge?: { text: string; tone: "ok" | "info" | "warn" | "error" };
    type: "stat" | "row";
}

const NOTIFICATIONS_DATA: NotificationItem[] = [
    {
        id: "inbox-1",
        type: "stat",
        icon: Inbox,
        title: "Inbox",
        value: "120",
        subtitle: "5 unread",
    },
    {
        id: "sent-1",
        type: "stat",
        icon: Send,
        title: "Sent",
        value: "320",
        subtitle: "emails & push",
    },
    {
        id: "scheduled-1",
        type: "stat",
        icon: Clock,
        title: "Scheduled",
        value: "8",
        subtitle: "soon to be sent",
    },
    {
        id: "failed-1",
        type: "stat",
        icon: AlertTriangle,
        title: "Failed",
        value: "2",
        subtitle: "needs attention",
    },
    {
        id: "reminder-hackathon",
        type: "row",
        title: "Reminder: Hackathon 2025",
        desc: "Sent at 18:00 — Email",
        badge: { text: "Sent", tone: "ok" },
    },
    {
        id: "checkin-open",
        type: "row",
        title: "Check-in open",
        desc: "Sent at 08:30 — Push",
        badge: { text: "Sent", tone: "ok" },
    },
    {
        id: "cultural-night-update",
        type: "row",
        title: "Cultural Night update",
        desc: "Scheduled 19:00 — Email",
        badge: { text: "Scheduled", tone: "info" },
    },
    {
        id: "workshop-docs",
        type: "row",
        title: "Workshop documents",
        desc: "09:00 — Email",
        badge: { text: "Failed", tone: "error" },
    },
    {
        id: "organizer-role",
        type: "row",
        title: "New Organizer Permissions",
        desc: "Role update — Admin",
        badge: { text: "Info", tone: "warn" },
    },
];

function Stat({
    icon: Icon,
    title,
    value,
    subtitle,
    id,
}: {
    icon: any;
    title: string;
    value: string;
    subtitle?: string;
    id: string;
}) {
    return (
        <Link
            href={`/admin/notifications/${id}`}
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
    id,
    badge,
}: {
    title: string;
    desc: string;
    id: string;
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
            href={`/admin/notifications/${id}`}
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

export default function NotificationsOverviewPage() {
    // showCompose state and its logic removed

    return (
        <section className="grid gap-6">
            {/* Intro */}
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">Event Mailbox</h1>
                <p className="mt-1 text-sm text-slate-600">
                    Manage emails and notifications sent to participants. View status overview, recent activities, and
                    quickly navigate to administration sections.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                        href="/admin/notifications/compose"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <BellPlus className="h-4 w-4" /> Create Notification
                    </Link>
                    <Link
                        href="/admin/approvals"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <CheckSquare className="h-4 w-4" /> Approve Requests
                    </Link>
                    <Link
                        href="/admin/events/create"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <CalendarPlus className="h-4 w-4" /> Create Event
                    </Link>
                </div>
            </article>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {NOTIFICATIONS_DATA.filter(item => item.type === "stat").map(item => (
                    <Stat
                        key={item.id}
                        id={item.id}
                        icon={item.icon}
                        title={item.title}
                        value={item.value!}
                        subtitle={item.subtitle}
                    />
                ))}
            </div>

            {/* Recent */}
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                    <h2 className="text-lg font-semibold text-slate-900">Recent Activities</h2>
                    {/* Link to status removed as per previous instruction */}
                </div>
                <div className="divide-y divide-slate-100">
                    {NOTIFICATIONS_DATA.filter(item => item.type === "row").map(item => (
                        <Row
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            desc={item.desc!}
                            badge={item.badge}
                        />
                    ))}
                </div>
            </article>
        </section>
    );
}
