import { merge, concat, filter, uniq, mergeWith } from 'ramda';
import { SEARCH as A } from '../const/actionTypes';
import initialState from '../../initialState';

const mergePlan = (x, y) => {
  if (Array.isArray(x) && Array.isArray(y)) {
    return uniq(concat(x, y));
  }
  if (typeof x === 'object' && typeof y === 'object') {
    return mergeWith(mergePlan, x, y);
  }
  return y;
};

export default (state = initialState.search, { type, payload, errors }) => {
  let diff;
  switch (type) {
    case A.LOCK_MAIN_SEARCH:
      return merge(state, {
        isLocked: true,
      });
    case A.UNLOCK_MAIN_SEARCH:
      return merge(state, {
        isLocked: false,
      });
    case A.GET_SEARCH:
      return mergeWith(mergePlan, state, {
        ...payload,
        isLocked: false,
      });
    case A.LOCK_SEARCH_BOOKS:
      return merge(state, {
        bookSearch: {
          ...state.bookSearch,
          isLocked: true,
        },
      });
    case A.UNLOCK_SEARCH_BOOKS:
      return merge(state, {
        bookSearch: {
          ...state.bookSearch,
          isLocked: false,
        },
      });
    case A.SEARCH_BOOKS:
      return merge(state, {
        bookSearch: payload && payload.page > 1 ?
          {
            ...payload,
            results: concat(state.bookSearch.results, payload.results),
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
          results: filter(n => n.ean !== payload.results[0].ean, state.bookSearch.results),
        },
      };
      return merge(state, diff);
    case A.CLEAN_SEARCH:
      return initialState.search;
    default:
      return state;
  }
};
