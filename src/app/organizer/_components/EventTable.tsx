"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Search, Eye } from "lucide-react";
import { EventListResponseType } from "~/types/schemaZod/event.schema";
import { PaginationNav } from "~/components/Pagination";
import { Input } from "~/components/ui/input";
import useSearch from "~/hooks/useSearch";

export default function EventTable({
    title = "",
    data,
    actionLabel = "View",
    actionLinkPrefix = "/organizer/events",
    minTableWidth = 1200,
}: {
    title?: string;
    data: EventListResponseType["data"];
    actionLabel?: string;
    actionLinkPrefix?: string;
    minTableWidth?: number;
}) {
    const events = useMemo(() => data?.data || [], [data]);

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
    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / 20);

    const { keyword, setKeyword } = useSearch(actionLinkPrefix);

    return (
        <section className="rounded-2xl border border-slate-200 bg-white pb-4">
            {/* Header + search */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="flex items-center gap-3">
                    {title ? <h2 className="text-base font-semibold text-slate-800">{title}</h2> : null}
                    <div className="relative">
                        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search events…"
                            className="w-64 rounded-lg border border-slate-200 py-2 pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-cyan-200"
                        />
                    </div>
                </div>
                <div className="text-xs text-slate-500">
                    Showing <b className="mx-1">{events.length}</b> of {total}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-t border-slate-200 text-sm" style={{ minWidth: `${minTableWidth}px` }}>
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
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
                        {events.map((event) => (
                            <tr key={event.id} className="border-t border-slate-100 hover:bg-slate-50">
                                <td className="px-3 py-2 font-mono text-xs text-slate-600">#{event.id}</td>
                                <td className="px-3 py-2">
                                    <div className="flex flex-col items-start space-y-1">
                                        <div className="max-w-xs truncate font-medium text-slate-900">
                                            {event.title}
                                        </div>
                                        <div className="max-w-xs truncate text-xs text-slate-500">
                                            {event.description}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-2">
                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                        {event.category}
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
                                    {event.status === "approved" ? (
                                        <div className="flex items-center justify-center">
                                            <Link
                                                href={`/organizer/events/${event.id}`}
                                                className="rounded-lg border border-slate-200 px-2 py-1 text-xs transition-colors duration-200 hover:bg-slate-50"
                                            >
                                                <Eye className="mr-1 inline-block h-3.5 w-3.5" />
                                                {actionLabel}
                                            </Link>
                                        </div>
                                    ) : (
                                        <span>No Action</span>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {events.length === 0 && (
                            <tr>
                                <td colSpan={9} className="px-3 py-10 text-center text-slate-500">
                                    No events found matching your search
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <PaginationNav totalPages={totalPages} basePath={actionLinkPrefix} />
        </section>
    );
}
