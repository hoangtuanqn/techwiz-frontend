"use client";

import { useSearchParams, useParams } from "next/navigation";
import EventEditorShell from "../../_components/EventEditorShell";
import { EventFormValues } from "../../_components/EventForm";

// Demo data – thay bằng fetch từ API
const DEMO_EVENTS: Record<string, EventFormValues> = {
    "EVT-1125": {
        title: "Startup Night",
        slug: "startup-night",
        teaser: "Pitching ideas",
        description: "Night full of pitches and networking.",
        startDT: "2025-09-25T18:00",
        endDT: "2025-09-25T21:00",
        capacity: "180",
        mode: "onsite",
        place: "Hall A",
        mapNote: "",
        learning: "",
        hasCert: false,
        certName: "",
        certCondition: "",
        certDate: "",
    },
    "EVT-1127": {
        title: "Design Systems Workshop",
        slug: "design-systems",
        teaser: "Hands-on workshop",
        description: "Learn to build a design system.",
        startDT: "2025-10-09T09:00",
        endDT: "2025-10-10T17:00",
        capacity: "90",
        mode: "onsite",
        place: "Design Hub",
        mapNote: "",
        learning: "",
        hasCert: true,
        certName: "Workshop Certificate",
        certCondition: "Attend 100%",
        certDate: "2025-10-11",
    },
};

export default function EventDetailPage() {
    const params = useParams<{ id: string }>();
    const search = useSearchParams();
    const id = params.id;
    const mode = (search.get("mode") as "create" | "review" | "edit") || "review";

    const initialValues = DEMO_EVENTS[id] ?? {
        title: "",
        slug: "",
        teaser: "",
        description: "",
        startDT: "",
        endDT: "",
        capacity: "",
        mode: "onsite",
        place: "",
        mapNote: "",
        learning: "",
        hasCert: false,
        certName: "",
        certCondition: "",
        certDate: "",
    };

    return (
        <EventEditorShell
            initialValues={initialValues}
            mode={mode}
            title={`Event ${id}`}
            onCreate={(v) => console.log("Create", v)}
            onUpdate={(v) => console.log("Update", v)}
            onApprove={(v) => console.log("Approve", v)}
            onReject={(v) => console.log("Reject", v)}
        />
    );
}
