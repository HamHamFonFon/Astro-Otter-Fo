import * as WS from "@/repositories/api/abstractWebservice";
import axios from "@/services/axiosApi";
import {endpoint} from "@/repositories/api/dso/endpoint";
import Trans from "@/services/translation";

/**
 *
 * @param offset
 * @param limit
 * @returns {Promise<any>}
 * @constructor
 */
export const GET_RANDOM = async (offset, limit) => {
    offset = offset ?? 0;
    limit = limit ?? 5;
    try {
        let config = WS.buildApiHeaders({"Accept-Language": Trans.currentLocale}, {offset: offset, limit: limit}, null);
        const response = await axios.get(endpoint.RANDOM, config);
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
