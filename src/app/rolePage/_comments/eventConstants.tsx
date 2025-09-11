import type { EventFormValues } from "./EventForm";

export const EMPTY_EVENT: EventFormValues = {
    title: "",
    slug: "",
    teaser: "",
    description: "",
    startDT: "",
    endDT: "",
    capacity: "",
    mode: "onsite",
    place: "",
    mapNote: "",
    learning: "",
    hasCert: false,
    certName: "",
    certCondition: "",
    certDate: "",
};
