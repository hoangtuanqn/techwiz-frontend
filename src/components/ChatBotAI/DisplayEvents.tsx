"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import publicApi from "~/libs/apis/publicApi";
import { EventLinkSkeleton } from "./EventLinkSkeleton";

const DisplayEvents = ({ eventIds }: { eventIds: number[] }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["list-event-chatbot-ai", eventIds],
        queryFn: async () => {
            if (eventIds.length === 0) return []; // Return empty array if no events
            const response = await publicApi.post(`/events/for-ai`, { event_ids: eventIds });
            return response.data?.data || []; // Return event list
        },
    });
    return (
        <div className="mt-2 flex flex-col gap-3">
            {isLoading ? (
                <>
                    {eventIds.map((item) => (
                        <EventLinkSkeleton key={item} />
                    ))}
                </>
            ) : (
                data.map((item: any) => (
                    <a
                        key={item.id}
                        href={`/events/${item.id}`}
                        rel="noopener noreferrer"
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-slate-700 transition-shadow hover:bg-blue-100 hover:shadow-lg"
                    >
                        {/* Thumbnail */}
                        <img
                            src={item.thumbnail || "/images/events/event-default.jpg"}
                            alt={`Thumbnail for event ${item.title}`}
                            className="h-12 w-12 rounded-lg border border-blue-300 object-cover"
                        />

                        <div className="flex-1">
                            <div className="text-sm font-semibold text-blue-700">{item.title}</div>
                            <div className="text-slate-600">
                                Start time:{" "}
                                {item.start_event
                                    ? new Date(item.start_event).toLocaleString("en-US")
                                    : "Not specified"}
                            </div>
                            <div className="font-medium text-emerald-600">Available seats: {item.available_seats}</div>
                        </div>
                    </a>
                ))
            )}
        </div>
    );
};

export default DisplayEvents;
