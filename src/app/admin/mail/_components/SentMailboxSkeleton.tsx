
import React from "react";

export default function SentMailboxSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
            {/* list */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="mb-3 h-9 animate-pulse rounded-full bg-slate-200" />
                <div className="mb-2 h-8 animate-pulse rounded-lg bg-slate-200" />
                <div className="mb-2 h-8 animate-pulse rounded-lg bg-slate-200" />
                <div className="space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-200" />
                    ))}
                </div>
            </div>
            {/* detail */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="mb-3 h-9 w-40 animate-pulse rounded-lg bg-slate-200" />
                <div className="mb-2 h-6 animate-pulse rounded bg-slate-200" />
                <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-48 animate-pulse rounded-lg bg-slate-200" />
            </div>
        </div>
    );
}
