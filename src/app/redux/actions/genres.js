// import axios from 'axios'
//import base from '../../services/base'
import { default as A } from '../const/actionTypes'
import CurrentReaderGenres from '../../services/currentReader/genres'
import { updateUserData } from './userData'

//const { apiUrl } = base

export function getGenres(query) {
  return dispatch => {
    /* example url until endpoint is finalized
    axios.get(apiUrl('genres', { landing: true }))
      .then(response => {
        dispatch(updateGenres(response.results)))
      }.catch(error => console.log(error))
    */

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
    dispatch(updateUserData(genres))
  }
}

export function updateGenres(genres) {
  return {
    type: A.GET_GENRES,
    genres,
  }
}
