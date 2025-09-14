import publicApi from "~/libs/apis/publicApi";
import {
    EventDetailResponseType,
    EventListResponseType,
    GetEventScheduleResponseType,
} from "~/types/schemaZod/event.schema";
import { MediaEventResponseType } from "~/types/schemaZod/mediaEvent.schema";
import { ParticipantListResponseType } from "~/types/schemaZod/participant.schema";

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
    //
    getDetailEvent: (id: number, headers?: { [key: string]: string }) => {
        return publicApi.get<EventDetailResponseType>(`/events/${id}`, headers ? { headers } : undefined);
    },

    // đăng ký sự kiện
    registerEvent: (id: number) => {
        return publicApi.post(`/events/${id}/register`);
    },

    // get lịch trình sự kiện
    getEventSchedule: () => {
        return publicApi.get<GetEventScheduleResponseType>(`/events/schedules`);
    },

    // get hình ảnh sự kiện theo sự kiện cụ thể
    getEventImages: (id: number) => {
        return publicApi.get<MediaEventResponseType>(`/events/${id}/media`);
    },

    // get tất cả hình ảnh sự kiện
    getAllEventImages: (page: number = 1, limit: number = 16, querySortOther: string = "", queryOther: string = "") => {
        let query = `/media-galleries?page=${page}&limit=${limit}`;

        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return publicApi.get<MediaEventResponseType>(query);
    },

    // admin - origanizer tạo sự kiện
    createEvent: (data: { [key: string]: any }) => {
        return publicApi.post(`/events`, data);
    },

    // update eventApi
    updateEvent: (id: number, data: { [key: string]: any }) => {
        return publicApi.patch(`/events/${id}`, data);
    },

    // lấy danh sách thành viên đã đăng ký
    getRegisteredUsers: (id: number, page: number = 1, limit: number = 20) => {
        return publicApi.get<ParticipantListResponseType>(`/events/${id}/participants`);
    },

    // update status event (approve/reject)
    updateEventStatus: (id: number, status: "approved" | "rejected", reason?: string) => {
        return publicApi.post(`/events/${id}/status`, { status, reason });
    },

    addToWishlist: (id: number) => {
        return publicApi.post(`/events/${id}/wishlist`);
    },

    // đăng ký tình nguyện viên
    registerVolunteer: (id: number) => {
        return publicApi.post(`/events/${id}/volunteer`);
    },

    // hủy đăng ký sự kiện
    cancelEventRegistration: (id: number) => {
        return publicApi.post(`/events/${id}/unregister`);
    },
};
export default eventApi;
