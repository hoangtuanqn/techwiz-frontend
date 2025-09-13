"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface UserProfileData {
    full_name: string;
    email: string;
    enrollment_no: string;
    mobile: string;
    department: string;
    // Add any other fields that might be part of the user profile
}

interface ProfileFormProps {
    initialData: UserProfileData;
    onSubmit: (data: UserProfileData) => Promise<void>;
    loading: boolean;
    isEmailEditable?: boolean; // New prop to control email editability
}

export default function ProfileForm({ initialData, onSubmit, loading, isEmailEditable = false }: ProfileFormProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserProfileData>({
        defaultValues: initialData,
    });

    useEffect(() => {
        reset(initialData);
    }, [initialData, reset]);

    const handleFormSubmit: SubmitHandler<UserProfileData> = async (data) => {
        await onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        id="full_name"
                        {...register("full_name", { required: "Họ và tên không được để trống" })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                    {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", { required: "Email không được để trống", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Email không hợp lệ" } })}
                        disabled={!isEmailEditable}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại
                    </label>
                    <input
                        type="text"
                        id="mobile"
                        {...register("mobile", { required: "Số điện thoại không được để trống" })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                    {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>}
                </div>
                <div>
                    <label htmlFor="enrollment_no" className="block text-sm font-medium text-gray-700 mb-1">
                        Mã số đăng ký
                    </label>
                    <input
                        type="text"
                        id="enrollment_no"
                        {...register("enrollment_no")}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100 p-2"
                    />
                    {errors.enrollment_no && <p className="mt-1 text-sm text-red-600">{errors.enrollment_no.message}</p>}
                </div>
                <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                        Phòng ban/Khoa
                    </label>
                    <input
                        type="text"
                        id="department"
                        {...register("department", { required: "Phòng ban/Khoa không được để trống" })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                    {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
                </div>
            </div>
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
                </button>
            </div>
        </form>
    );
}
