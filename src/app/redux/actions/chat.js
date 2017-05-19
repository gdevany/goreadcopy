import { CHAT as C } from '../const/actionTypes'
import Chat from '../../services/api/currentReader/chat'
import R from 'ramda'

const compareByProp = (prop, a, b) => {
  const x = a[prop].toLowerCase()
  const y = b[prop].toLowerCase()
  return x < y ? -1 : x > y ? 1 : 0
}

const createConversation = (id) => {
  return {
    id,
    history: {},
    isOpen: true
  }
}

export function getChatContacts() {
  return dispatch => {
    return Chat.getChatContacts()
      .then(res => dispatch({
        type: C.GET_CHAT_CONTACTS,
        payload: {
          contacts: R.sort(R.curry(compareByProp)('fullname'), res.data.results.contacts)
        }
      }))
      .catch(err => console.log(err))
  }
}

export function openChatConversation(contactId) {
  return dispatch => {
    dispatch({ type: C.OPEN_CHAT_CONVERSATION, payload: createConversation(contactId) })
  }
}

export function closeChatConversation(id) {
  return dispatch => {
    dispatch({ type: C.CLOSE_CHAT_CONVERSATION, payload: { id } })
  }
}

export function loadChatConversation(payload) {
  return dispatch => {
    dispatch({ type: C.LOAD_CHAT_CONVERSATION, payload: {
      id: payload.id,
      history: payload.data
    } })
  }
}

export function postChatMessage(data) {
  return dispatch => {
    return Chat.postChatMessage(data)
      .then(({ data }) => dispatch({ type: C.APPEND_SENT_CHAT_MESSAGE, payload: data }))
      .catch(err => console.log(err))
  }
}

export function updateOnlineStatus(payload) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: C.UPDATE_ONLINE_STATUS, payload }))
  }
}

export function updateUnreadChatNumber(payload) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: C.UPDATE_CONTACT_UNREAD_MESSAGES, payload }))
  }
}

export function appendReceivedChatMessage(payload) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: C.APPEND_RECEIVED_CHAT_MESSAGE, payload }))
  }
}

export function updateOpenedConversation(payload) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: C.UPDATE_READ_CONVERSATION_STATUS, payload }))
  }
}

export function toggleMessagePopup() {
  return dispatch => {
    return Promise.resolve(dispatch({ type: C.TOGGLE_MESSAGES_POPUP }))
  }
}

export function toggleContactsPopup() {
  return dispatch => {
    return Promise.resolve(dispatch({ type: C.TOGGLE_CONTACTS_POPUP }))
  }
}

export function toggleChatWindow(id) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: C.TOGGLE_CHAT_WINDOW, payload: { id } }))
  }
}

export default {
  getChatContacts,
  openChatConversation,
  closeChatConversation,
  loadChatConversation,
  updateOnlineStatus,
  updateUnreadChatNumber,
  appendReceivedChatMessage,
  postChatMessage,
  updateOpenedConversation,
  toggleMessagePopup,
  toggleContactsPopup,
  toggleChatWindow,
}
