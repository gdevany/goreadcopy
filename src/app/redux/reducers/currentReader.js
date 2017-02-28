import R from 'ramda'
import { CURRENT_READER as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.currentReader, { type, payload }) => {
  switch (type) {
    case A.SET_CURRENT_READER:
      return R.merge(state, payload)
    case A.UNSET_CURRENT_READER:
      return R.empty(state)
    case A.GET_CURRENT_READER:
      return R.merge(state, payload)
    case A.UPDATE_CURRENT_READER_DATA:
      return R.merge(state, payload)
    default:
      return state
  }
}
