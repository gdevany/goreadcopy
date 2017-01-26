import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import genreReducer from './genres'
import booksReducer from './books'

const rootReducer = combineReducers({
  routing: routerReducer,
  genres: genreReducer,
  books: booksReducer
})

export default rootReducer
