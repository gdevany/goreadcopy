import { COMMON as A } from '../const/actionTypes'
import { ProfilePage } from '../../services/api'

export function getCountries() {
  return dispatch => {
    return Promise.resolve(ProfilePage.getCountries()
      .then(res => dispatch({ type: A.GET_CONTRIES, payload: res.data }))
      .catch(err => console.error(`Error in getCountries ${err}`)))
  }
}

export function getStates(id) {
  return dispatch => {
    ProfilePage.getStates(id)
      .then(res => dispatch({ type: A.GET_STATES, payload: res.data }))
      .catch(err => console.error(`Error in getStates ${err}`))
  }
}

export function showAlert(payload) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: A.SHOW_ALERT_BAR, payload }))
  }
}

export function clearAlert() {
  return dispatch => {
    return Promise.resolve(dispatch({ type: A.CLEAR_ALERT_BAR }))
  }
}

export default {
  clearAlert,
  getCountries,
  getStates,
  showAlert,
}
