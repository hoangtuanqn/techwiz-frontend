"use client";

import React from "react";
import { Calendar, Users, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { organizerApi } from "~/apiRequest/organizer";

/* =========================
   Donut KPI (pure CSS)
   ========================= */
function DonutCard({
    title,
    percent,
    color = "#3b82f6",
    footnote,
}: {
    title: string;
    percent: number;
    color?: string;
    footnote?: string;
}) {
    const p = Math.max(0, Math.min(100, percent));
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-xs font-semibold text-slate-500">{title}</h3>
            <div className="flex items-center justify-center">
                <div
                    className="relative grid h-36 w-36 place-items-center rounded-full"
                    style={{
                        background: `conic-gradient(${color} ${p}%, #e5e7eb ${p}% 100%)`,
                    }}
                    aria-label={`${p}%`}
                    role="img"
                >
                    <div className="h-20 w-20 rounded-full bg-white ring-8 ring-white" />
                    <span className="pointer-events-none absolute text-lg font-bold text-slate-800">{p}%</span>
                </div>
            </div>
            {footnote && <p className="mt-3 text-[11px] text-slate-500">{footnote}</p>}
        </article>
    );
}

/* =========================
   Number KPI
   ========================= */
function NumberCard({
    title,
    value,
    caption,
    icon: Icon,
    color = "#06b6d4",
}: {
    title: string;
    value: string;
    caption?: string;
    icon?: React.ElementType;
    color?: string;
}) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-1 text-[11px] font-semibold text-slate-500">{title}</h3>
            <div className="flex items-center gap-2">
                {Icon && (
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}10`, color: color }}>
                        <Icon className="h-5 w-5" />
                    </div>
                )}
                <div className="text-2xl font-extrabold text-slate-800">{value}</div>
            </div>
            {caption && <p className="mt-1 text-[11px] text-slate-500">{caption}</p>}
        </article>
    );
}

/* =========================
   Bar Chart (0..100%)
   ========================= */
function BarChartCard({
    title,
    values,
    labels,
    note,
}: {
    title: string;
    values: number[];
    labels: string[];
    note?: string;
}) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-xs font-semibold text-slate-500">{title}</h3>
            <div className="h-64 w-full rounded-md border border-slate-200 bg-white p-4">
                <div
                    className="h-full w-full"
                    style={{
                        background:
                            "repeating-linear-gradient(to top, #eef2f7 0, #eef2f7 1px, transparent 1px, transparent 32px)",
                    }}
                >
                    <div className="flex h-full items-end gap-6 px-2">
                        {values.map((v, i) => (
                            <div key={i} className="flex w-12 flex-col items-center justify-end">
                                <div
                                    className="w-full rounded-md bg-[#93c5fd]"
                                    style={{ height: `${Math.max(0, Math.min(100, v))}%` }}
                                    aria-label={`${labels[i]}: ${v}%`}
                                />
                                <span className="mt-1 translate-y-2 text-[10px] text-slate-500">{labels[i]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {note && <p className="mt-2 text-[11px] text-slate-500">{note}</p>}
        </article>
    );
}

/* =========================
   Line + Area Chart (SVG)
   ========================= */
function AreaLineChartCard({
    title,
    values,
    labels,
    noteTop,
    noteBottom,
    stroke = "#16a34a",
    fill = "rgba(22,163,74,0.15)",
}: {
    title: string;
    values: number[];
    labels: string[];
    noteTop?: string;
    noteBottom?: string;
    stroke?: string;
    fill?: string;
}) {
    const W = 1100;
    const H = 260;
    const P = 24;
    const max = Math.max(...values, 1);
    const stepX = (W - P * 2) / (values.length - 1);
    const scaleY = (n: number) => H - P - (n / max) * (H - P * 2);

    const pts = values.map((v, i) => `${P + i * stepX},${scaleY(v)}`).join(" ");
    const area = `M ${P},${H - P} L ${pts} L ${P + (values.length - 1) * stepX},${H - P} Z`;

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-xs font-semibold text-slate-500">{title}</h3>
            <div className="w-full overflow-hidden rounded-md border border-slate-200 bg-white p-3">
                <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="320" role="img" aria-label={title}>
                    {[0, 0.2, 0.4, 0.6, 0.8, 1].map((p) => {
                        const y = P + (1 - p) * (H - P * 2);
                        return <line key={p} x1={P} x2={W - P} y1={y} y2={y} stroke="#eef2f7" strokeWidth="1" />;
                    })}
                    <path d={area} fill={fill} />
                    <polyline
                        points={pts}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={3}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    {labels.map((lb, i) => {
                        const x = P + i * stepX;
                        return (
                            <text key={i} x={x} y={H - 6} fontSize="11" fill="#64748b" textAnchor="middle">
                                {lb}
                            </text>
                        );
                    })}
                </svg>
            </div>
            {noteTop && <p className="mt-2 text-[11px] text-slate-500">{noteTop}</p>}
            {noteBottom && <p className="text-[11px] text-slate-500">{noteBottom}</p>}
        </article>
    );
}

/* =========================
   Organizer Dashboard Page
   ========================= */
export default function OrganizerDashboardPage() {
    const { data: statsResponse, isLoading: statsLoading } = useQuery({
        queryKey: ['organizer-stats'],
        queryFn: async () => {
            const response = await organizerApi.getStats();
            return response.data;
        },
    });

    const stats = statsResponse?.data;

    const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
    
    // Mock data for charts - replace with real data from stats
    const eventStats = [2, 3, 1, 4, 2, 5, 3, 6, 4, 3, 2, 4];
    const participants = [45, 52, 38, 67, 58, 72, 65, 89, 78, 71, 63, 85];

    if (statsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06b6d4] mx-auto"></div>
                    <p className="mt-4 text-slate-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen space-y-6 bg-slate-50 p-6">
            {/* KPI row */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <NumberCard 
                    title="Events • Total" 
                    value={stats?.total_events?.toString() || "0"} 
                    caption="All events created" 
                    icon={Calendar} 
                    color="#06b6d4"
                />
                <NumberCard 
                    title="Events • Approved" 
                    value={stats?.approved_events?.toString() || "0"} 
                    caption="Successfully approved events" 
                    icon={CheckCircle} 
                    color="#16a34a"
                />
                <NumberCard 
                    title="Events • Pending" 
                    value={stats?.pending_events?.toString() || "0"} 
                    caption="Awaiting admin approval" 
                    icon={Clock} 
                    color="#f59e0b"
                />
                <NumberCard 
                    title="Events • Rejected" 
                    value={stats?.rejected_events?.toString() || "0"} 
                    caption="Events that were rejected" 
                    icon={XCircle} 
                    color="#ef4444"
                />
            </div>

            {/* Event Status Distribution */}
            <div className="grid gap-6 md:grid-cols-2">
                <DonutCard
                    title="Event Status • Distribution"
                    percent={75}
                    color="#16a34a"
                    footnote="75% of events are approved"
                />
                <DonutCard
                    title="Event Capacity • Average Fill Rate"
                    percent={68}
                    color="#3b82f6"
                    footnote="Average participants per event"
                />
            </div>

            {/* Bar chart */}
            <BarChartCard
                title="Bar chart • Events Created Monthly (12 months)"
                values={eventStats}
                labels={months}
                note="Number of events created each month by this organizer."
            />

            {/* Line chart */}
            <AreaLineChartCard
                title="Line chart • Total Participants Monthly"
                values={participants}
                labels={months}
                noteTop="Total participants across all your events per month."
                noteBottom="Latest month: August • Participants: 85"
            />

            {/* Recent Activity */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-slate-700">Recent Activity</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">"Tech Conference 2024" was approved</p>
                            <p className="text-xs text-slate-500">2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-yellow-50 p-3">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">"Web Development Workshop" is pending review</p>
                            <p className="text-xs text-slate-500">1 day ago</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">"Data Science Meetup" was rejected</p>
                            <p className="text-xs text-slate-500">3 days ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}