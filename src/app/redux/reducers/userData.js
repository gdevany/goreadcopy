import { USERS as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.userData, { type, payload }) => {
  switch (type) {
    case A.CREATE_USER:
      return payload
    case A.UPDATE_USER_DATA:
      /** Having trouble with syntax, please advise:
        I want to be able update the object with whatever part of it was update.
        This one replaces the entire object, even if I changed only one input:
        return {...state, ...action.userData}
        This one adds another object inside of the object with the same name:
        return Object.assign({}, state, {userData: action.userData})
        Any clues?
    **/
      return { ...state, ...payload }
    default:
      return state
  }
}
