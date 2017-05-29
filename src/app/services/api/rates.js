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
  }
} = Endpoints

const Rates = () => {
  return {
    getStarsInfo: (modelName, id) => authenticated().get(getStarsInfo(modelName, id)),
    getRates: (modelName, id) => authenticated().get(getRates(modelName, id)),
  }
}

export default Rates()
