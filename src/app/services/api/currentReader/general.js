import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getCurrentReader,
    usePlatformAs,
    updateReader,
    logoutCurrentReader,
    updateLibrary
  }
} = Endpoints

const General = () => {
  return {
    getCurrentReader: () => authenticated().get(getCurrentReader()),
    logoutCurrentReader: () => authenticated().post(logoutCurrentReader()),
    usePlatformAs: (body) => authenticated().post(usePlatformAs(), body),
    updateReader: (body) => authenticated().post(updateReader(), body),
    updateLibrary: (body) => authenticated().post(updateLibrary(), body),
    deleteBookLibrary: (body) => authenticated().delete(updateLibrary(), body),
  }
}

export default General()
