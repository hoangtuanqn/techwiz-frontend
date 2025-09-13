// app/gallery/_components/GalleryPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

/** ===== Types + demo data ===== */
type Category = {
    key: string;
    title: string;
    desc: string;
    image: string;
};

const CATEGORIES: Category[] = [
    {
        key: "technical",
        title: "Technical",
        desc: "Ảnh & video về công nghệ, hackathon, robot…",
        image: "https://images.unsplash.com/photo-1451186859696-371d9477be93?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "business",
        title: "Business",
        desc: "Pitch, startup showcase, marketing…",
        image: "https://images.unsplash.com/photo-1556761175-129418cb2dfe?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "cultural",
        title: "Cultural",
        desc: "Âm nhạc, vũ đạo, lễ hội đa văn hóa.",
        image: "https://images.unsplash.com/photo-1520975682031-a6b3800c9419?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "sports",
        title: "Sports",
        desc: "Điền kinh, bóng đá, esports…",
        image: "https://images.unsplash.com/photo-1502810190503-8303352d0dd1?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "workshop",
        title: "Workshop",
        desc: "Hands-on, phòng lab, training.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "academic",
        title: "Academic",
        desc: "Poster day, seminar, research.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "annual",
        title: "Annual",
        desc: "Ngày hội, diễu hành, pháo hoa.",
        image: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "community",
        title: "Community",
        desc: "Tình nguyện, thiện nguyện, kết nối.",
        image: "https://images.unsplash.com/photo-1460593861527-6107e4c9e064?q=80&w=1600&auto=format&fit=crop",
    },
    {
        key: "other",
        title: "Other",
        desc: "Khoảnh khắc hậu trường & đa thể loại.",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600&auto=format&fit=crop",
    },
];

/** ===== Subcomponents ===== */
function CategoryTile({ cat }: { cat: Category }) {
    return (
        <Link
            href={`/gallery/${encodeURIComponent(cat.key)}`} // ⬅ route động /gallery/[cat]
            className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md focus:ring-2 focus:ring-cyan-300 focus:outline-none"
        >
            <div className="relative">
                <img
                    src={cat.image}
                    alt={cat.title}
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
    const [openMobile, setOpenMobile] = useState(false);

    // Redirect nếu còn dùng ?cat=... → /gallery/[cat]
    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {
        const cat = searchParams.get("cat");
        if (cat) router.replace(`/gallery/${encodeURIComponent(cat)}`);
    }, [router, searchParams]);

    return (
        <div className="bg-white text-slate-800">
            {/* HEADING */}
            <section id="categories" className="border-b border-slate-200">
                <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-4 lg:px-6 2xl:max-w-[1760px]">
                    <div className="py-8">
                        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl text-center">Media Gallery</h1>
                        <p className="mt-2 max-w-3xl text-slate-600 mx-auto text-center">
                            Chọn danh mục để xem bộ sưu tập ảnh/video theo từng chủ đề.
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
