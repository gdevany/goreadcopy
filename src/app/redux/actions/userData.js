import A from '../const/actionTypes'
import { browserHistory } from 'react-router'

export function updateUserData(userData) {
  return (dispatch, getState) => {
    new Promise(resolve => {
      resolve(
        dispatch({
          type: A.UPDATE_USER_DATA,
          userData
        }))
    }).then(() => browserHistory.push('/signup'))
  }
}
