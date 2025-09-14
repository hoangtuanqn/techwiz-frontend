"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Rocket,
  Search,
  SearchCheck,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Laptop,
  Briefcase,
  Palette,
  Dumbbell,
  Wrench,
  GraduationCap,
  Calendar,
  Users,
  Tag,
} from "lucide-react";
import AOS from "aos";
import { Button } from "~/components/ui/button";
import { WatchPreview } from "./WatchPreview";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

// -----------------------------
// Category Dropdown (Beautiful)
// -----------------------------

type CategoryOption = {
  value: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  dotClass: string; // Tailwind bg color for the icon dot
};

const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: "all", label: "All", Icon: Tag, dotClass: "bg-slate-200" },
  { value: "technical", label: "Technical", Icon: Laptop, dotClass: "bg-cyan-200" },
  { value: "business", label: "Business", Icon: Briefcase, dotClass: "bg-amber-200" },
  { value: "cultural", label: "Cultural", Icon: Palette, dotClass: "bg-pink-200" },
  { value: "sports", label: "Sports", Icon: Dumbbell, dotClass: "bg-lime-200" },
  { value: "workshop", label: "Workshops & Seminars", Icon: Wrench, dotClass: "bg-violet-200" },
  { value: "academic", label: "Academic", Icon: GraduationCap, dotClass: "bg-blue-200" },
  { value: "annual", label: "Annual Functions", Icon: Calendar, dotClass: "bg-rose-200" },
  { value: "community", label: "Community & Social", Icon: Users, dotClass: "bg-emerald-200" },
  { value: "other", label: "Other", Icon: Tag, dotClass: "bg-slate-200" },
];

interface CategoryDropdownProps {
  value: string; // current selected value, e.g. "technical" | "all" | ""
  onChange: (val: string) => void;
  className?: string;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ value, onChange, className }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const selected = CATEGORY_OPTIONS.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!btnRef.current || !panelRef.current) return;
      if (!btnRef.current.contains(target) && !panelRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
    // return focus to button for accessibility
    requestAnimationFrame(() => btnRef.current?.focus());
  };

  return (
    <div className={`relative z-50 ${className ?? ""}`}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="category-listbox"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-xl border border-cyan-300/40 bg-white px-3 py-3 text-left text-slate-900 shadow-sm outline-none transition focus:ring-2 focus:ring-cyan-400/50"
      >
        <span className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-3">
            {selected ? (
              <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${selected.dotClass}`}>
                <selected.Icon className="h-3.5 w-3.5" />
              </span>
            ) : (
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-200">
                <Tag className="h-3.5 w-3.5" />
              </span>
            )}
            <span className="text-sm md:text-base">
              {selected ? selected.label : "Category"}
            </span>
          </span>
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          id="category-listbox"
          role="listbox"
          aria-label="Choose category"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-cyan-200 bg-white p-2 shadow-2xl ring-1 ring-cyan-200 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="max-h-64 overflow-y-auto pr-1">
            {CATEGORY_OPTIONS.map((opt) => {
              const isActive = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(opt.value)}
                  className={`group mb-1 flex w-full items-center justify-between rounded-xl p-2 text-left transition hover:bg-cyan-50 active:bg-cyan-100 ${
                    isActive ? "bg-cyan-50" : ""
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${opt.dotClass}`}>
                      <opt.Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm md:text-[15px] text-slate-800">{opt.label}</span>
                  </span>
                  {isActive ? <Check className="h-4 w-4 text-cyan-600" /> : <span className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// -----------------------------
// Hero Section
// -----------------------------

const Hero = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState(""); // "" means no filter chosen yet
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
    []
  );

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
    // only pass category when user chose something AND not the default "all"
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

              {/* Category dropdown (enhanced) */}
              <CategoryDropdown value={category} onChange={setCategory} />

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
};

export default Hero;
