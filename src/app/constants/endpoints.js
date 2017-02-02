// TODO: move base path to app/constants!
import base from '../services/base'

const endpoints = () => {
  const { apiUrl } = base

  const routes = {
    readers: () => apiUrl('readers'),
    currentReader: {
      likedGenres: () => apiUrl('current_reader/liked_genres'),
    }
  }

  return routes
}

export default endpoints()
