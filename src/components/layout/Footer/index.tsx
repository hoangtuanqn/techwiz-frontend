"use client";

import React from "react";
import { GraduationCap, Facebook, Twitter, Instagram, MapPin, Mail, Phone, ArrowUp } from "lucide-react";
import { Toaster } from "sonner";

const Footer: React.FC = () => {
    return (
        <footer id="contact" className="border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Logo + intro */}
                    <div>
                        <div className="flex items-center gap-2">
                            <GraduationCap className="h-6 w-6 text-cyan-500" />
                            <span className="text-lg font-semibold">EVENTSPHERE</span>
                        </div>
                        <p className="mt-3 text-sm text-slate-600">
                            A centralized platform for campus events — from discovery to certificates.
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <a
                                href="#"
                                className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="font-semibold">Explore</h4>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-cyan-600">
                                    All Events
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-cyan-600">
                                    Workshops
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-cyan-600">
                                    Seminars
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-cyan-600">
                                    Cultural Nights
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold">Resources</h4>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-cyan-600">
                                    Guides
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-cyan-600">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-cyan-600">
                                    Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-cyan-600">
                                    Policies
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold">Contact</h4>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> 268 Ly Thuong Kiet, District 10
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" /> events@university.edu
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" /> (028) 1234 5678
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 text-sm text-slate-500">
                    <span>© 2025 EventSphere. All rights reserved.</span>
                    <a href="#home" className="inline-flex items-center gap-1 hover:text-cyan-600">
                        <ArrowUp className="h-4 w-4" /> Back to top
                    </a>
                </div>
            </div>
            <Toaster position="top-center" expand={true} richColors duration={5000} />
        </footer>
    );
};

export default Footer;
