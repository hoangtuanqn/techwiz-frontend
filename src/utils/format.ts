export const formatter = {
    date: (date: Date | string, time: boolean = false) => {
        // time = true: Show H:i:s or not
        const parsedDate = new Date(date);
        if (time) {
            return parsedDate.toLocaleString("en-US");
        }
        return parsedDate.toLocaleDateString("en-US");
    },
    number: (amount: number) => Intl.NumberFormat("en-US").format(amount),
    duration: (seconds: number): string => {
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        const parts = [];
        if (d > 0) parts.push(`${d} days`);
        if (h > 0) parts.push(`${h}h`);
        if (m > 0) parts.push(`${m}m`);
        if (s > 0 || parts.length === 0) parts.push(`${s}s`);

        return parts.join(":");
    },
    // Convert seconds to hours
    durationToHours: (seconds: number): string => {
        if (seconds == 0) return "0";
        const hours = Math.floor(seconds / 3600);
        if (hours === 0) return "Less than 1 hour";
        if (hours === 1) return "1 hour";
        return `${hours} hours`;
    },
    parseDateDMY: (dateStr: string) => {
        const parts = dateStr.split("/");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    },
    parseMinutesSeconds: (seconds: number): string => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    },

    // Capitalize first letter, rest lowercase
    capitalize: (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    // hàm đếm xem từ bây giờ đến thời gian trong tương lai là bao lâu
    timeUntil: (date: Date | string): string => {
        const parsedDate = new Date(date);
        const seconds = Math.floor((parsedDate.getTime() - new Date().getTime()) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            return interval === 1 ? "1 year left" : `${interval} years left`;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval === 1 ? "1 month left" : `${interval} months left`;
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval === 1 ? "1 day left" : `${interval} days left`;
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval === 1 ? "1 hour left" : `${interval} hours left`;
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval === 1 ? "1 minute left" : `${interval} minutes left`;
        }
        return "Just now";
    },
};

export const formatPhoneNumber = (phone: string | number): string => {
    // Chuyển thành chuỗi và loại bỏ các ký tự không phải số
    const digits = phone.toString().replace(/\D/g, "");

    // Kiểm tra nếu không đủ 10 chữ số thì trả về nguyên bản
    if (digits.length !== 10) return phone.toString();

    // Tách các phần và format
    return `${digits.slice(0, 4)}.${digits.slice(4, 7)}.${digits.slice(7)}`;
};
