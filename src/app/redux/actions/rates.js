import { RATES as A } from '../const/actionTypes'
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
    Rates.getRates(modelName, id)
      .then(res => dispatch({ type: A.GET_RATES, payload: res.data }))
      .catch(err => console.error(`Error in getRates ${err}`))
  }
}

export default {
  getStarsInfo,
  getRates,
}
