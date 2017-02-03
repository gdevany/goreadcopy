import { default as http } from 'axios'
import endpoints from '../constants/endpoints'

const { readers, readerValidation, getGenres } = endpoints

const Readers = {
  getLandingBooks: (body) => http.get(getBooks(body)),
  createReader: (body) => http.post(readers(), body),
  getLandingGenres: (body) => http.get(getGenres(body)),
  checkValidation: (body) => http.get(readerValidation(body))
}

export default Readers
