import { SEARCH as A } from '../const/actionTypes'
import Search from '../../services/api/search'
import { debounce } from 'lodash'

export function mainSearch(searchTerm, searchType, subFilter) {
  let terms = {}

  if (searchType === 'main-search') {
    terms = {
      author: searchTerm,
      reader: searchTerm,
      book: searchTerm,
      publisher: searchTerm,
    }
  }

  if (searchType === 'book') {
    terms = {
      book: searchTerm,
      subFilter: subFilter,
    }
  }

  if (searchType === 'author') {
    terms = {
      author: searchTerm,
    }
  }

  if (searchType === 'reader') {
    terms = {
      reader: searchTerm,
    }
  }

  if (searchType === 'publisher') {
    terms = {
      publisher: searchTerm,
    }
  }
  const debounceSearch = () => {
    return debounce(dispatch => {
      return Search.search(terms)
        .then((res) => { dispatch(updateSearch(res.data))})
        .catch(err => console.error(`Error in ${searchType} search ${err}`))
    }, 300)
  }
  return debounceSearch()
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
