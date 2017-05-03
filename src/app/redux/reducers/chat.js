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
const updateUnreadChatNumber = ({ contacts }, { data, sender, lastMessage }) => R.map(n=>{
  n.unreadMessages = n.pk === sender ? data : n.unreadMessages
  n.lastMessage = n.pk === sender ? lastMessage : n.lastMessage
  return n
}, contacts)
const appendReceivedChatMessage = ({ conversations }, { message, sender, recipient, timestamp }) =>
  R.map(n=>{
    console.log(n.id, sender)
    if (n.id === sender) {
      console.log('Found received chat!')
      n.history.conversation.push({
        recipient,
        sender,
        timestamp,
        body: message,
      })
    }
    return n
  }
, conversations)
const appendSentChatMessage = ({ conversations }, { message }) =>
  R.map(n=>{
    if (n.id === message.recipient) {
      console.log('Found sent chat!')
      n.history.conversation.push(message)
    }
    return n
  }
, conversations)

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
      return R.merge(state, diff)
    case C.UPDATE_CONTACT_UNREAD_MESSAGES:
      diff = {
        ...state,
        contacts: updateUnreadChatNumber(state, payload)
      }
      return R.merge(state, diff)
    case C.APPEND_RECEIVED_CHAT_MESSAGE:
      diff = {
        ...state,
        conversations: appendReceivedChatMessage(state, payload)
      }
      return R.merge(state, diff)
    case C.APPEND_SENT_CHAT_MESSAGE:
      console.log('Appending sent chat message:', payload)
      diff = {
        ...state,
        conversations: appendSentChatMessage(state, payload)
      }
      return R.merge(state, diff)
    default:
      return state
  }
}
