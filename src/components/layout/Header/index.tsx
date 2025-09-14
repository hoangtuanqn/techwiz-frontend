"use client";

import React from "react";
import { GraduationCap, UserPlus, Menu, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ActionHeader from "./ActionHeader";
 
const NAV = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About Us" },
    { href: "/calendar", label: "Calendar" },
    { href: "/gallery", label: "Gallery" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
}

const Header: React.FC = () => {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);

    const linkCls = (href: string) => {
        const active = isActive(pathname, href);
        if (active) return "font-semibold text-cyan-600";

        if (href === "/") return "text-slate-900 hover:text-cyan-600";

        return "text-slate-700 hover:text-cyan-600";
    };

    return (
    <header className="sticky top-0 z-50 border-b border-slate-300 bg-white">
            <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2" aria-label="EventSphere home">
                        <GraduationCap className="h-6 w-6 text-cyan-500" />
                        <span className="text-xl font-semibold tracking-wide">EVENTSPHERE</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
                        {NAV.map((item) => (
                            <Link key={item.href} className={`transition ${linkCls(item.href)}`} href={item.href}>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right-side Icons (desktop only) */}
                    <div className="hidden items-center gap-4 md:flex">
                        <ActionHeader />
                        <Link href="#" className="relative text-slate-600 hover:text-cyan-600" title="Notifications">
                            <Bell className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setOpen((s) => !s)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 md:hidden"
                        aria-label="Open menu"
                        aria-expanded={open}
                        aria-controls="mobileNav"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Mobile Drawer - responsive & animated */}
            <div
                id="mobileNav"
                className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
                {/* Overlay chỉ nhận sự kiện ngoài menu */}
                <button
                    className="fixed inset-0 w-full h-full bg-black/40 cursor-default z-0"
                    style={{ border: 'none' }}
                    aria-label="Close menu overlay"
                    tabIndex={-1}
                    onClick={() => setOpen(false)}
                />
                <div
                    className={`absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white border-l-2 border-slate-300 shadow-2xl transition-transform duration-300 z-10 ${open ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <nav className="flex flex-col gap-1 px-4 py-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-semibold text-cyan-600">Menu</span>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 rounded-full hover:bg-slate-100"
                                aria-label="Close menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {NAV.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`py-3 px-2 rounded-lg text-base transition ${linkCls(item.href)}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="my-2 h-px bg-slate-200"></div>
                        <Link className="py-3 px-2 rounded-lg text-cyan-600 text-base" href="/auth/login" onClick={() => setOpen(false)}>
                            Login
                        </Link>
                        <Link
                            className="inline-flex items-center gap-2 py-3 px-2 rounded-lg text-base"
                            href="/auth/register"
                            onClick={() => setOpen(false)}
                        >
                            <UserPlus className="h-4 w-4" /> Register
                        </Link>
                    </nav>
                </div>
                {/* Overlay click closes menu */}
                <button
                    className="absolute inset-0 w-full h-full cursor-default"
                    style={{ background: 'transparent', border: 'none' }}
                    aria-label="Close menu overlay"
                    tabIndex={-1}
                    onClick={() => setOpen(false)}
                />
            </div>
        </header>
    );
};
export default Header;
