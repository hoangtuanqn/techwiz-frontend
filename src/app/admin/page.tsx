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
    ChartBar,
} from "lucide-react";

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

export default function OverviewPage() {
    return (
        <section className="grid gap-6">
            {/* Intro */}
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">Hộp thư sự kiện</h1>
                <p className="mt-1 text-sm text-slate-600">
                    Quản lý email và thông báo gửi đến người tham gia. Xem tổng quan trạng thái, hoạt động gần đây và
                    chuyển nhanh tới các mục quản trị.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                        href="/admin/notifications"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <BellPlus className="h-4 w-4" /> Tạo thông báo
                    </Link>
                    <Link
                        href="/admin/approvals"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <CheckSquare className="h-4 w-4" /> Duyệt yêu cầu
                    </Link>
                    <Link
                        href="/admin/events/create"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <CalendarPlus className="h-4 w-4" /> Tạo sự kiện
                    </Link>
                </div>
            </article>

            {/* Stats (text tĩnh – chỉ điều hướng) */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Stat icon={Inbox} title="Inbox" value="120" subtitle="5 chưa đọc" href="/admin/notifications" />
                <Stat icon={Send} title="Đã gửi" value="320" subtitle="email & push" href="/admin/notifications" />
                <Stat icon={Clock} title="Đã lên lịch" value="8" subtitle="sắp gửi" href="/admin/notifications" />
                <Stat icon={AlertTriangle} title="Thất bại" value="2" subtitle="cần xử lý" href="/admin/status" />
            </div>

            {/* Recent (text + link tới các trang trong sidebar) */}
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                    <h2 className="text-lg font-semibold text-slate-900">Hoạt động gần đây</h2>
                    <Link href="/admin/status" className="text-xs font-medium text-slate-600 hover:text-slate-900">
                        Xem tình trạng &rarr;
                    </Link>
                </div>
                <div className="divide-y divide-slate-100">
                    <Row
                        title="Reminder: Hackathon 2025"
                        desc="Gửi lúc 18:00 — Email"
                        href="/admin/notifications"
                        badge={{ text: "Sent", tone: "ok" }}
                    />
                    <Row
                        title="Check-in mở cửa"
                        desc="Gửi lúc 08:30 — Push"
                        href="/admin/notifications"
                        badge={{ text: "Sent", tone: "ok" }}
                    />
                    <Row
                        title="Cultural Night update"
                        desc="Hẹn 19:00 — Email"
                        href="/admin/notifications"
                        badge={{ text: "Scheduled", tone: "info" }}
                    />
                    <Row
                        title="Workshop tài liệu"
                        desc="09:00 — Email"
                        href="/admin/status"
                        badge={{ text: "Failed", tone: "error" }}
                    />
                    <Row
                        title="Phân quyền Organizer mới"
                        desc="Cập nhật vai trò — Admin"
                        href="/admin/role"
                        badge={{ text: "Info", tone: "warn" }}
                    />
                </div>
            </article>

            {/* Quick links tới các mục trong sidebar */}
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold text-slate-900">Điều hướng nhanh</h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/admin/approvals"
                    >
                        Approvals
                    </Link>
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/admin/role"
                    >
                        Roles
                    </Link>
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/admin/notifications"
                    >
                        Notifications
                    </Link>
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/admin/status"
                    >
                        Status
                    </Link>
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/admin/events/create"
                    >
                        Create Event
                    </Link>
                    <Link
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        href="/admin/profile"
                    >
                        Profile
                    </Link>
                </div>
            </article>
        </section>
    );
}
