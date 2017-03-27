import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http
const { getProfilePage, currentlyReading, getLibrary, getTopBooks } = Endpoints

const General = () => {
  return {
    getProfilePage: (slug) => http.get(getProfilePage(slug)),
    getAuthProfilePage: (slug) => authenticated().get(getProfilePage(slug)),
    currentlyReading: (id) => http.get(currentlyReading(id)),
    getLibrary: (id) => http.get(getLibrary(id)),
    getTopBooks: (id) => http.get(getTopBooks(id)),
  }
}

export default General()
