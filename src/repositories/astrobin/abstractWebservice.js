import api from '@/configs/api'

const astrobinQueryParams = {
    api_key: process.env.VUE_APP_ASTROBIN_API_KEY,
    api_secret: process.env.VUE_APP_ASTROBIN_API_SECRET,
    format: 'json'
};

const buildAstrobinUrl = (endpoint, params) => {
    let common_url_part =  + endpoint
    return (null === params) ? common_url_part : common_url_part + '/' + params
};

const buildAstrobinQueryParams = (customParams) => {
    if (!astrobinQueryParams.api_key || !astrobinQueryParams.api_secret) {
        const error = new Error('Astrobin API keys are missing');
        error.code = 500;
        throw error;
    }

    return {
        'headers': api.HEADERS,
        'params': {
            ...astrobinQueryParams,
            ...customParams
        }
    }
};

export {
    buildAstrobinUrl,
    buildAstrobinQueryParams
}