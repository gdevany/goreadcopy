import http from '../http'
import { Endpoints } from '../../constants'

const { books, filterBooks } = Endpoints

const Books = () => {
  return {
    getBooks: (params) => http.get(books(params)),
    filterBooks: (params) => http.get(filterBooks(params)),
  }
}

export default Books()
