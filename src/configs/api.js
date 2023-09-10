const ASTROBIN_HOST = 'https://www.astrobin.com';
const ASTRO_OTTER_HOST = 'https://astro-otter.space'
export default {
    API_URL: ASTRO_OTTER_HOST + '/api/',
    ASTROBIN_HOST: ASTROBIN_HOST,
    ASTROBIN_API_URL: ASTROBIN_HOST + '/api/v1/',
    HEADERS: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    HEADERS_CORS: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': ' GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization, X-Requested-With, Authorization'
    }
};