"use client";
import React from "react";
import Link from "next/link";
import { BadgeCheck, CalendarCheck2, LineChart, ScanLine, ShieldCheck, Users } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-10 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
  <h2 className="text-center text-2xl sm:text-3xl font-bold" data-aos="fade-up">
          Everything You Need to Run Great Events
        </h2>
        <p
          className="mx-auto mt-2 max-w-2xl sm:max-w-3xl text-center text-slate-600 text-sm sm:text-base"
          data-aos="fade-up"
          data-aos-delay="40"
        >
          Publish schedules, manage seats and waitlists, verify attendance, capture reviews, and issue
          certificates — in one streamlined flow.
        </p>

        {/* === First Row === */}
  <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
          <Link
            href="/events"
            className="rounded-2xl border border-slate-200 p-6 shadow transition hover:shadow-md block"
            data-aos="fade-up"
          >
            <CalendarCheck2 className="h-8 w-8 text-cyan-500" />
            <h3 className="mt-4 text-lg font-semibold">Smart Registration</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>• One-tap join with reminders</li>
              <li>• Seat caps & auto close</li>
              <li>• Exportable attendee list</li>
            </ul>
          </Link>

          <Link
            href="/events/id/attendance"
            className="rounded-2xl border border-slate-200 p-6 shadow transition hover:shadow-md block"
            data-aos="fade-up"
            data-aos-delay="40"
          >
            <ScanLine className="h-8 w-8 text-cyan-500" />
            <h3 className="mt-4 text-lg font-semibold">QR Attendance</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>• Fast check-in & check-out</li>
              <li>• Fraud controls & logs</li>
              <li>• Role-based scanners</li>
            </ul>
          </Link>

          <Link
            href="/certificates"
            className="rounded-2xl border border-slate-200 p-6 shadow transition hover:shadow-md block"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            <BadgeCheck className="h-8 w-8 text-cyan-500" />
            <h3 className="mt-4 text-lg font-semibold">Digital Certificates</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>• Auto-issued after verification</li>
              <li>• Personalized templates</li>
              <li>• Shareable links & QR</li>
            </ul>
          </Link>
        </div>

        {/* === Second Row === */}
  <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 md:grid-cols-3">
          <Link
            href="/insights"
            className="rounded-2xl border border-slate-200 p-6 shadow transition hover:shadow-md block"
            data-aos="fade-up"
          >
            <LineChart className="h-8 w-8 text-cyan-500" />
            <h3 className="mt-4 text-lg font-semibold">Insights</h3>
            <p className="mt-2 text-sm text-slate-600">
              Live dashboards for registrations, show-up rate, and satisfaction scores.
            </p>
          </Link>

          <Link
            href="/community"
            className="rounded-2xl border border-slate-200 p-6 shadow transition hover:shadow-md block"
            data-aos="fade-up"
            data-aos-delay="40"
          >
            <Users className="h-8 w-8 text-cyan-500" />
            <h3 className="mt-4 text-lg font-semibold">Community</h3>
            <p className="mt-2 text-sm text-slate-600">
              Boost discovery with categories, tags, and curated collections.
            </p>
          </Link>

          <Link
            href="/admin/moderation"
            className="rounded-2xl border border-slate-200 p-6 shadow transition hover:shadow-md block"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            <ShieldCheck className="h-8 w-8 text-cyan-500" />
            <h3 className="mt-4 text-lg font-semibold">Moderation</h3>
            <p className="mt-2 text-sm text-slate-600">
              Admin approvals, content flags, and audit trails keep events safe.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
