"use client";

import React, { useMemo, useState } from "react";
import { Search, ThumbsUp, Paperclip } from "lucide-react";

/* ============== Types ============== */
type Message = {
  id: string;
  text: string;
  createdAt: string; // ISO
  author: { name: string; avatar: string; role?: string };
  reactions: number;
  replies: number;
  attachments?: number;
  pinned?: boolean;
};

/* ====== Demo seed (in-file only) ====== */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(0xC011AB);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rng() * arr.length)];
const rand = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min;
const pad2 = (n: number) => String(n).padStart(2, "0");
const fmtDateTime = (iso: string) => {
  const d = new Date(iso);
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
};

const AUTHORS = [
  { name: "Nam Nguyen", avatar: "https://i.pravatar.cc/80?img=12", role: "Organizer" },
  { name: "Minh Pham", avatar: "https://i.pravatar.cc/80?img=16", role: "Admin" },
  { name: "Linh Tran", avatar: "https://i.pravatar.cc/80?img=32", role: "Member" },
  { name: "Khoa Le", avatar: "https://i.pravatar.cc/80?img=25", role: "Member" },
];

function seedMessages(): Message[] {
  const templates = [
    "Có ai biết cách tối ưu truy vấn MySQL cho bảng registrations không?",
    "Mình có file thiết kế badge QR, ai cần thì mình share.",
    "Thông báo: chiều nay hệ thống bảo trì 30 phút.",
    "Check-in realtime chạy ổn rồi nhé, dùng WebSocket là xong.",
    "Tối mai có meetup nho nhỏ ở phòng Lab 2, ai rảnh join nhé.",
    "Có mẹo nào để build Next.js giảm thời gian từ 120s xuống 60s?",
    "Laravel 12 + PHP 8.2 deploy cPanel ok, mình viết hướng dẫn ngắn.",
    "Gợi ý giao diện trang report: card KPI + bảng lịch sử là đủ dùng",
  ] as const;

  const now = new Date();
  const messages: Message[] = [];
  for (let i = 0; i < 30; i++) { // <-- 30 tin nhắn
    const minsAgo = rand(10, 60 * 24 * 10);
    const d = new Date(now.getTime() - minsAgo * 60 * 1000);
    const author = pick(AUTHORS);
    messages.push({
      id: `MSG-${1000 + i}`,
      text: pick(templates),
      createdAt: d.toISOString(),
      author,
      reactions: rand(0, 20),
      replies: rand(0, 12),
      attachments: rng() < 0.25 ? rand(1, 3) : 0,
      pinned: rng() < 0.12,
    });
  }
  // Pinned (nếu có) đưa lên trước, sau đó mới theo thời gian
  return messages
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));
}

/* ============== Component ============== */
export default function CommunityMessagesMinimal() {
  const data = useMemo(seedMessages, []);

  const [q, setQ] = useState("");
  const [visible, setVisible] = useState(10); // <-- hiển thị 10 tin đầu

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return data.filter((m) => {
      const match =
        !t ||
        m.text.toLowerCase().includes(t) ||
        m.author.name.toLowerCase().includes(t) ||
        (m.author.role?.toLowerCase() || "").includes(t);
      const allowRole = ["admin", "organizer"].includes((m.author.role || "").toLowerCase());
      return match && allowRole;
    });
  }, [data, q]);

  // Mỗi lần tìm kiếm thay đổi thì reset về 10 tin
  React.useEffect(() => setVisible(10), [q]);

  const showing = filtered.slice(0, visible);
  const canShowMore = visible < filtered.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-xl font-extrabold">Cộng đồng · Tin nhắn</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm tin nhắn hoặc tác giả…"
                className="w-64 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200/60"
              />
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-600">
              Chỉ Admin & Organizer được gửi tin • Tắt phản hồi
            </span>
          </div>
        </header>

        {/* Message list */}
        <section className="space-y-3">
          {showing.map((m) => (
            <article key={m.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <img src={m.author.avatar} alt={m.author.name} className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{m.author.name}</div>
                    <div className="text-xs text-slate-500">
                      {fmtDateTime(m.createdAt)}{m.author.role ? ` • ${m.author.role}` : ""}
                    </div>
                  </div>
                </div>
              </div>

              <div className="whitespace-pre-wrap text-[15px] leading-6 text-slate-800">{m.text}</div>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-slate-400" /> {m.reactions}
                </span>
                {!!m.attachments && m.attachments > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <Paperclip className="h-4 w-4 text-slate-400" /> {m.attachments}
                  </span>
                )}
              </div>
            </article>
          ))}

          {!showing.length && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Không có tin nhắn phù hợp bộ lọc.
            </div>
          )}

          {canShowMore && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setVisible((v) => Math.min(v + 10, filtered.length))}
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Xem thêm 10 tin
              </button>
              <div className="mt-1 text-xs text-slate-500">
                Đang hiển thị {showing.length}/{filtered.length}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
