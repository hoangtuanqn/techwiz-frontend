"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock4, ArrowRight, ListChecks } from "lucide-react";
import eventApi from "~/apiRequest/event";
import { useQuery } from "@tanstack/react-query";
import { formatter } from "~/utils/format";

export default function ApprovalsIndexPage() {
    const { data: approvedEvents } = useQuery({
        queryKey: ["approvedEvents"],
        queryFn: async () => {
            const response = await eventApi.getEvent(1, 5, "", "", "filter[status]=approved");
            return response.data.data;
        },
    });
    const { data: pendingEvents } = useQuery({
        queryKey: ["pendingEvents"],
        queryFn: async () => {
            const response = await eventApi.getEvent(1, 5, "", "", "filter[status]=pending");
            return response.data.data;
        },
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Event Management</h1>
                        <p className="mt-1 text-sm text-slate-600">Manage event approval requests</p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href="/admin/approvals/pending"
                            className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700 hover:bg-amber-100"
                        >
                            <Clock4 className="h-4 w-4" /> Pending ({pendingEvents?.total || 0})
                        </Link>
                        <Link
                            href="/admin/approvals/approved"
                            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-100"
                        >
                            <CheckCircle2 className="h-4 w-4" /> Approved ({approvedEvents?.total || 0})
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm text-amber-700">Pending</p>
                    <p className="text-2xl font-bold text-amber-800">{pendingEvents?.total || 0}</p>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-sm text-emerald-700">Approved</p>
                    <p className="text-2xl font-bold text-emerald-800">{approvedEvents?.total || 0}</p>
                </div>
            </div>

            {/* Quick previews */}
            <div className="space-y-6">
                {/* Pending */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                            <Clock4 className="h-4 w-4" /> Pending Events
                        </h2>
                        <Link
                            href="/admin/approvals/pending"
                            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800"
                        >
                            View all ({pendingEvents?.total || 0}) <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Compact Grid Layout */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {pendingEvents?.data?.slice(0, 6).map((event) => (
                            <div key={event.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                                <div className="space-y-2">
                                    <h3 className="line-clamp-1 text-sm font-medium text-gray-900">{event.title}</h3>
                                    <div className="space-y-1 text-xs text-gray-600">
                                        <p>📅 {formatter.date(event.start_event, true)}</p>
                                        <p>📍 {event.venue}</p>
                                        <p>👤 ID: {event.organizer_id}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                                            Pending
                                        </span>
                                        <Link
                                            href={`/admin/events/${event.id}`}
                                            className="text-xs text-blue-600 hover:text-blue-800"
                                        >
                                            Review →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )) || (
                            <div className="col-span-full py-8 text-center text-sm text-gray-500">
                                No pending events
                            </div>
                        )}
                    </div>
                </div>

                {/* Approved */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                            <ListChecks className="h-4 w-4" /> Approved Events
                        </h2>
                        <Link
                            href="/admin/approvals/approved"
                            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800"
                        >
                            View all ({approvedEvents?.total || 0}) <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Compact Grid Layout */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {approvedEvents?.data?.slice(0, 6).map((event) => (
                            <div key={event.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                                <div className="space-y-2">
                                    <h3 className="line-clamp-1 text-sm font-medium text-gray-900">{event.title}</h3>
                                    <div className="space-y-1 text-xs text-gray-600">
                                        <p>📅 {formatter.date(event.start_event, true)}</p>
                                        <p>📍 {event.venue}</p>
                                        <p>👤 ID: {event.organizer_id}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                            Approved
                                        </span>
                                        <Link
                                            href={`/admin/events/${event.id}`}
                                            className="text-xs text-blue-600 hover:text-blue-800"
                                        >
                                            View →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )) || (
                            <div className="col-span-full py-8 text-center text-sm text-gray-500">
                                No approved events
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
