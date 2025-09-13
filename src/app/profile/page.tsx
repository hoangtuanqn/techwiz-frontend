"use client";

import ProfileForm from "~/components/shared/ProfileForm";
import { useAuth } from "~/hooks/useAuth";


interface UserProfileData {
    full_name: string;
    email: string;
    enrollment_no: string;
    mobile: string;
    department: string;
}

export default function PersonalInformationPage() {
    const { user } = useAuth();

    // Mock initial data - in a real application, this would come from an API call
    const initialUserData: UserProfileData = {
        full_name: user?.full_name || "No name",
        email: user?.email || "no-email@example.com",
        enrollment_no: user?.enrollment_no || "N/A",
        mobile: user?.mobile || "N/A",
        department: user?.department || "N/A",
    };

    return (
        <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">Personal Information</h1>
            <p className="mb-6 text-gray-600">Update your personal details here.</p>

            <div className="rounded-2xl bg-white p-8 shadow-lg">
                <ProfileForm initialData={initialUserData} />
            </div>
        </div>
    );
}
