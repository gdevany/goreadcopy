export const BOOKS = {
  GET_BOOKS: 'GET_BOOKS',
  GET_BOOKS_SUCCESS: 'GET_BOOKS_SUCCESS',
  GET_BEST_SELLERS: 'GET_BEST_SELLERS',
  GET_BEST_SELLERS_PENDING: 'GET_BEST_SELLERS_PENDING',
  GET_BEST_SELLERS_FULFILLED: 'GET_BEST_SELLERS_FULFILLED',
  RESET_BEST_SELLERS: 'RESET_BEST_SELLERS',
  GET_NEW_RELEASES: 'GET_NEW_RELEASES',
  GET_NEW_RELEASES_PENDING: 'GET_NEW_RELEASES_PENDING',
  GET_NEW_RELEASES_FULFILLED: 'GET_NEW_RELEASES_FULFILLED',
  RESET_NEW_RELEASES: 'RESET_NEW_RELEASES',
};

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
  REMOVE_FOLLOWED_BOOKS: 'REMOVE_FOLLOWED_BOOKS',
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
  UPDATE_FOLLOWED_BOOKS: 'UPDATE_FOLLOWED_BOOKS',
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
  PLACE_ORDER: 'PLACE_ORDER',
  SET_NEW_SHIPPING: 'SET_NEW_SHIPPING',
  GET_SHIPPING_METHODS: 'GET_SHIPPING_METHODS',
  GET_PAYPAL_CONFIG: 'GET_PAYPAL_CONFIG',
  SET_PROMO_CODE: 'SET_PROMO_CODE',
  CLEAN_PROMO_CODE: 'CLEAN_PROMO_CODE',
  SET_GIFT_SHIPPING: 'SET_GIFT_SHIPPING',
  GET_ORDERS: 'GET_ORDERS',
  CLEAN_ORDER_AND_CART: 'CLEAN_ORDER_AND_CART',
  HAS_REVIEWED: 'HAS_REVIEWED',
  SET_USING_LITCOINS: 'SET_USING_LITCOINS',
  GET_SOLD_BOOKS: 'GET_SOLD_BOOKS',
}

export const RATES = {
  GET_STARS_INFO: 'GET_STARS_INFO',
  GET_RATES: 'GET_RATES',
  PREPEND_REVIEW: 'PREPEND_REVIEW',
}

export const SEARCH = {
  GET_SEARCH: 'GET_SEARCH',
  LOCK_MAIN_SEARCH: 'LOCK_MAIN_SEARCH',
  UNLOCK_MAIN_SEARCH: 'UNLOCK_MAIN_SEARCH',
  LOCK_SEARCH_BOOKS: 'LOCK_SEARCH_BOOKS',
  UNLOCK_SEARCH_BOOKS: 'UNLOCK_SEARCH_BOOKS',
  SEARCH_BOOKS: 'SEARCH_BOOKS',
  REMOVE_FROM_BOOK_SEARCH: 'REMOVE_FROM_BOOK_SEARCH',
  CLEAN_SEARCH: 'CLEAN_SEARCH',
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

export const COMMON = {
  GET_CONTRIES: 'GET_CONTRIES',
  GET_STATES: 'GET_STATES',
  SHOW_ALERT_BAR: 'SHOW_ALERT_BAR',
  CLEAR_ALERT_BAR: 'CLEAR_ALERT_BAR',
}

export const ARTICLES = {
  GET_TOP_5_ARTICLES: 'GET_TOP_5_ARTICLES',
  GET_TOP_5_ARTICLES_PENDING: 'GET_TOP_5_ARTICLES_PENDING',
  GET_TOP_5_ARTICLES_FULFILLED: 'GET_TOP_5_ARTICLES_FULFILLED',
  GET_TOP_5_ARTICLES_ERROR: 'GET_TOP_5_ARTICLES_ERROR',
  RESET_TOP_5_ARTICLES: 'RESET_TOP_5_ARTICLES',
  GET_TOP_50_ARTICLES: 'GET_TOP_50_ARTICLES',
  GET_TOP_50_ARTICLES_PENDING: 'GET_TOP_50_ARTICLES_PENDING',
  GET_TOP_50_ARTICLES_FULFILLED: 'GET_TOP_50_ARTICLES_FULFILLED',
  GET_TOP_50_ARTICLES_ERROR: 'GET_TOP_50_ARTICLES_ERROR',
  RESET_TOP_50_ARTICLES: 'RESET_TOP_50_ARTICLES',
  GET_NEWEST_ARTICLES: 'GET_NEWEST_ARTICLES',
  GET_NEWEST_ARTICLES_PENDING: 'GET_NEWEST_ARTICLES_PENDING',
  GET_NEWEST_ARTICLES_FULFILLED: 'GET_NEWEST_ARTICLES_FULFILLED',
  GET_NEWEST_ARTICLES_ERROR: 'GET_NEWEST_ARTICLES_ERROR',
  RESET_NEWEST_ARTICLES: 'RESET_NEWEST_ARTICLES',
  GET_TOP_CONTRIBUTORS: 'GET_TOP_CONTRIBUTORS',
  GET_TOP_CONTRIBUTORS_PENDING: 'GET_TOP_CONTRIBUTORS_PENDING',
  GET_TOP_CONTRIBUTORS_FULFILLED: 'GET_TOP_CONTRIBUTORS_FULFILLED',
  GET_TOP_CONTRIBUTORS_ERROR: 'GET_TOP_CONTRIBUTORS_ERROR',
  RESET_TOP_CONTRIBUTORS: 'RESET_TOP_CONTRIBUTORS',
  LIKE_ARTICLE: 'LIKE_ARTICLE',
  LIKE_ARTICLE_PENDING: 'LIKE_ARTICLE_PENDING',
  LIKE_ARTICLE_FULFILLED: 'LIKE_ARTICLE_FULFILLED',
  LIKE_ARTICLE_ERROR: 'LIKE_ARTICLE_ERROR',
  SET_ARTICLE_TO_SHARE: 'SET_ARTICLE_TO_SHARE',
  RESET_ARTICLE_TO_SHARE: 'RESET_ARTICLE_TO_SHARE',
  SET_ARTICLE_TO_COMMENT: 'SET_ARTICLE_TO_COMMENT',
  GET_COMMENTS: 'GET_COMMENTS',
  GET_COMMENTS_FULFILLED: 'GET_COMMENTS_FULFILLED',
  GET_COMMENTS_PENDING: 'GET_COMMENTS_PENDING',
  COMMENT_ARTICLE: 'COMMENT_ARTICLE',
  COMMENT_ARTICLE_FULFILLED: 'COMMENT_ARTICLE_FULFILLED',
  COMMENT_ARTICLE_PENDING: 'COMMENT_ARTICLE_PENDING',
  RESET_COMMENTS: 'RESET_COMMENTS',
};

export const SESSION = {
  RETRIEVE_SESSION: 'RETRIEVE_SESSION',
  STORE_SESSION: 'STORE_SESSION',
}

export default {
  ARTICLES,
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
  COMMON,
  SESSION,
}
