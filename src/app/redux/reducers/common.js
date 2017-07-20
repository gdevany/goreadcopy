import R from 'ramda'
import { COMMON as A } from '../const/actionTypes'
import initialState from '../../initialState'

let diff = null

const mapAlert = (state, { message, type }) => {
  return {
    isOpen: true,
    message,
    type,
  }
}

export default (state = initialState.common, { type, payload, errors }) => {
  switch (type) {
    case A.GET_CONTRIES:
      return R.merge(state, { countries: payload.result })
    case A.GET_STATES:
      return R.merge(state, { states: payload.result })
    case A.SHOW_ALERT_BAR:
      diff = {
        ...state,
        alerts: mapAlert(state, payload)
      }
      return R.merge(state, diff)
    case A.CLEAR_ALERT_BAR:
      diff = {
        ...state,
        alerts: {
          ...state.alerts,
          isOpen: false,
        }
      }
      return R.merge(state, diff)
    default:
      return state
  }
}
