"use client";
import React from "react";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

const Cta = () => {
    return (
        <section className="py-10 sm:py-14 md:py-16">
            <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
                <div
                    className="flex flex-col items-center justify-between gap-4 sm:gap-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow md:flex-row md:p-12"
                    data-aos="fade-up"
                >
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-bold">Ready to join the next event?</h3>
                        <p className="mt-2 text-slate-600 text-sm sm:text-base">Create your account and register in seconds.</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-slate-50 text-sm sm:text-base"
                        >
                            <LogIn className="h-4 w-4" /> Login
                        </Link>
                        <Link
                            href="/auth/register"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 sm:px-5 py-2.5 sm:py-3 text-white shadow hover:opacity-90 text-sm sm:text-base"
                        >
                            <UserPlus className="h-4 w-4" /> Register
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cta;
