"use client";
import { ArrowRight, Send } from "lucide-react";
import React from "react";

const Blogs = () => {
    return (
        <section id="blog" className="bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-3">
                    {/* Blog list */}
                    <div className="lg:col-span-3">
                        <div className="mb-8 flex items-center gap-4" data-aos="fade-up">
                            <span className="inline-block h-8 w-1 rounded bg-gradient-to-b from-cyan-500 to-fuchsia-500"></span>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                From the Blog
                            </h2>
                        </div>

                        <div className="mt-8 grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop",
                                    alt: "Hackathon tips",
                                    title: "How to Win Your First Hackathon",
                                    desc: "Team formation, idea validation, and demo strategy.",
                                    href: "#",
                                },
                                {
                                    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop",
                                    alt: "Cultural nights",
                                    title: "5 Cultural Nights You Can’t Miss",
                                    desc: "A round-up of campus festivals, dance and music nights.",
                                    href: "#",
                                },
                                {
                                    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop",
                                    alt: "Cultural nights",
                                    title: "5 Cultural Nights You Can’t Miss",
                                    desc: "A round-up of campus festivals, dance and music nights.",
                                    href: "#",
                                },
                                {
                                    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop",
                                    alt: "Cultural nights",
                                    title: "5 Cultural Nights You Can’t Miss",
                                    desc: "A round-up of campus festivals, dance and music nights.",
                                    href: "#",
                                },
                            ].map(({ img, alt, title, desc, href }, i) => (
                                <article
                                    key={i}
                                    className="group overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-sm transition-shadow hover:shadow-lg"
                                    data-aos="fade-up"
                                    data-aos-delay={i * 30}
                                >
                                    <img
                                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        src={img}
                                        alt={alt}
                                    />
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                                        <p className="mt-2 text-sm text-slate-600">{desc}</p>
                                        <a
                                            href={href}
                                            className="mt-4 inline-flex items-center gap-1 font-medium text-cyan-600 hover:text-cyan-700"
                                        >
                                            Read more <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Newsletter */}
                <aside className="mt-8 w-full" data-aos="fade-up" data-aos-delay="60">
                    <div className="w-full rounded-3xl border border-slate-300 bg-white p-8 shadow-md">
                        <h3 className="text-xl font-semibold text-slate-900">Subscribe for updates</h3>
                        <p className="mt-2 text-sm text-slate-600">Weekly highlights of campus events.</p>
                        <form
                            className="mt-6 flex w-full gap-4"
                            aria-label="Newsletter"
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Subscribed!");
                            }}
                        >
                            <input
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
                            >
                                <Send className="h-5 w-5" /> Subscribe
                            </button>
                        </form>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default Blogs;
