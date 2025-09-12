import React from "react";
import Link from "next/link";

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-screen">
      <aside className="w-64 flex-shrink-0 bg-gray-900 text-white p-5">
        <Link href="/organizer/dashboard">
          <h1 className="text-2xl font-bold mb-6 cursor-pointer">Organizer Panel</h1>
        </Link>
        <nav>
          <ul className="space-y-2">
            <li><Link href="/organizer/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link></li>
            <li><Link href="/organizer/events" className="block p-2 hover:bg-gray-700 rounded">Manage Events</Link></li>
            <li><Link href="/organizer/certificates" className="block p-2 hover:bg-gray-700 rounded">Certificates</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto bg-gray-50">{children}</main>
    </section>
  );
}