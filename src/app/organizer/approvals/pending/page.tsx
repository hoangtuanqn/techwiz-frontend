"use client";

import React from "react";
import EventTable, { EventRow } from "../../_components/EventTable";
import { DEMO_PENDING } from "../../_components/eventConstants";

export default function PendingPage() {
    return (
        <EventTable
            title="Pending events"
            data={DEMO_PENDING as EventRow[]}
            actionLabel="Review"
            actionLinkPrefix="/organizer/events"
            showCheckbox
        />
    );
}
