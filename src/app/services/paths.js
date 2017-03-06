/*
  How this works:
  * apiUrl() = /api/landing/
  * apiUrl('genres') = /api/landing/genres
  * apiUrl('genres', { landing: true })) = /api/landing/genres?landing=true
  * apiUrl(null/undefined, { landing: true })) = /api/landing?landing=true
*/
import QueryParams from './queryParams'
import Env from '../constants/env'
import R from 'ramda'

const { asParams } = QueryParams

const Paths = () => {
  const makeUrl = (base, path, query) => {
    const params = query ? asParams(query) : query

    const urlComponents = [
      base,
      path,
      params,
    ]
    const url = R.join('/', R.reject(R.isEmpty, urlComponents))
    return url
  }

  const backendUrl = (path, query) => {
    return makeUrl(Env.REDIRECT_BASE_URL, path, query)
  }

  const apiUrl = (path, query) => {
    // NOTE: API endpoints require an explicit '/' before query params
    const base = `${Env.API_URL}/api`
    return makeUrl(base, path, query)
  }

  return {
    apiUrl,
    backendUrl,
  }
}

export default Paths()
