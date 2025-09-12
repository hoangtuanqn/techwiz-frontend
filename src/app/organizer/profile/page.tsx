"use client";

import * as React from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    User,
    Mail,
    FileText,
    Activity,
    ImageUp,
    RefreshCcw,
    ShieldCheck,
    ShieldAlert,
    Check,
    Send,
} from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

/* ------------------------
   1. Schema validation (zod)
   ------------------------ */
const schema = z.object({
    display_name: z.string().min(2, "Must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    bio: z.string().max(300, "Maximum 300 characters").optional(),
    status: z.enum(["active", "away", "busy", "disabled"]),
});
type ProfileForm = z.infer<typeof schema>;

/* ------------------------
   2. Status labels
   ------------------------ */
const STATUS_LABEL: Record<ProfileForm["status"], string> = {
    active: "Active",
    away: "Away",
    busy: "Busy",
    disabled: "Disabled",
};

/* ------------------------
   3. Props (initial data + delete hook)
   ------------------------ */
type Props = {
    onDelete?: () => Promise<void> | void;
    initial?: Partial<ProfileForm> & { avatar_url?: string | null; email_verified?: boolean };
};

/* ------------------------
   4. Main component
   ------------------------ */
export default function AdminProfileCardLight({ onDelete, initial }: Props) {
    // React Hook Form setup
    const form = useForm<ProfileForm>({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: {
            display_name: initial?.display_name ?? "Admin User",
            email: initial?.email ?? "admin@example.com",
            bio: initial?.bio ?? "",
            status: (initial?.status as ProfileForm["status"]) ?? "active",
        },
    });

    /* ------------------------
     5. Avatar picker state
     ------------------------ */
    const [avatarPreview, setAvatarPreview] = React.useState<string | null>(initial?.avatar_url ?? null);
    const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
    const [avatarErr, setAvatarErr] = React.useState<string | null>(null);
    const fileRef = React.useRef<HTMLInputElement>(null);

    const openFile = () => fileRef.current?.click();

    const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvatarErr(null);
        const f = e.target.files?.[0];
        if (!f) return;
        const isImg = /^image\/(png|jpeg|jpg|webp)$/.test(f.type);
        if (!isImg) return setAvatarErr("Only PNG, JPG, JPEG, WEBP are allowed");
        if (f.size > 2 * 1024 * 1024) return setAvatarErr("Maximum size is 2MB");
        setAvatarFile(f);
        setAvatarPreview(URL.createObjectURL(f));
    };

    const removeAvatar = () => {
        setAvatarFile(null);
        setAvatarPreview(null);
        setAvatarErr(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    /* ------------------------
     6. Email verification (demo)
     ------------------------ */
    const [emailVerified, setEmailVerified] = React.useState<boolean>(!!initial?.email_verified);
    const [codeInput, setCodeInput] = React.useState("");
    const [codeSent, setCodeSent] = React.useState<string | null>(null);
    const [sending, setSending] = React.useState(false);
    const [verifying, setVerifying] = React.useState(false);

    // Khi user thay đổi email -> reset trạng thái verify
    const emailWatch = form.watch("email");
    React.useEffect(() => {
        setEmailVerified(false);
        setCodeInput("");
        setCodeSent(null);
    }, [emailWatch]);

    const sendCode = async () => {
        // validate email trước khi gửi
        const valid = await form.trigger("email");
        if (!valid) return;

        setSending(true);
        // giả lập call API
        await new Promise((r) => setTimeout(r, 600));
        // tạo mã 6 số demo
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setCodeSent(code);
        setSending(false);
        alert(`Demo verification code: ${code}`); // demo: hiện code cho bạn test ngay
    };

    const verifyCode = async () => {
        if (!codeSent) return;
        setVerifying(true);
        await new Promise((r) => setTimeout(r, 400));
        if (codeInput.trim() === codeSent) {
            setEmailVerified(true);
            setCodeInput("");
            setCodeSent(null);
        } else {
            alert("Verification code is incorrect. Please try again.");
        }
        setVerifying(false);
    };

    /* ------------------------
     7. Submit form handler
     ------------------------ */
    const onSubmit = (data: ProfileForm) => {
        if (!emailVerified) {
            const go = confirm("Email is not verified yet. Continue anyway?");
            if (!go) return;
        }

        const payload = new FormData();
        payload.append("display_name", data.display_name);
        payload.append("email", data.email);
        payload.append("bio", data.bio ?? "");
        payload.append("status", data.status);
        payload.append("email_verified", String(emailVerified));
        if (avatarFile) payload.append("avatar", avatarFile);

        // TODO: call backend API with payload
        console.log("Update payload ->", { ...data, emailVerified, avatarFile });
    };

    /* ------------------------
     8. Reset/Delete handler
     ------------------------ */
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to reset this profile?")) return;
        try {
            await onDelete?.();
            form.reset({ display_name: "", email: "", bio: "", status: "active" });
            removeAvatar();
            setEmailVerified(false);
            setCodeInput("");
            setCodeSent(null);
        } catch (e) {
            console.error(e);
        }
    };

    /* ------------------------
     9. JSX UI
     ------------------------ */
    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 sm:p-5">
                <div className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-slate-200">
                    {avatarPreview ? (
                        <Image src={avatarPreview} alt="avatar" fill className="object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-300 to-pink-300 text-slate-900">
                            <User className="h-6 w-6" />
                        </div>
                    )}
                </div>

                <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-slate-800">{form.getValues("display_name")}</h2>
                    <p className="truncate text-sm text-slate-500">{form.getValues("email")}</p>
                </div>

                <span className="ml-auto rounded-full bg-[#06b6d4]/10 px-3 py-1 text-xs font-semibold text-[#06b6d4] ring-1 ring-[#06b6d4]/30">
                    ADMIN
                </span>
            </div>

            <div className="border-t border-slate-200" />

            {/* Body */}
            <div className="p-4 sm:p-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Display name */}
                        <FormField
                            control={form.control}
                            name="display_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">Display Name</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                {...field}
                                                placeholder="Enter your name"
                                                className="pl-10 focus:ring-2 focus:ring-[#06b6d4]/40"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email + verify */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">Email</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Input {...field} placeholder="you@example.com" className="pr-28 pl-10" />
                                            {/* Badge trạng thái verify (đặt bên phải input) */}
                                            <span
                                                className={[
                                                    "absolute top-1/2 right-2 -translate-y-1/2 rounded-full px-2 py-0.5 text-[10px] font-semibold select-none",
                                                    emailVerified
                                                        ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
                                                        : "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
                                                ].join(" ")}
                                                title={emailVerified ? "Verified" : "Not verified"}
                                            >
                                                {emailVerified ? "Verified" : "Unverified"}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />

                                    {/* Hành động verify */}
                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={sendCode}
                                            disabled={sending}
                                            className="bg-[#06b6d4] text-white hover:opacity-90"
                                        >
                                            <Send className="mr-2 h-4 w-4" />
                                            {sending ? "Sending…" : "Send code"}
                                        </Button>

                                        {/* Ô nhập code chỉ hiển thị khi đã gửi code */}
                                        {codeSent && (
                                            <>
                                                <Input
                                                    value={codeInput}
                                                    onChange={(e) =>
                                                        setCodeInput(e.target.value.replace(/\D/g, "").slice(0, 6))
                                                    }
                                                    placeholder="Enter 6-digit code"
                                                    className="h-9 w-40"
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={verifyCode}
                                                    disabled={!codeInput || verifying}
                                                >
                                                    <Check className="mr-2 h-4 w-4" />
                                                    {verifying ? "Verifying…" : "Verify"}
                                                </Button>
                                            </>
                                        )}
                                    </div>

                                    {/* Gợi ý nhỏ */}
                                    {!emailVerified && (
                                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                            <ShieldAlert className="h-3.5 w-3.5" />
                                            Verify your email to secure your account.
                                        </p>
                                    )}
                                    {emailVerified && (
                                        <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                                            <ShieldCheck className="h-3.5 w-3.5" />
                                            Email has been verified.
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />

                        {/* Bio */}
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700">Bio</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <FileText className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-slate-400" />
                                            <Textarea
                                                {...field}
                                                rows={4}
                                                placeholder="Write a short bio…"
                                                className="pl-10 focus:ring-2 focus:ring-[#06b6d4]/40"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Avatar ⟷ Status */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <FormLabel className="text-slate-700">Avatar</FormLabel>
                                <div className="mt-2 flex flex-wrap items-center gap-3">
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        className="hidden"
                                        onChange={onAvatarChange}
                                    />
                                    <Button
                                        type="button"
                                        onClick={openFile}
                                        className="bg-[#06b6d4] text-white hover:opacity-90"
                                    >
                                        <ImageUp className="mr-2 h-4 w-4" /> Choose Image
                                    </Button>
                                    {avatarPreview && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={removeAvatar}
                                            className="border-slate-300 text-slate-700 hover:bg-slate-50"
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                                {avatarErr && <p className="mt-2 text-sm text-rose-600">{avatarErr}</p>}
                                <p className="mt-1 text-xs text-slate-500">Supports PNG/JPG/JPEG/WEBP, max 2MB.</p>
                            </div>

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">Status</FormLabel>
                                        <FormControl>
                                            <div className="relative mt-2">
                                                <Activity className="pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="pl-10">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(STATUS_LABEL).map(([value, label]) => (
                                                            <SelectItem key={value} value={value}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleDelete}
                                className="bg-rose-600 text-white hover:bg-rose-700"
                            >
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                            <Button type="submit" className="bg-[#06b6d4] text-white hover:opacity-90">
                                Update Profile
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </article>
    );
}
