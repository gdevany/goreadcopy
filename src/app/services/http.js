import axios from 'axios'
import Auth from './auth'

const Http = () => {
  const authHeaders = (token) => {

    const csrftoken = Auth.csrftoken()

    const headers = {
      'Authorization': `Bearer ${token}`,
    }

    if (csrftoken) {
      headers['X-CSRFToken'] = csrftoken
    }

    return headers
  }

  const authenticated = () => {
    const token = Auth.token()
    const headers = authHeaders(token)
    return axios.create({ headers })
  }

  return {
    ...axios,
    authenticated,
  }
}

export default Http()
