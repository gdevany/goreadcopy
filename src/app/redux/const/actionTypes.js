export const BOOKS = {
  GET_BOOKS: 'GET_BOOKS',
  GET_BOOKS_SUCCESS: 'GET_BOOKS_SUCCESS',
}

export const READERS = { // for /readers
  UPDATE_READER_DATA: 'UPDATE_READER_DATA',
  CREATE_READER: 'CREATE_READER',
  CREATE_READER_SUCCESS: 'CREATE_READER_SUCCESS',
  CHECK_READER_VALIDATION: 'CHECK_READER_VALIDATION',
  UPDATE_READER_ERRORS: 'UPDATE_READER_ERRORS',
  GET_PROFILE_TILES: 'GET_PROFILE_TILES',
  LOCK_PROFILE: 'LOCK_PROFILE',
  EMPTY_TILES: 'EMPTY_TILES',
  PREPEND_PROFILE_TILE: 'PREPEND_PROFILE_TILE',
  GET_COMMENTS: 'GET_COMMENTS',
  UPDATE_COMMENTS: 'UPDATE_COMMENTS',
  UPDATE_LIKES: 'UPDATE_LIKES',
  UPDATE_PROFILE_TILE: 'UPDATE_PROFILE_TILE',
  UPDATE_READFEED_TILE: 'UPDATE_READFEED_TILE',
}

export const REDIRECTS = {
  INCOMING_REDIRECT: 'INCOMING_REDIRECT',
}

export const CURRENT_READER = { // for /current_reader
  GET_RECOMMENDATION: 'GET_RECOMMENDATION',
  CHOSE_RECOMMENDATION: 'CHOSE_RECOMMENDATION',
  CREATE_CHOSEN_GENRES: 'CREATE_CHOSEN_GENRES',
  SET_CURRENT_READER: 'SET_CURRENT_READER',
  UNSET_CURRENT_READER: 'UNSET_CURRENT_READER',
  REFRESH_CURRENT_READER: 'REFRESH_CURRENT_READER',
  REMOVE_FOLLOWED_AUTHORS: 'REMOVE_FOLLOWED_AUTHORS',
  REMOVE_FOLLOWED_READERS: 'REMOVE_FOLLOWED_READERS',
  UPDATE_LITCOIN_BALANCE: 'UPDATE_LITCOIN_BALANCE',
  UPDATE_SELECTED: 'UPDATE_SELECTED',
  GET_FOLLOWERS: 'GET_FOLLOWERS',
  GET_FETCH_FOLLOWERS: 'GET_FETCH_FOLLOWERS',
  FETCH_FOLLOWERS: 'FETCH_FOLLOWERS',
  GET_FOLLOWED: 'GET_FOLLOWED',
  GET_FETCH_FOLLOWED: 'GET_FETCH_FOLLOWED',
  FETCH_FOLLOWED: 'FETCH_FOLLOWED',
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  UPDATE_CURRENT_READER_RECOMMENDATION: 'UPDATE_CURRENT_READER_RECOMMENDATION',
  UPDATE_CURRENT_READER_DATA: 'UPDATE_CURRENT_READER_DATA',
  UPDATE_FOLLOWED_AUTHORS: 'UPDATE_FOLLOWED_AUTHORS',
  UPDATE_FOLLOWED_READERS: 'UPDATE_FOLLOWED_READERS',
  UPDATE_SHARES: 'UPDATE_SHARES',
  GET_LATEST_ANNOUNCEMENT: 'GET_LATEST_ANNOUNCEMENT',
  GET_READFEED_TILES: 'GET_READFEED_TILES',
  LOCK_READFEED: 'LOCK_READFEED',
  PREPEND_READFEED_TILE: 'PREPEND_READFEED_TILE',
  UPDATE_SOCIAL_ACCOUNTS: 'UPDATE_SOCIAL_ACCOUNTS',
  USER_LOGOUT: 'USER_LOGOUT',
}

export const PROFILE_PAGE = {
  FETCH_LIBRARY: 'FETCH_LIBRARY',
  GET_PROFILE_PAGE: 'GET_PROFILE_PAGE',
  UPDATE_LIBRARY: 'UPDATE_LIBRARY',
  ADD_TO_LIBRARY: 'ADD_TO_LIBRARY',
  REMOVE_FROM_LIBRARY: 'REMOVE_FROM_LIBRARY',
  GET_CURRENTLY_READING: 'GET_CURRENTLY_READING',
  GET_LIBRARY: 'GET_LIBRARY',
  GET_TOP_BOOKS: 'GET_TOP_BOOKS',
  GET_WISH_LIST: 'GET_WISH_LIST',
}

export const STORE = {
  GET_BEST_SELLERS: 'GET_BEST_SELLERS',
  GET_CATEGORIES: 'GET_CATEGORIES',
  GET_POPULAR_CATEGORIES: 'GET_POPULAR_CATEGORIES',
  GET_MERGE_CATEGORIES: 'GET_MERGE_CATEGORIES',
  GET_MERGE_CHILD_CATEGORIES: 'GET_MERGE_CHILD_CATEGORIES',
  GET_CHILD_CATEGORIES: 'GET_CHILD_CATEGORIES',
  GET_MOST_PURCHASED: 'GET_MOST_PURCHASED',
  GET_RECOMMENDED_BY_AUTHOR_FANS: 'GET_RECOMMENDED_BY_AUTHOR_FANS',
  GET_NEWEST_BOOKS: 'GET_NEWEST_BOOKS',
  GET_TRENDING_BOOKS: 'GET_TRENDING_BOOKS',
  GET_BOOK_INFO: 'GET_BOOK_INFO',
  GET_FILTERED_BOOKS: 'GET_FILTERED_BOOKS',
  ADD_TO_CART: 'ADD_TO_CART',
  GET_CART_ITEMS: 'GET_CART_ITEMS',
  REMOVE_CART_ITEMS: 'REMOVE_CART_ITEMS',
  SET_ORDER: 'SET_ORDER',
  SET_NEW_SHIPPING: 'SET_NEW_SHIPPING',
  GET_SHIPPING_METHODS: 'GET_SHIPPING_METHODS',
  GET_PAYPAL_CONFIG: 'GET_PAYPAL_CONFIG',
}

export const RATES = {
  GET_STARS_INFO: 'GET_STARS_INFO',
  GET_RATES: 'GET_RATES',
  PREPEND_REVIEW: 'PREPEND_REVIEW',
}

export const SEARCH = {
  GET_SEARCH: 'GET_SEARCH',
  SEARCH_BOOKS: 'SEARCH_BOOKS',
  REMOVE_FROM_BOOK_SEARCH: 'REMOVE_FROM_BOOK_SEARCH',
}

export const CHAT = {
  GET_CHAT_CONTACTS: 'GET_CHAT_CONTACTS',
  OPEN_CHAT_CONVERSATION: 'OPEN_CHAT_CONVERSATION',
  CLOSE_CHAT_CONVERSATION: 'CLOSE_CHAT_CONVERSATION',
  LOAD_CHAT_CONVERSATION: 'LOAD_CHAT_CONVERSATION',
  UPDATE_ONLINE_STATUS: 'UPDATE_ONLINE_STATUS',
  UPDATE_CONTACT_UNREAD_MESSAGES: 'UPDATE_CONTACT_UNREAD_MESSAGES',
  APPEND_RECEIVED_CHAT_MESSAGE: 'APPEND_RECEIVED_CHAT_MESSAGE',
  APPEND_SENT_CHAT_MESSAGE: 'APPEND_SENT_CHAT_MESSAGE',
  UPDATE_READ_CONVERSATION_STATUS: 'UPDATE_READ_CONVERSATION_STATUS',
  TOGGLE_MESSAGES_POPUP: 'TOGGLE_MESSAGES_POPUP',
  TOGGLE_CONTACTS_POPUP: 'TOGGLE_CONTACTS_POPUP',
  TOGGLE_CHAT_WINDOW: 'TOGGLE_CHAT_WINDOW',
  SET_CHAT_WINDOW: 'SET_CHAT_WINDOW',
}

export const NOTIFICATIONS = {
  LOAD_NOTIFICATIONS: 'LOAD_NOTIFICATIONS',
  RESET_NOTIFICATION_COUNT: 'RESET_NOTIFICATION_COUNT',
  UPDATE_UNREAD_NOTIFICATIONS: 'UPDATE_UNREAD_NOTIFICATIONS',
  DISMISS_NOTIFICATION: 'DISMISS_NOTIFICATION',
  DISMISS_ALL_NOTIFICATION: 'DISMISS_ALL_NOTIFICATION',
  PREPEND_RECEIVED_NOTIFICATION: 'PREPEND_RECEIVED_NOTIFICATION',
  TOGGLE_OPTIONS_MENU: 'TOGGLE_OPTIONS_MENU',
  TOGGLE_FOLLOW_BACK: 'TOGGLE_FOLLOW_BACK',
  SEND_BOOKCLUB_ACTION: 'SEND_BOOKCLUB_ACTION',
  SET_REQUESTING_STATE: 'SET_REQUESTING_STATE',
}

export default {
  BOOKS,
  CHAT,
  CURRENT_READER,
  GET_GENRES: 'GET_GENRES',
  GET_SIDEBAR_ADS: 'GET_SIDEBAR_ADS',
  PROFILE_PAGE,
  READERS,
  SEARCH,
  STORE,
  RATES,
  NOTIFICATIONS,
}
