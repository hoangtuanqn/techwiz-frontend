"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Inbox, Mail, Send, Clock, Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";

// Helper components (EmptyState, Select) are moved here as they are used by ComposeEventBroadcastPane

function EmptyState() {
    return (
        <div className="flex h-48 flex-col items-center justify-center gap-2 text-center text-slate-500">
            <div className="rounded-full bg-slate-100 p-3">
                <Inbox className="h-6 w-6" />
            </div>
            <div className="text-sm font-medium">No results</div>
            <div className="text-xs">Try a different keyword or change filters</div>
        </div>
    );
}

function Select({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { label: string; value: string }[];
}) {
    return (
        <label className="block text-[11px] text-slate-600">
            <div className="mb-1">{label}</div>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none rounded-full border border-slate-200 bg-white py-1.5 pr-7 pl-3 text-xs text-slate-700 focus:ring-2 focus:ring-cyan-200"
                >
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
                <svg
                    className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
        </label>
    );
}

export default function ComposeNotificationPage() {
    const router = useRouter();
    const [events, setEvents] = useState<{ id: string; name: string; start: string; location?: string }[]>([]);
    const [eventId, setEventId] = useState("");

    useEffect(() => {
        // TODO: Replace with actual API fetch for events
        setEvents([
            { id: "1", name: "Hackathon 2025", start: "2025-09-23 09:00", location: "Hall A" },
            { id: "2", name: "Career Fair", start: "2025-09-25 13:00", location: "Hall B" },
            { id: "3", name: "Cultural Night", start: "2025-09-28 19:00", location: "Main Stage" },
        ]);
    }, []);

    // Mail data
    const [from, setFrom] = useState("noreply@eventsphere.com");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [scheduleAt, setScheduleAt] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);

    const canSend = useMemo(() => {
        if (!eventId) return false;
        if (!subject.trim() || !body.trim()) return false;
        if (!from.trim()) return false;
        return true;
    }, [eventId, subject, body, from]);

    async function sendBroadcast(kind: "now" | "schedule") {
        if (!canSend) {
            alert("Please select an event and fill in all required information.");
            return;
        }

        const payload: any = {
            eventId,
            from,
            subject,
            body,
            scheduleAt: kind === "schedule" && scheduleAt ? scheduleAt : undefined,
        };

        try {
            let res: Response;
            if (files && files.length > 0) {
                const fd = new FormData();
                Object.entries(payload).forEach(([k, v]) => {
                    if (v !== undefined && v !== null) fd.append(k, String(v));
                });
                Array.from(files).forEach((f) => fd.append("files[]", f));
                res = await fetch("/api/emails/broadcast-event", { method: "POST", body: fd });
            } else {
                res = await fetch("/api/emails/broadcast-event", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }

            if (!res.ok) throw new Error((await res.text()) || `HTTP ${res.status}`);
            alert(kind === "now" ? "Email sent to all event participants!" : "Email scheduled!");
        } catch (e: any) {
            alert("Failed to send: " + e.message);
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-4">
            <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Create New Notification</h1>
                    <button
                        onClick={() => router.back()}
                        className="text-slate-500 hover:text-slate-700 text-sm"
                    >
                        &larr; Go back
                    </button>
                </div>

                {/* Event */}
                <div className="rounded-xl border border-slate-200 p-3 mb-4">
                    <div className="mb-2 text-xs font-semibold text-slate-600">Event</div>
                    <label className="block text-sm">
                        <span className="mb-1 block text-slate-600">Select event</span>
                        <select
                            value={eventId}
                            onChange={(e) => setEventId(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-cyan-200"
                        >
                            <option value="">— Select event —</option>
                            {events.map((ev) => (
                                <option key={ev.id} value={ev.id}>
                                    {ev.name} ({ev.start})
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* Email content */}
                <div className="rounded-xl border border-slate-200 p-3 mb-4">
                    <div className="mb-2 text-xs font-semibold text-slate-600">Email Content</div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <label className="text-sm">
                            <span className="mb-1 block text-slate-600">From</span>
                            <input
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-cyan-200"
                            />
                        </label>
                        <label className="text-sm">
                            <span className="mb-1 block text-slate-600">Schedule (optional)</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="datetime-local"
                                    value={scheduleAt}
                                    onChange={(e) => setScheduleAt(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-cyan-200"
                                />
                                <Clock className="h-4 w-4 text-slate-400" />
                            </div>
                        </label>
                        <label className="text-sm md:col-span-2">
                            <span className="mb-1 block text-slate-600">Subject</span>
                            <input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Reminder / documents / event update"
                                className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-cyan-200"
                            />
                        </label>
                    </div>

                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={10}
                        className="mt-3 w-full rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-cyan-200"
                    />
                </div>

                {/* Attachments */}
                <div className="mt-3 flex items-center gap-3 mb-4">
                    <label className="inline-flex items-center gap-2 text-sm">
                        <span className="mb-1 block text-slate-600">Attachments</span>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setFiles(e.currentTarget.files)}
                            className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-white hover:file:bg-slate-800"
                        />
                    </label>
                    <Paperclip className="h-4 w-4 text-slate-400" />
                </div>

                {/* Actions */}
                <div className="mt-3 flex justify-end gap-2">
                    <button
                        onClick={() => sendBroadcast("schedule")}
                        disabled={!canSend || !scheduleAt}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                        <Clock className="h-4 w-4" /> Schedule
                    </button>
                    <button
                        onClick={() => sendBroadcast("now")}
                        disabled={!canSend}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                    >
                        <Send className="h-4 w-4" /> Send now
                    </button>
                </div>
            </div>
        </div>
    );
}