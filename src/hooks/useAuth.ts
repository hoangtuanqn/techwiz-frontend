"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import privateApi from "~/libs/apis/privateApi";
import { AppDispatch, RootState } from "~/app/store";
import { UserType } from "~/types/user.type";
import { setUser } from "~/app/store/userSlice";
import { notificationErrorApi } from "~/libs/apis/validationResponse";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "~/libs/localStorage";

export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    let user: UserType | null;

    if (typeof window !== "undefined") {
        user = JSON.parse(getLocalStorage("user") || "null") as UserType | null;
    }
    user = useSelector((state: RootState) => state.user.user);

    // ✅ Login function
    const login = (user: UserType) => {
        if (typeof window !== "undefined") {
            setLocalStorage("user", JSON.stringify(user));
        }
        dispatch(setUser(user));
    };

    // ✅ Update profile in Redux store
    const updateProfile = (payload: Partial<UserType>) => {
        dispatch(
            setUser({
                ...user,
                ...payload,
            } as UserType),
        );
    };

    // ✅ Mutation: resend verification email
    const resendVerifyEmail = useMutation({
        mutationFn: () =>
            privateApi.post("/profile/resend-verify-email", {
                email: user?.email,
            }),
        onSuccess: () => {
            toast.success("Verification email has been resent!");
        },
        onError: (error) => {
            notificationErrorApi(error);
        },
    });

    // ✅ Mutation: logout
    const logoutUser = useMutation({
        mutationFn: async () => {
            await privateApi.post("/auth/logout");
        },
        onSettled: () => {
            dispatch(setUser(null)); // Clear user from Redux
            if (typeof window !== "undefined") {
                removeLocalStorage("user"); // Clear user from localStorage
            }
            router.push("/auth/login");
            toast.success("Successfully logged out!");
        },
        onError: () => {
            toast.error("An error occurred while logging out!");
        },
    });

    return {
        user,
        updateProfile,
        resendVerifyEmail,
        login,
        logout: () => logoutUser.mutate(),
    };
}
