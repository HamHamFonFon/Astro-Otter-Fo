const MERCURE_HOST = process.env.VUE_APP_MERCURE_HOST;
const domain = 'https://api.astro-otter.space';
const MERCURE_TOPIC= 'notifications/all'

export const mercureConfig = {
  url: MERCURE_HOST,
  topic: `${domain}/${MERCURE_TOPIC}`
}
