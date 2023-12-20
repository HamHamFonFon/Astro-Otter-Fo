import * as WS from '@/repositories/api/abstractWebservice';
import axios from "@/services/axiosApi";
import {endpoint} from "@/repositories/api/dso/endpoint";
import Trans from "@/services/translation";

export const GET_DSO_ITEM = async (id) => {
    if ('' === id || null === id) {
        const error = new Error('No DSO ID provided, please fill it one');
        error.code = 500;
        throw error;
    }

    try {
        let config = WS.buildApiHeaders({"Accept-Language": Trans.currentLocale}, null, null);
        let endpointId = endpoint.ITEM + id;
        const response = await axios.get(endpointId, config);
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
