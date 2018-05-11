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
    subjects: {
      byIds: [],
      count: null,
      perPage: 10,
      page: 0,
      sort: null,
    },
    popular: {
      byIds: [],
      count: null,
      perPage: 10,
      page: 0,
      sort: null,
    },
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

const categoriesReducer = handleAction(
  combineActions(A.GET_BOOKS_CATEGORIES_FULFILLED),
  (state, { payload }) => ({
    ...state,
    ...normalizeEntities(payload.categories),
  }),
  initialState.entities,
);

export const withType = type => reducerFn => (state, action) => (
  action.meta.type === type ? reducerFn(state, action) : state
);

export const booksSubjectsReducer = handleActions({
  [A.GET_BOOKS_CATEGORIES_PENDING]: withType('subject')(state => ({
    ...state,
    isFetching: true,
  })),
  [A.GET_BOOKS_CATEGORIES_FULFILLED]: withType('subject')((state, { payload }) => ({
    ...state,
    byIds: [...state.byIds, ...payload.categories.map(category => category.id)],
    perPage: payload.perPage,
    page: payload.page,
    count: payload.count,
    sort: payload.sort,
    isFetching: false,
  })),
  [A.RESET_BOOKS_SUBJECTS]: () => initialState.categories.subjects,
}, initialState.categories.subjects);

export const popularCategoriesReducer = handleActions({
  [A.GET_BOOKS_CATEGORIES_PENDING]: withType('popular')(state => ({
    ...state,
    isFetching: true,
  })),
  [A.GET_BOOKS_CATEGORIES_FULFILLED]: withType('popular')((state, { payload }) => ({
    ...state,
    byIds: [...state.byIds, ...payload.categories.map(category => category.id)],
    perPage: payload.perPage,
    page: payload.page,
    count: payload.count,
    sort: payload.sort,
    isFetching: false,
  })),
  [A.RESET_POPULAR_BOOKS_CATEGORIES]: () => initialState.categories.popular,
}, initialState.categories.popular);


export default combineReducers({
  entities: entitiesReducer,
  payload: payloadReducer,
  isFetching: isFetchingReducer,
  bestSellers: bestSellersReducer,
  newReleases: newReleasesReducer,
  comingSoon: comingSoonReducer,
  trending: trendingReducer,
  categories: combineReducers({
    entities: categoriesReducer,
    popular: popularCategoriesReducer,
    subjects: booksSubjectsReducer,
  }),
});
