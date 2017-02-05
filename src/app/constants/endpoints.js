import { Paths } from '../services'

const Endpoints = () => {
  const { apiUrl } = Paths

  const routes = {
    books: () => apiUrl('onboarding/books'),
    readers: (params) => apiUrl('onboarding/readers', params),
    readerValidation: (params) => apiUrl('onboarding/readers/check', params),
    getGenres: (params) => apiUrl('onboarding/genres', params),
    getBooks: (params) => apiUrl('onboarding/books', params),
    currentReader: {
      recommendation: (params) => apiUrl('onboarding/genres/top_users', params),
      likedGenres: (params) => apiUrl('onboarding/current_reader/liked_genres', params),
      likedReaders: (params) => apiUrl('onboarding/current_reader/liked_readers', params),
      likedAuthors: (params) => apiUrl('onboarding/current_reader/liked_authors', params)
    },
    jwtRefresh: () => apiUrl('token/refresh'),
    redirect: () => apiUrl('onboarding/redirect'),
  }

  return routes
}

export default Endpoints()
