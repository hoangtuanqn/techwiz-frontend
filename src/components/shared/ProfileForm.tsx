"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface UserProfileData {
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    avatar: string;
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
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                    Họ và tên
                </label>
                <input
                    type="text"
                    id="full_name"
                    {...register("full_name", { required: "Họ và tên không được để trống" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    {...register("email", { required: "Email không được để trống", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Email không hợp lệ" } })}
                    disabled={!isEmailEditable}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                </label>
                <input
                    type="text"
                    id="phone_number"
                    {...register("phone_number")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>}
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                </label>
                <input
                    type="text"
                    id="address"
                    {...register("address")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
            </div>
            <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                    Avatar URL
                </label>
                <input
                    type="text"
                    id="avatar"
                    {...register("avatar")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.avatar && <p className="mt-1 text-sm text-red-600">{errors.avatar.message}</p>}
            </div>
            <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
            </button>
        </form>
    );
}
