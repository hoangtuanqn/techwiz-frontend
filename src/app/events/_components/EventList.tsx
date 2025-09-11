"use client";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import eventApi from "~/apiRequest/event";
import { EventCardSkeleton } from "./EventitemSkeleton";

const isAvailable = (endDate: string) => {
    return new Date(endDate) >= new Date();
};

const EventList = () => {
    const pct = (booked: number, total: number) => (total ? Math.min(100, Math.round((booked / total) * 100)) : 0);
    const barColor = (p: number) => (p > 95 ? "bg-red-500" : p > 60 ? "bg-amber-500" : "bg-emerald-500");

    const { data: events, isLoading } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const response = await eventApi.getEvent();
            return response.data.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
                <>
                    {[...Array(9)].map((_, index) => (
                        <EventCardSkeleton key={index} />
                    ))}
                </>
            ) : (
                <>
                    {events?.map((ev) => {
                        const p = pct(ev.booked_count, ev.seating.total_seats);
                        return (
                            <Link
                                key={ev.id}
                                href={`/events/${ev.id}`}
                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <img
                                    src={ev.thumbnail}
                                    alt={ev.title}
                                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-slate-800 group-hover:text-[#06b6d4]">
                                        {ev.title}
                                    </h3>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between text-xs text-slate-600">
                                            <span className="mb-3 flex items-center gap-1">
                                                <Users className="h-4 w-4 text-cyan-600" />
                                                {ev.booked_count}/{ev.seating.total_seats} booked
                                            </span>
                                            <span className="font-medium">{Math.max(0, 100 - p)}% left</span>
                                        </div>
                                        <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                                            <div
                                                className={`h-2 rounded-full ${barColor(p)}`}
                                                style={{ width: `${p}%` }}
                                            />
                                        </div>
                                    </div>
                                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">{ev.description}</p>
                                    <div className="mt-3 flex items-center justify-between text-sm">
                                        <span className="text-slate-500">{ev.category}</span>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                isAvailable(ev.end_time)
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {isAvailable(ev.end_time) ? "Available" : "Closed"}
                                        </span>
                                        <span className="flex items-center gap-1 text-[#06b6d4] hover:underline">
                                            Details <SlidersHorizontal className="h-3 w-3" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default EventList;
