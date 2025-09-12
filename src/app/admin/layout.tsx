"use client";

import type { ReactNode } from "react";
import AdminSidebar from "./_components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar: render duy nhất ở layout */}
            <AdminSidebar />

            {/* Nội dung trang */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
