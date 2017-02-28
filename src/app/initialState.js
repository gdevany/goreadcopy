//import { Auth } from './services'

const emptyState = (state = {}) => {
  return {
    ...state,
    errors: {}
  }
}

//const loadAuthToken = () => {
//  return { token: Auth.token() }
//}

export default {
  genres: [],
  recommended: [],
  search: emptyState(),
  books: emptyState({ payload: [] }),
  readerData: emptyState(),
  currentReader: {},
  litcoins: {},
  social: {}
}
