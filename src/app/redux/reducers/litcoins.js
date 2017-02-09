import R from 'ramda'
import { CURRENT_READER as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.litcoins, { type, payload, errors }) => {
  switch (type) {
    case A.UPDATE_LITCOIN_BALANCE:
      return R.merge(state, payload)
    case A.UPDATE_SELECTED:
      return R.merge(state, payload)
    default:
      return state
  }
}
