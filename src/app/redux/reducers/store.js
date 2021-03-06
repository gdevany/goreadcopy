import R from 'ramda'
import { STORE as A } from '../const/actionTypes'
import initialState from '../../initialState'

function setGiftShipping(
  { cartItems: { items } },
  { cartItems, giftMessage, shippingAddress }
) {
  return R.map(item => {
    if (R.contains(item.id, cartItems)) {
      item.giftcartitemdata.giftMessage = giftMessage
      item.giftcartitemdata.shippingAddress = shippingAddress
    }
    return item
  }, items)
}

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
    case A.RESET_CHILD_CATEGORIES:
      return R.merge(state, { childCategories: [] })
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
    case A.GET_MORE_FILTERED_BOOKS:
      return ({
        ...state,
        bookFilterResults: {
          ...payload,
          results: [
            ...state.bookFilterResults.results,
            ...payload.results,
          ],
          isFetching: false,
        }
      })
    case A.GET_MORE_FILTERED_BOOKS_FETCHING:
      return ({
        ...state,
        bookFilterResults: {
          ...state.bookFilterResults,
          isFetching: true,
        }
      })
    case A.GET_CART_ITEMS:
      return R.merge(state, { cartItems: payload })
    case A.SET_ORDER:
      return R.merge(state, { order: payload })
    case A.PLACE_ORDER:
      return R.merge(state, { order: {
        ...payload,
        litcoinsToEarn: state.order ? state.order.litcoinsToEarn : 0,
        litcoinsRedeemed: state.order ? state.order.litcoinsRedeemed : 0,
        dollarsRedeemed: state.order ? state.order.dollarsRedeemed : 0,
      } })
    case A.GET_ORDERS:
      return {
        ...state,
        userOrders: payload.results
      }
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
    case A.SET_PROMO_CODE:
      return R.merge(state, { promoCode: payload })
    case A.CLEAN_PROMO_CODE:
      return R.merge(state, { promoCode: {} })
    case A.SET_GIFT_SHIPPING:
      return R.merge(state, {
        cartItems: {
          ...state.cartItems,
          items: setGiftShipping(state, payload)
        }
      })
    case A.CLEAN_ORDER_AND_CART:
      return R.omit(['cartItems', 'order'], state)
    case A.HAS_REVIEWED:
      return R.merge(state, {
        bookInfo: {
          ...state.bookInfo,
          isReviewed: true
        }
      })
    case A.SET_USING_LITCOINS:
      return R.merge(state, {
        order: {
          ...state.order,
          dollarsRedeemed: payload.dollarsRedeemed,
          orderTotal: payload.orderTotal,
          orderSubtotal: payload.orderSubtotal,
          shippingCosts: payload.shippingFee,
          taxes: payload.stateTaxes,
          shippingDiscount: payload.shippingDiscount
        }
      })
    case A.GET_SOLD_BOOKS:
      return R.merge(state, payload)
    default:
      return state
  }
}
