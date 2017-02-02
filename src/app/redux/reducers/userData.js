import A from '../const/actionTypes'
import initialState from '../../initialState'

export default (currentState, action) => {
  switch (action.type) {
    case A.UPDATE_USER_DATA:
      /** Having trouble with syntax, please advise:
        I want to be able update the object with whatever part of it was update.
        This one replaces the entire object, even if I changed only one input:
        return {...currentState, ...action.userData}
        This one adds another object inside of the object with the same name:
        return Object.assign({}, currentState, {userData: action.userData})
        Any clues?
    **/
      return { ...currentState, ...action.userData }
    default:
      return currentState || initialState.userData
  }
}
