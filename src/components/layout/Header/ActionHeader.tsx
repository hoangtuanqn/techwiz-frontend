"use client";
import { UserPlus, User, Settings, LogOut, ChevronDown, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAuth } from "~/hooks/useAuth";

const ActionHeader = () => {
    const { user, logout } = useAuth();

    return (
        <div className="group relative">
            {user ? (
                <div className="relative">
                    <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-cyan-600">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white">
                            <User className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{user.full_name}</span>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    <div className="invisible absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        <div className="p-2">
                            <div className="mb-2 border-b border-slate-100 pb-2">
                                <div className="px-3 py-2 text-sm text-slate-500">Signed in as</div>
                                <div className="px-3 py-1 text-sm font-medium text-slate-900">{user.email}</div>
                            </div>

                            <Link
                                href="/profile"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-cyan-600"
                            >
                                <User className="h-4 w-4" />
                                Profile
                            </Link>

                            <Link
                                href="/settings"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-cyan-600"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>

                            {user.role === "admin" && (
                                <Link
                                    href="/admin"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-cyan-600"
                                >
                                    <Shield className="h-4 w-4" />
                                    Admin Panel
                                </Link>
                            )}

                            <hr className="my-2 border-slate-200" />

                            <button
                                onClick={logout}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <Link
                        href="/auth/login"
                        className="rounded-lg px-4 py-2 text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-cyan-600"
                    >
                        Login
                    </Link>
                    <Link
                        href="/auth/register"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-2.5 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                    >
                        <UserPlus className="h-4 w-4" />
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ActionHeader;
