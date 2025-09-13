import { Metadata } from "next";
import EventForm from "../_components/EventForm";
export const metadata: Metadata = {
    title: "Create Event - EventSphere",
    description: "Create and manage your campus events with EventSphere's intuitive event creation tools.",
};
export default function CreateEventPage() {
    return (
        <div className="max-w mx-auto space-y-6 p-6">
            <header className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Create Event</h1>
            </header>

            <EventForm />
        </div>
    );
}
