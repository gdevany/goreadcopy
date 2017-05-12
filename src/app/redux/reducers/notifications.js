import R from 'ramda'
import { NOTIFICATIONS as N } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.notifications, { type, payload, errors }) => {
  switch (type) {
    case N.LOAD_NOTIFICATIONS:
      return R.merge(state, payload)
    default:
      return state
  }
}
