import R from 'ramda'
import { PROFILE_PAGE as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.profilePage, { type, payload }) => {
  let diff

  switch (type) {
    case A.GET_PROFILE_PAGE:
      return R.merge(state, payload)
    case A.GET_CURRENTLY_READING:
      return R.merge(state, payload)
    case A.FETCH_LIBRARY:
      diff = {
        library: {
          ...state.library || {},
          locked: true
        }
      }
      return R.merge(state, diff)
    case A.GET_LIBRARY:
      diff = {
        library: {
          ...state.library || {},
          ...payload || {},
          results: R.concat(state.library.results || [], payload.results.library),
          locked: false
        }
      }
      return R.merge(state, diff)
    case A.UPDATE_LIBRARY:
      return R.merge(state, {
        library: {
          results: payload.results.library
        }
      })
    case A.GET_TOP_BOOKS:
      return R.merge(state, {
        topBooks: payload
      })
    default:
      return state
  }
}
