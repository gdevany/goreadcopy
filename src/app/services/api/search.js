import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http

const { searchData, searchBooksData } = Endpoints

const Search = () => {
  return {
    search: (body) => http.get(searchData(body)),
    searchBooks: (body) => authenticated().get(searchBooksData(body)),
  }
}

export default Search()
