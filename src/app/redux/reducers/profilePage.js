import R from 'ramda'
import { PROFILE_PAGE as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.profilePage, { type, payload }) => {
  switch (type) {
    case A.GET_PROFILE_PAGE:
      return R.merge(state, payload)
    case A.GET_CURRENTLY_READING:
      return R.merge(state, payload)
    case A.GET_LIBRARY:
      return R.merge(state, {
        library: payload
      })
    case A.GET_TOP_BOOKS:
      return R.merge(state, {
        topBooks: payload
      })
    default:
      return state
  }
}
