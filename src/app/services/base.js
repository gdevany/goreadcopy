/*
  How this works:
  * apiUrl() = /api/landing/
  * apiUrl('genres') = /api/landing/genres
  * apiUrl('genres', { landing: true })) = /api/landing/genres?landing=true
  * apiUrl(null/undefined, { landing: true })) = /api/landing?landing=true
*/
import queryPH from './queryparamsHelper'
import { DEV_ENV } from '../redux/const/envConsts'

export default {
  backendUrl: (path, query) => {
    const backendUrl = DEV_ENV
    return checkUrl(backendUrl, path, query) || backendUrl
  },
  apiUrl: (path, query) => {
    const apiUrl = '/api/landing/'
    return checkUrl(apiUrl, path, query) || apiUrl
  },
  appUrl: (path, query) => {
    const appUrl = '/'
    return checkUrl(appUrl, path, query) || appUrl
  }
}

const checkUrl = (url, path, query) => {
  return (path || query) ? addToUrl(url, path, query) : null
}

const addToUrl = (url, path, query) => {
  if (path) { url = `${url}${path}` }
  if (query) { url = `${url}${queryPH(query)}` }
  return url
}
