import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users, Clock4, Star } from "lucide-react";
import React, { cache } from "react";
import { redirect } from "next/navigation";
import { formatter } from "~/utils/format";
import { Metadata } from "next";
import { ShareButton } from "~/components/ShareButton";
import { ConfirmRegister } from "./_components/ConfirmRegister";
import { ConfirmCollaborator } from "./_components/ConfirmCollaborator";

import eventServerApi from "~/apiRequest/server/event";
import Certificate from "~/components/Certificate";
import { useAuth } from "~/hooks/useAuth";
import CertificateEvent from "../_components/CertificateEvent";

const getDetailEvent = cache(async (id: string) => {
    const {
        data: { data: event },
    } = await eventServerApi.getDetailEvent(+id);
    return event;
});
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const post = await getDetailEvent(id);
    return {
        title: post.title || "Event Detail",
        description: post.description || "Event details and registration information.",
    };
}

function seatStatus(seatsTotal: number, seatsBooked: number) {
    const left = Math.max(seatsTotal - seatsBooked, 0);
    const percent = seatsTotal ? Math.round((seatsBooked / seatsTotal) * 100) : 0;
    let tone: "ok" | "warn" | "bad" = "ok";
    if (left <= 10) tone = "bad";
    else if (left <= 30) tone = "warn";
    return { left, percent, tone };
}

/* =========================
   Page
========================= */
export default async function EventDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    // const event = allEvents.find((ev) => ev.id === id);
    let event;

    try {
        event = await getDetailEvent(id);
    } catch {
        redirect("/events");
    }

    // certificate demo files (put real files into public/certificates/)
    const certPdfUrl = `/certificates/sample.png`;
    const certImgUrl = `/certificates/sample.png`; // optional thumbnail; fallback to placeholder if missing

    if (!event) {
        return (
            <div className="mx-auto max-w-4xl py-20 text-center">
                <p className="text-slate-600">Event not found.</p>
                <Link href="/events" className="mt-4 inline-block text-cyan-600 hover:underline">
                    ← Back to Catalog
                </Link>
            </div>
        );
    }

    const { left, percent, tone } = seatStatus(event.seating.total_seats, event.booked_count ?? 0);

    const dateFormatted = formatter.timeUntil(event.start_event);
    const capacityBarClass = tone === "ok" ? "bg-emerald-500" : tone === "warn" ? "bg-amber-500" : "bg-red-500";

    return (
        <section className="bg-white py-12 md:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb / Back */}
                <div className="mb-6 flex items-center justify-between">
                    <Link href="/events" className="inline-flex items-center gap-1 text-slate-600 hover:text-cyan-600">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Catalog
                    </Link>
                </div>

                {/* Title */}
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-4xl font-extrabold text-cyan-800 md:text-5xl">{event.title}</h1>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-base text-slate-500">
                                <span className="rounded bg-cyan-50 px-2 py-0.5 font-medium text-cyan-700">
                                    {formatter.capitalize(event.category)}
                                </span>
                                <span>•</span>
                                <span>
                                    by <span className="font-semibold text-slate-700">{event.organizer.full_name}</span>
                                </span>
                                <span>•</span>
                                <span>
                                    <Users className="mr-1 inline-block h-4 w-4 text-cyan-600" />
                                    {event.seating.total_seats} seats
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Quick rating (demo static) */}
                    {Date.now() > new Date(event.end_event).getTime() && (
                        <div className="mt-2 mr-2 flex items-center gap-2">
                            <div className="flex items-center">
                                {[...Array(4)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                                ))}
                                <Star className="h-5 w-5 fill-amber-200 text-amber-200" />
                            </div>
                            <span className="ml-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 shadow">
                                4.0
                            </span>
                            <span className="text-xs text-slate-400">({128} reviews)</span>
                        </div>
                    )}
                    <ShareButton />
                </div>

                {/* Cover */}
                <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="mt-6 aspect-[16/7] w-full rounded-2xl object-cover shadow"
                />

                {/* Key info */}
                <div className="mt-6 grid gap-4 text-slate-700 sm:grid-cols-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-cyan-600" />
                        <div>
                            <div className="text-lg font-medium text-cyan-700">
                                {formatter.date(event.start_event, true)}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Clock4 className="h-3.5 w-3.5" />
                                <span>
                                    {dateFormatted.startsWith("In") || dateFormatted.startsWith("Còn")
                                        ? `Starts in ${dateFormatted.replace(/^In\s|^Còn\s/, "")}`
                                        : dateFormatted}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-cyan-600" />
                        <div>
                            <div className="font-medium">{event.venue}</div>
                            <div className="text-xs text-slate-500">On-campus venue</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-cyan-600" />
                        <div className="w-full">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500">
                                    {event.booked_count}/{event.seating.total_seats} booked
                                </span>
                                <span className="font-medium">{left} left</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                                <div
                                    className={`h-2 rounded-full ${capacityBarClass}`}
                                    style={{ width: `${Math.min(percent, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status banner */}
                <div
                    className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                        left === 0
                            ? "border-gray-300 bg-gray-100 text-gray-700"
                            : Date.now() > new Date(event.end_event).getTime()
                              ? "border-slate-300 bg-slate-100 text-slate-700"
                              : left <= 10
                                ? "border-red-200 bg-red-50 text-red-800"
                                : left <= 30
                                  ? "border-amber-200 bg-amber-50 text-amber-800"
                                  : "border-emerald-200 bg-emerald-50 text-emerald-800"
                    }`}
                >
                    {Date.now() > new Date(event.end_event).getTime() ? (
                        <span>
                            {left === 0
                                ? "Event is full. You’ll be added to the waitlist upon registration."
                                : "Event has ended."}
                        </span>
                    ) : (
                        <span>
                            {left <= 10 ? "Hurry!" : left <= 30 ? "Limited seats!" : "Good news!"} Only <b>{left}</b>{" "}
                            seat{left > 1 ? "s" : ""} left. Registration closes when full.
                        </span>
                    )}
                </div>

                {/* Description */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">About this event</h2>
                    <p className="mt-2 leading-relaxed text-slate-700">{event.description}</p>
                    <ul className="mt-4 list-disc space-y-1 pl-6 text-slate-600">
                        <li>Please arrive 15 minutes early for check-in.</li>
                        <li>Carry a valid student ID for verification.</li>
                        <li>Q&A and networking after the main session.</li>
                    </ul>
                </div>
                <CertificateEvent />
                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex gap-3">
                        <ConfirmRegister event={event} />
                    <ConfirmCollaborator event={event} />
                    </div>
                    {/* Sự kiện kết thúc mới hiển thị */}
                    {Date.now() > new Date(event.end_event).getTime() && (
                        <Link
                            href={`/events/${event.id}/reviews`}
                            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
                        >
                            View Reviews
                        </Link>
                    )}
                </div>

                

                {/* Secondary info */}
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 p-5">
                        <h3 className="text-lg font-semibold">What you’ll learn</h3>
                        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
                            <li>Key concepts and hands-on demos.</li>
                            <li>Best practices from organizers.</li>
                            <li>How to prepare for competitions or follow-up workshops.</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-5">
                        <h3 className="text-lg font-semibold">Organizer</h3>
                        <p className="mt-2 text-slate-700">
                            Managed by <b>{event.organizer.full_name}</b>. For queries, visit the organizer’s desk 30
                            minutes before the event.
                        </p>
                    </div>
                </div>

                {/* Sample Certificate */}
                <div className="mt-10 rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Sample Certificate</h3>
                        <div className="flex gap-2">
                            <a
                                href={certPdfUrl}
                                download
                                className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
                            >
                                Download PDF
                            </a>
                        </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-[240px,1fr]">
                        <div className="rounded-lg border border-slate-200 bg-white p-2">
                            <img
                                src={certImgUrl}
                                alt="Certificate preview"
                                className="h-[600px] w-full rounded object-contain"
                            />
                        </div>
                        <div className="text-sm leading-6 text-slate-600">
                            <p>
                                This is a demo certificate preview so students can see what they will receive after
                                attending the event and meeting the requirements. The actual certificate will include
                                your name, event title, date, and organizer signature/QR verification.
                            </p>
                            <ul className="mt-3 list-disc space-y-1 pl-5">
                                <li>Format: PDF (A4 landscape)</li>
                                <li>Includes participant name, event info, unique certificate ID</li>
                                <li>Optional: QR code for online verification</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer callouts */}
                <div className="mt-10 rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">
                    Pro tip: After attending, come back to{" "}
                    <Link className="text-cyan-600 hover:underline" href={`/events/${event.id}/reviews`}>
                        write a review
                    </Link>{" "}
                    and help others decide.
                </div>
            </div>
        </section>
    );
}
