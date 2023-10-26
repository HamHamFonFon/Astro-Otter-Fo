import axiosApi from "@/services/axiosApi";
import * as WS from "@/repositories/api/abstractWebservice";
import {endpoint} from "@/repositories/api/contact/endpoint";
export const POST_MESSAGE = async (data) => {
    try {
        let config = WS.buildApiHeaders(null, null, null);
        const response = await axiosApi.post(endpoint, data, config);
        if (400 < response.status) {
            const error = new Error('Error sending message: ' + response.statusText);
            error.code = response.status;
            throw error;
        }

        return true;
    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
}