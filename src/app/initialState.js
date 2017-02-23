const emptyState = (state = {}) => {
  return {
    ...state,
    errors: {}
  }
}

export default {
  genres: [],
  recommended: [],
  books: emptyState({ payload: [] }),
  readerData: emptyState(),
  currentReader: {},
  litcoins: {},
  social: {}
}
