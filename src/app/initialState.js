const emptyState = (state = {}) => {
  return {
    ...state,
    errors: {}
  }
}

const baseResults = {
  count: 0,
  perPage: 5,
  page: 1,
  results: [],
}

export default {
  genres: [],
  recommended: [],
  search: emptyState(),
  books: emptyState({ payload: [] }),
  readerData: emptyState(),
  currentReader: emptyState(),
  litcoins: emptyState(),
  profilePage: {
    wishList: [],
  },
  social: emptyState(),
  tiles: emptyState(),
  sidebarAds: emptyState(),
  store: {
    categories: [],
    popularCategories: [],
    recommendedByAuthorFans: baseResults,
    trendingBooks: baseResults,
    mostPurchased: baseResults,
    bestSellers: baseResults,
    cartItems: {
      id: 0,
      user: 0,
      items: [],
      contenType: 'cart',
      totalPrice: 0,
      subtotalPrice: 0,
      itemsCount: 0,
    }
  },
  rates: {
    bookRates: [],
    stars: [],
  },
  chat: emptyState({
    conversations: [],
    isMessagesOpen: false,
    isContactsOpen: false,
  }),
  notifications: emptyState(),
  common: emptyState({
    alerts: {},
  }),
  session: {},
}
