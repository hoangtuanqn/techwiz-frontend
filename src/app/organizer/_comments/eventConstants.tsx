import type { EventRow } from "./EventTable"; // import type an toàn

export const DEMO_APPROVED: EventRow[] = [
    {
        id: "EVT-2101",
        name: "AI Summit",
        type: "Conference",
        start: "12/11/2025",
        end: "14/11/2025",
        place: "Main Hall",
        org: "Tech Dept",
        participants: 300,
    },
    {
        id: "EVT-2102",
        name: "Marketing Bootcamp",
        type: "Workshop",
        start: "20/11/2025",
        end: "21/11/2025",
        place: "Room B2",
        org: "Business Faculty",
        participants: 120,
    },
];

export const DEMO_ONGOING: EventRow[] = [
    {
        id: "EVT-3001",
        name: "Hackathon 2025",
        type: "Competition",
        start: "10/09/2025",
        end: "14/09/2025",
        place: "Innovation Hub",
        org: "CS Dept",
        participants: 200,
    },
    {
        id: "EVT-3002",
        name: "AI Workshop",
        type: "Workshop",
        start: "11/09/2025",
        end: "12/09/2025",
        place: "Room 101",
        org: "AI Club",
        participants: 85,
    },
];

export const DEMO_PENDING: EventRow[] = [
    {
        id: "EVT-1125",
        name: "Startup Night",
        type: "Meetup",
        start: "25/09/2025",
        end: "25/09/2025",
        place: "Hall A",
        org: "Business Dept",
        participants: 180,
    },
    {
        id: "EVT-1127",
        name: "Design Systems Workshop",
        type: "Workshop",
        start: "09/10/2025",
        end: "10/10/2025",
        place: "Design Hub",
        org: "Design Club",
        participants: 90,
    },
];

// Event rỗng để khởi tạo form tạo mới
export const EMPTY_EVENT: EventRow = {
    id: "",
    name: "",
    type: "",
    start: "",
    end: "",
    place: "",
    org: "",
    participants: 0,
};
