"use client";
import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";

// ===== Mock data =========================================================
const TAG_POOL = ["Hackathon", "Robotics", "AI", "Design", "Startup", "Marketing", "Culture", "Sports"] as const;

const CATEGORIES = ["All", "Technical", "Cultural", "Business", "Design"] as const;

type Post = {
    id: number;
    title: string;
    category: "Technical" | "Cultural" | "Business" | "Design";
    desc: string;
    image: string;
    date: string; // yyyy-mm-dd
    read: number; // minutes
    tags: (typeof TAG_POOL)[number][];
};

const RAW_POSTS: Post[] = Array.from({ length: 60 }).map((_, i) => {
    const category = ["Technical", "Cultural", "Business", "Design"][i % 4] as Post["category"];
    const title = [
        "How to Win Your First Hackathon",
        "Top 5 Cultural Nights You Can’t Miss",
        "The Future of Business Startups",
        "Robotics 101: Getting Started",
        "Design Systems for Campus Apps",
    ][i % 5];

    const shuffled = [...TAG_POOL].sort(() => Math.random() - 0.5);
    const tags = shuffled.slice(0, 2 + (i % 2)) as Post["tags"];

    return {
        id: i + 1,
        title,
        category,
        desc: "A short preview of the article that highlights key takeaways and sparks curiosity to read more.",
        image: `https://picsum.photos/seed/blog-${i}/900/600`,
        date: new Date(2025, i % 12, (i % 28) + 1).toISOString().slice(0, 10),
        read: [4, 6, 7, 5, 8][i % 5],
        tags,
    };
});

// ===== UI ===============================================================
export default function BlogPage() {
    // Search + filters
    const [q, setQ] = useState("");
    const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [minRead, setMinRead] = useState<number>(0);
    const [sort, setSort] = useState<"Newest" | "Oldest" | "A-Z" | "Z-A">("Newest");

    // Pagination
    const [visible, setVisible] = useState(12);

    // Toggle tag
    const toggleTag = (t: string) => {
        setVisible(12);
        setSelectedTags((prev) => {
            const next = new Set(prev);
            next.has(t) ? next.delete(t) : next.add(t);
            return next;
        });
    };

    // Reset all
    const resetAll = () => {
        setQ("");
        setCategory("All");
        setSelectedTags(new Set());
        setFrom("");
        setTo("");
        setMinRead(0);
        setSort("Newest");
        setVisible(12);
    };

    // ---- Compute filtered FIRST ----
    const filtered = useMemo(() => {
        const fromTime = from ? new Date(from).getTime() : Number.NEGATIVE_INFINITY;
        const toTime = to ? new Date(to).getTime() : Number.POSITIVE_INFINITY;

        let arr = RAW_POSTS.filter((p) => {
            const matchCat = category === "All" || p.category === category;
            const matchQ =
                !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase());
            const time = new Date(p.date).getTime();
            const matchDate = time >= fromTime && time <= toTime;
            const matchRead = p.read >= minRead;
            const matchTags = selectedTags.size === 0 || [...selectedTags].every((t) => p.tags.includes(t as any));

            return matchCat && matchQ && matchDate && matchRead && matchTags;
        });

        arr.sort((a, b) => {
            switch (sort) {
                case "Newest":
                    return b.date.localeCompare(a.date);
                case "Oldest":
                    return a.date.localeCompare(b.date);
                case "A-Z":
                    return a.title.localeCompare(b.title);
                case "Z-A":
                    return b.title.localeCompare(a.title);
            }
        });

        return arr;
    }, [q, category, from, to, minRead, selectedTags, sort]);

    // Then slice items and compute canLoadMore
    const items = filtered.slice(0, visible);
    const canLoadMore = visible < filtered.length;

    return (
        <section id="blog" className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">
                        From the <span className="text-[#06b6d4]">Blog</span>
                    </h1>
                    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                        Stories, insights, and tips from our event organizers and students.
                    </p>
                </div>

                {/* Controls */}
                <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-12">
                    {/* Search */}
                    <div className="relative md:col-span-4">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            value={q}
                            onChange={(e) => {
                                setQ(e.target.value);
                                setVisible(12);
                            }}
                            placeholder="Search articles…"
                            className="w-full rounded-xl border border-slate-200 py-2 pr-3 pl-10 text-sm focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none"
                        />
                    </div>

                    {/* Category */}
                    <div className="md:col-span-3">
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value as any);
                                setVisible(12);
                            }}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#06b6d4]/50"
                        >
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date from */}
                    <div className="md:col-span-2">
                        <input
                            type="date"
                            value={from}
                            onChange={(e) => {
                                setFrom(e.target.value);
                                setVisible(12);
                            }}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#06b6d4]/50"
                            aria-label="From date"
                        />
                    </div>

                    {/* Date to */}
                    <div className="md:col-span-2">
                        <input
                            type="date"
                            value={to}
                            onChange={(e) => {
                                setTo(e.target.value);
                                setVisible(12);
                            }}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#06b6d4]/50"
                            aria-label="To date"
                        />
                    </div>

                    {/* Reset */}
                    <div className="md:col-span-1">
                        <button
                            onClick={resetAll}
                            className="inline-flex w-full items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-[#06b6d4] hover:text-[#06b6d4]"
                            title="Reset filters"
                        >
                            <X className="h-4 w-4" /> Reset
                        </button>
                    </div>
                </div>

                {/* Tags + Min read + Sort */}
                <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-2">
                        {TAG_POOL.map((t) => {
                            const active = selectedTags.has(t);
                            return (
                                <button
                                    key={t}
                                    onClick={() => toggleTag(t)}
                                    className={`group relative overflow-hidden rounded-full border px-3 py-1.5 text-xs transition ${active ? "border-[#06b6d4] bg-[#06b6d4] text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"} `}
                                >
                                    <span className="pointer-events-none absolute inset-y-0 -left-10 w-10 translate-x-0 rotate-12 bg-white/30 opacity-0 transition group-hover:translate-x-[220%] group-hover:opacity-100" />
                                    #{t}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            Min read:
                            <input
                                type="number"
                                min={0}
                                max={30}
                                value={minRead}
                                onChange={(e) => {
                                    setMinRead(Number(e.target.value) || 0);
                                    setVisible(12);
                                }}
                                className="w-20 rounded-xl border border-slate-200 px-2 py-1 text-sm focus:ring-2 focus:ring-[#06b6d4]/50"
                            />
                            <span className="text-slate-500">min</span>
                        </label>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as any)}
                            className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#06b6d4]/50"
                        >
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>A-Z</option>
                            <option>Z-A</option>
                        </select>
                    </div>
                </div>

                {/* Count */}
                <div className="mb-6 text-center text-sm text-slate-500">
                    {filtered.length} articles • showing {items.length}
                </div>

                {/* Grid posts */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((post) => (
                        <article
                            key={post.id}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-5">
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <span className="rounded-full border border-slate-200 px-2 py-0.5">
                                        {post.category}
                                    </span>
                                    <span>{post.date}</span>
                                </div>

                                <h3 className="mt-2 line-clamp-2 font-semibold text-slate-800 transition group-hover:text-[#06b6d4]">
                                    {post.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.desc}</p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {post.tags.map((tg) => (
                                        <span
                                            key={tg}
                                            className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-600"
                                        >
                                            #{tg}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                                    <span>~ {post.read} min read</span>
                                    <a
                                        href={`/blog/${post.id}`}
                                        className="relative inline-flex items-center gap-1 overflow-hidden rounded-lg border border-slate-200 px-3 py-1.5 text-[#06b6d4] transition hover:-translate-y-0.5 hover:border-[#06b6d4] hover:bg-[#06b6d4]/5 active:translate-y-0"
                                    >
                                        <span className="relative z-10">Read more</span>
                                        <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                        <span className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Load more */}
                <div className="mt-12 flex justify-center">
                    {canLoadMore ? (
                        <button
                            onClick={() => setVisible((v) => v + 12)}
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-[#06b6d4] hover:shadow-lg active:translate-y-0"
                        >
                            <span className="pointer-events-none absolute inset-y-0 -left-10 w-10 translate-x-0 rotate-12 bg-white/40 opacity-0 transition group-hover:translate-x-[260%] group-hover:opacity-100" />
                            Show more
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    ) : (
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#06b6d4] px-5 py-3 text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                        >
                            You’re all caught up
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
