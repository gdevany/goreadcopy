import { Paths } from '../services'

const Endpoints = () => {
  const { apiUrl } = Paths
  const routes = {
    timesRendered: () => apiUrl('views/home_rendered_times'),
    books: (params) => apiUrl('onboarding/books', params),
    readers: (params) => apiUrl('onboarding/readers', params),
    readerValidation: (params) => apiUrl('onboarding/readers/check', params),
    getGenres: (params) => apiUrl('genres', params),
    getOnboardingGenres: (params) => apiUrl('onboarding/genres', params),
    getHomeGenres: (params) => apiUrl('onboarding/genres/home', params),
    getBooks: (params) => apiUrl('onboarding/books', params),
    searchData: (params) => apiUrl('search', params),
    searchBooksData: (params) => apiUrl('books/library_search', params),
    getProfilePage: (slug, params) => apiUrl(`social/reader/${slug}`, params),
    getProfileTiles: (id, params) => apiUrl(`social/reader/${id}/profile_activities`, params),
    getComments: (id) => apiUrl(`activities/${id}/comments`),
    updateComments: (id) => apiUrl(`social/posts/${id}/comments`),
    updateLikes: (id) => apiUrl(`social/posts/${id}/likes`),
    getSidebarAds: (slug, params) => apiUrl('advertising/get_sidebar_ads'),
    shareTile: (id) => apiUrl(`social/posts/${id}/shares`),
    currentlyReading: (id) => apiUrl(`social/reader/${id}/currently_reading`),
    getTopBooks: (id) => apiUrl(`social/reader/${id}/top_books`),
    getLibrary: (id, params) => apiUrl(`social/reader/${id}/library`, params),
    getCurrentWishList: (id) => apiUrl(`social/reader/${id}/wish_list`),
    libraryUpload: (params) => apiUrl('current_reader/import_library'),
    sharePost: (id) => apiUrl(`social/posts/${id}/shares`),
    shareBook: (id) => apiUrl(`books/${id}/share`),
    getSocialAccounts: () => apiUrl('socialaccounts'),
    selectSocialAccount: () => apiUrl('socialaccounts/select_account'),
    unSelectSocialAccount: (params) => apiUrl('socialaccounts/unselect_account', params),
    getCountries: () => apiUrl('forms/countries'),
    getStates: (id) => apiUrl(`forms/${id}/states`),
    filterBooks: (params) => apiUrl('books', params),
    requestBookClubMembership: () => apiUrl('book_clubs/member_request'),
    editTile: (id) => apiUrl(`activities/${id}/edit_statuspost_tile`),
    deleteTile: (id) => apiUrl(`activities/${id}`),
    currentReader: {
      getRecommendation: (params) => apiUrl('genres/top_users', params),
      getOnboardingRecommendation: (params) => apiUrl('onboarding/genres/top_users', params),
      getRecommendedAuthors: (params) => apiUrl('current_reader/recommended/authors', params),
      getBookRecommendations: (params) => apiUrl('current_reader/recommended/books', params),
      getBookClubRecommendations: (params) => {
        return apiUrl('current_reader/recommended/book_clubs', params)
      },
      getCurrentReader: () => apiUrl('current_reader'),
      usePlatformAs: () => apiUrl('current_reader/publishing_as'),
      updateReader: () => apiUrl('current_reader/profile/update'),
      updateShippingAddress: () => apiUrl('current_reader/shipping_address/change'),
      updateLibrary: (params) => apiUrl('current_reader/update_library', params),
      deleteTopBooks: (params) => apiUrl('current_reader/top_books', params),
      updateTopBooks: () => apiUrl('current_reader/top_books'),
      setCurrentlyReading: () => apiUrl('current_reader/currently_reading'),
      updateCurrentWishList: (params) => apiUrl('current_reader/wish_list', params),
      deleteSocialAccount: (id) => apiUrl(`socialaccounts/${id}`),
      getLatestAnnouncement: () => apiUrl('current_reader/latest_announcement'),
      dismissAnnouncement: (params) => apiUrl('current_reader/dismiss_announcement', params),
      getReadFeedTiles: (params) => apiUrl('current_reader/activities', params),
      likedGenres: (params) => apiUrl('current_reader/liked_genres', params),
      likedReaders: (params) => apiUrl('current_reader/liked_readers', params),
      likedAuthors: (params) => apiUrl('current_reader/liked_authors', params),
      fanBooks: (params) => apiUrl('current_reader/fan_books', params),
      uploadImage: (params) => apiUrl('current_reader/images', params),
      getFollowers: (id) => apiUrl(`social/reader/${id}/followers`),
      getFetchFollowers: (id, params) => apiUrl(`social/reader/${id}/followers`, params),
      getFollowed: (id) => apiUrl(`social/reader/${id}/followed`),
      getFetchFollowed: (id, params) => apiUrl(`social/reader/${id}/followed`, params),
      updateReadFeedLikes: (id) => apiUrl(`social/posts/${id}/likes`),
      updateReadFeedComments: (id) => apiUrl(`social/posts/${id}/comments`),
      getReadFeedComments: (id) => apiUrl(`activities/${id}/comments`),
      postMessage: (params) => apiUrl('current_reader/posts', params),
      logoutCurrentReader: () => apiUrl('current_reader/logout'),
      getChatContacts: () => apiUrl('current_reader/chat/contacts'),
      getChatMessages: () => apiUrl('current_reader/chat/messages'),
      getChatConversation: (params) => apiUrl('current_reader/chat/conversation', params),
      postChatMessage: () => apiUrl('current_reader/chat/message'),
      updateReadConversation: (params) => apiUrl('current_reader/chat/conversation/read', params),
      sendHeartbeat: (params) => apiUrl('current_reader/chat/heartbeat', params),
      getNotifications: () => apiUrl('current_reader/notifications'),
      readNotifications: () => apiUrl('current_reader/notifications/read'),
      dismissNotification: (params) => apiUrl('current_reader/notifications/dismiss', params),
      dismissAllNotifications: () => apiUrl('current_reader/notifications/dismiss_all'),
      resetPassword: (params) => apiUrl('readers/reset_password', params),
    },
    store: {
      getBestSellers: (params) => apiUrl('store/best_seller_books', params),
      getCategories: (params) => apiUrl('store/categories', params),
      getChildCategories: (id, params) => apiUrl(`store/${id}/child_categories`, params),
      getTrendingBooks: (params) => apiUrl('store/trending_books', params),
      getMostPurchased: (params) => apiUrl('store/friends_most_purchased', params),
      getRecommendedByAuthorFans: (params) => apiUrl('store/recommended/books/author_fans', params),
      getBookInfo: (id) => apiUrl(`books/${id}`),
      validateCategory: (id) => apiUrl(`store/${id}/validate_category`),
      addBookToCart: (id) => apiUrl(`store/${id}/add_book_to_cart`),
      getCartItems: (params) => apiUrl('store/cart', params),
      updateCartItems:
        (id, quantity) => apiUrl(`store/cart/${id}/update_item_quantity/${quantity}`),
      removeItemFromCart: (id) => apiUrl(`store/cart/${id}/remove_item`),
      convertToGift: (id) => apiUrl(`store/cart/${id}/convert_item_to_gift`),
      addGiftData: (params) => apiUrl('store/cart/gift_item_data', params),
      setUserAddress: (params) => apiUrl('store/cart/user_address', params),
      setOrder: (params) => apiUrl('store/order', params),
      getOrders: (params) => apiUrl('store/order', params),
      getShippingMethods: () => apiUrl('store/shipping_methods'),
      setShipping: (params) => apiUrl('store/order/shipping', params),
      getCurrentOrder: (params) => apiUrl('store/order/current', fparams),
      setBilling: (params) => apiUrl('store/order/billing', params),
      placeOrder: (params) => apiUrl('store/order/place', params),
      reviewOrder: (params) => apiUrl('store/order/review', params),
      getPaypalConfig: () => apiUrl('store/order/paypal/configuration'),
      setPromoCode: (id, params) => apiUrl(`store/order/${id}/apply_code`, params),
      cleanPromoCode: (id, params) => apiUrl(`store/order/${id}/clean_code`, params),
    },
    rates: {
      getStarsInfo: (modelName, id) => apiUrl(`rate/${modelName}/${id}/stars`),
      getRates: (modelName, id) => apiUrl(`rate/${modelName}/${id}/all`),
      postRate: (modelName, params) => apiUrl(`rate/${modelName}`, params),
    },
    jwtRefresh: () => apiUrl('token/refresh'),
    jwtAuth: () => apiUrl('token/auth'),
    jwtVerify: () => apiUrl('token/verify'),
    redirect: () => apiUrl('onboarding/redirect'),
  }

  return routes
}

export default Endpoints()
