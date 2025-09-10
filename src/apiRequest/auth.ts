import publicApi from "~/libs/apis/publicApi";
import { UserType } from "~/types/user.type";

const authApi = {
    create: (data: Partial<UserType>) => publicApi.post("/auth/register", data),
    login: (data: { username: string; password: string }) => publicApi.post("/auth/login", data),
};
export default authApi;
