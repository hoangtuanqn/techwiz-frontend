"use client";

import React, { useState } from "react";
import { Mail, IdCard, UserPlus, GraduationCap } from "lucide-react";
import Link from "next/link";

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [roll, setRoll] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: call API here
        alert(`Registered:\nEmail: ${email}\nRoll number: ${roll}`);
    };

    return (
        <main className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-cyan-50 to-fuchsia-50 px-4">
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="mb-6 flex items-center justify-center gap-2">
                    <GraduationCap className="h-7 w-7 text-cyan-600" />
                    <span className="text-xl font-semibold tracking-wide">EVENTSPHERE</span>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow">
                    <div className="p-6 md:p-8">
                        <h1 className="text-2xl font-bold">Create your account</h1>
                        <p className="mt-1 text-sm text-slate-600">Join and register for events in seconds.</p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-3 pl-10 outline-none focus:ring-2 focus:ring-cyan-300"
                                    />
                                </div>
                            </div>

                            {/* Roll number */}
                            <div>
                                <label htmlFor="roll" className="mb-1 block text-sm font-medium">
                                    Roll number
                                </label>
                                <div className="relative">
                                    <IdCard className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="roll"
                                        type="text"
                                        required
                                        value={roll}
                                        onChange={(e) => setRoll(e.target.value)}
                                        placeholder="e.g. SE2005-12345"
                                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-3 pl-10 outline-none focus:ring-2 focus:ring-cyan-300"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-slate-500">
                                    Use your student roll number as provided by the faculty.
                                </p>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-3 font-medium text-white shadow hover:opacity-95"
                            >
                                <UserPlus className="h-4 w-4" />
                                Register
                            </button>
                        </form>

                        {/* Footer hint */}
                        <p className="mt-6 text-center text-sm text-slate-600">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="font-medium text-cyan-600 hover:text-cyan-700">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Legal / tiny note */}
                <p className="mt-4 text-center text-xs text-slate-500">
                    By registering, you agree to our{" "}
                    <a href="/policies" className="underline underline-offset-2 hover:text-slate-700">
                        Terms & Policies
                    </a>
                    .
                </p>
            </div>
        </main>
    );
};

export default RegisterPage;
