"use client";
import React from "react";

const Stats = () => {
    return (
        <section className="bg-gradient-to-br from-cyan-50 to-fuchsia-50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6" data-aos="fade-up">
                        <div className="text-4xl font-extrabold">500+</div>
                        <div className="mt-1 text-slate-500">Events</div>
                    </div>

                    <div
                        className="rounded-2xl border border-slate-200 bg-white p-6"
                        data-aos="fade-up"
                        data-aos-delay="20"
                    >
                        <div className="text-4xl font-extrabold">12k</div>
                        <div className="mt-1 text-slate-500">Participants</div>
                    </div>

                    <div
                        className="rounded-2xl border border-slate-200 bg-white p-6"
                        data-aos="fade-up"
                        data-aos-delay="40"
                    >
                        <div className="text-4xl font-extrabold">120</div>
                        <div className="mt-1 text-slate-500">Organizers</div>
                    </div>

                    <div
                        className="rounded-2xl border border-slate-200 bg-white p-6"
                        data-aos="fade-up"
                        data-aos-delay="60"
                    >
                        <div className="text-4xl font-extrabold">4.8/5</div>
                        <div className="mt-1 text-slate-500">Avg. Rating</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
