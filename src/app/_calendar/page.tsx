import { Metadata } from "next";
import React from "react";
import Calendar from "./_components/Calendar";
export const metadata: Metadata = {
    title: "Calendar",
    description: "View and manage your schedule with our interactive calendar.",
};
const CalendarPage = () => {
    return <Calendar />;
};

export default CalendarPage;
