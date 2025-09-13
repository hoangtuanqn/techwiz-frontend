"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Rocket, Search, SearchCheck, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import { Button } from "~/components/ui/button";
import { WatchPreview } from "./WatchPreview";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
const Hero = () => {
<<<<<<< HEAD
    const router = useRouter();
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    // Slides "hot events" — thay bằng ảnh thực tế của bạn
    const slides = useMemo(
        () => [
            {
                src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop",
                alt: "Fall Hackathon Finals",
                label: "Trending: Hackathon finals",
            },
            {
                src: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?q=80&w=1974&auto=format&fit=crop",
                alt: "Cultural Night Performances",
                label: "Hot: Cultural night",
            },
            {
                src: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1920&auto=format&fit=crop",
                alt: "Athletics & Sports Meet",
                label: "Now: Sports meet highlights",
            },
            {
                src: "https://images.unsplash.com/photo-1558624232-75ee22af7e67?q=80&w=1920&auto=format&fit=crop",
                alt: "Workshops & Seminars",
                label: "Don’t miss: Workshops",
            },
        ],
        [],
    );
=======
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
>>>>>>> f9ce292e0507ccee7e7819f4f1e9ce3a09c5b236

  // Slides "hot events" — thay bằng ảnh thực tế của bạn
  const slides = useMemo(
    () => [
      {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop",
        alt: "Fall Hackathon Finals",
        label: "Trending: Hackathon finals",
      },
      {
        src: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?q=80&w=1974&auto=format&fit=crop",
        alt: "Cultural Night Performances",
        label: "Hot: Cultural night",
      },
      {
        src: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1920&auto=format&fit=crop",
        alt: "Athletics & Sports Meet",
        label: "Now: Sports meet highlights",
      },
      {
        src: "https://images.unsplash.com/photo-1558624232-75ee22af7e67?q=80&w=1920&auto=format&fit=crop",
        alt: "Workshops & Seminars",
        label: "Don’t miss: Workshops",
      },
    ],
    []
  );

<<<<<<< HEAD
    // Auto-rotate slideshow
    useEffect(() => {
        const DURATION = 6000; // ms
        const id = setInterval(() => {
            if (!paused) setCurrent((c) => (c + 1) % slides.length);
        }, DURATION);
        return () => clearInterval(id);
    }, [paused, slides.length]);

    const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
    const next = () => setCurrent((c) => (c + 1) % slides.length);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (keyword.trim()) params.set("search", keyword.trim());
        if (category && category !== "all") params.set("category", category);
        router.push(`/events?${params.toString()}`);
    };

    return (
        <section
            id="home"
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Slideshow layer */}
            <div className="absolute inset-0 overflow-hidden">
                {slides.map((s, idx) => {
                    const isActive = idx === current;
                    return (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                                isActive ? "opacity-100" : "opacity-0"
                            }`}
                            aria-hidden={!isActive}
                        >
                            <img
                                className={`h-[620px] w-full object-cover transition-transform duration-[6000ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                                    isActive ? "scale-100" : "scale-105"
                                }`}
                                src={s.src}
                                alt={s.alt}
                                fetchPriority={isActive ? "high" : "low"}
                                decoding="async"
                            />
                        </div>
                    );
                })}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/75 via-slate-900/50 to-slate-900/75" />
=======
  useEffect(() => {
    AOS.init({ once: true, duration: 420, easing: "ease-out", offset: 80 });
  }, []);

  // Auto-rotate slideshow
  useEffect(() => {
    const DURATION = 6000; // ms
    const id = setInterval(() => {
      if (!paused) setCurrent((c) => (c + 1) % slides.length);
    }, DURATION);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("search", keyword.trim());
    if (category && category !== "all") params.set("category", category);
    router.push(`/events?${params.toString()}`);
  };

  return (
    <section
      id="home"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slideshow layer */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((s, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!isActive}
            >
              <img
                className={`h-[620px] w-full object-cover will-change-transform transition-transform duration-[6000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive ? "scale-100" : "scale-105"
                }`}
                src={s.src}
                alt={s.alt}
                fetchPriority={isActive ? "high" : "low"}
                decoding="async"
              />
            </div>
          );
        })}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/75 via-slate-900/50 to-slate-900/75" />
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 sm:px-3">
        <button
          type="button"
          onClick={prev}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow hover:bg-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow hover:bg-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`pointer-events-auto h-2.5 w-2.5 rounded-full transition-all ${
              current === i ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-28 pb-24 text-center text-white md:pt-36">
          <p
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs md:text-sm"
            data-aos="fade-up"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400" />
            {slides[current]?.label ?? "Now live: Fall semester events"}
          </p>

          <h1
            className="mt-4 text-4xl leading-tight font-extrabold md:text-6xl"
            data-aos="fade-up"
            data-aos-delay="40"
          >
            Make Every Event Memorable
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-white/90"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            Discover curated events across campus. Register in seconds, breeze through QR check-in, and
            download your certificate right after.
          </p>

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
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  placeholder="Keyword…"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full rounded-xl border border-cyan-300/40 bg-white py-3 pr-3 pl-10 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                />
              </div>

              {/* Category select */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-cyan-300/40 bg-white px-3 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              >
                <option value="">Category</option>
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
              <Button
                type="submit"
                className="h-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-cyan-600"
                aria-label="Search events"
              >
                <SearchCheck className="h-4 w-4" /> Search
              </Button>

>>>>>>> f9ce292e0507ccee7e7819f4f1e9ce3a09c5b236
            </div>
          </form>

<<<<<<< HEAD
            {/* Controls */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 sm:px-3">
                <button
                    type="button"
                    onClick={prev}
                    className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow hover:bg-white"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    onClick={next}
                    className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow hover:bg-white"
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* Dots */}
            <div className="pointer-events-none absolute right-0 bottom-3 left-0 flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`pointer-events-auto h-2.5 w-2.5 rounded-full transition-all ${
                            current === i ? "bg-white" : "bg-white/50 hover:bg-white/80"
                        }`}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="pt-28 pb-24 text-center text-white md:pt-36">
                    <p
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs md:text-sm"
                        data-aos="fade-up"
                    >
                        <span className="inline-block h-2 w-2 rounded-full bg-cyan-400" />
                        {slides[current]?.label ?? "Now live: Fall semester events"}
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
                                <option value="">Category</option>
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
                            <Button
                                type="submit"
                                className="h-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-cyan-600"
                                aria-label="Search events"
                            >
                                <SearchCheck className="h-4 w-4" /> Search
                            </Button>
                        </div>
                    </form>

                    <div
                        className="mt-6 flex items-center justify-center gap-3"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        <NextLink
                            href="/events"
                            className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-slate-900 shadow hover:bg-slate-50"
                        >
                            <Rocket className="h-5 w-5" /> Explore Events
                        </NextLink>
                        <WatchPreview />
                    </div>
                </div>
            </div>
        </section>
    );
=======
          <div className="mt-6 flex items-center justify-center gap-3" data-aos="fade-up" data-aos-delay="150">
            <NextLink
              href="/events"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-slate-900 shadow hover:bg-slate-50"
            >
              <Rocket className="h-5 w-5" /> Explore Events
            </NextLink>
            <WatchPreview />
          </div>
        </div>
      </div>
    </section>
  );
>>>>>>> f9ce292e0507ccee7e7819f4f1e9ce3a09c5b236
};

export default Hero;
