"use client";

import React from "react";
import EventTable, { EventRow } from "../../_comments/EventTable";
import { DEMO_ONGOING } from "../../_comments/eventConstants";

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
