import apiConfig from '@/configs/api';

const customHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Method': ' GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
};

const buildApiHeaders = (queryParams) => {
    return {
        'headers': {
            ...apiConfig.HEADERS,
            ...customHeaders
        },
        'params': queryParams,
    }
}

export {
    buildApiHeaders
}