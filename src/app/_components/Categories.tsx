"use client";
import { ArrowRight } from "lucide-react";
import React from "react";

const Categories = () => {
    return (
        <section id="categories" className="bg-slate-50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between">
                    <h2 className="text-3xl font-bold" data-aos="fade-up">
                        Featured Categories
                    </h2>
                    <a
                        href="#"
                        className="inline-flex items-center gap-1 text-cyan-600"
                        data-aos="fade-up"
                        data-aos-delay="30"
                    >
                        View all <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {/* Card 1 */}
                    <a
                        className="group overflow-hidden rounded-2xl border border-slate-200 shadow transition hover:shadow-lg"
                        href="#"
                        data-aos="fade-up"
                    >
                        <img
                            className="h-36 w-full object-cover"
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1470&auto=format&fit=crop"
                            alt="Technical"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold transition group-hover:text-cyan-600">Technical</h3>
                            <p className="mt-1 text-sm text-slate-600">AI • Web • Mobile • Robotics</p>
                            <p className="mt-1 text-xs text-slate-500">Workshops • Hackathons • Demos</p>
                        </div>
                    </a>

                    {/* Card 2 */}
                    <a
                        className="group overflow-hidden rounded-2xl border border-slate-200 shadow transition hover:shadow-lg"
                        href="#"
                        data-aos="fade-up"
                        data-aos-delay="20"
                    >
                        <img
                            className="h-36 w-full object-cover"
                            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop"
                            alt="Business"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold transition group-hover:text-cyan-600">Business</h3>
                            <p className="mt-1 text-sm text-slate-600">Startup • Marketing • Finance</p>
                            <p className="mt-1 text-xs text-slate-500">Pitches • Panels • Fairs</p>
                        </div>
                    </a>

                    {/* Card 3 */}
                    <a
                        className="group overflow-hidden rounded-2xl border border-slate-200 shadow transition hover:shadow-lg"
                        href="#"
                        data-aos="fade-up"
                        data-aos-delay="40"
                    >
                        <img
                            className="h-36 w-full object-cover"
                            src="https://images.unsplash.com/photo-1520975682031-a6b3800c9419?q=80&w=1470&auto=format&fit=crop"
                            alt="Cultural"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold transition group-hover:text-cyan-600">Cultural</h3>
                            <p className="mt-1 text-sm text-slate-600">Music • Dance • Festivals</p>
                            <p className="mt-1 text-xs text-slate-500">Open-air • Clubs • Nights</p>
                        </div>
                    </a>

                    {/* Card 4 */}
                    <a
                        className="group overflow-hidden rounded-2xl border border-slate-200 shadow transition hover:shadow-lg"
                        href="#"
                        data-aos="fade-up"
                        data-aos-delay="60"
                    >
                        <img
                            className="h-36 w-full object-cover"
                            src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1470&auto=format&fit=crop"
                            alt="Sports"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold transition group-hover:text-cyan-600">Sports</h3>
                            <p className="mt-1 text-sm text-slate-600">Football • Basketball • Run</p>
                            <p className="mt-1 text-xs text-slate-500">Leagues • Tryouts • Meets</p>
                        </div>
                    </a>

                    {/* Card 5 */}
                    <a
                        className="group overflow-hidden rounded-2xl border border-slate-200 shadow transition hover:shadow-lg"
                        href="#"
                        data-aos="fade-up"
                        data-aos-delay="80"
                    >
                        <img
                            className="h-36 w-full object-cover"
                            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop"
                            alt="Volunteering"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold transition group-hover:text-cyan-600">Volunteering</h3>
                            <p className="mt-1 text-sm text-slate-600">Community • Campus • Causes</p>
                            <p className="mt-1 text-xs text-slate-500">Clean-ups • Drives • Tutoring</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Categories;
