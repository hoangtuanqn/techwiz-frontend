"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import blogApi from "~/apiRequest/blog";
import { BlogItemType } from "~/types/schemaZod/blog.schema";
import { toast } from "sonner";

export default function TestBlogSyncPage() {
    const [blogs, setBlogs] = useState<BlogItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadBlogs();
    }, []);

    async function loadBlogs() {
        try {
            setLoading(true);
            const response = await blogApi.getBlogs(1, 50);
            if (response.data.success) {
                setBlogs(response.data.data.data);
                toast.success(`Đã tải ${response.data.data.data.length} blogs từ API`);
            }
        } catch (error) {
            console.error('Error loading blogs:', error);
            toast.error('Không thể tải danh sách blog');
        } finally {
            setLoading(false);
        }
    }

    async function refreshBlogs() {
        try {
            setRefreshing(true);
            const response = await blogApi.getBlogs(1, 50);
            if (response.data.success) {
                setBlogs(response.data.data.data);
                toast.success(`Đã refresh ${response.data.data.data.length} blogs`);
            }
        } catch (error) {
            console.error('Error refreshing blogs:', error);
            toast.error('Không thể refresh danh sách blog');
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-4">
                        Test Blog Sync - Real-time Data
                    </h1>
                    <p className="text-slate-600 mb-6">
                        Trang này hiển thị dữ liệu blog thực từ API. 
                        Tạo/xóa blog trong Admin hoặc Organizer và click "Refresh" để kiểm tra đồng bộ.
                    </p>
                    
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={refreshBlogs}
                            disabled={refreshing}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
                        >
                            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                            {refreshing ? 'Đang refresh...' : 'Refresh'}
                        </button>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span>Total: {blogs.length} blogs</span>
                            <span>Published: {blogs.filter(b => b.status === 'published').length}</span>
                            <span>Draft: {blogs.filter(b => b.status === 'draft').length}</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin h-8 w-8 border-4 border-cyan-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-slate-600">Đang tải blogs...</p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500 text-lg">Không có blog nào trong hệ thống</p>
                        <p className="text-slate-400 text-sm mt-2">
                            Hãy tạo blog mới trong Admin hoặc Organizer
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        blog.status === 'published' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {blog.status}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        ID: {blog.id}
                                    </span>
                                </div>
                                
                                <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
                                    {blog.title}
                                </h3>
                                
                                <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                                    {blog.excerpt || 'Không có mô tả...'}
                                </p>
                                
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                                    <span className="capitalize">{blog.category}</span>
                                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                </div>
                                
                                <div className="flex items-center justify-between text-xs">
                                    <span>{blog.views_count} views</span>
                                    <span>{blog.likes_count} likes</span>
                                </div>
                                
                                {blog.tags && (
                                    <div className="mt-3 flex flex-wrap gap-1">
                                        {blog.tags.split(',').slice(0, 3).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs"
                                            >
                                                #{tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                
                                <div className="mt-4 pt-3 border-t border-slate-100">
                                    <span className="text-xs text-slate-400">
                                        Author: {blog.author?.full_name || 'Unknown'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="mt-12 p-6 bg-slate-50 rounded-lg">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Hướng dẫn test:</h2>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                        <li>Mở tab Admin Blogs (<code className="bg-slate-200 px-1 rounded">/admin/blogs</code>) hoặc Organizer Blogs (<code className="bg-slate-200 px-1 rounded">/organizer/blogs</code>)</li>
                        <li>Tạo một blog mới hoặc xóa blog hiện có</li>
                        <li>Quay lại tab này và click "Refresh"</li>
                        <li>Kiểm tra xem blog mới có xuất hiện hoặc blog bị xóa có biến mất không</li>
                        <li>Kiểm tra trang public blog (<code className="bg-slate-200 px-1 rounded">/blog</code>) cũng có đồng bộ không</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
