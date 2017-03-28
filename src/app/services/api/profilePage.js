import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http
const {
  getProfilePage,
  currentlyReading,
  getLibrary,
  getTopBooks,
  currentReader: {
    updateLibrary,
    setCurrentlyReading,
    deleteTopBooks,
    updateTopBooks,
  }
} = Endpoints

const General = () => {
  return {
    getProfilePage: (slug) => http.get(getProfilePage(slug)),
    getAuthProfilePage: (slug) => authenticated().get(getProfilePage(slug)),
    currentlyReading: (id) => http.get(currentlyReading(id)),
    getLibrary: (id, params) => http.get(getLibrary(id, params)),
    getTopBooks: (id) => http.get(getTopBooks(id)),
    updateLibrary: (body) => authenticated().post(updateLibrary(), body),
    setCurrentlyReading: (body) => authenticated().post(setCurrentlyReading(), body),
    deleteBookLibrary: (data) => authenticated().delete(updateLibrary(), { data }),
    deleteTopBooks: (data) => authenticated().delete(deleteTopBooks(), { data }),
    updateTopBooks: (body) => authenticated().post(updateTopBooks(), body),
  }
}

export default General()
