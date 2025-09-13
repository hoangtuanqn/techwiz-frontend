import EventList from "./_components/EventList";
import { Metadata } from "next";
import FilterEventRegistered from "./_components/FilterEventRegistered";
export const metadata: Metadata = {
    title: "Registered Events",
    description: "View the list of events you have registered for and attended.",
};
export default function RegisteredEventsPage() {
    return (
        <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">Registered Events</h1>
            <p className="mb-8 text-gray-600">Here is the list of events you have attended.</p>
            {/* Filter and Search Controls */}
            <FilterEventRegistered />
            <EventList />
        </div>
    );
}
