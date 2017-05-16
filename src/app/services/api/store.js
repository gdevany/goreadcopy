import http from '../http'
import { Endpoints } from '../../constants'

// const { authenticated } = http

const {
  store: {
    getBestSellers,
    getCategories,
    getTrendingBooks
  }
} = Endpoints

const Store = () => {
  return {
    getBestSellers: (params) => http.get(getBestSellers(params)),
    getCategories: (params) => http.get(getCategories(params)),
    getTrendingBooks: (params) => http.get(getTrendingBooks(params)),
  }
}

export default Store()
