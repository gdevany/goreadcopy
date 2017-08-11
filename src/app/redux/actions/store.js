import { STORE as A, PROFILE_PAGE as B, COMMON as C } from '../const/actionTypes'
import { browserHistory } from 'react-router'
import Store from '../../services/api/store'
import Books from '../../services/api/books'
import ProfilePage from '../../services/api/profilePage'
import { getCurrentReader } from './currentReader'
import { Errors } from '../../services'

const { hasErrors, errorsFrom } = Errors

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
    return Store.getChildCategories(id)
      .then(res => dispatch({ type: A.GET_CHILD_CATEGORIES, payload: res.data }))
      .catch(err => console.error(`Error in getChildCategories ${err}`))
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
       .catch(err => console.error(`Error in getPopularCategories ${err}`))
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
      return Store.getAuthBookInfo(bookSlug)
        .then(res => dispatch({ type: A.GET_BOOK_INFO, payload: res.data }))
        .catch((err) => {
          console.log('Error in getBookInfo', err)
          browserHistory.push('/store')
        })
    }
  }
  return dispatch => {
    return Store.getBookInfo(bookSlug)
      .then(res => dispatch({ type: A.GET_BOOK_INFO, payload: res.data }))
      .catch((err) => {
        console.log('Error in getBookInfo', err)
        browserHistory.push('/store')
      })
  }
}

export function addToCart(bookId, logged) {
  return dispatch => {
    return Store.addBookToCart(bookId, logged)
      .then(res => {
        if (logged) dispatch(getCurrentReader())
      })
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

export function addToWishList(id, readerId, slug, isLogged) {
  const terms = {
    ean: id
  }
  return dispatch => {
    return ProfilePage.updateWishList(terms)
      .then(res => dispatch(getBookInfo(slug, isLogged)))
      .then(() => ProfilePage.getWishList(readerId))
      .then(res => dispatch({ type: B.GET_WISH_LIST, payload: res.data }))
      .catch(err => console.error(`Error in addToWishList ${err}`))
  }
}

export function removeFromWishList(id, readerId, slug, isLogged) {
  const terms = {
    ean: id
  }
  return dispatch => {
    return ProfilePage.deleteFromWishList(terms)
      .then(res => dispatch(getBookInfo(slug, isLogged)))
      .then(() => ProfilePage.getWishList(readerId))
      .then(res => dispatch({ type: B.GET_WISH_LIST, payload: res.data }))
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

export function getCartItems(params, logged) {
  return dispatch => {
    Store.getCartItems(params, logged)
      .then(res => dispatch({ type: A.GET_CART_ITEMS, payload: res.data }))
      .catch(err => console.error(`Error in getCartItems ${err}`))
  }
}

export function updateCartItems(id, quantity, logged) {
  return dispatch => {
    Store.updateCartItems(id, quantity)
      .then(res => dispatch(getCartItems({
        perPage: 50,
      }, logged)))
      .catch(err => console.error(`Error in updateCartItems ${err}`))
  }
}

export function removeItemFromCart(id, logged) {
  return dispatch => {
    Store.removeItemFromCart(id)
      .then(res => dispatch(getCartItems({
        perPage: 50,
      }, logged)))
      .catch(err => console.error(`Error in removeItemFromCart ${err}`))
  }
}

export function convertToGift(id, params, isUserLoggedIn) {
  return dispatch => {
    Store.convertToGift(id, params)
      .then(res => dispatch(getCartItems({
        perPage: 50,
      }, isUserLoggedIn)))
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
    return Store.setUserAddress(params)
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .catch(err => console.error(`Error in setUserAddress ${err}`))
  }
}

export function setUserAddressAndShipping(params, shippingMethod) {
  return dispatch => {
    return Store.setUserAddress(params)
      .then(res => dispatch(setShipping({
        shippingAddressId: res.data.shippingAddress.id,
        shippingMethod: shippingMethod,
      })))
      .catch(err => console.error(`Error in setUserAddressAndShipping ${err}`))
  }
}

export function setOrder(params) {
  return dispatch => {
    return Store.setOrder(params)
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .then(dispatch(getCurrentOrder()))
      .catch(err => console.error(`Error in setOrder ${err}`))
  }
}

export function getOrders(params) {
  return dispatch => {
    return Store.getOrders(params)
      .then(res => dispatch({ type: A.GET_ORDERS, payload: res.data }))
      .catch(err => console.error(`Error in getOrders ${err}`))
  }
}

export function getCurrentOrder(params, logged) {
  return dispatch => {
    return Store.setOrder(params)
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .then(() => {
        return Store.getShippingMethods()
          .then(res => dispatch({ type: A.GET_SHIPPING_METHODS, payload: res.data }))
          .then(() => {
            return Store.getCartItems({ perPage: 50 }, logged)
              .then((res) => dispatch({ type: A.GET_CART_ITEMS, payload: res.data }))
              .catch(err => console.log('Error in getCurrentOrder: getCartItems => ', err))
          })
          .catch(err => console.log('Error in getCurrentOrder: getShippingMethods => ', err))
      })
      .catch((err) => {
        const errors = hasErrors(err) ? errorsFrom(err) : null
        for (const key in errors) {
          const data = { type: 'error', message: errors[key].message }
          dispatch({ type: C.SHOW_ALERT_BAR, payload: data })
        }
        browserHistory.push('/shop/cart')
      })
  }
}

export function getShippingMethods() {
  return dispatch => {
    return Store.getShippingMethods()
      .then(res => dispatch({ type: A.GET_SHIPPING_METHODS, payload: res.data }))
      .catch(err => console.error(`Error in getShippingMethods ${err}`))
  }
}

export function setBilling(params) {
  return dispatch => {
    return Store.setBilling(params)
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .catch(err => console.error(`Error in setBilling ${err}`))
  }
}

export function setShipping(params) {
  return dispatch => {
    return Store.setShipping(params)
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .catch(err => console.error(`Error in setShipping ${err}`))
  }
}

export function placeOrder(params) {
  return dispatch => {
    return Store.placeOrder(params)
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
    return Store.reviewOrder(reviewParams)
      .then(() => dispatch(placeOrder(placeParams)))
      .catch(err => console.error(`Error in placeOrderWithChanges ${err}`))
  }
}

export function getPaypalConfig() {
  return dispatch => {
    return Store.getPaypalConfig()
      .then(res => dispatch({ type: A.GET_PAYPAL_CONFIG, payload: res.data }))
      .catch(err => console.error(`Error in getPaypalConfig ${err}`))
  }
}

export function setPromoCode(id, code) {
  return dispatch => {
    return Store.setPromoCode(id, { code })
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .catch(err => console.error(`Error in setPromoCode ${err}`))
  }
}

export function cleanPromoCode(id, code) {
  return dispatch => {
    return Store.cleanPromoCode(id, { code })
      .then(res => dispatch({ type: A.SET_ORDER, payload: res.data }))
      .catch(err => console.error(`Error in cleanPromoCode ${err}`))
  }
}

export function cleanOrderAndCart() {
  return dispatch => {
    Promise.resolve(dispatch({ type: A.CLEAN_ORDER_AND_CART }))
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
  cleanOrderAndCart,
}
