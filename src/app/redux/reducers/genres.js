import A from '../const/actionTypes'
import initialState from '../../initialState'

export default (currentState, { type, payload, errors }) => {
  switch (type) {
    case A.GET_GENRES:
      return [...payload]
    default:
      return currentState || initialState.genres
  }
}
