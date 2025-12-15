import axios from "axios";


const axiosApi = axios.create({
    baseURL: "http://localhost:5000", // your backend URL
    withCredentials: true              // send HttpOnly cookies automatically
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, data = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(data);
    });
    failedQueue = [];
};

axiosApi.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // If access token expired (401 unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {

            // If a refresh is already happening → queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => axiosApi(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // 🔥 Silent call to refresh endpoint
                await axios.post(
                    "/refresh",
                    {},
                    { withCredentials: true }
                );

                processQueue(null);

                // 🔥 Retry original failed request
                return axiosApi(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError, null);

                // 🔥 If refresh token also expired → logout

                window.location.href = "/login";

                return Promise.reject(refreshError);

            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosApi;
