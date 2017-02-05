import R from 'ramda'
import { BOOKS as A } from '../const/actionTypes'
import { Books } from '../../services/api'
import { Deserialization } from '../../services'

const { fromPaginated } = Deserialization

export function getBooks(params) {
  return (dispatch, getState) => {
    const defaultParams = {
      genreId: null,
      page: undefined,
      perPage: undefined,
      sort: 'popular',
      imageSize: 'average'
    }

    const allParams = R.merge(defaultParams, params)

    dispatch({ type: A.GET_BOOKS })

    Books.getBooks(allParams)
      .then(res => dispatch(getBooksSuccess(fromPaginated(res))))
  }
}

export function getBooksSuccess(books) {
  return {
    type: A.GET_BOOKS_SUCCESS,
    payload: books
  }
}

export default {
  getBooks,
  getBooksSuccess,
}
