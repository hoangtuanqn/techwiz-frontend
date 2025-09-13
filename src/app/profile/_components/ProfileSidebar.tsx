"use client";

import { usePathname } from "next/navigation";
import { TicketCheck, User, Calendar, Key, CircleUserRound } from "lucide-react"; // Import icons
import SidebarLink from "~/components/shared/SidebarLink"; // Import shared SidebarLink

const links = [
    { href: "/", label: "Personal Information", icon: User, exact: true }, // Add exact prop
    { href: "/my-events", label: "My Events", icon: Calendar },
    { href: "/certificates", label: "Certificates", icon: TicketCheck },
    { href: "/change-password", label: "Change Password", icon: Key },
];

export default function ProfileSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-slate-200 bg-white p-4">
            {" "}
            {/* Updated styling */}
            {/* Logo */}
            <div className="mb-6 flex items-center gap-2">
                <CircleUserRound className="h-6 w-6 text-[#06b6d4]" />
                <span className="font-semibold">Profile</span> {/* Changed title */}
            </div>
            <nav className="flex flex-col space-y-1">
                {" "}
                {/* Updated spacing */}
                {links.map((link) => (
                    <SidebarLink
                        key={link.href}
                        href={"/profile" + link.href}
                        label={link.label}
                        icon={link.icon}
                        activePath={pathname}
                        exact={link.exact} // Pass exact prop
                    />
                ))}
            </nav>
        </aside>
    );
}
