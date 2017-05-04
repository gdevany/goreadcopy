import { CHAT as C } from '../const/actionTypes'
import Chat from '../../services/api/currentReader/chat'

export function getChatContacts() {
  return dispatch => {
    return Chat.getChatContacts()
      .then(res => dispatch({
        type: C.GET_CHAT_CONTACTS,
        payload: { contacts: res.data.results.contacts }
      }))
      .catch(err => console.log(err))
  }
}

function createConversation(id) {
  return {
    id,
    history: {},
    isOpen: true
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

export function loadChatConversation(contactId) {
  return dispatch => {
    return Chat.getChatConversation({ contact: contactId })
      .then(res => dispatch({
        type: C.LOAD_CHAT_CONVERSATION,
        payload: {
          id: contactId,
          history: res.data
        }
      }))
      .catch(err => console.log(err))
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
}
