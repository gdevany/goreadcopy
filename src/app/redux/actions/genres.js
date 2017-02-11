import { default as A } from '../const/actionTypes'
import CurrentReaderGenres from '../../services/api/currentReader/genres'
import Readers from '../../services/api/readers'
import { updateReaderData } from './readerData'
import { updateLitcoinBalance } from './litcoins'
import { LITCOIN_TYPES as L } from '../../constants/litcoins'
import { Deserialization } from '../../services'

const { fromPaginated } = Deserialization

export function getGenres() {
  return dispatch => {
    return Readers.getLandingGenres()
      .then(res => dispatch(updateGenres(fromPaginated(res))))
      .catch((err) => console.log(`Error in getGenres api call: ${err}`))
  }
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
}
