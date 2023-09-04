import apiConfig from '@/configs/api';

const customHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Method': ' GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
};

const buildApiHeaders = (params) => {
    return {
        'headers': {
            ...apiConfig.HEADERS,
            ...customHeaders
        },
        'params': params
    }
}

export {
    buildApiHeaders
}