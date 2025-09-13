"use client";
import { Metadata } from "next";
import EventFormEdit from "./EventFormEdit";
import eventApi from "~/apiRequest/event";
import { useQuery } from "@tanstack/react-query";
// export const metadata: Metadata = {
//     title: "Create Event - EventSphere",
//     description: "Create and manage your campus events with EventSphere's intuitive event creation tools.",
// };
export default function CreateEventPage({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    const { data: event } = useQuery({
        queryKey: ["event", id],
        queryFn: async () => {
            const res = await eventApi.getDetailEvent(id);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    if (!event) {
        return;
    }
    return (
        <div className="max-w mx-auto space-y-6 p-6">
            <header className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Edit Event</h1>
            </header>

            <EventFormEdit event={event} />
        </div>
    );
}
