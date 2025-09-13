import React from "react";

export default function MailDetailSkeleton() {
    return (
        <div className="flex h-full flex-col">
            <div className="border-b border-slate-200 px-4 py-3">
                <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-3 w-32 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="flex-1 space-y-3 p-4">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-56 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-48 animate-pulse rounded bg-slate-200" />
                <div className="h-40 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-8 w-40 animate-pulse rounded bg-slate-200" />
            </div>
        </div>
    );
}
