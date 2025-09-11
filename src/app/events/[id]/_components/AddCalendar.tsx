"use client";
import React from "react";
import { EventDetailResponseType } from "~/types/schemaZod/event.schema";

function escapeICS(text: string) {
    return text.replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

function slugify(s: string) {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}
function downloadICS({
    title,
    description,
    location,
    start,
    durationMins,
}: {
    title: string;
    description: string;
    location: string;
    start: string; // "YYYY-MM-DD HH:mm"
    durationMins: number;
}) {
    // Convert to UTC-ish format (simple demo)
    const startDate = new Date(start.replace(" ", "T"));
    const endDate = new Date(startDate.getTime() + durationMins * 60_000);

    const dt = (d: Date) =>
        d
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d{3}Z$/, "Z"); // YYYYMMDDTHHMMSSZ

    const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//EventSphere//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${(globalThis.crypto ?? window.crypto).randomUUID()}@eventsphere`,
        `DTSTAMP:${dt(new Date())}`,
        `DTSTART:${dt(startDate)}`,
        `DTEND:${dt(endDate)}`,
        `SUMMARY:${escapeICS(title)}`,
        `DESCRIPTION:${escapeICS(description)}`,
        `LOCATION:${escapeICS(location)}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(title)}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
const AddCalendar = ({ event }: { event: EventDetailResponseType["data"] }) => {
    return (
        <button
            onClick={() =>
                downloadICS({
                    title: event.title,
                    description: event.description,
                    location: event.venue,
                    start: event.start_time,
                    durationMins: event.seating ? (event.seating.total_seats > 0 ? 60 : 30) : 60,
                })
            }
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
        >
            Add to Calendar (.ics)
        </button>
    );
};

export default AddCalendar;
