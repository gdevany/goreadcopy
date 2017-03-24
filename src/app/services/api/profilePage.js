import http from '../http'
import { Endpoints } from '../../constants'

const { getProfilePage, currentlyReading, getLibrary } = Endpoints

const General = () => {
  return {
    getProfilePage: (slug) => http.get(getProfilePage(slug)),
    currentlyReading: (id) => http.get(currentlyReading(id)),
    getLibrary: (id) => http.get(getLibrary(id)),
  }
}

export default General()
