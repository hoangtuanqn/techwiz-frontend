// app/blog/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark,
  Tag as TagIcon,
  User as UserIcon,
} from "lucide-react";

/* =========================================================
   Types & Demo Seed
========================================================= */
type Post = {
  id: number;
  title: string;
  category: "Technical" | "Cultural" | "Business" | "Design";
  desc: string;
  image: string;
  date: string;
  read: number; // minutes
  tags: string[];
};

const TAG_POOL = [
  "Hackathon",
  "Robotics",
  "AI",
  "Design",
  "Startup",
  "Marketing",
  "Culture",
  "Sports",
] as const;

function getAllPosts(): Post[] {
  return Array.from({ length: 60 }).map((_, i) => {
    const category = (["Technical", "Cultural", "Business", "Design"][
      i % 4
    ] ?? "Technical") as Post["category"];
    const title = [
      "How to Win Your First Hackathon",
      "Top 5 Cultural Nights You Can’t Miss",
      "The Future of Business Startups",
      "Robotics 101: Getting Started",
      "Design Systems for Campus Apps",
    ][i % 5];
    const shuffled = [...TAG_POOL].sort(() => Math.random() - 0.5);
    const tags = shuffled.slice(0, 2 + (i % 2)) as unknown as string[];

    return {
      id: i + 1,
      title,
      category,
      desc: "A short preview of the article that highlights key takeaways and sparks curiosity to read more.",
      image: `https://picsum.photos/seed/blog-${i}/1200/700`,
      date: new Date(2025, i % 12, (i % 28) + 1).toISOString().slice(0, 10),
      read: [4, 6, 7, 5, 8][i % 5],
      tags,
    };
  });
}

/* =========================================================
   Static Generation
========================================================= */
export async function generateStaticParams() {
  return getAllPosts()
    .slice(0, 50)
    .map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const post = getAllPosts().find((p) => p.id === id);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} • EventSphere Blog`,
    description: post.desc,
    openGraph: {
      title: post.title,
      description: post.desc,
      images: [{ url: post.image }],
      type: "article",
    },
  };
}

/* =========================================================
   Helpers
========================================================= */
function getPostById(id: number) {
  return getAllPosts().find((p) => p.id === id);
}

function getPrevNextIds(id: number, total: number) {
  const prev = id > 1 ? id - 1 : null;
  const next = id < total ? id + 1 : null;
  return { prev, next };
}

function getRelatedPosts(current: Post, limit = 3): Post[] {
  const all = getAllPosts();
  const sameCategory = all
    .filter((p) => p.category === current.category && p.id !== current.id)
    .slice(0, limit);

  if (sameCategory.length >= limit) return sameCategory;
  const others = all.filter((p) => p.id !== current.id);
  return [...sameCategory, ...others].slice(0, limit);
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

/* =========================================================
   Page
========================================================= */
export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const post = getPostById(id);
  if (!post) notFound();

  const total = getAllPosts().length;
  const { prev, next } = getPrevNextIds(id, total);
  const related = getRelatedPosts(post!, 3);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://eventsphere.local";
  const shareUrl = encodeURIComponent(`${baseUrl}/blog/${id}`);
  const shareText = encodeURIComponent(post!.title);

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white text-slate-800">
      {/* Top Nav / Breadcrumb */}
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <nav className="text-sm text-slate-600">
          <Link href="/blog" className="hover:text-cyan-600">
            Blog
          </Link>{" "}
          /{" "}
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs text-slate-700 ring-1 ring-slate-200">
            <TagIcon className="h-3 w-3" />
            {post!.category}
          </span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative mx-auto mt-4 max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
          <img
            src={post!.image}
            alt={post!.title}
            className="h-[380px] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm md:text-4xl">
              {post!.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <span className="inline-flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                {formatDate(post!.date)}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" />~ {post!.read} min read
              </span>

              {/* Tags */}
              <div className="ml-1 flex flex-wrap gap-2">
                {post!.tags.map((tg) => (
                  <span
                    key={tg}
                    className="rounded-lg bg-white/20 px-2 py-0.5 text-xs backdrop-blur ring-1 ring-white/30"
                  >
                    #{tg}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="mx-auto max-w-3xl px-4">
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Share2 className="h-4 w-4" />
              Share
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
              href={`mailto:?subject=${shareText}&body=${shareUrl}`}
            >
              Email
            </a>
          </div>

          <button
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
            aria-label="Bookmark"
          >
            <Bookmark className="h-4 w-4" />
            Bookmark
          </button>
        </div>
      </div>

      {/* Article */}
      <article className="prose prose-slate mx-auto mt-8 max-w-3xl px-4">
        <p className="lead">{post!.desc}</p>

        <h2>Introduction</h2>
        <p>
          This is a sample detail body. In production, render content from your
          CMS/Markdown/HTML (Laravel API).
        </p>

        <h2>Key Takeaways</h2>
        <ul>
          <li>Point one</li>
          <li>Point two</li>
          <li>Point three</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          Summarize the main ideas and suggest what readers can try next on
          campus or in your event platform.
        </p>
      </article>

      {/* Author */}
      <section className="mx-auto mt-10 max-w-3xl px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white shadow">
              <UserIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">EventSphere Team</h3>
              <p className="text-sm text-slate-600">
                We write about campus events, product design, and student life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="mx-auto mt-10 max-w-5xl px-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Previous
            </div>
            {prev ? (
              <Link
                href={`/blog/${prev}`}
                className="mt-1 flex items-center gap-2 text-slate-800 hover:text-cyan-600"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="line-clamp-1">
                  {getPostById(prev)?.title ?? `Post #${prev}`}
                </span>
              </Link>
            ) : (
              <div className="mt-1 text-slate-400">—</div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-right">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Next
            </div>
            {next ? (
              <Link
                href={`/blog/${next}`}
                className="mt-1 ml-auto inline-flex items-center gap-2 text-slate-800 hover:text-cyan-600"
              >
                <span className="line-clamp-1">
                  {getPostById(next)?.title ?? `Post #${next}`}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="mt-1 text-slate-400">—</div>
            )}
          </div>
        </div>
      </section>

      {/* Related posts */}
      <section className="mx-auto mt-10 max-w-5xl px-4 pb-16">
        <h3 className="mb-4 text-lg font-semibold tracking-tight text-slate-900">
          Related posts
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.id}
              href={`/blog/${r.id}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={r.image}
                alt={r.title}
                className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-4">
                <div className="mb-1 text-xs text-slate-500">
                  {r.category} • {formatDate(r.date)}
                </div>
                <h4 className="line-clamp-2 font-semibold text-slate-800 group-hover:text-cyan-600">
                  {r.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link href="/blog" className="text-cyan-600 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </section>
    </main>
  );
}
