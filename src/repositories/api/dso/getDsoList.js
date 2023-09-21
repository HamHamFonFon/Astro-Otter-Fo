import * as WS from '@/repositories/api/abstractWebservice';
import axiosApi from "@/services/axiosApi";
import {ENDPOINT} from "@/repositories/api/dso/endpoint";

export const GET_DSO_LIST = async (params, offset, limit) => {

    offset = offset ?? 0;
    limit = limit ?? 20;

    try {
        const queryParams = {
            ...params,
            ...{
                offset: offset,
                limit: limit
            }
        }
        const config = WS.buildApiHeaders(null, queryParams, null);
        const response = await axiosApi.get(ENDPOINT.LIST, config);
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