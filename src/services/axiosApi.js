import axios from 'axios';
import store from '@/store';

import config from '@/configs/api';

const instance = axios.create({
    baseURL: config.API_URL, // Set your API base URL
});

// instance.defaults.maxRedirects = 1;
/**
 * Assign JWT Token to each REQUEST
 */
instance.interceptors.request.use(
    config => {
        if (store.getters["auth/isLoggedIn"]) {
            config.headers.Authorization = `Bearer ${store.state.auth.accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

export default instance;
