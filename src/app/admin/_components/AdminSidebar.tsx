"use client";

import Link from "next/link";
import {
    UserCircle,
    CheckSquare,
    Users,
    ChartBar,
    Home,
    ShieldCheck,
    ChevronDown,
    CalendarPlus,
    FilePlus,
    BellPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
    const pathname = usePathname();

    const rolesOpen = pathname.startsWith("/admin/role");

    return (
        <aside className="w-64 border-r border-slate-200 bg-white p-4">
            {/* Logo */}
            <div className="mb-6 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-[#06b6d4]" />
                <span className="font-semibold">Admin</span>
            </div>

            {/* Menu */}
            <nav className="space-y-1">
                <SidebarLink href="/admin" icon={Home} label="Dashboard" activePath={pathname} exact={true} />

                {/* Approvals submenu */}
                <SidebarLink href="/admin/approvals" icon={CheckSquare} label="Approvals" activePath={pathname} />

                {/* Role submenu */}
                <details open={rolesOpen} className="group">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                        <span className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Roles
                        </span>
                        <ChevronDown className="h-4 w-4 text-slate-400 transition group-open:rotate-180" />
                    </summary>
                    <div className="mt-1 ml-6 space-y-1">
                        <SidebarLink href="/admin/role/user" label="User" activePath={pathname} />
                        <SidebarLink href="/admin/role/organizer" label="Organizer" activePath={pathname} />
                        <SidebarLink href="/admin/role/admin" label="Admin" activePath={pathname} />
                    </div>
                </details>

                <SidebarLink href="/admin/notifications" icon={BellPlus} label="Notifications" activePath={pathname} />
                
                <SidebarLink
                    href="/admin/events/create"
                    icon={CalendarPlus}
                    label="Create event"
                    activePath={pathname}
                />
                <SidebarLink href="/admin/blogs" icon={FilePlus} label="Create Blog" activePath={pathname} />
                <SidebarLink href="/" icon={Home} label="Back to Home" activePath={pathname} exact={true} />
            </nav>
        </aside>
    );
}

function SidebarLink({
    href,
    label,
    icon: Icon,
    activePath,
    exact = false,
}: {
    href: string;
    label: string;
    icon?: React.ElementType;
    activePath: string;
    exact?: boolean;
}) {
    const active = exact ? activePath === href : activePath.startsWith(href);

    return (
        <Link
            href={href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                active
                    ? "bg-slate-100 font-medium text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
        >
            {Icon && <Icon className="h-4 w-4" />}
            {label}
        </Link>
    );
}
