import {ENDPOINT} from "@/repositories/api/constellations/endpoint";
import * as WS from "@/repositories/api/abstractWebservice";
import axios from "@/services/axiosApi";

export const GET_CONSTELLATION_ITEM = async (idConstellation) => {
    if ('' === idConstellation || null === idConstellation) {
        const error = new Error('No constellation ID provided, please fill it one');
        error.code = 500;
        throw error;
    }

    try {
        let config = WS.buildApiHeaders({'id': idConstellation});
        const response = await axios.get(ENDPOINT.ITEM, config);
        console.log(response);
        return response.data;
    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
}