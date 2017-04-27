export default {
  API_URL: process.env.API_URL,
  REDIRECT_BASE_URL: process.env.REDIRECT_BASE_URL,
  SOCKET_URL: process.env.SOCKET_URL,
  NODE_ENV: process.env.NODE_ENV,
  PRODUCTION_ENV: process.env.NODE_ENV === 'production',
  SESSION_COOKIE_DOMAIN: process.env.SESSION_COOKIE_DOMAIN,
  CSRF_TOKEN_FIELD: 'csrftoken',
  SESSION_ID_FIELD: 'sessionid',
}
