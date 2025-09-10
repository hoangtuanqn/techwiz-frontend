"use client";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAuth } from "~/hooks/useAuth";

const ActionHeader = () => {
    const { user, logout } = useAuth();

    return (
        <div className="group relative">
            {user ? (
                <div className="relative">
                    <button className="flex items-center gap-1 py-2 text-cyan-600 hover:text-cyan-700">
                        {user.full_name}
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div className="invisible absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        <div className="py-1">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Profile
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Settings
                            </a>
                            <hr className="my-1" />
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={logout}
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="hidden items-center gap-3 md:flex">
                    <Link href="/auth/login" className="text-cyan-600 hover:text-cyan-700">
                        Login
                    </Link>
                    <Link
                        href="/auth/register"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-2 text-white shadow transition hover:opacity-90"
                    >
                        <UserPlus className="h-4 w-4" /> Register
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ActionHeader;
