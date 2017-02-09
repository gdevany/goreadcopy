const emptyCollectionState = () => {
  return {
    payload: [],
  }
}

export default {
  genres: [],
  recommended: [],
  books: emptyCollectionState(),
  readerData: {},
  currentReader: {},
  litcoins: {}
}
