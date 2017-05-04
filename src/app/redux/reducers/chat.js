import R from 'ramda'
import { CHAT as C } from '../const/actionTypes'
import initialState from '../../initialState'

let diff = {}

const sortPosts = (conversations) => {
  return R.sort(
    (a, b)=>{return a.timestamp - b.timestamp},
    conversations
  )
}

const getChatInstance = ({ conversations }, { id }) => {
  return R.find(R.propEq('id', id))(conversations)
}

const filterChatByID = ({ conversations }, { id }) => {
  return R.filter(n => n.id !== id, conversations)
}

const setChatHistory = ({ conversations }, { id, history }) => {
  return R.map(n => {
    if (n.id === id) {
      n.history = history
      n.history.conversation = sortPosts(n.history.conversation)
    }
    return n
  }, conversations)
}

const mergeStatus = ({ contacts }, diff) => R.map(n=>{
  const changed = R.find(R.propEq('pk', n.pk))(diff)
  if (changed) { return R.mergeAll([n, changed]) }
  return n
}, contacts)

const updateUnreadChatNumber = ({ contacts }, { data, sender, lastMessage }) => R.map(n=>{
  n.unreadMessages = n.pk === sender ? data : n.unreadMessages
  n.lastMessage = n.pk === sender ? lastMessage : n.lastMessage
  return n
}, contacts)

const appendReceivedChatMessage = ({ conversations }, { message, sender, recipient, timestamp }) =>
  R.map(n=>{
    if (n.id === sender) {
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
      if (!getChatInstance(state, payload)) {
        diff = {
          ...state,
          conversations: [...state.conversations, payload]
        }
      }
      return R.merge(state, diff)
    case C.CLOSE_CHAT_CONVERSATION:
      diff = {
        ...state,
        conversations: filterChatByID(state, payload)
      }
      return R.merge(state, diff)
    case C.LOAD_CHAT_CONVERSATION:
      diff = {
        ...state,
        conversations: setChatHistory(state, payload)
      }
      return R.merge(state, diff)
    case C.UPDATE_ONLINE_STATUS:
      diff = {
        ...state,
        contacts: mergeStatus(state, payload)
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
      diff = {
        ...state,
        conversations: appendSentChatMessage(state, payload)
      }
      return R.merge(state, diff)
    default:
      return state
  }
}
