"use client";

import React from "react";

export default function CommentsSkeleton() {
    return (
        <div className="space-y-4">
            <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
            {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
                        <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                        <div className="h-4 w-3/5 animate-pulse rounded bg-slate-200" />
                    </div>
                </div>
            ))}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
                <div className="mt-3 h-9 w-full animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-24 w-full animate-pulse rounded bg-slate-200" />
                <div className="mt-3 h-9 w-40 animate-pulse rounded bg-slate-200" />
            </div>
        </div>
    );
}
