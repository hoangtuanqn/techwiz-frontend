"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail, IdCard, User as UserIcon, Phone, Lock, Building, UserPlus } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { registerSchema } from "./validation";
import authApi from "~/apiRequest/auth";
import { notificationErrorApi } from "~/libs/apis/validationResponse";
import { useAuth } from "~/hooks/useAuth";
import PasswordStrengthMeter from "~/components/layout/Auth/PasswordStrengthMeter";

type RegisterType = z.infer<typeof registerSchema>;

const FormRegister = () => {
    const { login } = useAuth();
    const router = useRouter();

    const form = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
        defaultValues: {
            full_name: "",
            email: "",
            mobile: "",

            password: "",
            department: "",
            enrollment_no: "",
        },
    });

    const registerMutation = useMutation({
        mutationFn: (data: RegisterType) => authApi.create(data),
        onSuccess: (res) => {
            login(res.data.data);
            toast.success("Register successful! Redirecting...");
            router.push("/");
        },
        onError: notificationErrorApi,
    });

    const onSubmit = (data: RegisterType) => {
        registerMutation.mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                {/* Full Name */}
                <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <UserIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input placeholder="Enter your full name" {...field} className="pl-10" />
                                </div>
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
                            <FormLabel>Email ID</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input type="email" placeholder="you@example.com" {...field} className="pl-10" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Contact Number */}
                <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Phone className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        {...field}
                                        className="pl-10"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                                </div>
                            </FormControl>
                            <PasswordStrengthMeter password={form.watch("password")} />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Department (Select) */}
                <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                                <div className="relative w-full!">
                                    <Building className="pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full! pl-10">
                                            <SelectValue placeholder="Select your department" />
                                        </SelectTrigger>
                                        <SelectContent className="w-full!">
                                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                                            <SelectItem value="Information Technology">
                                                Information Technology
                                            </SelectItem>
                                            <SelectItem value="Electronics">Electronics</SelectItem>
                                            <SelectItem value="Mechanical">Mechanical Engineering</SelectItem>
                                            <SelectItem value="Civil">Civil Engineering</SelectItem>
                                            <SelectItem value="Business">Business Studies</SelectItem>
                                            <SelectItem value="Design">Design</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Enrollment Number */}
                <FormField
                    control={form.control}
                    name="enrollment_no"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enrollment Number</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <IdCard className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input placeholder="e.g. Student123456" {...field} className="pl-10" />
                                </div>
                            </FormControl>
                            <p className="mt-1 text-xs text-slate-500">
                                Use your student enrollment number as provided by the faculty.
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:opacity-95"
                >
                    <UserPlus className="h-4 w-4" />
                    {registerMutation.isPending ? "Processing..." : "Register"}
                </Button>
            </form>
        </Form>
    );
};

export default FormRegister;
