"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Save, Trash2, Plus } from "lucide-react";
import CoverUploader from "../_components/CoverUploader";

const LS_KEY = "demo_blogs";

type Blog = {
    title: string;
    slug: string;
    summary: string;
    content: string;
    tags: string[];
    cover?: string;
    updatedAt?: string;
};

function loadBlogs(): Blog[] {
    if (typeof window === "undefined") return [];
    try {
        return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    } catch {
        return [];
    }
}
function saveBlogs(rows: Blog[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(LS_KEY, JSON.stringify(rows));
}

export default function MyBlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [search, setSearch] = useState("");
    const [current, setCurrent] = useState<Blog | null>(null);
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

    // info ảnh bìa (UI only)
    const [coverInfo, setCoverInfo] = useState<{ name: string; size: string } | null>(null);

    useEffect(() => {
        setBlogs(loadBlogs());
    }, []);

    const filtered = blogs.filter((b) => {
        const key = search.toLowerCase();
        return b.title.toLowerCase().includes(key) || b.slug.toLowerCase().includes(key);
    });

    function selectBlog(b: Blog) {
        setCurrent(b);
        setSelectedSlug(b.slug);
        setCoverInfo(null);
    }

    function saveEdit() {
        if (!current || !selectedSlug) return;

        const duplicated = current.slug !== selectedSlug && blogs.some((b) => b.slug === current.slug);
        if (duplicated) {
            alert("Slug đã tồn tại. Vui lòng chọn slug khác.");
            return;
        }

        const next = blogs.map((b) =>
            b.slug === selectedSlug ? { ...current, updatedAt: new Date().toISOString() } : b,
        );

        saveBlogs(next);
        setBlogs(next);
        setSelectedSlug(current.slug);
        alert("Đã lưu chỉnh sửa!");
    }

    function deleteBlog() {
        if (!current || !selectedSlug) return;
        if (!confirm("Xoá blog này?")) return;

        const next = blogs.filter((b) => b.slug !== selectedSlug);
        saveBlogs(next);
        setBlogs(next);
        setCurrent(null);
        setSelectedSlug(null);
        setCoverInfo(null);
    }

    return (
        <section className="grid gap-6">
            <article className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">My Blogs</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Danh sách blog được lưu tạm vào localStorage. Bạn có thể xem & chỉnh sửa.
                        </p>
                    </div>
                    <Link
                        href="/organizer/blogs/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
                    >
                        <Plus className="h-4 w-4" /> Create Blog
                    </Link>
                </div>
            </article>

            <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
                {/* Sidebar list */}
                <aside className="rounded-2xl border bg-white">
                    <div className="space-y-2 border-b p-3">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search blog…"
                                className="w-full rounded-lg border py-1.5 pr-2 pl-8 text-sm"
                            />
                        </div>
                        <Link
                            href="/organizer/blogs/create"
                            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
                        >
                            <Plus className="h-4 w-4" /> New
                        </Link>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto">
                        {filtered.map((b) => {
                            const active = selectedSlug === b.slug;
                            return (
                                <button
                                    key={b.slug}
                                    onClick={() => selectBlog(b)}
                                    className={`block w-full border-b px-3 py-2 text-left text-sm ${
                                        active ? "bg-slate-100" : "hover:bg-slate-50"
                                    }`}
                                >
                                    <div className="truncate font-medium">{b.title || "Untitled"}</div>
                                    <div className="truncate text-xs text-slate-500">/{b.slug}</div>
                                </button>
                            );
                        })}
                        {filtered.length === 0 && <div className="p-3 text-sm text-slate-500">Không có blog nào.</div>}
                    </div>
                </aside>

                {/* Detail + Preview */}
                <main className="space-y-6 rounded-2xl border bg-white p-4">
                    {!current ? (
                        <div className="text-sm text-slate-500">Chọn blog để xem & chỉnh sửa.</div>
                    ) : (
                        <>
                            {/* Preview card */}
                            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                                {current.cover && (
                                    <div className="mb-3 overflow-hidden rounded-lg border border-slate-200">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={current.cover} alt="cover" className="max-h-56 w-full object-cover" />
                                    </div>
                                )}
                                <h2 className="text-lg font-semibold text-slate-900">{current.title || "Untitled"}</h2>
                                <p className="mt-1 text-sm text-slate-600">
                                    {current.summary || "— Không có summary —"}
                                </p>
                                <div className="mt-2 line-clamp-4 text-sm whitespace-pre-line text-slate-700">
                                    {current.content || "— Nội dung trống —"}
                                </div>
                                {current.tags?.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {current.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="rounded-full bg-cyan-50 px-2 py-0.5 text-xs text-cyan-700"
                                            >
                                                #{t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </article>

                            {/* Editor */}
                            <div className="space-y-3">
                                <CoverUploader
                                    value={current.cover ?? null}
                                    onChange={(val) => {
                                        setCurrent({ ...current, cover: val || undefined });
                                    }}
                                    info={coverInfo}
                                    setInfo={setCoverInfo}
                                />

                                <label className="block text-sm">
                                    Title
                                    <input
                                        value={current.title}
                                        onChange={(e) => setCurrent({ ...current, title: e.target.value })}
                                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                                    />
                                </label>

                                <label className="block text-sm">
                                    Slug
                                    <input
                                        value={current.slug}
                                        onChange={(e) =>
                                            setCurrent({
                                                ...current,
                                                slug: e.target.value.trim().toLowerCase().replace(/\s+/g, "-"),
                                            })
                                        }
                                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                                    />
                                </label>

                                <label className="block text-sm">
                                    Summary
                                    <textarea
                                        value={current.summary}
                                        onChange={(e) => setCurrent({ ...current, summary: e.target.value })}
                                        rows={3}
                                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                                    />
                                </label>

                                <label className="block text-sm">
                                    Content
                                    <textarea
                                        value={current.content}
                                        onChange={(e) => setCurrent({ ...current, content: e.target.value })}
                                        rows={10}
                                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                                    />
                                </label>

                                <label className="block text-sm">
                                    Tags
                                    <input
                                        value={(current.tags || []).join(", ")}
                                        onChange={(e) =>
                                            setCurrent({
                                                ...current,
                                                tags: e.target.value
                                                    .split(",")
                                                    .map((t) => t.trim())
                                                    .filter(Boolean),
                                            })
                                        }
                                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                                    />
                                </label>

                                <div className="flex gap-2">
                                    <button
                                        onClick={saveEdit}
                                        className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white"
                                    >
                                        <Save className="h-4 w-4" /> Save
                                    </button>
                                    <button
                                        onClick={deleteBlog}
                                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50"
                                    >
                                        <Trash2 className="h-4 w-4" /> Delete
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </section>
    );
}
