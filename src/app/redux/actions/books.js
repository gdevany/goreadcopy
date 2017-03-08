import { BOOKS as A } from '../const/actionTypes'
import { Deserialization } from '../../services'
import { Books } from '../../services/api'
import CurrentReaderRecommendation from '../../services/api/currentReader/recommendation'
import { updateCurrentReaderRecommendation } from './currentReader'

const { fromPaginated } = Deserialization

export function getBooks(params) {
  return (dispatch, getState) => {
    dispatch({ type: A.GET_BOOKS })

    return Books.getBooks(params)
      .then(res => dispatch(getBooksSuccess(fromPaginated(res))))
      .catch((err) => console.log(`Error in getBooks api call: ${err}`))
  }
}

export function getBookRecommendations(amount) {
  return dispatch => {
    CurrentReaderRecommendation.getBookRecommendations({ perPage: amount })
      .then(res => dispatch(updateCurrentReaderRecommendation({ books: res.data.results })))
      .catch(err => console.log(`Error in getBookRecommendations: ${err}`))
  }
}

export function getBookClubRecommendations(amount) {
  return dispatch => {
    CurrentReaderRecommendation.getBookClubRecommendations({ perPage: amount })
      .then(res => dispatch(updateCurrentReaderRecommendation({ bookClubs: res.data.results })))
      .catch(err => console.log(`Error in getBookClubRecommendations: ${err}`))
  }
}

export function getBooksSuccess(books) {
  return {
    type: A.GET_BOOKS_SUCCESS,
    payload: books,
  }
}

export default {
  getBooks,
  getBooksSuccess,
  getBookRecommendations,
  getBookClubRecommendations,
}
