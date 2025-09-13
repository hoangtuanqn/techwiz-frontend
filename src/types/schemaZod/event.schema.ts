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
    summary: z.string(),
    thumbnail: z.string().url(),
    category: z.enum([
        "technical",
        "business",
        "cultural",
        "sports",
        "workshop",
        "academic",
        "annual",
        "community",
        "other",
    ]),
    start_event: z.string(),
    end_event: z.string(),
    venue: z.string(),
    mode: z.enum(["onsite", "online", "hybrid"]),
    note: z.string(),

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
    start_event: z.string(),
    end_event: z.string(),
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

// Schema sự kiện đã đăng ký thêm cái thuộc tính registrations
const registrationSchema = z.object({
    id: z.number(),
    event_id: z.number(),
    user_id: z.number(),
    status: z.string(),
    seat_no: z.number().nullable(),
    registered_on: z.string(),
    checked_in: z.number(),
    checked_in_at: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
});

const _eventRegisteredItemSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(
        eventItemSchema.extend({
            seating: seatingSchema,
            organizer: organizerSchema,
            user_registration: registrationSchema,
        }),
    ),
});
export type EventRegisteredResponseType = z.infer<typeof _eventRegisteredItemSchema>;
