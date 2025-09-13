"use client";

import dynamic from "next/dynamic";
import SentMailboxSkeleton from "./_components/SentMailboxSkeleton";

const SentMailbox = dynamic(() => import("./_components/SentMailbox"), {
    ssr: false,
    loading: () => <SentMailboxSkeleton />,
});

export default function MailboxPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-4">
            <div className="max-w mx-auto">
                <SentMailbox />
            </div>
        </div>
    );
}
