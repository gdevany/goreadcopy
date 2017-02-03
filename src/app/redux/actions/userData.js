// TODO: rename file from userData -> readers
import { browserHistory } from 'react-router'
import { USERS as A, CURRENT_READER } from '../const/actionTypes'
import Readers from '../../services/readers'
import Promise from '../../services/promises'
import Auth from '../../services/auth'

export const createReaderSuccess = ({ data }) => {
  return (dispatch) => {
    const payload = data

    Auth.setToken(payload.token)

    dispatch({
      type: CURRENT_READER.SET_CURRENT_READER,
      payload,
    })

    dispatch({
      type: A.CREATE_READER_SUCCESS,
      payload,
    })
  }
}

// TODO: rename to createReader
export function createUser() {
  return (dispatch, getState) => {
    const { userData } = getState()
    const payload = userData

    // TODO: dispatch success/failure actions
    dispatch({
      type: A.CREATE_READER,
      payload,
    })

    return Readers.createReader(payload)
      .then((res) => dispatch(createReaderSuccess(res)))
  }
}

export function getInitialUserData(data) {
  return (dispatch) => {
    const result =
      Promise.of(dispatch(updateUserData(data)))
        .then(() => browserHistory.push('/signup'))

    return result
  }
}

export function updateReaderErrors({ errors }) {
  return {
    type: A.UPDATE_READER_ERRORS,
    errors,
  }
}

export function checkEmail(field, data) {
  return (dispatch) => {
    return Readers.checkValidation(field)
      .then(() => dispatch(getInitialUserData(data)))
      .catch(err => dispatch(updateReaderErrors(err)))
  }
}

export function updateUserData(payload) {
  return {
    type: A.UPDATE_USER_DATA,
    payload,
  }
}
