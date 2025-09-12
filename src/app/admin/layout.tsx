import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen">
      <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-5">
        <Link href="/admin/dashboard">
          <h1 className="text-2xl font-bold mb-6 cursor-pointer">Admin Panel</h1>
        </Link>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/admin/dashboard" className="block p-2 bg-gray-700 rounded">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/manage-users" className="block p-2 hover:bg-gray-700 rounded">Manage Users</Link>
            </li>
            <li>
              <Link href="/admin/settings" className="block p-2 hover:bg-gray-700 rounded">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </section>
  );
}
