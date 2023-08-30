import api from '@/configs/api'

const astrobinQueryParams = {
    api_key: '3524e6ee81749ea19a1ed0f14c5390efb4ac578f', //process.env.VUE_APP_ASTROBIN_API_KEY,
    api_secret: '6f0a67f7aeb93cbce4addec000fca9991876df63', //process.env.VUE_APP_ASTROBIN_API_SECRET,
    format: 'json'
};

const buildAstrobinUrl = (endpoint, params) => {
    return (null === params) ? endpoint : endpoint + '/' + params
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