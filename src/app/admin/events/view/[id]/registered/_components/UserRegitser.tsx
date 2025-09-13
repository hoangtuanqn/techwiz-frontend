"use client";
import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Users, Search, Filter, CheckCircle, XCircle, Clock, User, MapPin, Download, MoreVertical } from "lucide-react";
import eventApi from "~/apiRequest/event";
import { ParticipantType } from "~/types/schemaZod/participant.schema";
import { formatter } from "~/utils/format";
const UserRegister = ({ id }: { id: number }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [checkedInFilter, setCheckedInFilter] = useState("all");
    const {
        data: participantsResponse,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["event", id, "participants"],
        queryFn: async () => {
            const response = await eventApi.getRegisteredUsers(id);
            // Check if response follows schema structure
            if (response.data?.status && response.data?.data) {
                return response.data.data; // This should contain pagination meta and data array
            }
            // Fallback for direct array response
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    <p className="text-slate-600">Loading participants...</p>
                </div>
            </div>
        );
    }

    if (error || !participantsResponse) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
                <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
                <h3 className="mb-2 text-lg font-medium text-red-900">Error loading participants</h3>
                <p className="text-red-700">Failed to load participant data. Please try again later.</p>
            </div>
        );
    }

    const participants = Array.isArray(participantsResponse) 
        ? participantsResponse 
        : Array.isArray(participantsResponse?.data) 
        ? participantsResponse.data 
        : [];

    // Filter participants based on search and filters
    const filteredParticipants = participants.filter((participant: ParticipantType) => {
        const matchesSearch =
            participant.user?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            participant.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            participant.seat_no?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || participant.status === statusFilter;
        const matchesCheckedIn =
            checkedInFilter === "all" ||
            (checkedInFilter === "checked_in" && participant.checked_in === 1) ||
            (checkedInFilter === "not_checked_in" && participant.checked_in === 0);

        return matchesSearch && matchesStatus && matchesCheckedIn;
    });

    const stats = {
        total: participants.length,
        confirmed: participants.filter((p: ParticipantType) => p.status === "confirmed").length,
        checkedIn: participants.filter((p: ParticipantType) => p.checked_in === 1).length,
        pending: participants.filter((p: ParticipantType) => p.status === "pending").length,
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "confirmed":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "pending":
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case "cancelled":
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium";
        switch (status) {
            case "confirmed":
                return `${baseClasses} bg-green-100 text-green-800`;
            case "pending":
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case "cancelled":
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Event Participants</h2>
                            <p className="text-slate-600">Manage registered users for this event</p>
                        </div>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                        <Download className="h-4 w-4" />
                        Export List
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Total Registered</p>
                                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Confirmed</p>
                                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Checked In</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.checkedIn}</p>
                            </div>
                            <MapPin className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">Filters</span>
                        {filteredParticipants.length !== participants.length && (
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                                {filteredParticipants.length} of {participants.length}
                            </span>
                        )}
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                        <Download className="h-4 w-4" />
                        Export CSV
                    </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Search */}
                    <div className="sm:col-span-2">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or seat..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 bg-white py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    {/* Check-in Filter */}
                    <select
                        value={checkedInFilter}
                        onChange={(e) => setCheckedInFilter(e.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    >
                        <option value="all">All Check-in</option>
                        <option value="checked_in">Checked In</option>
                        <option value="not_checked_in">Not Checked In</option>
                    </select>
                </div>

                {/* Participants List */}
            <div className="rounded-xl border border-slate-200 bg-white">
                {filteredParticipants.length === 0 ? (
                    <div className="p-8 text-center">
                        <Users className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                        <h3 className="mb-2 text-lg font-medium text-slate-900">No participants found</h3>
                        <p className="text-slate-600">
                            {searchTerm || statusFilter !== "all" || checkedInFilter !== "all"
                                ? "Try adjusting your filters or search terms."
                                : "No one has registered for this event yet."}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-200">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-slate-500">
                            <div className="col-span-4">Participant</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Seat</div>
                            <div className="col-span-2">Registered</div>
                            <div className="col-span-2">Check-in</div>
                        </div>

                        {/* Table Rows */}
                        {filteredParticipants.length > 0 ? (
                            filteredParticipants.map((participant: ParticipantType) => (
                            <div
                                key={participant.id}
                                className="grid grid-cols-12 gap-4 p-4 transition-colors hover:bg-slate-50"
                            >
                                {/* Participant Info */}
                                <div className="col-span-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                        <User className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">{participant.user.full_name}</p>
                                        <p className="text-sm text-slate-500">{participant.user.email}</p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-span-2 flex items-center">
                                    <span className={getStatusBadge(participant.status)}>
                                        {getStatusIcon(participant.status)}
                                        {participant.status}
                                    </span>
                                </div>

                                {/* Seat */}
                                <div className="col-span-2 flex items-center">
                                    <span className="rounded bg-slate-100 px-2 py-1 font-mono text-sm text-slate-700">
                                        {participant.seat_no || "N/A"}
                                    </span>
                                </div>

                                {/* Registration Date */}
                                <div className="col-span-2 flex items-center text-sm text-slate-600">
                                    {participant.registered_on ? formatter.date(participant.registered_on) : "N/A"}
                                </div>

                                {/* Check-in Status */}
                                <div className="col-span-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {participant.checked_in === 1 ? (
                                            <div className="flex items-center gap-1 text-green-600">
                                                <CheckCircle className="h-4 w-4" />
                                                <span className="text-sm">
                                                    {participant.checked_in_at
                                                        ? formatter.date(participant.checked_in_at)
                                                        : "Yes"}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 text-slate-500">
                                                <XCircle className="h-4 w-4" />
                                                <span className="text-sm">Not yet</span>
                                            </div>
                                        )}
                                    </div>
                                    <button className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                        ) : (
                            /* Empty State */
                            <div className="py-12 text-center">
                                <Users className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                                <h3 className="mb-2 text-lg font-medium text-slate-900">
                                    {participants.length === 0 ? "No participants yet" : "No participants found"}
                                </h3>
                                <p className="text-slate-500">
                                    {participants.length === 0 
                                        ? "This event doesn't have any registered participants yet." 
                                        : "Try adjusting your search terms or filters."}
                                </p>
                                {searchTerm || statusFilter !== "all" || checkedInFilter !== "all" ? (
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setStatusFilter("all");
                                            setCheckedInFilter("all");
                                        }}
                                        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        Clear filters
                                    </button>
                                ) : null}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default UserRegister;
