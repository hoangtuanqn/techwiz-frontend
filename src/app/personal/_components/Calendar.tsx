"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import {
    Calendar as CalendarIcon,
    Filter,
    RefreshCcw,
    Download,
    Clock,
    MapPin,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

/* ================= Types ================= */
type ApiEvent = {
    id: number | string;
    title: string;
    start_event: string; // ISO
    end_event: string; // ISO
    venue?: string;
    category?: string;
    booked_count?: number;
    is_booked?: boolean;
};

type RangeKey = "all" | "today" | "week" | "month" | "custom";
type StatusKey = "all" | "upcoming" | "past";

/* ================= Helpers ================= */
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
const addDays = (d: Date, n: number) => {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
};
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);

const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

const toCSV = (rows: ApiEvent[]) => {
    const header = ["ID", "Title", "Start", "End", "Venue", "Category"];
    const data = rows.map((r) => [
        r.id,
        r.title,
        new Date(r.start_event).toISOString(),
        new Date(r.end_event).toISOString(),
        r.venue ?? "",
        r.category ?? "",
    ]);
    return [header, ...data].map((r) => r.join(",")).join("\n");
};

const downloadCSV = (rows: ApiEvent[], filename = "my_events.csv") => {
    const blob = new Blob([toCSV(rows)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};

/* ===== Calendar helpers (grid) ===== */
const startOfWeek = (d: Date, weekStartsOn = 0) => {
    const date = new Date(d);
    const diff = (date.getDay() + 7 - weekStartsOn) % 7; // 0 = Sunday
    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
};
const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const isSameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
const daysInGrid = (viewDate: Date) => {
    const firstOfMonth = startOfMonth(viewDate);
    const gridStart = startOfWeek(firstOfMonth, 0); // Sunday-first
    const out: Date[] = [];
    for (let i = 0; i < 42; i++) {
        const d = new Date(gridStart);
        d.setDate(gridStart.getDate() + i);
        out.push(d);
    }
    return out;
};

const catColor = (c?: string) => {
    switch (c) {
        case "technical":
            return "bg-emerald-500";
        case "cultural":
            return "bg-fuchsia-500";
        case "business":
            return "bg-amber-500";
        case "design":
            return "bg-cyan-500";
        default:
            return "bg-slate-400";
    }
};

/* ================= Demo data (có multi-day) ================= */
const iso = (d: Date) => d.toISOString();
const now = new Date();
const DEMO_EVENTS: ApiEvent[] = [
    {
        id: 3,
        title: "Campus Tech Expo",
        start_event: iso(addDays(now, 1)),
        end_event: iso(addDays(now, 1)),
        venue: "West Sheldonville",
        category: "other",
        booked_count: 12,
        is_booked: true,
    },
    {
        id: 15,
        title: "AI Bootcamp (3-day)",
        start_event: iso(addDays(now, 2)),
        end_event: iso(addDays(now, 4)),
        venue: "West Alta",
        category: "technical",
        booked_count: 35,
        is_booked: true,
    },
    {
        id: 22,
        title: "Robotics Lab Tour",
        start_event: iso(addDays(now, -2)),
        end_event: iso(addDays(now, -2)),
        venue: "Mech B2",
        category: "technical",
        booked_count: 20,
        is_booked: true,
    },
    {
        id: 31,
        title: "Design Thinking Workshop",
        start_event: iso(addDays(now, 7)),
        end_event: iso(addDays(now, 7)),
        venue: "Studio A",
        category: "design",
        booked_count: 18,
        is_booked: true,
    },
    {
        id: 42,
        title: "Startup Pitch Night",
        start_event: iso(addDays(now, 5)),
        end_event: iso(addDays(now, 5)),
        venue: "Auditorium",
        category: "business",
        booked_count: 44,
        is_booked: true,
    },
    {
        id: 49,
        title: "Hackathon (Weekend)",
        start_event: iso(addDays(now, 12)),
        end_event: iso(addDays(now, 14)),
        venue: "Main Hall",
        category: "technical",
        booked_count: 80,
        is_booked: true,
    },
    {
        id: 55,
        title: "Cultural Night",
        start_event: iso(addDays(now, -10)),
        end_event: iso(addDays(now, -10)),
        venue: "Theatre",
        category: "cultural",
        booked_count: 120,
        is_booked: true,
    },
    {
        id: 66,
        title: "Alumni Talk",
        start_event: iso(addDays(now, 20)),
        end_event: iso(addDays(now, 20)),
        venue: "Room C303",
        category: "other",
        booked_count: 60,
        is_booked: true,
    },
];

/* ================= Main Component ================= */
export default function PersonalCalendar() {
    // 1) source (demo)
    const [events] = useState<ApiEvent[]>(DEMO_EVENTS);

    // 2) filter state
    const [range, setRange] = useState<RangeKey>("all");
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [status, setStatus] = useState<StatusKey>("all");
    const [category, setCategory] = useState<string>("all");

    const categories = useMemo(() => {
        const set = new Set(events.map((e) => e.category).filter(Boolean) as string[]);
        return ["all", ...Array.from(set)];
    }, [events]);

    // 3) range window
    const rangeWindow = useMemo(() => {
        const now = new Date();
        if (range === "today") return { start: startOfDay(now), end: endOfDay(now) };
        if (range === "week") return { start: startOfDay(now), end: endOfDay(addDays(now, 6)) };
        if (range === "month") return { start: startOfMonth(now), end: endOfMonth(now) };
        if (range === "custom" && from && to) {
            return { start: startOfDay(new Date(from)), end: endOfDay(new Date(to)) };
        }
        return {
            start: new Date("1970-01-01T00:00:00Z"),
            end: new Date("9999-12-31T23:59:59Z"),
        };
    }, [range, from, to]);

    // 4) filtered (overlap + status + category)
    const filtered = useMemo(() => {
        const nowMs = Date.now();
        const sLimit = rangeWindow.start.getTime();
        const eLimit = rangeWindow.end.getTime();

        return events
            .filter((ev) => {
                const s = new Date(ev.start_event).getTime();
                const e = new Date(ev.end_event).getTime();
                const overlap = s <= eLimit && e >= sLimit;

                const stOK =
                    status === "all" ? true : status === "upcoming" ? e >= nowMs : status === "past" ? e < nowMs : true;

                const ctOK = category === "all" ? true : ev.category === category;

                return overlap && stOK && ctOK;
            })
            .sort((a, b) => a.start_event.localeCompare(b.start_event));
    }, [events, rangeWindow, status, category]);

    // 5) history (past only)
    const history = useMemo(() => {
        const nowMs = Date.now();
        return events
            .filter((ev) => new Date(ev.end_event).getTime() < nowMs)
            .sort((a, b) => b.end_event.localeCompare(a.end_event));
    }, [events]);

    const resetAll = () => {
        setRange("all");
        setFrom("");
        setTo("");
        setStatus("all");
        setCategory("all");
    };

    /* ===== View month state for calendar grid ===== */
    const [viewDate, setViewDate] = useState<Date>(new Date());
    const monthDays = useMemo(() => daysInGrid(viewDate), [viewDate]);

    const eventsOnDay = (d: Date) => {
        const ds = startOfDay(d).getTime();
        const de = endOfDay(d).getTime();
        return filtered.filter((ev) => {
            const s = new Date(ev.start_event).getTime();
            const e = new Date(ev.end_event).getTime();
            return s <= de && e >= ds; // overlaps that day
        });
    };

    const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="mx-auto w-full max-w-[100rem] px-4 py-6">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold">My Calendar</h1>
                <p className="text-slate-600">See your registered events, filter by time, and review your history.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* left: Calendar */}
                <section className="lg:col-span-7">
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                        {/* Header + legend */}
                        <div className="flex items-center justify-between px-1 py-2">
                            <div className="text-sm text-slate-700">
                                <span className="font-semibold">Calendar</span>
                                <span className="ml-2 text-slate-500">({filtered.length} events)</span>
                            </div>
                            <div className="hidden items-center gap-3 text-xs text-slate-500 md:flex">
                                <span className="inline-flex items-center gap-1">
                                    <span className="inline-block h-2 w-2 rounded-full bg-slate-400" />
                                    other
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                                    technical
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-500" />
                                    cultural
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                                    business
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <span className="inline-block h-2 w-2 rounded-full bg-cyan-500" />
                                    design
                                </span>
                            </div>
                        </div>

                        {/* Month nav */}
                        <div className="flex items-center justify-between px-1 py-2">
                            <div className="inline-flex items-center gap-2">
                                <button
                                    aria-label="Previous month"
                                    onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                                    className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    aria-label="Next month"
                                    onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                                    className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewDate(new Date())}
                                    className="ml-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                                >
                                    Today
                                </button>
                            </div>
                            <div className="text-sm font-semibold">
                                {viewDate.toLocaleString([], {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </div>
                        </div>

                        {/* Weekday header */}
                        <div className="grid grid-cols-7 gap-px rounded-lg bg-slate-200 p-px text-xs font-medium text-slate-600">
                            {weekNames.map((w) => (
                                <div key={w} className="rounded-t-lg bg-slate-50 px-2 py-2 text-center uppercase">
                                    {w}
                                </div>
                            ))}
                        </div>

                        {/* Calendar grid 6x7 */}
                        <div className="mt-1 grid grid-cols-7 gap-px rounded-b-lg bg-slate-200 p-px">
                            {monthDays.map((d, idx) => {
                                const inMonth = isSameMonth(d, viewDate);
                                const isToday = isSameDay(d, new Date());
                                const dayEvents = eventsOnDay(d);
                                const visible = dayEvents.slice(0, 3);
                                const more = dayEvents.length - visible.length;

                                return (
                                    <div
                                        key={idx}
                                        className={[
                                            "min-h-[110px] rounded-b-lg bg-white p-2",
                                            !inMonth ? "bg-slate-50 text-slate-400" : "",
                                        ].join(" ")}
                                    >
                                        <div className="mb-1 flex items-center justify-between">
                                            <div
                                                className={[
                                                    "inline-flex h-7 w-7 items-center justify-center rounded-full text-sm",
                                                    isToday ? "bg-cyan-600 font-semibold text-white" : "text-slate-700",
                                                ].join(" ")}
                                                title={d.toDateString()}
                                            >
                                                {d.getDate()}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            {visible.map((ev) => (
                                                <div
                                                    key={String(ev.id)}
                                                    className={[
                                                        "truncate rounded-md px-2 py-1 text-[11px] font-medium text-white",
                                                        catColor(ev.category),
                                                    ].join(" ")}
                                                    title={`${ev.title} • ${fmtDate(ev.start_event)} → ${fmtDate(
                                                        ev.end_event,
                                                    )}`}
                                                >
                                                    {ev.title}
                                                </div>
                                            ))}
                                            {more > 0 && (
                                                <div className="truncate rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                                                    +{more} more
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
                {/* right */}
                <aside className="lg:col-span-5">
                    {/* Actions */}
                    <div className="flex items-center justify-between gap-2">
                        <button
                            onClick={() => downloadCSV(filtered)}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                        >
                            <Download className="h-4 w-4" /> Export CSV
                        </button>
                        <button
                            onClick={resetAll}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                        >
                            <RefreshCcw className="h-4 w-4" /> Reset
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-3 flex items-center gap-2 text-sm text-slate-700">
                            <Filter className="h-4 w-4" />
                            <span className="font-medium">Filters</span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                            {/* Range */}
                            <div className="md:col-span-12">
                                <label className="mb-1 block text-xs font-medium tracking-wide text-slate-600 uppercase">
                                    Time range
                                </label>
                                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                                    {(["all", "today", "week", "month", "custom"] as RangeKey[]).map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => setRange(r)}
                                            className={[
                                                "rounded-lg border px-3 py-2 text-sm",
                                                range === r
                                                    ? "border-cyan-300 bg-cyan-50 text-cyan-700"
                                                    : "border-slate-200 bg-white hover:bg-slate-50",
                                            ].join(" ")}
                                        >
                                            {r === "all"
                                                ? "All"
                                                : r === "today"
                                                  ? "Today"
                                                  : r === "week"
                                                    ? "This week"
                                                    : r === "month"
                                                      ? "This month"
                                                      : "Custom"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom From / To */}
                            <div className="md:col-span-6">
                                <label className="mb-1 block text-xs font-medium tracking-wide text-slate-600 uppercase">
                                    From
                                </label>
                                <input
                                    type="date"
                                    value={from}
                                    onChange={(e) => {
                                        setFrom(e.target.value);
                                        setRange("custom");
                                    }}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none hover:bg-slate-50"
                                />
                            </div>
                            <div className="md:col-span-6">
                                <label className="mb-1 block text-xs font-medium tracking-wide text-slate-600 uppercase">
                                    To
                                </label>
                                <input
                                    type="date"
                                    value={to}
                                    onChange={(e) => {
                                        setTo(e.target.value);
                                        setRange("custom");
                                    }}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none hover:bg-slate-50"
                                />
                            </div>

                            {/* Status */}
                            <div className="md:col-span-6">
                                <label className="mb-1 block text-xs font-medium tracking-wide text-slate-600 uppercase">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as StatusKey)}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none hover:bg-slate-50"
                                >
                                    <option value="all">All</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="past">Past</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div className="md:col-span-6">
                                <label className="mb-1 block text-xs font-medium tracking-wide text-slate-600 uppercase">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none hover:bg-slate-50"
                                >
                                    {categories.map((c) => (
                                        <option key={c} value={c}>
                                            {c === "all" ? "All" : c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-3 text-right text-sm text-slate-500">
                            {filtered.length} events in current filter
                        </div>
                    </div>

                    {/* History */}
                    <section className="mt-4">
                        <h2 className="text-base font-semibold">Event History</h2>
                        <p className="mt-1 text-sm text-slate-600">Past events you registered for.</p>

                        {history.length === 0 ? (
                            <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
                                No past events yet.
                            </div>
                        ) : (
                            <div className="mt-3 max-h-[520px] overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 uppercase">
                                    <div className="col-span-5">Title</div>
                                    <div className="col-span-4">When</div>
                                    <div className="col-span-2">Venue</div>
                                    <div className="col-span-1 text-right">Booked</div>
                                </div>
                                <ul className="divide-y divide-slate-200">
                                    {history.map((ev) => (
                                        <li
                                            key={String(ev.id)}
                                            className="grid grid-cols-12 items-center px-4 py-3 text-sm"
                                        >
                                            <div className="col-span-5">
                                                <div className="font-medium">{ev.title}</div>
                                                {ev.category && (
                                                    <div className="mt-0.5 text-xs text-slate-500">{ev.category}</div>
                                                )}
                                            </div>
                                            <div className="col-span-4 text-slate-700">
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4 text-slate-500" />
                                                    <span>{fmtDate(ev.start_event)}</span>
                                                </div>
                                                <div className="mt-0.5 flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-slate-500" />
                                                    <span>{fmtDate(ev.end_event)}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-2 text-slate-700">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-slate-500" />
                                                    <span className="truncate">{ev.venue ?? "—"}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-1 text-right text-slate-700">
                                                {ev.is_booked ? "Yes" : "No"}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                </aside>
            </div>
        </div>
    );
}
