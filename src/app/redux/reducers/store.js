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
    case A.GET_BEST_SELLERS:
      return R.merge(state, { bestSellers: payload })
    case A.GET_TRENDING_BOOKS:
      return R.merge(state, { trendingBooks: payload })
    default:
      return state
  }
}
