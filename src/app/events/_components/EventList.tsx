import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import React from "react";

const EventList = ({
    currentData,
}: {
    currentData: Array<{ id: number; title: string; desc: string; image: string; category: string }>;
}) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentData.map((ev) => (
                <article
                    key={ev.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                    <img
                        src={ev.image}
                        alt={ev.title}
                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="p-4">
                        <h3 className="font-semibold text-slate-800 group-hover:text-[#06b6d4]">{ev.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{ev.desc}</p>
                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-slate-500">{ev.category}</span>
                            <Link
                                href={`/events/${ev.id}`}
                                className="flex items-center gap-1 text-[#06b6d4] hover:underline"
                            >
                                Details <SlidersHorizontal className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default EventList;
