import A from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.genres, { type, payload, errors }) => {
  switch (type) {
    case A.GET_GENRES:
      return [...payload]
    default:
      return state
  }
}
