"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { organizerApi } from "~/apiRequest/organizer";

const eventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    summary: z.string().min(1, "Summary is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    venue: z.string().min(1, "Venue is required"),
    start_event: z.string().min(1, "Start date is required"),
    end_event: z.string().min(1, "End date is required"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    mode: z.enum(["onsite", "online", "hybrid"]),
    note: z.string().optional(),
    email_contact: z.string().email().optional().or(z.literal("")),
    phone_contact: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

export default function OrganizerEventEditPage({ params }: { params: { id: string } }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock current event data
    const currentEvent: EventFormValues = {
        title: "Tech Conference 2024",
        summary: "Annual technology conference featuring the latest innovations",
        description: "Annual technology conference featuring the latest innovations in software development, artificial intelligence, and digital transformation.",
        category: "Technology",
        venue: "Convention Center",
        start_event: "2024-12-15T09:00",
        end_event: "2024-12-15T17:00",
        capacity: 200,
        mode: "onsite",
        note: "Please bring your laptop and charger. Lunch will be provided.",
        email_contact: "contact@techconf.com",
        phone_contact: "+1 (555) 123-4567",
    };

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: currentEvent,
    });

    const updateEventMutation = useMutation({
        mutationFn: async (data: EventFormValues) => {
            const response = await organizerApi.updateEvent(parseInt(params.id), data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Event updated successfully! Changes have been sent to admin for review.");
            setIsSubmitting(false);
        },
        onError: () => {
            toast.error("Failed to update event. Please try again.");
            setIsSubmitting(false);
        },
    });

    const onSubmit = (data: EventFormValues) => {
        setIsSubmitting(true);
        updateEventMutation.mutate(data);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href={`/organizer/events/${params.id}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Event
                </Link>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Edit Event</h1>
                    <p className="text-slate-600">Make changes to your event. Changes will be sent to admin for review.</p>
                </div>
            </div>

            {/* Warning Notice */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-medium text-amber-800">Review Required</h3>
                        <p className="mt-1 text-sm text-amber-700">
                            Any changes you make will be sent to the admin for review. The event status will remain unchanged until approved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Basic Information */}
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-semibold text-slate-900">Basic Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Event Title *
                                    </label>
                                    <input
                                        {...form.register("title")}
                                        type="text"
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                        placeholder="Enter event title"
                                    />
                                    {form.formState.errors.title && (
                                        <p className="mt-1 text-xs text-red-600">{form.formState.errors.title.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Summary *
                                    </label>
                                    <input
                                        {...form.register("summary")}
                                        type="text"
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                        placeholder="Brief description of the event"
                                    />
                                    {form.formState.errors.summary && (
                                        <p className="mt-1 text-xs text-red-600">{form.formState.errors.summary.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Description *
                                    </label>
                                    <textarea
                                        {...form.register("description")}
                                        rows={4}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                        placeholder="Detailed description of the event"
                                    />
                                    {form.formState.errors.description && (
                                        <p className="mt-1 text-xs text-red-600">{form.formState.errors.description.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        {...form.register("category")}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                    >
                                        <option value="">Select category</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Education">Education</option>
                                        <option value="Business">Business</option>
                                        <option value="Health">Health</option>
                                        <option value="Arts">Arts</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {form.formState.errors.category && (
                                        <p className="mt-1 text-xs text-red-600">{form.formState.errors.category.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-semibold text-slate-900">Event Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Venue *
                                    </label>
                                    <input
                                        {...form.register("venue")}
                                        type="text"
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                        placeholder="Enter venue or location"
                                    />
                                    {form.formState.errors.venue && (
                                        <p className="mt-1 text-xs text-red-600">{form.formState.errors.venue.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Event Mode *
                                    </label>
                                    <select
                                        {...form.register("mode")}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                    >
                                        <option value="onsite">Onsite</option>
                                        <option value="online">Online</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                    {form.formState.errors.mode && (
                                        <p className="mt-1 text-xs text-red-600">{form.formState.errors.mode.message}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Start Date *
                                        </label>
                                        <input
                                            {...form.register("start_event")}
                                            type="datetime-local"
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                        />
                                        {form.formState.errors.start_event && (
                                            <p className="mt-1 text-xs text-red-600">{form.formState.errors.start_event.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            End Date *
                                        </label>
                                        <input
                                            {...form.register("end_event")}
                                            type="datetime-local"
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                        />
                                        {form.formState.errors.end_event && (
                                            <p className="mt-1 text-xs text-red-600">{form.formState.errors.end_event.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Capacity *
                                    </label>
                                    <input
                                        {...form.register("capacity", { valueAsNumber: true })}
                                        type="number"
                                        min="1"
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                        placeholder="Maximum number of participants"
                                    />
                                    {form.formState.errors.capacity && (
                                        <p className="mt-1 text-xs text-red-600">{form.formState.errors.capacity.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-4 text-lg font-semibold text-slate-900">Additional Information</h3>
                    <div className="grid gap-4 lg:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Notes
                            </label>
                            <textarea
                                {...form.register("note")}
                                rows={3}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                placeholder="Additional notes for participants"
                            />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Contact Email
                                </label>
                                <input
                                    {...form.register("email_contact")}
                                    type="email"
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                    placeholder="contact@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Contact Phone
                                </label>
                                <input
                                    {...form.register("phone_contact")}
                                    type="tel"
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <Link
                        href={`/organizer/events/${params.id}`}
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#06b6d4] px-4 py-2 text-sm font-medium text-white hover:bg-[#0891b2] disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
