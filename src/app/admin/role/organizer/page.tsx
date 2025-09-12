"use client";
import RoleList, { RoleRow } from "../../_components/RoleList";

const DATA: RoleRow[] = [
    { id: 101, name: "EventPro Team", email: "team@eventpro.com", role: "Organizer" },
    { id: 102, name: "Design Club", email: "design@univ.edu", role: "Organizer" },
];

export default function OrganizerPage() {
    return <RoleList title="Organizers" subtitle="Manage event organizer accounts" rows={DATA} />;
}
