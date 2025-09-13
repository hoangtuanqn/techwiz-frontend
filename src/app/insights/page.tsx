"use client";

import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  LineChart as LineChartIcon,
  Users,
  Star,
  Award,
  CalendarRange,
  TrendingUp,
} from "lucide-react";

/* ----------------------------- Utilities ----------------------------- */

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* ------------------------------- Mock --------------------------------
   TODO: replace with your API (e.g. /api/insights?year=2025)
------------------------------------------------------------------------*/

type MonthPoint = { label: string; value: number };
type CategoryRate = { label: string; rate: number }; // 0..1
type DonutSeg = { label: string; value: number };

function mockData(year: number) {
  // Deterministic demo numbers per year
  const seed = year * 13;
  const rnd = (i: number, base: number, spread: number) =>
    Math.round(base + Math.sin((i + seed) / 2.3) * spread + (i % 2 ? spread * 0.3 : -spread * 0.2));

  const registrationsByMonth: MonthPoint[] = months.map((m, i) => ({
    label: m,
    value: clamp(rnd(i, 420 + i * 25, 180), 120, 1400),
  }));

  const certificatesByMonth: MonthPoint[] = months.map((m, i) => ({
    label: m,
    value: clamp(rnd(i + 7, 260 + i * 18, 120), 60, 900),
  }));

  const categoryShowUp: CategoryRate[] = [
    { label: "Technical", rate: 0.86 },
    { label: "Business", rate: 0.78 },
    { label: "Cultural", rate: 0.91 },
    { label: "Sports", rate: 0.88 },
    { label: "Workshop", rate: 0.83 },
    { label: "Academic", rate: 0.76 },
  ];

  // Ratings distribution (1..5 stars)
  const ratings: DonutSeg[] = [
    { label: "5★", value: 1240 },
    { label: "4★", value: 780 },
    { label: "3★", value: 240 },
    { label: "2★", value: 70 },
    { label: "1★", value: 30 },
  ];
  const totalStars = ratings.reduce((s, r, idx) => s + r.value * (5 - idx), 0);
  const totalReviews = ratings.reduce((s, r) => s + r.value, 0);
  const avgRating = totalStars / totalReviews;

  const totalEventsAllTime = 312; // demo
  const newRegistrationsYTD = registrationsByMonth.reduce((s, d) => s + d.value, 0);
  const totalCertificatesYTD = certificatesByMonth.reduce((s, d) => s + d.value, 0);

  return {
    year,
    registrationsByMonth,
    certificatesByMonth,
    categoryShowUp,
    ratings,
    avgRating,
    totalReviews,
    totalEventsAllTime,
    newRegistrationsYTD,
    totalCertificatesYTD,
  };
}

/* --------------------------- Tiny chart kit -------------------------- */

function AreaLineChart({
  data,
  height = 180,
  strokeWidth = 2,
}: { data: MonthPoint[]; height?: number; strokeWidth?: number }) {
  const width = 560;
  const padX = 24;
  const padY = 18;
  const W = width, H = height;
  const xs = data.map((_, i) => i);
  const ys = data.map((d) => d.value);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const sx = (i: number) => padX + (i * (W - padX * 2)) / (data.length - 1 || 1);
  const sy = (v: number) => padY + (H - padY * 2) * (1 - (v - minY) / (maxY - minY || 1));
  const d = data.map((pt, i) => `${i === 0 ? "M" : "L"} ${sx(i)} ${sy(pt.value)}`).join(" ");
  const area =
    `M ${sx(0)} ${sy(data[0].value)} ` +
    data.map((pt, i) => `L ${sx(i)} ${sy(pt.value)}`).join(" ") +
    ` L ${sx(data.length - 1)} ${H - padY} L ${sx(0)} ${H - padY} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[180px]">
      {/* grid */}
      <g opacity={0.25} stroke="#e2e8f0">
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={padX} x2={W - padX} y1={padY + (i * (H - padY * 2)) / 3} y2={padY + (i * (H - padY * 2)) / 3} />
        ))}
      </g>
      {/* area */}
      <path d={area} fill="url(#g1)" opacity={0.25} />
      {/* gradient */}
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      {/* line */}
      <path d={d} fill="none" stroke="url(#g1)" strokeWidth={strokeWidth} />
      {/* points */}
      {data.map((pt, i) => (
        <circle key={i} cx={sx(i)} cy={sy(pt.value)} r={2.5} fill="#06b6d4" />
      ))}
    </svg>
  );
}

function BarChart({
  data,
  height = 180,
}: { data: CategoryRate[]; height?: number }) {
  const W = 560, H = height;
  const padX = 24, padY = 18;
  const bw = (W - padX * 2) / data.length - 12;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[180px]">
      <g opacity={0.25} stroke="#e2e8f0">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={padX} x2={W - padX} y1={padY + (i * (H - padY * 2)) / 4} y2={padY + (i * (H - padY * 2)) / 4} />
        ))}
      </g>
      {data.map((d, i) => {
        const x = padX + i * ((W - padX * 2) / data.length) + 6;
        const barH = (H - padY * 2) * d.rate;
        const y = H - padY - barH;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={bw} height={barH} rx={8} fill="url(#gb)" />
            <text x={x + bw / 2} y={H - 4} textAnchor="middle" fontSize={10} fill="#475569">
              {d.label}
            </text>
          </g>
        );
      })}
      <defs>
        <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DonutChart({
  data,
  totalLabel = "Total",
}: { data: DonutSeg[]; totalLabel?: string }) {
  const size = 180, stroke = 18, r = (size - stroke) / 2, cx = size / 2, cy = size / 2;
  const total = data.reduce((s, d) => s + d.value, 0);
  let acc = 0;
  const palette = ["#06b6d4","#22c55e","#f59e0b","#d946ef","#ef4444"];
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        {data.map((seg, i) => {
          const dash = (seg.value / total) * (2 * Math.PI * r);
          const gap = 6;
          const dashArray = `${dash} ${2 * Math.PI * r}`;
          const rot = (acc / total) * 360 - 90;
          acc += seg.value;
          return (
            <circle
              key={seg.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={palette[i % palette.length]}
              strokeWidth={stroke}
              strokeDasharray={dashArray}
              strokeDashoffset={0}
              transform={`rotate(${rot} ${cx} ${cy})`}
              strokeLinecap="butt"
            />
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize={16} fontWeight={700} fill="#0f172a">
          {fmt(total)}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize={11} fill="#475569">
          {totalLabel}
        </text>
      </svg>
      <ul className="space-y-1 text-sm">
        {data.map((seg, i) => (
          <li key={seg.label} className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: palette[i % palette.length] }} />
            <span className="text-slate-600">{seg.label}</span>
            <span className="ml-auto font-medium text-slate-800">{fmt(seg.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------- Page ------------------------------- */

export default function InsightsPage() {
  const now = new Date();
  const [year, setYear] = useState<number>(now.getFullYear());
  const data = useMemo(() => mockData(year), [year]);

  useEffect(() => {
    AOS.init({ once: true, duration: 420, easing: "ease-out", offset: 80 });
  }, []);

  return (
    <main className="bg-white text-slate-800">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-cyan-700 font-semibold" data-aos="fade-up">
                <LineChartIcon className="h-4 w-4" />
                Insights
              </div>
              <h1 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight" data-aos="fade-up" data-aos-delay="30">
                Live dashboards & analytics
              </h1>
              <p className="mt-1 text-slate-600" data-aos="fade-up" data-aos-delay="60">
                Overview of events, registrations, ratings and certificates.
              </p>
            </div>

            <div className="flex items-center gap-2" data-aos="fade-up" data-aos-delay="90">
              <CalendarRange className="h-4 w-4 text-slate-600" />
              <select
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value, 10))}
              >
                {[year, year - 1, year - 2, year - 3].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* KPI cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up">
          <KPI
            icon={<TrendingUp className="h-5 w-5 text-cyan-600" />}
            title="Total events (all-time)"
            value={fmt(data.totalEventsAllTime)}
            hint="+12 this month"
          />
          <KPI
            icon={<Users className="h-5 w-5 text-cyan-600" />}
            title={`New registrations (${data.year})`}
            value={fmt(data.newRegistrationsYTD)}
            hint="YTD"
          />
          <KPI
            icon={<Star className="h-5 w-5 text-cyan-600" />}
            title="Average rating"
            value={`${data.avgRating.toFixed(2)} / 5`}
            hint={`${fmt(data.totalReviews)} reviews`}
          />
          <KPI
            icon={<Award className="h-5 w-5 text-cyan-600" />}
            title={`Certificates issued (${data.year})`}
            value={fmt(data.totalCertificatesYTD)}
            hint="YTD"
          />
        </div>
      </section>

      {/* Charts */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Registrations by month" subtitle="YTD" dataAosDelay={0}>
            <AreaLineChart data={data.registrationsByMonth} />
          </Card>

          <Card title="Certificates issued by month" subtitle="YTD" dataAosDelay={60}>
            <AreaLineChart data={data.certificatesByMonth} />
          </Card>

          <Card title="Show-up rate by category" subtitle="(attendance / registrations)" dataAosDelay={90}>
            <BarChart data={data.categoryShowUp} />
          </Card>

          <Card title="Ratings distribution" subtitle="Reviews" dataAosDelay={120}>
            <DonutChart data={data.ratings} totalLabel="Total reviews" />
          </Card>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------ UI atoms ----------------------------- */

function KPI({
  icon,
  title,
  value,
  hint,
}: { icon: React.ReactNode; title: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50">{icon}</div>
      </div>
      <div className="mt-3 text-sm text-slate-600">{title}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
  dataAosDelay = 0,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  dataAosDelay?: number;
}) {
  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      data-aos="fade-up"
      data-aos-delay={dataAosDelay}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
