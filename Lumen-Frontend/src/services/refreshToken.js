import axios from "axios";
import { getCookie } from "./AxiosInstance";

const axiosApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // your backend URL
    withCredentials: true              // send HttpOnly cookies automatically
});

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})
const PUBLIC_ROUTES = [
    "/login",
    "/register",
    "/lumen/search",
    "/likes"
];

let isRefreshing = false;
let failedQueue = [];

const isPublicRoute = (url = "") => {
    return PUBLIC_ROUTES.some(route => url.includes(route));
};

const processQueue = (error, data = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(data);
    });
    failedQueue = [];
};


api.interceptors.request.use(
    (config) => {
        const method = config.method?.toUpperCase();


        if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
            const csrfToken = getCookie("csrf_access_token");

            if (csrfToken) {
                config.headers["X-CSRF-TOKEN"] = csrfToken;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);


axiosApi.interceptors.response.use(
    res => res,
    async (error) => {
        if (!error.response) return Promise.reject(error);

        const originalRequest = error.config;

        if (isPublicRoute(originalRequest.url)) {
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => axiosApi(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await api.post("/refresh/action", {}, {
                    headers: {
                        "X-CSRF-TOKEN": getCookie("csrf_refresh_token"),
                    },
                });
                processQueue(null);
                return axiosApi(originalRequest);

            } catch (err) {
                processQueue(err);

                if (!originalRequest.meta?.allowUnauth) {
                    window.location.href = "/login";
                }


                return Promise.reject(err);

            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosApi;
