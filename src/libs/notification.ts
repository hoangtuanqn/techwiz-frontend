// @ts-expect-error: no types for @mycv/f8-notification
import { notify } from "@mycv/f8-notification";
export const notificate = (content: string) => {
    // Thông báo dạng push notification
    notify("EventSphere", { body: content });
};
