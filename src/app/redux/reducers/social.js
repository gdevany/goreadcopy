import { CURRENT_READER as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.social, { type, payload, errors }) => {
  switch (type) {
    case A.GET_FOLLOWERS:
      return {
        ...state,
        followers: payload
      }
    case A.GET_FOLLOWED:
      return {
        ...state,
        followed: payload
      }
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
