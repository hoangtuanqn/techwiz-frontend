"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Users, Clock, CheckCircle, XCircle, AlertCircle, Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatter } from "~/utils/format";

export default function OrganizerEventDetailPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState<'details' | 'participants' | 'waitlist' | 'supporters'>('details');

    // Mock data
    const mockEvent = {
        id: parseInt(params.id),
        title: "Tech Conference 2024",
        description: "Annual technology conference featuring the latest innovations",
        category: "Technology",
        venue: "Convention Center",
        start_event: "2024-12-15T09:00:00Z",
        end_event: "2024-12-15T17:00:00Z",
        status: "approved" as const,
        capacity: 200,
        booked_count: 156,
        mode: "onsite" as const,
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            approved: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "Approved" },
            pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800", label: "Pending" },
            rejected: { icon: XCircle, color: "bg-red-100 text-red-800", label: "Rejected" },
            cancelled: { icon: AlertCircle, color: "bg-gray-100 text-gray-800", label: "Cancelled" }
        };

        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${config.color}`}>
                <Icon className="h-4 w-4" />
                {config.label}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/organizer/events" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Events
                </Link>
            </div>

            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-3xl font-bold text-slate-900">{mockEvent.title}</h1>
                        {getStatusBadge(mockEvent.status)}
                    </div>
                    <p className="text-lg text-slate-600">{mockEvent.description}</p>
                </div>
                <Link
                    href={`/organizer/events/${mockEvent.id}/edit`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#06b6d4] px-4 py-2 text-sm font-medium text-white hover:bg-[#0891b2]"
                >
                    <Edit className="h-4 w-4" />
                    Edit Event
                </Link>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    {[
                        { id: 'details', label: 'Event Details', icon: Calendar },
                        { id: 'participants', label: 'Participants (3)', icon: Users },
                        { id: 'waitlist', label: 'Waitlist (2)', icon: Users },
                        { id: 'supporters', label: 'Supporters (2)', icon: Users },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                    activeTab === tab.id
                                        ? "border-[#06b6d4] text-[#06b6d4]"
                                        : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
                {activeTab === 'details' && (
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-semibold text-slate-900">Event Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Date & Time</p>
                                            <p className="text-sm text-slate-600">
                                                {formatter.date(mockEvent.start_event)} - {formatter.date(mockEvent.end_event)}
                                            </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Venue</p>
                                        <p className="text-sm text-slate-600">{mockEvent.venue}</p>
                                        <p className="text-xs text-slate-500 capitalize">{mockEvent.mode}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="h-5 w-5 text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Capacity</p>
                                        <p className="text-sm text-slate-600">
                                            {mockEvent.booked_count} / {mockEvent.capacity} participants
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'participants' && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="mb-4 text-lg font-semibold text-slate-900">Event Participants</h3>
                        <p className="text-sm text-slate-600">Manage and view all registered participants</p>
                    </div>
                )}

                {activeTab === 'waitlist' && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="mb-4 text-lg font-semibold text-slate-900">Waitlist</h3>
                        <p className="text-sm text-slate-600">People waiting for available spots</p>
                    </div>
                )}

                {activeTab === 'supporters' && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="mb-4 text-lg font-semibold text-slate-900">Event Supporters</h3>
                        <p className="text-sm text-slate-600">Volunteers and supporters helping with this event</p>
                    </div>
                )}
            </div>
        </div>
    );
}