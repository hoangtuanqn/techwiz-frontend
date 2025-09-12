"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Eye } from "lucide-react";

const DEMO = [
    {
        id: "EVT-2101",
        name: "AI Summit",
        type: "Conference",
        start: "12/11/2025",
        end: "14/11/2025",
        place: "Main Hall",
        org: "Tech Dept",
        participants: 300,
    },
    {
        id: "EVT-2102",
        name: "Marketing Bootcamp",
        type: "Workshop",
        start: "20/11/2025",
        end: "21/11/2025",
        place: "Room B2",
        org: "Business Faculty",
        participants: 120,
    },
];

export default function ApprovedEventsPage() {
    const [q, setQ] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const text = q.trim().toLowerCase();
        return !text
            ? DEMO
            : DEMO.filter((r) => [r.id, r.name, r.type, r.place, r.org].some((f) => f.toLowerCase().includes(text)));
    }, [q]);

    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / perPage));
    const startIdx = (page - 1) * perPage;
    const rows = filtered.slice(startIdx, startIdx + perPage);

    return (
        <section className="rounded-2xl border border-slate-200 bg-white">
            {/* Header + search */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        value={q}
                        onChange={(e) => {
                            setQ(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search approved events…"
                        className="w-64 rounded-lg border border-slate-200 py-2 pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-cyan-200"
                    />
                </div>
                <div className="text-xs text-slate-500">
                    Showing <b className="mx-1">{rows.length}</b> of {total}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] border-t border-slate-200 text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="w-28 px-3 py-2 text-left">ID</th>
                            <th className="px-3 py-2 text-left">Event name</th>
                            <th className="w-32 px-3 py-2 text-left">Type</th>
                            <th className="w-28 px-3 py-2 text-left">Start</th>
                            <th className="w-28 px-3 py-2 text-left">End</th>
                            <th className="w-28 px-3 py-2 text-left">Venue</th>
                            <th className="w-36 px-3 py-2 text-left">Organizer</th>
                            <th className="w-20 px-3 py-2 text-right">Attendees</th>
                            <th className="w-28 px-3 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.id} className="border-t border-slate-100">
                                <td className="px-3 py-2 text-slate-600">{r.id}</td>
                                <td className="px-3 py-2 font-medium">{r.name}</td>
                                <td className="px-3 py-2">{r.type}</td>
                                <td className="px-3 py-2">{r.start}</td>
                                <td className="px-3 py-2">{r.end}</td>
                                <td className="px-3 py-2">{r.place}</td>
                                <td className="px-3 py-2">{r.org}</td>
                                <td className="px-3 py-2 text-right">{r.participants}</td>
                                <td className="px-3 py-2">
                                    <div className="flex items-center justify-center">
                                        <Link
                                            href={`/admin/events/${r.id}?mode=review`}
                                            className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
                                        >
                                            <Eye className="mr-1 inline-block h-3.5 w-3.5" />
                                            View
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={9} className="px-3 py-10 text-center text-slate-500">
                                    No approved events.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-200 p-3">
                <div className="flex items-center gap-2 text-sm">
                    Rows per page:
                    <select
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                        className="rounded-lg border border-slate-200 px-2 py-1"
                    >
                        {[10, 20, 50].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="rounded-lg border px-2 py-1 hover:bg-slate-50"
                    >
                        ‹
                    </button>
                    <span>
                        {page} / {pages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(pages, p + 1))}
                        className="rounded-lg border px-2 py-1 hover:bg-slate-50"
                    >
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
}
