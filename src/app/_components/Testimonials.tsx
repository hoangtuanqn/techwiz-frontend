"use client";
import React from "react";

const Testimonials = () => {
    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-3xl font-bold" data-aos="fade-up">
                    What Students Say
                </h2>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <figure
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow transition hover:shadow-md"
                        data-aos="fade-up"
                    >
                        <blockquote className="text-slate-700">
                            “Registration is fast and reminders are spot on. I never miss a session anymore.”
                        </blockquote>
                        <figcaption className="mt-4 flex items-center gap-3">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src="https://randomuser.me/api/portraits/women/68.jpg"
                                alt="Student"
                            />
                            <div>
                                <div className="font-medium">Tram Anh</div>
                                <div className="text-sm text-slate-500">Cohort 2025 • IT</div>
                            </div>
                        </figcaption>
                    </figure>

                    <figure
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow transition hover:shadow-md"
                        data-aos="fade-up"
                        data-aos-delay="30"
                    >
                        <blockquote className="text-slate-700">
                            “QR check-in works instantly. The certificate link arrived before I left the venue.”
                        </blockquote>
                        <figcaption className="mt-4 flex items-center gap-3">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src="https://randomuser.me/api/portraits/men/31.jpg"
                                alt="Student"
                            />
                            <div>
                                <div className="font-medium">Minh Duc</div>
                                <div className="text-sm text-slate-500">Cohort 2026 • Business</div>
                            </div>
                        </figcaption>
                    </figure>

                    <figure
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow transition hover:shadow-md"
                        data-aos="fade-up"
                        data-aos-delay="60"
                    >
                        <blockquote className="text-slate-700">
                            “The gallery after events is gorgeous. Perfect for sharing highlights with friends.”
                        </blockquote>
                        <figcaption className="mt-4 flex items-center gap-3">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src="https://randomuser.me/api/portraits/women/8.jpg"
                                alt="Student"
                            />
                            <div>
                                <div className="font-medium">Lan Huong</div>
                                <div className="text-sm text-slate-500">Cohort 2024 • Design</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
