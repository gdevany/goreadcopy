import { SEARCH as A } from '../const/actionTypes'
import Search from '../../services/api/search'
import { debounce } from 'lodash'

export function mainSearch(searchTerm) {
  const terms = {
    author: searchTerm,
    reader: searchTerm,
    book: searchTerm,
    publisher: searchTerm,
  }
  const debounceSearch = () => {
    return debounce(dispatch => {
      Search.search(terms)
        .then(res => { dispatch(updateSearch(res.data))})
        .catch(err => console.error(`Error in main search ${err}`))
    }, 300)
  }
  return debounceSearch()
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
}
