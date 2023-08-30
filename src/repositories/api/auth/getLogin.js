import { ENDPOINT } from "@/repositories/api/auth/endpoint.js";
import * as WS from '@/repositories/api/abstractWebservice'
import axios from "@/services/axiosApi";

const API_CREDENTIALS = {
    login: 'Guest', //process.env.VUE_APP_LOGIN,
    password: process.env.VUE_APP_PWD
}

export const GET_LOGIN = async () => {
    console.log('WS GET_LOGIN', API_CREDENTIALS);
    try {
        // let apiLogin = WS.buildApiUrl(ENDPOINT.ENDPOINT_LOGIN, null);
        let routeParams = {
            'username': API_CREDENTIALS.login,
            'password': API_CREDENTIALS.password,
        }
        console.log(routeParams);
        let config = WS.buildApiHeaders(routeParams);
        const response = await axios.post(ENDPOINT.LOGIN, config);

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