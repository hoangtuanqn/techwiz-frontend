"use client";
import { useParams } from "next/navigation";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Fake data giống catalog
const allEvents = Array.from({ length: 20 }).map((_, i) => ({
    id: (i + 1).toString(),
    title: `Event ${i + 1}`,
    category: ["Technical", "Business", "Cultural", "Sports"][i % 4],
    desc: "This is a longer description for the event. It explains what you will learn, what to prepare, and why you should join.",
    image: `https://picsum.photos/seed/${i}/800/400`,
    date: "2025-09-15 09:00",
    location: ["Auditorium", "Lab 1", "Hall A", "Open Ground"][i % 4],
    seats: Math.floor(Math.random() * 100) + 20,
}));

export default function EventDetailPage() {
    const { id } = useParams();
    const event = allEvents.find((ev) => ev.id === id);

    if (!event) {
        return (
            <div className="mx-auto max-w-4xl py-20 text-center">
                <p className="text-slate-600">Event not found.</p>
                <Link href="/events" className="mt-4 inline-block text-[#06b6d4] hover:underline">
                    ← Back to Catalog
                </Link>
            </div>
        );
    }

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    href="/events"
                    className="mb-6 inline-flex items-center gap-1 text-slate-600 hover:text-[#06b6d4]"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Catalog
                </Link>

                {/* Header */}
                <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">{event.title}</h1>
                <p className="mt-2 text-slate-500">{event.category} Event</p>

                {/* Image */}
                <img src={event.image} alt={event.title} className="mt-6 w-full rounded-xl object-cover shadow" />

                {/* Info */}
                <div className="mt-6 grid gap-4 text-slate-700 sm:grid-cols-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#06b6d4]" /> {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-[#06b6d4]" /> {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-[#06b6d4]" /> {event.seats} seats
                    </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">About this event</h2>
                    <p className="mt-2 leading-relaxed text-slate-600">{event.desc}</p>
                </div>

                {/* Action */}
                <div className="mt-8 flex justify-center gap-4">
                    <button className="rounded-xl bg-[#06b6d4] px-6 py-3 text-white shadow hover:opacity-90">
                        <Link href="/auth/register">Register Now</Link>
                    </button>
                    <button className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-50">
                        Add to Calendar
                    </button>
                </div>
            </div>
        </section>
    );
}
