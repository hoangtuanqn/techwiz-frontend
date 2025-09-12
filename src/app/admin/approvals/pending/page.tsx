"use client";

import React from "react";
import EventTable, { EventRow } from "../../_comments/EventTable";
import { DEMO_PENDING } from "../../_comments/eventConstants";

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
