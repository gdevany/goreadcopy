const emptyState = (state = {}) => {
  return {
    ...state,
    errors: {}
  }
}

export default {
  genres: [],
  recommended: [],
  search: emptyState(),
  books: emptyState({ payload: [] }),
  readerData: emptyState(),
  currentReader: emptyState(),
  litcoins: emptyState(),
  profilePage: emptyState(),
  social: emptyState(),
  tiles: emptyState(),
  sidebarAds: emptyState(),
  store: emptyState(),
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
}
