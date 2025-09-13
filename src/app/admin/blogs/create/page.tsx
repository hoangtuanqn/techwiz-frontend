"use client";

import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import CoverUploader from "../../_components/CoverUploader";

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

export default function CreateBlogPage() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [cover, setCover] = useState<string | null>(null);
    const [coverInfo, setCoverInfo] = useState<{ name: string; size: string } | null>(null);

    function handleSave() {
        if (!title.trim() || !slug.trim()) {
            alert("Vui lòng nhập Title và Slug!");
            return;
        }
        const blogs = loadBlogs();
        if (blogs.some((b) => b.slug === slug)) {
            alert("Slug đã tồn tại!");
            return;
        }

        const newBlog: Blog = {
            title,
            slug,
            summary,
            content,
            tags,
            cover: cover || undefined,
            updatedAt: new Date().toISOString(),
        };

        saveBlogs([...blogs, newBlog]);

        alert("Blog đã được tạo!");
        setTitle("");
        setSlug("");
        setSummary("");
        setContent("");
        setTags([]);
        setCover(null);
        setCoverInfo(null);
    }

    return (
        <section className="grid gap-6">
            {/* Header */}
            <article className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Create Blog</h1>
                    <Link
                        href="/admin/blogs"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back
                    </Link>
                </div>
                <p className="mt-1 text-sm text-slate-600">Tạo blog mới và lưu tạm vào localStorage.</p>
            </article>

            {/* Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
                className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
            >
                {/* Cover uploader dùng chung */}
                <CoverUploader value={cover} onChange={setCover} info={coverInfo} setInfo={setCoverInfo} />

                <label className="block text-sm">
                    Title
                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setSlug(e.target.value.trim().toLowerCase().replace(/\s+/g, "-"));
                        }}
                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                    />
                </label>

                <label className="block text-sm">
                    Slug
                    <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                    />
                </label>

                <label className="block text-sm">
                    Summary
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={3}
                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                    />
                </label>

                <label className="block text-sm">
                    Content
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                    />
                </label>

                <label className="block text-sm">
                    Tags (cách nhau bởi dấu phẩy)
                    <input
                        value={tags.join(", ")}
                        onChange={(e) =>
                            setTags(
                                e.target.value
                                    .split(",")
                                    .map((t) => t.trim())
                                    .filter(Boolean),
                            )
                        }
                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                    />
                </label>

                <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                    <Save className="h-4 w-4" /> Save Blog
                </button>
            </form>
        </section>
    );
}