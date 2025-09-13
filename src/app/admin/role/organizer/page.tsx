"use client";
import { useQuery } from "@tanstack/react-query";
import RoleList, { RoleRow } from "../../_components/RoleList";
import userAdminApi from "~/apiRequest/admin/user";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";

export default function OrganizerPage() {
    const { page } = useGetSearchQuery(["page"] as const);
    const {
        data: usersResponse,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["adminUsers", page, "organizer"],
        queryFn: async () => {
            const res = await userAdminApi.getUsers(+(page || 1), 20, "", "", "filter[role]=organizer");
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Transform dữ liệu từ API thành format phù hợp với RoleList
    const transformedUsers: RoleRow[] =
        usersResponse?.data
            .filter((user) => user.role === "organizer")
            .map((user) => ({
                id: user.id,
                name: user.full_name,
                email: user.email,
                role: "Organizer",
                department: user.department || undefined,
                joinDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : undefined,
                status: user.email_verified_at ? "active" : "pending",
            })) || [];

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    <p className="text-slate-600">Loading organizers...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <p className="mb-2 text-red-600">Error loading organizers</p>
                    <p className="text-sm text-slate-500">Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <RoleList
            title="Event Organizers"
            url="/admin/role/organizer"
            subtitle={`Manage event organizer accounts (${transformedUsers.length} total)`}
            rows={transformedUsers}
            total={transformedUsers.length}
        />
    );
}
