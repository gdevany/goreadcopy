import { NOTIFICATIONS as N } from '../const/actionTypes'
import Notifications from '../../services/api/currentReader/notifications'
import currentReaderRecommendation from '../../services/api/currentReader/recommendation'
import { BookClubs } from '../../services/api/'

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

export function toggleShowOptions(id) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: N.TOGGLE_OPTIONS_MENU, payload: { id } }))
  }
}

export function toggleFollowBack(aid, nid) {
  return dispatch => {
    return currentReaderRecommendation.likedReaders({ 'readerIds': [aid] })
      .then(res=>dispatch({ type: N.TOGGLE_FOLLOW_BACK, payload: { id: nid } }))
      .catch(err=>console.log(err))
  }
}

export function sendBookClubRequest(action, mrid, nid) {
  return dispatch => {
    dispatch({ type: N.SET_REQUESTING_STATE, payload: { id: nid, isRequesting: true } })
    return BookClubs.membershipRequest({ action, id: mrid })
      .then(res=>{
        dispatch({ type: N.SEND_BOOKCLUB_ACTION, payload: { id: nid } })
        dispatch({ type: N.SET_REQUESTING_STATE, payload: { id: nid, isRequesting: false } })
      })
      .catch(err=>{
        dispatch({ type: N.SET_REQUESTING_STATE, payload: { id: nid, isRequesting: false } })
        console.log(err)
      })
  }
}

export default {
  loadNotifications,
  markNotificationsAsRead,
  updateUnreadNotificationNumber,
  dismissNotification,
  dismissAllNotifications,
  prependReceivedNotificationMessage,
  toggleShowOptions,
  toggleFollowBack,
  sendBookClubRequest,
}
