import http from '../http'
import { Endpoints } from '../../constants'

const { readers,
        readerValidation,
        getGenres,
        getHomeGenres,
        getOnboardingGenres } = Endpoints

const Readers = {
  checkValidation: (body) => http.get(readerValidation(body)),
  createReader: (body) => http.post(readers(), body),
  getLandingBooks: (body) => http.get(getBooks(body)),
  getLandingGenres: (body) => http.get(getGenres(body)),
  getHomeGenres: (body) => http.get(getHomeGenres(body)),
  getOnboardingGenres: (body) => http.get(getOnboardingGenres(body)),
}

export default Readers // Use HTTP module here?
