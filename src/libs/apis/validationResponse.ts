import axios from "axios";
import { toast } from "sonner";

export const notificationErrorApi = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
            toast.error("Unable to connect to server!");
            return;
        }
        const errors = error.response?.data?.errors;
        if (errors) {
            for (const key in errors) {
                toast.error(`${errors?.[key]}`);
                return;
            }
        } else {
            const message = error.response?.data?.message;
            toast.error(message || "");
        }
    } else {
        toast.error("Unknown error! Please try again later!");
    }
};
