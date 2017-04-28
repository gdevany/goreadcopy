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

export default {
  getChatContacts
}
