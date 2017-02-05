import { BOOKS as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.books, { type, payload, errors }) => {
  switch (type) {
    case A.GET_BOOKS:
      return {
        ...state,
        // TODO: revisit structure
        isLoading: true,
      }
    case A.GET_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payload,
      }
    default:
      return state
  }
}
