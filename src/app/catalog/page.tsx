"use client";
import { useState } from "react";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import Link from "next/link";

// Fake data demo
const allEvents = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    title: `Event ${i + 1}`,
    category: ["Technical", "Business", "Cultural", "Sports"][i % 4],
    desc: "Short description for this event, including what you can expect to learn and enjoy.",
    image: `https://picsum.photos/seed/${i}/400/250`,
}));

export default function CatalogPage() {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("Newest");
    const [page, setPage] = useState(1);

    const perPage = 12;

    const resetFilters = () => {
        setKeyword("");
        setCategory("All");
        setSort("Newest");
        setPage(1);
    };

    const filtered = allEvents
        .filter(
            (ev) =>
                (category === "All" || ev.category === category) &&
                ev.title.toLowerCase().includes(keyword.toLowerCase()),
        )
        .sort((a, b) => {
            if (sort === "Newest") return b.id - a.id;
            if (sort === "Oldest") return a.id - b.id;
            return a.title.localeCompare(b.title);
        });

    const totalPages = Math.ceil(filtered.length / perPage);
    const currentData = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <section id="catalog" className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">Event Catalog</h1>
                    <p className="mt-2 text-slate-600">
                        Browse all campus events. Use filters and search to find what you need.
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="mb-8 flex flex-col items-center gap-4">
                    <div className="flex flex-wrap justify-center gap-3">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search events…"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-60 rounded-xl border border-slate-200 py-2 pr-3 pl-10 text-sm focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none"
                            />
                        </div>
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setPage(1);
                            }}
                            className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#06b6d4]/50"
                        >
                            <option>All</option>
                            <option>Technical</option>
                            <option>Business</option>
                            <option>Cultural</option>
                            <option>Sports</option>
                        </select>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#06b6d4]/50"
                        >
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>A-Z</option>
                        </select>

                        {/* Reset */}
                        <button
                            onClick={resetFilters}
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                        >
                            <RotateCcw className="h-4 w-4" /> Reset
                        </button>
                    </div>

                    {/* Count */}
                    <span className="text-sm text-slate-500">{filtered.length} events found</span>
                </div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {currentData.map((ev) => (
                        <article
                            key={ev.id}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <img
                                src={ev.image}
                                alt={ev.title}
                                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-slate-800 group-hover:text-[#06b6d4]">{ev.title}</h3>
                                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{ev.desc}</p>
                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <span className="text-slate-500">{ev.category}</span>
                                    <Link
                                        href={`/catalog/${ev.id}`}
                                        className="flex items-center gap-1 text-[#06b6d4] hover:underline"
                                    >
                                        Details <SlidersHorizontal className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-10 flex justify-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="rounded-lg border border-slate-200 px-3 py-1 text-sm disabled:opacity-50"
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`rounded-lg border px-3 py-1 text-sm ${
                                    page === i + 1 ? "border-[#06b6d4] bg-[#06b6d4] text-white" : "border-slate-200"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="rounded-lg border border-slate-200 px-3 py-1 text-sm disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
