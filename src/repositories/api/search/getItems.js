import * as WS from "@/repositories/api/abstractWebservice";
import axios from "@/services/axiosApi";
import {endpoint} from "@/repositories/api/search/endpoint";
import Trans from "@/services/translation";

export const GET_SEARCH_ITEMS = async (terms) => {
    try {
        const params = WS.buildApiHeaders({"Accept-Language": Trans.currentLocale}, null, null)
        const response = await axios.post(endpoint.SEARCH, {terms: terms}, params);
        if (201 !== response.status) {
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
