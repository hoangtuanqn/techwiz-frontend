import z from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Full name is required")
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name is too long")
        .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),

    email: z.string().min(1, "Email is required").email("Invalid email address").max(254, "Email is too long"),

    mobile: z
        .string()
        .min(1, "Contact number is required")
        .min(8, "Phone number must be at least 8 digits")
        .max(20, "Phone number is too long")
        .regex(/^[+]?[\d\s\-()]+$/, "Invalid phone number format"),

    username: z
        .string()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username is too long")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
        .refine((val) => !val.startsWith("_") && !val.endsWith("_"), {
            message: "Username cannot start or end with underscore",
        }),

    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password is too long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        ),

    department: z
        .string()
        .min(1, "Please select your department")
        .refine(
            (val) =>
                [
                    "Computer Science",
                    "Information Technology",
                    "Electronics",
                    "Mechanical",
                    "Civil",
                    "Business",
                    "Design",
                ].includes(val),
            {
                message: "Please select a valid department",
            },
        ),

    enrollment_no: z
        .string()
        .min(1, "Enrollment number is required")
        .min(5, "Enrollment number must be at least 5 characters")
        .max(20, "Enrollment number is too long")
        .regex(/^Student\d{6}$/, "Enrollment number must follow format: Student123456"),
});
