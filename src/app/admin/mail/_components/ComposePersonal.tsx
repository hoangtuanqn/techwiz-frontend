
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Mail, Paperclip, Send } from "lucide-react";

type DirectoryItem = {
    id: string;
    name: string;
    email: string;
    role: "Participant" | "Organizer" | "Admin";
};

const DIRECTORY: DirectoryItem[] = [
    { id: "u1", name: "Nguyễn Văn A", email: "nguyenvana@example.com", role: "Participant" },
    { id: "u2", name: "Trần Thị B", email: "tranthib@example.com", role: "Organizer" },
    { id: "u3", name: "Lê Văn C", email: "levanc@example.com", role: "Admin" },
];

function isValidEmail(s: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export default function ComposePersonal() {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);

    // search by email
    const [email, setEmail] = useState("");
    const [suggest, setSuggest] = useState<DirectoryItem[]>([]);
    const [picked, setPicked] = useState<DirectoryItem | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // suggestions by email (>= 2 chars)
    useEffect(() => {
        const id = setTimeout(() => {
            const q = email.trim().toLowerCase();
            if (q.length < 2) return setSuggest([]);
            const data = DIRECTORY.filter((r) => r.email.toLowerCase().includes(q));
            setSuggest(data);
        }, 200);
        return () => clearTimeout(id);
    }, [email]);

    // click outside to close suggestions
    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(e.target as Node)) setSuggest([]);
        }
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    const canSend = useMemo(() => !!(isValidEmail(email) && subject.trim() && body.trim()), [email, subject, body]);

    async function sendPersonal() {
        if (!canSend) {
            alert("Please enter a valid email and fill in subject + body.");
            return;
        }
        const payload: any = {
            subject,
            body,
            recipientEmail: email,
            recipientId: picked?.id, // optional, if selected from suggestions
        };

        try {
            let res: Response;
            if (files?.length) {
                const fd = new FormData();
                Object.entries(payload).forEach(([k, v]) => v != null && fd.append(k, String(v)));
                Array.from(files).forEach((f) => fd.append("files[]", f));
                res = await fetch("/api/notifications/personal", { method: "POST", body: fd });
            } else {
                res = await fetch("/api/notifications/personal", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }
            if (!res.ok) throw new Error((await res.text()) || `HTTP ${res.status}`);
            alert(`Personal notification sent to ${email}`);
            // reset
            setSubject("");
            setBody("");
            setFiles(null);
            setPicked(null);
            setEmail("");
            setSuggest([]);
        } catch (e: any) {
            alert("Failed to send: " + e.message);
        }
    }

    return (
        <div className="flex-1 space-y-4 overflow-auto p-4">
            <div className="rounded-xl border border-slate-200 p-3">
                <div className="mb-2 text-xs font-semibold text-slate-600">Personal notification</div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <label className="text-sm">
                        <span className="mb-1 block text-slate-600">Subject</span>
                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="e.g., Ticket update / Certificate confirmation…"
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-cyan-200"
                        />
                    </label>

                    {/* recipient via email */}
                    <div className="relative" ref={dropdownRef}>
                        <label className="block text-sm">
                            <span className="mb-1 block text-slate-600">Recipient (email)</span>
                            <div className="relative">
                                <input
                                    value={email}
                                    onChange={(e) => {
                                        setPicked(null);
                                        setEmail(e.target.value);
                                    }}
                                    type="email"
                                    placeholder="enter recipient email (e.g., user@domain.com)"
                                    className={`w-full rounded-lg border p-2 pr-10 text-sm focus:ring-2 focus:ring-cyan-200 ${
                                        email && !isValidEmail(email) ? "border-red-300" : "border-slate-200"
                                    }`}
                                />
                                <Mail className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                            {email && !isValidEmail(email) && (
                                <p className="mt-1 text-xs text-red-600">Invalid email address</p>
                            )}
                        </label>

                        {suggest.length > 0 && (
                            <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow">
                                {suggest.map((u) => (
                                    <button
                                        type="button"
                                        key={u.id}
                                        onClick={() => {
                                            setPicked(u);
                                            setEmail(u.email);
                                            setSuggest([]);
                                        }}
                                        className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-slate-50"
                                    >
                                        <div className="min-w-0">
                                            <div className="truncate font-medium text-slate-800">{u.email}</div>
                                            <div className="truncate text-xs text-slate-500">{u.name}</div>
                                        </div>
                                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                                            {u.role}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <label className="text-sm md:col-span-2">
                        <span className="mb-1 block text-slate-600">Body</span>
                        <textarea
                            rows={8}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-cyan-200"
                        />
                    </label>
                </div>

                {/* attachments */}
                <div className="mt-3 flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 text-sm">
                        <span className="mb-1 block text-slate-600">Attachments</span>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setFiles(e.currentTarget.files)}
                            className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-white hover:file:bg-slate-800"
                        />
                    </label>
                    <Paperclip className="h-4 w-4 text-slate-400" />
                </div>

                <div className="mt-3 flex justify-end">
                    <button
                        onClick={sendPersonal}
                        disabled={!canSend}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                    >
                        <Send className="h-4 w-4" /> Send
                    </button>
                </div>
            </div>
        </div>
    );
}
