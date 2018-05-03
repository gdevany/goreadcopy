import { createAction } from 'redux-actions';
import { BOOKS as A } from '../const/actionTypes';
import { Deserialization } from '../../services';
import { Books } from '../../services/api';
import CurrentReaderRecommendation from '../../services/api/currentReader/recommendation';
import { updateCurrentReaderRecommendation } from './currentReader';

const { fromPaginated } = Deserialization;

export const getBestSellers = createAction(A.GET_BEST_SELLERS, (page = 1, perPage = 10) => (
  new Promise((resolve, reject) => (
    Books.getBestSellers({ page, perPage })
      .then(({ data }) => resolve({
        books: data,
        page,
        perPage,
      }))
      .catch(err => reject(err))
  ))
));

export const getNewReleases = createAction(A.GET_NEW_RELEASES, (page = 1, perPage = 10) => (
  new Promise((resolve, reject) => (
    Books.getNewReleases({ page, perPage })
      .then(({ data }) => resolve({
        books: data,
        page,
        perPage,
      }))
      .catch(err => reject(err))
  ))
));

export const getComingSoon = createAction(A.GET_COMING_SOON_BOOKS, (page = 1, perPage = 10) => (
  new Promise((resolve, reject) => (
    Books.getComingSoon({ page, perPage })
      .then(({ data }) => resolve({
        books: data,
        page,
        perPage,
      }))
      .catch(err => reject(err))
  ))
));

export function getBooks(params) {
  return (dispatch, getState) => {
    dispatch({ type: A.GET_BOOKS })

    return Books.getBooks(params)
      .then(res => dispatch(getBooksSuccess(fromPaginated(res))))
      .catch((err) => console.error(`Error in getBooks api call: ${err}`))
  };
}

export function getBookRecommendations(amount) {
  return dispatch => {
    CurrentReaderRecommendation.getBookRecommendations({ perPage: amount })
      .then(res => dispatch(updateCurrentReaderRecommendation({ books: res.data.results })))
      .catch(err => console.error(`Error in getBookRecommendations: ${err}`))
  };
}

export function getBookClubRecommendations(amount) {
  return dispatch => {
    CurrentReaderRecommendation.getBookClubRecommendations({ perPage: amount })
      .then(res => dispatch(updateCurrentReaderRecommendation({ bookClubs: res.data.results })))
      .catch(err => console.error(`Error in getBookClubRecommendations: ${err}`))
  };
}

export function getBooksSuccess(books) {
  return {
    type: A.GET_BOOKS_SUCCESS,
    payload: books,
  };
}

export default {
  getBooks,
  getBooksSuccess,
  getBookRecommendations,
  getBookClubRecommendations,
};
