import { combineReducers } from 'redux';
import { handleActions, handleAction, combineActions } from 'redux-actions';
import { BOOKS as A } from '../const/actionTypes';

/* #TODO: refactor this to use a normalized structure */
const initialState = {
  payload: [],
  isFetching: false,
  entities: {},
  bestSellers: {
    isFetching: false,
    byIds: [],
    count: null,
    perPage: 10,
    page: 0,
  },
  newReleases: {
    isFetching: false,
    byIds: [],
    count: null,
    perPage: 10,
    page: 0,
  },
  comingSoon: {
    isFetching: false,
    byIds: [],
    count: null,
    perPage: 10,
    page: 0,
  },
  trending: {
    isFetching: false,
    byIds: [],
    count: null,
    perPage: 10,
    page: 0,
  },
  categories: {
    entities: {},
    byIds: [],
    count: null,
    perPage: 10,
    page: 0,
    sort: null,
  },
};

export const normalizeEntities = entitites => (entitites.reduce((normalizedEntities, entity) => ({
  ...normalizedEntities,
  [entity.id]: entity,
}), {}));

const entitiesReducer = handleAction(
  combineActions(
    A.GET_BEST_SELLERS_FULFILLED,
    A.GET_COMING_SOON_BOOKS_FULFILLED,
    A.GET_NEW_RELEASES_FULFILLED,
    A.GET_TRENDING_BOOKS_FULFILLED,
  ),
  (state, { payload }) => ({
    ...state,
    ...normalizeEntities(payload.books),
  }),
  initialState.entities,
);

/* TODO: this is hacky refactor books structure to use entities */
export const payloadReducer = handleAction(
  A.GET_BOOKS_SUCCESS,
  (state, { payload }) => ({
    ...state,
    payload,
  }),
  initialState.payload,
);

/* TODO: this is hacky refactor books structure to use entities */
export const isFetchingReducer = handleActions({
  [A.GET_BOOKS]: () => true,
  [A.GET_BOOKS_SUCCESS]: () => false,
}, initialState.isFetching);

export const bestSellersReducer = handleActions({
  [A.GET_BEST_SELLERS_PENDING]: state => ({
    ...state,
    isFetching: true,
  }),
  [A.GET_BEST_SELLERS_FULFILLED]: (state, { payload }) => ({
    ...state,
    byIds: [...state.byIds, ...payload.books.map(book => book.id)],
    perPage: payload.perPage,
    page: payload.page,
    count: payload.count,
    isFetching: false,
  }),
  [A.RESET_BEST_SELLERS]: () => initialState.bestSellers,
}, initialState.bestSellers);

export const newReleasesReducer = handleActions({
  [A.GET_NEW_RELEASES_PENDING]: state => ({
    ...state,
    isFetching: true,
  }),
  [A.GET_NEW_RELEASES_FULFILLED]: (state, { payload }) => ({
    ...state,
    byIds: [...state.byIds, ...payload.books.map(book => book.id)],
    perPage: payload.perPage,
    page: payload.page,
    count: payload.count,
    isFetching: false,
  }),
  [A.RESET_NEW_RELEASES]: () => initialState.newReleases,
}, initialState.newReleases);

export const trendingReducer = handleActions({
  [A.GET_TRENDING_BOOKS_PENDING]: state => ({
    ...state,
    isFetching: true,
  }),
  [A.GET_TRENDING_BOOKS_FULFILLED]: (state, { payload }) => ({
    ...state,
    byIds: [...state.byIds, ...payload.books.map(book => book.id)],
    perPage: payload.perPage,
    page: payload.page,
    count: payload.count,
    isFetching: false,
  }),
  [A.RESET_TRENDING_BOOKS]: () => initialState.trending,
}, initialState.trending);

export const comingSoonReducer = handleActions({
  [A.GET_COMING_SOON_BOOKS_PENDING]: state => ({
    ...state,
    isFetching: true,
  }),
  [A.GET_COMING_SOON_BOOKS_FULFILLED]: (state, { payload }) => ({
    ...state,
    byIds: [...state.byIds, ...payload.books.map(book => book.id)],
    perPage: payload.perPage,
    page: payload.page,
    count: payload.count,
    isFetching: false,
  }),
  [A.RESET_COMING_SOON_BOOKS]: () => initialState.comingSoon,
}, initialState.comingSoon);

export const categoriesReducer = handleActions({
  [A.GET_BOOKS_CATEGORIES_PENDING]: state => ({
    ...state,
    isFetching: true,
  }),
  [A.GET_BOOKS_CATEGORIES_FULFILLED]: (state, { payload }) => ({
    ...state,
    entities: {
      ...state.entities,
      ...normalizeEntities(payload.categories),
    },
    byIds: [...state.byIds, ...payload.categories.map(category => category.id)],
    perPage: payload.perPage,
    page: payload.page,
    count: payload.count,
    sort: payload.sort,
    isFetching: false,
  }),
  [A.RESET_BOOKS_CATEGORIES]: () => initialState.categories,
}, initialState.categories);


export default combineReducers({
  entities: entitiesReducer,
  payload: payloadReducer,
  isFetching: isFetchingReducer,
  bestSellers: bestSellersReducer,
  newReleases: newReleasesReducer,
  comingSoon: comingSoonReducer,
  trending: trendingReducer,
  categories: categoriesReducer,
});
