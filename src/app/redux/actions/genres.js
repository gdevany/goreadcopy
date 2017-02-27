import { default as A } from '../const/actionTypes'
import CurrentReaderGenres from '../../services/api/currentReader/genres'
import Readers from '../../services/api/readers'
import Search from '../../services/api/search'
import { updateReaderData } from './readerData'
import { updateLitcoinBalance } from './litcoins'
import { LITCOIN_TYPES as L } from '../../constants/litcoins'
import { debounce } from 'lodash'
import { Deserialization } from '../../services'

const { fromPaginated } = Deserialization

export function getGenres(search) {
  return dispatch => {
    return Readers.getLandingGenres()
      .then(res => dispatch(updateGenres(fromPaginated(res))))
      .catch((err) => console.log(`Error in getGenres api call: ${err}`))
  }
}

export function searchGenres(search) {
  const debounceSearch = () => {
    return debounce(dispatch => {
      Search.search(search)
        .then(res => { dispatch(updateGenres(res.data.genres))})
        .catch(err => console.log(`Error in searchGenres ${err}`))
    }, 2000)
  }

  return debounceSearch()
}

export function createChosenReaderGenres(genres) {
  return (dispatch) => {
    CurrentReaderGenres.createChosenGenres(genres)
  }
}

export function updateGenreLitcoins(genres) {
  return dispatch => {
    dispatch(updateReaderData(genres))
    dispatch(updateLitcoinBalance(L.CHOSE_GENRE))
  }
}

export function updateGenres(genres) {
  return {
    type: A.GET_GENRES,
    payload: genres,
  }
}

export default {
  getGenres,
  createChosenReaderGenres,
  updateGenres,
  updateGenreLitcoins,
  searchGenres,
}
