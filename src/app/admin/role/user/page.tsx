"use client";
import { useQuery } from "@tanstack/react-query";
import RoleList, { RoleRow } from "../../_components/RoleList";
import userAdminApi from "~/apiRequest/admin/user";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";

export default function UserPage() {
    const { page } = useGetSearchQuery(["page"] as const);
    const {
        data: usersResponse,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["adminUsers", page],
        queryFn: async () => {
            const res = await userAdminApi.getUsers(+(page || 1), 20);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Transform dữ liệu từ API thành format phù hợp với RoleList
    const transformedUsers: RoleRow[] =
        usersResponse?.data.map((user) => ({
            id: user.id,
            name: user.full_name,
            email: user.email,
            role: user.role === "admin" ? "Admin" : user.role === "organizer" ? "Organizer" : "User",
            department: user.department || undefined,
            joinDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : undefined,
            status: user.email_verified_at ? "active" : "pending",
        })) || [];

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    <p className="text-slate-600">Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <p className="mb-2 text-red-600">Error loading users</p>
                    <p className="text-sm text-slate-500">Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <RoleList
            title="Users"
            url="/admin/role/user"
            subtitle={`Manage platform users (${usersResponse?.total || 0} total)`}
            rows={transformedUsers}
            total={usersResponse?.total || 0}
        />
    );
}
