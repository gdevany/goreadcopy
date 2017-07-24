import { STORE as A } from '../const/actionTypes'
import { browserHistory } from 'react-router'
import Store from '../../services/api/store'
import Books from '../../services/api/books'
import ProfilePage from '../../services/api/profilePage'
import { getCurrentReader } from './currentReader'

export function getCategories() {
  const data = {
    sort: 'alphabetically',
  }
  return dispatch => {
    Store.getCategories(data)
      .then(res => dispatch({ type: A.GET_CATEGORIES, payload: res.data }))
      .then(res => {
        const totalPages = Math.ceil(res.payload.count / res.payload.perPage)
        for (let i = 1; i < totalPages; i++) {
          Store.getCategories({ page: i + 1, sort: 'alphabetically' })
            .then(res => dispatch({ type: A.GET_MERGE_CATEGORIES, payload: res.data.results }))
        }
      })
      .catch(err => console.error(`Error in getCategoriesAction ${err}`))
  }
}

export function getChildCategories(id) {
  return dispatch => {
    Store.getChildCategories(id)
      .then(res => dispatch({ type: A.GET_CHILD_CATEGORIES, payload: res.data }))
      .catch(err => console.error(`Error in getCategoriesAction ${err}`))
  }
}

export function getPopularCategories() {
  const data = {
    sort: 'popular',
    perPage: 15,
  }
  return dispatch => {
    Store.getCategories(data)
       .then(res => dispatch({ type: A.GET_POPULAR_CATEGORIES, payload: res.data }))
       .catch(err => console.error(`Error in getCategoriesAction ${err}`))
  }
}

export function getBestSellers(categoryId) {
  const data = {
    genreIds: categoryId,
    perPage: 6,
  }
  return dispatch => {
    Store.getBestSellers(data)
      .then(res => dispatch({ type: A.GET_BEST_SELLERS, payload: res.data }))
      .catch(err => console.error(`Error in getBestSellersAction ${err}`))
  }
}

export function getTrendingBooks(categoryId) {
  const data = {
    genreIds: categoryId,
    perPage: 5,
  }
  return dispatch => {
    Store.getTrendingBooks(data)
      .then(res => dispatch({ type: A.GET_TRENDING_BOOKS, payload: res.data }))
      .catch(err => console.error(`Error in getTrendingBooksAction ${err}`))
  }
}

export function getMostPurchased(categoryId) {
  const data = {
    genreIds: categoryId,
    perPage: 5,
  }
  return dispatch => {
    Store.getMostPurchased(data)
      .then(res => dispatch({ type: A.GET_MOST_PURCHASED, payload: res.data }))
      .catch(err => console.error(`Error in getMostPurchased ${err}`))
  }
}

export function getRecommendedByAuthorFans(categoryId) {
  const data = {
    genreIds: categoryId,
  }
  return dispatch => {
    Store.getRecommendedByAuthorFans(data)
      .then(res => dispatch({ type: A.GET_RECOMMENDED_BY_AUTHOR_FANS, payload: res.data }))
      .catch(err => console.error(`Error in getRecommendedByAuthorFans ${err}`))
  }
}

export function getBookInfo(bookSlug, isLogged) {
  if (isLogged) {
    return dispatch => {
      Store.getAuthBookInfo(bookSlug)
        .then(res => dispatch({ type: A.GET_BOOK_INFO, payload: res.data }))
        .catch(err => console.error(`Error in getBookInfo ${err}`))
    }
  }
  return dispatch => {
    Store.getBookInfo(bookSlug)
      .then(res => dispatch({ type: A.GET_BOOK_INFO, payload: res.data }))
      .catch(err => console.error(`Error in getBookInfo ${err}`))
  }
}

export function addToCart(bookId) {
  return dispatch => {
    Store.addBookToCart(bookId)
      .then(res => dispatch(getCurrentReader()))
      .catch(err => console.error(`Error in addToCart ${err}`))
  }
}

export function addToLibrary(id, slug, isLogged) {
  const terms = {
    ean: id
  }
  return dispatch => {
    return ProfilePage.updateLibrary(terms)
      .then(res => dispatch(getBookInfo(slug, isLogged)))
      .catch(err => console.error(`Error in addToLibrary ${err}`))
  }
}

export function removeFromLibrary(id, slug, isLogged) {
  const terms = {
    id: id
  }
  return dispatch => {
    return ProfilePage.deleteBookLibrary(terms)
      .then(res => dispatch(getBookInfo(slug, isLogged)))
      .catch(err => console.log(`Error in removeFromLibrary ${err}`))
  }
}

export function addToWishList(id, slug, isLogged) {
  const terms = {
    ean: id
  }
  return dispatch => {
    return ProfilePage.updateWishList(terms)
      .then(res => dispatch(getBookInfo(slug, isLogged)))
      .catch(err => console.error(`Error in addToWishList ${err}`))
  }
}

export function removeFromWishList(id, slug, isLogged) {
  const terms = {
    ean: id
  }
  return dispatch => {
    return ProfilePage.deleteFromWishList(terms)
      .then(res => dispatch(getBookInfo(slug, isLogged)))
      .catch(err => console.log(`Error in removeFromWishList ${err}`))
  }
}

export function filterBooks(params) {

  return dispatch => {
    Books.filterBooks(params)
      .then(res => dispatch({ type: A.GET_FILTERED_BOOKS, payload: res.data }))
      .catch(err => console.error(`Error in filterBooks ${err}`))
  }
}

export function getCartItems(params) {
  return dispatch => {
    Store.getCartItems(params)
      .then(res => {
        if (res.data.itemsCount === 0) {
          browserHistory.push('/browse')
        } else {
          dispatch({ type: A.GET_CART_ITEMS, payload: res.data })
        }
      })
      .catch(err => console.error(`Error in getCartItems ${err}`))
  }
}

export function updateCartItems(id, quantity) {
  return dispatch => {
    Store.updateCartItems(id, quantity)
      .then(res => dispatch(getCartItems({
        perPage: 50,
      })))
      .catch(err => console.error(`Error in updateCartItems ${err}`))
  }
}

export function removeItemFromCart(id) {
  return dispatch => {
    Store.removeItemFromCart(id)
      .then(res => dispatch(getCartItems({
        perPage: 50,
      })))
      .catch(err => console.error(`Error in removeItemFromCart ${err}`))
  }
}

export function convertToGift(id, params) {
  return dispatch => {
    Store.convertToGift(id, params)
      .then(res => dispatch(getCartItems({
        perPage: 50,
      })))
      .catch(err => console.error(`Error in convertToGift ${err}`))
  }
}

export function addGiftData(params) {
  return dispatch => {
    Store.addGiftData(params)
      .then(res => dispatch({ type: A.SET_GIFT_SHIPPING, payload: res.data }))
      .catch(err => console.error(`Error in addGiftData ${err}`))
  }
}

export function setUserAddress(params, shippingMethod) {
  return dispatch => {
    Store.setUserAddress(params)
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .catch(err => console.error(`Error in setUserAddress ${err}`))
  }
}

export function setUserAddressAndShipping(params, shippingMethod) {
  return dispatch => {
    Store.setUserAddress(params)
      .then(res => dispatch(setShipping({
        shippingAddressId: res.data.shippingAddress.id,
        shippingMethod: shippingMethod,
      })))
      .catch(err => console.error(`Error in setUserAddressAndShipping ${err}`))
  }
}

export function setOrder(params) {
  return dispatch => {
    Store.setOrder(params)
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .catch(err => console.error(`Error in setOrder ${err}`))
  }
}

export function getOrders(params) {
  return dispatch => {
    Store.getOrders(params)
      .then(res => dispatch({ type: A.GET_ORDERS, payload: res.data }))
      .catch(err => console.error(`Error in getOrders ${err}`))
  }
}

export function getCurrentOrder(params) {
  return dispatch => {
    Store.getCurrentOrder(params)
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .then(() => Store.getShippingMethods())
      .then(res => dispatch({ type: A.GET_SHIPPING_METHODS, payload: res.data }))
      .then(res => dispatch(getCartItems({
        perPage: 50,
      })))
      .catch((err) => {
        if (err.response !== undefined) {
          const { data } = err.response
          if (data.errors.order && data.errors.order.message === 'Order not found') {
            browserHistory.push('/browse')
          }
        }
        console.error(`Error in getCurrentOrder ${err}`)
      })
  }
}

export function getShippingMethods() {
  return dispatch => {
    Store.getShippingMethods()
      .then(res => dispatch({ type: A.GET_SHIPPING_METHODS, payload: res.data }))
      .catch(err => console.error(`Error in getShippingMethods ${err}`))
  }
}

export function setBilling(params) {
  return dispatch => {
    Store.setBilling(params)
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .catch(err => console.error(`Error in setBilling ${err}`))
  }
}

export function setShipping(params) {
  return dispatch => {
    Store.setShipping(params)
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .catch(err => console.error(`Error in setShipping ${err}`))
  }
}

export function placeOrder(params) {
  return dispatch => {
    Store.placeOrder(params)
      .then(res => {
        dispatch({ type: A.SET_ORDER, payload: res.data })
        if (res.data.status === 40) {
          browserHistory.push('/shop/success')
        }
      })
      .catch(err => console.error(`Error in placeOrder ${err}`))
  }
}

export function placeOrderWithChanges(reviewParams, placeParams) {
  return dispatch => {
    Store.reviewOrder(reviewParams)
      .then(() => dispatch(placeOrder(placeParams)))
      .catch(err => console.error(`Error in placeOrderWithChanges ${err}`))
  }
}

export function getPaypalConfig() {
  return dispatch => {
    Store.getPaypalConfig()
      .then(res => dispatch({ type: A.GET_PAYPAL_CONFIG, payload: res.data }))
      .catch(err => console.error(`Error in getPaypalConfig ${err}`))
  }
}

export function setPromoCode(id, code) {
  return dispatch => {
    Store.setPromoCode(id, { code })
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .catch(err => console.error(`Error in setPromoCode ${err}`))
  }
}

export function cleanPromoCode(id, code) {
  return dispatch => {
    Store.cleanPromoCode(id, { code })
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .catch(err => console.error(`Error in cleanPromoCode ${err}`))
  }
}

export default {
  getCategories,
  getChildCategories,
  getPopularCategories,
  getBestSellers,
  getTrendingBooks,
  getMostPurchased,
  getRecommendedByAuthorFans,
  getBookInfo,
  addToCart,
  addToLibrary,
  removeFromLibrary,
  addToWishList,
  removeFromWishList,
  filterBooks,
  getCartItems,
  updateCartItems,
  removeItemFromCart,
  convertToGift,
  addGiftData,
  setUserAddress,
  setUserAddressAndShipping,
  setOrder,
  getOrders,
  getCurrentOrder,
  getShippingMethods,
  setBilling,
  setShipping,
  placeOrder,
  placeOrderWithChanges,
  getPaypalConfig,
  setPromoCode,
  cleanPromoCode,
}
