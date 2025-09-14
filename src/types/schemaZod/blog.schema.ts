import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";

// Author schema
const authorSchema = z.object({
    id: z.number(),
    full_name: z.string(),
    email: z.string().email(),
    avatar: z.string().nullable().optional(),
});

// Blog item schema
export const blogItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    content: z.string(),
    excerpt: z.string().nullable(),
    cover: z.string().nullable(),
    category: z.enum([
        "technology",
        "culture", 
        "education",
        "other",
    ]),
    tags: z.string().nullable(),
    status: z.enum(["draft", "published"]),
    author_id: z.number(),
    views_count: z.number().default(0),
    likes_count: z.number().default(0),
    is_liked: z.boolean().default(false),
    created_at: z.string(),
    updated_at: z.string(),
    author: authorSchema.optional(),
});

// Blog list response schema
export const blogListSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(blogItemSchema),
});

export type BlogListResponseType = z.infer<typeof blogListSchema>;

// Blog detail response schema
export const blogDetailSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: blogItemSchema.extend({
        author: authorSchema,
    }),
});

export type BlogDetailResponseType = z.infer<typeof blogDetailSchema>;

// Blog create/update request schema
export const blogCreateSchema = z.object({
    title: z.string().min(1, "Tiêu đề là bắt buộc").max(255, "Tiêu đề không được quá 255 ký tự"),
    slug: z.string().min(1, "Slug là bắt buộc").max(255, "Slug không được quá 255 ký tự"),
    content: z.string().min(1, "Nội dung là bắt buộc"),
    excerpt: z.string().max(500, "Tóm tắt không được quá 500 ký tự").optional(),
    cover: z.string().max(255, "URL ảnh bìa không được quá 255 ký tự").optional(),
    category: z.enum(["technology", "culture", "education", "other"], {
        required_error: "Danh mục là bắt buộc",
    }),
    tags: z.string().optional(),
    status: z.enum(["draft", "published"]).optional(),
});

export const blogUpdateSchema = blogCreateSchema.partial().extend({
    id: z.number(),
});

export type BlogCreateType = z.infer<typeof blogCreateSchema>;
export type BlogUpdateType = z.infer<typeof blogUpdateSchema>;
export type BlogItemType = z.infer<typeof blogItemSchema>;

// Like/Unlike response schema
export const blogLikeSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        likes_count: z.number(),
    }),
});

export type BlogLikeResponseType = z.infer<typeof blogLikeSchema>;
