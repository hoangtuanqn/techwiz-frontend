import EventList from "./_components/EventList";
import { Metadata } from "next";
import SearchFilterEvent from "./_components/SearchFilterEvent";
import { Suspense } from "react";
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
                <Suspense>
                    <SearchFilterEvent />
                    {/* Grid */}
                    <EventList />
                </Suspense>
            </div>
        </section>
    );
}
