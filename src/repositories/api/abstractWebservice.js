import apiConfig from '@/configs/api';

const buildApiHeaders = (customHeaders, queryParams) => {
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