"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Eye, CheckCircle, XCircle, Calendar, MapPin, Users, Clock } from "lucide-react";
import { EventListResponseType } from "~/types/schemaZod/event.schema";
import { formatter } from "~/utils/format";
import { PaginationNav } from "~/components/Pagination";

export default function EventTable({
    title = "",
    data,
    actionLabel: _actionLabel = "View",
    actionLinkPrefix = "/organizer/events",
    showCheckbox = false,
    showApprovalActions = false,
    onApprove,
    onReject,
}: {
    title?: string;
    data: EventListResponseType["data"];
    actionLabel?: string;
    actionLinkPrefix?: string;
    showCheckbox?: boolean;
    showApprovalActions?: boolean;
    onApprove?: (eventId: number) => void;
    onReject?: (eventId: number) => void;
}) {
    const [q, setQ] = useState("");
    const [perPage] = useState(12);
    const [page, _setPage] = useState(1);
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

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            pending: "bg-amber-100 text-amber-800 border-amber-200",
            approved: "bg-green-100 text-green-800 border-green-200",
            rejected: "bg-red-100 text-red-800 border-red-200",
            draft: "bg-gray-100 text-gray-800 border-gray-200",
        };

        return (
            <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                    statusStyles[status as keyof typeof statusStyles] || "border-gray-200 bg-gray-100 text-gray-800"
                }`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const _toggleAll = (checked: boolean) => setSelected(checked ? rows.map((r) => r.id) : []);
    const toggleOne = (id: number) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    const pages = Math.ceil(total / perPage) || 1;

    return (
        <div className="space-y-6">
            {/* Header & Search */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">{title || "Events"}</h2>
                        <p className="text-sm text-slate-600">
                            Showing <span className="font-medium">{rows.length}</span> of {total} events
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full max-w-md">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="block w-full rounded-lg border border-slate-300 py-2 pr-3 pl-10 text-sm placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Bulk Actions */}
                {showCheckbox && selected.length > 0 && (
                    <div className="mt-4 flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                        <span className="text-sm font-medium text-blue-900">{selected.length} event(s) selected</span>
                        {showApprovalActions && (
                            <div className="flex gap-2">
                                <button className="rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700">
                                    Approve Selected
                                </button>
                                <button className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700">
                                    Reject Selected
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Events Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rows.map((event) => (
                    <div
                        key={event.id}
                        className={`group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg ${
                            selected.includes(event.id) ? "border-blue-200 ring-2 ring-blue-500" : "border-slate-200"
                        }`}
                    >
                        {/* Header */}
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                {showCheckbox && (
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(event.id)}
                                        onChange={() => toggleOne(event.id)}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                )}
                                <span className="font-mono text-xs text-slate-500">#{event.id}</span>
                            </div>
                            {getStatusBadge(event.status)}
                        </div>

                        {/* Event Info */}
                        <div className="space-y-3">
                            <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                                {event.title}
                            </h3>

                            <p className="line-clamp-2 text-sm text-slate-600">{event.description}</p>

                            {/* Category */}
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                    {formatter.capitalize(event.category)}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatter.date(event.start_event)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {formatter.time(event.start_event)} - {formatter.time(event.end_event)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <MapPin className="h-4 w-4" />
                                    <span className="line-clamp-1">{event.venue}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Users className="h-4 w-4" />
                                    <span>
                                        {event.booked_count}
                                        {event.seating?.total_seats && ` / ${event.seating.total_seats}`} registered
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex items-center justify-between">
                            <Link
                                href={`/admin/events/view/${event.id}`}
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                <Eye className="h-4 w-4" />
                                View Details
                            </Link>

                            {showApprovalActions && event.status === "pending" && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onApprove?.(event.id)}
                                        className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => onReject?.(event.id)}
                                        className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                                    >
                                        <XCircle className="h-4 w-4" />
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {rows.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                        <Calendar className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-slate-900">No events found</h3>
                    <p className="text-slate-500">
                        {q ? "Try adjusting your search criteria." : "There are no events to display."}
                    </p>
                </div>
            )}

            {/* Pagination */}
            {pages > 1 && (
                <div className="flex justify-center">
                    <PaginationNav totalPages={pages} basePath={actionLinkPrefix} />
                </div>
            )}
        </div>
    );
}
