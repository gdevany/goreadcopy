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
  UPDATE_LIKES: 'UPDATE_LIKES'
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
  GET_FOLLOWED: 'GET_FOLLOWED',
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
}

export const PROFILE_PAGE = {
  FETCH_LIBRARY: 'FETCH_LIBRARY',
  GET_PROFILE_PAGE: 'GET_PROFILE_PAGE',
  GET_CURRENTLY_READING: 'GET_CURRENTLY_READING',
  GET_LIBRARY: 'GET_LIBRARY',
  GET_TOP_BOOKS: 'GET_TOP_BOOKS',
}

export const SEARCH = {
  GET_SEARCH: 'GET_SEARCH',
  SEARCH_BOOKS: 'SEARCH_BOOKS',
}

export default {
  BOOKS,
  CURRENT_READER,
  GET_GENRES: 'GET_GENRES',
  GET_SIDEBAR_ADS: 'GET_SIDEBAR_ADS',
  PROFILE_PAGE,
  READERS,
  SEARCH,
}
