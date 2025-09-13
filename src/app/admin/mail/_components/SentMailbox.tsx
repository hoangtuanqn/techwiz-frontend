"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Search, Inbox } from "lucide-react";
import MailDetail from "./MailDetail"; // inline detail tab (offline mock)

import ComposePersonalSkeleton from "./ComposePersonalSkeleton";
import ComposeEventSkeleton from "./ComposeEventSkeleton";

const ComposePersonal = dynamic(() => import("./ComposePersonal"), {
    ssr: false,
    loading: () => <ComposePersonalSkeleton />,
});
const ComposeEvent = dynamic(() => import("./ComposeEvent"), {
    ssr: false,
    loading: () => <ComposeEventSkeleton />,
});

type Channel = "push" | "email";
type Msg = { id: string; subject: string; snippet: string; time: string; tag?: Channel; unread?: boolean };

const SEED: Msg[] = [
    {
        id: "m1",
        subject: "[Reminder] Event starts soon",
        snippet: "Starts in 60 minutes. Please arrive 10 minutes early…",
        time: "18:00",
        tag: "push",
        unread: true,
    },
    {
        id: "m2",
        subject: "[Reminder] Check-in opens",
        snippet: "Check-in desk opens at 08:30, please bring your badge…",
        time: "17:59",
        tag: "push",
    },
    {
        id: "m3",
        subject: "[Reminder] Venue & map",
        snippet: "Address: Hall A, parking available at the back…",
        time: "17:59",
        tag: "push",
    },
    {
        id: "m4",
        subject: "[Reminder] Workshop materials",
        snippet: "Slides, sample repo and setup guide…",
        time: "17:58",
        tag: "push",
    },
    {
        id: "m5",
        subject: "[New] Certificate policy",
        snippet: "Updated requirements for receiving certificates…",
        time: "Yesterday",
        tag: "email",
    },
    {
        id: "m6",
        subject: "[Certificate] How to claim",
        snippet: "Complete the survey to receive your certificate…",
        time: "2 days ago",
        tag: "email",
    },
];

type TabMode = "detail" | "personal" | "event";

export default function SentMailbox() {
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState<string>(SEED[0].id);
    const [channel, setChannel] = useState<"all" | Channel>("all");
    const [status, setStatus] = useState<"all" | "unread">("all");
    const [tab, setTab] = useState<TabMode>("detail");

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        let rows = SEED;
        if (q) rows = rows.filter((m) => m.subject.toLowerCase().includes(q) || m.snippet.toLowerCase().includes(q));
        if (channel !== "all") rows = rows.filter((m) => m.tag === channel);
        if (status === "unread") rows = rows.filter((m) => m.unread);
        return rows;
    }, [search, channel, status]);

    // ensure the id we show exists in the current filtered set
    const displayId = useMemo(() => {
        if (filtered.some((m) => m.id === selectedId)) return selectedId;
        return filtered[0]?.id;
    }, [filtered, selectedId]);

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
            {/* LIST */}
            <section className="flex min-h-[480px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="sticky top-0 z-10 border-b border-slate-200 bg-white p-3">
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search notifications…"
                                className="w-full rounded-full border border-slate-200 py-2 pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-cyan-200"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Select
                                label="Channel"
                                value={channel}
                                onChange={(v) => setChannel(v as any)}
                                options={[
                                    { label: "All", value: "all" },
                                    { label: "Email", value: "email" },
                                    { label: "Push", value: "push" },
                                ]}
                            />
                            <Select
                                label="Status"
                                value={status}
                                onChange={(v) => setStatus(v as any)}
                                options={[
                                    { label: "All", value: "all" },
                                    { label: "Unread", value: "unread" },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <div className="scrollbar-thin flex-1 overflow-y-auto">
                    {filtered.length === 0 ? (
                        <EmptyState />
                    ) : (
                        filtered.map((m) => {
                            const isSel = displayId === m.id;
                            return (
                                <button
                                    key={m.id}
                                    onClick={() => {
                                        setSelectedId(m.id);
                                        setTab("detail");
                                    }}
                                    className={`flex w-full items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 text-left transition ${
                                        isSel ? "bg-slate-100" : "hover:bg-slate-50"
                                    }`}
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            {m.unread && (
                                                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                                            )}
                                            <div
                                                className={`truncate text-sm ${m.unread ? "font-semibold text-slate-900" : "font-medium text-slate-800"}`}
                                            >
                                                {m.subject}
                                            </div>
                                        </div>
                                        <div className="line-clamp-1 text-xs text-slate-500">{m.snippet}</div>
                                        {m.tag && (
                                            <span
                                                className={`mt-1 inline-block rounded-md px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase ${
                                                    m.tag === "email"
                                                        ? "bg-blue-50 text-blue-600"
                                                        : "bg-emerald-50 text-emerald-600"
                                                }`}
                                            >
                                                {m.tag}
                                            </span>
                                        )}
                                    </div>
                                    <div className="shrink-0 pt-0.5 text-xs text-slate-500">{m.time}</div>
                                </button>
                            );
                        })
                    )}
                </div>
            </section>

            {/* RIGHT: tabs = Detail | Personal | Event */}
            <section className="flex min-h-[480px] min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-200 px-4 pt-3">
                    <button
                        onClick={() => setTab("detail")}
                        className={`rounded-t-lg px-3 py-2 text-sm ${tab === "detail" ? "bg-slate-100 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                        Detail
                    </button>
                    <button
                        onClick={() => setTab("personal")}
                        className={`rounded-t-lg px-3 py-2 text-sm ${tab === "personal" ? "bg-slate-100 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                        Personal
                    </button>
                    <button
                        onClick={() => setTab("event")}
                        className={`inline-flex items-center gap-1 rounded-t-lg px-3 py-2 text-sm ${tab === "event" ? "bg-slate-100 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                        Event
                    </button>
                </div>

                {tab === "detail" ? (
                    filtered.length === 0 || !displayId ? (
                        <div className="flex flex-1 items-center justify-center p-6 text-sm text-slate-500">
                            No message to display.
                        </div>
                    ) : (
                        <MailDetail id={displayId} variant="inline" />
                    )
                ) : tab === "personal" ? (
                    <ComposePersonal />
                ) : (
                    <ComposeEvent />
                )}
            </section>
        </div>
    );
}

/* Small UI bits */
function EmptyState() {
    return (
        <div className="flex h-48 flex-col items-center justify-center gap-2 text-center text-slate-500">
            <div className="rounded-full bg-slate-100 p-3">
                <Inbox className="h-6 w-6" />
            </div>
            <div className="text-sm font-medium">No results</div>
            <div className="text-xs">Try a different keyword or adjust filters</div>
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
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
        </label>
    );
}
