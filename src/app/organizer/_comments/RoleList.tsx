"use client";

import { useMemo, useState } from "react";
import { Search, Pencil } from "lucide-react";
import Link from "next/link";

export type RoleRow = {
    id: number | string;
    name: string;
    email: string;
    role: "User" | "Organizer" | "Admin" | string;
};

export default function RoleList({ title, subtitle, rows }: { title: string; subtitle?: string; rows: RoleRow[] }) {
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        const t = q.trim().toLowerCase();
        if (!t) return rows;
        return rows.filter(
            (r) =>
                r.name.toLowerCase().includes(t) ||
                r.email.toLowerCase().includes(t) ||
                String(r.id).toLowerCase().includes(t),
        );
    }, [q, rows]);

    return (
        <section className="mx-auto max-w p-6">
            {/* Header */}
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
                    {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
                </div>

                {/* Search */}
                <label className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder={`Search ${title.toLowerCase()}…`}
                        className="w-72 rounded-lg border border-slate-200 py-2 pr-3 pl-9 text-sm transition outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200"
                    />
                </label>
            </div>

            {/* Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Top bar */}
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-xs text-slate-500">
                    <span>
                        Showing <b className="mx-1 text-slate-700">{filtered.length}</b> of {rows.length}
                    </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <Th>ID</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th className="text-center">Action</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((r, idx) => (
                                <tr
                                    key={r.id}
                                    className={`border-t border-slate-100 ${
                                        idx % 2 === 1 ? "bg-slate-50/40" : "bg-white"
                                    } hover:bg-cyan-50/40`}
                                >
                                    <Td className="text-slate-600">{r.id}</Td>
                                    <Td className="font-medium">{r.name}</Td>
                                    <Td className="text-slate-700">{r.email}</Td>
                                    <Td>
                                        <RoleBadge role={r.role} />
                                    </Td>
                                    <Td className="text-center">
                                        <Link
                                            href={`/organizer/role/${r.id}`}
                                            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
                                            aria-label={`Edit ${r.name}`}
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                            Edit
                                        </Link>
                                    </Td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                                        No results.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

/* ---------- Small UI helpers ---------- */
function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <th
            className={`sticky top-0 z-10 px-3 py-2 text-left text-xs font-semibold tracking-wide uppercase ${className}`}
        >
            {children}
        </th>
    );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <td className={`px-3 py-2 align-middle ${className}`}>{children}</td>;
}

function RoleBadge({ role }: { role: string }) {
    const variant =
        role === "Admin"
            ? "bg-rose-100 text-rose-700 ring-rose-200"
            : role === "Organizer"
              ? "bg-amber-100 text-amber-700 ring-amber-200"
              : "bg-emerald-100 text-emerald-700 ring-emerald-200"; // User / default

    return (
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ring-1 ${variant}`}>{role}</span>
    );
}
