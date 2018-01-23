import { CURRENT_READER as A } from '../const/actionTypes'
import CurrentReader from '../../services/api/currentReader/general'
import SocialReader from '../../services/api/currentReader/social'
import { Auth } from '../../services'
import { Jwt } from '../../services/api'
import { getRecommendation } from './recommended'
import Env from '../../constants/env'

const tokenFrom = ({ data: { token } }) => {
  return { token }
}

export function setCurrentReader(payload) {
  Auth.setToken(payload.token)
  Auth.setSessionToken(payload[Env.SESSION_ID_FIELD])
  Auth.setCsrfToken(payload[Env.CSRF_TOKEN_FIELD])
  return {
    type: A.SET_CURRENT_READER,
    payload,
  }
}

export function getCurrentReader() {
  return dispatch => {
    const request = CurrentReader.getCurrentReader()
    request
      .then(res => dispatch(updateCurrentReader(res.data)))
      .then(() => dispatch(getRecommendation(3)))
      .catch(err => console.log(`Error in getCurrentReader ${err}`))
    return request
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

export function usePlatformAs(platformUse) {
  const platform = {
    publishingAs: platformUse,
  }
  return dispatch => {
    CurrentReader.usePlatformAs(platform)
      .then(res => dispatch(updateCurrentReader(res.data)))
      .catch(err => console.log(`Error in getPlatformUse ${err}`))
  }
}

export function updateReader(payload) {
  return dispatch => {
    const request = CurrentReader.updateReader(payload)
    request
      .then(res => dispatch(getCurrentReader()))
      .catch(err => console.log(`Error in updateReader ${err}`))
    return request
  }
}

export function updateShippingAddress(payload) {
  return dispatch => {
    CurrentReader.updateShippingAddress(payload)
      .then(res => dispatch(getCurrentReader()))
      .catch(err => console.log(`Error in updateShippingAddress ${err}`))
  }
}

export function deleteSocialAccount(payload) {
  return dispatch => {
    SocialReader.deleteSocialAccount(payload)
      .then(res => dispatch(getCurrentReader()))
      .catch(err => console.log(`Error in deleteSocialAccount ${err}`))
  }
}

export function getSocialAccounts() {
  return dispatch => {
    SocialReader.getSocialAccounts()
      .then(res => dispatch(updateSocialAccounts(res.data)))
      .catch(err => console.log(`Error in updateSocialAccounts ${err}`))
  }
}

export function updateSocialAccounts(payload) {
  return dispatch => {
    return dispatch({
      type: A.UPDATE_SOCIAL_ACCOUNTS,
      payload,
    })
  }
}

export function selectSocialAccount(payload) {
  const data = {
    socialAccountId: payload,
  }
  return dispatch => {
    SocialReader.selectSocialAccount(data)
      .then(res => dispatch(getCurrentReader()))
      .catch(err => console.log(`Error in selectSocialAccount ${err}`))
  }
}

export function unSelectSocialAccount(payload) {
  const data = {
    socialAccountId: payload,
  }
  return dispatch => {
    SocialReader.unSelectSocialAccount(data)
      .then(res => dispatch(getCurrentReader()))
      .catch(err => console.log(`Error in unSelectSocialAccount ${err}`))
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

export function updateCurrentReaderRecommendation(recommendation) {
  return {
    type: A.UPDATE_CURRENT_READER_RECOMMENDATION,
    payload: recommendation,
  }
}

export function logoutCurrentReader() {
  return dispatch => {
    CurrentReader.logoutCurrentReader()
      .then(res => dispatch({ type: A.USER_LOGOUT }))
      .catch(err => console.log(`Error in getCurrentReader ${err}`))
  }
}

export default {
  setCurrentReader,
  refreshCurrentReader,
  getCurrentReader,
  updateCurrentReader,
  updateCurrentReaderRecommendation,
  usePlatformAs,
  updateReader,
  deleteSocialAccount,
  logoutCurrentReader,
  selectSocialAccount,
  unSelectSocialAccount,
  updateShippingAddress,
}
