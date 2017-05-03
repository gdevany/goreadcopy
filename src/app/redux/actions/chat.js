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

export function closeChatConversation(contactId) {
  return dispatch => {
    dispatch({ type: C.CLOSE_CHAT_CONVERSATION, payload: { id: contactId } })
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

export function updateOnlineStatus(diff) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: C.UPDATE_ONLINE_STATUS, payload: diff }))
  }
}

export default {
  getChatContacts,
  openChatConversation,
  closeChatConversation,
  loadChatConversation,
  updateOnlineStatus
}
