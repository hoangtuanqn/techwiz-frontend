"use client";

import React from "react";
import EventTable from "../../_components/EventTable";
import { useQuery } from "@tanstack/react-query";
import eventApi from "~/apiRequest/event";

export default function ApprovedPage() {
    // get dữ liệu approvals đã được approved
    const { data: approvedEvents, isPending } = useQuery({
        queryKey: ["approvedEvents"],
        queryFn: async () => {
            const response = await eventApi.getEvent(1, 10, "", "filter[status]=approved");
            return response.data.data.data;
        },
    });
    return null;
    // return (
    //     <EventTable
    //         title="Approved events"
    //         data={approvedEvents}
    //         actionLabel="View"
    //         actionLinkPrefix="/organizer/events"
    //         showCheckbox={false}
    //     />
    // );
}
