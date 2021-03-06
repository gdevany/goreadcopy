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
import articlesReducer from './articles'
import sessionReducer from './session'
import cmsReducer from './cms';

import { CURRENT_READER as C } from '../const/actionTypes'

const appReducer = combineReducers({
  books: booksReducer,
  chat: chatReducer,
  cms: cmsReducer,
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
  articles: articlesReducer,
  session: sessionReducer,
})

const rootReducer = (state, action) => {
  if (action.type === C.USER_LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
