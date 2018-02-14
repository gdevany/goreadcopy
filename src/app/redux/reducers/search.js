import R from 'ramda';
import { SEARCH as A } from '../const/actionTypes';
import initialState from '../../initialState';

export default (state = initialState.search, { type, payload, errors }) => {
  let diff;
  switch (type) {
    case A.GET_SEARCH:
      return R.merge(state, payload);
    case A.LOCK_SEARCH_BOOKS:
      return R.merge(state, {
        bookSearch: {
          ...state.bookSearch,
          isLocked: true,
        },
      });
    case A.UNLOCK_SEARCH_BOOKS:
      return R.merge(state, {
        bookSearch: {
          ...state.bookSearch,
          isLocked: false,
        },
      });
    case A.SEARCH_BOOKS:
      return R.merge(state, {
        bookSearch: payload && payload.page > 1 ?
          {
            ...payload,
            results: R.concat(state.bookSearch.results, payload.results),
            isLocked: false,
          } :
          {
            ...payload,
            isLocked: false,
          },
      });
    case A.REMOVE_FROM_BOOK_SEARCH:
      diff = {
        ...state,
        bookSearch: {
          ...state.bookSearch,
          results: R.filter(n => n.ean !== payload.results[0].ean, state.bookSearch.results),
        },
      };
      return R.merge(state, diff);
    case A.CLEAN_SEARCH:
      return initialState.search;
    default:
      return state;
  }
};
