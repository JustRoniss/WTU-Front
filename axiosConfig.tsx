import axios from 'axios';

const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: baseURL
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; 
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;