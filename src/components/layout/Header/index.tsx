"use client";

import React from "react";
import { GraduationCap, User, ChevronDown, Menu, X } from "lucide-react";

const Header: React.FC = () => {
    const [openMobile, setOpenMobile] = React.useState(false);

    // Đóng menu mobile khi đổi kích thước vượt md (tránh kẹt trạng thái)
    React.useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setOpenMobile(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-2" aria-label="EventSphere home">
                        <GraduationCap className="h-6 w-6 text-[#06b6d4]" />
                        <span className="text-xl font-semibold tracking-wide">EVENTSPHERE</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
                        <a className="transition hover:text-[#06b6d4]" href="#home">
                            Home
                        </a>

                        <div className="group relative">
                            <button
                                className="inline-flex items-center gap-1 transition hover:text-[#06b6d4]"
                                aria-haspopup="true"
                                aria-expanded="false"
                                aria-controls="events-menu"
                                type="button"
                            >
                                Events <ChevronDown className="h-4 w-4" />
                            </button>
                            <div
                                id="events-menu"
                                role="menu"
                                className="shadow-soft pointer-events-none invisible absolute top-full left-0 mt-3 w-56 rounded-xl border border-slate-200 bg-white p-2 opacity-0 transition group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
                            >
                                <a className="block rounded-lg px-3 py-2 hover:bg-slate-50" href="#">
                                    All Events
                                </a>
                                <a className="block rounded-lg px-3 py-2 hover:bg-slate-50" href="#">
                                    Workshops
                                </a>
                                <a className="block rounded-lg px-3 py-2 hover:bg-slate-50" href="#">
                                    Seminars
                                </a>
                                <a className="block rounded-lg px-3 py-2 hover:bg-slate-50" href="#">
                                    Cultural
                                </a>
                            </div>
                        </div>

                        <a className="transition hover:text-[#06b6d4]" href="#categories">
                            Categories
                        </a>
                        <a className="transition hover:text-[#06b6d4]" href="#roles">
                            Roles
                        </a>
                        <a className="transition hover:text-[#06b6d4]" href="#blog">
                            Blog
                        </a>
                        <a className="transition hover:text-[#06b6d4]" href="#about">
                            About
                        </a>
                        <a className="transition hover:text-[#06b6d4]" href="#contact">
                            Contact
                        </a>
                    </nav>

                    {/* Auth (desktop) */}
                    <div className="hidden items-center gap-4 md:flex">
                        <a href="#" className="text-[#06b6d4] hover:opacity-80">
                            Login
                        </a>
                        <a
                            href="#"
                            className="shadow-soft inline-flex items-center gap-2 rounded-xl bg-[#06b6d4] px-4 py-2 text-white hover:opacity-90"
                        >
                            <User className="h-4 w-4" /> Register
                        </a>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        id="btnMobile"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 md:hidden"
                        aria-label={openMobile ? "Close menu" : "Open menu"}
                        aria-expanded={openMobile}
                        aria-controls="mobileNav"
                        onClick={() => setOpenMobile((v) => !v)}
                        type="button"
                    >
                        {openMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div
                id="mobileNav"
                className={`${openMobile ? "block" : "hidden"} border-t border-slate-200 bg-white md:hidden`}
            >
                <nav className="flex flex-col gap-2 px-4 py-3" aria-label="Mobile">
                    <a className="py-2" href="#home" onClick={() => setOpenMobile(false)}>
                        Home
                    </a>
                    <a className="py-2" href="#" onClick={() => setOpenMobile(false)}>
                        Events
                    </a>
                    <a className="py-2" href="#categories" onClick={() => setOpenMobile(false)}>
                        Categories
                    </a>
                    <a className="py-2" href="#roles" onClick={() => setOpenMobile(false)}>
                        Roles
                    </a>
                    <a className="py-2" href="#blog" onClick={() => setOpenMobile(false)}>
                        Blog
                    </a>
                    <a className="py-2" href="#about" onClick={() => setOpenMobile(false)}>
                        About
                    </a>
                    <a className="py-2" href="#contact" onClick={() => setOpenMobile(false)}>
                        Contact
                    </a>

                    <div className="my-2 h-px bg-slate-200" />

                    <a className="py-2 text-[#06b6d4]" href="#" onClick={() => setOpenMobile(false)}>
                        Login
                    </a>
                    <a className="inline-flex items-center gap-2 py-2" href="#" onClick={() => setOpenMobile(false)}>
                        <User className="h-4 w-4" /> Register
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
