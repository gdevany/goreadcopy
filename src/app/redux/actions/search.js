import { SEARCH as A } from '../const/actionTypes'
import Search from '../../services/api/search'
import { debounce } from 'lodash'

export function mainSearch(searchTerm, searchType) {
  let terms = {}

  if (searchType === 'main-search') {
    terms = {
      author: searchTerm,
      reader: searchTerm,
      book: searchTerm,
      publisher: searchTerm,
    }
  }
  if (searchType === 'book-search') {
    terms = {
      book: searchTerm,
    }
  }
  const debounceSearch = () => {
    return debounce(dispatch => {
      Search.search(terms)
        .then(res => { dispatch(updateSearch(res.data))})
        .catch(err => console.error(`Error in ${searchType} search ${err}`))
    }, 300)
  }
  return debounceSearch()
}

export function bookSearch(searchTerm, queryType) {
  const terms = {
    query: searchTerm,
    queryType: queryType,
  }

  const debounceSearch = () => {
    return debounce(dispatch => {
      Search.searchBooks(terms)
        .then(res => { dispatch(updateBookSearch(res.data))})
        .catch(err => console.error(`Error in book search ${err}`))
    }, 300)
  }
  return debounceSearch()
}

export function updateBookSearch(payload) {
  return {
    type: A.SEARCH_BOOKS,
    payload,
  }
}

export function updateSearch(payload) {
  return {
    type: A.GET_SEARCH,
    payload,
  }
}

export default {
  mainSearch,
  updateSearch,
  bookSearch,
  updateBookSearch,
}
