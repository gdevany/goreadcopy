import { Paths } from '../services'

const Endpoints = () => {
  const { apiUrl } = Paths
  const routes = {
    books: (params) => apiUrl('onboarding/books', params),
    readers: (params) => apiUrl('onboarding/readers', params),
    readerValidation: (params) => apiUrl('onboarding/readers/check', params),
    getGenres: (params) => apiUrl('onboarding/genres', params),
    getBooks: (params) => apiUrl('onboarding/books', params),
    currentReader: {
      getRecommendation: (params) => apiUrl('onboarding/genres/top_users', params),
      likedGenres: (params) => apiUrl('onboarding/current_reader/liked_genres', params),
      likedReaders: (params) => apiUrl('onboarding/current_reader/liked_readers', params),
      likedAuthors: (params) => apiUrl('onboarding/current_reader/liked_authors', params),
      searchRecommendation: (params) => apiUrl('onboarding/search', params)
    },
    jwtRefresh: () => apiUrl('token/refresh'),
    redirect: () => apiUrl('onboarding/redirect'),
  }

  return routes
}

export default Endpoints()
