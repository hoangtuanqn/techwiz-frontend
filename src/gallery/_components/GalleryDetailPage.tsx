// app/gallery/_components/GalleryDetailPage.tsx
"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";

/** ===== Types ===== */
type ImageItem = {
    title: string;
    date: string;
    src: string;
    alt?: string;
    desc?: string;
};
type VideoHero = {
    title: string;
    date: string;
    poster?: string;
    videoSrc?: string; // optional: .mp4
    desc?: string;
};
type CategoryPack = {
    video: VideoHero;
    images: ImageItem[];
};
type LabelPack = { name: string; deck: string };

/** ===== Helpers ===== */
const fmt = (d: string) => {
    try {
        return new Date(d).toLocaleDateString();
    } catch {
        return d;
    }
};

const ph = (w: number, h: number, label: string) => {
    const svg =
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>` +
        `<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='#e2e8f0'/><stop offset='100%' stop-color='#f1f5f9'/></linearGradient></defs>` +
        `<rect width='100%' height='100%' fill='url(#g)'/>` +
        `<text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' font-family='system-ui,Segoe UI,Roboto,Arial' font-size='26' fill='#334155'>${label}</text>` +
        `</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

/** ===== Labels & Data (demo) ===== */
const LABELS: Record<string, LabelPack> = {
    technical: { name: "Technical", deck: "Các hoạt động công nghệ: hackathon, robot, maker, AI/ML…" },
    business: { name: "Business", deck: "Pitch, startup, marketing, tài chính sinh viên…" },
    cultural: { name: "Cultural", deck: "Âm nhạc, vũ đạo, nghệ thuật & lễ hội đa văn hóa." },
    sports: { name: "Sports", deck: "Điền kinh, bóng đá, eSports và nhiều hơn nữa." },
    workshop: { name: "Workshop", deck: "Thực hành, phòng lab, chia sẻ kỹ năng." },
    academic: { name: "Academic", deck: "Seminar, poster day, research showcase." },
    annual: { name: "Annual", deck: "Sự kiện thường niên: diễu hành, gala, pháo hoa." },
    community: { name: "Community", deck: "Hoạt động cộng đồng & thiện nguyện." },
    other: { name: "Other", deck: "Khoảnh khắc hậu trường & đa thể loại." },
};

const IMG = (label: string) => ph(2000, 1200, label);

const DATA: Record<string, CategoryPack> = {
    technical: {
        video: {
            title: "Robotics & Maker — Recap",
            date: "2025-03-30",
            poster: IMG("Video • Robotics recap"),
            videoSrc: "", // Điền .mp4 thật để phát
            desc: "Tổng hợp demo robot & maker. Điền videoSrc (.mp4) để phát.",
        },
        images: [
            {
                title: "Autonomous bot",
                date: "2025-04-18",
                src: IMG("Autonomous bot"),
                alt: "Robotics demo",
                desc: "Robot tự hành điều hướng trong lab.",
            },
            {
                title: "Vision system",
                date: "2025-04-18",
                src: IMG("Vision system"),
                alt: "Vision",
                desc: "Hệ thống camera nhận diện vật thể.",
            },
            {
                title: "3D printing",
                date: "2025-03-01",
                src: IMG("3D printing"),
                alt: "3D print",
                desc: "In 3D phục vụ prototype nhanh.",
            },
            {
                title: "IoT dashboard",
                date: "2025-03-07",
                src: IMG("IoT dashboard"),
                alt: "IoT",
                desc: "Giám sát sensor theo thời gian thực.",
            },
            {
                title: "Hackathon night",
                date: "2025-03-12",
                src: IMG("Hackathon night"),
                alt: "Hackathon",
                desc: "Các nhóm code xuyên đêm.",
            },
            {
                title: "Demo day",
                date: "2025-05-02",
                src: IMG("Demo day"),
                alt: "Demo",
                desc: "Trình diễn sản phẩm hoàn thiện.",
            },
        ],
    },
    sports: {
        video: {
            title: "Athletics Finals — Highlights",
            date: "2025-07-04",
            poster: IMG("Video • Athletics highlights"),
            videoSrc: "",
            desc: "Điền kinh & eSports — thêm videoSrc để phát.",
        },
        images: [
            {
                title: "100m sprint",
                date: "2025-05-12",
                src: IMG("100m sprint"),
                alt: "Sprinting",
                desc: "Khoảnh khắc xuất phát.",
            },
            {
                title: "Relay team",
                date: "2025-05-12",
                src: IMG("Relay team"),
                alt: "Relay",
                desc: "Đồng đội ăn mừng.",
            },
            {
                title: "Basketball",
                date: "2025-04-22",
                src: IMG("Basketball"),
                alt: "Basketball",
                desc: "Tranh bóng đầu trận.",
            },
            {
                title: "Esports arena",
                date: "2025-07-04",
                src: IMG("Esports arena"),
                alt: "Esports",
                desc: "Sân khấu LAN finals.",
            },
            {
                title: "Long jump",
                date: "2025-05-11",
                src: IMG("Long jump"),
                alt: "Long jump",
                desc: "Cú bật xa dứt khoát.",
            },
            {
                title: "Victory lap",
                date: "2025-05-12",
                src: IMG("Victory lap"),
                alt: "Victory",
                desc: "Một vòng ăn mừng.",
            },
        ],
    },
    // …bổ sung thêm category nếu muốn
};

/** ===== Page ===== */
export default function GalleryDetailPage({ cat }: { cat?: string }) {
    const key = (cat || "technical").toLowerCase();
    const pack = useMemo<CategoryPack>(() => DATA[key] ?? DATA["technical"], [key]);
    const label = useMemo<LabelPack>(() => LABELS[key] ?? { name: "Gallery", deck: "" }, [key]);

    // Reveal animation
    useEffect(() => {
        const items = document.querySelectorAll<HTMLElement>(".js-reveal");
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("in");
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.18 },
        );
        items.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, [key]);

    return (
        <div className="bg-white text-slate-800">
            {/* ===== HEADER w/ Back + Title ===== */}
            <section className="border-b border-slate-200">
                <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-4 lg:px-6 2xl:max-w-[1760px]">
                    <div className="flex flex-col gap-3 py-6 md:flex-row md:items-start md:justify-between">
                        <div>
                            <div className="text-xs text-slate-500">
                                <Link href="/gallery" className="text-cyan-600 hover:underline">
                                    Gallery
                                </Link>{" "}
                                / <span>{label.name}</span>
                            </div>
                            <h1 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">{label.name}</h1>
                            {label.deck && <p className="mt-1 max-w-3xl text-slate-600">{label.deck}</p>}
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            <Link
                                href="/gallery"
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
                            >
                                ← Quay lại Gallery
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== VIDEO HERO ===== */}
            <main className="mx-auto w-full max-w-[1600px] px-3 sm:px-4 lg:px-6 2xl:max-w-[1760px]">
                <section className="js-reveal transition-transform hover:scale-[1.001]" style={{ margin: "22px 0" }}>
                    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
                        <div className="h-[min(86vh,820px)] w-full">
                            <video
                                className="h-full w-full object-cover"
                                controls
                                playsInline
                                preload="metadata"
                                poster={pack.video.poster}
                            >
                                {pack.video.videoSrc ? <source src={pack.video.videoSrc} type="video/mp4" /> : null}
                                Trình duyệt của bạn không hỗ trợ phát video.
                            </video>
                        </div>
                        <div className="space-y-1 bg-white px-4 pt-3 pb-5">
                            <div className="text-[12px] text-slate-500">{fmt(pack.video.date)}</div>
                            <h3 className="text-[20px] font-semibold">{pack.video.title}</h3>
                            {pack.video.desc && <p className="text-[14px] text-slate-600">{pack.video.desc}</p>}
                        </div>
                    </article>
                </section>

                {/* ===== IMAGE GRID — 3 card/row từ md ===== */}
                <section className="my-7 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {pack.images.map((it, idx) => (
                        <a
                            key={`${it.title}-${idx}`}
                            href={it.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Mở “${it.title}” trong tab mới`}
                            className="group block rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                        >
                            <article
                                className="js-reveal overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition"
                                style={{ animationDelay: `${idx * 40}ms` }}
                            >
                                <div className="relative h-[min(58vh,560px)] w-full bg-slate-50">
                                    <img
                                        src={it.src}
                                        alt={it.alt || it.title}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.01]"
                                    />
                                    {/* Hover overlay “Xem ảnh” */}
                                    <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-3 opacity-0 transition group-hover:opacity-100">
                                        <span className="rounded-lg bg-black/55 px-2 py-1 text-xs font-medium text-white">
                                            Xem ảnh ↗
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-1 px-4 pt-3 pb-5">
                                    <div className="text-[12px] text-slate-500">{fmt(it.date)}</div>
                                    <h3 className="text-[18px] font-semibold text-slate-800">{it.title}</h3>
                                    {it.desc && <p className="text-[14px] text-slate-600">{it.desc}</p>}
                                </div>
                            </article>
                        </a>
                    ))}
                </section>
            </main>

            {/* ===== Reveal animation styles ===== */}
            <style jsx global>{`
                .js-reveal {
                    opacity: 0;
                    transform: translateY(18px) scale(0.98);
                }
                .js-reveal.in {
                    opacity: 1;
                    transform: none;
                    animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
                }
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(18px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </div>
    );
}
