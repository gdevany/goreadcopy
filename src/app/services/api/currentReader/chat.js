import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getChatContacts,
    getChatMessages,
    getChatConversation,
    postChatMessage,
    sendHeartbeat,
    updateReadConversation,
  }
} = Endpoints

const Chat = () => {
  return {
    getChatContacts: () => authenticated().get(getChatContacts()),
    getChatMessages: () => authenticated().get(getChatMessages()),
    getChatConversation: (params) => authenticated().get(getChatConversation(params)),
    postChatMessage: (params) => authenticated().post(postChatMessage(), params),
    sendHeartbeat: (params) => authenticated().get(sendHeartbeat(params)),
    updateReadConversation: (params) => authenticated().post(updateReadConversation(), params)
  }
}

export default Chat()
