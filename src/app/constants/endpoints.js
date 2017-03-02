import { Paths } from '../services'

const Endpoints = () => {
  const { apiUrl } = Paths
  const routes = {
    books: (params) => apiUrl('onboarding/books', params),
    readers: (params) => apiUrl('onboarding/readers', params),
    readerValidation: (params) => apiUrl('onboarding/readers/check', params),
    getGenres: (params) => apiUrl('genres', params),
    getBooks: (params) => apiUrl('onboarding/books', params),
    searchData: (params) => apiUrl('search', params),
    currentReader: {
      getRecommendation: (params) => apiUrl('genres/top_users', params),
      getBookClubRecommenation: (params) => apiUrl('current_reader/recommended/book_clubs', params),
      getCurrentReader: () => apiUrl('current_reader'),
      likedGenres: (params) => apiUrl('onboarding/current_reader/liked_genres', params),
      likedReaders: (params) => apiUrl('onboarding/current_reader/liked_readers', params),
      likedAuthors: (params) => apiUrl('onboarding/current_reader/liked_authors', params),
    },
    jwtRefresh: () => apiUrl('token/refresh'),
    redirect: () => apiUrl('onboarding/redirect'),
  }

  return routes
}

export default Endpoints()
