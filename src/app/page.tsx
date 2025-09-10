// app/(whatever)/Home.tsx
import {
    Search,
    Rocket,
    ScanLine,
    Users,
    BadgeCheck,
    ArrowRight,
    Eye,
    IdCard,
    ClipboardList,
    ShieldCheck,
    Calendar,
    CheckCircle2,
    Timer,
    Ticket,
    Send,
    LogIn,
    UserPlus,
} from "lucide-react";
import Footer from "~/components/layout/Footer";
import Header from "~/components/layout/Header";

export default function Home() {
    return (
        <>
            <section id="home" className="relative">
                <div className="absolute inset-0">
                    <img
                        className="h-[560px] w-full object-cover"
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1974&auto=format&fit=crop"
                        alt="Students on campus"
                    />
                    <div className="absolute inset-0 bg-slate-900/55" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="pt-24 pb-16 text-center text-white md:pt-28 md:pb-24">
                        <h1 className="text-3xl leading-tight font-semibold md:text-5xl">
                            Discover, Register &amp; Attend University Events
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-white/90">
                            Explore <span className="font-semibold">500+</span> activities. Get real-time updates, check
                            in via QR, and download digital certificates.
                        </p>

                        {/* Faceted Search */}
                        <form
                            id="searchForm"
                            className="glass shadow-soft mx-auto mt-8 max-w-4xl rounded-2xl p-3 md:p-4"
                            aria-label="Search events"
                        >
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="keyword"
                                        name="keyword"
                                        type="text"
                                        placeholder="Keyword…"
                                        className="w-full rounded-xl border border-slate-200 py-3 pr-3 pl-10 focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <select
                                        id="category"
                                        name="category"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none"
                                    >
                                        <option value="">Category</option>
                                        <option>Technical</option>
                                        <option>Business</option>
                                        <option>Cultural</option>
                                        <option>Sports</option>
                                    </select>
                                </div>
                                <div>
                                    <select
                                        id="difficulty"
                                        name="difficulty"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none"
                                    >
                                        <option value="">Difficulty</option>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#06b6d4] px-5 py-3 text-white hover:opacity-90">
                                    <Search className="h-4 w-4" /> Search
                                </button>
                            </div>
                            <p id="searchHint" className="sr-only">
                                Use keyword, category and difficulty to filter events.
                            </p>
                        </form>

                        <a
                            href="#apply"
                            className="shadow-soft mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-slate-900 hover:opacity-90"
                        >
                            <Rocket className="h-5 w-5" /> Get Started
                        </a>
                    </div>
                </div>
            </section>

            {/* ============== KEY FEATURES ============== */}
            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-2xl font-semibold md:text-3xl">
                        Built for a Complete Event Lifecycle
                    </h2>
                    <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
                        Plan, publish, register, attend, collect feedback, and issue certificates — all in one place.
                    </p>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        <div className="shadow-soft rounded-2xl border border-slate-200 p-6">
                            <ScanLine className="h-8 w-8 text-[#06b6d4]" />
                            <h3 className="mt-4 text-lg font-semibold">QR Attendance</h3>
                            <p className="mt-2 text-slate-600">
                                Frictionless check-in with QR or manual verification, plus downloadable attendance
                                reports.
                            </p>
                        </div>
                        <div className="shadow-soft rounded-2xl border border-slate-200 p-6">
                            <Users className="h-8 w-8 text-[#06b6d4]" />
                            <h3 className="mt-4 text-lg font-semibold">Capacity &amp; Waitlist</h3>
                            <p className="mt-2 text-slate-600">
                                Real-time seats, auto-enforce limits, and promote waitlisted students when slots free
                                up.
                            </p>
                        </div>
                        <div className="shadow-soft rounded-2xl border border-slate-200 p-6">
                            <BadgeCheck className="h-8 w-8 text-[#06b6d4]" />
                            <h3 className="mt-4 text-lg font-semibold">Certificates</h3>
                            <p className="mt-2 text-slate-600">
                                Issue personalized digital certificates after successful attendance and eligibility.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============== ROLE HIGHLIGHTS ============== */}
            <section id="roles" className="bg-slate-50 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-semibold md:text-3xl">Who Is EventSphere For?</h2>
                        <a href="#" className="inline-flex items-center gap-1 text-[#06b6d4]">
                            Learn more <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                    <div className="mt-6 grid gap-6 lg:grid-cols-4">
                        <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6">
                            <div className="inline-flex items-center gap-2 text-slate-700">
                                <Eye className="h-5 w-5 text-[#06b6d4]" />
                                <span className="font-semibold">Guest</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">
                                Browse events, read details, filter by category/date, view media, and see featured
                                banners. Authentication required for actions.
                            </p>
                        </div>
                        <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6">
                            <div className="inline-flex items-center gap-2 text-slate-700">
                                <IdCard className="h-5 w-5 text-[#06b6d4]" />
                                <span className="font-semibold">Participant</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">
                                Register, receive reminders, cancel before deadline, check-in with QR, give feedback,
                                view history, save media, and download certificates.
                            </p>
                        </div>
                        <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6">
                            <div className="inline-flex items-center gap-2 text-slate-700">
                                <ClipboardList className="h-5 w-5 text-[#06b6d4]" />
                                <span className="font-semibold">Organizer</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">
                                Create/edit/schedule events (pending approval), manage registrations, scan attendance,
                                upload media, issue certificates, and notify registrants.
                            </p>
                        </div>
                        <div className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6">
                            <div className="inline-flex items-center gap-2 text-slate-700">
                                <ShieldCheck className="h-5 w-5 text-[#06b6d4]" />
                                <span className="font-semibold">Admin</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">
                                Approve/decline events, manage users/roles, moderate content, send announcements, and
                                export analytics (PDF/Excel).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============== CATEGORIES ============== */}
            <section id="categories" className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-semibold md:text-3xl">Featured Categories</h2>
                        <a href="#" className="inline-flex items-center gap-1 text-[#06b6d4]">
                            View all <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <a
                            className="group shadow-soft overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg"
                            href="#"
                        >
                            <img
                                className="h-36 w-full object-cover"
                                src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1470&auto=format&fit=crop"
                                alt="Technical"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold transition group-hover:text-[#06b6d4]">Technical</h3>
                                <p className="mt-1 text-sm text-slate-600">AI, Web, Mobile, Robotics</p>
                            </div>
                        </a>
                        <a
                            className="group shadow-soft overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg"
                            href="#"
                        >
                            <img
                                className="h-36 w-full object-cover"
                                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop"
                                alt="Business"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold transition group-hover:text-[#06b6d4]">Business</h3>
                                <p className="mt-1 text-sm text-slate-600">Startup, Marketing, Finance</p>
                            </div>
                        </a>
                        <a
                            className="group shadow-soft overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg"
                            href="#"
                        >
                            <img
                                className="h-36 w-full object-cover"
                                src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1470&auto=format&fit=crop"
                                alt="Cultural"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold transition group-hover:text-[#06b6d4]">Cultural</h3>
                                <p className="mt-1 text-sm text-slate-600">Music, Dance, Festival</p>
                            </div>
                        </a>
                        <a
                            className="group shadow-soft overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg"
                            href="#"
                        >
                            <img
                                className="h-36 w-full object-cover"
                                src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1470&auto=format&fit=crop"
                                alt="Sports"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold transition group-hover:text-[#06b6d4]">Sports</h3>
                                <p className="mt-1 text-sm text-slate-600">Football, Basketball, Run</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* ============== UPCOMING EVENTS ============== */}
            <section className="bg-slate-50 py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-semibold md:text-3xl">Upcoming Events</h2>
                        <a href="#" className="inline-flex items-center gap-1 text-[#06b6d4]">
                            Browse events <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Card 1 */}
                        <article className="shadow-soft overflow-hidden rounded-2xl border border-slate-200 bg-white">
                            <img
                                className="h-40 w-full object-cover"
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1470&auto=format&fit=crop"
                                alt="Hackathon"
                            />
                            <div className="p-5">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Calendar className="h-4 w-4" /> Sep 23 • 09:00 • Lab 1
                                </div>
                                <h3 className="mt-2 text-lg font-semibold">24h Hackathon — Build Something Real</h3>
                                <p className="mt-1 text-sm text-slate-600">
                                    Form a team, validate an idea, and ship a working prototype with mentors on site.
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1 text-sm text-emerald-600">
                                        <CheckCircle2 className="h-4 w-4" /> Seats Available
                                    </span>
                                    <a href="#" className="inline-flex items-center gap-1 text-[#06b6d4]">
                                        Register <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </article>
                        {/* Card 2 */}
                        <article className="shadow-soft overflow-hidden rounded-2xl border border-slate-200 bg-white">
                            <img
                                className="h-40 w-full object-cover"
                                src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1470&auto=format&fit=crop"
                                alt="Robotics workshop"
                            />
                            <div className="p-5">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Calendar className="h-4 w-4" /> Sep 25 • 15:00 • Auditorium
                                </div>
                                <h3 className="mt-2 text-lg font-semibold">Robotics Workshop — Hands-on Session</h3>
                                <p className="mt-1 text-sm text-slate-600">
                                    Get started with embedded systems, motor control and sensor fusion.
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1 text-sm text-amber-600">
                                        <Timer className="h-4 w-4" /> Filling fast
                                    </span>
                                    <a href="#" className="inline-flex items-center gap-1 text-[#06b6d4]">
                                        Register <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </article>
                        {/* Card 3 */}
                        <article className="shadow-soft overflow-hidden rounded-2xl border border-slate-200 bg-white">
                            <img
                                className="h-40 w-full object-cover"
                                src="https://images.unsplash.com/photo-1520975682031-a6b3800c9419?q=80&w=1470&auto=format&fit=crop"
                                alt="Cultural night"
                            />
                            <div className="p-5">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Calendar className="h-4 w-4" /> Sep 28 • 19:00 • Open Ground
                                </div>
                                <h3 className="mt-2 text-lg font-semibold">Cultural Night — Music &amp; Dance</h3>
                                <p className="mt-1 text-sm text-slate-600">
                                    Experience talents across campus with food stalls and fun corners.
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1 text-sm text-rose-600">
                                        <Ticket className="h-4 w-4" /> Free Entry
                                    </span>
                                    <a href="#" className="inline-flex items-center gap-1 text-[#06b6d4]">
                                        Details <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* ============== TRUST STATS ============== */}
            <section className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
                        <div className="rounded-2xl border border-slate-200 p-6">
                            <div className="text-3xl font-semibold md:text-4xl">500+</div>
                            <div className="mt-1 text-slate-500">Events</div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 p-6">
                            <div className="text-3xl font-semibold md:text-4xl">12k</div>
                            <div className="mt-1 text-slate-500">Participants</div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 p-6">
                            <div className="text-3xl font-semibold md:text-4xl">120</div>
                            <div className="mt-1 text-slate-500">Organizers</div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 p-6">
                            <div className="text-3xl font-semibold md:text-4xl">4.8/5</div>
                            <div className="mt-1 text-slate-500">Avg. Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============== TESTIMONIALS ============== */}
            <section className="bg-slate-50 py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-2xl font-semibold md:text-3xl">What Students Say</h2>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        <figure className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6">
                            <blockquote className="text-slate-700">
                                “Registration is fast, and calendar invites are one click.”
                            </blockquote>
                            <figcaption className="mt-4 flex items-center gap-3">
                                <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://randomuser.me/api/portraits/women/68.jpg"
                                    alt="Student"
                                />
                                <div>
                                    <div className="font-medium">Tram Anh</div>
                                    <div className="text-sm text-slate-500">Cohort 2025 • IT</div>
                                </div>
                            </figcaption>
                        </figure>
                        <figure className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6">
                            <blockquote className="text-slate-700">
                                “QR check-in is instant, certificates delivered right away.”
                            </blockquote>
                            <figcaption className="mt-4 flex items-center gap-3">
                                <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://randomuser.me/api/portraits/men/31.jpg"
                                    alt="Student"
                                />
                                <div>
                                    <div className="font-medium">Minh Duc</div>
                                    <div className="text-sm text-slate-500">Cohort 2026 • Business</div>
                                </div>
                            </figcaption>
                        </figure>
                        <figure className="shadow-soft rounded-2xl border border-slate-200 bg-white p-6">
                            <blockquote className="text-slate-700">
                                “The media gallery after events is awesome.”
                            </blockquote>
                            <figcaption className="mt-4 flex items-center gap-3">
                                <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://randomuser.me/api/portraits/women/8.jpg"
                                    alt="Student"
                                />
                                <div>
                                    <div className="font-medium">Lan Huong</div>
                                    <div className="text-sm text-slate-500">Cohort 2024 • Design</div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* ============== BLOG + NEWSLETTER ============== */}
            <section id="blog" className="py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-semibold md:text-3xl">From the Blog</h2>
                            <div className="mt-6 grid gap-6 md:grid-cols-2">
                                <article className="overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg">
                                    <img
                                        className="h-40 w-full object-cover"
                                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop"
                                        alt="Hackathon tips"
                                    />
                                    <div className="p-5">
                                        <h3 className="font-semibold">How to Win Your First Hackathon</h3>
                                        <p className="mt-1 text-sm text-slate-600">
                                            Team formation, idea validation, and demo strategy.
                                        </p>
                                        <a href="#" className="mt-3 inline-flex items-center gap-1 text-[#06b6d4]">
                                            Read more <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </article>
                                <article className="overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg">
                                    <img
                                        className="h-40 w-full object-cover"
                                        src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop"
                                        alt="Cultural nights"
                                    />
                                    <div className="p-5">
                                        <h3 className="font-semibold">5 Cultural Nights You Can’t Miss</h3>
                                        <p className="mt-1 text-sm text-slate-600">
                                            A round-up of campus festivals, dance and music nights.
                                        </p>
                                        <a href="#" className="mt-3 inline-flex items-center gap-1 text-[#06b6d4]">
                                            Read more <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </article>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <aside className="lg:col-span-1">
                            <div className="shadow-soft rounded-2xl border border-slate-200 p-6">
                                <h3 className="text-lg font-semibold">Subscribe for updates</h3>
                                <p className="mt-1 text-sm text-slate-600">Weekly highlights of campus events.</p>
                                <form className="mt-4 grid gap-3" aria-label="Newsletter">
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        className="w-full rounded-xl border border-slate-200 px-3 py-3 focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none"
                                    />
                                    <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#06b6d4] px-4 py-3 text-white hover:opacity-90">
                                        <Send className="h-4 w-4" /> Subscribe
                                    </button>
                                </form>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ============== CTA ============== */}
            <section id="apply" className="bg-gradient-to-br from-[#06b6d4]/10 to-transparent py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="shadow-soft flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-8 md:flex-row md:p-12">
                        <div>
                            <h3 className="text-2xl font-semibold md:text-3xl">Ready to join the next event?</h3>
                            <p className="mt-2 text-slate-600">Create your account and register in seconds.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-50"
                            >
                                <LogIn className="h-4 w-4" /> Login
                            </a>
                            <a
                                href="#"
                                className="shadow-soft inline-flex items-center gap-2 rounded-xl bg-[#06b6d4] px-5 py-3 text-white hover:opacity-90"
                            >
                                <UserPlus className="h-4 w-4" /> Register
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
