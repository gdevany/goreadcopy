import { createSelector } from 'reselect';

export const getState = state => state.books;

export const getBestSellers = createSelector(
  getState,
  books => books.bestSellers.byIds.map(bookId => books.entities[bookId]),
);
