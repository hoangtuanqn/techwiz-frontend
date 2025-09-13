import EventList from "./_components/EventList";
import { Metadata } from "next";
import FilterEventRegistered from "./_components/FilterEventRegistered";
export const metadata: Metadata = {
    title: "Registered Events",
    description: "View the list of events you have registered for and participated in.",
};
export default function EventsAttendedPage() {
    return (
        <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">Events Attended</h1>
            <p className="mb-8 text-gray-600">Here is a list of events you have participated in.</p>
            {/* Filter and Search Controls */}
            <FilterEventRegistered />
            <EventList />
        </div>
    );
}
