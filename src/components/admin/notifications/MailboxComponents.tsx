import React from "react";
import { Inbox, Mail, Send, Clock, Paperclip } from "lucide-react";

type Channel = "push" | "email";

type Msg = {
    id: string;
    subject: string;
    snippet: string;
    time: string;
    tag?: Channel;
    unread?: boolean;
};

export function DetailPane({ subject, time, snippet }: { subject: string; time: string; snippet?: string }) {
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