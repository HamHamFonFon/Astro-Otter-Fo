const MERCURE_HOST = process.env.VUE_APP_MERCURE_HOST;
const MERCURE_TOPIC= 'notifications/dso'

export const mercureConfig = {
  url: MERCURE_HOST,
  topic: MERCURE_TOPIC
}
