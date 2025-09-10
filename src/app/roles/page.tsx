"use client";
import Link from "next/link";
import { Eye, IdCard, ClipboardList, ShieldCheck, ArrowRight } from "lucide-react";
export default function RolesPage() {
    const roles = [
        {
            slug: "guest",
            name: "Guest",
            icon: Eye,
            desc: `Guests are prospective students, parents, or individuals browsing university events without creating an account. They can freely explore categories, check event details, and view media galleries. Authentication is required only if they wish to take actions like registering or providing feedback.`,
            features: [
                "Browse events without login",
                "Filter by category, date, or popularity",
                "Read full event descriptions",
                "View media galleries and featured banners",
            ],
        },
        {
            slug: "participant",
            name: "Participant",
            icon: IdCard,
            desc: `Participants are verified students or staff members who actively engage in events. They gain access to seamless registration, reminders, QR check-in, and post-event certificates. Their profile acts as a personal hub of all event history and achievements.`,
            features: [
                "Quick event registration & cancellation",
                "Smart reminders before event starts",
                "QR code check-in system",
                "Feedback forms & surveys",
                "Download personalized certificates",
            ],
        },
        {
            slug: "organizer",
            name: "Organizer",
            icon: ClipboardList,
            desc: `Organizers are clubs, departments, or faculty members responsible for creating and managing events. They can draft proposals, track registrations, verify attendance, and share event media. Organizers make sure events run smoothly and participants get maximum value.`,
            features: [
                "Create, edit, and schedule events",
                "Manage participant list & waitlists",
                "Scan QR codes for attendance",
                "Upload media & resources",
                "Issue digital certificates",
            ],
        },
        {
            slug: "admin",
            name: "Admin",
            icon: ShieldCheck,
            desc: `Admins are system supervisors ensuring EventSphere stays secure, reliable, and aligned with university standards. They handle approvals, moderate content, manage user roles, and generate analytics for leadership insights.`,
            features: [
                "Approve or decline event proposals",
                "Manage all user roles & permissions",
                "Moderate event content & media",
                "Broadcast announcements",
                "Export analytics (PDF/Excel)",
            ],
        },
    ];

    return (
        <section id="roles" className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">
                        Who Is <span className="text-[#06b6d4]">EventSphere</span> For?
                    </h1>
                    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                        EventSphere supports multiple roles across the university ecosystem — from casual visitors to
                        organizers and admins. Each role comes with tailored features and responsibilities that make
                        campus events seamless.
                    </p>
                </div>

                {/* Grid Roles */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {roles.map((role) => (
                        <div
                            key={role.slug}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
                        >
                            <role.icon className="h-8 w-8 text-[#06b6d4]" />
                            <h3 className="mt-4 text-lg font-semibold text-slate-800">{role.name}</h3>
                            <p className="mt-2 line-clamp-4 text-sm text-slate-600">{role.desc}</p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-600">
                                {role.features.map((f) => (
                                    <li key={f} className="flex gap-2">
                                        <span className="text-[#06b6d4]">•</span> {f}
                                    </li>
                                ))}
                            </ul>

                            {/* Learn More → trang chi tiết */}
                            <Link
                                href={`/roles/${role.slug}`}
                                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#06b6d4] hover:underline"
                            >
                                Learn More <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
