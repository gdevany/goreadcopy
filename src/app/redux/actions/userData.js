// TODO: rename file from userData -> readers
import { browserHistory } from 'react-router'
import { USERS as A } from '../const/actionTypes'
import Readers from '../../services/readers'

// TODO: rename to createReader
export function createUser(data) {
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
      .then((res) => {
        debugger
      })
  }
}

export function getInitialUserData(userData) {
  return (dispatch) => {
    new Promise(resolve => {
      resolve(
        dispatch(updateUserData(userData)))
    }).then(() => browserHistory.push('/signup'))
  }
}

export function updateUserData(payload) {
  return {
    type: A.UPDATE_USER_DATA,
    payload,
  }
}
