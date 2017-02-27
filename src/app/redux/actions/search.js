// import { SEARCH as A } from '../const/actionTypes'
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
        .then(res => { dispatch(updateGenres(res.data))})
        .catch(err => console.log(`Error in searchGenres ${err}`))
    }, 300)
  }
  return debounceSearch()
}

export default {
  mainSearch,
}
