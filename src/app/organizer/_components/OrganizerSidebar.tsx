"use client";

import SidebarLink from "~/components/shared/SidebarLink";
import {
    UserCircle,
    CheckSquare,
    Users,
    ChartBar,
    Home,
    Notebook,
    ChevronDown,
    CalendarPlus,
    FilePlus,
    BellPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function OrganizerSidebar() {
    const pathname = usePathname();

    const approvalsOpen = pathname.startsWith("/organizer/approvals");

    return (
        <aside className="w-64 border-r border-slate-200 bg-white p-4">
            {/* Logo */}
            <div className="mb-6 flex items-center gap-2">
                <Notebook className="h-6 w-6 text-[#06b6d4]" />
                <span className="font-semibold">Organizer</span>
            </div>

            {/* Menu */}
            <nav className="space-y-1">
                <SidebarLink href="/organizer" icon={Home} label="Dashboard" activePath={pathname} />
                {/* Approvals submenu */}
                <SidebarLink href="/organizer/approvals" icon={CheckSquare} label="Approvals" activePath={pathname} />

                {/* Approvals submenu */}
                <details open={approvalsOpen} className="group">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                        <span className="flex items-center gap-2">
                            <CheckSquare className="h-4 w-4" />
                            Approvals
                        </span>
                        <ChevronDown className="h-4 w-4 text-slate-400 transition group-open:rotate-180" />
                    </summary>
                    <div className="mt-1 ml-6 space-y-1">
                        <SidebarLink href="/organizer/approvals/approved" label="Approved" activePath={pathname} />
                        <SidebarLink href="/organizer/approvals/pending" label="Pending" activePath={pathname} />
                        <SidebarLink href="/organizer/approvals/ongoing" label="OnGoing" activePath={pathname} />
                    </div>
                </details>

                <SidebarLink
                    href="/organizer/notifications"
                    icon={BellPlus}
                    label="Notifications"
                    activePath={pathname}
                />
                <SidebarLink
                    href="/organizer/events/create"
                    icon={CalendarPlus}
                    label="Create event"
                    activePath={pathname}
                />
                <SidebarLink href="/organizer/blogs" icon={FilePlus} label="Create Blog" activePath={pathname} />
                <SidebarLink href="/" icon={Home} label="Back to Home" activePath={pathname} />
            </nav>
        </aside>
    );
}
