"use client";

import React from "react";
import EventTable, { EventRow } from "../../_components/EventTable";
import { DEMO_APPROVED } from "../../_components/EventConstants";

export default function ApprovedPage() {
    return (
        <EventTable
            title="Approved events"
            data={DEMO_APPROVED as EventRow[]}
            actionLabel="View"
            actionLinkPrefix="/organizer/events"
            showCheckbox={false}
        />
    );
}
