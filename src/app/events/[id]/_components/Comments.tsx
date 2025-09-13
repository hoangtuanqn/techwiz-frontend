"use client";

import React, { useMemo, useState } from "react";
import { MessageSquare, Send, Trash2, Reply, ChevronDown, ChevronUp, User as UserIcon } from "lucide-react";

/** ===== Types ===== */
type User = { id: string; name: string; avatarUrl?: string };
type Comment = {
  id: string;
  eventId: string | number;
  user: User;
  content: string;
  createdAt: string; // ISO
  parentId?: string | null;
  children?: Comment[];
};

/** ===== Demo seed (fake DB) ===== */
const DEMO_USERS: User[] = [
  { id: "u1", name: "Minh Nguyen" },
  { id: "u2", name: "Lan Tran" },
  { id: "u3", name: "Thao Vo" },
];

const NOW = Date.now();
const isoAgo = (ms: number) => new Date(NOW - ms).toISOString();

function seedComments(eventId: string | number): Comment[] {
  return [
    {
      id: "c1",
      eventId,
      user: DEMO_USERS[0],
      content: "Looking forward to this workshop! Do you have slides to share later?",
      createdAt: isoAgo(1000 * 60 * 60 * 3),
      parentId: null,
      children: [
        {
          id: "c1_1",
          eventId,
          user: DEMO_USERS[1],
          content: "There is usually a summary link at the end of the event.",
          createdAt: isoAgo(1000 * 60 * 60 * 2 + 1000 * 60 * 5),
          parentId: "c1",
        },
      ],
    },
    {
      id: "c2",
      eventId,
      user: DEMO_USERS[2],
      content: "Do I need to bring a laptop?",
      createdAt: isoAgo(1000 * 60 * 50),
      parentId: null,
      children: [],
    },
  ];
}

/** ===== Utils ===== */
const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

// Simple id generator for demo
let COUNTER = 1000;
const genId = () => `c${COUNTER++}`;

/** ===== Component ===== */
export default function Comments({
  eventId,
  currentUser = { id: "you", name: "You" },
  title = "Comments",
}: {
  eventId: string | number;
  currentUser?: User; // demo: gán "You"
  title?: string;
}) {
  const [comments, setComments] = useState<Comment[]>(() => seedComments(eventId));
  const [expandAll, setExpandAll] = useState(true); // toggle replies
  const [newContent, setNewContent] = useState("");
  const maxLen = 2000;

  const count = useMemo(
    () => comments.reduce((acc, c) => acc + 1 + (c.children?.length || 0), 0),
    [comments]
  );

  const addComment = (content: string, parentId?: string | null) => {
    const text = content.trim();
    if (!text) return;

    const item: Comment = {
      id: genId(),
      eventId,
      user: currentUser,
      content: text,
      createdAt: new Date().toISOString(),
      parentId: parentId ?? null,
      children: [],
    };

    setComments((prev) => {
      if (!parentId) return [item, ...prev];
      // add as child of parent
      return prev.map((c) => {
        if (c.id === parentId) {
          const kids = c.children ? [item, ...c.children] : [item];
          return { ...c, children: kids };
        }
        return c;
      });
    });
  };

  const removeComment = (id: string) => {
    setComments((prev) =>
      prev
        .filter((c) => c.id !== id) // remove if top-level
        .map((c) => ({
          ...c,
          children: c.children?.filter((k) => k.id !== id) || [], // also remove if child
        }))
    );
  };

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <MessageSquare className="h-5 w-5 text-cyan-600" />
          {title}
          <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{count}</span>
        </h3>
        <button
          type="button"
          onClick={() => setExpandAll((v) => !v)}
          className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-cyan-600"
        >
          {expandAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {expandAll ? "Collapse replies" : "Expand replies"}
        </button>
      </div>

      {/* New comment */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
        <div className="flex gap-3">
          <Avatar name={currentUser.name} />
          <div className="flex-1">
            <textarea
              rows={3}
              value={newContent}
              onChange={(e) => {
                const v = e.target.value.slice(0, maxLen);
                setNewContent(v);
              }}
              placeholder="Write a comment…"
              className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">{newContent.trim().length}/{maxLen}</span>
              <button
                type="button"
                onClick={() => {
                  if (!newContent.trim()) return;
                  addComment(newContent.trim(), null);
                  setNewContent("");
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
              >
                <Send className="h-4 w-4" /> Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <ul className="mt-6 space-y-4">
        {comments.map((c) => (
          <li key={c.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <CommentItem
              c={c}
              onReply={(content) => addComment(content, c.id)}
              onDelete={() => removeComment(c.id)}
              canDelete={c.user.id === currentUser.id || currentUser.name === "You"} // demo rule
            />

            {/* children */}
            {c.children && c.children.length > 0 && expandAll && (
              <ul className="mt-3 space-y-3 pl-10">
                {c.children.map((k) => (
                  <li key={k.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <CommentItem
                      c={k}
                      onReply={(content) => addComment(content, c.id)} // reply vào thread cha
                      onDelete={() => removeComment(k.id)}
                      canDelete={k.user.id === currentUser.id || currentUser.name === "You"}
                      compact
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommentItem({
  c,
  onReply,
  onDelete,
  canDelete,
  compact = false,
}: {
  c: Comment;
  onReply: (content: string) => void;
  onDelete: () => void;
  canDelete: boolean;
  compact?: boolean;
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  return (
    <div className="flex gap-3">
      <Avatar name={c.user.name} />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-slate-800">{c.user.name}</span>
          <span className="text-xs text-slate-500">{timeAgo(c.createdAt)}</span>
        </div>
        <p className={`mt-1 whitespace-pre-line text-slate-700 ${compact ? "text-sm" : ""}`}>{c.content}</p>

        <div className="mt-2 flex items-center gap-3 text-sm">
          <button
            type="button"
            onClick={() => setShowReply((v) => !v)}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-cyan-600"
          >
            <Reply className="h-4 w-4" /> Reply
          </button>

          {canDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          )}
        </div>

        {showReply && (
          <div className="mt-3 flex items-start gap-2">
            <textarea
              rows={2}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply…"
              className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
            />
            <button
              type="button"
              onClick={() => {
                if (!replyContent.trim()) return;
                onReply(replyContent.trim());
                setReplyContent("");
                setShowReply(false);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-3 py-2 text-xs font-medium text-white hover:bg-cyan-700"
            >
              <Send className="h-4 w-4" /> Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const text = initials(name);
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cyan-100 text-cyan-700 ring-1 ring-cyan-200">
      <UserIcon className="mr-1 hidden h-4 w-4 opacity-60" />
      <span className="text-sm font-semibold">{text}</span>
    </div>
  );
}
