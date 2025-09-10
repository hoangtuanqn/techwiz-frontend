"use client";
import {
    ArrowRight,
    Building2,
    Calendar,
    Camera,
    CheckCircle2,
    Clock,
    Coffee,
    FileText,
    IdCard,
    MapPin,
    Music4,
    TicketIcon,
    Timer,
    Users,
} from "lucide-react";
import React from "react";

const UpcomingEvents = () => {
    return (
        <section id="events" className="py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between">
                    <h2 className="text-3xl font-bold" data-aos="fade-up">
                        Upcoming Events
                    </h2>
                    <a
                        href="#"
                        className="inline-flex items-center gap-1 text-cyan-600"
                        data-aos="fade-up"
                        data-aos-delay="30"
                    >
                        Browse events <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Event 1 */}
                    <article
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow transition hover:shadow-md"
                        data-aos="fade-up"
                    >
                        <img
                            className="h-44 w-full object-cover"
                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop"
                            alt="Hackathon"
                        />
                        <div className="p-5">
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                <span className="inline-flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> Sep 23, 09:00–21:00
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> Lab 1
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <Users className="h-4 w-4" /> Team of 3–5
                                </span>
                            </div>

                            <h3 className="mt-2 text-lg font-semibold">24h Hackathon — Build Something Real</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Validate an idea, ship a working prototype, and pitch to judges for prizes.
                            </p>

                            <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                                <li className="inline-flex items-center gap-1">$1500 prize pool</li>
                                <li className="inline-flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> Reg. closes Sep 20
                                </li>
                            </ul>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 text-sm text-emerald-600">
                                    <CheckCircle2 className="h-4 w-4" /> Seats Available
                                </span>
                                <a href="#" className="inline-flex items-center gap-1 text-cyan-600">
                                    Register <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </article>

                    {/* Event 2 */}
                    <article
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow transition hover:shadow-md"
                        data-aos="fade-up"
                        data-aos-delay="30"
                    >
                        <img
                            className="h-44 w-full object-cover"
                            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop"
                            alt="Career fair"
                        />
                        <div className="p-5">
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                <span className="inline-flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> Sep 25, 13:00–17:00
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> Auditorium
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <Building2 className="h-4 w-4" /> 30+ companies
                                </span>
                            </div>

                            <h3 className="mt-2 text-lg font-semibold">Fall Career & Internship Fair</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Meet recruiters, polish your resume, and discover internship tracks.
                            </p>

                            <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                                <li className="inline-flex items-center gap-1">
                                    <IdCard className="h-4 w-4" /> On-site interviews
                                </li>
                                <li className="inline-flex items-center gap-1">
                                    <FileText className="h-4 w-4" /> Resume clinic
                                </li>
                            </ul>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 text-sm text-amber-600">
                                    <Timer className="h-4 w-4" /> Filling fast
                                </span>
                                <a href="#" className="inline-flex items-center gap-1 text-cyan-600">
                                    Register <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </article>

                    {/* Event 3 */}
                    <article
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow transition hover:shadow-md"
                        data-aos="fade-up"
                        data-aos-delay="60"
                    >
                        <img
                            className="h-44 w-full object-cover"
                            src="https://images.unsplash.com/photo-1520975682031-a6b3800c9419?q=80&w=1470&auto=format&fit=crop"
                            alt="Cultural night"
                        />
                        <div className="p-5">
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                <span className="inline-flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> Sep 28, 19:00–22:00
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> Open Ground
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <TicketIcon className="h-4 w-4" /> Free Entry
                                </span>
                            </div>

                            <h3 className="mt-2 text-lg font-semibold">Cultural Night — Music & Dance</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                A showcase of campus talent with food stalls and photo corners.
                            </p>

                            <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                                <li className="inline-flex items-center gap-1">
                                    <Camera className="h-4 w-4" /> Photo booth
                                </li>
                                <li className="inline-flex items-center gap-1">
                                    <Coffee className="h-4 w-4" /> Food village
                                </li>
                            </ul>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 text-sm text-rose-600">
                                    <Music4 className="h-4 w-4" /> Live performances
                                </span>
                                <a href="#" className="inline-flex items-center gap-1 text-cyan-600">
                                    Details <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
