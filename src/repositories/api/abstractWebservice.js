import apiConfig from '@/configs/api';

const buildApiHeaders = (customHeaders, queryParams, othersConfig) => {
    return {
        'headers': {
            ...apiConfig.HEADERS,
            ...customHeaders
        },
        'params': queryParams,
        ...othersConfig
    }
}

export {
    buildApiHeaders
}
