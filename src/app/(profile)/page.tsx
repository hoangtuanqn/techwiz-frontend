"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/wrapper/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/apiRequest";
import ProfileForm from "@/components/shared/ProfileForm";

export default function UserProfilePage() {
    const { user, token, login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [initialProfileData, setInitialProfileData] = useState<any | null>(null);

    useEffect(() => {
        if (user) {
            setInitialProfileData({
                full_name: user.full_name || "",
                email: user.email || "",
                phone_number: user.phone_number || "",
                address: user.address || "",
                avatar: user.avatar || "",
            });
        }
    }, [user]);

    const handleSubmit = async (formData: any) => {
        setLoading(true);
        try {
            const res = await apiRequest.put("/auth/me", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {
                toast.success("Profile updated successfully!");
                // Assuming the login function can update the user context with new data
                // login(res.data.user, token); // Uncomment if login updates user data
                router.refresh(); // Refresh the page to show updated data
            } else {
                toast.error(res.data.message || "Failed to update profile.");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (!initialProfileData) {
        return <p>Loading profile information...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-3xl font-bold">Your Personal Information</h1>
            <ProfileForm
                initialData={initialProfileData}
                onSubmit={handleSubmit}
                loading={loading}
                isEmailEditable={false} // User cannot edit their own email
            />
        </div>
    );
}
