import { notFound } from "next/navigation";
import { Eye, IdCard, ClipboardList, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const ROLE_DETAIL: Record<
    string,
    {
        title: string;
        icon: React.ComponentType<{ className?: string }>;
        summary: string;
        bullets: string[];
        cta?: { label: string; href: string };
    }
> = {
    guest: {
        title: "Guest",
        icon: Eye,
        summary:
            "Browse and discover events without creating an account. When you’re ready to take actions like registering or leaving feedback, simply sign in.",
        bullets: [
            "Full public event listing & detail pages",
            "Filter by category, date, and department",
            "Media gallery (images/videos) from past events",
            "Featured banners & announcements on homepage",
        ],
        cta: { label: "Explore Events", href: "/events" },
    },
    participant: {
        title: "Participant",
        icon: IdCard,
        summary:
            "Join events as a verified student or staff. Get reminders, check in with QR, and earn digital certificates for your achievements.",
        bullets: [
            "One-click registration & cancellations (within policy)",
            "Realtime seat availability & waitlist auto-promotion",
            "QR attendance & instant status updates",
            "Download e-certificates after eligibility",
            "Personal dashboard: history, saved media, notifications",
        ],
        cta: { label: "Create Account", href: "/auth/register" },
    },
    organizer: {
        title: "Organizer",
        icon: ClipboardList,
        summary:
            "Create, publish, and manage events for your club or department. Track registrations, scan attendance, and share media post-event.",
        bullets: [
            "Draft → submit → admin approval workflow",
            "Set capacity, schedule, location, and categories",
            "Realtime roster & manual approve/deny if needed",
            "QR check-in & attendance reporting",
            "Upload photos/videos & issue certificates",
        ],
        cta: { label: "Request Organizer Access", href: "/contact" },
    },
    admin: {
        title: "Admin",
        icon: ShieldCheck,
        summary:
            "Oversee quality, safety, and compliance across the platform. Approve events, manage roles, moderate content, and export analytics.",
        bullets: [
            "Event approvals / rejections with change requests",
            "User & role management (upgrade/downgrade, suspend)",
            "Content moderation (events, feedback, media)",
            "Broadcast announcements & policy updates",
            "Export analytics to PDF/Excel",
        ],
        cta: { label: "Go to Admin Console", href: "/admin" },
    },
};

export default function RoleDetailPage({ params }: { params: { slug: string } }) {
    const data = ROLE_DETAIL[params.slug];
    if (!data) return notFound();

    const Icon = data.icon;

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-slate-500">
                    <Link href="/" className="hover:text-[#06b6d4]">
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <Link href="/roles" className="hover:text-[#06b6d4]">
                        Roles
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-700">{data.title}</span>
                </nav>

                {/* Header */}
                <div className="mt-6 flex items-center gap-3">
                    <Icon className="h-8 w-8 text-[#06b6d4]" />
                    <h1 className="text-3xl font-bold text-slate-800">{data.title}</h1>
                </div>
                <p className="mt-3 max-w-3xl text-slate-600">{data.summary}</p>

                {/* Content */}
                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-800">Key Capabilities</h2>
                    <ul className="mt-4 grid gap-3 md:grid-cols-2">
                        {data.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-slate-700">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>

                    {data.cta && (
                        <div className="mt-6">
                            <Link
                                href={data.cta.href}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#06b6d4] px-5 py-3 text-white hover:opacity-90"
                            >
                                {data.cta.label}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
