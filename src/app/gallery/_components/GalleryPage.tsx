// app/gallery/_components/GalleryPage.tsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

/** ===== Types + data ===== */
type Category = { key: string; title: string; desc: string; image: string };

const CATEGORIES: Category[] = [
    {
        key: "technical",
        title: "Technical",
        desc: "Photos & videos of tech, hackathons, robotics…",
        image: "https://images.unsplash.com/photo-1451186859696-371d9477be93?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "business",
        title: "Business",
        desc: "Pitches, startup showcases, marketing…",
        image: "https://images.unsplash.com/photo-1556761175-129418cb2dfe?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "cultural",
        title: "Cultural",
        desc: "Music, dance, multicultural festivals.",
        // ✅ replaced with a reliable Unsplash Source (dynamic but always served)
        image: "https://source.unsplash.com/1600x900/?festival,culture",
    },
    {
        key: "sports",
        title: "Sports",
        desc: "Athletics, football, esports…",
        image: "https://images.unsplash.com/photo-1502810190503-8303352d0dd1?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "workshop",
        title: "Workshop",
        desc: "Hands-on labs and trainings.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "academic",
        title: "Academic",
        desc: "Poster day, seminars, research.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "annual",
        title: "Annual",
        desc: "Fairs, parades, fireworks.",
        image: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "community",
        title: "Community",
        desc: "Volunteering, charity, connections.",
        // ✅ replaced with Unsplash Source + will always return something
        image: "https://source.unsplash.com/1600x900/?community,volunteer",
    },
    {
        key: "other",
        title: "Other",
        desc: "Backstage moments & mixed themes.",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600&auto=format&fit=crop",
    },
];

/** ===== Subcomponents ===== */
function CategoryTile({ cat }: { cat: Category }) {
    return (
        <Link
            href={`/gallery/${encodeURIComponent(cat.key)}`} // ✅ fixed template string
            className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md focus:ring-2 focus:ring-cyan-300 focus:outline-none"
        >
            <div className="relative">
                <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                        // ✅ fallback if any image fails
                        e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(cat.key)}/1600/900`;
                    }}
                    className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
            </div>
            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold transition group-hover:text-cyan-700">{cat.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{cat.desc}</p>
            </div>
        </Link>
    );
}

/** ===== Page ===== */
export default function GalleryPage() {
    // Redirect legacy ?cat=... → /gallery/[cat]
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const cat = searchParams.get("cat");
        if (cat) router.replace(`/gallery/${encodeURIComponent(cat)}`); // ✅ fixed template string
    }, [router, searchParams]);

    return (
        <div className="bg-white text-slate-800">
            {/* HEADING */}
            <section id="categories" className="border-b border-slate-200">
                <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-4 lg:px-6 2xl:max-w-[1760px]">
                    <div className="py-8">
                        <h1 className="text-center text-2xl font-extrabold tracking-tight md:text-3xl">
                            Media Gallery
                        </h1>
                        <p className="mx-auto mt-2 max-w-3xl text-center text-slate-600">
                            Choose a category to explore curated photo/video collections.
                        </p>
                    </div>
                </div>
            </section>

            {/* GRID */}
            <main className="mx-auto w-full max-w-[1600px] px-3 sm:px-4 lg:px-6 2xl:max-w-[1760px]">
                <section className="py-8">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {CATEGORIES.map((c) => (
                            <CategoryTile key={c.key} cat={c} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
