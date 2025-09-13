"use client";

import React from "react";
import { GraduationCap, UserPlus, Menu, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ActionHeader from "./ActionHeader";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/calendar", label: "Calendar" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const linkCls = (href: string) => {
    const active = isActive(pathname, href);
    if (active) return "font-semibold text-cyan-600";
    // Home khi không active -> đen
    if (href === "/") return "text-slate-900 hover:text-cyan-600";
    // Mặc định các link khác
    return "text-slate-700 hover:text-cyan-600";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="EventSphere home">
            <GraduationCap className="h-6 w-6 text-cyan-500" />
            <span className="text-xl font-semibold tracking-wide">EVENTSPHERE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV.map((item) => (
              <Link key={item.href} className={`transition ${linkCls(item.href)}`} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right-side Icons (desktop only) */}
          <div className="hidden items-center gap-4 md:flex">
            <ActionHeader />
            <Link href="#" className="relative text-slate-600 hover:text-cyan-600" title="Notifications">
              <Bell className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobileNav"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div id="mobileNav" className={`${open ? "block" : "hidden"} border-t border-slate-200 bg-white md:hidden`}>
        <nav className="flex flex-col gap-1 px-4 py-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`py-2 ${linkCls(item.href)}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="my-2 h-px bg-slate-200"></div>
          <Link className="py-2 text-cyan-600" href="/auth/login" onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link className="inline-flex items-center gap-2 py-2" href="/auth/register" onClick={() => setOpen(false)}>
            <UserPlus className="h-4 w-4" /> Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
