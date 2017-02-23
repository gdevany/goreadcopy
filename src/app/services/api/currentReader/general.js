import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const { currentReader: { getCurrentReader } } = Endpoints

const General = () => {
  return {
    getCurrentReader: () => authenticated().get(getCurrentReader()),
  }
}

export default General()
