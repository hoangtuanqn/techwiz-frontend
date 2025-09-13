"use client";

import React from "react";
import EventTable from "../../_components/EventTable";
import { useQuery } from "@tanstack/react-query";
import eventApi from "~/apiRequest/event";
import { EventListResponseType } from "~/types/schemaZod/event.schema";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
const fields = ["page", "search"] as const;
export default function PendingPage() {
    const { page, search } = useGetSearchQuery(fields);
    const { data: pendingEvents } = useQuery({
        queryKey: ["pendingEvents", { page, search }],
        queryFn: async () => {
            const response = await eventApi.getEvent(+page, 10, search, "", "filter[status]=pending");
            return response.data.data;
        },
    });
    return (
        <EventTable
            title="Pending events"
            data={pendingEvents as EventListResponseType["data"]}
            actionLabel="View"
            actionLinkPrefix="/organizer/approvals/pending"
        />
    );
}
