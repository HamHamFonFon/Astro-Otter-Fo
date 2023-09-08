import { ENDPOINT } from "@/repositories/api/auth/endpoint.js";

import * as WS from '@/repositories/api/abstractWebservice'
import axios from "@/services/axiosApi";

export const GET_REFRESH = async (refreshToken) => {
    try {
        // If existing, send request and store new JWT token
        if (null !== refreshToken) {
            let requestBody = {
                'refresh_token': refreshToken
            }
            let config = WS.buildApiHeaders(null);

            const response = await axios.post(ENDPOINT.REFRESH, requestBody, config);
            if (200 !== response.status) {
                const error = new Error(response.statusText);
                error.code = response.status;
                throw error;
            }

            return {
                'jwtToken': response.data.token
            }
        }
    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
}