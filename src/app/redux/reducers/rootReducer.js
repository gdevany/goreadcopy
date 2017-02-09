import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import booksReducer from './books'
import currentReaderReducer from './currentReader'
import genreReducer from './genres'
import litcoinsReducer from './litcoins'
import readerDataReducer from './readerData'
import recommendedReducer from './recommended'

const rootReducer = combineReducers({
  books: booksReducer,
  currentReader: currentReaderReducer,
  genres: genreReducer,
  litcoins: litcoinsReducer,
  readerData: readerDataReducer,
  recommended: recommendedReducer,
  routing: routerReducer,
})

export default rootReducer
