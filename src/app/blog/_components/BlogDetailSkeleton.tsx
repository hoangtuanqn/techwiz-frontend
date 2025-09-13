"use client";

export default function BlogDetailSkeleton() {
    return (
        <main className="bg-gradient-to-b from-slate-50 to-white text-slate-800">
            <div className="mx-auto max-w-5xl px-4 pt-6">
                <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            </div>

            <section className="relative mx-auto mt-4 max-w-5xl px-4">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="h-[380px] w-full animate-pulse bg-slate-200" />
                </div>
            </section>

            <div className="mx-auto max-w-5xl px-4">
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-24 animate-pulse rounded bg-slate-200" />
                        <div className="h-9 w-28 animate-pulse rounded bg-slate-200" />
                        <div className="h-9 w-20 animate-pulse rounded bg-slate-200" />
                    </div>
                    <div className="h-9 w-28 animate-pulse rounded bg-slate-200" />
                </div>
            </div>

            <article className="mx-auto mt-8 max-w-3xl px-4">
                <div className="space-y-3">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                </div>
            </article>

            <section className="mx-auto mt-10 max-w-3xl px-4 pb-16">
                <div className="h-20 w-full animate-pulse rounded-2xl border border-slate-200 bg-white" />
            </section>
        </main>
    );
}
