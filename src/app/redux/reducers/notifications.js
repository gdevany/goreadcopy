import R from 'ramda'
import { NOTIFICATIONS as N } from '../const/actionTypes'
import initialState from '../../initialState'

let diff = {}

const getUnreadNotifications = ({ unread }) => unread
const dismissNotification = ({ results }, { notification }) => {
  return R.reject(R.propEq('pk', notification), results)
}
const prependReceivedNotification = ({ results }, { json }) => {
  return [json, ...results]
}

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
    case N.UPDATE_UNREAD_NOTIFICATIONS:
      diff = {
        ...state,
        unreadCount: getUnreadNotifications(payload)
      }
      return R.merge(state, diff)
    case N.DISMISS_NOTIFICATION:
      diff = {
        ...state,
        results: dismissNotification(state, payload)
      }
      return R.merge(state, diff)
    case N.DISMISS_ALL_NOTIFICATION:
      diff = {
        ...state,
        results: []
      }
      return R.merge(state, diff)
    case N.PREPEND_RECEIVED_NOTIFICATION:
      diff = {
        ...state,
        results: prependReceivedNotification(state, payload)
      }
      return R.merge(state, diff)
    default:
      return state
  }
}
