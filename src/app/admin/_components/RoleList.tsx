"use client";

import { useMemo, useState } from "react";
import { Search, Pencil, Filter, Users, UserCheck, Shield, ChevronDown } from "lucide-react";
import Link from "next/link";
import { PaginationNav } from "~/components/Pagination";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { useRouter, useSearchParams } from "next/navigation";

export type RoleRow = {
    id: number | string;
    name: string;
    email: string;
    role: "User" | "Organizer" | "Admin" | string;
    department?: string;
    joinDate?: string;
    status?: "active" | "inactive" | "pending";
};

export default function RoleList({
    title,
    subtitle,
    rows,
    url,
    total,
}: {
    title: string;
    subtitle?: string;
    rows: RoleRow[];
    url: string;
    total: number;
}) {
    const [q, setQ] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [showFilters, setShowFilters] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { page: _page } = useGetSearchQuery(["page"] as const);

    const filtered = useMemo(() => {
        let result = rows;
        
        // Text search
        const searchTerm = q.trim().toLowerCase();
        if (searchTerm) {
            result = result.filter(
                (r) =>
                    r.name.toLowerCase().includes(searchTerm) ||
                    r.email.toLowerCase().includes(searchTerm) ||
                    r.department?.toLowerCase().includes(searchTerm) ||
                    String(r.id).toLowerCase().includes(searchTerm),
            );
        }

        // Role filter
        if (roleFilter !== "all") {
            result = result.filter((r) => r.role.toLowerCase() === roleFilter.toLowerCase());
        }

        // Status filter
        if (statusFilter !== "all") {
            result = result.filter((r) => r.status === statusFilter);
        }

        return result;
    }, [q, rows, roleFilter, statusFilter]);

    const roleStats = useMemo(() => {
        const stats = {
            total: rows.length,
            admin: rows.filter(r => r.role === "Admin").length,
            organizer: rows.filter(r => r.role === "Organizer").length,
            user: rows.filter(r => r.role === "User").length,
        };
        return stats;
    }, [rows]);

    const _handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${url}?${params.toString()}`);
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
                    {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
                </div>

                {/* Search & Filter Toggle */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {/* Search */}
                    <div className="relative w-full sm:w-80">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder={`Search ${title.toLowerCase()}...`}
                            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        <Filter className="h-4 w-4" />
                        Filters
                        <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Filters */}
            {showFilters && (
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Role Filter */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="organizer">Organizer</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>

                        {/* Clear Filters */}
                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setRoleFilter("all");
                                    setStatusFilter("all");
                                    setQ("");
                                }}
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">{roleStats.total}</div>
                            <div className="text-sm text-slate-600">Total</div>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-red-100 p-2">
                            <Shield className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-red-600">{roleStats.admin}</div>
                            <div className="text-sm text-slate-600">Admins</div>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-amber-100 p-2">
                            <UserCheck className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-amber-600">{roleStats.organizer}</div>
                            <div className="text-sm text-slate-600">Organizers</div>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-green-100 p-2">
                            <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">{roleStats.user}</div>
                            <div className="text-sm text-slate-600">Users</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                <span className="text-sm text-slate-600">
                    Showing <span className="font-medium">{filtered.length}</span> of <span className="font-medium">{rows.length}</span> results
                </span>
                {(roleFilter !== "all" || statusFilter !== "all" || q) && (
                    <span className="text-sm text-blue-600">Filtered results</span>
                )}
            </div>

            {/* Users Grid */}
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((user) => (
                    <div
                        key={user.id}
                        className="group overflow-hidden rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-blue-200"
                    >
                        {/* User Header */}
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-medium text-white">
                                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-semibold text-slate-900 group-hover:text-blue-600">
                                        {user.name}
                                    </h3>
                                    <p className="text-xs text-slate-500">ID: {user.id}</p>
                                </div>
                            </div>
                            <RoleBadge role={user.role} />
                        </div>

                        {/* User Info */}
                        <div className="mb-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <span className="text-slate-400">✉</span>
                                <span className="truncate">{user.email}</span>
                            </div>
                            {user.department && (
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <span className="text-slate-400">🏢</span>
                                    <span className="truncate">{user.department}</span>
                                </div>
                            )}
                            {user.joinDate && (
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <span className="text-slate-400">📅</span>
                                    <span>{user.joinDate}</span>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div>
                                {user.status && (
                                    <StatusBadge status={user.status} />
                                )}
                            </div>
                            <Link
                                href={`/admin/role/${user.id}`}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                aria-label={`Edit ${user.name}`}
                            >
                                <Pencil className="h-4 w-4" />
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-8 sm:p-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                        <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-slate-900">No users found</h3>
                    <p className="text-slate-500 mb-4">
                        {q || roleFilter !== "all" || statusFilter !== "all" 
                            ? "Try adjusting your search criteria or filters." 
                            : "No users available."}
                    </p>
                    {(q || roleFilter !== "all" || statusFilter !== "all") && (
                        <button
                            onClick={() => {
                                setQ("");
                                setRoleFilter("all");
                                setStatusFilter("all");
                            }}
                            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            )}

            {/* Pagination */}
            {Math.ceil(total / 20) > 1 && (
                <div className="flex justify-center">
                    <PaginationNav 
                        totalPages={Math.ceil(total / 20)} 
                        basePath={url}
                    />
                </div>
            )}
        </div>
    );
}

function RoleBadge({ role }: { role: string }) {
    const variant =
        role === "Admin"
            ? "bg-red-100 text-red-700 border-red-200"
            : role === "Organizer"
              ? "bg-amber-100 text-amber-700 border-amber-200"
              : "bg-green-100 text-green-700 border-green-200";

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${variant}`}>
            {role}
        </span>
    );
}

function StatusBadge({ status }: { status: string }) {
    const variant =
        status === "active"
            ? "bg-green-100 text-green-700 border-green-200"
            : status === "inactive"
              ? "bg-gray-100 text-gray-700 border-gray-200"
              : "bg-yellow-100 text-yellow-700 border-yellow-200";

    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${variant}`}>
            {status}
        </span>
    );
}