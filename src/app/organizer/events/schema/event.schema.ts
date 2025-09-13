import z from "zod";

export const eventSchema = z
    .object({
        title: z.string().min(1, "Title is required"),
        summary: z.string().min(1, "Summary is required").max(300, "Summary must be ≤ 300 characters"),
        description: z.string().min(1, "Description is required").max(5000, "Description too long"),
        start_event: z.string().min(1, "Start datetime is required"),
        thumbnail: z
            .string()
            .url("URL is invalid")
            .optional()
            .or(z.literal("").transform(() => undefined)),
        end_event: z.string().min(1, "End datetime is required"),
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
        capacity: z.number().min(20, "Capacity must be at least 20").max(1000, "Capacity must be at most 1000"),
        mode: z.enum(["onsite", "online", "hybrid"]),
        venue: z.string().min(1, "Venue / Link is required"),
        note: z.string(),
    })
    .superRefine((data, ctx) => {
        // start < end
        const s = Date.parse(data.start_event);
        const e = Date.parse(data.end_event);
        if (!Number.isNaN(s) && !Number.isNaN(e) && e <= s) {
            ctx.addIssue({
                path: ["end_event"],
                code: z.ZodIssueCode.custom,
                message: "End datetime must be later than start datetime",
            });
        }

        // If online/hybrid, require URL-ish input for venue
        if ((data.mode === "online" || data.mode === "hybrid") && data.venue) {
            const looksLink = /^https?:\/\//i.test(data.venue);
            if (!looksLink) {
                ctx.addIssue({
                    path: ["venue"],
                    code: z.ZodIssueCode.custom,
                    message: "For online/hybrid, please enter a valid URL (starts with http/https)",
                });
            }
        }
    });
