import Env from '../constants/env'
import Storage from './storage'
import Basil from 'basil.js'

// For managing user sessions in sessionstorage;
// does NOT handle redux state for currentReader
const Auth = () => {
  const TOKEN_FIELD = 'authToken'
  const CSRF_TOKEN_FIELD = Env.CSRF_TOKEN_FIELD
  const SESSION_ID_FIELD = Env.SESSION_ID_FIELD

  const setToken = (token) => {
    const cookieSettings = {
      'domain': Env.SESSION_COOKIE_DOMAIN
    }

    if (Env.PRODUCTION_ENV) {
      cookieSettings.secure = true
    }
    return Storage.set(TOKEN_FIELD, token, cookieSettings)
  }

  const token = () => {
    return Storage.get(TOKEN_FIELD) ?
        Storage.get(TOKEN_FIELD) : Basil.cookie.get('goread.' + TOKEN_FIELD)
  }

  const setSessionToken = (token) => {
    const cookieSettings = {
      'domain': Env.SESSION_COOKIE_DOMAIN
    }

    return !Basil.cookie.get(SESSION_ID_FIELD) && token ?
      Basil.cookie.set(SESSION_ID_FIELD, token, cookieSettings) : null
  }

  const setCsrfToken = (token) => {
    const cookieSettings = {
      'domain': Env.SESSION_COOKIE_DOMAIN
    }

    return !Basil.cookie.get(CSRF_TOKEN_FIELD) && token ?
      Basil.cookie.set(CSRF_TOKEN_FIELD, token, cookieSettings) : null
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

  return {
    currentUserExists,
    token,
    csrftoken,
    setToken,
    deleteToken,
    setSessionToken,
    setCsrfToken
  }
}

export default Auth()
