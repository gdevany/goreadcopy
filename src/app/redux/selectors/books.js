import { createSelector } from 'reselect';

export const getState = state => state.books;

export const getBestSellers = createSelector(
  getState,
  books => books.bestSellers.byIds.map(bookId => books.entities[bookId]),
);

export const getNewReleases = createSelector(
  getState,
  books => books.newReleases.byIds.map(bookId => books.entities[bookId]),
);
