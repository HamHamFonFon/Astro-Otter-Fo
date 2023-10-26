import { endpoint } from './endpoint'
import axiosAstrobin from "@/services/axiosAstrobin";
import * as WS from '@/repositories/astrobin/abstractWebservice';

export const GET_IMAGE_BY_ID = async (idImage) => {
    if ('' === idImage || null === idImage) {
        const error = new Error('No Astrobin image identifier provided, please fill it one');
        error.code = 500;
        throw error;
    }

    try {
        let astrobinUrl = WS.buildAstrobinUrl(endpoint, idImage);
        let config = WS.buildAstrobinQueryParams(null);
        const response = await axiosAstrobin.get(astrobinUrl, config);

        if (200 !== response.status) {
            const error = new Error(response.statusText);
            error.code = response.status;
            throw error;
        }

        return {
            id: response.data.id,
            astrobin_id: response.data.hash  ??  response.data.id,
            // DATA
            title: response.data.title,
            subjects: response.data.subjects,
            description: response.data.description,
            user: response.data.user,
            views: response.data.views,
            likes: response.data.likes,
            // URL
            uploaded: response.data.uploaded,
            urlGallery: response.data.url_gallery,
            urlThumb: response.data.url_thumb,
            urlRegular: response.data.url_regular,
            urlHd: response.data.url_hd,
            urlHdSolution: response.data.url_solution ?? response.data.url_hd,
            // details
            urlHistogram: response.data.url_histogram,
            urlSkyplot: response.data.url_skyplot,
            urlSkyplotAdvanced: response.data.url_advanced_skyplot_small,
            ra: response.data.ra,
            dec: response.data.dec,
            scale: response.data.pixscale,
            radius: response.data.radius,
            orientation: response.data.orientation
        }

    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
}