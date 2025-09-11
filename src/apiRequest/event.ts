import publicApi from "~/libs/apis/publicApi";
import { EventListResponseType } from "~/types/schemaZod/event.schema";

const eventApi = {
    getEvent: () => publicApi.get<EventListResponseType>("/events"),
};
export default eventApi;
