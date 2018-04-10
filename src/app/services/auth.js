import Env from '../constants/env'
import Storage from './storage'
import Basil from 'basil.js'

// For managing user sessions in sessionstorage;
// does NOT handle redux state for currentReader
const Auth = () => {
  const TOKEN_FIELD = 'authToken'
  const CSRF_TOKEN_FIELD = Env.CSRF_TOKEN_FIELD
  const SESSION_ID_FIELD = Env.SESSION_ID_FIELD
  const SESSION_DATA_FIELD = 'sessionData'

  const cookieSettings = (isSecure) => {
    const defaultSettings = {
      'domain': Env.SESSION_COOKIE_DOMAIN
    }
    if (isSecure) { defaultSettings.secure = true }
    return defaultSettings
  }

  const setToken = (token) => {
    return Storage.set(TOKEN_FIELD, token, cookieSettings(Env.PRODUCTION_ENV))
  }

  const token = () => {
    return Storage.get(TOKEN_FIELD) ?
        Storage.get(TOKEN_FIELD) : Basil.cookie.get('goread.' + TOKEN_FIELD)
  }

  const setSessionToken = (token) => {
    return !Basil.cookie.get(SESSION_ID_FIELD) && token ?
      Basil.cookie.set(SESSION_ID_FIELD, token, cookieSettings(false)) : null
  }

  const setCsrfToken = (token) => {
    return !Basil.cookie.get(CSRF_TOKEN_FIELD) && token ?
      Basil.cookie.set(CSRF_TOKEN_FIELD, token, cookieSettings(false)) : null
  }

  const csrftoken = () => {
    return Basil.cookie.get(CSRF_TOKEN_FIELD)
  }

  const deleteToken = () => {
    Storage.remove(TOKEN_FIELD)
    Basil.cookie.remove(CSRF_TOKEN_FIELD)
    Basil.cookie.remove(SESSION_ID_FIELD)
  }

  const currentUserExists = () => !!token()

  const setSessionData = (payload) => {
    return !Basil.cookie.get(SESSION_DATA_FIELD) && payload ?
      Basil.cookie.set(SESSION_DATA_FIELD, JSON.stringify(payload), cookieSettings(false)) : null
  }

  const getSessionData = () => {
    const data = Basil.cookie.get(SESSION_DATA_FIELD)
    return data ? JSON.parse(data) : null
  }

  return {
    currentUserExists,
    token,
    csrftoken,
    setToken,
    deleteToken,
    setSessionToken,
    setCsrfToken,
    setSessionData,
    getSessionData,
  }
}

export default Auth()
