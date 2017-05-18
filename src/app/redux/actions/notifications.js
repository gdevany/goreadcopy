import { NOTIFICATIONS as N } from '../const/actionTypes'
import Notifications from '../../services/api/currentReader/notifications'

export function loadNotifications() {
  return dispatch => {
    return Notifications.loadNotifications()
      .then(res => dispatch({ type: N.LOAD_NOTIFICATIONS, payload: res.data }))
      .catch(err => console.log(err))
  }
}

export function markNotificationsAsRead() {
  return dispatch => {
    return Promise.resolve(dispatch({ type: N.RESET_NOTIFICATION_COUNT }))
  }
}

export function updateUnreadNotificationNumber(unread) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: N.UPDATE_UNREAD_NOTIFICATIONS, payload: { unread } }))
  }
}

export function prependReceivedNotificationMessage(message) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: N.PREPEND_RECEIVED_NOTIFICATION, payload: message }))
  }
}

export function dismissNotification(notification) {
  return dispatch => {
    return Notifications.dismissNotification({ notification })
      .then(res => dispatch({ type: N.DISMISS_NOTIFICATION, payload: { notification } }))
      .catch(err => console.log(err))
  }
}

export function dismissAllNotifications() {
  return dispatch => {
    return Notifications.dismissAllNotifications()
      .then(res => dispatch({ type: N.DISMISS_ALL_NOTIFICATION }))
      .catch(err => console.log(err))
  }
}

export default {
  loadNotifications,
  markNotificationsAsRead,
  updateUnreadNotificationNumber,
  dismissNotification,
  dismissAllNotifications,
  prependReceivedNotificationMessage,
}
