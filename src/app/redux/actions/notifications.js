import { NOTIFICATIONS as N } from '../const/actionTypes'
import Notifications from '../../services/api/currentReader/notifications'

export function loadNotifications() {
  return dispatch => {
    return Notifications.loadNotifications()
      .then(res => dispatch({ type: N.LOAD_NOTIFICATIONS, payload: res.data }))
      .catch(err => console.log(err))
  }
}

export function resetReadNotifications() {
  return dispatch => {
    return Promise.resolve(dispatch({ type: N.RESET_NOTIFICATION_COUNT }))
  }
}

export default {
  loadNotifications
}
