import { CURRENT_READER as A } from '../const/actionTypes'
import R from 'ramda'
import initialState from '../../initialState'

export default (state = initialState.social, { type, payload, errors }) => {
  let diff
  switch (type) {
    case A.GET_FOLLOWERS:
      return {
        ...state,
        followers: {
          count: payload.count,
          perPage: payload.perPage,
          page: payload.page,
          results: payload.results,
          locked: false,
        }
      }
    case A.GET_FETCH_FOLLOWERS:
      return {
        ...state,
        followers: {
          page: payload.page,
          results: {
            readers: R.concat(state.followers.results.readers, payload.results.readers),
          },
          locked: false,
        }
      }
    case A.FETCH_FOLLOWERS:
      diff = {
        followers: {
          ...state.followers || {},
          locked: true,
        }
      }
      return R.merge(state, diff)
    case A.GET_FOLLOWED:
      return {
        ...state,
        followed: {
          count: payload.count,
          perPage: payload.perPage,
          page: payload.page,
          results: payload.results,
          locked: false,
        }
      }
    case A.GET_FETCH_FOLLOWED:
      return {
        ...state,
        followed: {
          page: payload.page,
          results: {
            readers: R.concat(state.followed.results.readers, payload.results.readers),
            authors: R.concat(state.followed.results.authors, payload.results.authors),
          },
          locked: false,
        }
      }
    case A.FETCH_FOLLOWED:
      diff = {
        followed: {
          ...state.followed || {},
          locked: true,
        }
      }
      return R.merge(state, diff)
    case A.UPDATE_FOLLOWED_AUTHORS:
      return state
    case A.REMOVE_FOLLOWED_AUTHORS:
      return state
    case A.UPDATE_FOLLOWED_READERS:
      return state
    case A.REMOVE_FOLLOWED_READERS:
      return state
    default:
      return state
  }
}
