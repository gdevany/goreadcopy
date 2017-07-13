import R from 'ramda'
import { COMMON as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.common, { type, payload, errors }) => {
  switch (type) {
    case A.GET_CONTRIES:
      return R.merge(state, { countries: payload.result })
    case A.GET_STATES:
      return R.merge(state, { states: payload.result })
    default:
      return state
  }
}
