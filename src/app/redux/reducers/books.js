import A from '../const/actionTypes'
import initialState from '../../initialState'

export default (currentState, action) => {
  switch (action.type) {
    case A.GET_BOOKS:
      return [...action.books]
    default:
      return currentState || initialState.books
  }
}
