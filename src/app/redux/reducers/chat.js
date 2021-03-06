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

const updateReadConversationStatus = ({ contacts }, { contact }) => {
  return R.map(n=>{
    n.unreadMessages = n.pk === contact ? 0 : n.unreadMessages
    return n
  }, contacts)
}

const filterChatByID = ({ conversations }, { id }) => {
  return R.filter(n => n.id !== id, conversations)
}

const setChatHistory = ({ conversations }, { id, history }) => {
  return R.map(n => {
    if (n.id === id) {
      if (!n.history.conversation) {
        n.history = history
      } else {
        n.history.conversation = {
          ...history.conversation,
          results: [...history.conversation.results, ...n.history.conversation.results]
        }
      }
      n.history.conversation.results = sortPosts(n.history.conversation.results)
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
      n.history.conversation.results.push({
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
      n.history.conversation.results.push(message)
    }
    return n
  }
, conversations)

const updateContactLastMessage = ({ contacts }, { message }) => R.map(n=>{
  n.lastMessage = n.pk === message.recipient ? message : n.lastMessage
  return n
}, contacts)

const addChatConversation = ({ conversations }, payload) => {
  const isAdded = R.find(R.propEq('id', payload.id))(conversations)
  const chatsAmount = conversations.length
  const maxChats = 4
  if (!isAdded) {
    if (chatsAmount < maxChats) {
      return [...conversations, payload]
    }
    return [...conversations.slice(1, 4), payload]
  }
  return R.map(c=>{
    if (c.id === payload.id) { c.isOpen = true }
    return c
  }, conversations)
}

const toggleChatWindow = ({ conversations }, { id }) => {
  return conversations.map(el => {
    el.isOpen = el.id === id ? !el.isOpen : el.isOpen
    return el
  })
}

const setChatWindow = ({ conversations }, { id, isOpen }) => {
  return conversations.map(el => {
    if (el.id === id) { el.isOpen = isOpen }
    return el
  })
}

export default (state = initialState.chat, { type, payload, errors }) => {
  switch (type) {
    case C.GET_CHAT_CONTACTS:
      return R.merge(state, payload)
    case C.OPEN_CHAT_CONVERSATION:
      diff = {
        ...state,
        conversations: addChatConversation(state, payload)
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
        contacts: updateContactLastMessage(state, payload),
        conversations: appendSentChatMessage(state, payload)
      }
      return R.merge(state, diff)
    case C.UPDATE_READ_CONVERSATION_STATUS:
      diff = {
        ...state,
        contacts: updateReadConversationStatus(state, payload)
      }
      return R.merge(state, diff)
    case C.TOGGLE_MESSAGES_POPUP:
      diff = {
        ...state,
        isMessagesOpen: !state.isMessagesOpen
      }
      return R.merge(state, diff)
    case C.TOGGLE_CONTACTS_POPUP:
      diff = {
        ...state,
        isContactsOpen: !state.isContactsOpen
      }
      return R.merge(state, diff)
    case C.TOGGLE_CHAT_WINDOW:
      diff = {
        ...state,
        conversations: toggleChatWindow(state, payload)
      }
      return R.merge(state, diff)
    case C.SET_CHAT_WINDOW:
      diff = {
        ...state,
        conversations: setChatWindow(state, payload)
      }
      return R.merge(state, diff)
    default:
      return state
  }
}
