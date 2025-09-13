"use client";

import React from "react";
import EventTable from "../../_components/EventTable";
import { useQuery } from "@tanstack/react-query";
import eventApi from "~/apiRequest/event";
import { EventListResponseType } from "~/types/schemaZod/event.schema";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
const fields = ["page", "search"] as const;
export default function ApprovedPage() {
    const { page, search } = useGetSearchQuery(fields);
    const { data: approvedEvents } = useQuery({
        queryKey: ["approvedEvents", { page, search }],
        queryFn: async () => {
            const response = await eventApi.getEvent(+page, 9, search, "", "filter[status]=approved");
            return response.data.data;
        },
    });
    return (
        <EventTable
            title="Approved events"
            data={approvedEvents as EventListResponseType["data"]}
            actionLabel="View"
            actionLinkPrefix="/organizer/approvals/approved"
        />
    );
}
