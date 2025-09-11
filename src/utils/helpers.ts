// Hàm biến đổi đối tượng thành chuỗi query string . VD: filter[key]=value&filter[key2]=value2
export const buildLaravelFilterQuery = (filters: Record<string, string | number | boolean>) => {
    const queryParams = Object.entries(filters)
        .map(([key, value]) => `filter[${encodeURIComponent(key)}]=${encodeURIComponent(String(value))}`)
        .join("&");

    return queryParams ?? "";
};
