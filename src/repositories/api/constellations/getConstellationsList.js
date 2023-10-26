import {endpoint} from "@/repositories/api/constellations/endpoint";
import * as WS from "@/repositories/api/abstractWebservice";
import axios from "@/services/axiosApi";

export const GET_CONSTELLATION_LIST = async () => {
    try {
        let config = WS.buildApiHeaders(null, null, null);
        const response = await axios.get(endpoint.LIST, config);
        if (200 !== response.status) {
            const error = new Error(response.statusText);
            error.code = response.status;
            throw error;
        }

        return response.data;
    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
};