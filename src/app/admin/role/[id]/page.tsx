"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Shield, User, Mail, Save, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import userAdminApi from "~/apiRequest/admin/user";

export default function EditUserPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    // Fetch user data
    const { data: usersResponse, isLoading } = useQuery({
        queryKey: ["adminUsers"],
        queryFn: async () => {
            const res = await userAdminApi.getUsers(1, 100);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5,
    });

    const user = useMemo(() => {
        return usersResponse?.data.find((u) => String(u.id) === id);
    }, [usersResponse, id]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        department: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update form when user data loads
    useMemo(() => {
        if (user) {
            setFormData({
                name: user.full_name,
                email: user.email,
                password: "",
                role: user.role,
                department: user.department || "",
            });
        }
    }, [user]);

    const hasChanges =
        user &&
        (formData.name !== user.full_name ||
            formData.email !== user.email ||
            formData.password.length > 0 ||
            formData.role !== user.role ||
            formData.department !== (user.department || ""));

    const handleSave = async () => {
        if (!user || !hasChanges) return;

        setIsSubmitting(true);
        try {
            // TODO: Implement actual API call when available
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

            alert(`Updated user ${user.id}:\nName=${formData.name}\nEmail=${formData.email}\nRole=${formData.role}`);

            router.back();
        } catch (error) {
            console.error("Failed to update user:", error);
            alert("Failed to update user. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="mx-auto max-w-4xl p-4 sm:p-6">
                <div className="flex min-h-[400px] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                        <p className="text-slate-600">Loading user data...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="mx-auto max-w-4xl p-4 sm:p-6">
                <button
                    onClick={() => router.back()}
                    className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <X className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-slate-900">User not found</h3>
                    <p className="text-slate-600">User with ID {id} does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Edit User</h1>
                        <p className="text-slate-600">Update user information and permissions</p>
                    </div>
                </div>

                {/* Save/Cancel Actions */}
                <div className="hidden items-center gap-3 sm:flex">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!hasChanges || isSubmitting}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        {isSubmitting ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* User Info Card */}
                <div className="lg:col-span-1">
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <div className="mb-6 text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white">
                                {user.full_name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                    .slice(0, 2)}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">{user.full_name}</h3>
                            <p className="text-sm text-slate-600">ID: {user.id}</p>
                            <div className="mt-2">
                                <span
                                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                                        user.role === "admin"
                                            ? "border-red-200 bg-red-100 text-red-700"
                                            : user.role === "organizer"
                                              ? "border-amber-200 bg-amber-100 text-amber-700"
                                              : "border-green-200 bg-green-100 text-green-700"
                                    }`}
                                >
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail className="h-4 w-4 text-slate-400" />
                                <span className="truncate">{user.email}</span>
                            </div>
                            {user.department && (
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Shield className="h-4 w-4 text-slate-400" />
                                    <span>{user.department}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 text-slate-600">
                                <User className="h-4 w-4 text-slate-400" />
                                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <div
                                    className={`h-2 w-2 rounded-full ${user.email_verified_at ? "bg-green-500" : "bg-yellow-500"}`}
                                />
                                <span>{user.email_verified_at ? "Verified" : "Pending verification"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h2 className="mb-6 text-lg font-semibold text-slate-900">User Information</h2>

                        <div className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    placeholder="Enter full name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    placeholder="Enter email address"
                                />
                            </div>

                            {/* Department */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Department</label>
                                <input
                                    type="text"
                                    value={formData.department}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    placeholder="Enter department (optional)"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                >
                                    <option value="user">User</option>
                                    <option value="organizer">Organizer</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <p className="mt-1 text-xs text-slate-500">Choose the appropriate role for this user</p>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                        placeholder="Enter new password (leave empty to keep current)"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">Leave empty to keep the current password</p>
                            </div>
                        </div>

                        {/* Changes Indicator */}
                        {hasChanges && (
                            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                                    <span className="text-sm font-medium text-amber-800">You have unsaved changes</span>
                                </div>
                                <p className="mt-1 text-xs text-amber-600">
                                    Don&apos;t forget to save your changes before leaving this page.
                                </p>
                            </div>
                        )}

                        {/* Mobile Save Button */}
                        <div className="mt-6 flex gap-3 sm:hidden">
                            <button
                                onClick={() => router.back()}
                                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!hasChanges || isSubmitting}
                                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                            >
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
