import Storage from './storage'
import Basil from 'basil.js'

// For managing user sessions in sessionstorage;
// does NOT handle redux state for currentReader
const Auth = () => {
  const TOKEN_FIELD = 'authToken'
  const CSRF_TOKEN_FIELD = 'csrftoken'

  const setToken = (token) => {
    return Storage.set(TOKEN_FIELD, token)
  }

  const token = () => {
    return Storage.get(TOKEN_FIELD)
  }

  const csrftoken = () => {
    return Basil.cookie.get(CSRF_TOKEN_FIELD)
  }

  const deleteToken = () => {
    Storage.remove(TOKEN_FIELD)
  }

  const currentUserExists = () => !!token()

  return {
    currentUserExists,
    token,
    csrftoken,
    setToken,
    deleteToken,
  }
}

export default Auth()
