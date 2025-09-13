"use client";

import { useState } from "react";
import ProfileForm from "~/components/shared/ProfileForm";
import { toast } from "sonner";

interface UserProfileData {
    full_name: string;
    email: string;
    enrollment_no: string;
    mobile: string;
    department: string;
}

export default function PersonalInformationPage() {
    const [loading, setLoading] = useState(false);

    // Mock initial data - in a real application, this would come from an API call
    const initialUserData: UserProfileData = {
        full_name: "John Doe",
        email: "john.doe@example.com",
        enrollment_no: "123456789",
        mobile: "0987654321",
        department: "Computer Science",
    };

    const handleProfileSubmit = async (data: UserProfileData) => {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Profile updated:", data);
        toast.success("Profile updated successfully!");
        setLoading(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Personal Information</h1>
            <p className="text-gray-600 mb-6">Update your personal details here.</p>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <ProfileForm
                    initialData={initialUserData}
                    onSubmit={handleProfileSubmit}
                    loading={loading}
                    isEmailEditable={false} // Email is not editable in this form
                />
            </div>
        </div>
    );
}