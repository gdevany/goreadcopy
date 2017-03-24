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
    getProfilePage: (slug, params) => apiUrl(`social/reader/${slug}`, params),
    getProfileTiles: (id) => apiUrl(`social/reader/${id}/profile_activities`),
    getComments: (id) => apiUrl(`activities/${id}/comments`),
    updateComments: (id) => apiUrl(`social/posts/${id}/comments`),
    updateLikes: (id) => apiUrl(`social/posts/${id}/likes`),
    getSidebarAds: (slug, params) => apiUrl('advertising/get_sidebar_ads'),
    shareTile: (id) => apiUrl(`social/posts/${id}/shares`),
    currentReader: {
      getRecommendation: (params) => apiUrl('genres/top_users', params),
      getRecommendedAuthors: (params) => apiUrl('current_reader/recommended/authors', params),
      getBookRecommendations: (params) => apiUrl('current_reader/recommended/books', params),
      getBookClubRecommendations: (params) => {
        return apiUrl('current_reader/recommended/book_clubs', params)
      },
      getCurrentReader: () => apiUrl('current_reader'),
      usePlatformAs: () => apiUrl('current_reader/publishing_as'),
      getLatestAnnouncement: () => apiUrl('current_reader/latest_announcement'),
      dismissAnnouncement: (params) => apiUrl('current_reader/dismiss_announcement', params),
      getReadFeedTiles: () => apiUrl('current_reader/activities'),
      likedGenres: (params) => apiUrl('current_reader/liked_genres', params),
      likedReaders: (params) => apiUrl('current_reader/liked_readers', params),
      likedAuthors: (params) => apiUrl('current_reader/liked_authors', params),
      uploadImage: (params) => apiUrl('current_reader/images', params),
      getFollowers: (id) => apiUrl(`social/reader/${id}/followers`),
      getFollowed: (id) => apiUrl(`social/reader/${id}/followed`),
      updateReadFeedLikes: (id) => apiUrl(`social/posts/${id}/likes`),
      updateReadFeedComments: (id) => apiUrl(`social/posts/${id}/comments`),
      getReadFeedComments: (id) => apiUrl(`activities/${id}/comments`),
      postMessage: (params) => apiUrl('current_reader/posts', params),
      logoutCurrentReader: () => apiUrl('current_reader/logout'),
    },
    jwtRefresh: () => apiUrl('token/refresh'),
    jwtAuth: () => apiUrl('token/auth'),
    jwtVerify: () => apiUrl('token/verify'),
    redirect: () => apiUrl('onboarding/redirect'),
  }

  return routes
}

export default Endpoints()
