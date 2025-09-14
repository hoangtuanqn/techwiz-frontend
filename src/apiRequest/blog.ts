import publicApi from "~/libs/apis/publicApi";
import privateApi from "~/libs/apis/privateApi";
import {
    BlogDetailResponseType,
    BlogListResponseType,
} from "~/types/schemaZod/blog.schema";

const blogApi = {
    // Lấy danh sách blogs
    getBlogs: (
        page: number = 1,
        limit: number = 9,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/blogs?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, likes_count, views_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần (category, status...)
        }
        return publicApi.get<BlogListResponseType>(query);
    },

    // Lấy chi tiết blog
    getBlogDetail: (id: number, headers?: { [key: string]: string }) => {
        return publicApi.get<BlogDetailResponseType>(`/blogs/${id}`, headers ? { headers } : undefined);
    },

    // Lấy blog theo slug
    getBlogBySlug: (slug: string) => {
        return publicApi.get<BlogDetailResponseType>(`/blogs/${slug}`);
    },

    // Tạo blog mới (cần authentication)
    createBlog: (data: {
        title: string;
        slug: string;
        content: string;
        excerpt?: string;
        cover?: string;
        category: "technology" | "culture" | "education" | "other";
        tags?: string;
        status?: "draft" | "published";
    }) => {
        return privateApi.post(`/blogs`, data);
    },

    // Cập nhật blog (cần authentication)
    updateBlog: (id: number, data: {
        title?: string;
        slug?: string;
        content?: string;
        excerpt?: string;
        cover?: string;
        category?: "technology" | "culture" | "education" | "other";
        tags?: string;
        status?: "draft" | "published";
    }) => {
        return privateApi.put(`/blogs/${id}`, data);
    },

    // Xóa blog (cần authentication)
    deleteBlog: (id: number) => {
        return privateApi.delete(`/blogs/${id}`);
    },

    // Like blog (cần authentication)
    likeBlog: (id: number) => {
        return privateApi.post(`/blogs/${id}/like`);
    },

    // Unlike blog (cần authentication)
    unlikeBlog: (id: number) => {
        return privateApi.post(`/blogs/${id}/unlike`);
    },

    // Lấy blogs theo category
    getBlogsByCategory: (
        category: string,
        page: number = 1,
        limit: number = 9
    ) => {
        return publicApi.get<BlogListResponseType>(`/blogs?filter[category]=${category}&page=${page}&limit=${limit}`);
    },

    // Search blogs
    searchBlogs: (
        searchTerm: string,
        page: number = 1,
        limit: number = 9
    ) => {
        return publicApi.get<BlogListResponseType>(`/blogs?filter[title]=${searchTerm}&page=${page}&limit=${limit}`);
    },
};

export default blogApi;
