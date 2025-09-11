"use client";
"use client";
import { Send, Mail, Bell, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const NewLetter = () => {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            toast.success("Subscribed successfully! Check your email.");
            setIsSubscribed(true);
            setEmail("");
        }
    };

    return (
        <section className="relative overflow-hidden py-24">
            {/* Background with gradient and patterns */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(circle at 30% 20%, rgba(6,182,212,0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 70% 80%, rgba(217,70,239,0.1) 0%, transparent 50%)`,
                }}
            ></div>

            {/* Animated background elements */}
            <div className="absolute top-20 left-10 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 blur-xl"></div>
            <div className="absolute right-10 bottom-20 h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 blur-xl delay-1000"></div>

            <div className="relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
                <div className="mb-12 text-center" data-aos="fade-up">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 px-4 py-2">
                        <Sparkles className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-300">Stay Connected</span>
                    </div>

                    <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Never Miss An{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Update
                        </span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300">
                        Get the latest news, events, and exclusive content delivered straight to your inbox. Join our
                        community of innovators and tech enthusiasts.
                    </p>
                </div>

                <div className="mx-auto max-w-2xl" data-aos="fade-up" data-aos-delay="200">
                    <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5"></div>

                        <div className="relative">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 shadow-lg">
                                    <Mail className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Subscribe to Newsletter</h3>
                                    <p className="text-sm text-slate-300">Weekly highlights & exclusive updates</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        required
                                        className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-slate-400 backdrop-blur-sm transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/20 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                                    />
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 to-fuchsia-500/0 transition-all duration-300 hover:from-cyan-500/5 hover:to-fuchsia-500/5"></div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubscribed}
                                    className="group relative w-full transform overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-80"
                                >
                                    {/* Button shine effect */}
                                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]"></div>

                                    <span className="relative flex items-center justify-center gap-2">
                                        {isSubscribed ? (
                                            <>
                                                <Bell className="h-5 w-5 animate-bounce" />
                                                Subscribed! Check your email
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                                Subscribe Now
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>

                            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                    <span>Free forever</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                                    <span>No spam</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                                    <span>Unsubscribe anytime</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats section */}
                    <div className="mt-12 grid grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="400">
                        {[
                            { number: "10K+", label: "Subscribers" },
                            { number: "98%", label: "Open Rate" },
                            { number: "Weekly", label: "Updates" },
                        ].map((stat, index) => (
                            <div key={index} className="group text-center">
                                <div className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent transition-transform duration-300 group-hover:scale-110 md:text-3xl">
                                    {stat.number}
                                </div>
                                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewLetter;
