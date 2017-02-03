import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import genreReducer from './genres'
import booksReducer from './books'
import userDataReducer from './userData'

const rootReducer = combineReducers({
  routing: routerReducer,
  genres: genreReducer,
  books: booksReducer,
  userData: userDataReducer,
})

export default rootReducer
