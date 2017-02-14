/*
  How this works:
  * apiUrl() = /api/landing/
  * apiUrl('genres') = /api/landing/genres
  * apiUrl('genres', { landing: true })) = /api/landing/genres?landing=true
  * apiUrl(null/undefined, { landing: true })) = /api/landing?landing=true
*/
import QueryParams from './queryParams'
import Env from '../constants/env'

const { asParams } = QueryParams

const Paths = () => {
  const checkUrl = (url, path, query) => {
    return (path || query) ? addToUrl(url, path, query) : null
  }

  const addToUrl = (url, path, query) => {
    if (path) { url = `${url}${path}` }
    if (query) { url = `${url}${asParams(query)}` }
    return url
  }

  const backendUrl = (path, query) => {
    const backendUrl = Env.REDIRECT_BASE_URL
    const fullPath = `${backendUrl}/${path}`
    return query ? `${fullPath}${asParams(query)}` : `${fullPath}/`
  }

  const apiUrl = (path, query) => {
    const apiUrl = `${Env.API_URL}/api`
    const fullPath = `${apiUrl}/${path}`
    return query ? `${fullPath}${asParams(query)}` : `${fullPath}/`
  }

  const appUrl = (path, query) => {
    const appUrl = '/'
    return checkUrl(appUrl, path, query) || appUrl
  }

  return {
    apiUrl,
    appUrl,
    backendUrl,
  }
}

export default Paths()
