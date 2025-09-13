"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Eye } from "lucide-react";
import { EventListResponseType } from "~/types/schemaZod/event.schema";
import { formatter } from "~/utils/format";

export default function EventTable({
    title = "",
    data,
    actionLabel = "View",
    actionLinkPrefix = "/organizer/events",
    showCheckbox = false,
    minTableWidth = 1200,
}: {
    title?: string;
    data: EventListResponseType["data"];
    actionLabel?: string;
    actionLinkPrefix?: string;
    showCheckbox?: boolean;
    minTableWidth?: number;
}) {
    const [q, setQ] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<number[]>([]);

    const events = useMemo(() => data?.data || [], [data]);

    const filtered = useMemo(() => {
        const searchTerm = q.trim().toLowerCase();
        return !searchTerm
            ? events
            : events.filter(
                  (event) =>
                      event.title.toLowerCase().includes(searchTerm) ||
                      event.category.toLowerCase().includes(searchTerm) ||
                      event.venue.toLowerCase().includes(searchTerm) ||
                      event.description.toLowerCase().includes(searchTerm),
              );
    }, [q, events]);

    const total = filtered.length;

    const startIdx = (page - 1) * perPage;
    const rows = filtered.slice(startIdx, startIdx + perPage);

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    const formatTime = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return "";
        }
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            approved: "bg-green-100 text-green-800 border-green-200",
            rejected: "bg-red-100 text-red-800 border-red-200",
            draft: "bg-gray-100 text-gray-800 border-gray-200",
        };

        return (
            <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                    statusStyles[status as keyof typeof statusStyles] || "border-gray-200 bg-gray-100 text-gray-800"
                }`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const toggleAll = (checked: boolean) => setSelected(checked ? rows.map((r) => r.id) : []);
    const toggleOne = (id: number) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

    return (
        <section className="rounded-2xl border border-slate-200 bg-white">
            {/* Header + search */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="text-xs text-slate-500">
                    Showing <b className="mx-1">{rows.length}</b> of {total}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-t border-slate-200 text-sm" style={{ minWidth: `${minTableWidth}px` }}>
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            {showCheckbox && (
                                <th className="w-10 px-3 py-2">
                                    <input
                                        type="checkbox"
                                        checked={rows.length > 0 && selected.length === rows.length}
                                        onChange={(e) => toggleAll(e.target.checked)}
                                    />
                                </th>
                            )}
                            <th className="w-16 px-3 py-2 text-left">ID</th>
                            <th className="px-3 py-2 text-left">Event Title</th>
                            <th className="w-32 px-3 py-2 text-left">Category</th>
                            <th className="w-32 px-3 py-2 text-left">Start Date</th>
                            <th className="w-32 px-3 py-2 text-left">End Date</th>
                            <th className="w-36 px-3 py-2 text-left">Venue</th>
                            <th className="w-24 px-3 py-2 text-left">Status</th>
                            <th className="w-20 px-3 py-2 text-right">Booked</th>
                            <th className="w-28 px-3 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((event) => (
                            <tr key={event.id} className="border-t border-slate-100 hover:bg-slate-50">
                                {showCheckbox && (
                                    <td className="px-3 py-2">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(event.id)}
                                            onChange={() => toggleOne(event.id)}
                                        />
                                    </td>
                                )}
                                <td className="px-3 py-2 font-mono text-xs text-slate-600">#{event.id}</td>
                                <td className="px-3 py-2">
                                    <div className="flex flex-col items-start space-y-1">
                                        <div className="line-clamp-2 font-medium text-slate-900">{event.title}</div>
                                        <div className="line-clamp-1 text-xs text-slate-500">{event.description}</div>
                                    </div>
                                </td>
                                <td className="px-3 py-2">
                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                        {formatter.capitalize(event.category)}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-slate-600">
                                    <div className="flex flex-col">
                                        <span className="text-sm">{formatDate(event.start_event)}</span>
                                        <span className="text-xs text-slate-400">{formatTime(event.start_event)}</span>
                                    </div>
                                </td>
                                <td className="px-3 py-2 text-slate-600">
                                    <div className="flex flex-col">
                                        <span className="text-sm">{formatDate(event.end_event)}</span>
                                        <span className="text-xs text-slate-400">{formatTime(event.end_event)}</span>
                                    </div>
                                </td>
                                <td className="px-3 py-2 text-slate-600">{event.venue}</td>
                                <td className="px-3 py-2">{getStatusBadge(event.status)}</td>
                                <td className="px-3 py-2 text-right">
                                    <div className="flex flex-col items-end">
                                        <span className="font-medium">{event.booked_count}</span>
                                        {event.seating?.total_seats && (
                                            <span className="text-xs text-slate-400">
                                                / {event.seating.total_seats}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-3 py-2">
                                    <div className="flex items-center justify-center">
                                        <Link
                                            href={`${actionLinkPrefix}/${event.id}?mode=review`}
                                            className="rounded-lg border border-slate-200 px-2 py-1 text-xs transition-colors duration-200 hover:bg-slate-50"
                                        >
                                            <Eye className="mr-1 inline-block h-3.5 w-3.5" />
                                            {actionLabel}
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={showCheckbox ? 10 : 9} className="px-3 py-10 text-center text-slate-500">
                                    {q ? "No events found matching your search." : "No events available."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
