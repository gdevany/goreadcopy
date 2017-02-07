import { updateReaderData } from './readerData'
import { default as A } from '../const/actionTypes'
import CurrentReaderGenres from '../../services/api/currentReader/genres'

export function getGenres(query) {
  return dispatch => {
    /* Use this code when API ready and delete genres array below:
    Readers.getLandingGenres(query)
      .then((response) => dispatch(updateGenres(response.result)))
      .catch((error) => console.log(`Error in getGenres api call: ${err}`)) */

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
  CurrentReaderGenres.createChosenGenres(genres)
  return (dispatch) => {
    dispatch(updateReaderData(genres))
  }
}

export function updateGenres(genres) {
  return {
    type: A.GET_GENRES,
    payload: genres,
  }
}

export default {
  createChosenReaderGenres,
  getGenres,
  updateGenres,
}
