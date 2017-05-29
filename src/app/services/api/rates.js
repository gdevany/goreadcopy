import http from '../http'
import { Endpoints } from '../../constants'

/** TODO:
 Some endpoints should be public
 Adrian will fix this on his next commit
 **/

const { authenticated } = http

const {
  rates: {
    getStarsInfo,
    getRates,
    postRate,
    postReview,
  }
} = Endpoints

const Rates = () => {
  return {
    getStarsInfo: (modelName, id) => authenticated().get(getStarsInfo(modelName, id)),
    getRates: (modelName, id) => authenticated().get(getRates(modelName, id)),
    postRate: (modelName, params) => authenticated().post(postRate(modelName), params),
    postReview: (modelName, params) => authenticated().post(postReview(modelName), params),
  }
}

export default Rates()
