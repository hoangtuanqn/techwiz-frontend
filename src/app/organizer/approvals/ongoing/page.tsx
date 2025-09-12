"use client";

import React from "react";
import EventTable, { EventRow } from "../../_components/EventTable";
import { DEMO_ONGOING } from "../../_components/eventConstants";

export default function OngoingPage() {
    return (
        <EventTable
            title="Ongoing events"
            data={DEMO_ONGOING as EventRow[]}
            actionLabel="Manage"
            actionLinkPrefix="/organizer/events"
            showCheckbox={false}
        />
    );
}
