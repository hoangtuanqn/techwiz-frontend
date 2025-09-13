"use client";

export default function CalendarSkeleton() {
    return (
        <div className="mx-auto w-full max-w-[120rem] px-4 py-6">
            <div className="mb-4">
                <div className="h-7 w-48 animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Left skeleton */}
                <div className="space-y-4 lg:col-span-5">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-32 animate-pulse rounded-xl bg-slate-200" />
                        <div className="h-9 w-28 animate-pulse rounded-xl bg-slate-200" />
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-3 h-4 w-24 animate-pulse rounded bg-slate-100" />
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-9 animate-pulse rounded-lg bg-slate-100" />
                            ))}
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
                            <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
                            <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="h-5 w-32 animate-pulse rounded bg-slate-100" />
                        <div className="mt-3 space-y-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-100" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right skeleton (calendar) */}
                <div className="lg:col-span-7">
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                        <div className="mb-3 h-5 w-40 animate-pulse rounded bg-slate-100" />
                        <div className="aspect-[4/3] w-full animate-pulse rounded-lg bg-slate-100" />
                    </div>
                </div>
            </div>
        </div>
    );
}
