"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Calendar as CalendarIcon, Users, X, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import eventApi from "~/apiRequest/event";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import Link from "next/link";

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
   Category colors
========================= */
const CATEGORY_COLORS: Record<string, string> = {
    technical: "#3B82F6",
    cultural: "#EC4899",
    business: "#10B981",
    sports: "#F97316",
    academic: "#8B5CF6",
    social: "#06B6D4",
    workshop: "#F59E0B",
    competition: "#EF4444",
};

/* =========================
   Utils
========================= */
const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
};

const formatDateToYMD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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

const getEventStatus = (startTime: string, endTime: string, today: Date) => {
    const evStart = parseDate(startTime);
    const evEnd = parseDate(endTime);
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
const Calendar: React.FC = () => {
    const [weeks, setWeeks] = useState<number>(1);
    const [anchorDate, setAnchorDate] = useState<Date>(new Date());
    const [days, setDays] = useState<Date[]>([]);

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [showMyEvents, setShowMyEvents] = useState(false);

    // Fetch events from API
    const {
        data: eventsResponse,
        isLoading: apiLoading,
        error: apiError,
    } = useQuery({
        queryKey: ["event-schedule"],
        queryFn: () => eventApi.getEventSchedule(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Get today date for status calculation
    const today = useMemo(() => {
        const t = new Date();
        t.setHours(0, 0, 0, 0);
        return t;
    }, []);

    // Filter events based on current date range and filters
    const visibleEvents = useMemo(() => {
        const allEvents = eventsResponse?.data?.data || [];

        if (days.length === 0 || allEvents.length === 0) {
            return [];
        }

        const startDate = days[0];
        const endDate = days[days.length - 1];

        const filtered = allEvents
            .filter((ev) => {
                // Date range filter
                const eventStart = parseDate(ev.start_event);
                const eventEnd = parseDate(ev.end_event);
                const inDateRange = !(eventEnd < startDate || eventStart > endDate);

                // Search filter
                const matchesSearch =
                    searchQuery === "" ||
                    ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    ev.venue.toLowerCase().includes(searchQuery.toLowerCase());

                // Category filter
                const matchesCategory =
                    selectedCategory === "all" || ev.category.toLowerCase() === selectedCategory.toLowerCase();

                // Status filter
                const eventStatus = getEventStatus(ev.start_event, ev.end_event, today);
                const matchesStatus =
                    selectedStatus === "all" ||
                    (selectedStatus === "completed" && eventStatus === "ended") ||
                    (selectedStatus !== "completed" && eventStatus === selectedStatus);

                // My events filter
                const matchesMyEvents = !showMyEvents || ev.is_booked;

                return inDateRange && matchesSearch && matchesCategory && matchesStatus && matchesMyEvents;
            })
            .sort((a, b) => {
                const aStart = parseDate(a.start_event).getTime();
                const bStart = parseDate(b.start_event).getTime();
                return aStart - bStart || a.id - b.id;
            });

        return filtered;
    }, [days, eventsResponse, searchQuery, selectedCategory, selectedStatus, showMyEvents, today]);

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

    const rangeLabel = useMemo(() => {
        if (!days.length) return "";
        const s = days[0];
        const e = days[days.length - 1];
        const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
        return sameMonth
            ? `${s.toLocaleString("en-US", { month: "long" })} ${s.getDate()}–${e.getDate()}, ${s.getFullYear()}`
            : `${s.toLocaleString("en-US", { month: "short" })} ${s.getDate()}, ${s.getFullYear()} — ${e.toLocaleString("en-US", { month: "short" })} ${e.getDate()}, ${e.getFullYear()}`;
    }, [days]);

    const navDisabled = weeks === 2; // khóa điều hướng khi 2 tuần (cố định)

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
                            className="flex cursor-pointer items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            title={navDisabled ? "Disabled in 2-week fixed mode" : "Previous"}
                        >
                            <ChevronLeft className="size-3.5" /> Previous
                        </button>
                        <button
                            onClick={() => setAnchorDate(new Date())}
                            disabled={navDisabled}
                            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            title={navDisabled ? "Disabled in 2-week fixed mode" : "Today"}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setAnchorDate((prev) => addDays(prev, 7 * weeks))}
                            disabled={navDisabled}
                            className="flex cursor-pointer items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            title={navDisabled ? "Disabled in 2-week fixed mode" : "Next"}
                        >
                            Next <ChevronRight className="size-3.5" />
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

                {/* Filter Controls */}
                <div className="mb-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
                            {/* <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm shadow-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
                            /> */}
                            <Input
                                type="text"
                                placeholder="Search events…"
                                className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-3 pl-10 text-sm focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className="bg-white">
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="technical">Technical</SelectItem>
                                        <SelectItem value="business">Business</SelectItem>
                                        <SelectItem value="cultural">Cultural</SelectItem>
                                        <SelectItem value="sports">Sports</SelectItem>
                                        <SelectItem value="workshop">Workshops & Seminars</SelectItem>
                                        <SelectItem value="academic">Academic</SelectItem>
                                        <SelectItem value="annual">Annual Functions</SelectItem>
                                        <SelectItem value="community">Community & Social</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value)}>
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className="bg-white">
                                        <SelectLabel>Status</SelectLabel>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="upcoming">Upcoming</SelectItem>
                                        <SelectItem value="ongoing">Ongoing</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* My Events Toggle */}
                        <div className="flex items-center">
                            <button
                                onClick={() => setShowMyEvents(!showMyEvents)}
                                className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                    showMyEvents
                                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                                        : "border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
                                }`}
                            >
                                <Users className="h-4 w-4" />
                                My Events
                            </button>
                        </div>
                    </div>

                    {/* Active Filters Summary */}
                    {(searchQuery || selectedCategory !== "all" || selectedStatus !== "all" || showMyEvents) && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-slate-600">Active filters:</span>
                            {searchQuery && (
                                <span className="inline-flex items-center gap-1 rounded-lg bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-700">
                                    <Search className="h-3 w-3" />
                                    &ldquo;{searchQuery}&rdquo;
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="ml-1 rounded-full p-0.5 hover:bg-cyan-200"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            )}
                            {selectedCategory !== "all" && (
                                <span className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                                    {selectedCategory}
                                    <button
                                        onClick={() => setSelectedCategory("all")}
                                        className="ml-1 rounded-full p-0.5 hover:bg-blue-200"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            )}
                            {selectedStatus !== "all" && (
                                <span className="inline-flex items-center gap-1 rounded-lg bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                    {selectedStatus === "upcoming"
                                        ? "Upcoming"
                                        : selectedStatus === "ongoing"
                                          ? "Ongoing"
                                          : "Completed"}
                                    <button
                                        onClick={() => setSelectedStatus("all")}
                                        className="ml-1 rounded-full p-0.5 hover:bg-green-200"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            )}
                            {showMyEvents && (
                                <span className="inline-flex items-center gap-1 rounded-lg bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                                    <Users className="h-3 w-3" />
                                    My Events
                                    <button
                                        onClick={() => setShowMyEvents(false)}
                                        className="ml-1 rounded-full p-0.5 hover:bg-purple-200"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                    setSelectedStatus("all");
                                    setShowMyEvents(false);
                                }}
                                className="ml-2 text-xs text-slate-500 underline hover:text-slate-700"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                {/* Events Summary */}
                <div className="mb-6">
                    <div className="flex items-center justify-between rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-cyan-500 p-2">
                                <CalendarIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-medium text-slate-900">Showing {visibleEvents.length} events</h3>
                                <p className="text-sm text-slate-600">
                                    {apiLoading ? "Loading..." : `In the period ${rangeLabel}`}
                                </p>
                            </div>
                        </div>
                        {visibleEvents.length > 0 && (
                            <div className="text-right">
                                <div className="text-sm text-slate-600">
                                    Registered: {visibleEvents.filter((ev) => ev.is_booked).length} events
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Calendar */}
                <div
                    className="mb-5 overflow-x-auto overflow-y-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
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
                        {apiLoading && (
                            <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-slate-500">
                                Loading events...
                            </div>
                        )}

                        {apiError && (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">
                                Error loading events. Please try again.
                            </div>
                        )}

                        {!apiLoading && !apiError && visibleEvents.length === 0 && (
                            <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-slate-500">
                                No events in this time range.
                            </div>
                        )}

                        {visibleEvents.map((ev) => {
                            const start = parseDate(ev.start_event);
                            const end = parseDate(ev.end_event);
                            const startIdx = Math.max(0, daysBetween(start, days[0]));
                            const endIdx = Math.min(days.length - 1, daysBetween(end, days[0]));
                            const status = getEventStatus(ev.start_event, ev.end_event, today);
                            const color = CATEGORY_COLORS[ev.category] || PALETTE[ev.id % PALETTE.length];
                            const faded = status === "ended";

                            // Format dates for display
                            const startDate = formatDateToYMD(start);
                            const endDate = formatDateToYMD(end);

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
                                        title={`${ev.title} • ${startDate}${endDate !== startDate ? ` → ${endDate}` : ""} • ${ev.venue} • ${ev.category}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="h-2 w-2 rounded-full"
                                                style={{
                                                    background: faded ? "#9CA3AF" : color,
                                                    boxShadow: "0 3px 10px rgba(15,23,42,0.06)",
                                                }}
                                            />
                                            <Link href={`/events/${ev.id}`} className="flex min-w-0 items-center gap-3">
                                                <div className="min-w-0 flex-1">
                                                    <div className="truncate text-sm font-semibold tracking-tight">
                                                        {ev.title}
                                                    </div>
                                                    <div
                                                        className={`text-[11px] ${faded ? "text-slate-600/90" : "text-white/90"}`}
                                                    >
                                                        {startDate}
                                                        {endDate !== startDate ? ` → ${endDate}` : ""} • {ev.venue}
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="ml-auto flex items-center gap-2">
                                                {ev.is_booked && (
                                                    <span className="rounded-full bg-white/20 px-2 py-1 text-xs">
                                                        Registered
                                                    </span>
                                                )}
                                                {headerStatusChip(
                                                    statusChip(status),
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

export default Calendar;
