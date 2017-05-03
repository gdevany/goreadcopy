import R from 'ramda'
import { CHAT as C } from '../const/actionTypes'
import initialState from '../../initialState'

let diff = {}

const getChatInstance = (contactId, chats) => R.find(R.propEq('id', contactId))(chats)
const filterChatByID = (id, chats) => R.filter(n => n.id !== id, chats)
const setChatHistory = (id, chats, history) => R.map(n => {
  n.history = n.id === id ? history : n.history
  return n
}, chats)
const mergeStatus = (list, diff) => R.map(n=>{
  const changed = R.find(R.propEq('pk', n.pk))(diff)
  if (changed) {
    return R.mergeAll([n, changed])
  }
  return n
}, list)

export default (state = initialState.chat, { type, payload, errors }) => {
  switch (type) {
    case C.GET_CHAT_CONTACTS:
      return R.merge(state, payload)
    case C.OPEN_CHAT_CONVERSATION:
      if (!getChatInstance(payload.id, state.conversations)) {
        diff = {
          ...state,
          conversations: [...state.conversations, payload]
        }
      }
      return R.merge(state, diff)
    case C.CLOSE_CHAT_CONVERSATION:
      diff = {
        ...state,
        conversations: filterChatByID(payload.id, state.conversations)
      }
      return R.merge(state, diff)
    case C.LOAD_CHAT_CONVERSATION:
      diff = {
        ...state,
        conversations: setChatHistory(payload.id, state.conversations, payload.history)
      }
      return R.merge(state, diff)
    case C.UPDATE_ONLINE_STATUS:
      diff = {
        ...state,
        contacts: mergeStatus(state.contacts, payload)
      }
      console.log('New diff to merge', diff)
      return R.merge(state, diff)
    default:
      return state
  }
}
