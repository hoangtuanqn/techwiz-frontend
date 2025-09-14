"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, CheckCircle, ArrowRight, SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import eventApi from "~/apiRequest/event";
import { formatter } from "~/utils/format";

const isAvailable = (endDate: string) => {
    return new Date(endDate) >= new Date();
};

const UpcomingEvents: React.FC = () => {
    const pct = (booked: number, total: number) => (total ? Math.min(100, Math.round((booked / total) * 100)) : 0);
    const barColor = (p: number) => (p > 95 ? "bg-red-500" : p > 60 ? "bg-amber-500" : "bg-emerald-500");

    const { data: events, isLoading } = useQuery({
        queryKey: ["upcoming-events"],
        queryFn: async () => {
            const response = await eventApi.getEvent(1, 3, "", "", "status=available");
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return (
        <section className="py-10 sm:py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
                {/* TITLE + VIEW ALL */}
                <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
                    <h2 className="text-2xl font-bold sm:text-3xl">Upcoming Events</h2>
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-1 text-sm text-cyan-600 hover:underline sm:text-base"
                    >
                        View all <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* GRID */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {/* Loading */}
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-52 animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:h-64"
                            >
                                <div className="h-32 w-full bg-slate-100 sm:h-40" />
                                <div className="space-y-2 p-3 sm:space-y-3 sm:p-4">
                                    <div className="h-4 w-2/3 rounded bg-slate-100" />
                                    <div className="h-3 w-5/6 rounded bg-slate-100" />
                                    <div className="h-3 w-3/5 rounded bg-slate-100" />
                                </div>
                            </div>
                        ))}

                    {/* Cards (exact same structure as EventList) */}
                    {!isLoading &&
                        events?.data.map((ev) => {
                            const p = pct(ev.booked_count, ev?.seating?.total_seats ?? 0);
                            return (
                                <Link
                                    key={ev.id}
                                    href={`/events/${ev.id}`}
                                    className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                                        ev.is_booked
                                            ? "ring-opacity-50 border-emerald-300 ring-2 ring-emerald-200"
                                            : "border-slate-200"
                                    }`}
                                >
                                    {/* Registered Badge */}
                                    {ev.is_booked && (
                                        <div className="absolute top-3 right-3 z-10">
                                            <div className="flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-1 text-xs font-semibold text-white shadow-lg">
                                                <CheckCircle className="h-3 w-3" />
                                                Registered
                                            </div>
                                        </div>
                                    )}

                                    <Image
                                        src={ev.thumbnail}
                                        alt={ev.title}
                                        width={400}
                                        height={160}
                                        className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-40"
                                    />
                                    <div className="p-3 sm:p-4">
                                        <h3
                                            className={`font-semibold transition-colors ${
                                                ev.is_booked
                                                    ? "text-emerald-700 group-hover:text-emerald-600"
                                                    : "text-slate-800 group-hover:text-[#06b6d4]"
                                            }`}
                                        >
                                            {ev.is_booked && "✓ "}
                                            {ev.title}
                                        </h3>
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between text-xs text-slate-600">
                                                <span className="mb-3 flex items-center gap-1">
                                                    <Users className="h-4 w-4 text-cyan-600" />
                                                    {ev.booked_count}/{ev?.seating?.total_seats ?? 0} booked
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
                                        <p className="mt-2 line-clamp-2 text-xs text-slate-600 sm:text-sm">
                                            {ev.description}
                                        </p>
                                        <div className="mt-2 flex items-center justify-between text-xs sm:mt-3 sm:text-sm">
                                            <span className="text-slate-500">{formatter.capitalize(ev.category)}</span>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                    isAvailable(ev.end_event)
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {isAvailable(ev.end_event) ? "Available" : "Closed"}
                                            </span>
                                            <span className="flex items-center gap-1 text-[#06b6d4] hover:underline">
                                                Details <SlidersHorizontal className="h-3 w-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}

                    {!isLoading && events?.data.length === 0 && (
                        <div className="col-span-full rounded-xl border border-slate-200 bg-white p-4 text-center text-slate-600 sm:p-6">
                            No events found.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
