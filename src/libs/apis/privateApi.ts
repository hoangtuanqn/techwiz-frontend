import axios from "axios";
import { APP } from "~/config/env";

// Custom Axios instance
const privateApi = axios.create({
    baseURL: APP.API.FULL_URL,
    withCredentials: true,
});

// Function to refresh token when expired
const refreshToken = () => {
    return axios.post(`${APP.API.FULL_URL}/auth/refresh`, null, { withCredentials: true });
};

// Response interceptor
privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            // Prevent infinite loop if refresh token also fails
            originalRequest._retry = true;
            try {
                await refreshToken(); // must await
                return privateApi(originalRequest); // Retry the original request
            } catch (error) {
                console.log(">>> Axios instance error: ", error);
            }
        }
        return Promise.reject(error);
    },
);

export default privateApi;
