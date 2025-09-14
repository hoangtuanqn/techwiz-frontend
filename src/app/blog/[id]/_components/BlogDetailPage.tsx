// app/blog/[id]/_components/BlogDetailPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, Eye, Heart } from "lucide-react";
import Link from "next/link";
import blogApi from "~/apiRequest/blog";
import { BlogItemType } from "~/types/schemaZod/blog.schema";
import { toast } from "sonner";

interface BlogDetailPageProps {
    blogId: number;
}

export default function BlogDetailPage({ blogId }: BlogDetailPageProps) {
    const router = useRouter();
    const [blog, setBlog] = useState<BlogItemType | null>(null);
    const [loading, setLoading] = useState(true);
    const [liking, setLiking] = useState(false);

    useEffect(() => {
        loadBlog();
    }, [blogId]);

    async function loadBlog() {
        try {
            setLoading(true);
            const response = await blogApi.getBlogDetail(blogId);
            if (response.data.success) {
                setBlog(response.data.data);
            }
        } catch (error) {
            console.error('Error loading blog:', error);
            toast.error('Không thể tải blog');
            router.push('/blog');
        } finally {
            setLoading(false);
        }
    }

    async function handleLike() {
        if (!blog || liking) return;
        
        try {
            setLiking(true);
            if (blog.is_liked) {
                await blogApi.unlikeBlog(blog.id);
                setBlog(prev => prev ? { ...prev, is_liked: false, likes_count: prev.likes_count - 1 } : null);
                toast.success('Đã bỏ thích bài viết');
            } else {
                await blogApi.likeBlog(blog.id);
                setBlog(prev => prev ? { ...prev, is_liked: true, likes_count: prev.likes_count + 1 } : null);
                toast.success('Đã thích bài viết');
            }
        } catch (error) {
            console.error('Error liking blog:', error);
            toast.error('Có lỗi khi thích bài viết');
        } finally {
            setLiking(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="mb-8">
                            <div className="h-4 bg-slate-200 rounded w-32 mb-4"></div>
                        </div>
                        <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
                        <div className="h-64 bg-slate-200 rounded mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                            <div className="h-4 bg-slate-200 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-white py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">Blog không tồn tại</h1>
                    <Link href="/blog" className="text-cyan-600 hover:text-cyan-700">
                        Quay lại danh sách blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Back button */}
                <Link 
                    href="/blog"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-8 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại danh sách blog
                </Link>

                {/* Header */}
                <header className="mb-8">
                    <div className="mb-4">
                        <span className="inline-block rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700 capitalize">
                            {blog.category}
                        </span>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
                        {blog.title}
                    </h1>
                    
                    {blog.excerpt && (
                        <p className="text-xl text-slate-600 leading-relaxed">
                            {blog.excerpt}
                        </p>
                    )}

                    {/* Meta info */}
                    <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{blog.author?.full_name || 'Unknown Author'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(blog.created_at).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>{blog.views_count} lượt xem</span>
                        </div>
                    </div>
                </header>

                {/* Cover image */}
                {blog.cover && (
                    <div className="mb-8 overflow-hidden rounded-2xl">
                        <img
                            src={blog.cover}
                            alt={blog.title}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                )}

                {/* Tags */}
                {blog.tags && (
                    <div className="mb-8 flex flex-wrap gap-2">
                        {blog.tags.split(',').map((tag, index) => (
                            <span
                                key={index}
                                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600"
                            >
                                #{tag.trim()}
                            </span>
                        ))}
                    </div>
                )}

                {/* Content */}
                <article className="prose prose-lg max-w-none mb-12">
                    <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                        {blog.content}
                    </div>
                </article>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-slate-200 pt-8">
                    <button
                        onClick={handleLike}
                        disabled={liking}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border transition-colors ${
                            blog.is_liked
                                ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
                                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                        } disabled:opacity-50`}
                    >
                        <Heart className={`h-5 w-5 ${blog.is_liked ? 'fill-current' : ''}`} />
                        <span>{blog.is_liked ? 'Đã thích' : 'Thích'}</span>
                        <span className="ml-1">({blog.likes_count})</span>
                    </button>

                    <div className="text-sm text-slate-500">
                        Cập nhật lần cuối: {new Date(blog.updated_at).toLocaleDateString('vi-VN')}
                    </div>
                </div>
            </div>
        </div>
    );
}
