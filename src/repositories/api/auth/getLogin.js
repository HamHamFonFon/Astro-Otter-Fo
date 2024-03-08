import { endpoint } from "@/repositories/api/auth/endpoint.js";
import * as WS from '@/repositories/api/abstractWebservice'
// import axios from "@/services/axiosApi";
import axios from "axios";
import config from '@/configs/api';

const API_CREDENTIALS = {
    login: process.env.VUE_APP_APILOGIN,
    password: process.env.VUE_APP_APIPWD
}

export const GET_LOGIN = async () => {
    try {
        let requestBody = JSON.stringify({
            'email': API_CREDENTIALS.login,
            'password': API_CREDENTIALS.password,
        });

        let headersConfig = WS.buildApiHeaders(null, null, null);
        const response = await axios.post(config.API_HOST + endpoint.LOGIN, requestBody, headersConfig);

        if (200 !== response.status) {
            const error = new Error(response.statusText);
            error.code = response.status;
            throw error;
        }

        return {
            'jwtToken': response.data.token,
            'refreshToken': response.data.refresh_token
        }
    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
};
