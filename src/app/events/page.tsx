import { Search, RotateCcw } from "lucide-react";
import EventList from "./_components/EventList";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Event Catalog",
    description: "Browse and discover campus events in our comprehensive event catalog.",
};

export default function CatalogPage() {
    return (
        <section id="catalog" className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">Event Catalog</h1>
                    <p className="mt-2 text-slate-600">
                        Browse all campus events. Use filters and search to find what you need.
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="mb-8 flex flex-col items-center gap-4">
                    <div className="flex flex-wrap justify-center gap-3">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search events…"
                                className="w-60 rounded-xl border border-slate-200 py-2 pr-3 pl-10 text-sm focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none"
                            />
                        </div>
                        <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#06b6d4]/50">
                            <option>All</option>
                            <option>Technical</option>
                            <option>Business</option>
                            <option>Cultural</option>
                            <option>Sports</option>
                        </select>
                        <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#06b6d4]/50">
                            <option>Available</option>
                            <option>Close</option>
                            <option>Hot</option>
                        </select>

                        {/* Reset */}
                        <button className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
                            <RotateCcw className="h-4 w-4" /> Reset
                        </button>
                    </div>

                    {/* Count */}
                    <span className="text-sm text-slate-500">20 events found</span>
                </div>

                {/* Grid */}
                <EventList />
            </div>
        </section>
    );
}
