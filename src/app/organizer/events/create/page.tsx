"use client";

import EventEditorShell from "~/app/organizer/_comments/EventEditorShell";
import { EMPTY_EVENT } from "~/app/organizer/_comments/EventForm";

export default function CreateEventPage() {
    return (
        <EventEditorShell
            title="Event"
            initialValues={EMPTY_EVENT}
            mode="create"
            onCreate={async (v) => {
                // TODO: call API create
                alert("Created event:\n" + JSON.stringify(v, null, 2));
            }}
        />
    );
}
