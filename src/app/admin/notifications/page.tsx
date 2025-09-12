"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, Inbox, Mail, Send, Clock, Paperclip } from "lucide-react";

type Channel = "push" | "email";

type Msg = {
    id: string;
    subject: string;
    snippet: string;
    time: string;
    tag?: Channel;
    unread?: boolean;
};

const SEED: Msg[] = [
    {
        id: "m1",
        subject: "[Reminder] Sự kiện sắp diễn ra",
        snippet: "Bắt đầu sau 60 phút. Vui lòng đến sớm 10 phút…",
        time: "18:00",
        tag: "push",
        unread: true,
    },
    {
        id: "m2",
        subject: "[Reminder] Check-in mở cửa",
        snippet: "Quầy check-in mở lúc 08:30, vui lòng mang thẻ…",
        time: "17:59",
        tag: "push",
    },
    {
        id: "m3",
        subject: "[Reminder] Địa điểm & map",
        snippet: "Địa chỉ: Hall A, có bãi gửi xe phía sau…",
        time: "17:59",
        tag: "push",
    },
    {
        id: "m4",
        subject: "[Reminder] Tài liệu workshop",
        snippet: "Slide, repo mẫu và hướng dẫn cài đặt…",
        time: "17:58",
        tag: "push",
    },
    {
        id: "m5",
        subject: "[New] Chính sách chứng chỉ",
        snippet: "Điều kiện nhận chứng chỉ cập nhật…",
        time: "Hôm qua",
        tag: "email",
    },
    {
        id: "m6",
        subject: "[Certificate] Hướng dẫn nhận",
        snippet: "Hoàn tất khảo sát để nhận chứng chỉ…",
        time: "2 ngày trước",
        tag: "email",
    },
];

export default function MailboxPage() {
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState<string>(SEED[0].id);
    const [channel, setChannel] = useState<"all" | Channel>("all");
    const [status, setStatus] = useState<"all" | "unread">("all");
    const [tab, setTab] = useState<"detail" | "compose">("detail");

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        let rows = SEED;
        if (q) rows = rows.filter((m) => m.subject.toLowerCase().includes(q) || m.snippet.toLowerCase().includes(q));
        if (channel !== "all") rows = rows.filter((m) => m.tag === channel);
        if (status === "unread") rows = rows.filter((m) => m.unread);
        return rows;
    }, [search, channel, status]);

    const current = filtered.find((m) => m.id === selectedId) || filtered[0];

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-4">
            <div className="max-w mx-auto grid grid-cols-1 gap-4 sm:px-6 lg:grid-cols-[320px_1fr]">
                {/* LIST */}
                <section className="flex min-h-[calc(100vh-96px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white p-3">
                        <div className="flex flex-col gap-3">
                            <div className="relative">
                                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Tìm thông báo…"
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
                                const isSel = current?.id === m.id;
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
                                                    className={`mt-1 inline-block rounded-md px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase ${m.tag === "email" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}
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

                {/* RIGHT */}
                <section className="flex min-h-[calc(100vh-96px)] min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-2 border-b border-slate-200 px-4 pt-3">
                        <button
                            onClick={() => setTab("detail")}
                            className={`rounded-t-lg px-3 py-2 text-sm ${tab === "detail" ? "bg-slate-100 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                            Chi tiết
                        </button>
                        <button
                            onClick={() => setTab("compose")}
                            className={`inline-flex items-center gap-1 rounded-t-lg px-3 py-2 text-sm ${tab === "compose" ? "bg-slate-100 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                            <Mail className="h-4 w-4" /> Viết mail (theo sự kiện)
                        </button>
                    </div>
                    {tab === "detail" ? (
                        <DetailPane
                            subject={current?.subject ?? "—"}
                            time={current?.time ?? "—"}
                            snippet={current?.snippet}
                        />
                    ) : (
                        <ComposeEventBroadcastPane />
                    )}
                </section>
            </div>
        </div>
    );
}

function DetailPane({ subject, time, snippet }: { subject: string; time: string; snippet?: string }) {
    return (
        <>
            <div className="border-b border-slate-200 px-4 py-3">
                <h2 className="line-clamp-2 text-base font-semibold text-slate-900">{subject}</h2>
                <div className="mt-0.5 text-xs text-slate-500">EventSphere • {time}</div>
            </div>
            <div className="flex-1 overflow-auto p-4 text-sm leading-6 text-slate-700">
                <p>{snippet || "— Không có nội dung xem trước."}</p>
            </div>
        </>
    );
}

function ComposeEventBroadcastPane() {
    const [events, setEvents] = useState<{ id: string; name: string; start: string; location?: string }[]>([]);
    const [eventId, setEventId] = useState("");

    useEffect(() => {
        // TODO: thay bằng fetch('/api/events') để lấy danh sách thật
        setEvents([
            { id: "1", name: "Hackathon 2025", start: "2025-09-23 09:00", location: "Hall A" },
            { id: "2", name: "Career Fair", start: "2025-09-25 13:00", location: "Hall B" },
            { id: "3", name: "Cultural Night", start: "2025-09-28 19:00", location: "Main Stage" },
        ]);
    }, []);

    // dữ liệu gửi mail
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
            alert("Vui lòng chọn sự kiện và điền đủ thông tin.");
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
            alert(kind === "now" ? "Đã gửi email cho tất cả người tham gia sự kiện!" : "Đã lên lịch gửi email!");
        } catch (e: any) {
            alert("Gửi thất bại: " + e.message);
        }
    }

    return (
        <div className="flex-1 space-y-4 overflow-auto p-4">
            {/* Sự kiện */}
            <div className="rounded-xl border border-slate-200 p-3">
                <div className="mb-2 text-xs font-semibold text-slate-600">Sự kiện</div>
                <label className="block text-sm">
                    <span className="mb-1 block text-slate-600">Chọn sự kiện</span>
                    <select
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-cyan-200"
                    >
                        <option value="">— Chọn sự kiện —</option>
                        {events.map((ev) => (
                            <option key={ev.id} value={ev.id}>
                                {ev.name} ({ev.start})
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Nội dung email */}
            <div className="rounded-xl border border-slate-200 p-3">
                <div className="mb-2 text-xs font-semibold text-slate-600">Nội dung email</div>
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
                            placeholder="Nhắc lịch / tài liệu / cập nhật sự kiện"
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

            {/* Đính kèm */}
            <div className="mt-3 flex items-center gap-3">
                <label className="inline-flex items-center gap-2 text-sm">
                    <span className="mb-1 block text-slate-600">Đính kèm</span>
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
                    <Clock className="h-4 w-4" /> Lên lịch
                </button>
                <button
                    onClick={() => sendBroadcast("now")}
                    disabled={!canSend}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                >
                    <Send className="h-4 w-4" /> Gửi ngay
                </button>
            </div>
        </div>
    );
}

// UI Bits khác

function EmptyState() {
    return (
        <div className="flex h-48 flex-col items-center justify-center gap-2 text-center text-slate-500">
            <div className="rounded-full bg-slate-100 p-3">
                <Inbox className="h-6 w-6" />
            </div>
            <div className="text-sm font-medium">Không có kết quả</div>
            <div className="text-xs">Thử tìm với từ khoá khác hoặc thay filter</div>
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
