import publicApi from "~/libs/apis/publicApi";
import { EventDetailResponseType, EventListResponseType } from "~/types/schemaZod/event.schema";

const eventApi = {
    getEvent: (
        page: number = 1,
        limit: number = 9,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/events?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return publicApi.get<EventListResponseType>(query);
    },

    getDetailEvent: (id: number) => {
        return publicApi.get<EventDetailResponseType>(`/events/${id}`);
    },

    // đăng ký sự kiện
    registerEvent: (id: number) => {
        return publicApi.post(`/events/${id}/register`);
    },
};
export default eventApi;
