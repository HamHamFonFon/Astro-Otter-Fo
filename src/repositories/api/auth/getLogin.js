import { ENDPOINT } from "./endpoint";
import * as WS from '@/repositories/api/abstractWebservice'
import axios from "axios";

const API_CREDENTIALS = {
    login: process.env.VUE_APP_LOGIN,
    password: process.env.VUE_APP_PWD
}

export const GET_LOGIN = async () => {

    try {
        let apiLogin = WS.buildApiUrl(ENDPOINT.ENDPOINT_LOGIN, null);
        let config = WS.buildApiHeaders(null, {'username': API_CREDENTIALS.login, 'password': API_CREDENTIALS.password});

        const response = await axios.post(apiLogin, config);

        if (200 !== response.status) {
            const error = new Error(response.statusText);
            error.code = response.status;
            throw error;
        }

        let jwtToken = response.data.token;
        let refreshToken = response.data.refresh_token;

        // store both

    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
};