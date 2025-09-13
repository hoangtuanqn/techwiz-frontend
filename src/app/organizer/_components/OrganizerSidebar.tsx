"use client";

import SidebarLink from "~/components/shared/SidebarLink";
import { CheckSquare, Home, Notebook, CalendarPlus, FilePlus } from "lucide-react";
import { usePathname } from "next/navigation";

export default function OrganizerSidebar() {
    const pathname = usePathname();

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
                <SidebarLink href="/organizer/approvals" icon={CheckSquare} label="Approvals" activePath={pathname} />
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
