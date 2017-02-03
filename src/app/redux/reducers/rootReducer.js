import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import booksReducer from './books'
import currentReaderReducer from './currentReader'
import genreReducer from './genres'
import userDataReducer from './userData'
import recommendedReducer from './recommended'

const rootReducer = combineReducers({
  books: booksReducer,
  currentReader: currentReaderReducer,
  genres: genreReducer,
  routing: routerReducer,
  userData: userDataReducer,
  recommended: recommendedReducer,
})

export default rootReducer
