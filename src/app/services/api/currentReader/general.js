import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const { currentReader: { getCurrentReader, usePlatformAs } } = Endpoints

const General = () => {
  return {
    getCurrentReader: () => authenticated().get(getCurrentReader()),
    usePlatformAs: (body) => authenticated().post(usePlatformAs(), body),
  }
}

export default General()
