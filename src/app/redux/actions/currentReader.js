import { CURRENT_READER as A } from '../const/actionTypes'
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

export function refreshCurrentReader({ token } = {}) {
  return (dispatch) => {
    token = token || Auth.token()

    dispatch({ type: A.REFRESH_CURRENT_READER })

    return Jwt.refreshJwt({ token })
      .then(res => dispatch(setCurrentReader(tokenFrom(res))))
      // TODO: handle errors
  }
}

export default {
  setCurrentReader,
  refreshCurrentReader,
}
