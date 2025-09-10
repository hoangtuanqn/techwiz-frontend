"use client";

import React from "react";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

// import contactApi from "~/apiRequest/contact"; // <-- nếu đã có
// import { notificationErrorApi } from "~/libs/apis/validationResponse"; // <-- nếu dùng chung

const contactSchema = z.object({
    name: z.string().min(2, "Please enter at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    message: z.string().min(10, "Message should be at least 10 characters."),
});

type ContactType = z.infer<typeof contactSchema>;

const FormContact = () => {
    const form = useForm<ContactType>({
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const mutation = useMutation({
        mutationFn: (data: ContactType) => {
            // Giả sử contactApi đã được định nghĩa để gửi dữ liệu liên hệ
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(data);
                }, 2000);
            });
        },

        onSuccess: () => {
            toast.success("Message sent successfully! We’ll get back to you soon.");
            form.reset({ name: "", email: "", message: "" });
        },
        onError: () => {
            // notificationErrorApi?.(err);
            toast.error("Something went wrong. Please try again later.");
        },
    });

    const onSubmit = (data: ContactType) => mutation.mutate(data);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Message */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea rows={4} placeholder="Write your message here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="inline-flex items-center gap-2 bg-[#06b6d4] text-white hover:opacity-90 disabled:opacity-60"
                    >
                        {mutation.isPending ? (
                            <>
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4" />
                                Send Message
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default FormContact;
