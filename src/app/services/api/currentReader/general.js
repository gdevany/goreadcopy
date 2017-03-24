import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const { currentReader: { getCurrentReader, usePlatformAs, logoutCurrentReader } } = Endpoints

const General = () => {
  return {
    getCurrentReader: () => authenticated().get(getCurrentReader()),
    logoutCurrentReader: () => authenticated().post(logoutCurrentReader()),
    usePlatformAs: (body) => authenticated().post(usePlatformAs(), body),
  }
}

export default General()
