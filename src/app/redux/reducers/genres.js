import A from '../const/actionTypes'
import initialState from '../../initialState'

export default (currentState, action) => {
  switch (action.type) {
    case A.GET_GENRES:
      return [...action.genres]
    default:
      return currentState || initialState.genres
  }
}
