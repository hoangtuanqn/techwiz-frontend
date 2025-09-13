"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import userApi from "~/apiRequest/user/user";
import { notificationErrorApi } from "~/libs/apis/validationResponse";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Mail, Phone, IdCard, Building, User as UserIcon } from "lucide-react";

/** ---------- Schema ---------- */
const profileSchema = z.object({
    full_name: z.string().trim().min(1, "Full name is required").max(255),
    email: z.string().email("Invalid email address"),
    enrollment_no: z.string().trim().min(1, "Enrollment number is required"),
    mobile: z
        .string()
        .trim()
        .regex(/^\+?\d{9,11}$/, "Invalid mobile number"),
    department: z.string().trim().min(1, "Department is required"),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    initialData: ProfileFormValues;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
    const qc = useQueryClient();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: useMemo(() => initialData, [initialData]),
        mode: "onBlur",
    });

    useEffect(() => {
        form.reset(initialData);
    }, [initialData]); // eslint-disable-line react-hooks/exhaustive-deps

    const mutation = useMutation({
        mutationFn: async (data: ProfileFormValues) => {
            const res = await userApi.updateProfile(data);
            return res.data; // kỳ vọng { data: { ...updatedUser } }
        },
        onSuccess: (data) => {
            const updated = {
                full_name: data?.data?.full_name ?? form.getValues("full_name"),
                email: data?.data?.email ?? form.getValues("email"),
                enrollment_no: data?.data?.enrollment_no ?? form.getValues("enrollment_no"),
                mobile: data?.data?.mobile ?? form.getValues("mobile"),
                department: data?.data?.department ?? form.getValues("department"),
            } satisfies ProfileFormValues;

            form.reset(updated, { keepErrors: false, keepDirty: false });
            qc.invalidateQueries({ queryKey: ["me"] });
            toast.success("Profile updated successfully!");
        },
        onError: notificationErrorApi,
    });

    const onSubmit = (data: ProfileFormValues) => mutation.mutate(data);

    const roCls = "bg-slate-100 text-slate-500 cursor-not-allowed"; // readOnly look

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Full name */}
                    <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <UserIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input placeholder="Jane Doe" {...field} className="pl-10" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email (read-only visual) */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        {/* Dùng readOnly để vẫn submit giá trị qua RHF, nhưng khóa sửa */}
                                        <Input
                                            placeholder="you@example.com"
                                            {...field}
                                            readOnly
                                            aria-readonly
                                            className={`pl-10 ${roCls}`}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Mobile */}
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile Number</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Phone className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            placeholder="+84901234567"
                                            {...field}
                                            inputMode="tel"
                                            className="pl-10"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Enrollment no (read-only visual) */}
                    <FormField
                        control={form.control}
                        name="enrollment_no"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enrollment Number</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <IdCard className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            placeholder="SV123456"
                                            {...field}
                                            readOnly
                                            aria-readonly
                                            className={`pl-10 ${roCls}`}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Department */}
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Department</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Building className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input placeholder="Computer Science" {...field} className="pl-10" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => form.reset()} disabled={mutation.isPending}>
                        Reset
                    </Button>

                    <Button type="submit" disabled={mutation.isPending || !form.formState.isDirty}>
                        {mutation.isPending ? "Updating..." : "Update Information"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
