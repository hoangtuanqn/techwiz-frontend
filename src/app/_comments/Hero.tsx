"use client";
import React, { useEffect } from "react";
import { Play, Rocket, Search, SearchCheck } from "lucide-react";
import AOS from "aos";
const Hero = () => {
    useEffect(() => {
        AOS.init({ once: true, duration: 420, easing: "ease-out", offset: 80 });
    }, []);
    return (
        <section id="home" className="relative">
            <div className="absolute inset-0">
                <img
                    className="h-[620px] w-full object-cover"
                    src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?q=80&w=1974&auto=format&fit=crop"
                    alt="Stage lights and crowd"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/75 via-slate-900/50 to-slate-900/75" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="pt-28 pb-24 text-center text-white md:pt-36">
                    <p
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs md:text-sm"
                        data-aos="fade-up"
                    >
                        <span className="inline-block h-2 w-2 rounded-full bg-cyan-400" />
                        Now live: Fall semester events
                    </p>

                    <h1
                        className="mt-4 text-4xl leading-tight font-extrabold md:text-6xl"
                        data-aos="fade-up"
                        data-aos-delay="40"
                    >
                        Make Every Event Memorable
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-white/90" data-aos="fade-up" data-aos-delay="80">
                        Discover curated events across campus. Register in seconds, breeze through QR check-in, and
                        download your certificate right after.
                    </p>

                    {/* Search form */}
                    {/* Faceted Search Form */}
                    <form
                        id="searchForm"
                        className="glass shadow-soft mx-auto mt-8 max-w-4xl rounded-2xl border border-white/30 bg-white/20 p-3 backdrop-blur-md md:p-4"
                        aria-label="Search events"
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Search submitted");
                        }}
                    >
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                            {/* Keyword input */}
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Keyword…"
                                    className="w-full rounded-xl border border-white/20 bg-white/70 py-3 pr-3 pl-10 text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400/50 focus:outline-none"
                                />
                            </div>

                            {/* Category select */}
                            <select className="w-full rounded-xl border border-white/20 bg-white/70 px-3 py-3 text-slate-800 focus:ring-2 focus:ring-cyan-400/50 focus:outline-none">
                                <option value="">Category</option>
                                <option>Technical</option>
                                <option>Business</option>
                                <option>Cultural</option>
                                <option>Sports</option>
                                <option>Volunteering</option>
                            </select>

                            {/* Difficulty select */}
                            <select className="w-full rounded-xl border border-white/20 bg-white/70 px-3 py-3 text-slate-800 focus:ring-2 focus:ring-cyan-400/50 focus:outline-none">
                                <option value="">Difficulty</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>

                            {/* Search button */}
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <SearchCheck className="h-4 w-4" /> Search
                            </button>
                        </div>
                    </form>

                    <div
                        className="mt-6 flex items-center justify-center gap-3"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        <a
                            href="#events"
                            className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-slate-900 shadow hover:bg-slate-50"
                        >
                            <Rocket className="h-5 w-5" /> Explore Events
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3 hover:bg-white/10"
                        >
                            <Play className="h-5 w-5" /> Watch Preview
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
