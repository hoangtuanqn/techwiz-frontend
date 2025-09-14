"use client";
import React from "react";
import { ArrowRight, Import, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
const Blogs = () => {
    const router = useRouter();

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

                        <div className="mt-8 grid gap-8 md:grid-cols-2">
                            {[
                                {
                                    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop",
                                    alt: "Technology blogs",
                                    title: "Technology",
                                    desc: "Latest tech trends, programming tips, and development insights.",
                                    category: "technology",
                                },
                                {
                                    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop",
                                    alt: "Culture blogs",
                                    title: "Culture",
                                    desc: "A round-up of campus festivals, dance and music nights.",
                                    category: "culture",
                                },
                                {
                                    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop",
                                    alt: "Education blogs",
                                    title: "Education",
                                    desc: "Learning resources, study tips, and educational content.",
                                    category: "education",
                                },
                                {
                                    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop",
                                    alt: "Other blogs",
                                    title: "Other",
                                    desc: "Miscellaneous topics and general discussions.",
                                    category: "other",
                                },
                               
                            ].map(({ img, alt, title, desc, category }, i) => (
                                <NextLink
                                    href={`/blog?category=${category}`}
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
                                        <button
                                            className="mt-4 inline-flex items-center gap-1 font-medium text-cyan-600 hover:text-cyan-700 cursor-pointer"
                                        >
                                            Read more <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </NextLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blogs;
