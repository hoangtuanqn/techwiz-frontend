"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Save, Trash2, Plus } from "lucide-react";
import CoverUploader from "../_components/CoverUploader";
import blogApi from "~/apiRequest/blog";
import { BlogItemType, BlogUpdateType } from "~/types/schemaZod/blog.schema";
import { toast } from "sonner";

type Blog = BlogItemType;

export default function MyBlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [search, setSearch] = useState("");
    const [current, setCurrent] = useState<Blog | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // Cover image info (UI only)
    const [coverInfo, setCoverInfo] = useState<{ name: string; size: string } | null>(null);

    // Load blogs from API
    useEffect(() => {
        loadBlogs();
    }, []);

    async function loadBlogs() {
        try {
            setLoading(true);
            const response = await blogApi.getBlogs(1, 100); // Load many blogs for admin
            if (response.data.success) {
                setBlogs(response.data.data.data);
            }
        } catch (error) {
            console.error('Error loading blogs:', error);
            toast.error('Failed to load blog list');
        } finally {
            setLoading(false);
        }
    }

    const filtered = blogs.filter((b) => {
        const key = search.toLowerCase();
        return b.title.toLowerCase().includes(key) || b.slug.toLowerCase().includes(key);
    });

    function selectBlog(b: Blog) {
        setCurrent(b);
        setSelectedId(b.id);
        setCoverInfo(null);
    }

    async function saveEdit() {
        if (!current || !selectedId) return;

        try {
            setLoading(true);
            const updateData: BlogUpdateType = {
                id: current.id,
                title: current.title,
                slug: current.slug,
                content: current.content,
                excerpt: current.excerpt || undefined,
                cover: current.cover || undefined,
                category: current.category,
                tags: current.tags || undefined,
                status: current.status,
            };

            const response = await blogApi.updateBlog(current.id, updateData);
            if (response.data.success) {
                toast.success("Saved successfully!");
                await loadBlogs(); // Reload blogs
                setSelectedId(current.id);
            }
        } catch (error: any) {
            console.error('Error updating blog:', error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error updating blog');
            }
        } finally {
            setLoading(false);
        }
    }

    async function deleteBlog() {
        if (!current || !selectedId) return;
        if (!confirm("Delete this blog?")) return;

        try {
            setLoading(true);
            const response = await blogApi.deleteBlog(current.id);
            if (response.data.success) {
                toast.success("Deleted successfully!");
                await loadBlogs(); // Reload blogs
                setCurrent(null);
                setSelectedId(null);
                setCoverInfo(null);
            }
        } catch (error: any) {
            console.error('Error deleting blog:', error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error deleting blog');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="grid gap-6">
            <article className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Admin Blogs</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Manage all blogs in the system. You can view, edit, and delete blogs.
                        </p>
                    </div>
                    <Link
                        href="/admin/blogs/create"
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
                            href="/admin/blogs/create"
                            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
                        >
                            <Plus className="h-4 w-4" /> New
                        </Link>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center text-sm text-slate-500">
                                Loading...
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="p-4 text-center text-sm text-slate-500">
                                No blogs found
                            </div>
                        ) : (
                            filtered.map((b) => {
                                const active = selectedId === b.id;
                                return (
                                    <button
                                        key={b.id}
                                        onClick={() => selectBlog(b)}
                                        className={`block w-full border-b px-3 py-2 text-left text-sm ${
                                            active ? "bg-slate-100" : "hover:bg-slate-50"
                                        }`}
                                    >
                                        <div className="truncate font-medium">{b.title || "Untitled"}</div>
                                        <div className="truncate text-xs text-slate-500">/{b.slug}</div>
                                        <div className="text-xs text-slate-400">
                                            Status: {b.status} | Views: {b.views_count}
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </aside>

                {/* Detail + Preview */}
                <main className="space-y-6 rounded-2xl border bg-white p-4">
                    {!current ? (
                        <div className="text-sm text-slate-500">Select a blog to view and edit.</div>
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
                                    {current.excerpt || "— No excerpt —"}
                                </p>
                                <div className="mt-2 line-clamp-4 text-sm whitespace-pre-line text-slate-700">
                                    {current.content || "— Empty content —"}
                                </div>
                                {current.tags && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {current.tags.split(',').map((t, index) => (
                                            <span
                                                key={index}
                                                className="rounded-full bg-cyan-50 px-2 py-0.5 text-xs text-cyan-700"
                                            >
                                                #{t.trim()}
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
                                    Excerpt
                                    <textarea
                                        value={current.excerpt || ''}
                                        onChange={(e) => setCurrent({ ...current, excerpt: e.target.value })}
                                        rows={3}
                                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                                        placeholder="Short summary for the blog..."
                                    />
                                </label>

                                <label className="block text-sm">
                                    Category
                                    <select
                                        value={current.category}
                                        onChange={(e) => setCurrent({ ...current, category: e.target.value as any })}
                                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                                    >
                                        <option value="technology">Technology</option>
                                        <option value="culture">Culture</option>
                                        <option value="education">Education</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>

                                <label className="block text-sm">
                                    Status
                                    <select
                                        value={current.status}
                                        onChange={(e) => setCurrent({ ...current, status: e.target.value as any })}
                                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
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
                                    Tags (comma separated)
                                    <input
                                        value={current.tags || ''}
                                        onChange={(e) =>
                                            setCurrent({
                                                ...current,
                                                tags: e.target.value,
                                            })
                                        }
                                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                                        placeholder="tag1, tag2, tag3"
                                    />
                                </label>

                                <div className="flex gap-2">
                                    <button
                                        onClick={saveEdit}
                                        disabled={loading}
                                        className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white disabled:opacity-50"
                                    >
                                        <Save className="h-4 w-4" />
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                    <button
                                        onClick={deleteBlog}
                                        disabled={loading}
                                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        {loading ? "Deleting..." : "Delete"}
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
