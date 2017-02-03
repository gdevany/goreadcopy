import { CURRENT_READER as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (currentState, { type, errors, payload }) => {
  switch (type) {
    case A.GET_RECOMMENDATION:
      return [...payload]
    default:
      return currentState || initialState.recommended
  }
}
