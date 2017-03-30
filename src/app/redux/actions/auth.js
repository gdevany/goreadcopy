import { browserHistory } from 'react-router'
import { setCurrentReader } from './currentReader'
import { Jwt } from '../../services/api'
import { Auth } from '../../services'
import { CURRENT_READER as A } from '../const/actionTypes'
import { Promise, Errors } from '../../services'
import { SignInModalValidator } from '../../services/validators'
import { updateReaderErrors } from './readerData'

const { authJwt, verifyJwt } = Jwt
const { deleteToken } = Auth
const { validate } = SignInModalValidator
const { hasErrors } = Errors

export function processUserLogin(credentials) {
  return (dispatch) => {
    const results = validate(credentials)

    if (hasErrors(results)) { return dispatch(updateReaderErrors(results)) }

    return authJwt(credentials)
      .then((response) => { dispatch(setCurrentReader(response.data)) })
      .catch(err => { dispatch(updateReaderErrors(err)) })
  }
}

export function processUserLogout() {
  return (dispatch) => {
    return Promise.resolve(dispatch({ type: A.UNSET_CURRENT_READER }))
      .then(() => {
        deleteToken()
        browserHistory.push('/')
      })
  }
}

export function verifyUserToken(token) {
  return (dispatch) => {
    return verifyJwt(token)
    .then((response) => { dispatch(setCurrentReader(response.data)) })
    .catch(err => { console.log(err) })
  }
}

export function cleanUserLoginErrors() {
  return (dispatch) => {
    return Promise.resolve(dispatch(updateReaderErrors(' ')))
  }
}

export default {
  processUserLogin,
  processUserLogout,
  verifyUserToken,
  cleanUserLoginErrors,
}
