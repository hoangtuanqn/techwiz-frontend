"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MessageCircle, Send, Heart, Reply, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import CommentsSkeleton from "./CommentsSkeleton";

/* ============ Types ============ */
type CommentItem = {
    id: string;
    parentId?: string | null;
    author: { name: string; email?: string };
    body: string;
    createdAt: number; // epoch ms
    likes: number;
};
type SortKey = "newest" | "oldest" | "top";

/* ============ Local storage (demo only) ============ */
const storageKey = (ns: string, postId: number | string) => `eventsphere:${ns}:comments:${postId}`;

function loadComments(ns: string, postId: number | string): CommentItem[] {
    try {
        const raw = localStorage.getItem(storageKey(ns, postId));
        return raw ? (JSON.parse(raw) as CommentItem[]) : [];
    } catch {
        return [];
    }
}

function saveComments(ns: string, postId: number | string, items: CommentItem[]) {
    localStorage.setItem(storageKey(ns, postId), JSON.stringify(items));
}

/* ============ Utils ============ */
const now = () => Date.now();
const uid = () => Math.random().toString(36).slice(2, 10);
const fmtDate = (t: number) =>
    new Date(t).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

function sortItems(list: CommentItem[], sort: SortKey) {
    const copy = [...list];
    switch (sort) {
        case "top":
            return copy.sort((a, b) => b.likes - a.likes || b.createdAt - a.createdAt);
        case "oldest":
            return copy.sort((a, b) => a.createdAt - b.createdAt);
        case "newest":
        default:
            return copy.sort((a, b) => b.createdAt - a.createdAt);
    }
}

/* ============ Main Component ============ */
export default function CommentsSection({
    postId,
    postTitle,
    storageNamespace = "blog", // đổi "event" / "gallery" nếu dùng lại
    maxDepth = 2,
}: {
    postId: number | string;
    postTitle?: string;
    storageNamespace?: string;
    maxDepth?: number;
}) {
    const [mounted, setMounted] = useState(false);
    const [items, setItems] = useState<CommentItem[]>([]);
    const [sort, setSort] = useState<SortKey>("newest");
    const [expanded, setExpanded] = useState(true);

    useEffect(() => setMounted(true), []);
    useEffect(() => {
        if (!mounted) return;
        setItems(loadComments(storageNamespace, postId));
    }, [mounted, postId, storageNamespace]);

    const persist = (next: CommentItem[]) => {
        setItems(next);
        saveComments(storageNamespace, postId, next);
    };

    const roots = useMemo(
        () =>
            sortItems(
                items.filter((c) => !c.parentId),
                sort,
            ),
        [items, sort],
    );

    if (!mounted) return <CommentsSkeleton />;

    return (
        <section
            aria-labelledby="comments-title"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
            {/* Header */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-cyan-600" />
                    <h2 id="comments-title" className="text-lg font-semibold text-slate-900">
                        Comments {postTitle ? <span className="text-slate-500">• {postTitle}</span> : null}
                    </h2>
                    <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        {items.length}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-slate-600">Sort</label>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortKey)}
                        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="top">Top</option>
                    </select>

                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                        title={expanded ? "Collapse all" : "Expand all"}
                    >
                        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        {expanded ? "Collapse" : "Expand"}
                    </button>
                </div>
            </div>

            {/* New root comment */}
            <CommentForm
                placeholder="Write a constructive comment…"
                onSubmit={(payload) => {
                    const c: CommentItem = {
                        id: uid(),
                        parentId: null,
                        author: { name: payload.name.trim(), email: payload.email?.trim() || undefined },
                        body: payload.body.trim(),
                        createdAt: now(),
                        likes: 0,
                    };
                    persist([c, ...items]);
                }}
            />

            {/* List */}
            <div className="mt-5 space-y-4">
                {roots.length === 0 ? (
                    <p className="text-sm text-slate-500">Be the first to start the conversation.</p>
                ) : (
                    roots.map((c) => (
                        <CommentNode
                            key={c.id}
                            item={c}
                            all={items}
                            persist={persist}
                            sort={sort}
                            depth={0}
                            maxDepth={maxDepth}
                            expanded={expanded}
                        />
                    ))
                )}
            </div>
        </section>
    );
}

/* ============ Node (recursive) ============ */
function CommentNode({
    item,
    all,
    persist,
    sort,
    depth,
    maxDepth,
    expanded,
}: {
    item: CommentItem;
    all: CommentItem[];
    persist: (next: CommentItem[]) => void;
    sort: SortKey;
    depth: number;
    maxDepth: number;
    expanded: boolean;
}) {
    const replies = useMemo(
        () =>
            sortItems(
                all.filter((c) => c.parentId === item.id),
                sort,
            ),
        [all, item.id, sort],
    );
    const [replying, setReplying] = useState(false);

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <header className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar name={item.author.name} />
                    <div>
                        <div className="text-sm font-medium text-slate-800">{item.author.name}</div>
                        <div className="text-xs text-slate-500">{fmtDate(item.createdAt)}</div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            const next = all.map((c) => (c.id === item.id ? { ...c, likes: c.likes + 1 } : c));
                            persist(next);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                        title="Like"
                    >
                        <Heart className="h-4 w-4" />
                        {item.likes}
                    </button>

                    <button
                        onClick={() => setReplying((v) => !v)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                        title="Reply"
                    >
                        <Reply className="h-4 w-4" />
                        Reply
                    </button>

                    <button
                        onClick={() => {
                            // demo: delete comment + its direct children
                            const next = all.filter((c) => c.id !== item.id && c.parentId !== item.id);
                            persist(next);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50"
                        title="Delete (demo)"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </header>

            <div className="mt-2 text-[15px] leading-relaxed whitespace-pre-wrap text-slate-800">{item.body}</div>

            {/* Reply form */}
            {replying && depth < maxDepth && (
                <div className="mt-3">
                    <CommentForm
                        placeholder={`Reply to ${item.author.name}…`}
                        onCancel={() => setReplying(false)}
                        onSubmit={(payload) => {
                            const child: CommentItem = {
                                id: uid(),
                                parentId: item.id,
                                author: { name: payload.name.trim(), email: payload.email?.trim() || undefined },
                                body: payload.body.trim(),
                                createdAt: now(),
                                likes: 0,
                            };
                            persist([child, ...all]);
                            setReplying(false);
                        }}
                    />
                </div>
            )}

            {/* Children */}
            {expanded && replies.length > 0 && depth < maxDepth && (
                <div className="mt-4 space-y-4 border-l-2 border-slate-100 pl-4">
                    {replies.map((r) => (
                        <CommentNode
                            key={r.id}
                            item={r}
                            all={all}
                            persist={persist}
                            sort={sort}
                            depth={depth + 1}
                            maxDepth={maxDepth}
                            expanded={expanded}
                        />
                    ))}
                </div>
            )}
        </article>
    );
}

/* ============ Small pieces ============ */
function Avatar({ name }: { name: string }) {
    const initials = name
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    return (
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-xs font-bold text-white shadow">
            {initials}
        </div>
    );
}

function CommentForm({
    onSubmit,
    onCancel,
    placeholder,
}: {
    onSubmit: (v: { name: string; email?: string; body: string }) => void;
    onCancel?: () => void;
    placeholder?: string;
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");
    const [count, setCount] = useState(0);
    const MAX = 1000;

    useEffect(() => setCount(body.length), [body]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (!name.trim() || !body.trim()) return;
                onSubmit({ name, email, body });
                setBody("");
            }}
            className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
        >
            <div className="grid gap-3 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">Name *</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your name"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-300"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">Email (optional)</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        type="email"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-300"
                    />
                </div>
            </div>

            <div className="mt-3">
                <label className="mb-1 block text-xs font-medium text-slate-600">Comment *</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value.slice(0, MAX))}
                    required
                    rows={4}
                    placeholder={placeholder || "Write your comment…"}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-300"
                />
                <div className="mt-1 flex items-center justify-between text-xs">
                    <span className={count >= MAX ? "text-red-600" : "text-slate-500"}>
                        {count}/{MAX}
                    </span>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-lg px-2 py-1 text-slate-600 hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-3">
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-cyan-500"
                >
                    <Send className="h-4 w-4" />
                    Post comment
                </button>
            </div>
        </form>
    );
}
