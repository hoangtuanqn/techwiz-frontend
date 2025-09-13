"use client";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal, Users, CheckCircle, Clock, Calendar, MapPin, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { buildLaravelFilterQuery } from "~/utils/helpers";
import { PaginationNav } from "~/components/Pagination";
import { EventCardSkeleton } from "~/app/events/_components/EventitemSkeleton";
import { formatter } from "~/utils/format";
import userApi from "~/apiRequest/user/user";

const isPastEvent = (endDate: string) => {
    return new Date(endDate) < new Date();
};

const isEventStarted = (startDate: string) => {
    return new Date(startDate) <= new Date();
};

const fields = ["search", "category", "status", "page"] as const;

const EventList = () => {
    const { search, category, status, page } = useGetSearchQuery(fields);
    const pct = (booked: number, total: number) => (total ? Math.min(100, Math.round((booked / total) * 100)) : 0);
    const barColor = (p: number) => (p > 95 ? "bg-red-500" : p > 60 ? "bg-amber-500" : "bg-emerald-500");

    const { data: events, isLoading } = useQuery({
        queryKey: ["registered-events", { search, category, status, page }],
        queryFn: async () => {
            const response = await userApi.getRegisteredEvents(
                +page || 1,
                9,
                search,
                "",
                buildLaravelFilterQuery({ category, status: status ? status : "available" }),
            );
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const getEventStatus = (event: any) => {
        const eventEnded = isPastEvent(event.end_event);
        const eventStarted = isEventStarted(event.start_event);
        const isCheckedIn = event.registrations?.checked_in === 1;

        if (eventEnded) {
            return {
                label: isCheckedIn ? "Attended" : "Missed",
                color: isCheckedIn ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
                icon: isCheckedIn ? UserCheck : UserX,
            };
        } else if (eventStarted) {
            return {
                label: isCheckedIn ? "Checked In" : "Not Checked In",
                color: isCheckedIn ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700",
                icon: isCheckedIn ? UserCheck : UserX,
            };
        } else {
            return {
                label: "Upcoming",
                color: "bg-cyan-100 text-cyan-700",
                icon: Clock,
            };
        }
    };

    return (
        <>
            {/* Count */}
            <span className="mb-4 block text-sm text-slate-500">
                {events ? `${events.total} registered events found` : "Loading your events..."}
            </span>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    <>
                        {[...Array(9)].map((_, index) => (
                            <EventCardSkeleton key={index} />
                        ))}
                    </>
                ) : (
                    <>
                        {events?.data.map((ev) => {
                            const p = pct(ev.booked_count, ev.seating.total_seats);
                            const eventStatus = getEventStatus(ev);
                            const StatusIcon = eventStatus.icon;
                            const isCheckedIn = ev.registrations?.checked_in === 1;

                            return (
                                <Link
                                    key={ev.id}
                                    href={`/events/${ev.id}`}
                                    className="group ring-opacity-50 relative overflow-hidden rounded-2xl border border-emerald-300 bg-white shadow-sm ring-2 ring-emerald-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {/* Registration Badge */}
                                    <div className="absolute top-3 right-3 z-10">
                                        <div className="flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-1 text-xs font-semibold text-white shadow-lg">
                                            <CheckCircle className="h-3 w-3" />
                                            Registered
                                        </div>
                                    </div>

                                    {/* Check-in Status Badge */}
                                    <div className="absolute top-3 left-3 z-10">
                                        <div
                                            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold shadow-lg ${eventStatus.color}`}
                                        >
                                            <StatusIcon className="h-3 w-3" />
                                            {eventStatus.label}
                                        </div>
                                    </div>

                                    <Image
                                        src={ev.thumbnail}
                                        alt={ev.title}
                                        width={400}
                                        height={160}
                                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    <div className="p-4">
                                        <h3 className="mb-2 font-semibold text-emerald-700 transition-colors group-hover:text-emerald-600">
                                            ✓ {ev.title}
                                        </h3>

                                        {/* Event Details */}
                                        <div className="mb-3 space-y-2 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 flex-shrink-0 text-cyan-600" />
                                                <span>
                                                    {new Date(ev.start_event).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 flex-shrink-0 text-cyan-600" />
                                                <span>
                                                    {new Date(ev.start_event).toLocaleTimeString("en-US", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 flex-shrink-0 text-cyan-600" />
                                                <span className="truncate">{ev.venue}</span>
                                            </div>
                                        </div>

                                        {/* Registration Details */}
                                        {ev.registrations && (
                                            <div className="mb-3 rounded-lg bg-slate-50 p-2">
                                                <div className="space-y-1 text-xs text-slate-600">
                                                    <div className="flex justify-between">
                                                        <span>Seat Number:</span>
                                                        <span className="font-medium">
                                                            {ev.registrations.seat_no
                                                                ? `#${ev.registrations.seat_no}`
                                                                : "Not assigned"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Registered:</span>
                                                        <span className="font-medium">
                                                            {new Date(
                                                                ev.registrations.registered_on,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    {isCheckedIn && ev.registrations.checked_in_at && (
                                                        <div className="flex justify-between">
                                                            <span>Checked in:</span>
                                                            <span className="font-medium text-green-600">
                                                                {new Date(
                                                                    ev.registrations.checked_in_at,
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Booking Progress */}
                                        <div className="mb-3">
                                            <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
                                                <span className="flex items-center gap-1">
                                                    <Users className="h-4 w-4 text-cyan-600" />
                                                    {ev.booked_count}/{ev.seating.total_seats} booked
                                                </span>
                                                <span className="font-medium">{Math.max(0, 100 - p)}% available</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-200">
                                                <div
                                                    className={`h-2 rounded-full ${barColor(p)} transition-all duration-300`}
                                                    style={{ width: `${p}%` }}
                                                />
                                            </div>
                                        </div>

                                        <p className="mb-3 line-clamp-2 text-sm text-slate-600">{ev.description}</p>

                                        <div className="mb-3 flex items-center justify-between text-sm">
                                            <span className="text-slate-500">{formatter.capitalize(ev.category)}</span>
                                            <span className="text-slate-500">
                                                by {ev.organizer?.full_name || "Organizer"}
                                            </span>
                                        </div>

                                        {/* Action Button */}
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-1 text-sm text-[#06b6d4] hover:underline">
                                                View Details <SlidersHorizontal className="h-3 w-3" />
                                            </span>

                                            {/* Status Indicator */}
                                            <div
                                                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${eventStatus.color}`}
                                            >
                                                <StatusIcon className="h-3 w-3" />
                                                {eventStatus.label}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </>
                )}
            </div>

            {/* No Events Message */}
            {!isLoading && events?.data.length === 0 && (
                <div className="py-16 text-center">
                    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                            <CheckCircle className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-slate-800">No Registered Events</h3>
                        <p className="mb-6 text-slate-500">
                            You haven&apos;t registered for any events yet. Start exploring events to join!
                        </p>
                        <Link
                            href="/events"
                            className="inline-flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Browse Events
                            <SlidersHorizontal className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            )}

            {events && events.total > 9 && !isLoading && (
                <PaginationNav totalPages={events?.last_page ?? 9} basePath="/profile/my-events" />
            )}
        </>
    );
};

export default EventList;
