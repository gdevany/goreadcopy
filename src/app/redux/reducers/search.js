import R from 'ramda'
import { SEARCH as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.search, { type, payload, errors }) => {
  switch (type) {

    case A.GET_SEARCH:
      return R.merge(state, payload)

    case A.SEARCH_BOOKS:
      return R.merge(state, {
        bookSearch: payload
      })
    default:
      return state
  }
}
