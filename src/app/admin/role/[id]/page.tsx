"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Shield } from "lucide-react";

// demo data
const USERS = [
    { id: "1", name: "Alice", email: "alice@example.com", role: "User" },
    { id: "2", name: "Bob", email: "bob@example.com", role: "Organizer" },
    { id: "3", name: "Charlie", email: "charlie@example.com", role: "Admin" },
];

export default function EditUserPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const user = useMemo(() => USERS.find((u) => u.id === id), [id]);

    if (!user) {
        return (
            <div className="mx-auto max-w-3xl p-6">
                <button
                    onClick={() => router.back()}
                    className="mb-4 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>
                <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
                    User not found (id: {id})
                </div>
            </div>
        );
    }

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(user.role);
    const [showPw, setShowPw] = useState(false);

    const changed = name !== user.name || email !== user.email || password.length > 0 || role !== user.role;

    const handleSave = () => {
        alert(`Updated user ${user.id}:\nName=${name}, Email=${email}, Password=${password}, Role=${role}`);
        // TODO: call API update rồi điều hướng nếu cần
    };

    return (
        <div className="mx-auto max-w-3xl p-6">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>

                <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-600">
                    <Shield className="h-3.5 w-3.5" />
                    <span className="font-medium">ID:</span> {user.id}
                </div>
            </div>

            {/* Card */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
                {/* Title bar */}
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <h1 className="text-lg font-semibold text-slate-900">Edit User</h1>
                        <p className="mt-0.5 text-xs text-slate-500">Update basic info, password and permissions.</p>
                    </div>

                    <RoleBadge role={role} />
                </div>

                {/* Content */}
                <div className="space-y-8 p-5">
                    {/* Account */}
                    <Section title="Account">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Name">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm transition outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200"
                                    placeholder="Full name"
                                />
                                <Hint>Public display name.</Hint>
                            </Field>

                            <Field label="Email">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm transition outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200"
                                    placeholder="name@company.com"
                                />
                                <Hint>Login & contact email.</Hint>
                            </Field>
                        </div>
                    </Section>

                    {/* Security */}
                    <Section title="Security">
                        <Field label="Password">
                            <div className="relative">
                                <input
                                    type={showPw ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 pr-9 text-sm transition outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw((s) => !s)}
                                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-slate-500 hover:text-slate-700"
                                    aria-label={showPw ? "Hide password" : "Show password"}
                                >
                                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <Hint>Leave blank to keep current password.</Hint>
                        </Field>
                    </Section>

                    {/* Permissions */}
                    <Section title="Permissions">
                        <Field label="Role">
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm transition outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200"
                            >
                                <option>User</option>
                                <option>Organizer</option>
                                <option>Admin</option>
                            </select>
                            <Hint>Choose minimal role required.</Hint>
                        </Field>
                    </Section>
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
                    <p className="text-xs text-slate-500">
                        Last updated just now (demo). Changes won’t persist without API.
                    </p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!changed}
                            className={`rounded-lg px-4 py-2 text-sm text-white transition ${
                                changed
                                    ? "bg-cyan-600 hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
                                    : "cursor-not-allowed bg-slate-300"
                            }`}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

/* ---------- UI helpers ---------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <h2 className="mb-3 text-sm font-semibold text-slate-700">{title}</h2>
            <div className="rounded-xl border border-slate-200 p-4">{children}</div>
        </section>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
            {children}
        </div>
    );
}

function Hint({ children }: { children: React.ReactNode }) {
    return <p className="mt-1 text-xs text-slate-500">{children}</p>;
}

function RoleBadge({ role }: { role: string }) {
    const styles =
        role === "Admin"
            ? "bg-rose-100 text-rose-700 ring-rose-200"
            : role === "Organizer"
              ? "bg-amber-100 text-amber-700 ring-amber-200"
              : "bg-emerald-100 text-emerald-700 ring-emerald-200";
    return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ring-1 ${styles}`}>{role}</span>;
}
