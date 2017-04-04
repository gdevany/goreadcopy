import CurrentReaderRecommendation from '../../services/api/currentReader/recommendation'
import Search from '../../services/api/search'
import { CURRENT_READER as A } from '../const/actionTypes'
import { LITCOIN_TYPES as L, CONTEXTS as C } from '../../constants/litcoins'
import { Promise } from '../../services'
import { updateReaderData } from './readerData'
import { updateCurrentReaderRecommendation } from './currentReader'
import { updateLitcoinBalance } from './litcoins'
import { debounce } from 'lodash'
import R from 'ramda'

export function getRecommendation(amount) {
  return (dispatch, getState) => {
    const currentReaderGenres = getState().currentReader.genreIds || []
    const readerDataGenres = getState().readerData.genreIds
    const genreData =
      R.isEmpty(currentReaderGenres) ?
      readerDataGenres :
      currentReaderGenres

    const genreIds = typeof genreData[0] === 'number' ?
      genreData : R.pluck('id', (genreData))

    CurrentReaderRecommendation.getRecommendation({
      genreIds,
      perUserType: amount,
    })
      .then(res => dispatch(updateRecommended(res.data)))
      .catch(err => console.error(`Error in getRecommendation api call: ${err}`))
  }
}

export function searchRecommendation(search) {
  const debounceSearch = () => {
    return debounce(dispatch => {
      Search.search({
        author: search,
        reader: search
      })
        .then(res => {
          return dispatch(updateRecommended(res.data))
        })
        .catch(err => console.error(`Error in searchRecommendation ${err}`))
    }, 1000)
  }

  return debounceSearch()
}

export function choseRecommendation(data, type, context = C.ONBOARDING) {
  return dispatch => {
    switch (type) {
      case 'readers':
        return CurrentReaderRecommendation.likedReaders({ readerIds: data, context })
          .then(res => dispatch({ type: A.CHOSE_RECOMMENDATION }))
          .catch((err) => console.error(`Error in choseRecommendation api call: ${err}`))
      case 'authors':
        return CurrentReaderRecommendation.likedAuthors({ authorIds: data, context })
          .then(res => dispatch({ type: A.CHOSE_RECOMMENDATION }))
          .catch((err) => console.error(`Error in choseRecommendation api call: ${err}`))
      default:
        return Promise.reject('Error in choseRecommendation')
    }
  }
}

export function updateRecommendedLitcoins(data, type) {
  return dispatch => {
    switch (type) {
      case 'readers':
        return Promise.resolve(dispatch(updateReaderData({ readerIds: data })))
          .then(() => dispatch(updateLitcoinBalance(L.CHOOSE_READER)))
      case 'authors':
        return Promise.resolve(dispatch(updateReaderData({ authorIds: data })))
          .then(() => dispatch(updateLitcoinBalance(L.CHOOSE_AUTHOR)))
      default:
        return Promise.reject('Error in updateRecommendedLitcoin')
    }
  }
}

export function getRecommendedAuthors(amount) {
  return dispatch => {
    CurrentReaderRecommendation.getRecommendedAuthors({ perPage: amount })
      .then(res => dispatch(updateCurrentReaderRecommendation({ authors: res.data })))
      .catch(err => console.log(`Error in getRecommendedAuthors: ${err}`))
  }
}

export function updateRecommended(recommendation) {
  const payload =
    R.isArrayLike(recommendation) ?
    recommendation :
    [recommendation]

  return {
    type: A.GET_RECOMMENDATION,
    payload,
  }
}

export default {
  choseRecommendation,
  getRecommendation,
  getRecommendedAuthors,
  searchRecommendation,
  updateRecommended,
  updateRecommendedLitcoins,
}
