export default {
  API_URL: process.env.API_URL,
  REDIRECT_BASE_URL: process.env.REDIRECT_BASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  PRODUCTION_ENV: process.env.NODE_ENV === 'production'
}
