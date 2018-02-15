import { debounce } from 'lodash';
import { SEARCH as A } from '../const/actionTypes';
import Search from '../../services/api/search';

export function mainSearch(params) {
  const {
    term, type, subFilter, page, perPage,
  } = params;
  let data;

  if (type === 'main-search') {
    data = {
      author: term,
      reader: term,
      book: term,
      publisher: term,
    };
  }

  if (type === 'book') {
    data = {
      book: term,
      subFilter,
    };
  }

  if (type === 'author') {
    data = {
      author: term,
    };
  }

  if (type === 'reader') {
    data = {
      reader: term,
    };
  }

  if (type === 'publisher') {
    data = {
      publisher: term,
    };
  }

  if (page != null) data.page = page;
  if (perPage != null) data.perPage = perPage;

  const debounceSearch = () => {
    return debounce(dispatch => {
      dispatch({ type: A.LOCK_MAIN_SEARCH });
      return Search.search(data)
        .then((res) => { dispatch(updateSearch(res.data)); })
        .catch((err) => {
          dispatch({ type: A.UNLOCK_MAIN_SEARCH });
          console.error(`Error in ${type} search ${err}`);
        });
    }, 300);
  };
  return debounceSearch();
}

export function bookSearch(query, params) {
  const { page, queryType, perPage } = params;
  const data = { query };
  if (queryType != null) data.queryType = queryType;
  if (page != null) data.page = page;
  if (perPage != null) data.perPage = perPage;
  const debounceSearch = () => (
    debounce(dispatch => {
      dispatch({ type: A.LOCK_SEARCH_BOOKS });
      return Search.searchBooks(data)
        .then(res => dispatch(updateBookSearch({
          ...res.data,
          page,
        })))
        .catch((err) => {
          console.error(`Error in book search ${err}`);
          const { response: { status } } = err;
          if (status === 400) dispatch({ type: A.CLEAN_SEARCH });
          if (status === 404) dispatch({ type: A.UNLOCK_SEARCH_BOOKS });
        });
    }, 300)
  );
  return debounceSearch();
}

export function updateBookSearch(payload) {
  return {
    type: A.SEARCH_BOOKS,
    payload,
  };
}

export function updateSearch(payload) {
  return {
    type: A.GET_SEARCH,
    payload,
  };
}

export function cleanSearchState() {
  return dispatch => {
    return Promise.resolve(dispatch({ type: A.CLEAN_SEARCH }))
  }
}

export default {
  mainSearch,
  updateSearch,
  bookSearch,
  updateBookSearch,
  cleanSearchState,
}
