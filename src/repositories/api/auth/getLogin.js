import { ENDPOINT } from "@/repositories/api/auth/endpoint.js";
import * as WS from '@/repositories/api/abstractWebservice'
import axios from "@/services/axiosApi";

const API_CREDENTIALS = {
    login: process.env.VUE_APP_APILOGIN,
    password: process.env.VUE_APP_APIPWD
}

export const GET_LOGIN = async () => {
    try {
        let requestBody = {
            'username': API_CREDENTIALS.login,
            'password': API_CREDENTIALS.password,
        }

        let config = WS.buildApiHeaders(null);
        console.log(ENDPOINT.LOGIN, requestBody, config)
        const response = await axios.post(ENDPOINT.LOGIN, requestBody, config);

        console.log(response.data);
        if (200 !== response.status) {
            const error = new Error(response.statusText);
            error.code = response.status;
            throw error;
        }

        return {
            'jwtToken': response.data.token,
            'refreshToken': response.data.refresh_token,
        }
    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
};