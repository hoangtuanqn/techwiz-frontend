"use client";

import dynamic from "next/dynamic";
import PersonalCalendarSkeleton from "./_components/CalendarSkeleton";

const PersonalCalendar = dynamic(() => import("./_components/Calendar"), {
    ssr: false,
    loading: () => <PersonalCalendarSkeleton />,
});

export default function Page() {
    return <PersonalCalendar />;
}
