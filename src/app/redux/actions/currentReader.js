import { CURRENT_READER as A } from '../const/actionTypes'
import CurrentReader from '../../services/api/currentReader/general'
import { Auth } from '../../services'
import { Jwt } from '../../services/api'
import { getRecommendation } from './recommended'

const tokenFrom = ({ data: { token } }) => {
  return { token }
}

export function setCurrentReader(payload) {
  Auth.setToken(payload.token)
  return {
    type: A.SET_CURRENT_READER,
    payload,
  }
}

export function getCurrentReader() {
  return dispatch => {
    CurrentReader.getCurrentReader()
      .then(res => dispatch(updateCurrentReader(res.data)))
      .then(() => dispatch(getRecommendation(3)))
      .catch(err => console.log(`Error in getCurrentReader ${err}`))
  }
}

export function refreshCurrentReader({ token } = {}) {
  return (dispatch) => {
    token = token || Auth.token()

    dispatch({ type: A.REFRESH_CURRENT_READER })

    return Jwt.refreshJwt({ token })
      .then(res => dispatch(setCurrentReader(tokenFrom(res))))
      // TODO: handle errors
  }
}

export function usePlatformAs(platformUse) {
  const platform = {
    publishingAs: platformUse,
  }
  return dispatch => {
    CurrentReader.usePlatformAs(platform)
      .then(res => dispatch(updateCurrentReader(res.data)))
      .catch(err => console.log(`Error in getPlatformUse ${err}`))
  }
}

export function updateCurrentReader(payload) {
  return dispatch => {
    return dispatch({
      type: A.UPDATE_CURRENT_READER_DATA,
      payload,
    })
  }
}

export function updateCurrentReaderRecommendation(recommendation) {
  return {
    type: A.UPDATE_CURRENT_READER_RECOMMENDATION,
    payload: recommendation,
  }
}

export function logoutCurrentReader() {
  return dispatch => {
    CurrentReader.logoutCurrentReader()
      .then(res => dispatch(res.data))
      .catch(err => console.log(`Error in getCurrentReader ${err}`))
  }
}

export default {
  setCurrentReader,
  refreshCurrentReader,
  getCurrentReader,
  updateCurrentReader,
  updateCurrentReaderRecommendation,
  usePlatformAs,
  logoutCurrentReader,
}
