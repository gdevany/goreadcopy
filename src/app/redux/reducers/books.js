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
};

export const normalizeEntities = entitites => (entitites.reduce((normalizedEntities, entity) => ({
  ...normalizedEntities,
  [entity.id]: entity,
}), {}));

const entitiesReducer = handleAction(
  combineActions(A.GET_BEST_SELLERS_FULFILLED, A.GET_NEW_RELEASES_FULFILLED),
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


export default combineReducers({
  entities: entitiesReducer,
  payload: payloadReducer,
  isFetching: isFetchingReducer,
  bestSellers: bestSellersReducer,
  newReleases: newReleasesReducer,
});
