const MERCURE_HOST = process.env.VUE_APP_MERCURE_HOST;
const MERCURE_TOPIC= 'notifications/all'

export const mercureConfig = {
  url: MERCURE_HOST,
  topic: MERCURE_TOPIC
}
