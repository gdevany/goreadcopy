import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getChatContacts,
    getChatMessages,
    getChatConversation,
    postChatMessage
  }
} = Endpoints

const Chat = () => {
  return {
    getChatContacts: () => authenticated().get(getChatContacts()),
    getChatMessages: () => authenticated().get(getChatMessages()),
    getChatConversation: () => authenticated().get(getChatConversation()),
    postChatMessage: () => authenticated().post(postChatMessage()),
  }
}

export default Chat()
