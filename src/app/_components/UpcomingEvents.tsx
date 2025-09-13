"use client";
import React from "react";
import Link from "next/link";
import { Users, CheckCircle, SlidersHorizontal, ArrowRight } from "lucide-react";

type ApiEvent = {
  id: string | number;
  title?: string;
  name?: string;
  description?: string | null;
  category?: string | null;
  thumbnail?: string | null;
  start_event: string;
  end_event?: string | null;
  booked_count?: number;
  seating?: { total_seats?: number } | null;
  is_booked?: boolean;
  image?: string | null;
  banner_url?: string | null;
  cover_url?: string | null;
};

type UiEvent = {
  id: string | number;
  title: string;
  description: string;
  category?: string;
  imageUrl?: string;
  start: Date;
  end?: Date;
  booked: number;
  totalSeats: number;
  isBooked: boolean;
};

function extractArray(payload: any): ApiEvent[] {
  if (Array.isArray(payload)) return payload;
  if (payload?.data?.data && Array.isArray(payload.data.data)) return payload.data.data;
  if (payload?.data && Array.isArray(payload.data)) return payload.data;
  if (payload?.events && Array.isArray(payload.events)) return payload.events;
  return [];
}

function toUiEvent(e: ApiEvent): UiEvent | null {
  const start = new Date(e.start_event);
  if (isNaN(start.getTime())) return null;
  const end = e.end_event ? new Date(e.end_event) : undefined;
  return {
    id: e.id,
    title: e.title || e.name || "Untitled event",
    description: (e.description ?? "").toString(),
    category: e.category ?? undefined,
    imageUrl: e.thumbnail || e.banner_url || e.cover_url || e.image || undefined,
    start,
    end,
    booked: Number(e.booked_count ?? 0),
    totalSeats: Number(e.seating?.total_seats ?? 0),
    isBooked: Boolean(e.is_booked),
  };
}

const pct = (booked: number, total: number) =>
  total ? Math.min(100, Math.round((booked / total) * 100)) : 0;
const barColor = (p: number) => (p > 95 ? "bg-red-500" : p > 60 ? "bg-amber-500" : "bg-emerald-500");
const isAvailable = (end?: Date) => !end || end.getTime() >= Date.now();

const UpcomingEvents: React.FC = () => {
  const [items, setItems] = React.useState<UiEvent[] | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const API = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000/api/v1";
        const res = await fetch(`${API}/events?per_page=100`, {
          headers: { accept: "application/json" },
          credentials: "include",
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const raw = extractArray(json);
        const all = raw.map(toUiEvent).filter((x): x is UiEvent => !!x);

        const now = Date.now();
        const upcoming = all
          .filter((e) => e.start.getTime() >= now)
          .sort((a, b) => a.start.getTime() - b.start.getTime());

        let chosen = upcoming.slice(0, 3);
        if (chosen.length < 3) {
          const past = all
            .filter((e) => e.start.getTime() < now)
            .sort((a, b) => b.start.getTime() - a.start.getTime());
          chosen = chosen.concat(past.slice(0, 3 - chosen.length));
        }
        setItems(chosen.slice(0, 3));
      } catch (e: any) {
        setErr(e?.message || "Failed to load events");
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TITLE + VIEW ALL */}
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Link href="/events" className="inline-flex items-center gap-1 text-cyan-600 hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* GRID */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Loading */}
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-40 w-full bg-slate-100" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-2/3 rounded bg-slate-100" />
                  <div className="h-3 w-5/6 rounded bg-slate-100" />
                  <div className="h-3 w-3/5 rounded bg-slate-100" />
                </div>
              </div>
            ))}

          {/* Error */}
          {!loading && err && (
            <div className="col-span-full rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
              Cannot load events: {err}
            </div>
          )}

          {/* Cards (UI giống EventList bên trong) */}
          {!loading &&
            !err &&
            (items ?? []).map((ev) => {
              const p = pct(ev.booked, ev.totalSeats);
              const available = isAvailable(ev.end);

              return (
                <Link
                  key={ev.id}
                  href={`/events/${ev.id}`}
                  className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                    ev.isBooked ? "ring-opacity-50 border-emerald-300 ring-2 ring-emerald-200" : "border-slate-200"
                  }`}
                >
                  {ev.isBooked && (
                    <div className="absolute right-3 top-3 z-10">
                      <div className="flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-1 text-xs font-semibold text-white shadow-lg">
                        <CheckCircle className="h-3 w-3" />
                        Registered
                      </div>
                    </div>
                  )}

                  <img
                    src={ev.imageUrl || `https://picsum.photos/seed/event-${encodeURIComponent(String(ev.id))}/800/360`}
                    alt={ev.title}
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="p-4">
                    <h3
                      className={`font-semibold transition-colors ${
                        ev.isBooked ? "text-emerald-700 group-hover:text-emerald-600" : "text-slate-800 group-hover:text-[#06b6d4]"
                      }`}
                    >
                      {ev.isBooked && "✓ "}
                      {ev.title}
                    </h3>

                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="mb-3 flex items-center gap-1">
                          <Users className="h-4 w-4 text-cyan-600" />
                          {ev.booked}/{ev.totalSeats} booked
                        </span>
                        <span className="font-medium">{Math.max(0, 100 - p)}% left</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div className={`h-2 rounded-full ${barColor(p)}`} style={{ width: `${p}%` }} />
                      </div>
                    </div>

                    {ev.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">{ev.description}</p>
                    )}

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-slate-500">{ev.category ?? "General"}</span>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {available ? "Available" : "Closed"}
                      </span>
                      <span className="flex items-center gap-1 text-[#06b6d4] group-hover:underline">
                        Details <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

          {!loading && !err && items && items.length === 0 && (
            <div className="col-span-full rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
              No events found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
