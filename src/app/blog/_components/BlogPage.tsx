// app/blog/_components/BlogPage.tsx
"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { BlogCardSkeleton } from "./BlogSkeleton";
import blogApi from "~/apiRequest/blog";
import { BlogItemType } from "~/types/schemaZod/blog.schema";
import { toast } from "sonner";

const CATEGORIES = ["All", "technology", "culture", "education", "other"] as const;


type Post = BlogItemType;

export default function BlogPage() {
    const searchParams = useSearchParams();
    const [ALL, setALL] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");
    const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [minRead, setMinRead] = useState<number>(0);
    const [sort, setSort] = useState<"Newest" | "Oldest" | "A-Z" | "Z-A">("Newest");
    const [visible, setVisible] = useState(12);

    // Load blogs from API
    useEffect(() => {
        loadBlogs();
    }, []);

    // Set category from URL params
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam && CATEGORIES.includes(categoryParam as any)) {
            setCategory(categoryParam as (typeof CATEGORIES)[number]);
        }
    }, [searchParams]);

    async function loadBlogs() {
        try {
            setLoading(true);
            const response = await blogApi.getBlogs(1, 100); // Lấy nhiều blogs cho public
            if (response.data.success) {
                setALL(response.data.data.data);
            }
        } catch (error) {
            console.error('Error loading blogs:', error);
            toast.error('Không thể tải danh sách blog');
        } finally {
            setLoading(false);
        }
    }

    const toggleTag = (t: string) => {
        setVisible(12);
        setSelectedTags((prev) => {
            const next = new Set(prev);
            next.has(t) ? next.delete(t) : next.add(t);
            return next;
        });
    };

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

    // Get all unique tags from blogs
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        ALL.forEach(blog => {
            if (blog.tags) {
                blog.tags.split(',').forEach(tag => {
                    if (tag.trim()) tags.add(tag.trim());
                });
            }
        });
        return Array.from(tags);
    }, [ALL]);

    const filtered = useMemo(() => {
        const fromTime = from ? new Date(from).getTime() : Number.NEGATIVE_INFINITY;
        const toTime = to ? new Date(to).getTime() : Number.POSITIVE_INFINITY;

        const arr = ALL.filter((p) => {
            const matchCat = category === "All" || p.category === category;
            const matchQ =
                !q || p.title.toLowerCase().includes(q.toLowerCase()) || 
                (p.excerpt && p.excerpt.toLowerCase().includes(q.toLowerCase()));
            const time = new Date(p.created_at).getTime();
            const matchDate = time >= fromTime && time <= toTime;
            const matchRead = p.views_count >= minRead;
            const blogTags = p.tags ? p.tags.split(',').map(t => t.trim()) : [];
            const matchTags = selectedTags.size === 0 || [...selectedTags].every((t) => blogTags.includes(t));
            return matchCat && matchQ && matchDate && matchRead && matchTags;
        });

        arr.sort((a, b) => {
            switch (sort) {
                case "Newest":
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case "Oldest":
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case "A-Z":
                    return a.title.localeCompare(b.title);
                case "Z-A":
                    return b.title.localeCompare(a.title);
            }
        });

        return arr;
    }, [ALL, q, category, from, to, minRead, selectedTags, sort]);

    const items = filtered.slice(0, visible);
    const canLoadMore = visible < filtered.length;

    return (
        <section id="blog" className="bg-white py-8 sm:py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                {/* Header */}

                <div className="mb-6 sm:mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 md:text-4xl">
                        From the <span className="text-cyan-600">Blog</span>

                    </h1>
                    <p className="mx-auto mt-2 sm:mt-3 max-w-2xl text-slate-600 text-sm sm:text-base">
                        Stories, insights, and tips from our event organizers and students.
                    </p>
                </div>

                {/* Controls */}
                <div className="mb-4 sm:mb-6 grid grid-cols-1 gap-3 md:grid-cols-12">
                    <div className="relative md:col-span-4">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            value={q}
                            onChange={(e) => {
                                setQ(e.target.value);
                                setVisible(12);
                            }}
                            placeholder="Search articles…"
                            className="w-full rounded-xl border border-slate-200 py-2 pr-3 pl-10 text-sm focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
                        />
                    </div>

                    <div className="md:col-span-3">
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value as (typeof CATEGORIES)[number]);
                                setVisible(12);
                            }}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500/40"
                        >
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <input
                            type="date"
                            value={from}
                            onChange={(e) => {
                                setFrom(e.target.value);
                                setVisible(12);
                            }}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500/40"
                            aria-label="From date"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <input
                            type="date"
                            value={to}
                            onChange={(e) => {
                                setTo(e.target.value);
                                setVisible(12);
                            }}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500/40"
                            aria-label="To date"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <button
                            onClick={resetAll}
                            className="inline-flex w-full items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600"
                            title="Reset filters"
                        >
                            <X className="h-4 w-4" /> <span className="hidden sm:inline">Reset</span>
                        </button>
                    </div>
                </div>

                {/* Tags, min read, sort */}
                <div className="mb-6 sm:mb-8 flex flex-col items-stretch sm:items-center justify-between gap-4 md:flex-row">
                    <div className="flex flex-wrap gap-2">
                        {loading ? (
                            <div className="text-sm text-slate-500">Loading tags...</div>
                        ) : allTags.length === 0 ? (
                            <div className="text-sm text-slate-500">No tags available</div>
                        ) : (
                            allTags.slice(0, 10).map((t) => {
                                const active = selectedTags.has(t);
                                return (
                                    <button
                                        key={t}
                                        onClick={() => toggleTag(t)}
                                        className={`group relative overflow-hidden rounded-full border px-3 py-1.5 text-xs transition ${
                                            active
                                                ? "border-cyan-500 bg-cyan-500 text-white"
                                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                        }`}
                                    >
                                        <span className="pointer-events-none absolute inset-y-0 -left-10 w-10 translate-x-0 rotate-12 bg-white/30 opacity-0 transition group-hover:translate-x-[220%] group-hover:opacity-100" />
                                        #{t}
                                    </button>
                                );
                            })
                        )}
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
                                className="w-16 sm:w-20 rounded-xl border border-slate-200 px-2 py-1 text-sm focus:ring-2 focus:ring-cyan-500/40"
                            />
                            <span className="text-slate-500">min</span>
                        </label>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as any)}
                            className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500/40"
                        >
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>A-Z</option>
                            <option>Z-A</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4 sm:mb-6 text-center text-xs sm:text-sm text-slate-500">
                    {filtered.length} articles • showing {items.length}
                </div>

                {/* Grid */}

                <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {items.length === 0
                        ? Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
                        : items.map((post) => (
                              <article
                                  key={post.id}
                                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                              >
                                  <Link
                                      href={`/blog/${post.id}`}
                                      className="absolute inset-0 z-10"
                                      aria-label={post.title}
                                  />
                                  <div className="overflow-hidden">
                                      <img
                                          src={post.cover || '/images/blog-placeholder.jpg'}
                                          alt={post.title}
                                          className="h-40 sm:h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      />
                                  </div>

                                  <div className="p-4 sm:p-5">
                                      <div className="flex items-center justify-between text-xs text-slate-500">
                                          <span className="rounded-full border border-slate-200 px-2 py-0.5">
                                              {post.category}
                                          </span>
                                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                      </div>

                                      <h3 className="mt-2 line-clamp-2 font-semibold text-slate-800 transition group-hover:text-cyan-600 text-base sm:text-lg">
                                          {post.title}
                                      </h3>
                                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.excerpt || post.content.substring(0, 100) + '...'}</p>

                                      <div className="mt-3 flex flex-wrap gap-2">
                                          {post.tags && post.tags.split(',').map((tg, index) => (
                                              <span
                                                  key={index}
                                                  className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-600"
                                              >
                                                  #{tg.trim()}
                                              </span>
                                          ))}
                                      </div>

                                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                                          <span>~ {Math.ceil(post.content.length / 1000)} min read</span>
                                          <span className="relative inline-flex items-center gap-1 overflow-hidden rounded-lg border border-slate-200 px-3 py-1.5 text-cyan-600 transition group-hover:-translate-y-0.5 group-hover:border-cyan-500 group-hover:bg-cyan-50">
                                              <span className="relative z-10">Read more</span>
                                              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                              <span className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                                          </span>
                                      </div>
                                  </div>
                              </article>
                          ))}

                </div>

                {/* Load more */}
                <div className="mt-8 sm:mt-12 flex justify-center">
                    {canLoadMore ? (
                        <button
                            onClick={() => setVisible((v) => v + 12)}
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-slate-300 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-500 hover:shadow-lg active:translate-y-0"
                        >
                            <span className="pointer-events-none absolute inset-y-0 -left-10 w-10 translate-x-0 rotate-12 bg-white/40 opacity-0 transition group-hover:translate-x-[260%] group-hover:opacity-100" />
                            Show more
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    ) : (
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 sm:px-5 py-2.5 sm:py-3 text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                        >
                            You’re all caught up
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
