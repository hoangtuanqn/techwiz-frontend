import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";
const organizerSchema = z.object({
    id: z.number(),
    full_name: z.string(),
    email: z.string().email(),
});
const seatingSchema = z.object({
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
    is_booked: z.boolean(),
    seating: seatingSchema,
});

export const eventListSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(eventItemSchema),
});

export type EventListResponseType = z.infer<typeof eventListSchema>;

export const eventDetailSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: eventItemSchema.extend({
        seating: seatingSchema,
        organizer: organizerSchema,
    }),
});
export type EventDetailResponseType = z.infer<typeof eventDetailSchema>;

const getEventScheduleItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    start_time: z.string(),
    end_time: z.string(),
    venue: z.string(),
    category: z.string(),
    booked_count: z.number(),
    is_booked: z.boolean(),
});

export const getEventScheduleSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(getEventScheduleItemSchema),
});
export type GetEventScheduleResponseType = z.infer<typeof getEventScheduleSchema>;
