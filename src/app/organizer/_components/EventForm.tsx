"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Image as ImageIcon, MapPin } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export type EventFormValues = {
    title: string;
    slug: string;
    teaser: string;
    description: string;
    startDT: string;
    endDT: string;
    capacity: string; // keep as string to match your current API
    mode: "onsite" | "online" | "hybrid";
    place: string;
    mapNote: string;
    learning: string;
    hasCert: boolean;
    certName: string;
    certCondition: string;
    certDate: string;
};

export const EMPTY_EVENT: EventFormValues = {
    title: "",
    slug: "",
    teaser: "",
    description: "",
    startDT: "", // e.g., "2025-09-30T09:00"
    endDT: "", // e.g., "2025-09-30T11:00"
    capacity: "", // keep empty string as designed
    mode: "onsite", // sensible default
    place: "",
    mapNote: "",
    learning: "",
    hasCert: false,
    certName: "",
    certCondition: "",
    certDate: "", // e.g., "2025-10-01"
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
        description,
    }: {
        title: string;
        children: React.ReactNode;
        icon?: React.ReactNode;
        description?: string;
    }) => (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7">
            <div className="mb-5 flex items-start gap-3">
                {icon ? <div className="mt-0.5">{icon}</div> : null}
                <div>
                    <h2 className="text-sm font-semibold tracking-wide text-slate-700">{title}</h2>
                    {description ? <p className="mt-1 text-xs text-slate-500">{description}</p> : null}
                </div>
            </div>
            {children}
        </section>
    );

    const inputCls =
        "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-cyan-200";

    return (
        <div className="mx-auto w-full space-y-8">
            {/* OVERVIEW */}
            <Section title="OVERVIEW" description="Basic information about your event.">
                <div className={`grid gap-6 md:grid-cols-2 ${disabledCls}`}>
                    <div className="md:col-span-2">
                        <Label className="mb-1.5 block text-xs font-medium text-slate-600">Event title</Label>
                        <Input
                            value={values.title}
                            onChange={bind("title")}
                            placeholder="Enter event title"
                            className={inputCls}
                        />
                    </div>

                    <div>
                        <Label className="mb-1.5 block text-xs font-medium text-slate-600">Slug</Label>
                        <Input
                            value={values.slug}
                            onChange={bind("slug")}
                            placeholder="event-title-slug"
                            className={inputCls}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Label className="mb-1.5 block text-xs font-medium text-slate-600">Teaser</Label>
                        <Input
                            value={values.teaser}
                            onChange={bind("teaser")}
                            placeholder="Short introduction"
                            className={inputCls}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Label className="mb-1.5 block text-xs font-medium text-slate-600">Description</Label>
                        <Textarea
                            value={values.description}
                            onChange={bind("description")}
                            rows={5}
                            placeholder="Detailed description"
                            className={inputCls}
                        />
                    </div>
                </div>
            </Section>

            <Section
                title="MEDIA"
                description="Upload a banner image for your event."
                icon={<ImageIcon className="h-4 w-4 text-slate-400" />}
            >
                <div className={disabledCls}>
                    <Label className="mb-1.5 block text-xs font-medium text-slate-600">Banner image</Label>
                    <input
                        type="file"
                        accept="image/*"
                        disabled={readOnly}
                        className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-slate-700 hover:file:bg-slate-200"
                        onChange={(e) => {
                            // handle file upload here if needed
                        }}
                    />
                    <p className="mt-2 text-xs text-slate-500">Recommended: JPG/PNG, ≤ 3MB.</p>
                </div>
            </Section>

            {/* DETAILS */}
            <Section
                title="DETAILS"
                description="Schedule and capacity."
                icon={<CalendarIcon className="h-4 w-4 text-slate-400" />}
            >
                <div className={`grid gap-6 md:grid-cols-3 ${disabledCls}`}>
                    <div>
                        <Label className="mb-1.5 block text-xs font-medium text-slate-600">Capacity</Label>
                        <Input
                            type="number"
                            inputMode="numeric"
                            value={values.capacity}
                            onChange={bind("capacity")}
                            placeholder="Number of attendees"
                            className={inputCls}
                        />
                    </div>

                    <div>
                        <Label className="mb-1.5 block text-xs font-medium text-slate-600">Start datetime</Label>
                        <Input
                            type="datetime-local"
                            value={values.startDT}
                            onChange={bind("startDT")}
                            className={inputCls}
                        />
                    </div>

                    <div>
                        <Label className="mb-1.5 block text-xs font-medium text-slate-600">End datetime</Label>
                        <Input
                            type="datetime-local"
                            value={values.endDT}
                            onChange={bind("endDT")}
                            className={inputCls}
                        />
                    </div>
                </div>
            </Section>

            {/* LOGISTICS */}
            <Section
                title="LOGISTICS"
                description="Location, mode, and map notes."
                icon={<MapPin className="h-4 w-4 text-slate-400" />}
            >
                <div className={`grid gap-6 md:grid-cols-2 ${disabledCls}`}>
                    <div>
                        <Label className="mb-1.5 block text-xs font-medium text-slate-600">Mode</Label>
                        <RadioGroup
                            value={values.mode}
                            onValueChange={(val) => onChange({ ...values, mode: val as EventFormValues["mode"] })}
                            className="flex flex-wrap gap-6 text-sm"
                        >
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="onsite" id="mode-onsite" />
                                <Label htmlFor="mode-onsite" className="cursor-pointer">
                                    Onsite
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="online" id="mode-online" />
                                <Label htmlFor="mode-online" className="cursor-pointer">
                                    Online
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="hybrid" id="mode-hybrid" />
                                <Label htmlFor="mode-hybrid" className="cursor-pointer">
                                    Hybrid
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div>
                        <Label className="mb-1.5 block text-xs font-medium text-slate-600">Venue / Online link</Label>
                        <Input
                            value={values.place}
                            onChange={bind("place")}
                            placeholder="Physical venue or online meeting link"
                            className={inputCls}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Label className="mb-1.5 block text-xs font-medium text-slate-600">Map note</Label>
                        <Textarea
                            value={values.mapNote}
                            onChange={bind("mapNote")}
                            placeholder="Extra directions or map notes"
                            className={inputCls}
                            rows={4}
                        />
                    </div>
                </div>
            </Section>

            {/* LEARNING */}
            <Section title="LEARNING OUTCOMES" description="What participants will learn or achieve.">
                <div className={disabledCls}>
                    <Label className="mb-1.5 block text-xs font-medium text-slate-600">Outcome</Label>
                    <Input
                        value={values.learning}
                        onChange={bind("learning")}
                        placeholder="e.g., Master the basic Git workflow"
                        className={inputCls}
                    />
                </div>
            </Section>

            {/* CERTIFICATE */}
            <Section title="CERTIFICATE" description="Configure certificate issuance (optional).">
                <div className={disabledCls}>
                    <label className="mb-3 inline-flex cursor-pointer items-center gap-2 text-sm select-none">
                        <Input
                            type="checkbox"
                            checked={values.hasCert}
                            onChange={(e) => onChange({ ...values, hasCert: e.target.checked })}
                            className="h-4 w-4 accent-cyan-500"
                        />
                        <span>Issue certificate</span>
                    </label>

                    {values.hasCert && (
                        <div className="mt-2 grid gap-6 md:grid-cols-3">
                            <div>
                                <Label className="mb-1.5 block text-xs font-medium text-slate-600">
                                    Certificate name
                                </Label>
                                <Input
                                    value={values.certName}
                                    onChange={bind("certName")}
                                    placeholder="e.g., Completion Certificate"
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <Label className="mb-1.5 block text-xs font-medium text-slate-600">Condition</Label>
                                <Input
                                    value={values.certCondition}
                                    onChange={bind("certCondition")}
                                    placeholder="e.g., Attend ≥ 80%, pass quiz"
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <Label className="mb-1.5 block text-xs font-medium text-slate-600">Issue date</Label>
                                <Input
                                    type="date"
                                    value={values.certDate}
                                    onChange={bind("certDate")}
                                    className={inputCls}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Section>
        </div>
    );
}
