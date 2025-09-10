"use client";
import React from "react";
import { ArrowRight, Send } from "lucide-react";

const Blogs = () => {
    return (
        <section id="blog" className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Blog list */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold" data-aos="fade-up">
                            From the Blog
                        </h2>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <article
                                className="overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg"
                                data-aos="fade-up"
                            >
                                <img
                                    className="h-40 w-full object-cover"
                                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop"
                                    alt="Hackathon tips"
                                />
                                <div className="p-5">
                                    <h3 className="font-semibold">How to Win Your First Hackathon</h3>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Team formation, idea validation, and demo strategy.
                                    </p>
                                    <a href="#" className="mt-3 inline-flex items-center gap-1 text-cyan-600">
                                        Read more <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </article>

                            <article
                                className="overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg"
                                data-aos="fade-up"
                                data-aos-delay="30"
                            >
                                <img
                                    className="h-40 w-full object-cover"
                                    src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop"
                                    alt="Cultural nights"
                                />
                                <div className="p-5">
                                    <h3 className="font-semibold">5 Cultural Nights You Can’t Miss</h3>
                                    <p className="mt-1 text-sm text-slate-600">
                                        A round-up of campus festivals, dance and music nights.
                                    </p>
                                    <a href="#" className="mt-3 inline-flex items-center gap-1 text-cyan-600">
                                        Read more <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </article>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <aside className="lg:col-span-1" data-aos="fade-up" data-aos-delay="30">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow">
                            <h3 className="text-lg font-semibold">Subscribe for updates</h3>
                            <p className="mt-1 text-sm text-slate-600">Weekly highlights of campus events.</p>
                            <form
                                className="mt-4 grid gap-3"
                                aria-label="Newsletter"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    // demo only
                                    alert("Subscribed!");
                                }}
                            >
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-3 py-3 focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                                />
                                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-3 text-white hover:opacity-90">
                                    <Send className="h-4 w-4" /> Subscribe
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default Blogs;
