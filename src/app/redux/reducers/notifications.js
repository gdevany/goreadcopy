import R from 'ramda'
import { NOTIFICATIONS as N } from '../const/actionTypes'
import initialState from '../../initialState'

let diff = {}

const getUnreadNotifications = ({ unread }) => unread
const dismissNotification = ({ results }, { notification }) => {
  return R.reject(R.propEq('pk', notification), results)
}
const prependReceivedNotification = ({ results }, { json }) => {
  json.followBack = json.verb.includes('follow') ? json.followBack : false
  json.showAcceptReject = json.category === 'book_club_member_request'
  json.isRequesting = false
  return [json, ...results]
}
const toggleOptionsMenu = ({ results }, { id }) => {
  return R.map(n=>{
    n.showOptions = n.pk === id ? !n.showOptions : n.showOptions
    return n
  }, results)
}
const toggleFollowBack = ({ results }, { id }) => {
  return R.map(n=>{
    n.followBack = n.pk === id ? !n.followBack : n.followBack
    return n
  }, results)
}
const loadNotifications = ({ results }) => {
  return R.map(n => {
    n.followBack = n.verb.includes('follow') ? n.followBack : false
    n.showAcceptReject = n.category === 'book_club_member_request'
    n.isRequesting = false
    return n
  }, results)
}
const sentBookClubAction = ({ results }, { id }) => {
  return R.map(n => {
    n.showAcceptReject = n.pk === id ? !n.showAcceptReject : n.showAcceptReject
    return n
  }, results)
}
const setRequestingState = ({ results }, { id, isRequesting }) => {
  return R.map(n => {
    n.isRequesting = n.pk === id ? isRequesting : n.isRequesting
    return n
  }, results)
}

export default (state = initialState.notifications, { type, payload, errors }) => {
  switch (type) {
    case N.LOAD_NOTIFICATIONS:
      diff = {
        ...payload,
        results: loadNotifications(payload)
      }
      return R.merge(state, diff)
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
    case N.TOGGLE_OPTIONS_MENU:
      diff = {
        ...state,
        results: toggleOptionsMenu(state, payload)
      }
      return R.merge(state, diff)
    case N.TOGGLE_FOLLOW_BACK:
      diff = {
        ...state,
        results: toggleFollowBack(state, payload)
      }
      return R.merge(state, diff)
    case N.SEND_BOOKCLUB_ACTION:
      diff = {
        ...state,
        results: sentBookClubAction(state, payload)
      }
      return R.merge(state, diff)
    case N.SET_REQUESTING_STATE:
      diff = {
        ...state,
        results: setRequestingState(state, payload)
      }
      return R.merge(state, diff)
    default:
      return state
  }
}
