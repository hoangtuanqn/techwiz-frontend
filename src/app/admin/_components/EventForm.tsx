"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Image as ImageIcon, MapPin } from "lucide-react";

export type EventFormValues = {
    title: string;
    slug: string;
    teaser: string;
    description: string;
    startDT: string;
    endDT: string;
    capacity: string;
    mode: "onsite" | "online" | "hybrid";
    place: string;
    mapNote: string;
    learning: string;
    hasCert: boolean;
    certName: string;
    certCondition: string;
    certDate: string;
};

export default function EventForm({
    values,
    onChange,
    readOnly = false,
}: {
    values: EventFormValues;
    onChange: (v: EventFormValues) => void;
    readOnly?: boolean;
}) {
    if (!values) return <div className="text-slate-500">Loading…</div>;

    const disabledCls = readOnly ? "pointer-events-none opacity-70" : "";
    const bind =
        <K extends keyof EventFormValues>(key: K) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            onChange({ ...values, [key]: e.target.value });

    const Section = ({
        title,
        children,
        icon,
    }: {
        title: string;
        children: React.ReactNode;
        icon?: React.ReactNode;
    }) => (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
            <div className="mb-4 flex items-center gap-2">
                {icon}
                <h2 className="text-sm font-semibold text-slate-600">{title}</h2>
            </div>
            {children}
        </section>
    );

    const inputCls =
        "rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-200";

    return (
        // 👇 Giới hạn chiều rộng form ở đây
        <div className="max-w mx-auto w-full space-y-6">
            {/* OVERVIEW */}
            <Section title="OVERVIEW">
                <div className={`grid gap-6 md:grid-cols-2 ${disabledCls}`}>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">Event title</label>
                        <input
                            value={values.title}
                            onChange={bind("title")}
                            placeholder="Event title"
                            className={`${inputCls} w-full`}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">Slug</label>
                        <input
                            value={values.slug}
                            onChange={bind("slug")}
                            placeholder="Slug"
                            className={`${inputCls} w-full`}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-slate-600">Teaser</label>
                        <input
                            value={values.teaser}
                            onChange={bind("teaser")}
                            placeholder="Short introduction"
                            className={`${inputCls} w-full`}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-slate-600">Description</label>
                        <textarea
                            value={values.description}
                            onChange={bind("description")}
                            rows={4}
                            placeholder="Detailed description"
                            className={`${inputCls} w-full`}
                        />
                    </div>
                </div>
            </Section>

            {/* MEDIA */}
            <Section title="MEDIA" icon={<ImageIcon className="h-4 w-4 text-slate-400" />}>
                <label className="mb-1 block text-xs font-medium text-slate-600">Upload banner</label>
                <input
                    type="file"
                    disabled={readOnly}
                    className={`block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-slate-700 hover:file:bg-slate-200 ${disabledCls}`}
                />
            </Section>

            {/* DETAILS */}
            <Section title="CHI TIẾT" icon={<CalendarIcon className="h-4 w-4 text-slate-400" />}>
                <div className={`grid gap-6 md:grid-cols-3 ${disabledCls}`}>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">Capacity</label>
                        <input
                            value={values.capacity}
                            onChange={bind("capacity")}
                            placeholder="Số lượng tham gia"
                            className={`${inputCls} w-full`}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">Start datetime</label>
                        <input
                            type="datetime-local"
                            value={values.startDT}
                            onChange={bind("startDT")}
                            className={`${inputCls} w-full`}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">End datetime</label>
                        <input
                            type="datetime-local"
                            value={values.endDT}
                            onChange={bind("endDT")}
                            className={`${inputCls} w-full`}
                        />
                    </div>
                </div>
            </Section>

            {/* LOGISTICS */}
            <Section title="LOGISTICS" icon={<MapPin className="h-4 w-4 text-slate-400" />}>
                <div className={`grid gap-6 md:grid-cols-2 ${disabledCls}`}>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">Mode</label>
                        <div className="flex flex-wrap gap-5 text-sm">
                            {(["onsite", "online", "hybrid"] as const).map((m) => (
                                <label key={m} className="inline-flex items-center gap-2">
                                    <input
                                        type="radio"
                                        checked={values.mode === m}
                                        onChange={() => onChange({ ...values, mode: m })}
                                        className="h-4 w-4 accent-cyan-500"
                                    />
                                    <span className="capitalize">{m}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">Place / Online link</label>
                        <input
                            value={values.place}
                            onChange={bind("place")}
                            placeholder="Destination/ Online link"
                            className={`${inputCls} w-full`}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-slate-600">Map note</label>
                        <input
                            value={values.mapNote}
                            onChange={bind("mapNote")}
                            placeholder="Map note"
                            className={`${inputCls} w-full`}
                        />
                    </div>
                </div>
            </Section>

            {/* LEARNING */}
            <Section title="WHAT WILL YOU LEARN">
                <label className="mb-1 block text-xs font-medium text-slate-600">Learning outcome</label>
                <input
                    value={values.learning}
                    onChange={bind("learning")}
                    placeholder="For example: Master the basic Git workflow"
                    className={`${inputCls} w-full ${disabledCls}`}
                />
            </Section>

            {/* CERTIFICATE */}
            <Section title="CERTIFICATE">
                <label className={`mb-2 inline-flex items-center gap-2 text-sm ${disabledCls}`}>
                    <input
                        type="checkbox"
                        checked={values.hasCert}
                        onChange={(e) => onChange({ ...values, hasCert: e.target.checked })}
                        className="h-4 w-4 accent-cyan-500"
                    />
                    <span>Cấp chứng chỉ</span>
                </label>

                {values.hasCert && (
                    <div className={`mt-2 grid gap-6 md:grid-cols-3 ${disabledCls}`}>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-600">Certificate name</label>
                            <input
                                value={values.certName}
                                onChange={bind("certName")}
                                placeholder="Certificate name"
                                className={`${inputCls} w-full`}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-600">Condition</label>
                            <input
                                value={values.certCondition}
                                onChange={bind("certCondition")}
                                placeholder="Condition to get certificate"
                                className={`${inputCls} w-full`}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-600">Issue date</label>
                            <input
                                type="date"
                                value={values.certDate}
                                onChange={bind("certDate")}
                                className={`${inputCls} w-full`}
                            />
                        </div>
                    </div>
                )}
            </Section>
        </div>
    );
}
