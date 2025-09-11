"use client";

import React, { useMemo, useState } from "react";
import { Download, FileDown, Printer, Search, Calendar as CalendarIcon, Filter, Eye } from "lucide-react";
import Link from "next/link";

/** -----------------------------------------
 * Demo dataset (replace with API later)
 * ----------------------------------------- */
type Row = {
    id: string;
    name: string;
    type: "Competition" | "Seminar" | "Workshop" | "Meetup";
    date: string; // ISO yyyy-mm-dd
    venue: string;
    organizer: string;
    participants: number;
    feedbackRate: number; // 0..1
    certificates: number;
};

const DATA: Row[] = [
    {
        id: "EVT-1024",
        name: "AI Hackathon 2025",
        type: "Competition",
        date: "2025-09-23",
        venue: "Lab 1",
        organizer: "CS Club",
        participants: 240,
        feedbackRate: 0.5,
        certificates: 160,
    },
    {
        id: "EVT-1026",
        name: "Robotics Day",
        type: "Seminar",
        date: "2025-10-04",
        venue: "Auditorium",
        organizer: "Engineering",
        participants: 320,
        feedbackRate: 0.44,
        certificates: 180,
    },
    {
        id: "EVT-1032",
        name: "Career Fair",
        type: "Seminar",
        date: "2025-12-03",
        venue: "Expo Center",
        organizer: "Career Svcs",
        participants: 700,
        feedbackRate: 0.62,
        certificates: 410,
    },
    {
        id: "EVT-1040",
        name: "Cloud Bootcamp",
        type: "Workshop",
        date: "2025-11-12",
        venue: "Lab 2",
        organizer: "IT Center",
        participants: 120,
        feedbackRate: 0.58,
        certificates: 75,
    },
    {
        id: "EVT-1046",
        name: "Open Source Day",
        type: "Meetup",
        date: "2026-01-20",
        venue: "Hall A",
        organizer: "Tech Guild",
        participants: 220,
        feedbackRate: 0.47,
        certificates: 130,
    },
];

/** -----------------------------------------
 * Small helpers
 * ----------------------------------------- */
const fmtPct = (n: number) => `${Math.round(n * 100)}%`;
const within = (d: string, from?: string, to?: string) => (!from || d >= from) && (!to || d <= to);

/** -----------------------------------------
 * Reports Page
 * ----------------------------------------- */
export default function ReportsPage() {
    // Filters
    const [query, setQuery] = useState("");
    const [type, setType] = useState<"All" | Row["type"]>("All");
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");

    // Table paging
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Derived rows (filtering)
    const rows = useMemo(() => {
        const q = query.trim().toLowerCase();
        return DATA.filter((r) => {
            const okQ =
                !q ||
                r.id.toLowerCase().includes(q) ||
                r.name.toLowerCase().includes(q) ||
                r.organizer.toLowerCase().includes(q) ||
                r.venue.toLowerCase().includes(q);
            const okT = type === "All" || r.type === type;
            const okD = within(r.date, from || undefined, to || undefined);
            return okQ && okT && okD;
        });
    }, [query, type, from, to]);

    // KPIs from filtered rows
    const kpis = useMemo(() => {
        const totalEvents = rows.length;
        const totalParticipants = rows.reduce((s, r) => s + r.participants, 0);
        const avgFeedback = rows.length === 0 ? 0 : rows.reduce((s, r) => s + r.feedbackRate, 0) / rows.length;
        const totalCerts = rows.reduce((s, r) => s + r.certificates, 0);
        return { totalEvents, totalParticipants, avgFeedback, totalCerts };
    }, [rows]);

    // Pagination slice
    const pageCount = Math.max(1, Math.ceil(rows.length / rowsPerPage));
    const clampedPage = Math.min(page, pageCount);
    const slice = rows.slice((clampedPage - 1) * rowsPerPage, clampedPage * rowsPerPage);

    // Export CSV
    const exportCSV = () => {
        const header = [
            "ID",
            "Event name",
            "Type",
            "Date",
            "Venue",
            "Organizer",
            "Participants",
            "FeedbackRate(%)",
            "Certificates",
        ];
        const body = rows.map((r) => [
            r.id,
            r.name,
            r.type,
            r.date,
            r.venue,
            r.organizer,
            String(r.participants),
            String(Math.round(r.feedbackRate * 100)),
            String(r.certificates),
        ]);
        const csv = [header, ...body].map((row) => row.map(csvCell).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "events-report.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Print (simple)
    const handlePrint = () => {
        window.print();
    };

    return (
        <section className="grid gap-6">
            {/* Header */}
            <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Reports</h1>
                    <p className="mt-1 text-sm text-slate-600">Filter, review and export event statistics.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={exportCSV}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                    >
                        <FileDown className="h-4 w-4" />
                        Export CSV
                    </button>
                    <button
                        onClick={handlePrint}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#06b6d4] px-3 py-2 text-sm text-white hover:opacity-95"
                    >
                        <Printer className="h-4 w-4" />
                        Print
                    </button>
                </div>
            </header>

            {/* Filters */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="grid gap-3 md:grid-cols-4">
                    {/* Search */}
                    <label className="relative">
                        <span className="mb-1 block text-xs font-medium text-slate-500">Search</span>
                        <Search className="pointer-events-none absolute top-[38px] left-3 h-4 w-4 text-slate-400" />
                        <input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setPage(1);
                            }}
                            placeholder="ID, name, organizer, venue…"
                            className="w-full rounded-lg border border-slate-200 bg-white px-9 py-2 text-sm ring-0 outline-none placeholder:text-slate-400 focus:border-slate-300"
                        />
                    </label>

                    {/* Type */}
                    <label>
                        <span className="mb-1 block text-xs font-medium text-slate-500">Type</span>
                        <div className="relative">
                            <Filter className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <select
                                value={type}
                                onChange={(e) => {
                                    setType(e.target.value as any);
                                    setPage(1);
                                }}
                                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-9 py-2 text-sm outline-none focus:border-slate-300"
                            >
                                <option>All</option>
                                <option>Competition</option>
                                <option>Seminar</option>
                                <option>Workshop</option>
                                <option>Meetup</option>
                            </select>
                        </div>
                    </label>

                    {/* From */}
                    <label>
                        <span className="mb-1 block text-xs font-medium text-slate-500">From</span>
                        <div className="relative">
                            <CalendarIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="date"
                                value={from}
                                onChange={(e) => {
                                    setFrom(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full rounded-lg border border-slate-200 bg-white px-9 py-2 text-sm outline-none focus:border-slate-300"
                            />
                        </div>
                    </label>

                    {/* To */}
                    <label>
                        <span className="mb-1 block text-xs font-medium text-slate-500">To</span>
                        <div className="relative">
                            <CalendarIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="date"
                                value={to}
                                onChange={(e) => {
                                    setTo(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full rounded-lg border border-slate-200 bg-white px-9 py-2 text-sm outline-none focus:border-slate-300"
                            />
                        </div>
                    </label>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid gap-4 md:grid-cols-4">
                <KPICard title="Events (filtered)" value={String(kpis.totalEvents)} />
                <KPICard title="Participants (total)" value={kpis.totalParticipants.toLocaleString()} />
                <KPICard title="Avg. feedback" value={fmtPct(kpis.avgFeedback)} />
                <KPICard title="Certificates (total)" value={kpis.totalCerts.toLocaleString()} />
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Event name</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Venue</th>
                                <th className="px-4 py-3">Organizer</th>
                                <th className="px-4 py-3 text-right">Att.</th>
                                <th className="px-4 py-3 text-right">Feedback</th>
                                <th className="px-4 py-3 text-right">Certs</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slice.length === 0 && (
                                <tr>
                                    <td colSpan={10} className="px-4 py-10 text-center text-slate-500">
                                        No results match your filters.
                                    </td>
                                </tr>
                            )}
                            {slice.map((r) => (
                                <tr key={r.id} className="border-b last:border-0 hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-medium text-slate-800">{r.id}</td>
                                    <td className="px-4 py-3">{r.name}</td>
                                    <td className="px-4 py-3 text-slate-600">{r.type}</td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {new Date(r.date).toLocaleDateString("en-GB")}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{r.venue}</td>
                                    <td className="px-4 py-3 text-slate-600">{r.organizer}</td>
                                    <td className="px-4 py-3 text-right tabular-nums">{r.participants}</td>
                                    <td className="px-4 py-3 text-right tabular-nums">{fmtPct(r.feedbackRate)}</td>
                                    <td className="px-4 py-3 text-right tabular-nums">{r.certificates}</td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/events/${r.id}`}
                                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer: paging */}
                <div className="flex items-center justify-between gap-3 border-t border-slate-200 p-3 text-sm">
                    <div className="text-slate-500">
                        Showing <b>{slice.length}</b> of <b>{rows.length}</b>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2">
                            <span className="text-slate-500">Rows:</span>
                            <select
                                value={rowsPerPage}
                                onChange={(e) => {
                                    setRowsPerPage(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="rounded-md border border-slate-200 bg-white px-2 py-1"
                            >
                                {[5, 10, 20, 50].map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div className="ml-2 flex items-center gap-1">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="rounded-md border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50"
                                disabled={clampedPage === 1}
                            >
                                ‹
                            </button>
                            <span className="min-w-[4rem] text-center text-slate-600">
                                {clampedPage} / {pageCount}
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                                className="rounded-md border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50"
                                disabled={clampedPage === pageCount}
                            >
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/** -----------------------------------------
 * Small components
 * ----------------------------------------- */
function KPICard({ title, value }: { title: string; value: string }) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold text-slate-500">{title}</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">{value}</div>
        </article>
    );
}

// Escape cells for CSV
function csvCell(s: string) {
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
}
