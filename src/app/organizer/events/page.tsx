"use client";

import React, { useState } from "react";
import { Search, Eye, Edit, Users, Clock, CheckCircle, XCircle, AlertCircle, Calendar } from "lucide-react";
import { formatter } from "~/utils/format";
import { PaginationNav } from "~/components/Pagination";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { organizerApi, OrganizerEvent } from "~/apiRequest/organizer";
import { useSearchParams } from "next/navigation";

interface Event {
    id: number;
    title: string;
    description: string;
    category: string;
    venue: string;
    start_event: string;
    end_event: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    rejection_reason?: string;
    capacity: number;
    booked_count: number;
    thumbnail?: string;
}

export default function OrganizerEventsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = 12;

    // Fetch events from API
    const { data: eventsResponse, isLoading } = useQuery({
        queryKey: ['organizer-events', statusFilter, currentPage],
        queryFn: async () => {
            const response = await organizerApi.getMyEvents({ 
                status: statusFilter === "all" ? undefined : statusFilter,
                page: currentPage,
                limit: itemsPerPage
            });
            return response.data;
        },
    });

    const events = eventsResponse?.data?.data || [];

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            approved: { 
                icon: CheckCircle, 
                color: "bg-green-100 text-green-800 border-green-200", 
                label: "Approved" 
            },
            pending: { 
                icon: Clock, 
                color: "bg-yellow-100 text-yellow-800 border-yellow-200", 
                label: "Pending" 
            },
            rejected: { 
                icon: XCircle, 
                color: "bg-red-100 text-red-800 border-red-200", 
                label: "Rejected" 
            },
            cancelled: { 
                icon: AlertCircle, 
                color: "bg-gray-100 text-gray-800 border-gray-200", 
                label: "Cancelled" 
            }
        };

        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
                <Icon className="h-3 w-3" />
                {config.label}
            </span>
        );
    };

    const filteredEvents = Array.isArray(events) ? events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.venue.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesSearch;
    }) : [];

    const totalPages = eventsResponse?.data?.last_page || 1;

    const statusCounts = {
        all: eventsResponse?.data?.total || 0,
        approved: Array.isArray(events) ? events.filter(e => e.status === 'approved').length : 0,
        pending: Array.isArray(events) ? events.filter(e => e.status === 'pending').length : 0,
        rejected: Array.isArray(events) ? events.filter(e => e.status === 'rejected').length : 0,
        cancelled: Array.isArray(events) ? events.filter(e => e.status === 'cancelled').length : 0,
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06b6d4] mx-auto"></div>
                    <p className="mt-4 text-slate-600">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Event Management</h1>
                    <p className="text-slate-600">Manage your events and view their status</p>
                </div>
                <Link
                    href="/organizer/events/create"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#06b6d4] px-4 py-2 text-sm font-medium text-white hover:bg-[#0891b2]"
                >
                    <span>+</span>
                    Create Event
                </Link>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex gap-2">
                {Object.entries(statusCounts).map(([status, count]) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            statusFilter === status
                                ? "bg-[#06b6d4] text-white"
                                : "bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-1 focus:ring-[#06b6d4]"
                />
            </div>

            {/* Events Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event) => (
                    <div key={event.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        {/* Event Image */}
                        <div className="mb-4 h-48 overflow-hidden rounded-lg bg-slate-100">
                            {event.thumbnail ? (
                                <img
                                    src={event.thumbnail}
                                    alt={event.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-slate-400">
                                    <Calendar className="h-12 w-12" />
                                </div>
                            )}
                        </div>

                        {/* Event Info */}
                        <div className="space-y-3">
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                                    {event.title}
                                </h3>
                                {getStatusBadge(event.status)}
                            </div>

                            <p className="text-sm text-slate-600 line-clamp-2">
                                {event.description}
                            </p>

                            <div className="space-y-2 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatter.date(event.start_event)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>{event.booked_count} / {event.capacity} participants</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Category:</span>
                                    <span>{event.category}</span>
                                </div>
                            </div>

                            {event.rejection_reason && (
                                <div className="rounded-lg bg-red-50 p-3">
                                    <p className="text-sm text-red-800">
                                        <strong>Reason:</strong> {event.rejection_reason}
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 pt-2">
                                <Link
                                    href={`/organizer/events/${event.id}`}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                                >
                                    <Eye className="h-4 w-4" />
                                    View Details
                                </Link>
                                <Link
                                    href={`/organizer/events/${event.id}/edit`}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#06b6d4] px-3 py-2 text-sm font-medium text-white hover:bg-[#0891b2]"
                                >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <PaginationNav
                    totalPages={totalPages}
                    basePath="/organizer/events"
                    queryKey="page"
                />
            )}

            {/* Empty State */}
            {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                    <Calendar className="mx-auto h-12 w-12 text-slate-400" />
                    <h3 className="mt-4 text-lg font-medium text-slate-900">No events found</h3>
                    <p className="mt-2 text-slate-600">
                        {searchTerm || statusFilter !== "all" 
                            ? "Try adjusting your search or filter criteria."
                            : "Get started by creating your first event."
                        }
                    </p>
                </div>
            )}
        </div>
    );
}
