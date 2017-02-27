import { SEARCH as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.search, { type, payload, errors }) => {
  switch (type) {
    case A.GET_SEARCH:
      return [...payload]
    default:
      return state
  }
}
