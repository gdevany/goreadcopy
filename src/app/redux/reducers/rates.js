import R from 'ramda'
import { RATES as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.rates, { type, payload }) => {
  switch (type) {
    case A.GET_STARS_INFO:
      return R.merge(state, { starsInfo: payload })
    case A.GET_RATES:
      return R.merge(state, { bookRates: payload })
    default:
      return state
  }
}
