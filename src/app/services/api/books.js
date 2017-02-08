import Http from '../http'
import { Endpoints } from '../../constants'

const { books } = Endpoints

const Books = (http) => {
  return {
    getBooks: (params) => http.get(books(params))
  }
}

export default Books(Http)
