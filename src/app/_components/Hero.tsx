"use client";
import React, { useEffect, useState } from "react";
import { Rocket, Search, SearchCheck } from "lucide-react";
import AOS from "aos";
import { Button } from "~/components/ui/button";
import { WatchPreview } from "./WatchPreview";
import { useRouter } from "next/navigation";
const Hero = () => {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        AOS.init({ once: true, duration: 420, easing: "ease-out", offset: 80 });
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (keyword.trim()) params.set("search", keyword.trim());
        if (category) params.set("category", category);
        router.push(`/events?${params.toString()}`);
    };

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
                        className="glass shadow-soft mx-auto mt-8 max-w-4xl rounded-2xl border border-cyan-300/30 bg-white/90 p-3 backdrop-blur-md md:p-4"
                        aria-label="Search events"
                        onSubmit={handleSearch}
                    >
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            {/* Keyword input */}
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-cyan-500" />
                                <input
                                    type="text"
                                    placeholder="Keyword…"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="w-full rounded-xl border border-cyan-300/40 bg-white py-3 pr-3 pl-10 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400/50 focus:outline-none"
                                />
                            </div>

                            {/* Category select */}
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-xl border border-cyan-300/40 bg-white px-3 py-3 text-slate-900 focus:ring-2 focus:ring-cyan-400/50 focus:outline-none"
                            >
                                <option>Category</option>
                                <option value="all">All</option>
                                <option value="technical">Technical</option>
                                <option value="business">Business</option>
                                <option value="cultural">Cultural</option>
                                <option value="sports">Sports</option>
                                <option value="workshop">Workshops & Seminars</option>
                                <option value="academic">Academic</option>
                                <option value="annual">Annual Functions</option>
                                <option value="community">Community & Social</option>
                                <option value="other">Other</option>
                            </select>

                            {/* Search button */}
                            <Button className="h-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition-all duration-300">
                                <SearchCheck className="h-4 w-4" /> Search
                            </Button>
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
                        <WatchPreview />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
