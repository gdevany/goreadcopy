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

const listCountries = (state, { result }) => {
  const specialCountries = ['US', 'CA']
  return R.compose(
    R.insert(
      0,
      { value: '', name: 'Select a country:', key: '__', pk: '' }
    ),
    R.insert(
      specialCountries.length,
      { value: '', name: '-------------', key: '_', pk: '_', disabled: true }
    ),
    R.sort((prev, next) => {
      // Process special countries
      const prevIs = R.contains(prev.pk, specialCountries)
      const nextIs = R.contains(next.pk, specialCountries)
      if (prevIs && nextIs) {
        const prevIndex = R.indexOf(prev.pk, specialCountries)
        const nextIndex = R.indexOf(next.pk, specialCountries)
        if (prevIndex < nextIndex) { return -1 }
        return 1
      }
      if (prevIs) { return -1 }
      if (nextIs) { return 1 }
      // Process other countries
      if (prev.name < next.name) { return -1 }
      if (prev.name === next.name) { return 0 }
      return 1
    })
  )(result)
}

const listStates = (state, { result }) => {
  return R.compose(
    R.insert(
      0,
      { pk: ' ', name: 'Select a state:', value: '' }
    )
  )(result)
}

export default (state = initialState.common, { type, payload, errors }) => {
  switch (type) {
    case A.GET_CONTRIES:
      diff = {
        ...state,
        countries: listCountries(state, payload)
      }
      return R.merge(state, diff)
    case A.GET_STATES:
      return R.merge(state, { states: listStates(state, payload) })
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
