
import React from "react";

export default function ComposeEventSkeleton() {
    return (
        <div className="space-y-3 p-4">
            <div className="h-4 w-44 animate-pulse rounded bg-slate-200" />
            <div className="h-10 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="h-10 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-10 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-10 animate-pulse rounded-lg bg-slate-200 md:col-span-2" />
            </div>
            <div className="h-32 animate-pulse rounded-lg bg-slate-200" />
            <div className="flex items-center gap-3">
                <div className="h-9 flex-1 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-6 w-6 animate-pulse rounded-full bg-slate-200" />
            </div>
            <div className="flex justify-end gap-2">
                <div className="h-9 w-28 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-9 w-28 animate-pulse rounded-lg bg-slate-200" />
            </div>
        </div>
    );
}
