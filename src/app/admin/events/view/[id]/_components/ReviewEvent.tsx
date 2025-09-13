"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    CheckCircle,
    XCircle,
    Edit3,
    Calendar,
    MapPin,
    Users,
    Clock,
    User,
    Tag,
    ArrowLeft,
    AlertTriangle,
    Info,
    Eye,
} from "lucide-react";
import eventApi from "~/apiRequest/event";
import { formatter } from "~/utils/format";
import Link from "next/link";
import { Button } from "~/components/ui/button";

const ReviewEvent = ({ id }: { id: number }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: event, isLoading } = useQuery({
        queryKey: ["event", id],
        queryFn: async () => {
            const res = await eventApi.getDetailEvent(id);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Approve event mutation
    const approveMutation = useMutation({
        mutationFn: () => eventApi.updateEvent(id, { status: "approved" }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["event", id] });
            alert("Event approved successfully!");
            router.push("/admin/approvals");
        },
        onError: (error) => {
            console.error("Approve failed:", error);
            alert("Failed to approve event. Please try again.");
        },
    });

    // Reject event mutation
    const rejectMutation = useMutation({
        mutationFn: () => eventApi.updateEvent(id, { status: "rejected" }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["event", id] });
            alert("Event rejected successfully!");
            router.push("/admin/approvals");
        },
        onError: (error) => {
            console.error("Reject failed:", error);
            alert("Failed to reject event. Please try again.");
        },
    });

    const handleApprove = () => {
        if (confirm("Are you sure you want to approve this event?")) {
            setIsSubmitting(true);
            approveMutation.mutate();
        }
    };

    const handleReject = () => {
        if (confirm("Are you sure you want to reject this event? This action cannot be undone.")) {
            setIsSubmitting(true);
            rejectMutation.mutate();
        }
    };

    const handleEdit = () => {
        router.push(`/admin/events/${id}`);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    <p className="text-slate-600">Loading event details...</p>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
                <h3 className="mb-2 text-lg font-medium text-slate-900">Event not found</h3>
                <p className="text-slate-600">
                    The event you&apos;re looking for doesn&apos;t exist or has been removed.
                </p>
            </div>
        );
    }

    const eventDate = new Date(event.start_event);
    const daysFromNow = Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isUrgent = daysFromNow <= 7 && daysFromNow > 0;
    const isPast = daysFromNow < 0;
    const bookedPercentage = event.seating ? Math.round((event.booked_count / event.seating.total_seats) * 100) : 0;

    return (
        <div className="space-y-6">
            {/* Header with Actions */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Review Event</h1>
                        <p className="text-slate-600">Event ID: #{event.id}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <Link href={`/admin/events/${id}`}>
                        <Button className="inline-flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100">
                            <Edit3 className="h-4 w-4" />
                            Edit Event
                        </Button>
                    </Link>

                    {event.status === "pending" && (
                        <>
                            <Button
                                onClick={handleReject}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
                                disabled={isSubmitting}
                            >
                                <XCircle className="h-4 w-4" />
                                {isSubmitting ? "Processing..." : "Reject"}
                            </Button>
                            <Button
                                onClick={handleApprove}
                                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                disabled={isSubmitting}
                            >
                                <CheckCircle className="h-4 w-4" />
                                {isSubmitting ? "Processing..." : "Approve"}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Status Banner */}
            <div
                className={`rounded-xl border p-4 ${
                    event.status === "approved"
                        ? "border-green-200 bg-green-50"
                        : event.status === "rejected"
                          ? "border-red-200 bg-red-50"
                          : isUrgent
                            ? "border-orange-200 bg-orange-50"
                            : "border-yellow-200 bg-yellow-50"
                }`}
            >
                <div className="flex items-center gap-3">
                    {event.status === "approved" && <CheckCircle className="h-6 w-6 text-green-600" />}
                    {event.status === "rejected" && <XCircle className="h-6 w-6 text-red-600" />}
                    {event.status === "pending" && <Clock className="h-6 w-6 text-yellow-600" />}

                    <div>
                        <h3
                            className={`font-semibold ${
                                event.status === "approved"
                                    ? "text-green-900"
                                    : event.status === "rejected"
                                      ? "text-red-900"
                                      : "text-yellow-900"
                            }`}
                        >
                            Status: {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </h3>
                        <p
                            className={`text-sm ${
                                event.status === "approved"
                                    ? "text-green-700"
                                    : event.status === "rejected"
                                      ? "text-red-700"
                                      : "text-yellow-700"
                            }`}
                        >
                            {event.status === "approved" && "This event has been approved and is live"}
                            {event.status === "rejected" && "This event has been rejected"}
                            {event.status === "pending" &&
                                (isUrgent
                                    ? "⚡ Urgent: Event is starting soon - requires immediate review"
                                    : isPast
                                      ? "⚠️ Warning: Event date has already passed"
                                      : "Waiting for administrator review")}
                        </p>
                        {event.status === "rejected" && event.rejection_reason && (
                            <div className="mt-3 rounded-lg bg-red-100 p-3">
                                <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                                <p className="text-sm text-red-700">{event.rejection_reason}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Event Details */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Basic Information */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h2 className="mb-4 text-lg font-semibold text-slate-900">Event Information</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 text-xl font-bold text-slate-900">{event.title}</h3>
                                {event.summary && (
                                    <div className="mb-3 rounded-lg bg-slate-50 p-3">
                                        <p className="text-sm font-medium text-slate-700">{event.summary}</p>
                                    </div>
                                )}
                                <p className="leading-relaxed text-slate-600">{event.description}</p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <Tag className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <p className="text-sm text-slate-500">Category</p>
                                        <p className="font-medium text-slate-900 capitalize">{event.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <p className="text-sm text-slate-500">Organizer</p>
                                        <p className="font-medium text-slate-900">{event.organizer.full_name}</p>
                                        <p className="text-sm text-slate-500">{event.organizer.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Details */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <p className="text-sm text-slate-500">Mode</p>
                                        <p className="font-medium text-slate-900 capitalize">{event.mode}</p>
                                    </div>
                                </div>
                                {event.note && (
                                    <div className="flex items-start gap-3">
                                        <Info className="mt-0.5 h-5 w-5 text-slate-400" />
                                        <div>
                                            <p className="text-sm text-slate-500">Note</p>
                                            <p className="text-sm text-slate-700">{event.note}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Schedule & Venue */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h2 className="mb-4 text-lg font-semibold text-slate-900">Schedule & Location</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm text-slate-500">Event Date</p>
                                    <p className="font-medium text-slate-900">
                                        {formatter.date(event.start_event, true)} -{" "}
                                        {formatter.date(event.end_event, true)}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {new Date(event.start_event).toLocaleTimeString()} -{" "}
                                        {new Date(event.end_event).toLocaleTimeString()}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        {isPast
                                            ? "Event has ended"
                                            : daysFromNow === 0
                                              ? "Today"
                                              : daysFromNow === 1
                                                ? "Tomorrow"
                                                : daysFromNow > 0
                                                  ? `In ${daysFromNow} days`
                                                  : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm text-slate-500">Venue</p>
                                    <p className="font-medium text-slate-900">{event.venue}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Registration Stats */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                            <Users className="h-5 w-5" />
                            Registration
                        </h3>

                        <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-slate-900">{event.booked_count}</p>
                                <p className="text-sm text-slate-500">
                                    {event.seating ? `of ${event.seating.total_seats} capacity` : "registered"}
                                </p>
                            </div>

                            {event.seating && (
                                <div>
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="text-slate-600">Capacity</span>
                                        <span className="font-medium">{bookedPercentage}%</span>
                                    </div>
                                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className={`h-full transition-all duration-300 ${
                                                bookedPercentage >= 90
                                                    ? "bg-red-500"
                                                    : bookedPercentage >= 70
                                                      ? "bg-yellow-500"
                                                      : "bg-green-500"
                                            }`}
                                            style={{ width: `${Math.min(bookedPercentage, 100)}%` }}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-slate-500">
                                        {event.seating.total_seats - event.booked_count} seats remaining
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Event Metadata */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                            <Info className="h-5 w-5" />
                            Metadata
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Created</span>
                                <span className="font-medium">{new Date(event.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Updated</span>
                                <span className="font-medium">{new Date(event.updated_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Event ID</span>
                                <span className="font-mono font-medium">#{event.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Organizer ID</span>
                                <span className="font-mono font-medium">#{event.organizer_id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewEvent;
