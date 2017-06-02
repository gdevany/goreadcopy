import { STORE as A } from '../const/actionTypes'
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
    ProfilePage.updateLibrary(terms)
      .then(res => dispatch(getBookInfo(slug, isLogged)))
      .catch(err => console.error(`Error in addToLibrary ${err}`))
  }
}

export function removeFromLibrary(id, slug, isLogged) {
  const terms = {
    id: id
  }
  return dispatch => {
    ProfilePage.deleteBookLibrary(terms)
      .then(res => dispatch(getBookInfo(slug, isLogged)))
      .catch(err => console.log(`Error in removeFromLibrary ${err}`))
  }
}

export function addToWishList(id, slug, isLogged) {
  const terms = {
    ean: id
  }
  return dispatch => {
    ProfilePage.updateWishList(terms)
      .then(res => dispatch(getBookInfo(slug, isLogged)))
      .catch(err => console.error(`Error in addToWishList ${err}`))
  }
}

export function removeFromWishList(id, slug, isLogged) {
  const terms = {
    ean: id
  }
  return dispatch => {
    ProfilePage.deleteFromWishList(terms)
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
  filterBooks
}
