import { default as A } from '../const/actionTypes'
import CurrentReaderGenres from '../../services/api/currentReader/genres'
// import Readers from '../../services/api/readers'
import { updateReaderData } from './readerData'
import { updateLitcoinBalance } from './litcoins'
import { LITCOIN_TYPES as L } from '../../constants/litcoins'

export function getGenres(query) {
  return dispatch => {
    // Readers.getLandingGenres()
    //   .then(res => {
    //     console.log('result', res)
    //     // dispatch(updateGenres(res))
    //   })
    //   .catch((err) => console.log(`Error in getGenres api call: ${err}`))

    const genres = [
      {
        id: 0,
        name: 'Popular'
      },
      {
        id: 1,
        name: 'Sci-Fi'
      },
      {
        id: 2,
        name: 'Romance'
      },
      {
        id: 3,
        name: 'Young Adult'
      },
      {
        id: 4,
        name: 'Sports'
      },
      {
        id: 5,
        name: 'Business'
      },
      {
        id: 6,
        name: 'Cooking'
      }
    ]

    dispatch(updateGenres(genres))
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
