import { SESSION as S } from '../const/actionTypes';
import { Auth } from '../../services';

export function retrieveSession() {
  return (dispatch) => {
    const payload = Auth.getSessionData()
    return Promise.resolve(dispatch({ type: S.STORE_SESSION, payload }))
  }
}

export function storeSession(payload) {
  return (dispatch) => {
    Auth.setSessionData(payload)
    return Promise.resolve(dispatch({ type: S.STORE_SESSION, payload }))
  }
}

export default {
  retrieveSession,
  storeSession,
}