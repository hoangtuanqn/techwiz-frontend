"use client";
import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";

/* =========================
   Sample events (demo)
========================= */
const EVENTS = [
    { id: 1, title: "Tires Cup", start: "2025-09-08", end: "2025-09-08", org: "Dept A" },
    { id: 2, title: "Showdown Cup", start: "2025-09-08", end: "2025-09-08", org: "Dept B" },
    { id: 3, title: "Exhaust Cup", start: "2025-09-09", end: "2025-09-09", org: "Dept A" },
    { id: 4, title: "VIP Fusion Coins Cup", start: "2025-09-09", end: "2025-09-11", org: "Dept C" },
    { id: 5, title: "Suspension Cup", start: "2025-09-10", end: "2025-09-10", org: "Dept D" },
    { id: 6, title: "Master Season", start: "2025-09-11", end: "2025-09-14", org: "Dept X" },
    { id: 7, title: "Past Event Example", start: "2025-09-25", end: "2025-09-27", org: "Dept Y" },
    { id: 8, title: "Past Event Example", start: "2025-09-25", end: "2025-09-27", org: "Dept Y" },
];

const PALETTE = [
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#10B981",
    "#06B6D4",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#F43F5E",
];

/* =========================
   Utils
========================= */
const parseDate = (d: string) => {
    const [y, m, day] = d.split("-").map(Number);
    const dt = new Date(y, m - 1, day);
    dt.setHours(0, 0, 0, 0);
    return dt;
};
const startOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay(); // 0 Sun .. 6 Sat
    const diff = (day + 6) % 7; // Monday as start
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    return d;
};
const addDays = (date: Date, n: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    d.setHours(0, 0, 0, 0);
    return d;
};
const daysBetween = (a: Date, b: Date) => Math.round((+a - +b) / (24 * 3600 * 1000));
const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

const getEventStatus = (evStart: Date, evEnd: Date, today: Date) => {
    if (evEnd < today) return "ended";
    if (evStart > today) return "upcoming";
    return "ongoing";
};
const statusChip = (status: "upcoming" | "ongoing" | "ended") => {
    switch (status) {
        case "upcoming":
            return "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200";
        case "ongoing":
            return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
        default:
            return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
    }
};
const headerStatusChip = (cls: string, text: string) => (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
        {text}
    </span>
);
const gradientBg = (hex: string, faded = false) =>
    `linear-gradient(135deg, ${hex} ${faded ? "0%" : "10%"}, rgba(0,0,0,0.08) 100%)`;

/* =========================
   Page
========================= */
const CalendarPage: React.FC = () => {
    const [weeks, setWeeks] = useState<number>(1);
    const [anchorDate, setAnchorDate] = useState<Date>(new Date());
    const [days, setDays] = useState<Date[]>([]);
    const [visibleEvents, setVisibleEvents] = useState<typeof EVENTS>([]);

    useEffect(() => {
        AOS.init({ once: true, duration: 420 });
    }, []);

    useEffect(() => {
        const anchor = new Date(anchorDate);
        anchor.setHours(0, 0, 0, 0);
        const rangeStart = startOfWeek(anchor);
        const numDays = weeks * 7; // ✅ 1 tuần = 7, 2 tuần = 14
        const daysArr = Array.from({ length: numDays }, (_, i) => addDays(rangeStart, i));
        setDays(daysArr);
    }, [weeks, anchorDate]);

    useEffect(() => {
        if (days.length === 0) return;
        const startDate = days[0];
        const endDate = days[days.length - 1];

        const filtered = EVENTS.filter((ev) => {
            const s = parseDate(ev.start);
            const e = parseDate(ev.end);
            return !(e < startDate || s > endDate);
        }).sort((a, b) => parseDate(a.start).getTime() - parseDate(b.start).getTime() || a.id - b.id);

        setVisibleEvents(filtered);
    }, [days]);

    const today = useMemo(() => {
        const t = new Date();
        t.setHours(0, 0, 0, 0);
        return t;
    }, []);

    const rangeLabel = useMemo(() => {
        if (!days.length) return "";
        const s = days[0];
        const e = days[days.length - 1];
        const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
        return sameMonth
            ? `${s.toLocaleString("en-US", { month: "long" })} ${s.getDate()}–${e.getDate()}, ${s.getFullYear()}`
            : `${s.toLocaleString("en-US", { month: "short" })} ${s.getDate()}, ${s.getFullYear()} — ${e.toLocaleString("en-US", { month: "short" })} ${e.getDate()}, ${e.getFullYear()}`;
    }, [days]);

    const navDisabled = weeks === 2; // khóa điều hướng khi 2 tuần (cố định 8/9–16/9)

    return (
        <div className="bg-gradient-to-b from-slate-50 to-white text-slate-800 antialiased">
            <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                {/* Controls */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur">
                        <h1 className="text-2xl font-bold tracking-tight">Event Calendar</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Each event takes one row and spans across the corresponding days.
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            {headerStatusChip("bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200", "Upcoming")}
                            {headerStatusChip("bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", "Ongoing")}
                            {headerStatusChip("bg-slate-100 text-slate-700 ring-1 ring-slate-200", "Ended")}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setAnchorDate((prev) => addDays(prev, -7 * weeks))}
                            disabled={navDisabled}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            title={navDisabled ? "Disabled in 2-week fixed mode" : "Previous"}
                        >
                            ‹ Previous
                        </button>
                        <button
                            onClick={() => setAnchorDate(new Date())}
                            disabled={navDisabled}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            title={navDisabled ? "Disabled in 2-week fixed mode" : "Today"}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setAnchorDate((prev) => addDays(prev, 7 * weeks))}
                            disabled={navDisabled}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            title={navDisabled ? "Disabled in 2-week fixed mode" : "Next"}
                        >
                            Next ›
                        </button>

                        <select
                            value={weeks}
                            onChange={(e) => setWeeks(Number(e.target.value))}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-cyan-200 focus:outline-none"
                            title="1 week (dynamic) or 2 weeks"
                        >
                            <option value={1}>1 week</option>
                            <option value={2}>2 weeks</option>
                        </select>
                    </div>
                </div>

                {/* Range pill */}
                <div className="mb-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                        {rangeLabel}
                    </span>
                </div>

                {/* Calendar */}
                <div
                    className="overflow-x-auto overflow-y-hidden rounded-2xl border border-slate-200 bg-white shadow-sm mb-5"
                    data-aos="fade-up"
                >
                    {/* Header Days (sticky) */}
                    <div
                        className="sticky top-0 z-10 grid min-w-max border-b border-slate-200 bg-white/90 backdrop-blur"
                        style={{ gridTemplateColumns: `repeat(${days.length}, minmax(140px, 1fr))` }}
                    >
                        {days.map((d, idx) => {
                            const isTodayCell = d.getTime() === today.getTime();
                            return (
                                <div
                                    key={idx}
                                    className={[
                                        "px-2 py-2 text-center text-sm font-semibold",
                                        isWeekend(d) ? "bg-slate-50" : "",
                                        isTodayCell ? "rounded-t ring-2 ring-cyan-300 ring-inset" : "",
                                    ].join(" ")}
                                    title={d.toLocaleDateString("en-US")}
                                >
                                    <div className="text-slate-700">
                                        {d.toLocaleString("en-US", { weekday: "short" }).toUpperCase()}
                                    </div>
                                    <div className="mt-0.5 text-slate-500">
                                        {String(d.getDate()).padStart(2, "0")}.
                                        {String(d.getMonth() + 1).padStart(2, "0")}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Event Rows */}
                    <div className="space-y-2 p-3">
                        {visibleEvents.length === 0 && (
                            <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-slate-500">
                                No events in this time range.
                            </div>
                        )}

                        {visibleEvents.map((ev) => {
                            const start = parseDate(ev.start);
                            const end = parseDate(ev.end);
                            const startIdx = Math.max(0, daysBetween(start, days[0]));
                            const endIdx = Math.min(days.length - 1, daysBetween(end, days[0]));
                            const status = getEventStatus(start, end, today);
                            const color = PALETTE[ev.id % PALETTE.length];
                            const faded = status === "ended";
                            const chipCls = statusChip(status);

                            return (
                                <div
                                    key={ev.id}
                                    className="grid items-center"
                                    style={{ gridTemplateColumns: `repeat(${days.length}, minmax(140px,1fr))` }}
                                >
                                    <div
                                        className={[
                                            "group flex flex-col justify-center rounded-xl px-3 py-2 shadow-sm transition will-change-transform",
                                            faded ? "text-slate-600" : "text-white",
                                            "hover:shadow-md",
                                        ].join(" ")}
                                        style={{
                                            gridColumn: `${startIdx + 1} / ${endIdx + 2}`,
                                            background: gradientBg(color, faded),
                                            border: faded ? "1px solid #e5e7eb" : "none",
                                        }}
                                        title={`${ev.title} • ${ev.start}${ev.end !== ev.start ? ` → ${ev.end}` : ""} • ${ev.org}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="h-2 w-2 rounded-full"
                                                style={{
                                                    background: faded ? "#9CA3AF" : color,
                                                    boxShadow: "0 3px 10px rgba(15,23,42,0.06)",
                                                }}
                                            />
                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-semibold tracking-tight">
                                                    {ev.title}
                                                </div>
                                                <div
                                                    className={`text-[11px] ${faded ? "text-slate-600/90" : "text-white/90"}`}
                                                >
                                                    {ev.start}
                                                    {ev.end !== ev.start ? ` → ${ev.end}` : ""} • {ev.org}
                                                </div>
                                            </div>
                                            <div className="ml-auto">
                                                {headerStatusChip(
                                                    statusChip(status), // giữ đúng class màu như header
                                                    status === "upcoming"
                                                        ? "Upcoming"
                                                        : status === "ongoing"
                                                          ? "Ongoing"
                                                          : "Ended",
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CalendarPage;
