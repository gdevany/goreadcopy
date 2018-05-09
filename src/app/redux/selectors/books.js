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

export const getComingSoon = createSelector(
  getState,
  books => books.comingSoon.byIds.map(bookId => books.entities[bookId]),
);

export const getTrending = createSelector(
  getState,
  books => books.trending.byIds.map(bookId => books.entities[bookId]),
);

export const getBooksSubjects = createSelector(
  getState,
  books => books.categories.subjects.byIds.map(categoryId => books.categories.entities[categoryId]),
);

export const getPopularCategories = createSelector(
  getState,
  books => books.categories.popular.byIds.map(categoryId => books.categories.entities[categoryId]),
);
