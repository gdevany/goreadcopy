import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getLitcoinBalance,
  }
} = Endpoints

const Litcoins = () => {
  return {
    getLitcoinBalance: () => authenticated().get(getLitcoinBalance()),
  }
}

export default Litcoins()
