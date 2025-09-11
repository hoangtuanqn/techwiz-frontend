"use client";

export default function OverviewPage() {
    return (
        <section className="grid gap-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold">Overview</h1>
                <p className="mt-1 text-sm text-slate-600">
                    Welcome to the EventSphere Admin Panel. Use the sidebar to navigate between sections.
                </p>
            </article>
        </section>
    );
}
