import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http

const {
  rates: {
    getStarsInfo,
    getRates,
    postRate,
  }
} = Endpoints

const Rates = () => {
  return {
    getStarsInfo: (modelName, id) => http.get(getStarsInfo(modelName, id)),
    getRates: (modelName, id) => http.get(getRates(modelName, id)),
    postRate: (modelName, params) => authenticated().post(postRate(modelName), params),
  }
}

export default Rates()
