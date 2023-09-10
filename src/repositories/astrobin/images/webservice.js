import { ENDPOINT } from './endpoint'
import axiosAstrobin from "@/services/axiosAstrobin";
import * as WS from '@/repositories/astrobin/abstractWebservice';

export const GET_IMAGES_BY = async (params, offset, limit) => {
    if (20 < limit) {
        const error = new Error('Limit exceed 20 items');
        error.code = 500;
        throw error;
    }

    try {
        let customParams = {
            'offset': offset,
            'limit': limit
        };

        let astrobinUrl = WS.buildAstrobinUrl(ENDPOINT, null);
        console.log({
            ...params,
            ...customParams
        })
        let config = WS.buildAstrobinQueryParams(
            {
                ...params,
                ...customParams
            }
        );

        const response = await axiosAstrobin.get(astrobinUrl, config);
        if (200 !== response.status) {
            const error = new Error(response.statusText);
            error.code = response.status;
            throw error;
        }

        return {
            totalCount: response.data.meta.total_count,
            offset: response.data.meta.offset,
            listImages: response.data.objects.map(image => {
                return {
                    id: image.id,
                    astrobin_id: image.hash ?? image.id,
                    title: image.title,
                    subjects: image.subjects,
                    description: image.description,
                    uploaded: image.uploaded,
                    urlGallery: image.url_gallery,
                    urlThumb: image.url_thumb,
                    urlRegular: image.url_regular,
                    urlHd: image.url_hd,
                    user: image.user,
                    urlHistogram: image.url_histogram,
                    urlSkyplot: image.url_skyplot,
                    urlSkyplotAdvanced: image.url_advanced_skyplot_small,
                    views: image.views,
                    likes: image.likes
                }
            })
        };
    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
}