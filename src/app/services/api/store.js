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
    addBookToCart,
    getChildCategories,
    getCartItems,
    updateCartItems,
    removeItemFromCart,
    convertToGift,
    addGiftData,
    setUserAddress,
    setOrder,
    getOrder,
    getCurrentOrder,
    getShippingMethods,
    setBilling
  }
} = Endpoints

const Store = () => {
  return {
    getBestSellers: (params) => http.get(getBestSellers(params)),
    getCategories: (params) => http.get(getCategories(params)),
    getChildCategories: (id, params) => http.get(getChildCategories(id, params)),
    getTrendingBooks: (params) => http.get(getTrendingBooks(params)),
    getMostPurchased: (params) => authenticated().get(getMostPurchased(params)),
    getRecommendedByAuthorFans: (params) => http.get(getRecommendedByAuthorFans(params)),
    getBookInfo: (id) => http.get(getBookInfo(id)),
    getAuthBookInfo: (id) => authenticated().get(getBookInfo(id)),
    addBookToCart: (id) => authenticated().post(addBookToCart(id)),
    getCartItems: (params) => authenticated().get(getCartItems(params)),
    updateCartItems: (id, quantity) => authenticated().post(updateCartItems(id, quantity)),
    removeItemFromCart: (id) => authenticated().delete(removeItemFromCart(id)),
    convertToGift: (id, params) => authenticated().post(convertToGift(id), params),
    addGiftData: (params) => authenticated().post(addGiftData(), params),
    setUserAddress: (params) => authenticated().post(setUserAddress(), params),
    setOrder: (params) => authenticated().post(setOrder(), params),
    getOrder: (params) => authenticated().get(getOrder(), params),
    getCurrentOrder: (params) => authenticated().get(getCurrentOrder(), params),
    getShippingMethods: () => authenticated().get(getShippingMethods()),
    setBilling: (params) => authenticated().post(setBilling(), params),
  }
}

export default Store()
