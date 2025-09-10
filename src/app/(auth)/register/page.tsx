"use client";

import React from "react";
import Link from "next/link";
import { Mail, IdCard, ArrowLeft, UserPlus } from "lucide-react";

export default function RegisterPage() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = String(form.get("email") || "");
        const studentId = String(form.get("studentId") || "");
        const password = String(form.get("password") || "");
        // TODO: Gọi API register của bạn
        console.log({ email, studentId, password });
    }

    return (
        <main className="min-h-[calc(100svh)] bg-slate-50">
            <div className="mx-auto flex min-h-[calc(100svh)] w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
                <section className="w-full max-w-md">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                        <span className="text-sm text-slate-500">EventSphere</span>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-semibold">Register</h1>
                            <p className="mt-1 text-sm text-slate-600">Create your account to join campus events.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        inputMode="email"
                                        placeholder="you@example.edu"
                                        required
                                        className="w-full rounded-xl border border-slate-300 bg-white py-3 pr-3 pl-10 text-slate-900 placeholder-slate-400 shadow-xs ring-0 transition outline-none focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/30"
                                    />
                                </div>
                            </div>

                            {/* Student ID */}
                            <div>
                                <label htmlFor="studentId" className="mb-1 block text-sm font-medium text-slate-700">
                                    Student ID
                                </label>
                                <div className="relative">
                                    <IdCard className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="studentId"
                                        name="studentId"
                                        type="text"
                                        placeholder="e.g. 22123456"
                                        required
                                        className="w-full rounded-xl border border-slate-300 bg-white py-3 pr-3 pl-10 text-slate-900 placeholder-slate-400 shadow-xs ring-0 transition outline-none focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/30"
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#06b6d4] px-4 py-3 font-medium text-white shadow-sm transition hover:opacity-90 focus:ring-2 focus:ring-[#06b6d4]/30 focus:outline-none"
                            >
                                <UserPlus className="h-4 w-4" />
                                Register
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-center text-sm text-slate-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[#06b6d4] hover:opacity-90">
                                Sign in
                            </Link>
                        </div>
                    </div>

                    {/* Fine print */}
                    <p className="mt-4 text-center text-xs text-slate-500">
                        By registering, you agree to our{" "}
                        <Link href="/policies" className="underline underline-offset-2">
                            policies
                        </Link>
                        .
                    </p>
                </section>
            </div>
        </main>
    );
}
