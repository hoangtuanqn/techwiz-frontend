import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const Blogs = () => {
    return (
        <section id="blog" className="bg-gray-50 py-12 sm:py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 md:px-8 lg:px-12">
                <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
                    {/* Blog list */}
                    <div className="lg:col-span-3">
                        <div className="mb-6 flex items-center gap-3 sm:gap-4" data-aos="fade-up">
                            <span className="inline-block h-8 w-1 rounded bg-gradient-to-b from-cyan-500 to-fuchsia-500"></span>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                                From the Blog
                            </h2>
                        </div>

                        <div className="mt-6 grid gap-6 sm:gap-8 md:grid-cols-2">
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
                                <Link
                                    href={`/blog?category=${category}`}
                                    key={i}
                                    className="group overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-sm transition-shadow hover:shadow-lg"
                                    data-aos="fade-up"
                                    data-aos-delay={i * 30}
                                >
                                    <img
                                        className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-48"
                                        src={img}
                                        alt={alt}
                                    />

                                    <div className="p-4 sm:p-6">
                                        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{title}</h3>
                                        <p className="mt-2 text-xs text-slate-600 sm:text-sm">{desc}</p>
                                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-cyan-600 hover:text-cyan-700 sm:mt-4 sm:text-base">
                                            Read more <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blogs;
