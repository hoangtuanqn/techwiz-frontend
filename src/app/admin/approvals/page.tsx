"use client";

import React from "react";
import Link from "next/link";
import {
    CheckCircle2,
    Clock4,
    ArrowRight,
    ListChecks,
    TrendingUp,
    Users,
    Calendar,
    MapPin,
    User,
    AlertTriangle,
    BarChart3,
} from "lucide-react";
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
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Event Manager Center</h1>
                        <p className="mt-2 text-slate-600">Review and manage event approval requests efficiently</p>
                        <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                                <BarChart3 className="h-4 w-4" />
                                Total Events: {(pendingEvents?.total || 0) + (approvedEvents?.total || 0)}
                            </span>
                            <span className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4" />
                                Active Management
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/admin/approvals/pending"
                            className="group relative inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 transition-all hover:border-amber-300 hover:bg-amber-100"
                        >
                            <Clock4 className="h-4 w-4" />
                            <div className="flex flex-col items-start">
                                <span>Pending Review</span>
                                <span className="text-xs text-amber-600">
                                    {pendingEvents?.total || 0} events waiting
                                </span>
                            </div>
                            {(pendingEvents?.total || 0) > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                                    {pendingEvents?.total}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/admin/approvals/approved"
                            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 transition-all hover:border-emerald-300 hover:bg-emerald-100"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            <div className="flex flex-col items-start">
                                <span>Approved Events</span>
                                <span className="text-xs text-emerald-600">
                                    {approvedEvents?.total || 0} events active
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Enhanced Stats Dashboard */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-amber-700">Pending Review</p>
                            <p className="text-3xl font-bold text-amber-900">{pendingEvents?.total || 0}</p>
                            <p className="mt-1 text-xs text-amber-600">Awaiting approval</p>
                        </div>
                        <div className="rounded-full bg-amber-200 p-3">
                            <Clock4 className="h-6 w-6 text-amber-700" />
                        </div>
                    </div>
                    {(pendingEvents?.total || 0) > 0 && (
                        <div className="mt-3 flex items-center gap-1 text-xs text-amber-700">
                            <AlertTriangle className="h-3 w-3" />
                            Requires attention
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-emerald-700">Approved Events</p>
                            <p className="text-3xl font-bold text-emerald-900">{approvedEvents?.total || 0}</p>
                            <p className="mt-1 text-xs text-emerald-600">Ready to go live</p>
                        </div>
                        <div className="rounded-full bg-emerald-200 p-3">
                            <CheckCircle2 className="h-6 w-6 text-emerald-700" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-700">Total Events</p>
                            <p className="text-3xl font-bold text-blue-900">
                                {(pendingEvents?.total || 0) + (approvedEvents?.total || 0)}
                            </p>
                            <p className="mt-1 text-xs text-blue-600">All submissions</p>
                        </div>
                        <div className="rounded-full bg-blue-200 p-3">
                            <BarChart3 className="h-6 w-6 text-blue-700" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-purple-700">Approval Rate</p>
                            <p className="text-3xl font-bold text-purple-900">
                                {(pendingEvents?.total || 0) + (approvedEvents?.total || 0) > 0
                                    ? Math.round(
                                          ((approvedEvents?.total || 0) /
                                              ((pendingEvents?.total || 0) + (approvedEvents?.total || 0))) *
                                              100,
                                      )
                                    : 0}
                                %
                            </p>
                            <p className="mt-1 text-xs text-purple-600">Success rate</p>
                        </div>
                        <div className="rounded-full bg-purple-200 p-3">
                            <TrendingUp className="h-6 w-6 text-purple-700" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick previews */}
            <div className="space-y-6">
                {/* Enhanced Pending Events */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-800">
                            <Clock4 className="h-5 w-5" /> Pending Events
                        </h2>
                        <Link
                            href="/admin/approvals/pending"
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-200"
                        >
                            View all {pendingEvents?.total || 0} <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Enhanced Grid Layout */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {pendingEvents?.data?.slice(0, 6).map((event) => {
                            const eventDate = new Date(event.start_event);
                            const daysFromNow = Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                            const isUrgent = daysFromNow <= 7 && daysFromNow > 0;
                            const isPast = daysFromNow < 0;

                            return (
                                <div
                                    key={event.id}
                                    className={`group relative overflow-hidden rounded-xl border bg-white p-4 transition-all duration-200 hover:shadow-md ${
                                        isUrgent
                                            ? "border-orange-200 bg-orange-50/30"
                                            : isPast
                                              ? "border-red-200 bg-red-50/30"
                                              : "border-slate-200"
                                    } hover:border-slate-300`}
                                >
                                    {/* Urgency indicator */}
                                    {isUrgent && (
                                        <div className="absolute top-2 right-2">
                                            <span className="flex h-2 w-2">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                                                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                                            </span>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="line-clamp-2 font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                                                {event.title}
                                            </h3>
                                            <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                                                {event.description}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar className="h-4 w-4 text-slate-400" />
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {formatter.date(event.start_event, true)}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {isPast
                                                            ? "Event has passed"
                                                            : daysFromNow === 0
                                                              ? "Today"
                                                              : daysFromNow === 1
                                                                ? "Tomorrow"
                                                                : daysFromNow > 0
                                                                  ? `In ${daysFromNow} days`
                                                                  : ""}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <MapPin className="h-4 w-4 text-slate-400" />
                                                <span className="truncate">{event.venue}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <User className="h-4 w-4 text-slate-400" />
                                                <span>Organizer {event.organizer.full_name}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        isUrgent
                                                            ? "bg-orange-100 text-orange-800"
                                                            : isPast
                                                              ? "bg-red-100 text-red-800"
                                                              : "bg-amber-100 text-amber-800"
                                                    }`}
                                                >
                                                    {isUrgent ? "⚡ Urgent" : isPast ? "⏰ Past" : "⏳ Pending"}
                                                </span>
                                                {isUrgent && (
                                                    <span className="text-xs font-medium text-orange-600">
                                                        Review soon!
                                                    </span>
                                                )}
                                            </div>
                                            <Link
                                                href={`/admin/events/view/${event.id}`}
                                                className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                                            >
                                                Review →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) || (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                                <div className="mb-4 rounded-full bg-slate-100 p-4">
                                    <Clock4 className="h-8 w-8 text-slate-400" />
                                </div>
                                <h3 className="mb-1 font-medium text-slate-900">No pending events</h3>
                                <p className="text-sm text-slate-500">All events have been reviewed</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Approved Events */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-800">
                            <ListChecks className="h-5 w-5" /> Approved Events
                        </h2>
                        <Link
                            href="/admin/approvals/approved"
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-200"
                        >
                            View all {approvedEvents?.total || 0} <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Enhanced Grid Layout */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {approvedEvents?.data?.slice(0, 6).map((event) => {
                            const eventDate = new Date(event.start_event);
                            const daysFromNow = Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                            const isUpcoming = daysFromNow <= 7 && daysFromNow > 0;
                            const isToday = daysFromNow === 0;
                            const bookedPercentage = event.seating
                                ? Math.round((event.booked_count / event.seating.total_seats) * 100)
                                : 0;

                            return (
                                <div
                                    key={event.id}
                                    className="group relative overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50/30 p-4 transition-all duration-200 hover:border-emerald-300 hover:shadow-md"
                                >
                                    {/* Success indicator */}
                                    <div className="absolute top-2 right-2">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="line-clamp-2 pr-6 font-semibold text-slate-900 transition-colors group-hover:text-emerald-600">
                                                {event.title}
                                            </h3>
                                            <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                                                {event.description}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar className="h-4 w-4 text-slate-400" />
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {formatter.date(event.start_event, true)}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {isToday
                                                            ? "🎉 Today!"
                                                            : isUpcoming
                                                              ? `� In ${daysFromNow} days`
                                                              : daysFromNow < 0
                                                                ? "✅ Completed"
                                                                : `📆 ${daysFromNow} days to go`}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <MapPin className="h-4 w-4 text-slate-400" />
                                                <span className="truncate">{event.venue}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <User className="h-4 w-4 text-slate-400" />
                                                <span>Organizer {event.organizer.full_name}</span>
                                            </div>

                                            {event.seating && (
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        <Users className="h-4 w-4 text-slate-400" />
                                                        <span>
                                                            {event.booked_count}/{event.seating.total_seats} registered
                                                        </span>
                                                    </div>
                                                    {/* Mini progress bar */}
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                                                            <div
                                                                className={`h-full transition-all duration-300 ${
                                                                    bookedPercentage >= 80
                                                                        ? "bg-emerald-500"
                                                                        : bookedPercentage >= 50
                                                                          ? "bg-blue-500"
                                                                          : "bg-gray-400"
                                                                }`}
                                                                style={{ width: `${Math.min(bookedPercentage, 100)}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-medium text-slate-500">
                                                            {bookedPercentage}%
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between border-t border-emerald-100 pt-2">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
                                                    ✅ Approved
                                                </span>
                                                {isToday && (
                                                    <span className="animate-pulse text-xs font-medium text-emerald-600">
                                                        Live today!
                                                    </span>
                                                )}
                                                {bookedPercentage >= 90 && (
                                                    <span className="text-xs font-medium text-orange-600">
                                                        🔥 Almost full
                                                    </span>
                                                )}
                                            </div>
                                            <Link
                                                href={`/admin/events/${event.id}`}
                                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
                                            >
                                                View →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) || (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                                <div className="mb-4 rounded-full bg-emerald-100 p-4">
                                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                                </div>
                                <h3 className="mb-1 font-medium text-slate-900">No approved events</h3>
                                <p className="text-sm text-slate-500">Approved events will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
