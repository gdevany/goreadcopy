import R from 'ramda'
import { NOTIFICATIONS as N } from '../const/actionTypes'
import initialState from '../../initialState'

let diff = {}

export default (state = initialState.notifications, { type, payload, errors }) => {
  switch (type) {
    case N.LOAD_NOTIFICATIONS:
      return R.merge(state, payload)
    case N.RESET_NOTIFICATION_COUNT:
      diff = {
        ...state,
        unreadCount: 0
      }
      return R.merge(state, diff)
    default:
      return state
  }
}
