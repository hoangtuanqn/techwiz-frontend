"use client";

import React from "react";
import Link from "next/link";

import { GraduationCap } from "lucide-react";
import FormLogin from "./_components/FormLogin";

const LoginPage: React.FC = () => {
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
                        <h1 className="text-2xl font-bold">Welcome back</h1>
                        <p className="mt-1 text-sm text-slate-600">Log in to manage and join events.</p>
                        <FormLogin />

                        {/* Footer hint */}
                        <p className="mt-6 text-center text-sm text-slate-600">
                            Don’t have an account?{" "}
                            <Link href="/auth/register" className="font-medium text-cyan-600 hover:text-cyan-700">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Legal / tiny note */}
                <p className="mt-4 text-center text-xs text-slate-500">
                    By logging in, you agree to our{" "}
                    <a href="/policies" className="underline underline-offset-2 hover:text-slate-700">
                        Terms & Policies
                    </a>
                    .
                </p>
            </div>
        </main>
    );
};

export default LoginPage;
