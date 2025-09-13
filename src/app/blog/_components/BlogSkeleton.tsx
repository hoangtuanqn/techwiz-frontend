// app/blog/_components/BlogSkeleton.tsx
"use client";

import React from "react";

export function BlogCardSkeleton() {
    return (
        <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-48 w-full bg-slate-200" />
            <div className="space-y-3 p-5">
                <div className="flex items-center justify-between text-xs">
                    <div className="h-5 w-24 rounded bg-slate-200" />
                    <div className="h-5 w-20 rounded bg-slate-200" />
                </div>
                <div className="h-6 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-2/3 rounded bg-slate-200" />
                <div className="flex gap-2">
                    <div className="h-5 w-16 rounded-full bg-slate-200" />
                    <div className="h-5 w-12 rounded-full bg-slate-200" />
                    <div className="h-5 w-20 rounded-full bg-slate-200" />
                </div>
            </div>
        </div>
    );
}

export function BlogDetailSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="mx-auto max-w-5xl px-4">
                <div className="h-64 w-full rounded-3xl bg-slate-200" />
            </div>
            <div className="mx-auto mt-6 max-w-3xl px-4">
                <div className="h-6 w-2/3 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-40 rounded bg-slate-200" />
                <div className="mt-6 space-y-3">
                    <div className="h-5 w-full rounded bg-slate-200" />
                    <div className="h-5 w-5/6 rounded bg-slate-200" />
                    <div className="h-5 w-4/6 rounded bg-slate-200" />
                </div>
                <div className="mt-6 space-y-3">
                    <div className="h-5 w-full rounded bg-slate-200" />
                    <div className="h-5 w-5/6 rounded bg-slate-200" />
                    <div className="h-5 w-4/6 rounded bg-slate-200" />
                </div>
            </div>
        </div>
    );
}
