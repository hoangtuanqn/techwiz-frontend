"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

type FormState = {
    name: string;
    email: string;
    message: string;
    company: string; // honeypot
};

export default function ContactPage() {
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        message: "",
        company: "",
    });
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const onChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((s) => ({ ...s, [field]: e.target.value }));
        setErrors((s) => ({ ...s, [field]: undefined }));
        setStatus("idle");
    };

    const validate = () => {
        const next: Partial<FormState> = {};
        if (!form.name || form.name.trim().length < 2) next.name = "Please enter at least 2 characters.";
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
        if (!emailOk) next.email = "Please enter a valid email address.";
        if (!form.message || form.message.trim().length < 10)
            next.message = "Message should be at least 10 characters.";
        // honeypot: nếu có giá trị -> lỗi
        if (form.company) next.company = "Bot detected.";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setSubmitting(true);
            // Demo: giả lập call API
            await new Promise((r) => setTimeout(r, 800));
            setStatus("success");
            setForm({ name: "", email: "", message: "", company: "" });
        } catch {
            setStatus("error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">Contact Us</h1>
                    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                        Have questions about events, registration, or partnership opportunities? Reach out to our team
                        and we’ll respond as soon as possible.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    {/* Left: Contact Info */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-[#06b6d4]" aria-hidden="true" />
                            <div>
                                <h3 className="font-semibold text-slate-800">Address</h3>
                                <p className="text-slate-600">
                                    123 University Avenue, District 5 <br /> Ho Chi Minh City, Vietnam
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-[#06b6d4]" aria-hidden="true" />
                            <div>
                                <h3 className="font-semibold text-slate-800">Email</h3>
                                <a
                                    href="mailto:info@eventsphere.com"
                                    className="text-slate-600 hover:text-[#06b6d4]"
                                    aria-label="Send email to info@eventsphere.com"
                                >
                                    info@eventsphere.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-[#06b6d4]" aria-hidden="true" />
                            <div>
                                <h3 className="font-semibold text-slate-800">Phone</h3>
                                <a
                                    href="tel:+84123456789"
                                    className="text-slate-600 hover:text-[#06b6d4]"
                                    aria-label="Call +84 123 456 789"
                                >
                                    +84 123 456 789
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <form className="space-y-4" onSubmit={onSubmit} noValidate>
                            {/* Honeypot (ẩn) */}
                            <div className="hidden">
                                <label htmlFor="company">Company</label>
                                <input
                                    id="company"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={form.company}
                                    onChange={onChange("company")}
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={onChange("name")}
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                    className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none ${
                                        errors.name ? "border-rose-400" : "border-slate-200"
                                    }`}
                                />
                                {errors.name && (
                                    <p id="name-error" className="mt-1 flex items-center gap-1 text-xs text-rose-600">
                                        <AlertCircle className="h-3 w-3" /> {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={onChange("email")}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                    className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none ${
                                        errors.email ? "border-rose-400" : "border-slate-200"
                                    }`}
                                />
                                {errors.email && (
                                    <p id="email-error" className="mt-1 flex items-center gap-1 text-xs text-rose-600">
                                        <AlertCircle className="h-3 w-3" /> {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Write your message here..."
                                    value={form.message}
                                    onChange={onChange("message")}
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? "message-error" : undefined}
                                    className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none ${
                                        errors.message ? "border-rose-400" : "border-slate-200"
                                    }`}
                                />
                                {errors.message && (
                                    <p
                                        id="message-error"
                                        className="mt-1 flex items-center gap-1 text-xs text-rose-600"
                                    >
                                        <AlertCircle className="h-3 w-3" /> {errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#06b6d4] px-5 py-3 text-white hover:opacity-90 disabled:opacity-60"
                            >
                                {submitting ? (
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
                            </button>

                            {status === "success" && (
                                <p className="mt-2 inline-flex items-center gap-2 text-sm text-emerald-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Message sent successfully! We’ll get back to you soon.
                                </p>
                            )}
                            {status === "error" && (
                                <p className="mt-2 inline-flex items-center gap-2 text-sm text-rose-600">
                                    <AlertCircle className="h-4 w-4" />
                                    Something went wrong. Please try again later.
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-16">
                    <iframe
                        title="Campus Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.481374274091!2d106.66017287480435!3d10.77653035920559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3276c8e5c9%3A0xc40b2d7a7b5d9ad4!2sUniversity!5e0!3m2!1sen!2s!4v1700000000000"
                        width="100%"
                        height="300"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        className="rounded-2xl border border-slate-200"
                    />
                </div>
            </div>
        </section>
    );
}
