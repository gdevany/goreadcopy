import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import booksReducer from './books'
import currentReaderReducer from './currentReader'
import genreReducer from './genres'
import litcoinsReducer from './litcoins'
import profilePageReducer from './profilePage'
import readerDataReducer from './readerData'
import recommendedReducer from './recommended'
import socialReducer from './social'
import searchReducer from './search'
import tilesReducer from './tiles'
import sidebarAdsReducer from './ads'
import chatReducer from './chat'
import notificationReducer from './notifications'

const rootReducer = combineReducers({
  books: booksReducer,
  chat: chatReducer,
  currentReader: currentReaderReducer,
  genres: genreReducer,
  litcoins: litcoinsReducer,
  profilePage: profilePageReducer,
  readerData: readerDataReducer,
  recommended: recommendedReducer,
  routing: routerReducer,
  social: socialReducer,
  search: searchReducer,
  tiles: tilesReducer,
  sidebarAds: sidebarAdsReducer,
  notifications: notificationReducer,
})

export default rootReducer
