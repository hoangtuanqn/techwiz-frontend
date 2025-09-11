"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

/* ========================================
   Types & constants
======================================== */
type Review = {
  id: string;
  eventId: string;
  userType: "Visitor" | "Participant" | "Organizer";
  overall: number; // 1..5
  venue: number; // 1..5
  coordination: number; // 1..5
  technical: number; // 1..5
  hospitality: number; // 1..5
  comment?: string;
  date: string; // ISO
  displayName: string; // for UI only
};

const USER_TYPES = ["Visitor", "Participant", "Organizer"] as const;

/* ========================================
   Fake reviews (seed)
======================================== */
const seedReviews: Review[] = [
  {
    id: "r1",
    eventId: "1",
    userType: "Participant",
    overall: 5,
    venue: 5,
    coordination: 5,
    technical: 4,
    hospitality: 5,
    comment: "Great experience. Smooth check-in and high-quality talks.",
    date: "2025-09-10T09:00:00Z",
    displayName: "A. Nguyen",
  },
  {
    id: "r2",
    eventId: "1",
    userType: "Visitor",
    overall: 4,
    venue: 4,
    coordination: 4,
    technical: 4,
    hospitality: 4,
    comment: "Well organized. Could use more Q&A time.",
    date: "2025-09-11T03:00:00Z",
    displayName: "B. Tran",
  },
  {
    id: "r3",
    eventId: "2",
    userType: "Participant",
    overall: 3,
    venue: 3,
    coordination: 3,
    technical: 3,
    hospitality: 3,
    comment: "Average experience, room was a bit crowded.",
    date: "2025-09-08T10:30:00Z",
    displayName: "C. Le",
  },
];

/* ========================================
   Little StarRating component
======================================== */
function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-5 w-5 ${filled ? "text-amber-400" : "text-slate-300"}`}
      fill="currentColor"
    >
      <path d="M10 1.5l2.59 5.25 5.8.84-4.2 4.09.99 5.77L10 14.9l-5.18 2.55.99-5.77-4.2-4.09 5.8-.84L10 1.5z" />
    </svg>
  );
}

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange?: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`Rate ${n}`}
          onClick={() => onChange?.(n)}
          className="focus:outline-none"
        >
          <Star filled={n <= value} />
        </button>
      ))}
      <span className="ml-2 text-sm text-slate-600">{value}/5</span>
    </div>
  );
}

/* ========================================
   Page
======================================== */
export default function EventReviewsPage() {
  const { id } = useParams();
  const eventId = String(id || "");

  // Local state (merge seed + user submissions)
  const [reviews, setReviews] = useState<Review[]>(
    seedReviews.filter((r) => r.eventId === eventId)
  );

  // Filters & sort
  const [filterType, setFilterType] = useState<"" | Review["userType"]>("");
  const [sortKey, setSortKey] = useState<"newest" | "rating_desc" | "rating_asc">("newest");

  const filtered = useMemo(() => {
    let list = [...reviews];
    if (filterType) list = list.filter((r) => r.userType === filterType);
    switch (sortKey) {
      case "rating_desc":
        list.sort((a, b) => b.overall - a.overall);
        break;
      case "rating_asc":
        list.sort((a, b) => a.overall - b.overall);
        break;
      default:
        list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
    return list;
  }, [reviews, filterType, sortKey]);

  const avg = useMemo(() => {
    if (!reviews.length) return { overall: 0, venue: 0, coordination: 0, technical: 0, hospitality: 0 };
    const sum = reviews.reduce(
      (acc, r) => ({
        overall: acc.overall + r.overall,
        venue: acc.venue + r.venue,
        coordination: acc.coordination + r.coordination,
        technical: acc.technical + r.technical,
        hospitality: acc.hospitality + r.hospitality,
      }),
      { overall: 0, venue: 0, coordination: 0, technical: 0, hospitality: 0 }
    );
    const n = reviews.length;
    const round = (x: number) => Math.round((x / n) * 10) / 10;
    return {
      overall: round(sum.overall),
      venue: round(sum.venue),
      coordination: round(sum.coordination),
      technical: round(sum.technical),
      hospitality: round(sum.hospitality),
    };
  }, [reviews]);

  // Form state
  const [userType, setUserType] = useState<Review["userType"]>("Participant");
  const [overall, setOverall] = useState<number>(5);
  const [venue, setVenue] = useState<number>(5);
  const [coordination, setCoordination] = useState<number>(5);
  const [technical, setTechnical] = useState<number>(5);
  const [hospitality, setHospitality] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function numToStr(n: number) {
    return String(n);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // simple validation
    if (!overall || overall < 1 || overall > 5) {
      setMsg({ type: "err", text: "Overall rating must be between 1 and 5." });
      return;
    }

    try {
      setSubmitting(true);
      setMsg(null);

      // TODO: Call real API here (POST /reviews)
      // const res = await fetch(...)

      const newReview: Review = {
        id: "local-" + Math.random().toString(36).slice(2),
        eventId,
        userType,
        overall,
        venue,
        coordination,
        technical,
        hospitality,
        comment: comment?.trim() || "",
        date: new Date().toISOString(),
        displayName: "You",
      };

      setReviews((prev) => [newReview, ...prev]);
      setMsg({ type: "ok", text: "Thank you! Your review has been submitted." });

      // reset some fields
      setOverall(5);
      setVenue(5);
      setCoordination(5);
      setTechnical(5);
      setHospitality(5);
      setComment("");
    } catch (err: unknown) {
      const errorMsg =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: string }).message)
          : "Failed to submit review.";
      setMsg({ type: "err", text: errorMsg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / back */}
        <div className="mb-6">
          <Link href={`/events/${eventId}`} className="text-slate-600 hover:text-cyan-600">
            ← Back to Event
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">Event Reviews</h1>
        <p className="mt-2 text-slate-500">See what others think and share your experience.</p>

        {/* Overview cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Average Ratings</h2>
              <div className="flex items-center">
                <StarRating value={Math.round(avg.overall)} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
              <div className="flex justify-between">
                <span>Overall</span> <span className="font-medium">{avg.overall}</span>
              </div>
              <div className="flex justify-between">
                <span>Venue</span> <span className="font-medium">{avg.venue}</span>
              </div>
              <div className="flex justify-between">
                <span>Coordination</span> <span className="font-medium">{avg.coordination}</span>
              </div>
              <div className="flex justify-between">
                <span>Technical</span> <span className="font-medium">{avg.technical}</span>
              </div>
              <div className="flex justify-between">
                <span>Hospitality</span> <span className="font-medium">{avg.hospitality}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}.
            </p>
          </div>

          {/* Filters */}
          <div className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">User Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as "" | Review["userType"])}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="">All</option>
                  {USER_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Sort by</label>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as "newest" | "rating_desc" | "rating_asc")}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="newest">Newest</option>
                  <option value="rating_desc">Rating: High → Low</option>
                  <option value="rating_asc">Rating: Low → High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Write a review */}
        <div className="mt-8 rounded-2xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold">Write a Review</h2>
          <p className="mt-1 text-sm text-slate-500">
            Share your experience to help others decide.
          </p>

          {msg && (
            <div
              className={`mt-4 rounded-md border px-4 py-2 text-sm ${
                msg.type === "ok"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {msg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-5">
            {/* User type */}
            <div>
              <label className="block text-sm font-medium text-slate-700">User Type</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as Review["userType"])}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                {USER_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Overall */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Overall Rating</label>
              <div className="mt-1">
                <StarRating value={overall} onChange={setOverall} />
              </div>
            </div>

            {/* Aspect ratings */}
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeField label="Venue" value={venue} onChange={setVenue} />
              <RangeField label="Coordination" value={coordination} onChange={setCoordination} />
              <RangeField label="Technical" value={technical} onChange={setTechnical} />
              <RangeField label="Hospitality" value={hospitality} onChange={setHospitality} />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Comment (optional)</label>
              <textarea
                rows={4}
                placeholder="What went well? What could be improved?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-700 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>

        {/* Reviews list */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Recent Reviews</h2>

          {filtered.length === 0 ? (
            <p className="mt-3 text-slate-500">No reviews yet. Be the first to write one!</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {filtered.map((r) => (
                <li
                  key={r.id}
                  className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{r.displayName}</div>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        {r.userType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating value={r.overall} />
                      <span className="text-xs text-slate-500">
                        {new Date(r.date).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {r.comment && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{r.comment}</p>
                  )}

                  <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-4">
                    <Aspect label="Venue" value={r.venue} />
                    <Aspect label="Coordination" value={r.coordination} />
                    <Aspect label="Technical" value={r.technical} />
                    <Aspect label="Hospitality" value={r.hospitality} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );

  /* ========= Inner components ========= */
  function RangeField({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (n: number) => void;
  }) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">{label}</label>
          <span className="text-xs text-slate-500">{numToStr(value)}/5</span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-2 w-full"
        />
        <div className="mt-1 flex justify-between text-[11px] text-slate-400">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
      </div>
    );
  }

  function Aspect({ label, value }: { label: string; value: number }) {
    return (
      <div className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
        <span>{label}</span>
        <span className="font-medium">{value}/5</span>
      </div>
    );
  }
}
