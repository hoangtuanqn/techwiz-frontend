"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Users, Shield, UserCheck, TrendingUp, ChevronRight, Plus } from "lucide-react";
import userAdminApi from "~/apiRequest/admin/user";

export default function RoleOverviewPage() {
    const { data: usersResponse, isLoading } = useQuery({
        queryKey: ["adminUsersOverview"],
        queryFn: async () => {
            const res = await userAdminApi.getUsers(1, 1000); // Get all users for overview
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5,
    });

    const stats = {
        total: usersResponse?.data?.length || 0,
        admins: usersResponse?.data?.filter((u) => u.role === "admin").length || 0,
        organizers: usersResponse?.data?.filter((u) => u.role === "organizer").length || 0,
        users: usersResponse?.data?.filter((u) => u.role === "user").length || 0,
        verified: usersResponse?.data?.filter((u) => u.email_verified_at).length || 0,
        pending: usersResponse?.data?.filter((u) => !u.email_verified_at).length || 0,
    };

    const recentUsers =
        usersResponse?.data
            ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            ?.slice(0, 5) || [];

    if (isLoading) {
        return (
            <div className="mx-auto max-w-7xl p-4 sm:p-6">
                <div className="flex min-h-[400px] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                        <p className="text-slate-600">Loading overview...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Role Management</h1>
                    <p className="mt-1 text-slate-600">Manage user roles and permissions across the platform</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                    Add New User
                </button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                            <div className="text-sm text-slate-600">Total Users</div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-red-100 p-2">
                            <Shield className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
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
                            <div className="text-2xl font-bold text-amber-600">{stats.organizers}</div>
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
                            <div className="text-2xl font-bold text-green-600">{stats.users}</div>
                            <div className="text-sm text-slate-600">Regular Users</div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-emerald-100 p-2">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-emerald-600">{stats.verified}</div>
                            <div className="text-sm text-slate-600">Verified</div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-yellow-100 p-2">
                            <Users className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                            <div className="text-sm text-slate-600">Pending</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Link
                    href="/admin/role/user"
                    className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-3">
                                <div className="rounded-lg bg-green-100 p-2">
                                    <Users className="h-5 w-5 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Manage Users</h3>
                            </div>
                            <p className="text-sm text-slate-600">View and manage regular user accounts</p>
                            <div className="mt-2 text-2xl font-bold text-green-600">{stats.users}</div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                    </div>
                </Link>

                <Link
                    href="/admin/role/organizer"
                    className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-3">
                                <div className="rounded-lg bg-amber-100 p-2">
                                    <UserCheck className="h-5 w-5 text-amber-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Manage Organizers</h3>
                            </div>
                            <p className="text-sm text-slate-600">View and manage event organizer accounts</p>
                            <div className="mt-2 text-2xl font-bold text-amber-600">{stats.organizers}</div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                    </div>
                </Link>

                <Link
                    href="/admin/role/admin"
                    className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-3">
                                <div className="rounded-lg bg-red-100 p-2">
                                    <Shield className="h-5 w-5 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Manage Admins</h3>
                            </div>
                            <p className="text-sm text-slate-600">View and manage administrator accounts</p>
                            <div className="mt-2 text-2xl font-bold text-red-600">{stats.admins}</div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                    </div>
                </Link>
            </div>

            {/* Recent Users */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Recent Users</h2>
                    <Link href="/admin/role/user" className="text-sm text-blue-600 hover:text-blue-700">
                        View all →
                    </Link>
                </div>

                <div className="space-y-4">
                    {recentUsers.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between rounded-lg border border-slate-100 p-4 hover:bg-slate-50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-medium text-white">
                                    {user.full_name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()
                                        .slice(0, 2)}
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-900">{user.full_name}</h3>
                                    <p className="text-sm text-slate-600">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span
                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                                        user.role === "admin"
                                            ? "border-red-200 bg-red-100 text-red-700"
                                            : user.role === "organizer"
                                              ? "border-amber-200 bg-amber-100 text-amber-700"
                                              : "border-green-200 bg-green-100 text-green-700"
                                    }`}
                                >
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                                <Link
                                    href={`/admin/role/${user.id}`}
                                    className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {recentUsers.length === 0 && <div className="py-8 text-center text-slate-500">No users found</div>}
            </div>
        </div>
    );
}
