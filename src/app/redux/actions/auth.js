import { browserHistory } from 'react-router'
import { setCurrentReader } from './currentReader'
import { Jwt } from '../../services/api'
import { Auth } from '../../services'
import { CURRENT_READER as A } from '../const/actionTypes'
import { Promise } from '../../services'

const { authJwt } = Jwt
const { deleteToken } = Auth

export function processUserLogin(credentials) {
  return (dispatch) => {
    return authJwt(credentials)
      .then((response) => { dispatch(setCurrentReader(response.data)) })
      // To do: Handle login error
      .catch(err => { console.log(err) })
  }
}

export function processUserLogout() {
  return (dispatch) => {
    return Promise.resolve(dispatch({ type: A.UNSET_CURRENT_READER }))
      .then(() => {
        console.log('Freak me out')
        deleteToken()
        browserHistory.push('/')
      })
  }
}

export default {
  processUserLogin,
  processUserLogout,
}
