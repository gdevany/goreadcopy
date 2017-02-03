import { USERS as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.userData, { type, payload, errors }) => {
  switch (type) {
    case A.CREATE_USER:
      return payload
    case A.UPDATE_USER_DATA:
      return { ...state, ...payload }
    case A.UPDATE_READER_ERRORS:
      return { ...state, ...errors }
    default:
      return state
  }
}
