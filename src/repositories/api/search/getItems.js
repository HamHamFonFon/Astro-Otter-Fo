import * as WS from "@/repositories/api/abstractWebservice";
import axios from "@/services/axiosApi";
import {ENDPOINT} from "@/repositories/api/search/endpoint";

export const GET_SEARCH_ITEMS = async (terms) => {
    try {
        const params = WS.buildApiHeaders(null, {term: terms}, null)
        const response = await axios.get(ENDPOINT.SEARCH, params);
        if (200 !== response.status) {
            const error = new Error(response.statusText);
            error.code = response.status;
            throw error;
        }

        return response.data;

    } catch (err) {
        const error = new Error(err.message);
        error.code = err.code ?? 500;
        throw error;
    }
};