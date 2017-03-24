import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const { currentReader: { getCurrentReader, usePlatformAs, updateReader } } = Endpoints

const General = () => {
  return {
    getCurrentReader: () => authenticated().get(getCurrentReader()),
    usePlatformAs: (body) => authenticated().post(usePlatformAs(), body),
    updateReader: (body) => authenticated().post(updateReader(), body),
  }
}

export default General()
