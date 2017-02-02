import A from '../const/actionTypes'
import { browserHistory } from 'react-router'

export function getInitialUserData(userData) {
  return (dispatch) => {
    new Promise(resolve => {
      resolve(
        dispatch(updateUserData(userData)))
    }).then(() => browserHistory.push('/signup'))
  }
}

export function updateUserData(userData) {
  return {
    type: A.UPDATE_USER_DATA,
    userData
  }
}
