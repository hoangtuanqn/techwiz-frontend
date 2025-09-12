"use client";

import type { ReactNode } from "react";
import ProfileSidebar from "./_components/ProfileSidebar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar cho trang profile */}
            <ProfileSidebar />

            {/* Nội dung trang profile */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
