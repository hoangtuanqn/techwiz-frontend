// import z from "zod";

import z, { ZodTypeAny } from "zod";

// Generic nhận vào EntitySchema cụ thể (ZodObject)
export function paginationMetaSchemaFn<T extends ZodTypeAny>(EntitySchema: T) {
    return z.object({
        current_page: z.number(),
        data: z.array(EntitySchema),
        first_page_url: z.string(),
        from: z.number().nullable(),
        last_page: z.number(),
        last_page_url: z.string(),
        links: z.array(
            z.object({
                url: z.string().nullable(),
                label: z.string(),
                active: z.boolean(),
            }),
        ),
        next_page_url: z.string().nullable(),
        path: z.string(),
        per_page: z.number(),
        prev_page_url: z.string().nullable(),
        to: z.number().nullable(),
        total: z.number(),
    });
}