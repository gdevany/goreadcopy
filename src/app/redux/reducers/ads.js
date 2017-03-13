import R from 'ramda'
import { default as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.sidebarAds, { type, payload, errors }) => {
  switch (type) {
    case A.GET_SIDEBAR_ADS:
      return R.merge(state, payload)
    default:
      return state
  }
}
