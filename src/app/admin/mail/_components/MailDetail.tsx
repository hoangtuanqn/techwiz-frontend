"use client";

import React from "react";
import { X, Paperclip } from "lucide-react";

type MailDetailData = {
    id: string;
    subject: string;
    from: string;
    to: string[] | string;
    cc?: string[] | string;
    bcc?: string[] | string;
    channel: "email" | "push";
    status: "sent" | "queued" | "failed";
    sentAt?: string;
    scheduledAt?: string;
    bodyHtml?: string;
    bodyText?: string;
    attachments?: { name: string; url?: string; size?: number }[];
};

type Variant = "inline" | "drawer";

// Offline mock mapped to SEED ids
const MOCK_DETAILS: Record<string, MailDetailData> = {
    m1: {
        id: "m1",
        subject: "[Reminder] Event starts soon",
        from: "noreply@eventsphere.com",
        to: ["user1@example.com"],
        channel: "push",
        status: "sent",
        sentAt: new Date().toISOString(),
        bodyText: "Starts in 60 minutes. Please arrive 10 minutes early.",
    },
    m2: {
        id: "m2",
        subject: "[Reminder] Check-in opens",
        from: "noreply@eventsphere.com",
        to: ["everyone@example.com"],
        channel: "push",
        status: "sent",
        sentAt: new Date().toISOString(),
        bodyText: "Check-in desk opens at 08:30, please bring your badge.",
    },
    m3: {
        id: "m3",
        subject: "[Reminder] Venue & map",
        from: "noreply@eventsphere.com",
        to: "all-participants@example.com",
        channel: "push",
        status: "sent",
        sentAt: new Date().toISOString(),
        bodyHtml:
            '<p>Address: <strong>Hall A</strong></p><p>Parking available at the back.</p><p><a href="#">View map</a></p>',
    },
    m4: {
        id: "m4",
        subject: "[Reminder] Workshop materials",
        from: "noreply@eventsphere.com",
        to: ["track-a@example.com", "track-b@example.com"],
        channel: "push",
        status: "sent",
        sentAt: new Date().toISOString(),
        bodyText: "Slides, sample repo and setup guide are attached.",
        attachments: [
            { name: "slides.pdf", url: "#", size: 256_000 },
            { name: "repo.zip", url: "#", size: 1_024_000 },
        ],
    },
    m5: {
        id: "m5",
        subject: "[New] Certificate policy",
        from: "info@eventsphere.com",
        to: "participants@example.com",
        channel: "email",
        status: "sent",
        sentAt: new Date().toISOString(),
        bodyHtml:
            "<p>We updated the requirements for receiving certificates.</p><ul><li>Complete the survey</li><li>Attend 80% sessions</li></ul>",
    },
    m6: {
        id: "m6",
        subject: "[Certificate] How to claim",
        from: "cert@eventsphere.com",
        to: "you@example.com",
        channel: "email",
        status: "sent",
        sentAt: new Date().toISOString(),
        bodyText: "Complete the survey to receive your certificate. Link expires in 7 days.",
    },
};

export default function MailDetail({
    id,
    onClose,
    variant = "drawer",
}: {
    id: string;
    onClose?: () => void;
    variant?: Variant;
}) {
    const data = MOCK_DETAILS[id];
    const showClose = variant !== "inline" && !!onClose;

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-slate-900">
                        {data?.subject || "Mail detail"}
                    </h2>
                    {data && (
                        <div className="mt-0.5 text-xs text-slate-500">
                            {data.channel.toUpperCase()} •{" "}
                            {data.status === "queued"
                                ? data.scheduledAt
                                    ? new Date(data.scheduledAt).toLocaleString()
                                    : "Scheduled"
                                : data.sentAt
                                  ? new Date(data.sentAt).toLocaleString()
                                  : "—"}
                        </div>
                    )}
                </div>

                {showClose && (
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-auto p-4">
                {!data ? (
                    <p className="text-sm text-slate-500">Not found.</p>
                ) : (
                    <>
                        {/* Meta */}
                        <div className="mb-4 space-y-1 text-sm">
                            <div>
                                <span className="font-semibold text-slate-700">From:</span>{" "}
                                <span className="text-slate-800">{data.from}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-slate-700">To:</span>{" "}
                                <span className="text-slate-800">
                                    {Array.isArray(data.to) ? data.to.join(", ") : data.to}
                                </span>
                            </div>
                            {data.cc && (
                                <div>
                                    <span className="font-semibold text-slate-700">Cc:</span>{" "}
                                    <span className="text-slate-800">
                                        {Array.isArray(data.cc) ? data.cc.join(", ") : data.cc}
                                    </span>
                                </div>
                            )}
                            {data.bcc && (
                                <div>
                                    <span className="font-semibold text-slate-700">Bcc:</span>{" "}
                                    <span className="text-slate-800">
                                        {Array.isArray(data.bcc) ? data.bcc.join(", ") : data.bcc}
                                    </span>
                                </div>
                            )}
                            <div className="text-xs text-slate-500">
                                Status:{" "}
                                {data.status === "sent" ? "Sent" : data.status === "queued" ? "Queued" : "Failed"}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="prose prose-sm max-w-none">
                            {data.bodyHtml ? (
                                <div dangerouslySetInnerHTML={{ __html: data.bodyHtml }} />
                            ) : (
                                <pre className="rounded-md bg-slate-50 p-3 whitespace-pre-wrap text-slate-800">
                                    {data.bodyText || "— No content —"}
                                </pre>
                            )}
                        </div>

                        {/* Attachments */}
                        {!!data.attachments?.length && (
                            <div className="mt-4">
                                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <Paperclip className="h-4 w-4" />
                                    Attachments
                                </div>
                                <ul className="space-y-1 text-sm">
                                    {data.attachments.map((a, i) => (
                                        <li key={i} className="flex items-center justify-between">
                                            {a.url ? (
                                                <a
                                                    href={a.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sky-600 hover:underline"
                                                >
                                                    {a.name}
                                                </a>
                                            ) : (
                                                <span className="text-slate-800">{a.name}</span>
                                            )}
                                            {typeof a.size === "number" && (
                                                <span className="text-xs text-slate-500">
                                                    {(a.size / 1024).toFixed(1)} KB
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
