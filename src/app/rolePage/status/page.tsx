"use client";

import React from "react";
import { Users, UserPlus } from "lucide-react";

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
}: {
    title: string;
    value: string;
    caption?: string;
    icon?: React.ElementType;
}) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-1 text-[11px] font-semibold text-slate-500">{title}</h3>
            <div className="flex items-center gap-2">
                {Icon && (
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#06b6d4]/10 text-[#06b6d4]">
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
   Admin Dashboard Page
   ========================= */
export default function AdminStatsPage() {
    const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
    const feedbackPct = [32, 38, 36, 41, 39, 45, 42, 49, 52, 47, 44, 50];
    const certs = [120, 110, 98, 130, 142, 150, 162, 170, 155, 148, 160, 175];

    return (
        <section className="min-h-screen space-y-6 bg-slate-50 p-6">
            {/* KPI row */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <DonutCard
                    title="Feedback • Average rate (latest month)"
                    percent={50}
                    color="#60a5fa"
                    footnote="Latest month: August 2025"
                />
                <DonutCard
                    title="Certificates • Average rate"
                    percent={62}
                    color="#34d399"
                    footnote="Based on participants per event"
                />
                <NumberCard title="Users • Total" value="4,520" caption="Total registered users" icon={Users} />
                <NumberCard
                    title="Users • New (30 days)"
                    value="+120"
                    caption="vs previous term: +12%"
                    icon={UserPlus}
                />
            </div>

            {/* Bar chart */}
            <BarChartCard
                title="Bar chart • Avg. Feedback / Participants (12 months)"
                values={feedbackPct}
                labels={months}
                note="Each bar is a monthly average across that month's events."
            />

            {/* Line chart */}
            <AreaLineChartCard
                title="Line chart • Certificates issued monthly"
                values={certs}
                labels={months}
                noteTop="Total certificates issued per month of the academic year."
                noteBottom="Latest month: August • Count: 175"
            />
        </section>
    );
}
