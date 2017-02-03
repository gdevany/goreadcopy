// TODO: rename file from userData -> readers
import { browserHistory } from 'react-router'
import { USERS as A } from '../const/actionTypes'
import Readers from '../../services/readers'

// TODO: rename to createReader
export function createUser() {
  return (dispatch, getState) => {
    const { userData } = getState()
    const payload = userData

    // TODO: dispatch success/failure actions
    dispatch({
      type: A.CREATE_USER,
      isLoading: true,
      payload,
    })

    Readers.createReader(payload)
  }
}

export function getInitialUserData(data) {
  return (dispatch) => {
    new Promise(resolve => {
      resolve(dispatch(updateUserData(data)))
    }).then(() => browserHistory.push('/signup'))
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
    Readers.checkValidation(field)
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
