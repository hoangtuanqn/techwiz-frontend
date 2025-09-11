import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Mail, Lock, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import authApi from "~/apiRequest/auth";
import { toast } from "sonner";
import { notificationErrorApi } from "~/libs/apis/validationResponse";
import { useRouter } from "next/navigation";
import { useAuth } from "~/hooks/useAuth";
// Định nghĩa schema validation bằng zod
const loginSchema = z.object({
    email: z.string().min(3,"Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
type LoginType = z.infer<typeof loginSchema>;

const FormLogin = () => {
    const router = useRouter();

    const { login } = useAuth();
    const form = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
        },
    });
    // Khai báo mutation
    const loginMutation = useMutation({
        mutationFn: (data: { email: string; password: string }) => authApi.login(data),

        onSuccess: (res) => {
            router.refresh();
            router.push("/");

            login(res.data.data);
            toast.success("Login successful! Redirecting...");
        },

        onError: notificationErrorApi,
    });
    const onSubmit = (data: LoginType) => {
        loginMutation.mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                {/* Username */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input placeholder="you@example.com" {...field} className="pl-10" />
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
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:opacity-95"
                >
                    <LogIn className="h-4 w-4" /> Log in
                </Button>
            </form>
        </Form>
    );
};

export default FormLogin;
