// TODO: move base path to app/constants!
import base from '../services/base'

const endpoints = () => {
  const { apiUrl } = base

  const routes = {
    readers: (params) => apiUrl('readers', params),
    readerValidation: (params) => apiUrl('readers/check', params),
    getGenres: (params) => apiUrl('genres', params),
    getBooks: (params) => apiUrl('books', params),
    currentReader: {
      recommendation: (params) => apiUrl('genres/top_users', params),
      likedGenres: (params) => apiUrl('current_reader/liked_genres', params),
      likedReaders: (params) => apiUrl('current_reader/liked_readers', params),
      likedAuthors: (params) => apiUrl('current_reader/liked_authors', params)
    }
  }

  return routes
}

export default endpoints()
