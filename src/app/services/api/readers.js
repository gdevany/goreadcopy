import http from '../http'
import { Endpoints } from '../../constants'

const { readers, readerValidation, getGenres } = Endpoints

const Readers = {
  checkValidation: (body) => http.get(readerValidation(body)),
  createReader: (body) => http.post(readers(), body),
  getLandingBooks: (body) => http.get(getBooks(body)),
  getLandingGenres: (body) => http.get(getGenres(body)),
}

export default Readers
