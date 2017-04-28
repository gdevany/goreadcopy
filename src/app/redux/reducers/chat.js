import R from 'ramda'
import { CHAT as C } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.books, { type, payload, errors }) => {
  switch (type) {
    case C.GET_CHAT_CONTACTS:
      return R.merge(state, payload)
    default:
      return state
  }
}
