import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";

const participantSchema = z.object({
    id: z.number(),
    event_id: z.number(),
    user_id: z.number(),
    status: z.string(),
    seat_no: z.string(),
    registered_on: z.string(),
    checked_in: z.number(),
    checked_in_at: z.nullable(z.string()),
    created_at: z.string(),
    updated_at: z.string(),
    user: z.object({
        id: z.number(),
        full_name: z.string(),
        email: z.string(),
    }),
});
const _participantListSchema = z.object({
    status: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(participantSchema),
});

export const participantListSchema = _participantListSchema;
export type ParticipantListResponseType = z.infer<typeof _participantListSchema>;
export type ParticipantType = z.infer<typeof participantSchema>;
