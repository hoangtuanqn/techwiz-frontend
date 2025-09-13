import privateApi from "~/libs/apis/privateApi";
import { EventRegisteredResponseType } from "~/types/schemaZod/event.schema";

const userApi = {
    updateProfile: (data: any) => privateApi.patch("/profile/update", data),

    // get sự kiện đã đăng ký
    getRegisteredEvents: (
        page: number = 1,
        limit: number = 9,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/profile/registered-events?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return privateApi.get<EventRegisteredResponseType>(query);
    },

    // get các sự kiện có thể nhận được Certificate

    getEventsWithCertificate: (
        page: number = 1,
        limit: number = 9,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/profile/participated-events?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return privateApi.get<EventRegisteredResponseType>(query);
    },

    // change password
    changePassword: (data: { current_password: string; new_password: string; confirm_password: string }) =>
        privateApi.post("/profile/change-password", data),
};

export default userApi;
