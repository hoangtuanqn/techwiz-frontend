"use client";

import Link from "next/link";
import {
    UserCircle,
    CheckSquare,
    Users,
    ChartBar,
    FileText,
    Home,
    ShieldCheck,
    ChevronDown,
    CalendarPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
    const pathname = usePathname();

    const approvalsOpen = pathname.startsWith("/rolePage/approvals");
    const rolesOpen = pathname.startsWith("/rolePage/role");

    return (
        <aside className="w-64 border-r border-slate-200 bg-white p-4">
            {/* Logo */}
            <div className="mb-6 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-[#06b6d4]" />
                <span className="font-semibold">Admin</span>
            </div>

            {/* Menu */}
            <nav className="space-y-1">
                <SidebarLink href="/rolePage/profile" icon={UserCircle} label="Profile" activePath={pathname} />

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
                        <SidebarLink href="/rolePage/approvals/approved" label="Approved" activePath={pathname} />
                        <SidebarLink href="/rolePage/approvals/pending" label="Pending" activePath={pathname} />
                    </div>
                </details>

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
                        <SidebarLink href="/rolePage/role/user" label="User" activePath={pathname} />
                        <SidebarLink href="/rolePage/role/organizer" label="Organizer" activePath={pathname} />
                        <SidebarLink href="/rolePage/role/admin" label="Admin" activePath={pathname} />
                    </div>
                </details>

                <SidebarLink href="/rolePage/status" icon={ChartBar} label="Status" activePath={pathname} />
                <SidebarLink href="/rolePage/reports" icon={FileText} label="Reports" activePath={pathname} />
                <SidebarLink href="/rolePage/events/create" icon={CalendarPlus} label="Create" activePath={pathname} />
                <SidebarLink href="/" icon={Home} label="Back to Home" activePath={pathname} />
            </nav>
        </aside>
    );
}

function SidebarLink({
    href,
    label,
    icon: Icon,
    activePath,
}: {
    href: string;
    label: string;
    icon?: React.ElementType;
    activePath: string;
}) {
    const active = activePath === href || (href !== "/" && activePath.startsWith(href + "/"));

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
