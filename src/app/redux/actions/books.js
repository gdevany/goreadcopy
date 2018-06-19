import { createAction } from 'redux-actions';
import { BOOKS as A } from '../const/actionTypes';
import { Deserialization } from '../../services';
import { Books } from '../../services/api';
import CurrentReaderRecommendation from '../../services/api/currentReader/recommendation';
import { updateCurrentReaderRecommendation } from './currentReader';

const { fromPaginated } = Deserialization;

export const getBestSellers = createAction(A.GET_BEST_SELLERS, (params) => (
  new Promise((resolve, reject) => (
    Books.getBestSellers(params)
      .then(({ data }) => resolve({
        books: data,
        page: params.page,
        perPage: params.perPage,
      }))
      .catch(err => reject(err))
  ))
));

export const resetBestSellers = createAction(A.RESET_BEST_SELLERS);

export const getNewReleases = createAction(A.GET_NEW_RELEASES, (params) => (
  new Promise((resolve, reject) => (
    Books.getNewReleases(params)
      .then(({ data }) => resolve({
        books: data,
        page: params.page,
        perPage: params.perPage,
      }))
      .catch(err => reject(err))
  ))
));

export const resetNewReleases = createAction(A.RESET_NEW_RELEASES);

export const getComingSoon = createAction(A.GET_COMING_SOON_BOOKS, (params) => (
  new Promise((resolve, reject) => (
    Books.getComingSoon(params)
      .then(({ data }) => resolve({
        books: data,
        page: params.page,
        perPage: params.perPage,
      }))
      .catch(err => reject(err))
  ))
));

export const resetComingSoon = createAction(A.RESET_COMING_SOON_BOOKS);

export const getTrending = createAction(A.GET_TRENDING_BOOKS, (params) => (
  new Promise((resolve, reject) => (
    Books.getTrending(params)
      .then(({ data }) => resolve({
        books: data,
        page: params.page,
        perPage: params.perPage,
      }))
      .catch(err => reject(err))
  ))
));

export const resetTrending = createAction(A.RESET_TRENDING_BOOKS);

export const getCategories = createAction(
  A.GET_BOOKS_CATEGORIES,
  ({ page = 1, perPage = 10, sort = 'alphabetically' } = {}) => (
    new Promise((resolve, reject) => (
      Books.getCategories({ page, perPage, sort })
        .then(({ data }) => resolve({
          categories: data.results,
          page: data.page,
          perPage: data.perPage,
          count: data.count,
          sort,
        }))
        .catch(err => reject(err))
    ))
  ),
  ({ type }) => ({
    type,
  }),
);

export const resetPopularBooksCategories = createAction(A.RESET_POPULAR_BOOKS_CATEGORIES);
export const resetBooksSubjects = createAction(A.RESET_BOOKS_SUBJECTS);

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
