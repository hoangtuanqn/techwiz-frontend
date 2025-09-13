// app/blog/[id]/_components/BlogDetailPage.tsx
"use client";

import Link from "next/link";
import {
    Calendar as CalendarIcon,
    Clock,
    ArrowLeft,
    ArrowRight,
    Share2,
    Tag as TagIcon,
    User as UserIcon,
} from "lucide-react";

import CommentsSection from "./CommentsSection";

type Post = {
    id: number;
    title: string;
    category: "Technical" | "Cultural" | "Business" | "Design";
    hero: string;
    date: string;
    read: number;
    tags: string[];
    excerpt: string;
    content?: {
        heroCaption?: string;
        sections: Array<{ heading: string; paragraphs: string[] }>;
        takeaways?: string[];
    };
};

function makePosts(): Post[] {
    const rich: Post = {
        id: 1,
        title: "From Dusk to Dawn: How Our Campus Hackathon Ignited Innovation",
        category: "Technical",
        hero: "https://picsum.photos/seed/hackathon-hero/1600/900",
        date: "2025-03-30",
        read: 8,
        tags: ["Hackathon", "Innovation", "Student Life"],
        excerpt:
            "Inside a 24-hour sprint where students from every discipline turned ideas into working prototypes—and friendships that last.",
        content: {
            heroCaption: "Teams fill the hall with laptops and big ideas as the 24-hour hackathon kicks off.",
            sections: [
                {
                    heading: "Setting the Stage: A Campus Unites for Creativity",
                    paragraphs: [
                        "Weeks of preparation led to a single brief: build something useful for students in 24 hours. Sponsors finalized challenge prompts around sustainability, campus life, and community outreach; mentors signed up for two-hour support blocks; organizers published a code of conduct and a lightweight judging rubric so teams knew what ‘good’ looked like before the clock started.",
                        "Kickoff began at 6:00 PM with a short keynote from the Dean: “Innovation happens when perspectives collide.” After a safety note and Wi-Fi details, teams formed around problem statements rather than tech stacks. Art majors mapped flows, CS students sketched system boundaries, business students drafted value props, and communications students designed the story arc for the demo.",
                        "Logistics were intentional. Everyone received a repo template with CI preconfigured, a shared asset folder, an API sandbox key, and a list of public datasets. Whiteboards and sticky notes lined the walls; loaner laptops, microcontrollers, and sensors were checked out at the hardware bar. A help desk Slack channel connected participants to mentors and organizers for quick escalations.",
                        "The rules were simple: ship a working prototype by sunrise, respect the venue, and keep scope small. Teams were encouraged to choose one core user journey and make that journey delightful end-to-end. Accessibility and performance were called out explicitly—no points for features that only run on the organizer’s laptop.",
                        "By 7:30 PM the floor hummed. Some groups gravitated to Figma to finalize flows, others spiked on APIs to de-risk dependencies, and a few hardware teams ran smoke tests on motors and sensors. The energy was high but focused: everyone understood that decisions made in the next two hours would determine whether they demoed with confidence or fought fires at dawn.",
                    ],
                },
                {
                    heading: "Through the Night: Challenges, Caffeine, and Collaboration",
                    paragraphs: [
                        "By midnight, the buzz settled into rhythm: short stand-ups every 90 minutes, commits landing every few minutes, and a growing backlog of ‘nice-to-haves’ parked for later. One hardware team’s drone refused to arm due to a calibration issue; another team’s database migration corrupted a table, forcing a rollback and a clean seed. Each setback taught the same lesson—simplify the plan, protect the demo path.",
                        "Mentor drop-ins were catalytic. A data mentor suggested caching API responses to avoid rate limits; a design mentor reduced a five-step onboarding to two screens; a product mentor reframed the pitch from features to outcomes. The best teams wrote decisions down—what we tried, what failed, what we’re doing next—so they could move fast without looping.",
                        "Health breaks were mandatory, not optional. Organizers rolled out a 2:00 AM stretch session and a hydration station; a quiet room stayed device-free for power naps. Snack drops arrived on the half-hour: fruit, sandwiches, and, yes, caffeine—tempered with reminders that a clear head ships better code than a sixth espresso.",
                        "Collaboration crossed team boundaries. People lent USB-C chargers, shared OSS snippets, and swapped tips on camera permissions and cross-origin policies. A backend engineer from one team helped another fix a gnarly auth bug; in return, they received help polishing a demo script. The room felt less like a competition and more like a studio.",
                        "By 4:30 AM, feature flags fenced off risky ideas, and the ‘golden path’ demo was rehearsed. Teams wrote a one-page readme with setup steps, seeded data, and known limitations. Final commits tagged a deployable release; videos and screenshots backed up live demos in case Wi-Fi hiccuped. The sunrise didn’t bring panic. It brought relief.",
                    ],
                },
                {
                    heading: "Sunrise Showcase: From Prototypes to Impact",
                    paragraphs: [
                        "At 8:00 AM the lecture hall filled with students, faculty, and sponsors. Each team had three minutes to demo and two minutes for Q&A—no slides unless they told the story faster than the product could. The judging rubric balanced Impact (30%), UX (25%), Technical Depth (25%), Feasibility (10%), and Storytelling (10%).",
                        "Highlights came fast. The Study Buddy app showed live library seat availability using simple beacons and a clever confidence score; the recycling sensor reported bin fullness and contamination flags with a tiny on-device model; an AR treasure hunt turned wayfinding into a game for first-years. Demos focused on the moment that mattered—tap, scan, result—no detours.",
                        "Q&A rewarded honesty. Teams owned their tradeoffs and articulated next steps: replace the mock with a real endpoint, swap the cron job for webhooks, add keyboard shortcuts and color contrast fixes. Judges cared less about perfection and more about learning velocity and clarity of thought.",
                        "Awards reflected the diversity of approaches: Best Overall went to the recycling sensor for measurable impact and a thoughtful privacy stance; Rookie Award to Study Buddy for crisp UX and a path to pilot; Best Storytelling to the AR team for making the audience smile and then think. Trophies were nice, but the email addresses exchanged afterward mattered more.",
                        "What lingered after the photos wasn’t just code. It was confidence, community, and a roadmap. Repos went public with permissive licenses; a sponsor offered cloud credits for three projects; the makerspace scheduled a follow-up build night. People arrived as classmates and left as collaborators.",
                        "The final slide read: ship small, learn loud, help each other. The room emptied slowly—whiteboards full of sketches, tables dotted with name tags and coffee cups. Outside, the campus felt different, not because the buildings had changed, but because a few hundred people now believed they could.",
                    ],
                },
            ],

            takeaways: [
                "Teamwork beats individual genius—especially under pressure.",
                "Constraints fuel creativity; ship fast, learn faster.",
                "Cross-disciplinary teams build more thoughtful solutions.",
                "Winning is optional; learning is the real prize.",
                "Community makes hard things possible.",
            ],
        },
    };

    const others: Post[] = Array.from({ length: 20 }).map((_, i) => {
        const id = i + 2;
        const cats = ["Technical", "Cultural", "Business", "Design"] as const;
        const cat = cats[i % cats.length];
        return {
            id,
            title: [
                "Top Cultural Nights",
                "Zero-to-One Campus Startups",
                "Design Systems 101",
                "Robotics: First Steps",
            ][i % 4],
            category: cat,
            hero: `https://picsum.photos/seed/post-${id}/1400/800`,
            date: new Date(2025, (i + 1) % 12, ((i + 3) % 28) + 1).toISOString().slice(0, 10),
            read: [5, 6, 7, 8][i % 4],
            tags: ["Campus", "Events", "Students"].slice(0, 2),
            excerpt: "A practical guide with highlights, resources, and hands-on tips students can use right away.",
        };
    });

    return [rich, ...others];
}

function getAllPosts(): Post[] {
    return makePosts();
}

function getPostById(id: number) {
    return getAllPosts().find((p) => p.id === id);
}

function getPrevNextIds(id: number, total: number) {
    return { prev: id > 1 ? id - 1 : null, next: id < total ? id + 1 : null };
}

function getRelated(current: Post, limit = 3) {
    const all = getAllPosts();
    const same = all.filter((p) => p.category === current.category && p.id !== current.id).slice(0, limit);
    if (same.length >= limit) return same;
    return [...same, ...all.filter((p) => p.id !== current.id)].slice(0, limit);
}

function formatDate(iso: string) {
    try {
        return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    } catch {
        return iso;
    }
}

export default function BlogDetailPage({ id }: { id: string }) {
    const num = Number(id);
    const post = getPostById(num);

    if (!post) {
        return (
            <main className="max-w mx-auto px-4 py-20 text-center text-slate-600">
                <h1 className="text-2xl font-semibold">Post not found</h1>
                <p className="mt-2">The article you’re looking for doesn’t exist in this demo.</p>
                <Link href="/blog" className="mt-6 inline-block text-cyan-600 hover:underline">
                    ← Back to Blog
                </Link>
            </main>
        );
    }

    const total = getAllPosts().length;
    const { prev, next } = getPrevNextIds(num, total);
    const related = getRelated(post, 3);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://eventsphere.local";
    const shareUrl = encodeURIComponent(`${baseUrl}/blog/${id}`);
    const shareText = encodeURIComponent(post.title);
    const c = post.content;

    return (
        <main className="bg-gradient-to-b text-slate-800">
            {/* back to blog */}
            <div className="mx-auto mt-4 mt-8 max-w-5xl px-4">
                <Link href="/blog" className="text-cyan-600 hover:underline">
                    ← Back to Blog
                </Link>
            </div>
            {/* Hero */}
            <section className="relative mx-auto mt-4 max-w-5xl px-4">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
                    <img src={post.hero} alt={post.title} className="h-[380px] w-full object-cover" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
                    <div className="absolute right-0 bottom-0 left-0 p-6">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm md:text-4xl">
                            {post.title}
                        </h1>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/90">
                            <span className="inline-flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                {formatDate(post.date)}
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                                <Clock className="h-4 w-4" />~ {post.read} min read
                            </span>
                            <div className="ml-1 flex flex-wrap gap-2">
                                {post.tags.map((tg) => (
                                    <span
                                        key={tg}
                                        className="rounded-lg bg-white/20 px-2 py-0.5 text-xs ring-1 ring-white/30 backdrop-blur"
                                    >
                                        #{tg}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {c?.heroCaption && <p className="mt-3 text-center text-sm text-slate-500">{c.heroCaption}</p>}
            </section>

            {/* Actions */}
            <div className="mx-auto max-w-5xl px-4">
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <a
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Share2 className="h-4 w-4" /> Share
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
                </div>
            </div>

            {/* Article */}
            <article className="prose prose-slate mx-auto mt-8 max-w-5xl px-4">
                <p className="lead">{post.excerpt}</p>

                {c ? (
                    <>
                        {c.sections.map((sec, i) => (
                            <section key={i}>
                                <h2>{sec.heading}</h2>
                                {sec.paragraphs.map((p, j) => (
                                    <p key={j}>{p}</p>
                                ))}
                            </section>
                        ))}

                        {c.takeaways && (
                            <>
                                <h2>Key Takeaways</h2>
                                <ul>
                                    {c.takeaways.map((t, i) => (
                                        <li key={i}>{t}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <h2>Overview</h2>
                        <p>
                            This is a sample detail body. Replace with content from your CMS/Markdown/HTML (Laravel
                            API).
                        </p>
                    </>
                )}
            </article>

            {/* Author */}
            <section className="mx-auto mt-10 max-w-5xl px-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white shadow">
                            <UserIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">EventSphere Team</h3>
                            <p className="text-sm text-slate-600">
                                We write about campus events, design, and student life.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comment */}
            <section className="mx-auto mt-12 max-w-5xl px-4">
                <CommentsSection postId={id} postTitle={post!.title} storageNamespace="blog" />
            </section>

            {/* Prev / Next */}
            <section className="mx-auto mt-10 max-w-5xl px-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="text-xs tracking-wide text-slate-500 uppercase">Previous</div>
                        {getPrevNextIds(num, getAllPosts().length).prev ? (
                            <Link
                                href={`/blog/${num - 1}`}
                                className="mt-1 flex items-center gap-2 text-slate-800 hover:text-cyan-600"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span className="line-clamp-1">
                                    {getPostById(num - 1)?.title ?? `Post #${num - 1}`}
                                </span>
                            </Link>
                        ) : (
                            <div className="mt-1 text-slate-400">—</div>
                        )}
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-right shadow-sm">
                        <div className="text-xs tracking-wide text-slate-500 uppercase">Next</div>
                        {getPrevNextIds(num, getAllPosts().length).next ? (
                            <Link
                                href={`/blog/${num + 1}`}
                                className="mt-1 ml-auto inline-flex items-center gap-2 text-slate-800 hover:text-cyan-600"
                            >
                                <span className="line-clamp-1">
                                    {getPostById(num + 1)?.title ?? `Post #${num + 1}`}
                                </span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        ) : (
                            <div className="mt-1 text-slate-400">—</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Related */}
            <section className="mx-auto mt-10 max-w-5xl px-4 pb-16">
                <h3 className="mb-4 text-lg font-semibold tracking-tight text-slate-900">Related posts</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {related.map((r) => (
                        <Link
                            key={r.id}
                            href={`/blog/${r.id}`}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <img
                                src={r.hero}
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
            </section>
        </main>
    );
}
