import { UserType } from "~/types/user.type";

const authApi = {
    create: (data: UserType) => {
        // Demo
        return data;
    },
    login: (data: Partial<UserType>) => {
        // Demo
        return data;
    },
};
export default authApi;
