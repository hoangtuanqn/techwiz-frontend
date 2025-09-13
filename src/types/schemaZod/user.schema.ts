// {
// "id": 163,
// "full_name": "Eda Rempel",
// "email": "udaniel@example.com",
// "enrollment_no": "ENR92217",
// "role": "admin",
// "email_verified_at": "2025-09-13T13:27:53.000000Z",
// "mobile": "0123456789",
// "department": "Marketing",
// "avatar_path": "/images/avatars/avatar3.png",
// "created_at": "2025-09-13T13:27:53.000000Z",
// "updated_at": "2025-09-13T13:27:53.000000Z"

import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";

// },
const userSchema = z.object({
    id: z.number(),
    full_name: z.string(),
    email: z.string().email(),
    enrollment_no: z.string().nullable(),
    role: z.enum(["admin", "organizer", "user"]),
    email_verified_at: z.string().nullable(),
    mobile: z.string().nullable(),
    department: z.string().nullable(),
    avatar_path: z.string().url().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
});
const _userListSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(userSchema),
});
export type UserListResponseType = z.infer<typeof _userListSchema>;
