"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TicketCheck,CircleUserRound, User, Calendar, Key } from "lucide-react"; // Import icons

const links = [
    { href: "/profile", label: "Personal Information", icon: User },
    { href: "/my-events", label: "My Events", icon: Calendar },
    { href: "/certificates", label: "Certificates", icon: TicketCheck },
    { href: "/change-password", label: "Change Password", icon: Key },
];

export default function ProfileSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 bg-white p-4 shadow-md">
            {/* Logo */}
            <div className="mb-6 flex items-center gap-2">
                <CircleUserRound className="h-6 w-6 text-[#06b6d4]" />
                <span className="font-semibold">Admin</span>
            </div>
            <nav className="flex flex-col space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon; // Get the icon component
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}>
                            {Icon && <Icon className="h-4 w-4" />} {/* Render icon */}
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}