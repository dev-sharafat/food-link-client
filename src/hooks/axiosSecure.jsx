import axios from "axios";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

// Request interceptor
axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosSecure;
