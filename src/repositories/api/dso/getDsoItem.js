import * as WS from '@/repositories/api/abstractWebservice';
import axios from "@/services/axiosApi";
import {ENDPOINT} from "@/repositories/api/dso/endpoint";

export const GET_DSO_ITEM = async (id) => {
    if ('' === id || null === id) {
        const error = new Error('No DSO ID provided, please fill it one');
        error.code = 500;
        throw error;
    }

    try {
        let config = WS.buildApiHeaders(null, null, null);
        let endpoint = ENDPOINT.ITEM + id;
        const response = await axios.get(endpoint, config);
        return response.data;
    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
};