// Chuẩn hóa mọi kiểu date string về ISO và thành "YYYYMMDDTHHMMSSZ"
function toGCalDate(input: string | Date) {
    let d: Date;
    if (input instanceof Date) d = input;
    else {
        let s = input.trim();
        if (!s.includes("T") && s.includes(" ")) s = s.replace(" ", "T"); // "YYYY-MM-DD HH:mm:ss" -> ISO-ish
        s = s.replace(/\.(\d{3})\d+(Z)?$/, ".$1$2"); // ".000000Z" -> ".000Z"
        d = new Date(s);
        if (isNaN(d.getTime())) throw new Error("Invalid date: " + input);
    }
    const iso = d.toISOString(); // 2025-09-28T10:15:14.000Z
    return iso.replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z"); // 20250928T101514Z
}

export function getGoogleCalendarLink({
    title,
    start, // string | Date (UTC ISO, "YYYY-MM-DD HH:mm:ss", ... đều được)
    end, // string | Date
    details = "",
    location = "",
    timezone = "Asia/Ho_Chi_Minh",
}: {
    title: string;
    start: string | Date;
    end: string | Date;
    details?: string;
    location?: string;
    timezone?: string;
}) {
    const s = toGCalDate(start);
    const e = toGCalDate(end);
    const url =
        "https://calendar.google.com/calendar/render" +
        `?action=TEMPLATE` +
        `&text=${encodeURIComponent(title)}` +
        `&dates=${encodeURIComponent(`${s}/${e}`)}` +
        `&details=${encodeURIComponent(details)}` +
        `&location=${encodeURIComponent(location)}` +
        `&ctz=${encodeURIComponent(timezone)}`;
    // window.open(url, "_blank", "noopener,noreferrer");
    return url;
}
