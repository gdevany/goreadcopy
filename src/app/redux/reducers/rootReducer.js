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
import storeReducer from './store'
import ratesReducer from './rates'
import sidebarAdsReducer from './ads'
import chatReducer from './chat'
import notificationReducer from './notifications'
import commonReducer from './common'

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
  store: storeReducer,
  rates: ratesReducer,
  notifications: notificationReducer,
  common: commonReducer,
})

export default rootReducer
