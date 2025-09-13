"use client";

import React from "react";
import EventTable from "../../_components/EventTable";
import { useQuery } from "@tanstack/react-query";
import eventApi from "~/apiRequest/event";
import { EventListResponseType } from "~/types/schemaZod/event.schema";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
const fields = ["page", "search"] as const;
export default function OnGoingPage() {
    const { page, search } = useGetSearchQuery(fields);
    const { data: onGoingEvents } = useQuery({
        queryKey: ["onGoingEvents", { page, search }],
        queryFn: async () => {
            const response = await eventApi.getEvent(+page, 10, search, "", "filter[status]=ongoing");
            return response.data.data;
        },
    });
    return (
        <EventTable
            title="Ongoing events"
            data={onGoingEvents as EventListResponseType["data"]}
            actionLabel="View"
            actionLinkPrefix="/organizer/approvals/ongoing"
        />
    );
}
