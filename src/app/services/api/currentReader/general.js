import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getCurrentReader,
    usePlatformAs,
    updateReader,
    logoutCurrentReader,
    updateShippingAddress,
  }
} = Endpoints

const General = () => {
  return {
    getCurrentReader: () => authenticated().get(getCurrentReader()),
    logoutCurrentReader: () => authenticated().post(logoutCurrentReader()),
    usePlatformAs: (body) => authenticated().post(usePlatformAs(), body),
    updateReader: (body) => authenticated().post(updateReader(), body),
    updateShippingAddress: (body) => authenticated().post(updateShippingAddress(), body),
  }
}

export default General()
