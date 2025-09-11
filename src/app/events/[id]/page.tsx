"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Users, Share2, BookmarkPlus, Clock4, Star } from "lucide-react";
import React from "react";

/* =========================
   Fake catalog data (demo)
========================= */
const allEvents = Array.from({ length: 20 }).map((_, i) => ({
    id: (i + 1).toString(),
    title: `Event ${i + 1}`,
    category: ["Technical", "Business", "Cultural", "Sports"][i % 4],
    desc: "This is a longer description for the event. It explains what you will learn, what to prepare, and why you should join.",
    image: `https://picsum.photos/seed/${i}/1200/600`,
    date: "2025-09-10 09:00", // local time (demo)
    durationMins: 120,
    location: ["Auditorium", "Lab 1", "Hall A", "Open Ground"][i % 4],
    seatsTotal: 120,
    seatsBooked: Math.floor(Math.random() * 100) + 10,
    organizer: ["CSE Dept.", "Business Club", "Cultural Committee", "Sports Cell"][i % 4],
}));

/* =========================
   Helpers
========================= */
function formatDateTime(dt: string) {
    try {
        const d = new Date(dt.replace(" ", "T"));
        return new Intl.DateTimeFormat(undefined, {
            dateStyle: "full",
            timeStyle: "short",
        }).format(d);
    } catch {
        return dt;
    }
}

function minutesToHHMM(mins: number) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;
    return `${m}m`;
}

function seatStatus(seatsTotal: number, seatsBooked: number) {
    const left = Math.max(seatsTotal - seatsBooked, 0);
    const percent = seatsTotal ? Math.round((seatsBooked / seatsTotal) * 100) : 0;
    let tone: "ok" | "warn" | "bad" = "ok";
    if (left <= 10) tone = "bad";
    else if (left <= 30) tone = "warn";
    return { left, percent, tone };
}

// Detect pdf vs image (for certificate preview)
function isPdf(url: string) {
    return /\.png($|\?)/i.test(url);
}

/* =========================
   ICS generator (client)
========================= */
function downloadICS({
    title,
    description,
    location,
    start,
    durationMins,
}: {
    title: string;
    description: string;
    location: string;
    start: string; // "YYYY-MM-DD HH:mm"
    durationMins: number;
}) {
    // Convert to UTC-ish format (simple demo)
    const startDate = new Date(start.replace(" ", "T"));
    const endDate = new Date(startDate.getTime() + durationMins * 60_000);

    const dt = (d: Date) =>
        d
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d{3}Z$/, "Z"); // YYYYMMDDTHHMMSSZ

    const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//EventSphere//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${(globalThis.crypto ?? window.crypto).randomUUID()}@eventsphere`,
        `DTSTAMP:${dt(new Date())}`,
        `DTSTART:${dt(startDate)}`,
        `DTEND:${dt(endDate)}`,
        `SUMMARY:${escapeICS(title)}`,
        `DESCRIPTION:${escapeICS(description)}`,
        `LOCATION:${escapeICS(location)}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(title)}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function escapeICS(text: string) {
    return text.replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

function slugify(s: string) {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

// Thay isAvailable hiện tại bằng 2 hàm rõ nghĩa:
function isPast(dateStr: string) {
  return new Date(dateStr) < new Date();
}

function isClosed(dateStr: string, seatsLeft: number) {
  // closed nếu đã qua ngày hoặc hết chỗ
  return isPast(dateStr) || seatsLeft <= 0;
}
/* =========================
   Page
========================= */
export default function EventDetailPage() {
    const params = useParams() as { id?: string };
    const id = params.id || "";

    const event = allEvents.find((ev) => ev.id === id);

    // certificate demo files (put real files into public/certificates/)
    const certPdfUrl = `/certificates/sample.png`;
    const certImgUrl = `/certificates/sample.jpg`; // optional thumbnail; fallback to placeholder if missing

    const [showCert, setShowCert] = React.useState(false);

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

    const { left, percent, tone } = seatStatus(event.seatsTotal, event.seatsBooked);
    const dateFormatted = formatDateTime(event.date);

    const toneClass =
        tone === "ok"
            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : tone === "warn"
              ? "border-amber-200 bg-amber-50 text-amber-800"
              : "border-red-200 bg-red-50 text-red-800";

    const capacityBarClass = tone === "ok" ? "bg-emerald-500" : tone === "warn" ? "bg-amber-500" : "bg-red-500";

    const handleShare = async () => {
        const shareUrl = typeof window !== "undefined" ? window.location.href : "";
        const title = event.title;
        const text = `${event.title} — ${event.category} • ${dateFormatted}`;
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url: shareUrl });
            } catch {
                /* user cancelled */
            }
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareUrl);
            alert("Link copied to clipboard!");
        } else {
            prompt("Copy this link:", shareUrl);
        }
    };

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
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{event.title}</h1>
                        <p className="text-slate-500">
                            {event.category} Event • by {event.organizer}
                        </p>
                    </div>
                    {/* Quick rating (demo static) */}
                    {isClosed(event.date, left) && (
                        <div className="mt-2 flex items-center gap-1 text-amber-500">
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5" />
                            <span className="ml-2 text-sm text-slate-500">4.0 (128)</span>
                        </div>
                    )}
                </div>

                {/* Cover */}
                <img
                    src={event.image}
                    alt={event.title}
                    className="mt-6 aspect-[16/7] w-full rounded-2xl object-cover shadow"
                />

                {/* Key info */}
                <div className="mt-6 grid gap-4 text-slate-700 sm:grid-cols-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-cyan-600" />
                        <div>
                            <div className="font-medium">{dateFormatted}</div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Clock4 className="h-3.5 w-3.5" />
                                {minutesToHHMM(event.durationMins)}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-cyan-600" />
                        <div>
                            <div className="font-medium">{event.location}</div>
                            <div className="text-xs text-slate-500">On-campus venue</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-cyan-600" />
                        <div className="w-full">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500">
                                    {event.seatsBooked}/{event.seatsTotal} booked
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
                <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${toneClass}`}>
                    {left > 0 ? (
                        <span>
                            {left <= 10 ? "Hurry!" : "Good news!"} Only <b>{left}</b> seat
                            {left > 1 ? "s" : ""} left. Registration closes when full.
                        </span>
                    ) : (
                        <span>Event is full. You’ll be added to the waitlist upon registration.</span>
                    )}
                </div>

                {/* Description */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">About this event</h2>
                    <p className="mt-2 leading-relaxed text-slate-700">{event.desc}</p>
                    <ul className="mt-4 list-disc space-y-1 pl-6 text-slate-600">
                        <li>Please arrive 15 minutes early for check-in.</li>
                        <li>Carry a valid student ID for verification.</li>
                        <li>Q&A and networking after the main session.</li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                    <Link
                        href={`/events/${event.id}/register`}
                        className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 font-medium text-white shadow hover:bg-cyan-700"
                    >
                        Register Now
                    </Link>

                    <Link
                        href={`/events/${event.id}/reviews`}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
                    >
                        View Reviews
                    </Link>

                    <button
                        onClick={() =>
                            downloadICS({
                                title: event.title,
                                description: event.desc,
                                location: event.location,
                                start: event.date,
                                durationMins: event.durationMins,
                            })
                        }
                        className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Add to Calendar (.ics)
                    </button>

                    <button
                        onClick={handleShare}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <Share2 className="h-4 w-4" />
                        Share
                    </button>
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
                            Managed by <b>{event.organizer}</b>. For queries, visit the organizer’s desk 30 minutes
                            before the event.
                        </p>
                    </div>
                </div>

                {/* Sample Certificate */}
                <div className="mt-10 rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Sample Certificate</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowCert(true)}
                                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                View
                            </button>
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
                                className="h-[320px] w-full rounded object-contain"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                        "https://picsum.photos/seed/cert/600/400";
                                }}
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

            {/* Modal: Certificate Viewer */}
            {showCert && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setShowCert(false)}
                >
                    <div
                        className="relative h-[85vh] w-full max-w-5xl rounded-xl bg-white shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                            <h4 className="text-sm font-semibold text-slate-800">Certificate Preview</h4>
                            <button
                                onClick={() => setShowCert(false)}
                                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
                            >
                                Close
                            </button>
                        </div>

                        <div className="h-[calc(85vh-56px)] w-full">
                            {isPdf(certPdfUrl) ? (
                                <object
                                    data={`${certPdfUrl}#zoom=page-width`}
                                    type="application/pdf"
                                    className="h-full w-full"
                                >
                                    <iframe src={certPdfUrl} className="h-full w-full" />
                                </object>
                            ) : (
                                <img src={certImgUrl} alt="Certificate" className="h-full w-full object-contain" />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
