import R from 'ramda'
import { STORE as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.store, { type, payload }) => {
  switch (type) {
    case A.GET_CATEGORIES:
      return R.merge(state, { categories: payload.results })
    case A.GET_MERGE_CATEGORIES:
      return {
        ...state,
        categories: R.concat(state.categories || [], payload)
      }
    case A.GET_CHILD_CATEGORIES:
      return R.merge(state, { childCategories: payload.results })
    case A.GET_MERGE_CHILD_CATEGORIES:
      return {
        ...state,
        childCategories: R.concat(state.categories || [], payload)
      }
    case A.GET_BEST_SELLERS:
      return R.merge(state, { bestSellers: payload })
    case A.GET_TRENDING_BOOKS:
      return R.merge(state, { trendingBooks: payload })
    case A.GET_MOST_PURCHASED:
      return R.merge(state, { mostPurchased: payload })
    case A.GET_RECOMMENDED_BY_AUTHOR_FANS:
      return R.merge(state, { recommendedByAuthorFans: payload })
    case A.GET_POPULAR_CATEGORIES:
      return R.merge(state, { popularCategories: payload.results })
    case A.GET_BOOK_INFO:
      return R.merge(state, { bookInfo: payload })
    case A.GET_FILTERED_BOOKS:
      return R.merge(state, { bookFilterResults: payload })
    case A.GET_CART_ITEMS:
      return R.merge(state, { cartItems: payload })
    case A.SET_ORDER:
      return R.merge(state, { order: payload })
    case A.SET_NEW_SHIPPING:
      return R.merge(...state,
        {
          order: {
            shippingAddress: payload
          }
        }
      )
    case A.GET_SHIPPING_METHODS:
      return R.merge(state, { shippingMethods: payload })
    case A.GET_PAYPAL_CONFIG:
      return R.merge(state, { paypalConfig: payload })
    default:
      return state
  }
}
