"use client";

import React, { useEffect, useState } from "react";

import { GraduationCap, Facebook, Twitter, Instagram, MapPin, Mail, Phone, ArrowUp } from "lucide-react";
import { Toaster } from "sonner";
import ChatBotAI from "~/components/ChatBotAI";
import Link from "next/link";

const Footer: React.FC = () => {
    const [showScroll, setShowScroll] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setShowScroll(window.scrollY > 300); // Hiển thị khi cuộn xuống 300px
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            {showScroll && (
                <div className="fixed right-4 bottom-4 z-50">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg transition hover:bg-cyan-700"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="h-5 w-5" />
                    </button>
                </div>
            )}
            <footer
                id="contact"
                className="border-t border-slate-800 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 text-slate-100"
            >
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="grid gap-12 md:grid-cols-4">
                        {/* Logo + intro */}
                        <div>
                            <div className="flex items-center gap-3">
                                <GraduationCap className="h-8 w-8 text-cyan-400 drop-shadow" />
                                <span className="text-2xl font-bold tracking-wide text-cyan-300">EVENTSPHERE</span>
                            </div>
                            <p className="mt-4 text-base leading-relaxed text-slate-300">
                                Discover, join, and celebrate campus events. Your gateway to vibrant student life and
                                achievements.
                            </p>
                            <div className="mt-6 flex items-center gap-4">
                                <a
                                    href="#"
                                    className="rounded-full bg-slate-800 p-2 transition hover:bg-cyan-600"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-5 w-5 text-cyan-300" />
                                </a>
                                <a
                                    href="#"
                                    className="rounded-full bg-slate-800 p-2 transition hover:bg-cyan-600"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-5 w-5 text-cyan-300" />
                                </a>
                                <a
                                    href="#"
                                    className="rounded-full bg-slate-800 p-2 transition hover:bg-cyan-600"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-5 w-5 text-cyan-300" />
                                </a>
                            </div>
                        </div>

                        {/* Explore */}
                        <div>
                            <h4 className="mb-3 text-lg font-semibold text-cyan-200">Explore</h4>
                            <ul className="space-y-3 text-base">
                                <li>
                                    <Link href="/events" className="transition hover:text-cyan-400">
                                        All Events
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/calendar" className="transition hover:text-cyan-400">
                                        Calendar
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="transition hover:text-cyan-400">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/gallery" className="transition hover:text-cyan-400">
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sitemap" className="transition hover:text-cyan-400">
                                        Site Map
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="mb-3 text-lg font-semibold text-cyan-200">Resources</h4>
                            <ul className="space-y-3 text-base">
                                <li>
                                    <Link href="/about" className="transition hover:text-cyan-400">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="transition hover:text-cyan-400">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="transition hover:text-cyan-400">
                                        Support
                                    </Link>
                                </li>
                                <li>
                                    {/* Trong /app/about/page.tsx nhớ đặt id="policies" cho anchor này nếu cần */}
                                    <Link href="/policies" className="transition hover:text-cyan-400">
                                        Policies
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="mb-3 text-lg font-semibold text-cyan-200">Contact</h4>
                            <ul className="space-y-4 text-base">
                                <li className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-cyan-400" />
                                    <span>268 Ly Thuong Kiet, District 10</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-cyan-400" />
                                    <a href="mailto:events@university.edu" className="transition hover:text-cyan-400">
                                        events@university.edu
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-cyan-400" />
                                    <a href="tel:+842812345678" className="transition hover:text-cyan-400">
                                        (028) 1234 5678
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-8 text-sm text-slate-400 md:flex-row">
                        <span>
                            © 2025 <span className="font-semibold text-cyan-300">EventSphere</span>. All rights
                            reserved.
                        </span>
                    </div>
                </div>
                <Toaster position="top-center" expand={true} richColors duration={5000} />
            </footer>
            <ChatBotAI />
        </>
    );
};

export default Footer;
