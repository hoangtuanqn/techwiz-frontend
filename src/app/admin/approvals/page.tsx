"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock4, ArrowRight, ListChecks } from "lucide-react";
import EventTable from "../_components/EventTable";
import eventApi from "~/apiRequest/event";
import { useQuery } from "@tanstack/react-query";
import { EventListResponseType } from "~/types/schemaZod/event.schema";

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
                            <Clock4 className="h-4 w-4" /> Pending ({approvedEvents?.total || 0})
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
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Pending */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                            <Clock4 className="h-4 w-4" /> Pending (top 5)
                        </h2>
                        <Link
                            href="/admin/approvals/pending"
                            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800"
                        >
                            View all <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <EventTable
                        data={pendingEvents as EventListResponseType["data"]}
                        actionLabel="Review"
                        actionLinkPrefix="/admin/events"
                        showCheckbox
                        minTableWidth={900}
                    />
                </div>

                {/* Approved */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                            <ListChecks className="h-4 w-4" /> Approved (top 5)
                        </h2>
                        <Link
                            href="/admin/approvals/approved"
                            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800"
                        >
                            View all <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <EventTable
                        data={approvedEvents as EventListResponseType["data"]}
                        actionLabel="View"
                        actionLinkPrefix="/admin/events"
                        minTableWidth={900}
                    />
                </div>
            </div>
        </div>
    );
}
