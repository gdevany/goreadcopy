import http from '../http'
import { Endpoints } from '../../constants'

const { books } = Endpoints

const Books = () => {
  return {
    getBooks: (params) => http.get(books(params))
  }
}

export default Books()
