import axios from 'axios'
import Auth from './auth'

const Http = () => {
  const authHeaders = (token) => {
    return {
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  const authenticated = () => {
    const token = Auth.token()
    const headers = authHeaders(token)
    return axios.create({ headers })
  }

  // const http = () => {
  //   const headers = {
  //     'Access-Control-Allow-Origin': '*',
  //   }
  //   return axios.create({ headers })
  // }

  return {
    ...axios,
    authenticated,
  }
}

export default Http()
