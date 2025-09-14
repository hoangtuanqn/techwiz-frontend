"use client";

import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CoverUploader from "../../_components/CoverUploader";
import blogApi from "~/apiRequest/blog";
import { BlogCreateType } from "~/types/schemaZod/blog.schema";
import { toast } from "sonner";

export default function CreateBlogPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState<"technology" | "culture" | "education" | "other">("technology");
    const [status, setStatus] = useState<"draft" | "published">("draft");
    const [cover, setCover] = useState<string | null>(null);
    const [coverInfo, setCoverInfo] = useState<{ name: string; size: string } | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSave() {
        if (!title.trim() || !slug.trim() || !content.trim()) {
            toast.error("Vui lòng nhập đầy đủ Title, Slug và Content!");
            return;
        }

        try {
            setLoading(true);
            const blogData: BlogCreateType = {
                title: title.trim(),
                slug: slug.trim(),
                content: content.trim(),
                excerpt: excerpt.trim() || undefined,
                cover: cover || undefined,
                category,
                tags: tags.trim() || undefined,
                status,
            };

            const response = await blogApi.createBlog(blogData);
            if (response.data.success) {
                toast.success("Tạo blog thành công!");
                router.push("/organizer/blogs");
            }
        } catch (error: any) {
            console.error('Error creating blog:', error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Có lỗi khi tạo blog');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="grid gap-6">
            {/* Header */}
            <article className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Create Blog</h1>
                    <Link
                        href="/organizer/blogs"
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
                    Excerpt (Tóm tắt)
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        rows={3}
                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                        placeholder="Tóm tắt ngắn cho blog..."
                    />
                </label>

                <label className="block text-sm">
                    Category
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
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
                        value={status}
                        onChange={(e) => setStatus(e.target.value as any)}
                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </label>

                <label className="block text-sm">
                    Content *
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                        placeholder="Nội dung blog..."
                        required
                    />
                </label>

                <label className="block text-sm">
                    Tags (phân cách bằng dấu phẩy)
                    <input
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                        placeholder="tag1, tag2, tag3"
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                >
                    <Save className="h-4 w-4" /> 
                    {loading ? "Creating..." : "Create Blog"}
                </button>
            </form>
        </section>
    );
}
