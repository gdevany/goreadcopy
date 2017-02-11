import { BOOKS as A } from '../const/actionTypes'
import { Books } from '../../services/api'
import { Deserialization } from '../../services'

const { fromPaginated } = Deserialization

export function getBooks(params) {
  return (dispatch, getState) => {
    dispatch({ type: A.GET_BOOKS })

    return Books.getBooks(params)
      .then(res => dispatch(getBooksSuccess(fromPaginated(res))))
      .catch((err) => console.log(`Error in getBooks api call: ${err}`))
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
}
