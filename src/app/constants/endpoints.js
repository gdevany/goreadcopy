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
      getRecommendedAuthors: (params) => apiUrl('current_reader/recommended/authors', params),
      getBookRecommendations: (params) => apiUrl('current_reader/recommended/books', params),
      getBookClubRecommendations: (params) => {
        return apiUrl('current_reader/recommended/book_clubs', params)
      },
      getCurrentReader: () => apiUrl('current_reader'),
      getAnnouncement: () => apiUrl('/'),
      likedGenres: (params) => apiUrl('current_reader/liked_genres', params),
      likedReaders: (params) => apiUrl('current_reader/liked_readers', params),
      likedAuthors: (params) => apiUrl('current_reader/liked_authors', params),
      uploadImage: (params) => apiUrl('current_reader/images', params),
      getFollowers: (id) => apiUrl(`social/reader/${id}/followers`),
      getFollowed: (id) => apiUrl(`social/reader/${id}/followed`),
      updateLikes: (id) => apiUrl(`social/posts/${id}/likes`),
      updateComments: (id) => apiUrl(`social/posts/${id}/comments`)
    },
    jwtRefresh: () => apiUrl('token/refresh'),
    jwtAuth: () => apiUrl('token/auth'),
    jwtVerify: () => apiUrl('token/verify'),
    redirect: () => apiUrl('onboarding/redirect'),
  }

  return routes
}

export default Endpoints()
