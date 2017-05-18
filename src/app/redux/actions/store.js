import { STORE as A } from '../const/actionTypes'
import Store from '../../services/api/store'

export function getCategories() {
  return dispatch => {
    Store.getCategories()
      .then(res => dispatch({ type: A.GET_CATEGORIES, payload: res.data }))
      .then(res => {
        const totalPages = Math.ceil(res.payload.count / res.payload.perPage)
        for (let i = 1; i < totalPages; i++) {
          Store.getCategories({ page: i + 1 })
            .then(res => dispatch({ type: A.GET_MERGE_CATEGORIES, payload: res.data.results }))
        }
      })
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

export function getBookInfo(bookSlug) {
  return dispatch => {
    Store.getBookInfo(bookSlug)
      .then(res => dispatch({ type: A.GET_BOOK_INFO, payload: res.data }))
      .catch(err => console.error(`Error in getBookInfo ${err}`))
  }
}

export default {
  getCategories,
  getBestSellers,
  getTrendingBooks,
  getMostPurchased,
  getRecommendedByAuthorFans,
  getBookInfo
}
