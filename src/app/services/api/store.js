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
    getOrders,
    getCurrentOrder,
    getShippingMethods,
    setBilling,
    setShipping,
    reviewOrder,
    placeOrder,
    getPaypalConfig,
    setPromoCode,
    cleanPromoCode,
    validateCategory,
    setUsingLitcoins,
    getSoldBooks
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
    validateCategory: (id) => http.get(validateCategory(id)),
    getAuthBookInfo: (id) => authenticated().get(getBookInfo(id)),
    addBookToCart: (id, logged) => {
      if (logged) return authenticated().post(addBookToCart(id))
      return http.post(addBookToCart(id))
    },
    getCartItems: (params, logged) => {
      if (logged) return authenticated().get(getCartItems(params))
      return http.get(getCartItems(params))
    },
    updateCartItems: (id, quantity) => authenticated().post(updateCartItems(id, quantity)),
    removeItemFromCart: (id) => authenticated().delete(removeItemFromCart(id)),
    convertToGift: (id, params) => authenticated().post(convertToGift(id), params),
    addGiftData: (params) => authenticated().post(addGiftData(), params),
    setUserAddress: (params) => authenticated().post(setUserAddress(), params),
    setOrder: (params) => authenticated().post(setOrder(), params),
    getOrders: (params) => authenticated().get(getOrders(), params),
    getCurrentOrder: (params) => authenticated().get(getCurrentOrder(), params),
    getShippingMethods: () => authenticated().get(getShippingMethods()),
    setBilling: (params) => authenticated().post(setBilling(), params),
    setShipping: (params) => authenticated().post(setShipping(), params),
    placeOrder: (params) => authenticated().post(placeOrder(), params),
    reviewOrder: (params) => authenticated().post(reviewOrder(), params),
    getPaypalConfig: () => authenticated().get(getPaypalConfig()),
    setPromoCode: (id, params) => authenticated().post(setPromoCode(id), params),
    cleanPromoCode: (id, params) => authenticated().post(cleanPromoCode(id), params),
    setUsingLitcoins: (params)=> authenticated().post(setUsingLitcoins(), params),
    getSoldBooks: (params) => http.get(getSoldBooks(params)),
  }
}

export default Store()
