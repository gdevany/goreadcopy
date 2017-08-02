import { RATES as A, STORE as S } from '../const/actionTypes'
import Rates from '../../services/api/rates'

export function getStarsInfo(modelName, id) {
  return dispatch => {
    Rates.getStarsInfo(modelName, id)
      .then(res => dispatch({ type: A.GET_STARS_INFO, payload: res.data }))
      .catch(err => console.error(`Error in getStarsInfo ${err}`))
  }
}

export function getRates(modelName, id) {
  return dispatch => {
    return Rates.getRates(modelName, id)
      .then(res => dispatch({ type: A.GET_RATES, payload: res.data }))
      .catch(err => console.error(`Error in getRates ${err}`))
  }
}

export function postRateAndReview(modelName, rateData) {
  return dispatch => {
    return Rates.postRate(modelName, rateData)
      .then(res => dispatch({ type: A.PREPEND_REVIEW, payload: res.data }))
      .then(res => dispatch({ type: S.HAS_REVIEWED }))
      .catch(err => console.error(`Error in postRateAndReview ${err}`))
  }
}

export default {
  getStarsInfo,
  getRates,
  postRateAndReview,
}
