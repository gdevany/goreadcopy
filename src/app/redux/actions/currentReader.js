import { CURRENT_READER as A } from '../const/actionTypes'
import CurrentReader from '../../services/api/currentReader/general'
import { Auth } from '../../services'
import { Jwt } from '../../services/api'

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

export function updateCurrentReader(payload) {
  return dispatch => {
    return dispatch({
      type: A.UPDATE_CURRENT_READER_DATA,
      payload,
    })
  }
}

export default {
  setCurrentReader,
  refreshCurrentReader,
  getCurrentReader,
  updateCurrentReader
}
