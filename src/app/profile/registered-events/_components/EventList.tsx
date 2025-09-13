"use client";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal, CheckCircle, Clock, Calendar, MapPin, UserCheck, UserX } from "lucide-react";
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

    const { data: events, isLoading } = useQuery({
        queryKey: ["registered-events", { search, category, status, page }],
        queryFn: async () => {
            const response = await userApi.getRegisteredEvents(
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

    // Filter events based on status after fetching
    const filteredEvents = React.useMemo(() => {
        if (!events?.data || !status) return events?.data || [];

        return events.data.filter((event) => {
            const eventEnded = isPastEvent(event.end_event);
            const eventStarted = isEventStarted(event.start_event);
            const isCheckedIn = event.user_registration?.checked_in === 1;

            switch (status) {
                case "upcoming":
                    return !eventStarted;
                case "attended":
                    return eventEnded && isCheckedIn;
                case "missed":
                    return eventEnded && !isCheckedIn;
                case "checked_in":
                    return eventStarted && !eventEnded && isCheckedIn;
                case "not_checked_in":
                    return eventStarted && !eventEnded && !isCheckedIn;
                default:
                    return true;
            }
        });
    }, [events?.data, status]);

    const getEventStatus = (event: any) => {
        const eventEnded = isPastEvent(event.end_event);
        const eventStarted = isEventStarted(event.start_event);
        const isCheckedIn = event.user_registration?.checked_in === 1;

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
            {/* Event Count */}
            <div className="mb-6 flex items-center justify-between">
                <span className="text-base font-medium text-slate-600">
                    {events ? (
                        <>
                            <span className="font-bold text-emerald-600">{filteredEvents.length}</span> registered
                            events found
                        </>
                    ) : (
                        "Loading your events..."
                    )}
                </span>
                {events && events.total > 9 && !isLoading && (
                    <PaginationNav totalPages={events?.last_page ?? 9} basePath="/profile/registered-events" />
                )}
            </div>

            {/* Event Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    Array.from({ length: 9 }).map((_, idx) => <EventCardSkeleton key={idx} />)
                ) : filteredEvents.length > 0 ? (
                    filteredEvents.map((ev) => {
                        const eventStatus = getEventStatus(ev);
                        const StatusIcon = eventStatus.icon;
                        const isCheckedIn = ev.user_registration?.checked_in === 1;

                        return (
                            <Link
                                key={ev.id}
                                href={`/events/${ev.id}`}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* Status Badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span
                                        className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow ${eventStatus.color}`}
                                    >
                                        <StatusIcon className="h-4 w-4" />
                                        {eventStatus.label}
                                    </span>
                                </div>

                                <Image
                                    src={ev.thumbnail}
                                    alt={ev.title}
                                    width={400}
                                    height={160}
                                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                <div className="flex flex-1 flex-col justify-between p-5">
                                    <div>
                                        <h3
                                            className={`mb-2 font-semibold text-slate-800 transition-colors group-hover:text-[#06b6d4]`}
                                        >
                                            {ev.title}
                                        </h3>

                                        {/* Event Details */}
                                        <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-cyan-600" />
                                                <span>
                                                    {new Date(ev.start_event).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-cyan-600" />
                                                <span>
                                                    {new Date(ev.start_event).toLocaleTimeString("en-US", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-cyan-600" />
                                                <span className="truncate">{ev.venue}</span>
                                            </div>
                                        </div>

                                        {/* Registration Details */}
                                        {ev.user_registration && (
                                            <div className="mb-3 rounded-lg bg-slate-50 p-2">
                                                <div className="space-y-2 text-xs text-slate-600">
                                                    <div className="flex justify-between">
                                                        <span>Registered:</span>
                                                        <span className="font-medium">
                                                            {new Date(
                                                                ev.user_registration.registered_on,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    {isCheckedIn && ev.user_registration.checked_in_at && (
                                                        <div className="flex justify-between">
                                                            <span>Checked in:</span>
                                                            <span className="font-medium text-green-600">
                                                                {new Date(
                                                                    ev.user_registration.checked_in_at,
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <p className="mb-3 line-clamp-2 text-sm text-slate-600">{ev.description}</p>
                                    </div>

                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-xs text-slate-500">
                                            {formatter.capitalize(ev.category)}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            by {ev.organizer?.full_name || "Organizer"}
                                        </span>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-sm text-cyan-600 hover:underline">
                                            View Details <SlidersHorizontal className="h-4 w-4" />
                                        </span>
                                        <span
                                            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${eventStatus.color}`}
                                        >
                                            <StatusIcon className="h-3 w-3" />
                                            {eventStatus.label}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    // No Events Message
                    <div className="col-span-full py-16 text-center">
                        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <CheckCircle className="h-8 w-8 text-slate-400" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-slate-800">
                                {status ? "No Events Found" : "No Registered Events"}
                            </h3>
                            <p className="mb-6 text-slate-500">
                                {status
                                    ? `No events found matching the "${status}" status filter.`
                                    : "You haven't registered for any events yet. Start exploring events to join!"}
                            </p>
                            <Link
                                href="/events"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                Browse Events
                                <SlidersHorizontal className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default EventList;
