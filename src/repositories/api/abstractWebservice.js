import apiConfig from '@/configs/api';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Method': ' GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization, X-Requested-With, Authorization'
};

const buildApiHeaders = (customHeaders, queryParams) => {
    return {
        'headers': {
            ...apiConfig.HEADERS,
            ...corsHeaders,
            ...customHeaders
        },
        'params': queryParams,
    }
}

export {
    buildApiHeaders
}