import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http

const {
  store: {
    getBestSellers,
    getCategories,
    getTrendingBooks,
    getMostPurchased,
    getRecommendedByAuthorFans,
    getBookInfo,
  }
} = Endpoints

const Store = () => {
  return {
    getBestSellers: (params) => http.get(getBestSellers(params)),
    getCategories: (params) => http.get(getCategories(params)),
    getTrendingBooks: (params) => http.get(getTrendingBooks(params)),
    getMostPurchased: (params) => authenticated().get(getMostPurchased(params)),
    getRecommendedByAuthorFans: (params) => http.get(getRecommendedByAuthorFans(params)),
    getBookInfo: (id) => http.get(getBookInfo(id)),
  }
}

export default Store()
