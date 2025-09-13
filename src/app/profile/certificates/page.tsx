"use client";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Award, Download, Building, Calendar, Search, Clock, CheckCircle, MapPin, Users, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { buildLaravelFilterQuery } from "~/utils/helpers";
import { PaginationNav } from "~/components/Pagination";
import { EventCardSkeleton } from "~/app/events/_components/EventitemSkeleton";
import { formatter } from "~/utils/format";
import userApi from "~/apiRequest/user/user";

const fields = ["search", "category", "status", "page"] as const;

const isPastEvent = (endDate: string) => {
    return new Date(endDate) < new Date();
};

const isEventStarted = (startDate: string) => {
    return new Date(startDate) <= new Date();
};

export default function CertificateEventsPage() {
    const { search, category, status, page } = useGetSearchQuery(fields);
    const [statusFilter, setStatusFilter] = useState("all");

    const { data: events, isLoading } = useQuery({
        queryKey: ["certificate-events", { search, category, status, page }],
        queryFn: async () => {
            const response = await userApi.getEventsWithCertificate(
                +page || 1,
                9,
                search,
                "",
                buildLaravelFilterQuery({ category }),
            );
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Filter events based on certificate status
    const filteredEvents = useMemo(() => {
        if (!events?.data || !statusFilter || statusFilter === "all") return events?.data || [];

        return events.data.filter((event) => {
            const eventEnded = isPastEvent(event.end_event);
            const eventStarted = isEventStarted(event.start_event);
            const isCheckedIn = event.user_registration?.checked_in === 1;
            const hasAttended = eventEnded && isCheckedIn;

            switch (statusFilter) {
                case "certificate_available":
                    return hasAttended;
                case "certificate_pending":
                    return eventStarted && !eventEnded && isCheckedIn;
                case "not_eligible":
                    return eventEnded && !isCheckedIn;
                case "upcoming":
                    return !eventStarted;
                default:
                    return true;
            }
        });
    }, [events?.data, statusFilter]);

    const getCertificateStatus = (event: any) => {
        const eventEnded = isPastEvent(event.end_event);
        const eventStarted = isEventStarted(event.start_event);
        const isCheckedIn = event.user_registration?.checked_in === 1;

        if (eventEnded && isCheckedIn) {
            return {
                label: "Certificate Available",
                color: "bg-green-100 text-green-700 border-green-200",
                icon: Award,
                canDownload: true,
            };
        } else if (eventStarted && !eventEnded && isCheckedIn) {
            return {
                label: "Certificate Pending",
                color: "bg-orange-100 text-orange-700 border-orange-200",
                icon: Clock,
                canDownload: false,
            };
        } else if (eventEnded && !isCheckedIn) {
            return {
                label: "Not Eligible",
                color: "bg-red-100 text-red-700 border-red-200",
                icon: Building,
                canDownload: false,
            };
        } else {
            return {
                label: "Event Upcoming",
                color: "bg-blue-100 text-blue-700 border-blue-200",
                icon: Calendar,
                canDownload: false,
            };
        }
    };

    // Statistics
    const certificateStats = useMemo(() => {
        if (!events?.data) return { available: 0, pending: 0, notEligible: 0, upcoming: 0 };

        return events.data.reduce(
            (acc, event) => {
                const status = getCertificateStatus(event);
                if (status.label === "Certificate Available") acc.available++;
                else if (status.label === "Certificate Pending") acc.pending++;
                else if (status.label === "Not Eligible") acc.notEligible++;
                else if (status.label === "Event Upcoming") acc.upcoming++;
                return acc;
            },
            { available: 0, pending: 0, notEligible: 0, upcoming: 0 },
        );
    }, [events?.data]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
            {/* Animated Background Elements */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 opacity-20 blur-3xl" />
                <div className="absolute top-1/2 -left-10 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-amber-400 to-orange-400 opacity-20 blur-3xl delay-1000" />
                <div className="absolute right-1/4 bottom-20 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 opacity-20 blur-2xl delay-2000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/70 px-6 py-3 shadow-lg backdrop-blur-sm">
                        <Trophy className="h-8 w-8 text-amber-500" />
                        <h1 className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent">
                            Certificate Events
                        </h1>
                    </div>
                    <p className="mx-auto max-w-2xl text-lg text-slate-600">
                        Manage your participated events and download available certificates
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                                <Award className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{certificateStats.available}</p>
                                <p className="text-slate-600">Available</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-3">
                                <Clock className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{certificateStats.pending}</p>
                                <p className="text-slate-600">Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 p-3">
                                <Building className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{certificateStats.notEligible}</p>
                                <p className="text-slate-600">Not Eligible</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                                <Calendar className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{certificateStats.upcoming}</p>
                                <p className="text-slate-600">Upcoming</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter and Search Controls */}
                <div className="mb-8 rounded-2xl border border-white/20 bg-white/60 p-6 shadow-lg backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
                        {/* Search */}
                        <div className="relative w-full lg:max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={search || ""}
                                readOnly
                                className="w-full rounded-xl border-0 bg-white/80 py-3 pr-4 pl-12 placeholder-slate-400 shadow-sm backdrop-blur-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex flex-wrap gap-3">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="rounded-xl border-0 bg-white/80 px-4 py-3 text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="all">All Events</option>
                                <option value="certificate_available">Certificate Available</option>
                                <option value="certificate_pending">Certificate Pending</option>
                                <option value="not_eligible">Not Eligible</option>
                                <option value="upcoming">Upcoming Events</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {statusFilter !== "all" && (
                        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
                            <span className="text-sm font-medium text-slate-700">Active filter:</span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                                Status: {statusFilter.replace("_", " ")}
                            </span>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-slate-600">
                        {events ? (
                            <>
                                <span className="font-bold text-emerald-600">{filteredEvents.length}</span> events found
                            </>
                        ) : (
                            "Loading events..."
                        )}
                    </p>
                </div>

                {/* Event Grid */}
                {isLoading ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 9 }).map((_, idx) => (
                            <EventCardSkeleton key={idx} />
                        ))}
                    </div>
                ) : filteredEvents.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.map((event, index) => {
                            const certificateStatus = getCertificateStatus(event);
                            const StatusIcon = certificateStatus.icon;

                            return (
                                <div
                                    key={event.id}
                                    className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Status Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span
                                            className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${certificateStatus.color} backdrop-blur-sm`}
                                        >
                                            <StatusIcon className="h-3 w-3" />
                                            {certificateStatus.label}
                                        </span>
                                    </div>

                                    {/* Event Image */}
                                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                        <Image
                                            src={event.thumbnail}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                    </div>

                                    {/* Event Content */}
                                    <div className="p-6">
                                        <h3 className="mb-3 text-lg font-bold text-slate-800 transition-colors duration-300 group-hover:text-cyan-600">
                                            {event.title}
                                        </h3>

                                        {/* Event Details */}
                                        <div className="mb-3 flex items-center justify-between space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar className="h-4 w-4 text-cyan-600" />
                                                <span>
                                                    {new Date(event.start_event).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <MapPin className="h-4 w-4 text-cyan-600" />
                                                <span className="truncate">{event.venue}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Users className="h-4 w-4 text-cyan-600" />
                                                <span>
                                                    {event.booked_count}/{event.seating?.total_seats} attendees
                                                </span>
                                            </div>
                                        </div>

                                        {/* Registration Info */}
                                        {event.user_registration && (
                                            <div className="mb-4 rounded-lg bg-slate-50 p-3">
                                                <div className="space-y-2 text-xs text-slate-600">
                                                    <div className="flex justify-between">
                                                        <span>Registered:</span>
                                                        <span className="font-medium">
                                                            {new Date(
                                                                event.user_registration.registered_on,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    {event.user_registration.checked_in === 1 &&
                                                        event.user_registration.checked_in_at && (
                                                            <div className="flex justify-between">
                                                                <span>Attended:</span>
                                                                <span className="font-medium text-green-600">
                                                                    {new Date(
                                                                        event.user_registration.checked_in_at,
                                                                    ).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        )}

                                        <p className="mb-4 line-clamp-2 text-sm text-slate-600">{event.description}</p>

                                        {/* Actions */}
                                        <div className="space-y-3">
                                            {certificateStatus.canDownload ? (
                                                <button className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-emerald-600 hover:to-cyan-600 hover:shadow-lg">
                                                    <Download className="h-4 w-4" />
                                                    Download Certificate
                                                </button>
                                            ) : (
                                                <div className="text-center">
                                                    <span
                                                        className={`inline-flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium ${certificateStatus.color}`}
                                                    >
                                                        <StatusIcon className="h-4 w-4" />
                                                        {certificateStatus.label}
                                                    </span>
                                                </div>
                                            )}

                                            <Link
                                                href={`/events/${event.id}`}
                                                className="block w-full rounded-xl border border-slate-300 px-4 py-2 text-center text-sm text-slate-600 transition-all duration-300 hover:bg-slate-50"
                                            >
                                                View Event Details
                                            </Link>
                                        </div>

                                        {/* Category */}
                                        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                                            <span>{formatter.capitalize(event.category)}</span>
                                            <span>by {event.organizer?.full_name || "Organizer"}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-16 text-center">
                        <div className="mx-auto max-w-md rounded-2xl border border-white/20 bg-white/70 p-12 shadow-lg backdrop-blur-sm">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-slate-200 to-slate-300">
                                <Trophy className="h-10 w-10 text-slate-400" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-slate-800">No Certificate Events Found</h3>
                            <p className="mb-6 text-slate-500">
                                {statusFilter !== "all"
                                    ? `No events found with "${statusFilter.replace("_", " ")}" status.`
                                    : "You haven't participated in any events that offer certificates yet."}
                            </p>
                            <div className="space-y-3">
                                <Link
                                    href="/events"
                                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-emerald-600 hover:to-cyan-600"
                                >
                                    Browse Events
                                    <Calendar className="h-4 w-4" />
                                </Link>
                                {statusFilter !== "all" && (
                                    <button
                                        onClick={() => setStatusFilter("all")}
                                        className="ml-4 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-600 transition-all duration-300 hover:bg-slate-50"
                                    >
                                        Clear Filter
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {events && events.total > 9 && !isLoading && (
                    <div className="mt-12">
                        <PaginationNav totalPages={events?.last_page ?? 1} basePath="/profile/registered-events" />
                    </div>
                )}
            </div>
        </div>
    );
}
