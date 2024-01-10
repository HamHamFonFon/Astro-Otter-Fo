const ASTROBIN_HOST = 'https://www.astrobin.com';
const ASTRO_OTTER_HOST = 'https://api.astro-otter.space'

export default {
    API_HOST: ASTRO_OTTER_HOST,
    API_URL: ASTRO_OTTER_HOST + '/v1/',
    ASTROBIN_HOST: ASTROBIN_HOST,
    ASTROBIN_API_URL: ASTROBIN_HOST + '/api/v1/',
    HEADERS: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
