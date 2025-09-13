"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, Clock4, ArrowRight, ListChecks, PlayCircle } from "lucide-react";
import EventTable from "../../admin/_components/EventTable";
import { DEMO_APPROVED, DEMO_PENDING } from "../../admin/_components/eventConstants";

export default function ApprovalsIndexPage() {
    const approvedCount = DEMO_APPROVED.length;
    const pendingCount = DEMO_PENDING.length;

    const miniApproved = useMemo(() => DEMO_APPROVED.slice(0, 5), []);
    const miniPending = useMemo(() => DEMO_PENDING.slice(0, 5), []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Approvals</h1>
                        <p className="mt-1 text-sm text-slate-600">Manage your events</p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href="/admin/approvals/pending"
                            className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700 hover:bg-amber-100"
                        >
                            <Clock4 className="h-4 w-4" /> Pending ({pendingCount})
                        </Link>
                        <Link
                            href="/admin/approvals/approved"
                            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-100"
                        >
                            <CheckCircle2 className="h-4 w-4" /> Approved ({approvedCount})
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm text-amber-700">Pending</p>
                    <p className="text-2xl font-bold text-amber-800">{pendingCount}</p>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-sm text-emerald-700">Approved</p>
                    <p className="text-2xl font-bold text-emerald-800">{approvedCount}</p>
                </div>
            </div>

            {/* Quick previews */}
            <div className="grid gap-6 lg:grid-cols-3">
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
                        data={miniPending}
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
                        data={miniApproved}
                        actionLabel="View"
                        actionLinkPrefix="/admin/events"
                        minTableWidth={900}
                    />
                </div>
            </div>
        </div>
    );
}