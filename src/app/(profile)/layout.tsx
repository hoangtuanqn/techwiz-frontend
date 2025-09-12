import React from "react";
import Link from "next/link";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-screen">
      <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-5">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/personal-information" className="block p-2 hover:bg-gray-700 rounded-lg"><span>🏠</span>Personal Information</Link>
            </li>
            <li>
              <Link href="/events-attended" className="block p-2 hover:bg-gray-700 rounded-lg"><span>🎟️</span>Events Attended</Link>
            </li>
            <li>
              <Link href="/certificates" className="block p-2 hover:bg-gray-700 rounded-lg"><span>🏅</span>Certificates Received</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </section>
  );
}