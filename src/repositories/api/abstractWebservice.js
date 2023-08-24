import apiConfig from '@/configs/api';

const buildApiUrl = (endpoint, params) => {
    let urlApi = apiConfig.API_URL + endpoint;
    return (null === params) ? urlApi : urlApi + '/' + params
}

const buildApiHeaders = (jwtToken, params) => {
    const authorization = {'Authorization': `Basic ${jwtToken}` }
    let headers = (null !== jwtToken) ? { ...apiConfig.HEADERS, ...authorization } : apiConfig.HEADERS;

    return {
        'headers': headers,
        'params': params
    }
}

export default {
    buildApiUrl,
    buildApiHeaders
}