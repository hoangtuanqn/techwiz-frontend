import privateApi from "~/libs/apis/privateApi";
import { UserListResponseType } from "~/types/schemaZod/user.schema";

const userAdminApi = {
    getUsers: (
        page: number = 1,
        limit: number = 9,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/users?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[full_name]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return privateApi.get<UserListResponseType>(query);
    },
};
export default userAdminApi;
