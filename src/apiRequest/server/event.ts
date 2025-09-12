import withAuthHeaders from "~/libs/withAuthHeaders";
import { EventDetailResponseType } from "~/types/schemaZod/event.schema";

const eventServerApi = {
    getDetailEvent: (id: number) => withAuthHeaders<EventDetailResponseType>(`/api/events/${id}`),
};
export default eventServerApi;
