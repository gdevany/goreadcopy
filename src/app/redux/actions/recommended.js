import CurrentReaderRecommendation from '../../services/api/currentReader/recommendation'
import { CURRENT_READER as A } from '../const/actionTypes'
import { LITCOIN_TYPES as L } from '../../constants/litcoins'
import { Promise } from '../../services'
import { updateReaderData } from './readerData'
import { updateLitcoinBalance } from './litcoins'
import { debounce } from 'lodash'

export function getRecommendation() {
  return (dispatch, getState) => {
    const genreIds = getState().readerData.genreIds

    CurrentReaderRecommendation.getRecommendation({
      genreIds,
      perUserType: 5,
    })
      .then(res => dispatch(updateRecommended(res.data)))
      .catch(err => console.log(`Error in getRecommendation api call: ${err}`))
  }
}

export function searchRecommendation(search) {
  const debounceSearch = () => {
    return debounce(dispatch => {
      CurrentReaderRecommendation.searchRecommendation({
        author: search,
        reader: search
      })
        .then(res => {
          console.log(res.data)
          return dispatch(updateRecommended([res.data]))
        })
        .catch(err => console.log(`Error in searchRecommendation ${err}`))
    }, 1000)
  }

  return debounceSearch()
}

export function choseRecommendation(data, type) {
  return dispatch => {
    switch (type) {
      case 'readers':
        return CurrentReaderRecommendation.likedReaders({ readerIds: data })
          .then(res => dispatch({ type: A.CHOSE_RECOMMENDATION }))
          .catch((err) => console.log(`Error in choseRecommendation api call: ${err}`))
      case 'authors':
        return CurrentReaderRecommendation.likedAuthors({ authorIds: data })
          .then(res => dispatch({ type: A.CHOSE_RECOMMENDATION }))
          .catch((err) => console.log(`Error in choseRecommendation api call: ${err}`))
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

export function updateRecommended(recommendation) {
  return {
    type: A.GET_RECOMMENDATION,
    payload: recommendation,
  }
}

export default {
  choseRecommendation,
  getRecommendation,
  searchRecommendation,
  updateRecommended,
  updateRecommendedLitcoins,
}
