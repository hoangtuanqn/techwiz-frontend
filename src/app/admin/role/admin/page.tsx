"use client";
import RoleList, { RoleRow } from "../../_comments/RoleList";

const DATA: RoleRow[] = [
    { id: 1, name: "Super Admin", email: "admin@platform.com", role: "Admin" },
    { id: 2, name: "Event Manager", email: "manager@platform.com", role: "Admin" },
];

export default function AdminsPage() {
    return <RoleList title="Admins" subtitle="Manage platform administrators" rows={DATA} />;
}
