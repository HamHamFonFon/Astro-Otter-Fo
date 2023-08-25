import apiConfig from '@/configs/api';

// const buildApiUrl = (endpoint, params) => {
//     let urlApi = apiConfig.API_URL + endpoint;
//     return (null === params) ? urlApi : urlApi + '/' + params
// }

const buildApiHeaders = (params) => {
    return {
        'headers': apiConfig.HEADERS,
        'params': params
    }
}

export {
    // buildApiUrl,
    buildApiHeaders
}