import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import genreReducer from './genres'
import booksReducer from './books'
import userDataReducer from './userData'
import recommendedReducer from './recommended'

const rootReducer = combineReducers({
  routing: routerReducer,
  genres: genreReducer,
  books: booksReducer,
  userData: userDataReducer,
  recommended: recommendedReducer,
})

export default rootReducer
