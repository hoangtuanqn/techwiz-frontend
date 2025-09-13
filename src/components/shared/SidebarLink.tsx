"use client";

import Link from "next/link";
import React from "react";

interface SidebarLinkProps {
    href: string;
    label: string;
    icon?: React.ElementType;
    activePath: string;
    exact?: boolean;
}

export default function SidebarLink({
    href,
    label,
    icon: Icon,
    activePath,
    exact = false,
}: SidebarLinkProps) {
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
