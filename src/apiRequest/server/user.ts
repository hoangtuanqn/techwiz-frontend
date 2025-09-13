import withAuthHeaders from "~/libs/withAuthHeaders";
import { EventDetailResponseType } from "~/types/schemaZod/event.schema";

const userServerApi = {
    // get sự kiện đã đăng ký
    getRegisteredEvents: () => withAuthHeaders<EventDetailResponseType>("/api/profile/registered-events"),
};
export default userServerApi;
