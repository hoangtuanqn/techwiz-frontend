import http from "~/libs/apis/http";

const userApi = {
    updateProfile: (data: any) => http.put<any>("/user/profile", data),
};

export default userApi;
