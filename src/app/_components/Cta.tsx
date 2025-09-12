"use client";
import React from "react";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

const Cta = () => {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow md:flex-row md:p-12"
                    data-aos="fade-up"
                >
                    <div>
                        <h3 className="text-3xl font-bold">Ready to join the next event?</h3>
                        <p className="mt-2 text-slate-600">Create your account and register in seconds.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-50"
                        >
                            <LogIn className="h-4 w-4" /> Login
                        </Link>
                        <Link
                            href="/auth/register"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-5 py-3 text-white shadow hover:opacity-90"
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
