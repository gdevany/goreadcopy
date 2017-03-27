import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getCurrentReader,
    usePlatformAs,
    updateReader,
    logoutCurrentReader,
    updateLibrary,
    currentlyReading
  }
} = Endpoints

const General = () => {
  return {
    getCurrentReader: () => authenticated().get(getCurrentReader()),
    logoutCurrentReader: () => authenticated().post(logoutCurrentReader()),
    usePlatformAs: (body) => authenticated().post(usePlatformAs(), body),
    updateReader: (body) => authenticated().post(updateReader(), body),
    updateLibrary: (body) => authenticated().post(updateLibrary(), body),
    currentlyReading: (body) => authenticated().post(currentlyReading(), body),
    deleteBookLibrary: (data) => authenticated().delete(updateLibrary(), { data }),
  }
}

export default General()
