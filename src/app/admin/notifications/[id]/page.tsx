"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Mail, Send, Clock, Paperclip } from "lucide-react";

// Helper components (DetailPane, ComposeEventBroadcastPane, EmptyState, Select) should be moved to shared or other relevant files if used elsewhere.
// For now, keeping DetailPane here as it's directly used.

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

// ComposeEventBroadcastPane, EmptyState, Select are removed from here as they are not part of a pure detail view.
// If needed, they should be placed in the overview page or as shared components.

export default function NotificationDetailPage() {
    const params = useParams();
    const { id } = params;
    const [message, setMessage] = useState<{ id: string; subject: string; snippet: string; time: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // TODO: Fetch message details from API using the 'id'
            // For now, simulate fetching data
            const fetchedMessage = {
                id: id as string,
                subject: `[Chi tiết] Thông báo ${id}`,
                snippet: `Đây là nội dung chi tiết của thông báo có ID: ${id}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, // Placeholder
                time: "Vừa xong",
            };
            setMessage(fetchedMessage);
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <p>Đang tải chi tiết thông báo...</p>;
    }

    if (!message) {
        return <p>Không tìm thấy thông báo.</p>;
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-4">
            <div className="max-w mx-auto grid grid-cols-1 gap-4 sm:px-6">
                {/* DETAIL PANE */}
                <section className="flex min-h-[calc(100vh-96px)] min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <DetailPane
                        subject={message.subject}
                        time={message.time}
                        snippet={message.snippet}
                    />
                </section>
            </div>
        </div>
    );
}