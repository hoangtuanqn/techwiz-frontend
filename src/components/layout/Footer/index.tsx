"use client";

import React from "react";
import { GraduationCap, UserPlus, Menu } from "lucide-react";

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-2" aria-label="EventSphere home">
                        <GraduationCap className="h-6 w-6 text-cyan-500" />
                        <span className="text-xl font-semibold tracking-wide">EVENTSPHERE</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
                        <a className="transition hover:text-cyan-600" href="#home">
                            Home
                        </a>
                        <a className="transition hover:text-cyan-600" href="#categories">
                            Categories
                        </a>
                        <a className="transition hover:text-cyan-600" href="#events">
                            Events
                        </a>
                        <a className="transition hover:text-cyan-600" href="#features">
                            Features
                        </a>
                        <a className="transition hover:text-cyan-600" href="#blog">
                            Blog
                        </a>
                        <a className="transition hover:text-cyan-600" href="#contact">
                            Contact
                        </a>
                    </nav>

                    {/* Desktop Auth */}
                    <div className="hidden items-center gap-3 md:flex">
                        <a href="#" className="text-cyan-600 hover:text-cyan-700">
                            Login
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-2 text-white shadow transition hover:opacity-90"
                        >
                            <UserPlus className="h-4 w-4" /> Register
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        id="btnMobile"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 md:hidden"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div id="mobileNav" className="hidden border-t border-slate-200 bg-white md:hidden">
                <nav className="flex flex-col gap-2 px-4 py-3">
                    <a className="py-2" href="#home">
                        Home
                    </a>
                    <a className="py-2" href="#categories">
                        Categories
                    </a>
                    <a className="py-2" href="#events">
                        Events
                    </a>
                    <a className="py-2" href="#features">
                        Features
                    </a>
                    <a className="py-2" href="#blog">
                        Blog
                    </a>
                    <a className="py-2" href="#contact">
                        Contact
                    </a>
                    <div className="my-2 h-px bg-slate-200"></div>
                    <a className="py-2 text-cyan-600" href="#">
                        Login
                    </a>
                    <a className="inline-flex items-center gap-2 py-2" href="#">
                        <UserPlus className="h-4 w-4" /> Register
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
