"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";

// Sample events
const EVENTS = [
  { id: 1, title: "Tires Cup", start: "2025-09-08", end: "2025-09-08", org: "Dept A" },
  { id: 2, title: "Showdown Cup", start: "2025-09-08", end: "2025-09-08", org: "Dept B" },
  { id: 3, title: "Exhaust Cup", start: "2025-09-09", end: "2025-09-09", org: "Dept A" },
  { id: 4, title: "VIP Fusion Coins Cup", start: "2025-09-09", end: "2025-09-11", org: "Dept C" },
  { id: 5, title: "Suspension Cup", start: "2025-09-10", end: "2025-09-10", org: "Dept D" },
  { id: 6, title: "Master Season", start: "2025-09-11", end: "2025-09-14", org: "Dept X" },
  { id: 7, title: "Past Event Example", start: "2025-09-25", end: "2025-09-27", org: "Dept Y" },
  { id: 8, title: "Past Event Example", start: "2025-09-25", end: "2025-09-27", org: "Dept Y" },
];

const PALETTE = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#F43F5E",
];

// Utils
const parseDate = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day);
};
const startOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay(),
    diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
};
const addDays = (date: Date, n: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  d.setHours(0, 0, 0, 0);
  return d;
};
const daysBetween = (a: Date, b: Date) => Math.round((+a - +b) / (24 * 3600 * 1000));

const CalendarPage: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(1);
  const [anchorDate, setAnchorDate] = useState<Date>(new Date());
  const [days, setDays] = useState<Date[]>([]);
  const [visibleEvents, setVisibleEvents] = useState<typeof EVENTS>([]);

  useEffect(() => {
    AOS.init({ once: true, duration: 420 });
  }, []);

  useEffect(() => {
    const anchor = new Date(anchorDate);
    anchor.setHours(0, 0, 0, 0);
    const rangeStart = startOfWeek(anchor);
    const numDays = weeks * 7;
    const daysArr = Array.from({ length: numDays }, (_, i) => addDays(rangeStart, i));
    setDays(daysArr);
  }, [weeks, anchorDate]);

  useEffect(() => {
    if (days.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = days[0];
    const endDate = days[days.length - 1];

    const filtered = EVENTS.filter((ev) => {
      const s = parseDate(ev.start);
      const e = parseDate(ev.end);
      return !(e < startDate || s > endDate);
    }).sort((a, b) => parseDate(a.start).getTime() - parseDate(b.start).getTime() || a.id - b.id);

    setVisibleEvents(filtered);
  }, [days]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-white text-slate-800 antialiased">
      <main className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="controls mb-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Event Calendar</h1>
            <p className="text-sm text-slate-600">
              Choose 1 week or 2 weeks — each event takes one row and spans across the corresponding days.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAnchorDate((prev) => addDays(prev, -7 * weeks))}
              className="rounded-lg border px-3 py-2 hover:bg-slate-50"
            >
              ‹ Previous
            </button>
            <button
              onClick={() => setAnchorDate(new Date())}
              className="rounded-lg border px-3 py-2 hover:bg-slate-50"
            >
              Today
            </button>
            <button
              onClick={() => setAnchorDate((prev) => addDays(prev, 7 * weeks))}
              className="rounded-lg border px-3 py-2 hover:bg-slate-50"
            >
              Next ›
            </button>
            <select
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              className="rounded-lg border px-3 py-2"
            >
              <option value={1}>1 week</option>
              <option value={2}>2 weeks</option>
            </select>
          </div>
        </div>

        {/* Calendar */}
        <div
          className="calendar-wrapper"
          data-aos="fade-up"
          style={{
            overflowX: weeks === 2 ? "auto" : "visible",
            WebkitOverflowScrolling: "touch",
            maxWidth: weeks === 2 ? "100%" : "none",
          }}
        >
          {/* Header Days */}
          <div
            className="days-header grid mt-4"
            style={{
              gridTemplateColumns: `repeat(${days.length}, minmax(140px, 1fr))`,
              minWidth: weeks === 2 ? `${days.length * 140}px` : undefined,
            }}
          >
            {days.map((d, idx) => {
              const isToday = d.getTime() === today.getTime();
              const label = `${d.toLocaleString("en-US", { weekday: "short" })} ${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`;
              return (
          <div
            key={idx}
            className={`day-header border-b px-2 py-1 text-center font-medium ${isToday ? "rounded-t bg-blue-100 text-blue-700" : ""}`}
            title={d.toLocaleDateString("en-US")}
          >
            {label}
          </div>
              );
            })}
          </div>

          {/* Event Rows */}
          <div
            className="calendar-body mt-2 space-y-2"
            style={{
              minWidth: weeks === 2 ? `${days.length * 140}px` : undefined,
            }}
          >
            {visibleEvents.length === 0 && (
              <div className="p-4 text-center text-slate-500">
          No events in this period.
              </div>
            )}
            {visibleEvents.map((ev) => {
              const start = parseDate(ev.start),
          end = parseDate(ev.end);
              const startIdx = Math.max(0, daysBetween(start, days[0]));
              const endIdx = Math.min(days.length - 1, daysBetween(end, days[0]));
              const isPast = end < today;
              const bgColor = isPast ? "#f3f4f6" : PALETTE[ev.id % PALETTE.length];

              return (
          <div
            key={ev.id}
            className="event-row grid items-center"
            style={{
              gridTemplateColumns: `repeat(${days.length}, minmax(140px,1fr))`,
            }}
          >
            <div
              className={`event-block flex flex-col justify-center rounded px-3 py-2 shadow-sm ${isPast ? "opacity-60" : "text-white"}`}
              style={{
                gridColumn: `${startIdx + 1} / ${endIdx + 2}`,
                background: bgColor,
                border: isPast ? "1px solid #e5e7eb" : "none",
              }}
            >
              <div className="flex items-center gap-2">
                <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: isPast ? "#9CA3AF" : bgColor,
              boxShadow: "0 3px 10px rgba(15,23,42,0.06)",
            }}
                />
                <div className="min-w-0">
            <div className="truncate font-bold">{ev.title}</div>
            <div className="text-xs opacity-85">
              {ev.start}
              {ev.end !== ev.start ? ` → ${ev.end}` : ""}
            </div>
            <div className="text-xs opacity-80">{ev.org}</div>
                </div>
              </div>
              <div className="mt-1 text-[0.86rem] opacity-95">
                {isPast ? "Ended" : start > today ? "Upcoming" : "Ongoing"}
              </div>
            </div>
          </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-500">
          Note: multi-day events will expand horizontally to cover the corresponding days. Past events will appear faded.
        </div>
      </main>

      <footer className="mt-16 border-t border-slate-200 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:px-6 md:flex-row lg:px-8">
          <span>© 2025 EventSphere. All rights reserved.</span>
          <a href="#" className="inline-flex items-center gap-1 hover:text-cyan-600">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M5 9l7-7 7 7" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
};

export default CalendarPage;
