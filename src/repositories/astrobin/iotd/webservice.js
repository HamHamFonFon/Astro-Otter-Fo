import { ENDPOINT } from './endpoint'
import axiosAstrobin from "@/services/axiosAstrobin";
import * as WS from '@/repositories/astrobin/abstractWebservice'

export const GET_TODAY_WS = async (offset, limit) => {
    const body = {
        offset: offset,
        limit: limit,
    } ;

    try {
        const astrobinUrl = WS.buildAstrobinUrl(ENDPOINT, null);
        const config = WS.buildAstrobinQueryParams(body);
        const response = await axiosAstrobin.get(astrobinUrl, config);
        if (200 !== response.status) {
            const error = new Error(response.statusText);
            error.code = response.status;
            throw error;
        }

        if (1 === limit) {
            let iotdResponse = response.data.objects[0];
            return {
                date: iotdResponse.date,
                astrobinImageId: iotdResponse.image.substr(iotdResponse.image.lastIndexOf('/')+1)
            }
        } else {
            let listObjects = response.data.objects;
            return listObjects.map(iotdResponse => {
                return {
                    date: iotdResponse.date,
                    astrobinImageId: iotdResponse.image.substr(iotdResponse.image.lastIndexOf('/')+1)
                }
            });
        }

    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
}