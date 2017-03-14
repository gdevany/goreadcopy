import R from 'ramda'
import { PROFILE_PAGE as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.profilePage, { type, payload }) => {
  switch (type) {
    case A.GET_PROFILE_PAGE:
      return R.merge(state, payload)
    default:
      return state
  }
}
