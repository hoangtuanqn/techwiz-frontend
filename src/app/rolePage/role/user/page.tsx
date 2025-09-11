"use client";
import RoleList, { RoleRow } from "../../_comments/RoleList";

const DATA: RoleRow[] = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "User" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
];

export default function UserPage() {
    return <RoleList title="Users" subtitle="Manage platform users" rows={DATA} />;
}
