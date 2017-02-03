import R from 'ramda'

const Genres = () => {
  const authors = R.prop('authors')
  const readers = R.prop('readers')

  return {
    authors,
    readers,
  }
}

export default Genres()
