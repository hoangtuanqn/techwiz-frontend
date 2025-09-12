"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons can be added here, e.g., from lucide-react

const links = [
    { href: "/profile", label: "Thông tin cá nhân" },
    { href: "/profile/my-events", label: "Sự kiện của tôi" },
    { href: "/profile/settings", label: "Cài đặt" },
    { href: "/profile/change-password", label: "Đổi mật khẩu" },
];

export default function ProfileSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 bg-white p-4 shadow-md">
            <div className="mb-8 text-center">
                <h2 className="text-xl font-bold">Trang cá nhân</h2>
            </div>
            <nav className="flex flex-col space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}>
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
