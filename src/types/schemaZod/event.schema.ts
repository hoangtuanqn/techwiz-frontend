import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";
export const seatingSchema = z.object({
    id: z.number(),
    event_id: z.number(),
    total_seats: z.number(),
    waitlist_enabled: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});
export const eventItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    thumbnail: z.string().url(),
    category: z.string(),
    start_time: z.string(),
    end_time: z.string(),
    venue: z.string(),
    organizer_id: z.number(),
    status: z.string(),
    rejection_reason: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    booked_count: z.number(),
    seating: seatingSchema,
});

export const eventListSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(eventItemSchema),
});

export type EventListResponseType = z.infer<typeof eventListSchema>;
