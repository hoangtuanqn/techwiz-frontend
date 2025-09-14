"use client";
import { Target, Sparkles, GraduationCap, BookOpen, Globe, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <section id="about" className="bg-white">
            {/* Hero */}
            <div className="relative">
                <img src="/images/events/event-1.jpg" alt="Campus" className="h-80 w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 px-4">
                    <div className="max-w-3xl text-center">
                        <h1 className="text-4xl font-bold text-white md:text-5xl">
                            <span className="text-[#06b6d4]">EventSphere</span>
                        </h1>
                        <p className="mt-4 text-lg text-white/90">
                            EventSphere is more than just an event management tool — it’s a digital ecosystem built to
                            empower students, organizers, and faculty. We believe that campus life thrives when
                            opportunities are easy to discover, connect with, and experience.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid gap-10 md:grid-cols-2">
                    <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-8">
                        <Target className="h-8 w-8 text-[#06b6d4]" />
                        <h2 className="mt-4 text-2xl font-semibold text-slate-800">Our Mission</h2>
                        <p className="mt-3 leading-relaxed text-slate-600">
                            Our mission is to transform the way students engage with their university community.
                            EventSphere makes it simple to discover relevant events, register in seconds, and build
                            lifelong connections through meaningful participation. We aim to remove barriers between
                            students and opportunities while fostering inclusivity and collaboration.
                        </p>
                    </div>
                    <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-8">
                        <Sparkles className="h-8 w-8 text-[#06b6d4]" />
                        <h2 className="mt-4 text-2xl font-semibold text-slate-800">Our Vision</h2>
                        <p className="mt-3 leading-relaxed text-slate-600">
                            We envision a future where every student feels connected, empowered, and inspired to
                            participate in university life. EventSphere seeks to become the go-to platform for campus
                            engagement, bridging the gap between academic knowledge and real-world experience by
                            creating spaces for innovation, collaboration, and celebration.
                        </p>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="bg-slate-50 py-20">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-800">Our Core Values</h2>
                    <p className="mx-auto mt-2 max-w-2xl text-slate-600">
                        EventSphere is built upon strong principles that guide everything we do — from our technology to
                        the way we collaborate with students and faculty.
                    </p>
                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                            <Globe className="mx-auto h-8 w-8 text-[#06b6d4]" />
                            <h3 className="mt-4 text-lg font-semibold">Accessibility</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                We ensure events are visible and reachable to every student, regardless of background or
                                department.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                            <BookOpen className="mx-auto h-8 w-8 text-[#06b6d4]" />
                            <h3 className="mt-4 text-lg font-semibold">Continuous Learning</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Every event is a chance to learn something new. We support growth through workshops,
                                seminars, and hands-on experiences.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                            <Heart className="mx-auto h-8 w-8 text-[#06b6d4]" />
                            <h3 className="mt-4 text-lg font-semibold">Community</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                We believe in the power of togetherness. Strong connections build strong futures, and
                                every student has a role to play.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
                <h2 className="text-center text-3xl font-bold text-slate-800">Our Journey</h2>
                <div className="mt-12 space-y-10 border-l-2 border-slate-200 pl-6">
                    <div>
                        <h3 className="font-semibold text-slate-800">2023 – The Idea</h3>
                        <p className="mt-1 text-sm text-slate-600">
                            EventSphere began as a simple idea from a group of students frustrated with missing out on
                            workshops and cultural nights due to scattered announcements.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">2024 – First Launch</h3>
                        <p className="mt-1 text-sm text-slate-600">
                            We launched our MVP for the Computer Science department, quickly reaching 2,000 users in
                            just three months. The feedback was overwhelming.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">2025 – Campus Wide</h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Expanded to the entire university with advanced features like QR check-in, certificates, and
                            cross-department event discovery.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team */}
            <div className="bg-slate-50 py-20">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-800">Meet Our Team</h2>
                    <p className="mt-2 text-slate-600">Passionate people behind EventSphere</p>

                    <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {[
                            {
                                name: "Tram Anh",
                                role: "Founder & CEO",
                                img: "https://randomuser.me/api/portraits/women/68.jpg",
                            },
                            {
                                name: "Minh Duc",
                                role: "Tech Lead",
                                img: "https://randomuser.me/api/portraits/men/31.jpg",
                            },
                            {
                                name: "Lan Huong",
                                role: "Design Head",
                                img: "https://randomuser.me/api/portraits/women/8.jpg",
                            },
                            {
                                name: "Hoang Nam",
                                role: "Community Manager",
                                img: "https://randomuser.me/api/portraits/men/45.jpg",
                            },
                            {
                                name: "Phuong Thao",
                                role: "Marketing",
                                img: "https://randomuser.me/api/portraits/women/12.jpg",
                            },
                            {
                                name: "Khai Minh",
                                role: "Backend Engineer",
                                img: "https://randomuser.me/api/portraits/men/72.jpg",
                            },
                        ].map((member, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
                            >
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="mx-auto h-24 w-24 rounded-full object-cover"
                                />
                                <h3 className="mt-4 font-semibold text-slate-800">{member.name}</h3>
                                <p className="text-sm text-slate-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#06b6d4]/10 to-transparent py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <GraduationCap className="mx-auto h-12 w-12 text-[#06b6d4]" />
                    <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">Be Part of the Movement</h2>
                    <p className="mt-3 leading-relaxed text-slate-600">
                        EventSphere is continuously evolving with and for students. Whether you are an organizer looking
                        for a platform, or a student eager to discover opportunities, there is a place for you here.
                        Together, we can shape a vibrant, inclusive, and connected university life.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <a
                            href="/auth/register"
                            className="rounded-xl bg-[#06b6d4] px-6 py-3 text-white shadow hover:opacity-90"
                        >
                            Get Started
                        </a>
                        <a
                            href="/contact"
                            className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-50"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
