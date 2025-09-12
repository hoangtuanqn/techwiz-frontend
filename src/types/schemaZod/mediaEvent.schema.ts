import { z } from "zod";
import { paginationMetaSchemaFn } from "./common.schema";

const mediaEventSchema = z.object({
    id: z.number(),
    event_id: z.number(),
    media_type: z.string(),
    thumbnail: z.string(),
    caption: z.string(),
    uploaded_by_user_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    event: z.object({
        title: z.string(),
        category: z.string(),
    }),
});
export const MediaEventResponseType = z.object({
    status: z.string(),
    message: z.string(),
    data: paginationMetaSchemaFn(mediaEventSchema),
});
export type MediaEventResponseType = z.infer<typeof MediaEventResponseType>;
