"use client";

import SidebarLink from "~/components/shared/SidebarLink";
import { Calendar, Home, Notebook, CalendarPlus, FilePlus, Users, Clock, CheckCircle, XCircle } from "lucide-react";
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
                <SidebarLink href="/organizer" icon={Home} label="Dashboard" activePath={pathname} exact={true} />
                
                {/* Event Management */}
                <SidebarLink
                    href="/organizer/events"
                    icon={Calendar}
                    label="Event Management"
                    activePath={pathname}
                />
                
                <SidebarLink
                    href="/organizer/events/create"
                    icon={CalendarPlus}
                    label="Create Event"
                    activePath={pathname}
                />
                
                <SidebarLink href="/organizer/blogs" icon={FilePlus} label="Blog Management" activePath={pathname} />
                <SidebarLink href="/" icon={Home} label="Back to Home" activePath={pathname} exact={true} />
            </nav>
        </aside>
    );
}
