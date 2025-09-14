"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import blogApi from "~/apiRequest/blog";
import { BlogItemType } from "~/types/schemaZod/blog.schema";
import { toast } from "sonner";

export default function TestBlogPublicPage() {
    const [blogs, setBlogs] = useState<BlogItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadBlogs();
    }, []);

    async function loadBlogs() {
        try {
            setLoading(true);
            // Sử dụng publicApi (không cần authentication)
            const response = await blogApi.getBlogs(1, 50);
            if (response.data.success) {
                setBlogs(response.data.data.data);
                toast.success(`✅ Public API: Đã tải ${response.data.data.data.length} blogs (chỉ published)`);
            }
        } catch (error) {
            console.error('Error loading blogs:', error);
            toast.error('❌ Không thể tải danh sách blog từ public API');
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
                toast.success(`✅ Đã refresh ${response.data.data.data.length} blogs từ public API`);
            }
        } catch (error) {
            console.error('Error refreshing blogs:', error);
            toast.error('❌ Không thể refresh danh sách blog');
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-4">
                        Test Blog Public API Access
                    </h1>
                    <p className="text-slate-600 mb-6">
                        Trang này test public API - ai cũng có thể truy cập mà không cần đăng nhập.
                        Chỉ hiển thị blogs có status = "published".
                    </p>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <h3 className="text-green-800 font-semibold mb-2">✅ Public API Features:</h3>
                        <ul className="text-green-700 text-sm space-y-1">
                            <li>• Không cần đăng nhập để xem blogs</li>
                            <li>• Chỉ hiển thị blogs đã published</li>
                            <li>• Ai cũng có thể truy cập từ bất kỳ đâu</li>
                            <li>• Giống như Events API</li>
                        </ul>
                    </div>
                    
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={refreshBlogs}
                            disabled={refreshing}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                            {refreshing ? 'Đang refresh...' : 'Refresh Public API'}
                        </button>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span>Total: {blogs.length} published blogs</span>
                            <span>Categories: {[...new Set(blogs.map(b => b.category))].join(', ')}</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-slate-600">Đang tải blogs từ public API...</p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500 text-lg">Không có blog published nào</p>
                        <p className="text-slate-400 text-sm mt-2">
                            Hãy tạo blog mới và set status = "published"
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="border border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-green-50"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        ✅ Published
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
                                                className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs"
                                            >
                                                #{tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                
                                <div className="mt-4 pt-3 border-t border-green-200">
                                    <span className="text-xs text-slate-400">
                                        Author: {blog.author?.full_name || 'Unknown'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="mt-12 p-6 bg-slate-50 rounded-lg">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Test Cases:</h2>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                        <li><strong>Public Access:</strong> Mở trang này trong tab ẩn danh (không đăng nhập) - vẫn xem được blogs</li>
                        <li><strong>Published Only:</strong> Chỉ hiển thị blogs có status = "published"</li>
                        <li><strong>Draft Hidden:</strong> Blogs có status = "draft" không hiển thị cho public</li>
                        <li><strong>No Auth Required:</strong> Không cần token hoặc đăng nhập</li>
                        <li><strong>Admin/Organizer:</strong> Khi đăng nhập, họ có thể xem cả draft blogs</li>
                    </ol>
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-blue-800 font-semibold mb-2">🔗 Related Pages:</h3>
                        <ul className="text-blue-700 text-sm space-y-1">
                            <li>• <a href="/blog" className="underline">Public Blog Page</a> - Trang blog chính cho users</li>
                            <li>• <a href="/admin/blogs" className="underline">Admin Blogs</a> - Quản lý blogs (cần đăng nhập)</li>
                            <li>• <a href="/organizer/blogs" className="underline">Organizer Blogs</a> - Quản lý blogs (cần đăng nhập)</li>
                            <li>• <a href="/test-blog-sync" className="underline">Test Blog Sync</a> - Test đồng bộ dữ liệu</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
