import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http

const { searchData } = Endpoints

const Search = () => {
  return {
    search: (body) => authenticated().get(searchData(body)),
  }
}

export default Search()
